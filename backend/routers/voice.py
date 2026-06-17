from fastapi import APIRouter, Request, WebSocket, WebSocketDisconnect
from twilio.twiml.voice_response import VoiceResponse, Connect
from fastapi.responses import Response
import json
import base64
import audioop
import logging
from services.elevenlabs_tts import generate_tts_audio
from services.groq_client import transcribe_audio
from services.orchestrator import process_message

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/voice")
async def handle_voice(request: Request):
    form_data = await request.form()
    phone_number = form_data.get("From", "")
    
    resp = VoiceResponse()
    resp.say("Connecting to your AI assistant...")
    connect = Connect()
    stream = connect.stream(url=f"wss://{request.headers.get('host')}/ws/voice")
    stream.parameter(name="phone_number", value=phone_number)
    resp.append(connect)
    
    return Response(content=str(resp), media_type="application/xml")

@router.websocket("/ws/voice")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    logger.info("WebSocket connection established")
    
    stream_sid = None
    phone_number = "Unknown"
    
    audio_buffer = bytearray()

    try:
        while True:
            message = await websocket.receive_text()
            data = json.loads(message)
            event = data.get("event")

            if event == "start":
                stream_sid = data["start"]["streamSid"]
                # Extract phone_number from custom parameters sent via TwiML
                try:
                    phone_number = data["start"]["customParameters"]["phone_number"]
                except KeyError:
                    phone_number = "Unknown"
                
                logger.info(f"Stream {stream_sid} started for {phone_number}.")

            elif event == "media":
                payload = data["media"]["payload"]
                audio_chunk = base64.b64decode(payload)
                audio_buffer.extend(audio_chunk)
                
                if len(audio_buffer) > 16000 * 3:
                    try:
                        linear_pcm = audioop.ulaw2lin(bytes(audio_buffer), 2)
                        
                        transcript = transcribe_audio(linear_pcm)
                        user_text = transcript.text
                        logger.info(f"Transcribed: {user_text}")
                        
                        if user_text.strip():
                            reply_text = process_message(
                                identifier=phone_number,
                                channel="Voice",
                                message=user_text
                            )
                            
                            tts_audio = generate_tts_audio(reply_text)
                            
                            response_payload = base64.b64encode(tts_audio).decode('utf-8')
                            out_msg = {
                                "event": "media",
                                "streamSid": stream_sid,
                                "media": {
                                    "payload": response_payload
                                }
                            }
                            await websocket.send_text(json.dumps(out_msg))
                    except Exception as e:
                        logger.error(f"Error processing audio: {e}")
                    
                    audio_buffer = bytearray()

            elif event == "stop":
                logger.info(f"Stream {stream_sid} stopped.")
                break

    except WebSocketDisconnect:
        logger.info("WebSocket disconnected")
