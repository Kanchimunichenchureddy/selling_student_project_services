import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List, Optional

class Settings(BaseSettings):
    APP_NAME: str = "Student Project Portal API"
    ENVIRONMENT: str = "production"
    
    # Google Sheets Configuration
    GOOGLE_SERVICE_ACCOUNT_JSON: Optional[str] = None
    SPREADSHEET_ID: Optional[str] = None
    SHEET_NAME: str = "Sheet1"
    LEAD_BACKUP_PATH: str = "data/lead_backup.jsonl"
    
    # SMTP / Email Configuration
    SMTP_HOST: Optional[str] = None
    SMTP_PORT: int = 587
    SMTP_USER: Optional[str] = None
    SMTP_PASSWORD: Optional[str] = None
    SENDER_EMAIL: Optional[str] = None
    WHATSAPP_NUMBER: Optional[str] = None

    # Webhook Notification (Slack/Discord/Custom)
    NOTIFICATION_WEBHOOK_URL: Optional[str] = None

    # CORS Configuration
    ALLOWED_ORIGINS: str = "*"

    # Lightweight in-memory abuse protection
    RATE_LIMIT_WINDOW_SECONDS: int = 600
    RATE_LIMIT_MAX_SUBMISSIONS: int = 5

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )

    @property
    def cors_origins_list(self) -> List[str]:
        if not self.ALLOWED_ORIGINS or self.ALLOWED_ORIGINS == "*":
            return ["*"]
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",")]

settings = Settings()
