import os
import uuid
import json
from datetime import datetime
from sqlalchemy import create_engine, Column, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship

DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///./verve.db")

# In SQLite, enable foreign keys
connect_args = {}
if DATABASE_URL.startswith("sqlite"):
    connect_args = {"check_same_thread": False}

engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Models
class Customer(Base):
    __tablename__ = "customers"
    
    customer_id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=True)
    email = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    conversations = relationship("Conversation", back_populates="customer", cascade="all, delete-orphan")
    events = relationship("CustomerEvent", back_populates="customer", cascade="all, delete-orphan")
    predictions = relationship("Prediction", back_populates="customer", cascade="all, delete-orphan")
    decisions = relationship("Decision", back_populates="customer", cascade="all, delete-orphan")

class Conversation(Base):
    __tablename__ = "conversations"
    
    conversation_id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    customer_id = Column(String, ForeignKey("customers.customer_id"), nullable=False)
    channel = Column(String, nullable=False)  # 'Email', 'WhatsApp', 'SMS', 'Voice', 'Webchat'
    direction = Column(String, nullable=False)  # 'inbound' or 'outbound'
    message = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    customer = relationship("Customer", back_populates="conversations")

class CustomerEvent(Base):
    __tablename__ = "customer_events"
    
    event_id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    customer_id = Column(String, ForeignKey("customers.customer_id"), nullable=False)
    event_type = Column(String, nullable=False)  # 'lead_intake', 'email_received', 'sms_received', etc.
    metadata_json = Column(Text, nullable=True)  # JSON serialized dict
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    customer = relationship("Customer", back_populates="events")

