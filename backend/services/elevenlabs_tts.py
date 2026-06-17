import os
from elevenlabs.client import ElevenLabs

client = ElevenLabs(api_key=os.environ.get("ELEVENLABS_API_KEY"))

def generate_tts_audio(text: str) -> bytes:
    audio_generator = client.text_to_speech.convert(
        text=text,
        voice_id="pNInz6obpgDQGcFmaJgB",
        model_id="eleven_flash_v2_5",
        output_format="ulaw_8000"
    )
    
    audio_bytes = b"".join(list(audio_generator))
    return audio_bytes
