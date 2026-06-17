from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from services.orchestrator import process_message
import json
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

@router.websocket("/ws/webchat")
async def webchat_websocket(websocket: WebSocket):
    await websocket.accept()
    logger.info("Webchat WebSocket connected")
    
    session_id = None
    
    try:
        while True:
            data = await websocket.receive_text()
            payload = json.loads(data)
            
            session_id = payload.get("session_id", "anonymous_web")
            user_msg = payload.get("message", "")
            
            if user_msg.strip():
                reply_text = process_message(
                    identifier=session_id,
                    channel="Webchat",
                    message=user_msg
                )
                
                await websocket.send_text(json.dumps({
                    "role": "assistant",
                    "content": reply_text
                }))
                
    except WebSocketDisconnect:
        logger.info(f"Webchat WebSocket disconnected for session: {session_id}")
    except Exception as e:
        logger.error(f"Webchat error: {e}")