class Prediction(Base):
    __tablename__ = "predictions"
    
    prediction_id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    customer_id = Column(String, ForeignKey("customers.customer_id"), nullable=False)
    conversion_score = Column(Float, nullable=False)
    channel_score_json = Column(Text, nullable=True)  # JSON serialized dict of channel preference scores
    urgency_score = Column(Float, nullable=False)
    engagement_score = Column(Float, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    customer = relationship("Customer", back_populates="predictions")

class Decision(Base):
    __tablename__ = "decisions"
    
    decision_id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    customer_id = Column(String, ForeignKey("customers.customer_id"), nullable=False)
    selected_channel = Column(String, nullable=False)
    next_action = Column(String, nullable=False)
    reason = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    customer = relationship("Customer", back_populates="decisions")

# Initialize tables
Base.metadata.create_all(bind=engine)

# Helper operations
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def db_get_or_create_customer(identifier: str, name: str = None) -> Customer:
    """Gets or creates a customer using email or phone number as identifier."""
    db = SessionLocal()
    try:
        # Check if customer exists by phone or email
        customer = db.query(Customer).filter(
            (Customer.phone == identifier) | (Customer.email == identifier)
        ).first()
        
        if not customer:
            # Determine if identifier is phone or email
            is_email = "@" in identifier
            phone = identifier if not is_email else None
            email = identifier if is_email else None
            
            # If name is not provided, generate a default one
            if not name:
                name = identifier.split("@")[0] if is_email else f"Lead {identifier[-4:]}"
                
            customer = Customer(
                customer_id=str(uuid.uuid4()),
                name=name,
                email=email,
                phone=phone
            )
            db.add(customer)
            db.commit()
            db.refresh(customer)
            
            # Log creation event
            event = CustomerEvent(
                customer_id=customer.customer_id,
                event_type="lead_created",
                metadata_json=json.dumps({"identifier": identifier})
            )
            db.add(event)
            db.commit()
        else:
            # Update name if provided and not set
            if name and not customer.name:
                customer.name = name
                db.commit()
                db.refresh(customer)
        
        # We return a detached/copied version of customer details or keep it attached.
        # To avoid threading issues, we extract fields we need.
        return {
            "customer_id": customer.customer_id,
            "name": customer.name,
            "email": customer.email,
            "phone": customer.phone,
            "created_at": customer.created_at
        }
    finally:
        db.close()

def db_add_message(customer_id: str, channel: str, direction: str, message: str):
    db = SessionLocal()
    try:
        conv = Conversation(
            customer_id=customer_id,
            channel=channel,
            direction=direction,
            message=message
        )
        db.add(conv)
        db.commit()
    finally:
        db.close()

def db_add_event(customer_id: str, event_type: str, metadata: dict):
    db = SessionLocal()
    try:
        event = CustomerEvent(
            customer_id=customer_id,
            event_type=event_type,
            metadata_json=json.dumps(metadata) if metadata else "{}"
        )
        db.add(event)
        db.commit()
    finally:
        db.close()

def db_add_prediction(customer_id: str, conversion_score: float, channel_score: dict, urgency_score: float, engagement_score: float):
    db = SessionLocal()
    try:
        pred = Prediction(
            customer_id=customer_id,
            conversion_score=conversion_score,
            channel_score_json=json.dumps(channel_score) if channel_score else "{}",
            urgency_score=urgency_score,
            engagement_score=engagement_score
        )
        db.add(pred)
        db.commit()
    finally:
        db.close()

def db_add_decision(customer_id: str, selected_channel: str, next_action: str, reason: str):
    db = SessionLocal()
    try:
        dec = Decision(
            customer_id=customer_id,
            selected_channel=selected_channel,
            next_action=next_action,
            reason=reason
        )
        db.add(dec)
        db.commit()
    finally:
        db.close()

def db_get_all_customers():
    db = SessionLocal()
    try:
        customers = db.query(Customer).all()
        res = []
        for c in customers:
            # Get latest decision and prediction
            latest_pred = db.query(Prediction).filter_by(customer_id=c.customer_id).order_by(Prediction.timestamp.desc()).first()
            latest_dec = db.query(Decision).filter_by(customer_id=c.customer_id).order_by(Decision.timestamp.desc()).first()
            
            res.append({
                "customer_id": c.customer_id,
                "name": c.name,
                "email": c.email,
                "phone": c.phone,
                "created_at": c.created_at.isoformat(),
                "latest_prediction": {
                    "conversion_score": latest_pred.conversion_score,
                    "urgency_score": latest_pred.urgency_score,
                    "engagement_score": latest_pred.engagement_score
                } if latest_pred else None,
                "latest_decision": {
                    "selected_channel": latest_dec.selected_channel,
                    "next_action": latest_dec.next_action,
                    "reason": latest_dec.reason
                } if latest_dec else None
            })
        return res
    finally:
        db.close()

def db_get_timeline(customer_id: str):
    db = SessionLocal()
    try:
        # Get customer details
        c = db.query(Customer).filter_by(customer_id=customer_id).first()
        if not c:
            return None
        
        timeline = []
        
        # 1. Add Messages
        conversations = db.query(Conversation).filter_by(customer_id=customer_id).all()
        for conv in conversations:
            timeline.append({
                "type": "message",
                "timestamp": conv.timestamp.isoformat(),
                "channel": conv.channel,
                "direction": conv.direction,
                "content": conv.message
            })
            
        # 2. Add Events
        events = db.query(CustomerEvent).filter_by(customer_id=customer_id).all()
        for e in events:
            timeline.append({
                "type": "event",
                "timestamp": e.timestamp.isoformat(),
                "event_type": e.event_type,
                "metadata": json.loads(e.metadata_json) if e.metadata_json else {}
            })
            
        # 3. Add Predictions
        preds = db.query(Prediction).filter_by(customer_id=customer_id).all()
        for p in preds:
            timeline.append({
                "type": "prediction",
                "timestamp": p.timestamp.isoformat(),
                "conversion_score": p.conversion_score,
                "channel_score": json.loads(p.channel_score_json) if p.channel_score_json else {},
                "urgency_score": p.urgency_score,
                "engagement_score": p.engagement_score
            })
            
        # 4. Add Decisions
        decs = db.query(Decision).filter_by(customer_id=customer_id).all()
        for d in decs:
            timeline.append({
                "type": "decision",
                "timestamp": d.timestamp.isoformat(),
                "selected_channel": d.selected_channel,
                "next_action": d.next_action,
                "reason": d.reason
            })
            
        # Sort timeline by timestamp ascending
        timeline.sort(key=lambda x: x["timestamp"])
        
        return {
            "customer": {
                "customer_id": c.customer_id,
                "name": c.name,
                "email": c.email,
                "phone": c.phone,
                "created_at": c.created_at.isoformat()
            },
            "timeline": timeline
        }
    finally:
        db.close()
