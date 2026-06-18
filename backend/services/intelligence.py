import json
import logging
from services.groq_client import client

logger = logging.getLogger(__name__)

def evaluate_customer_journey(history: list) -> dict:
    """
    Evaluates the conversation history using Groq Llama 3 to predict scores and decisions.
    No local machine learning models are required.
    """
    if not history:
        return {
            "urgency_score": 0.1,
            "conversion_score": 0.1,
            "engagement_score": 0.1,
            "channel_scores": {"Email": 0.2, "WhatsApp": 0.2, "SMS": 0.2, "Voice": 0.2, "Webchat": 0.2},
            "next_action": "Send Email",
            "reason": "New lead initialized. Standard email follow-up suggested."
        }
        
    # Format the conversation history for the LLM
    formatted_history = ""
    for msg in history:
        role = msg.get("role", "user").upper()
        content = msg.get("content", "")
        formatted_history += f"{role}: {content}\n"
        
    system_prompt = (
        "You are the Journey Intelligence Engine for Verve. "
        "Analyze the following conversation history and determine:\n"
        "1. urgency_score: A float between 0.0 (low urgency) and 1.0 (high urgency, e.g. system failures, urgent services requested).\n"
        "2. conversion_score: A float between 0.0 (unlikely to convert) and 1.0 (high booking/purchase probability).\n"
        "3. engagement_score: A float between 0.0 (inactive/cold) and 1.0 (active/responsive).\n"
        "4. channel_scores: Preference/suitability score for each channel (Email, WhatsApp, SMS, Voice, Webchat) as floats between 0.0 and 1.0.\n"
        "5. next_action: The recommended next action. Must be one of: \"Send Email\", \"Send WhatsApp\", \"Send SMS\", \"Initiate Voice Call\", \"Schedule Appointment\".\n"
        "6. reason: A concise explanation (1-2 sentences) of the scoring and decision.\n\n"
        "You MUST return a JSON object with these exact keys:\n"
        "{\n"
        "  \"urgency_score\": 0.8,\n"
        "  \"conversion_score\": 0.65,\n"
        "  \"engagement_score\": 0.9,\n"
        "  \"channel_scores\": {\"Email\": 0.3, \"WhatsApp\": 0.8, \"SMS\": 0.9, \"Voice\": 0.5, \"Webchat\": 0.7},\n"
        "  \"next_action\": \"Send SMS\",\n"
        "  \"reason\": \"...\"\n"
        "}"
    )
    
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Conversation History:\n{formatted_history}"}
            ],
            model="llama-3.1-8b-instant",
            response_format={"type": "json_object"}
        )
        
        result_text = chat_completion.choices[0].message.content
        logger.info(f"[Intelligence] Journey evaluation output: {result_text}")
        
        parsed = json.loads(result_text)
        
        # Validation and normalization of output keys
        return {
            "urgency_score": float(parsed.get("urgency_score", 0.5)),
            "conversion_score": float(parsed.get("conversion_score", 0.5)),
            "engagement_score": float(parsed.get("engagement_score", 0.5)),
            "channel_scores": parsed.get("channel_scores", {
                "Email": 0.2, "WhatsApp": 0.2, "SMS": 0.2, "Voice": 0.2, "Webchat": 0.2
            }),
            "next_action": str(parsed.get("next_action", "Send SMS")),
            "reason": str(parsed.get("reason", "Standard follow-up recommended based on activity."))
        }
    except Exception as e:
        logger.error(f"Error evaluating customer journey: {e}")
        return {
            "urgency_score": 0.5,
            "conversion_score": 0.5,
            "engagement_score": 0.5,
            "channel_scores": {"Email": 0.2, "WhatsApp": 0.2, "SMS": 0.2, "Voice": 0.2, "Webchat": 0.2},
            "next_action": "Send SMS",
            "reason": f"Fallback scoring applied due to error: {e}"
        }
