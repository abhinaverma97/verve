from fastapi import APIRouter, Form, Request
from twilio.twiml.messaging_response import MessagingResponse
from services.orchestrator import process_message
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/sms")
@router.post("/api/sms")  # Support both prefixes
async def handle_sms(request: Request):
    form_data = await request.form()
    incoming_msg = form_data.get("Body", "").strip()
    phone_number = form_data.get("From", "")
    
    # Twilio prefixes WhatsApp senders with "whatsapp:" (e.g. whatsapp:+1234567890)
    is_whatsapp = phone_number.startswith("whatsapp:")
    channel = "WhatsApp" if is_whatsapp else "SMS"
    
    # Clean identifier for DB lookup (e.g., standard phone number format)
    clean_phone_number = phone_number.replace("whatsapp:", "") if is_whatsapp else phone_number
    
    try:
        reply_text = process_message(
            identifier=clean_phone_number,
            channel=channel,
            message=incoming_msg
        )
    except Exception as e:
        logger.error(f"Error processing {channel}: {e}")
        reply_text = "I'm sorry, I'm having trouble processing that right now."
    
    resp = MessagingResponse()
    resp.message(reply_text)
    
    from fastapi.responses import Response
    return Response(content=str(resp), media_type="application/xml")
