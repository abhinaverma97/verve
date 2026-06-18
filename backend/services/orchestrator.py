from core.memory import get_or_create_lead_id, add_message, get_conversation_history
from services.groq_client import generate_llm_response
from services.intelligence import evaluate_customer_journey
from core.database import db_add_prediction, db_add_decision, db_add_event
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def process_message(identifier: str, channel: str, message: str) -> str:
    logger.info(f"[Orchestrator] Processing message from {identifier} via {channel}: {message}")
    
    # Get or create customer ID in the database
    lead_id = get_or_create_lead_id(identifier)
    
    # 1. Log incoming message event
    db_add_event(
        customer_id=lead_id,
        event_type="message_received",
        metadata={"channel": channel, "message_preview": message[:60]}
    )
    
    # 2. Append user message to history
    contextual_message = f"(User is texting you via {channel}) {message}"
    add_message(lead_id, "user", contextual_message)
    
    # 3. Retrieve full conversation history
    history = get_conversation_history(lead_id)
    
    # 4. Generate AI response
    system_prompt = (
        "You are Verve, an AI sales agent designed to qualify leads and book meetings. "
        "You have a unified memory across SMS, Voice, Webchat, and Email. "
        "Keep your answers extremely concise and conversational. Do not use markdown or emojis in Voice or SMS."
    )
    reply_text = generate_llm_response(history, system_prompt)
    
    # 5. Append AI reply to history
    add_message(lead_id, "assistant", reply_text)
    
    # 6. Log AI reply event
    db_add_event(
        customer_id=lead_id,
        event_type="reply_generated",
        metadata={"channel": channel, "reply_preview": reply_text[:60]}
    )
    
    # 7. Run journey prediction & decision evaluation
    try:
        updated_history = get_conversation_history(lead_id)
        journey_eval = evaluate_customer_journey(updated_history)
        
        # Log predictions
        db_add_prediction(
            customer_id=lead_id,
            conversion_score=journey_eval["conversion_score"],
            channel_score=journey_eval["channel_scores"],
            urgency_score=journey_eval["urgency_score"],
            engagement_score=journey_eval["engagement_score"]
        )
        
        # Determine selected channel from next action or channel scores
        next_action = journey_eval.get("next_action", "Send SMS")
        selected_channel = "SMS"
        if "Email" in next_action:
            selected_channel = "Email"
        elif "WhatsApp" in next_action:
            selected_channel = "WhatsApp"
        elif "SMS" in next_action:
            selected_channel = "SMS"
        elif "Voice" in next_action:
            selected_channel = "Voice"
        else:
            channel_scores = journey_eval.get("channel_scores", {})
            if channel_scores:
                selected_channel = max(channel_scores, key=channel_scores.get)
                
        # Log decisions
        db_add_decision(
            customer_id=lead_id,
            selected_channel=selected_channel,
            next_action=next_action,
            reason=journey_eval.get("reason", "Follow-up recommended.")
        )
        
        logger.info(f"[Orchestrator] Successfully logged journey intelligence for {lead_id}.")
        
        # 8. Auto-execute recommended outbound nurturing message
        is_email = "@" in identifier
        followup_body = f"Hi! This is Verve following up. Let's proceed with: {next_action}."
        
        # We trigger outbound followups on the recommended channel if it's different or requested
        if next_action == "Send Email" and is_email:
            from services.email_sender import send_smtp_email
            if send_smtp_email(to_email=identifier, subject="Verve Follow Up", body_text=followup_body):
                add_message(lead_id, "assistant", f"(Auto outbound via Email) {followup_body}")
        elif next_action == "Send WhatsApp" and not is_email:
            from services.twilio_client import send_outgoing_whatsapp
            if send_outgoing_whatsapp(to_phone=identifier, body=followup_body):
                add_message(lead_id, "assistant", f"(Auto outbound via WhatsApp) {followup_body}")
        elif next_action == "Send SMS" and not is_email:
            from services.twilio_client import send_outgoing_sms
            if send_outgoing_sms(to_phone=identifier, body=followup_body):
                add_message(lead_id, "assistant", f"(Auto outbound via SMS) {followup_body}")
                
    except Exception as e:
        logger.error(f"[Orchestrator] Error processing journey intelligence / outbound followup: {e}")
        
    logger.info(f"[Orchestrator] Finished message execution for {lead_id}.")
    return reply_text
