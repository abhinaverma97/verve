# backend/test_smtp.py
import sys
import os
from dotenv import load_dotenv

# Load env variables
load_dotenv()

# Add backend directory to python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from services.email_sender import send_smtp_email

def test_smtp_send():
    print("--- Testing Gmail SMTP Connection ---")
    recipient = "aryanmishra7312@gmail.com"
    subject = "Verve AI Platform - SMTP Connection Test"
    body = "Hello! This is a test email confirming that the Verve AI Customer Journey Platform SMTP service is successfully connected to your Gmail account."
    
    print(f"Attempting to send email to {recipient}...")
    success = send_smtp_email(to_email=recipient, subject=subject, body_text=body)
    if success:
        print("[SUCCESS] Email sent successfully! Check your inbox.")
    else:
        print("[FAILED] SMTP transmission failed. Verify your App Password and settings.")

if __name__ == "__main__":
    test_smtp_send()
