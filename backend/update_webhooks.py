import os
from twilio.rest import Client
from dotenv import load_dotenv

load_dotenv()

account_sid = os.environ.get("TWILIO_ACCOUNT_SID")
auth_token = os.environ.get("TWILIO_AUTH_TOKEN")
phone_number_str = os.environ.get("TWILIO_PHONE_NUMBER")
LOCALTUNNEL_URL = os.environ.get("LOCALTUNNEL_URL")

if not LOCALTUNNEL_URL:
    raise ValueError("LOCALTUNNEL_URL is not set in .env")

client = Client(account_sid, auth_token)

# 1. Find the Phone Number SID
incoming_phone_numbers = client.incoming_phone_numbers.list(phone_number=phone_number_str, limit=1)

if not incoming_phone_numbers:
    print(f"Could not find phone number {phone_number_str} in your Twilio account.")
else:
    phone_number = incoming_phone_numbers[0]
    print(f"Found phone number: {phone_number.sid}")
    
    # 2. Update the Webhooks programmatically to bypass the Twilio UI bug
    updated_number = client.incoming_phone_numbers(phone_number.sid).update(
        voice_url=f"{LOCALTUNNEL_URL}/voice",
        voice_method="POST",
        sms_url=f"{LOCALTUNNEL_URL}/api/sms",
        sms_method="POST"
    )
    
    print(f"[SUCCESS] Updated Voice Webhook: {updated_number.voice_url}")
    print(f"[SUCCESS] Updated SMS Webhook: {updated_number.sms_url}")
