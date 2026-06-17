from fastapi import APIRouter, Request
from services.orchestrator import process_message
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/api/email")
async def handle_email_webhook(request: Request):
    try:
        data = await request.json()
        sender_email = data.get("email", "demo@verve.com")
        email_body = data.get("body", "Hello")
        
        reply_text = process_message(
            identifier=sender_email,
            channel="Email",
            message=email_body
        )
        
        logger.info(f"[Email] Would send reply to {sender_email}: {reply_text}")
        
        return {"status": "success", "reply": reply_text}
    except Exception as e:
        logger.error(f"Error processing email webhook: {e}")
        return {"status": "error", "message": str(e)}
