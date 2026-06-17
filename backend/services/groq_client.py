import os
from groq import Groq
import tempfile
import wave

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

def transcribe_audio(audio_bytes: bytes) -> any:
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as temp_wav:
        with wave.open(temp_wav, "wb") as wf:
            wf.setnchannels(1)
            wf.setsampwidth(2)
            wf.setframerate(8000)
            wf.writeframes(audio_bytes)
        temp_wav_name = temp_wav.name

    try:
        with open(temp_wav_name, "rb") as file:
            transcription = client.audio.transcriptions.create(
                file=(temp_wav_name, file.read()),
                model="whisper-large-v3",
                response_format="json",
            )
        return transcription
    finally:
        os.remove(temp_wav_name)

def generate_llm_response(history: list, system_prompt: str) -> str:
    messages = [{"role": "system", "content": system_prompt}]
    messages.extend(history)
    
    chat_completion = client.chat.completions.create(
        messages=messages,
        model="llama-3.1-8b-instant",
    )
    return chat_completion.choices[0].message.content
