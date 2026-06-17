def test_groq():
    print("Testing Groq LLM...")
    try:
        from services.groq_client import generate_llm_response
        reply = generate_llm_response([], "You are a helpful assistant. Reply with a short greeting.")
        print(f"[SUCCESS] Groq Reply: {reply}")
    except Exception as e:
        print(f"[FAILED] Groq LLM Error: {e}")

def test_elevenlabs_tts():
    print("Testing ElevenLabs TTS...")
    try:
        from services.elevenlabs_tts import generate_tts_audio
        audio_bytes = generate_tts_audio("Testing ElevenLabs TTS.")
        print(f"[SUCCESS] ElevenLabs TTS generated {len(audio_bytes)} bytes of audio.")
    except Exception as e:
        print(f"[FAILED] ElevenLabs TTS Error: {e}")

def test_twilio():
    print("Testing Twilio Credentials...")
    try:
        from twilio.rest import Client
        import os
        client = Client(os.environ.get("TWILIO_ACCOUNT_SID"), os.environ.get("TWILIO_AUTH_TOKEN"))
        account = client.api.accounts(os.environ.get("TWILIO_ACCOUNT_SID")).fetch()
        print(f"[SUCCESS] Twilio authenticated! Account Name: {account.friendly_name}")
    except Exception as e:
        print(f"[FAILED] Twilio Error: {e}")

if __name__ == "__main__":
    print("--- Running Backend Tests ---")
    test_groq()
    print("-" * 20)
    test_elevenlabs_tts()
    print("-" * 20)
    test_twilio()
    print("--- Tests Complete ---")
