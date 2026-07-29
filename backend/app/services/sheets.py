import json
import base64
import logging
import asyncio
from pathlib import Path
from datetime import datetime, timezone
from typing import Dict, Any, List, Optional
import gspread
from google.oauth2.service_account import Credentials
from app.config import settings
from app.schemas import RequirementCreate

logger = logging.getLogger("uvicorn.error")

SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive"
]

class GoogleSheetsService:
    def __init__(self):
        self.client: Optional[gspread.Client] = None
        self.spreadsheet_id: Optional[str] = settings.SPREADSHEET_ID
        self.sheet_name: str = settings.SHEET_NAME
        self._initialize_client()

    def _initialize_client(self):
        import os
        env_cred = settings.GOOGLE_SERVICE_ACCOUNT_JSON

        # Auto-detect local credentials file if env var is empty
        if not env_cred:
            possible_files = ["service_account.json", "credentials.json", "backend/service_account.json"]
            for pf in possible_files:
                if os.path.exists(pf):
                    env_cred = pf
                    logger.info(f"Auto-detected local service account credentials file: {pf}")
                    break

        if not env_cred:
            logger.warning("GOOGLE_SERVICE_ACCOUNT_JSON environment variable or service_account.json file not found. Running in dry-run mode.")
            return

        try:
            # Parse creds: Could be direct JSON string, file path, or Base64 encoded string
            cred_dict = None
            if os.path.exists(env_cred):
                with open(env_cred, "r") as f:
                    cred_dict = json.load(f)
            elif env_cred.strip().startswith("{"):
                cred_dict = json.loads(env_cred)
            else:
                # Try decoding base64
                decoded = base64.b64decode(env_cred).decode("utf-8")
                cred_dict = json.loads(decoded)

            credentials = Credentials.from_service_account_info(cred_dict, scopes=SCOPES)
            self.client = gspread.authorize(credentials)
            logger.info("Successfully authenticated Google Sheets service account.")
        except Exception as e:
            logger.error(f"Failed to initialize Google Sheets client: {str(e)}")
            self.client = None

    def _ensure_header(self, worksheet):
        """Ensures the worksheet has header row if empty."""
        try:
            existing = worksheet.row_values(1)
            if not existing:
                headers = [
                    "Timestamp", "Student Name", "College Name", "Phone Number",
                    "Email", "Project Domain", "Project Title", "Budget Range",
                    "Deadline", "Custom Requirements"
                ]
                worksheet.append_row(headers)
        except Exception as e:
            logger.warning(f"Could not verify or write headers to sheet: {str(e)}")

    def _append_backup(self, req: RequirementCreate, reason: str) -> bool:
        backup_path = Path(settings.LEAD_BACKUP_PATH)
        backup_path.parent.mkdir(parents=True, exist_ok=True)
        record = {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "reason": reason,
            "student_name": req.student_name,
            "college_name": req.college_name,
            "phone_number": req.phone_number,
            "email": req.email,
            "project_domain": req.project_domain,
            "selected_project_title": req.selected_project_title,
            "budget_range": req.budget_range,
            "deadline": req.deadline,
            "custom_requirements": req.custom_requirements or ""
        }
        with backup_path.open("a", encoding="utf-8") as f:
            f.write(json.dumps(record, ensure_ascii=False) + "\n")
        logger.warning(f"Stored requirement in local backup queue: {backup_path}")
        return True

    def append_requirement_sync(self, req: RequirementCreate) -> bool:
        timestamp = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")
        row_data = [
            timestamp,
            req.student_name,
            req.college_name,
            req.phone_number,
            req.email,
            req.project_domain,
            req.selected_project_title,
            req.budget_range,
            req.deadline,
            req.custom_requirements or ""
        ]

        if not self.client or not self.spreadsheet_id:
            logger.info(f"[DRY-RUN / MOCK SINK] Requirement received: {row_data}")
            return self._append_backup(req, "google_sheets_not_configured")

        # Retry logic for network/throttling resiliency
        max_retries = 3
        for attempt in range(1, max_retries + 1):
            try:
                sheet = self.client.open_by_key(self.spreadsheet_id)
                worksheet = sheet.worksheet(self.sheet_name)
                self._ensure_header(worksheet)
                worksheet.append_row(row_data)
                logger.info(f"Successfully appended requirement for {req.email} to Google Sheets.")
                return True
            except Exception as e:
                logger.warning(f"Google Sheets append attempt {attempt}/{max_retries} failed: {str(e)}")
                if attempt == max_retries:
                    logger.error("All retries for Google Sheets append failed.")
                    return self._append_backup(req, f"google_sheets_error: {str(e)}")

    async def append_requirement(self, req: RequirementCreate) -> bool:
        """Asynchronous execution wrapper to prevent blocking FastAPI event loop."""
        return await asyncio.to_thread(self.append_requirement_sync, req)

sheets_service = GoogleSheetsService()
