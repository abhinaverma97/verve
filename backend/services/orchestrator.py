from core.memory import get_or_create_lead_id, add_message, get_conversation_history
from services.groq_client import generate_llm_response
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def process_message(identifier: str, channel: str, message: str) -> str:
    logger.info(f"[Orchestrator] Received message from {identifier} via {channel}: {message}")
    
    lead_id = get_or_create_lead_id(identifier)
    
    contextual_message = f"(User is texting you via {channel}) {message}"
    add_message(lead_id, "user", contextual_message)
    
    history = get_conversation_history(lead_id)
    
    system_prompt = (
        "You are Verve, an AI sales agent designed to qualify leads and book meetings. "
        "You have a unified memory across SMS, Voice, Webchat, and Email. "
        "Keep your answers extremely concise and conversational. Do not use markdown or emojis in Voice or SMS."
    )
    
    reply_text = generate_llm_response(history, system_prompt)
    
    add_message(lead_id, "assistant", reply_text)
    
    logger.info(f"[Orchestrator] Generated reply for {lead_id}: {reply_text}")
    return reply_text
