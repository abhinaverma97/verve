# Verve: Omnichannel Customer Engagement Platform with Unified Customer Memory

### One Memory. Every Channel. Zero Missed Leads.

Verve is an AI-powered Omnichannel Customer Journey Intelligence Platform that helps businesses manage customer interactions across Email, SMS, WhatsApp, Voice Calls, and Webchat from a single intelligent system.

The platform maintains a unified customer memory, analyzes customer intent and urgency using AI, generates personalized responses, and enables seamless customer engagement across multiple communication channels.

---

## Problem Statement

Modern businesses receive customer inquiries through multiple channels:

- Email
- SMS
- WhatsApp
- Voice Calls
- Website Forms
- Webchat

As customers switch between channels, businesses often lose context.

### Example

A customer reports an issue through SMS, follows up through Email, and later calls customer support.

Traditional systems treat these as separate conversations, forcing the customer to repeat information multiple times.

This leads to:

- Fragmented customer experiences
- Slow follow-ups
- Lost leads
- Reduced customer satisfaction

---

## Solution

Verve creates a unified customer memory that stores every interaction in a single timeline.

Regardless of whether a customer communicates through Email, SMS, WhatsApp, Voice, or Webchat, Verve remembers previous conversations and continues the interaction seamlessly.

The platform leverages AI to:

- Understand customer intent
- Analyze urgency
- Generate personalized responses
- Recommend next-best actions
- Automate customer engagement

---

## Key Features

### Unified Customer Memory

Maintains a complete customer timeline across all communication channels.

### AI-Powered Personalization

Uses Groq-powered LLMs to generate:

- Email Subjects
- Email Content
- Customer Responses
- Follow-up Messages

### Omnichannel Communication

Supports:

- Email
- SMS
- WhatsApp
- Voice Calls
- Webchat

### Real-Time Engagement

Processes customer interactions instantly and generates contextual responses.

### Conversation Tracking

Stores all interactions for future reference and analytics.

---

## System Architecture

![Verve Architecture](Verve%20Architecture.png)

```text
Customer Channels
─────────────────────────
Email
SMS
WhatsApp
Voice Calls
Webchat
─────────────────────────

            │
            ▼

Backend Layer
(FastAPI + Node.js)

            │
            ▼

AI Intelligence Layer
(Groq + Llama 3)

            │
            ▼

Decision Engine

            │
            ▼

Communication Services

• Gmail SMTP
• Twilio SMS
• Twilio WhatsApp
• Twilio Voice

            │
            ▼

Database Layer

• Customer Profiles
• Conversations
• Predictions
• Decisions
• Interaction Logs
```

---

## Workflow

```text
Customer Interaction
          │
          ▼

Customer Context Retrieved
          │
          ▼

AI Analysis
(Intent + Urgency)
          │
          ▼

Response Generation
          │
          ▼

Channel Selection
          │
          ▼

Email / SMS / WhatsApp / Voice
          │
          ▼

Conversation Logged
```

---

## Tech Stack

### Frontend

- Next.js
- React
- Tailwind CSS

### Backend

- FastAPI
- Python
- Node.js

### AI & Intelligence

- Groq API
- Llama 3

### Database

- PostgreSQL
- SQLite

### Communication Services

- Gmail SMTP
- Twilio SMS
- Twilio WhatsApp
- Twilio Voice

### Voice AI

- Whisper
- ElevenLabs

---

## Project Structure

```text
verve/

├── app/
│   └── dashboard/

├── backend/
│   ├── routers/
│   │   ├── email.py
│   │   ├── sms.py
│   │   ├── voice.py
│   │   └── dashboard.py
│   │
│   ├── services/
│   │   ├── orchestrator.py
│   │   ├── intelligence.py
│   │   ├── email_sender.py
│   │   └── twilio_client.py
│   │
│   ├── core/
│   │   ├── database.py
│   │   └── memory.py
│   │
│   └── main.py
│
└── components/
```

---

## Getting Started

### Backend

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --reload --port 8000
```

### Frontend

```bash
npm install

npm run dev
```

---

## Environment Variables

Create a `.env` file:

```env
GROQ_API_KEY=your_groq_api_key

SMTP_USER=your_email
SMTP_PASSWORD=your_app_password

TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token

TWILIO_PHONE_NUMBER=your_number

ELEVENLABS_API_KEY=your_key
```

---

## Example Use Case

Customer submits:

> "My AC stopped working and I need urgent assistance."

Verve:

1. Receives the request.
2. Retrieves customer history.
3. Analyzes urgency using AI.
4. Generates a personalized response.
5. Delivers the response through the selected channel.
6. Logs the interaction.
7. Updates customer memory.

If the customer later switches from SMS to Email or Voice, Verve continues the conversation without asking the customer to repeat information.

---


## Vision

Verve transforms disconnected customer conversations into intelligent, personalized, and seamless customer experiences.

### One Memory. Every Channel. Zero Missed Leads.
