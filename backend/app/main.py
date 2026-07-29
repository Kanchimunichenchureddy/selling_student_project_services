from fastapi import FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timezone
import logging
import time

from app.config import settings
from app.schemas import QuickContactCreate, RequirementCreate, RequirementResponse
from app.services.sheets import sheets_service
from app.services.notifications import notification_service

logger = logging.getLogger("uvicorn.error")
rate_limit_store = {}

def enforce_rate_limit(request: Request):
    client_ip = request.client.host if request.client else "unknown"
    now = time.monotonic()
    window_start = now - settings.RATE_LIMIT_WINDOW_SECONDS
    recent_hits = [
        hit for hit in rate_limit_store.get(client_ip, [])
        if hit >= window_start
    ]
    if len(recent_hits) >= settings.RATE_LIMIT_MAX_SUBMISSIONS:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many submissions. Please wait a few minutes before trying again."
        )
    recent_hits.append(now)
    rate_limit_store[client_ip] = recent_hits

app = FastAPI(
    title=settings.APP_NAME,
    description="Production-grade API for Student Project Portal intake and requirement gathering",
    version="1.0.0"
)

# Enable CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", tags=["Health"])
async def root():
    return {
        "status": "online",
        "service": settings.APP_NAME,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

@app.get("/api/health", tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
        "google_sheets_configured": sheets_service.client is not None and sheets_service.spreadsheet_id is not None,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

@app.post(
    "/api/submit-requirement",
    response_model=RequirementResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["Intake Pipeline"]
)
async def submit_requirement(payload: RequirementCreate, request: Request):
    """
    Submits a student project requirement.
    Validates input with Pydantic, appends record to Google Sheets,
    and dispatches client email & webhook notifications.
    """
    try:
        enforce_rate_limit(request)

        # 1. Append to Google Sheets workspace
        await sheets_service.append_requirement(payload)

        # 2. Dispatch instant email confirmation & webhook alert
        await notification_service.notify_all(payload)

        return RequirementResponse(
            success=True,
            message="Your project requirement has been registered successfully! Check your email for confirmation details.",
            timestamp=datetime.now(timezone.utc).isoformat()
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error handling requirement submission: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to record project requirement. Please try again or contact support."
        )

@app.post(
    "/api/quick-contact",
    response_model=RequirementResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["Intake Pipeline"]
)
async def quick_contact(payload: QuickContactCreate, request: Request):
    """Captures a short instant-help message from the floating contact widget."""
    try:
        enforce_rate_limit(request)
        await notification_service.notify_quick_contact(payload)
        return RequirementResponse(
            success=True,
            message="Your message has been sent. Our project team will contact you shortly.",
            timestamp=datetime.now(timezone.utc).isoformat()
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error handling quick contact submission: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to send instant help request. Please try WhatsApp or the full requirement form."
        )
