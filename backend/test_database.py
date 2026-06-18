# backend/test_database.py
import sys
import os
from dotenv import load_dotenv

# Load env variables
load_dotenv()

# Add backend directory to python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from core.database import db_get_timeline, db_get_all_customers
from services.orchestrator import process_message

def run_integration_test():
    print("--- Running Verve Database & Intelligence Integration Test ---")
    
    # Test Identifier (e.g. mock lead)
    identifier = "test.lead@example.com"
    message = "I need an urgent appointment. My AC broke down and my house is 95 degrees."
    
    print(f"1. Simulating inbound interaction from {identifier}...")
    reply = process_message(identifier=identifier, channel="Webchat", message=message)
    print(f"[SUCCESS] AI generated reply: {reply}\n")
    
    print("2. Fetching customer profile list...")
    customers = db_get_all_customers()
    print(f"Profiles found: {len(customers)}")
    for c in customers:
        print(f" - Name: {c['name']} | Email: {c['email']} | Phone: {c['phone']}")
        if c['latest_prediction']:
            print(f"   Scores -> Conv: {c['latest_prediction']['conversion_score']:.2f} | Urgency: {c['latest_prediction']['urgency_score']:.2f}")
        if c['latest_decision']:
            print(f"   Decision -> Recommended channel: {c['latest_decision']['selected_channel']} | Action: {c['latest_decision']['next_action']}")
            print(f"   Reason: {c['latest_decision']['reason']}")
    print()
    
    print("3. Fetching unified timeline for customer...")
    lead_id = customers[0]['customer_id']
    timeline_res = db_get_timeline(lead_id)
    print(f"Timeline for {timeline_res['customer']['name']}:")
    for event in timeline_res['timeline']:
        print(f" [{event['type'].upper()}] ({event['timestamp']})")
        if event['type'] == 'message':
            print(f"   Direction: {event['direction']} | Channel: {event['channel']}")
            print(f"   Content: {event['content']}")
        elif event['type'] == 'event':
            print(f"   Event type: {event['event_type']} | Metadata: {event['metadata']}")
        elif event['type'] == 'prediction':
            print(f"   Urgency: {event['urgency_score']} | Conversion: {event['conversion_score']} | Engagement: {event['engagement_score']}")
            print(f"   Channel Scores: {event['channel_score']}")
        elif event['type'] == 'decision':
            print(f"   Next Action: {event['next_action']} | Reason: {event['reason']}")
            
    print("\n--- Integration Test Complete ---")

if __name__ == "__main__":
    run_integration_test()
