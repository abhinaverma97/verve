from core.database import (
    db_get_or_create_customer,
    db_add_message,
    SessionLocal,
    Conversation
)
from typing import List, Dict

def get_or_create_lead_id(identifier: str) -> str:
    """Gets or creates a lead customer UUID based on their identifier (email/phone)."""
    customer = db_get_or_create_customer(identifier)
    return customer["customer_id"]

def get_conversation_history(lead_id: str) -> List[Dict[str, str]]:
    """Loads the conversation history from the database in the role/content structure."""
    db = SessionLocal()
    try:
        convs = db.query(Conversation).filter_by(customer_id=lead_id).order_by(Conversation.timestamp.asc()).all()
        history = []
        for c in convs:
            # Map direction to standard role: user (inbound) or assistant (outbound)
            role = "user" if c.direction in ["inbound", "user"] else "assistant"
            history.append({"role": role, "content": c.message})
        return history
    finally:
        db.close()

def add_message(lead_id: str, role: str, content: str):
    """Adds a conversation message to the database, automatically extracting the channel from context if available."""
    channel = "Webchat"
    # Orchestrator formats contextual prompts like: "(User is texting you via Email) hello"
    # We can detect the channel here to log accurately.
    if "(User is texting you via" in content:
        try:
            parts = content.split("via ")
            if len(parts) > 1:
                channel = parts[1].split(")")[0].strip()
        except Exception:
            pass
            
    direction = "inbound" if role == "user" else "outbound"
    db_add_message(customer_id=lead_id, channel=channel, direction=direction, message=content)

def clear_memory(lead_id: str):
    """Deletes all conversations for a specific lead."""
    db = SessionLocal()
    try:
        db.query(Conversation).filter_by(customer_id=lead_id).delete()
        db.commit()
    finally:
        db.close()
