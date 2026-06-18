from fastapi import APIRouter, Request, HTTPException
from core.database import (
    db_get_all_customers,
    db_get_timeline,
    db_get_or_create_customer,
    db_add_event,
    SessionLocal,
    Customer, Conversation, CustomerEvent, Prediction, Decision
)
from services.orchestrator import process_message
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])

@router.get("/leads")
async def get_leads():
    """Lists all customer leads with their metadata, latest scores, and decisions."""
    try:
        leads = db_get_all_customers()
        return leads
    except Exception as e:
        logger.error(f"Error fetching leads: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/timeline/{customer_id}")
async def get_lead_timeline(customer_id: str):
    """Returns the unified timeline events, history, predictions, and decisions for a customer."""
    try:
        timeline = db_get_timeline(customer_id)
        if not timeline:
            raise HTTPException(status_code=404, detail="Customer not found")
        return timeline
    except Exception as e:
        logger.error(f"Error fetching timeline for customer {customer_id}: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/simulate")
async def simulate_event(request: Request):
    """Simulates inbound events (Website form lead intake, Email, SMS, WhatsApp, Voice, Webchat)."""
    try:
        payload = await request.json()
        channel = payload.get("channel", "Webchat")
        identifier = payload.get("identifier", "").strip()
        message = payload.get("message", "").strip()
        name = payload.get("name", "").strip()
        
        if not identifier:
            raise HTTPException(status_code=400, detail="Identifier (email, phone, or session) is required")
            
        # 1. Special case: Website Form submission lead intake
        if channel == "Form":
            customer = db_get_or_create_customer(identifier, name=name)
            # Log form submission event
            db_add_event(
                customer_id=customer["customer_id"],
                event_type="form_submission",
                metadata={"message": message, "name": name}
            )
            # Simulate immediate action by sending message through orchestrator
            reply_text = process_message(
                identifier=identifier,
                channel="Email",  # Form usually triggers Email/SMS follow-up
                message=f"[Inbound Web Lead: {name}] {message}"
            )
            return {
                "status": "success",
                "customer_id": customer["customer_id"],
                "reply": reply_text,
                "detail": f"Lead form submission recorded for {name} ({identifier})."
            }
            
        # 2. General channel message simulation (Email, SMS, WhatsApp, Webchat, Voice)
        reply_text = process_message(
            identifier=identifier,
            channel=channel,
            message=message
        )
        
        customer = db_get_or_create_customer(identifier)
        return {
            "status": "success",
            "customer_id": customer["customer_id"],
            "reply": reply_text,
            "detail": f"Interaction processed via {channel}."
        }
    except Exception as e:
        logger.error(f"Error executing simulation: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/reset")
async def reset_all_data():
    """Wipes all customer profiles, conversations, events, predictions, and decisions from the database."""
    try:
        db = SessionLocal()
        db.query(Decision).delete()
        db.query(Prediction).delete()
        db.query(CustomerEvent).delete()
        db.query(Conversation).delete()
        db.query(Customer).delete()
        db.commit()
        db.close()
        logger.info("[Dashboard] All data reset successfully.")
        return {"status": "success", "detail": "All lead data has been cleared. Ready for a fresh demo!"}
    except Exception as e:
        logger.error(f"Error resetting data: {e}")
        raise HTTPException(status_code=500, detail=str(e))
