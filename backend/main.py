from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import logging

# Load environment variables BEFORE importing routers
load_dotenv()

from routers import sms, voice, webchat, email
logging.basicConfig(level=logging.INFO)

app = FastAPI(title="Verve AI Backend")

# Add CORS middleware for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(sms.router, prefix="/api", tags=["SMS"])
app.include_router(voice.router, prefix="", tags=["Voice"])
app.include_router(webchat.router, prefix="", tags=["Webchat"])
app.include_router(email.router, prefix="", tags=["Email"])

@app.get("/")
async def root():
    return {"message": "Verve AI Backend is running"}
