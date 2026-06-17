from fastapi import APIRouter, Form, Request
from twilio.twiml.messaging_response import MessagingResponse
from services.orchestrator import process_message
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/sms")
async def handle_sms(request: Request):
    form_data = await request.form()
    incoming_msg = form_data.get("Body", "").strip()
    phone_number = form_data.get("From", "")
    
    try:
        reply_text = process_message(
            identifier=phone_number,
            channel="SMS",
            message=incoming_msg
        )
    except Exception as e:
        logger.error(f"Error processing SMS: {e}")
        reply_text = "I'm sorry, I'm having trouble processing that right now."
    
    resp = MessagingResponse()
    resp.message(reply_text)
    
    from fastapi.responses import Response
    return Response(content=str(resp), media_type="application/xml")
