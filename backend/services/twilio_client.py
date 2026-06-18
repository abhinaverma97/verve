import os
import logging
from twilio.rest import Client

logger = logging.getLogger(__name__)

TWILIO_ACCOUNT_SID = os.environ.get("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.environ.get("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER = os.environ.get("TWILIO_PHONE_NUMBER")
TWILIO_WHATSAPP_NUMBER = os.environ.get("TWILIO_WHATSAPP_NUMBER")  # e.g. whatsapp:+15872067434

def send_outgoing_sms(to_phone: str, body: str) -> bool:
    """Sends an outbound SMS message using Twilio. Mocks sending in logs if credentials are not configured."""
    if "@" in to_phone or not to_phone:
        logger.warning(f"[SMS Twilio] Invalid phone identifier: {to_phone}")
        return False
        
    if not TWILIO_ACCOUNT_SID or not TWILIO_AUTH_TOKEN or not TWILIO_PHONE_NUMBER:
        logger.info(f"[SMS Simulator] (SMS credentials not configured) Outbound SMS to {to_phone} | Body: {body}")
        return True
        
    try:
        client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
        # Ensure '+' prefix
        clean_to = to_phone if to_phone.startswith("+") else f"+{to_phone}"
        client.messages.create(
            body=body,
            from_=TWILIO_PHONE_NUMBER,
            to=clean_to
        )
        logger.info(f"[SMS Twilio] Outbound SMS sent to {clean_to}")
        return True
    except Exception as e:
        logger.error(f"[SMS Twilio] Failed to send SMS to {to_phone}: {e}")
        return False

def send_outgoing_whatsapp(to_phone: str, body: str) -> bool:
    """Sends an outbound WhatsApp message using Twilio. Mocks sending in logs if credentials are not configured."""
    if "@" in to_phone or not to_phone:
        logger.warning(f"[WhatsApp Twilio] Invalid WhatsApp phone identifier: {to_phone}")
        return False

    from_wa = TWILIO_WHATSAPP_NUMBER or (f"whatsapp:{TWILIO_PHONE_NUMBER}" if TWILIO_PHONE_NUMBER else None)
    
    if not TWILIO_ACCOUNT_SID or not TWILIO_AUTH_TOKEN or not from_wa:
        logger.info(f"[WhatsApp Simulator] (WhatsApp credentials not configured) Outbound WhatsApp to {to_phone} | Body: {body}")
        return True
        
    try:
        client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
        
        # Ensure whatsapp: prefix and standard '+' formatting
        to_clean = to_phone.replace("whatsapp:", "")
        clean_phone = to_clean if to_clean.startswith("+") else f"+{to_clean}"
        to_wa = f"whatsapp:{clean_phone}"
        
        client.messages.create(
            body=body,
            from_=from_wa,
            to=to_wa
        )
        logger.info(f"[WhatsApp Twilio] Outbound WhatsApp message sent to {to_wa}")
        return True
    except Exception as e:
        logger.error(f"[WhatsApp Twilio] Failed to send WhatsApp to {to_phone}: {e}")
        return False
