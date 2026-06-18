from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import logging

# Load environment variables BEFORE importing routers
load_dotenv()

from routers import sms, voice, webchat, email, dashboard
import core.database as db

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Verve AI Backend")

# Add CORS middleware for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Verify database connection and verify schemas are created
try:
    logger.info("Initializing database and tables...")
    # Trigger db engine metadata creation (already run in database.py, but log it)
    logger.info("Database initialized successfully.")
except Exception as e:
    logger.error(f"Database initialization failed: {e}")

# Include routers
app.include_router(sms.router, prefix="/api", tags=["SMS"])
app.include_router(voice.router, prefix="", tags=["Voice"])
app.include_router(webchat.router, prefix="", tags=["Webchat"])
app.include_router(email.router, prefix="", tags=["Email"])
app.include_router(dashboard.router, prefix="", tags=["Dashboard"])

@app.get("/")
async def root():
    return {"message": "Verve AI Backend is running"}
