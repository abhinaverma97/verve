from fastapi import APIRouter, Request
from services.orchestrator import process_message
from services.email_sender import send_smtp_email
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/api/email")
async def handle_email_webhook(request: Request):
    try:
        data = await request.json()
        sender_email = data.get("email", "demo@verve.com")
        email_body = data.get("body", "Hello")
        
        # 1. Process message through orchestrator (logs events, updates memory)
        reply_text = process_message(
            identifier=sender_email,
            channel="Email",
            message=email_body
        )
        
        # 2. Transmit reply using SMTP
        subject = "Re: Your Verve Assistant Inquiry"
        email_sent = send_smtp_email(
            to_email=sender_email,
            subject=subject,
            body_text=reply_text
        )
        
        return {
            "status": "success", 
            "reply": reply_text, 
            "email_sent": email_sent
        }
    except Exception as e:
        logger.error(f"Error processing email webhook: {e}")
        return {"status": "error", "message": str(e)}
