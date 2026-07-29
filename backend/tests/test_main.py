import pytest
from fastapi.testclient import TestClient
from app.schemas import RequirementCreate
from app.main import app, rate_limit_store
from app.services import sheets, notifications

client = TestClient(app)

@pytest.fixture(autouse=True)
def mock_external_services(monkeypatch):
    rate_limit_store.clear()

    async def fake_append_requirement(payload):
        return True

    async def fake_notify_all(payload):
        return None

    monkeypatch.setattr(sheets.sheets_service, "append_requirement", fake_append_requirement)
    monkeypatch.setattr(notifications.notification_service, "notify_all", fake_notify_all)
    monkeypatch.setattr(notifications.notification_service, "notify_quick_contact", fake_notify_all)

def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"

def test_submit_requirement_valid():
    payload = {
        "student_name": "Teja Kanchi",
        "college_name": "IIT Bombay",
        "phone_number": "+91 9876543210",
        "email": "teja@example.com",
        "project_domain": "AI-ML",
        "selected_project_title": "Autonomous LLM Multi-Agent System",
        "budget_range": "₹10k-₹20k",
        "deadline": "2026-08-15",
        "custom_requirements": "Include Docker compose setup and full report."
    }
    response = client.post("/api/submit-requirement", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["success"] is True
    assert "registered successfully" in data["message"]

def test_submit_requirement_invalid_email():
    payload = {
        "student_name": "Teja Kanchi",
        "college_name": "IIT Bombay",
        "phone_number": "+91 9876543210",
        "email": "not-an-email",
        "project_domain": "AI-ML",
        "selected_project_title": "Autonomous LLM Multi-Agent System",
        "budget_range": "₹10k-₹20k",
        "deadline": "2026-08-15"
    }
    response = client.post("/api/submit-requirement", json=payload)
    assert response.status_code == 422

def test_submit_requirement_invalid_phone():
    payload = {
        "student_name": "Teja Kanchi",
        "college_name": "IIT Bombay",
        "phone_number": "123",
        "email": "teja@example.com",
        "project_domain": "AI-ML",
        "selected_project_title": "Autonomous LLM Multi-Agent System",
        "budget_range": "₹10k-₹20k",
        "deadline": "2026-08-15"
    }
    response = client.post("/api/submit-requirement", json=payload)
    assert response.status_code == 422

def test_submit_requirement_honeypot_rejected():
    payload = {
        "student_name": "Teja Kanchi",
        "college_name": "IIT Bombay",
        "phone_number": "+91 9876543210",
        "email": "teja@example.com",
        "project_domain": "AI-ML",
        "selected_project_title": "Autonomous LLM Multi-Agent System",
        "budget_range": "₹10k-₹20k",
        "deadline": "2026-08-15",
        "company_website": "https://spam.example"
    }
    response = client.post("/api/submit-requirement", json=payload)
    assert response.status_code == 422

def test_submit_requirement_rate_limited(monkeypatch):
    monkeypatch.setattr("app.main.settings.RATE_LIMIT_MAX_SUBMISSIONS", 2)
    payload = {
        "student_name": "Teja Kanchi",
        "college_name": "IIT Bombay",
        "phone_number": "+91 9876543210",
        "email": "teja@example.com",
        "project_domain": "AI-ML",
        "selected_project_title": "Autonomous LLM Multi-Agent System",
        "budget_range": "₹10k-₹20k",
        "deadline": "2026-08-15"
    }

    assert client.post("/api/submit-requirement", json=payload).status_code == 201
    assert client.post("/api/submit-requirement", json=payload).status_code == 201
    response = client.post("/api/submit-requirement", json=payload)
    assert response.status_code == 429

def test_sheets_service_writes_backup_when_not_configured(monkeypatch, tmp_path):
    backup_path = tmp_path / "lead_backup.jsonl"
    monkeypatch.setattr("app.services.sheets.settings.LEAD_BACKUP_PATH", str(backup_path))
    monkeypatch.setattr(sheets.sheets_service, "client", None)
    monkeypatch.setattr(sheets.sheets_service, "spreadsheet_id", None)

    payload = RequirementCreate(
        student_name="Teja Kanchi",
        college_name="IIT Bombay",
        phone_number="+91 9876543210",
        email="teja@example.com",
        project_domain="AI-ML",
        selected_project_title="Autonomous LLM Multi-Agent System",
        budget_range="₹10k-₹20k",
        deadline="2026-08-15"
    )

    assert sheets.sheets_service.append_requirement_sync(payload) is True
    backup_content = backup_path.read_text(encoding="utf-8")
    assert "teja@example.com" in backup_content
    assert "google_sheets_not_configured" in backup_content

def test_quick_contact_valid():
    payload = {
        "name": "Teja Kanchi",
        "contact": "+91 9876543210",
        "message": "I need instant help choosing an AI capstone project."
    }
    response = client.post("/api/quick-contact", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["success"] is True

def test_quick_contact_honeypot_rejected():
    payload = {
        "name": "Teja Kanchi",
        "contact": "+91 9876543210",
        "message": "I need instant help choosing an AI capstone project.",
        "company_website": "https://spam.example"
    }
    response = client.post("/api/quick-contact", json=payload)
    assert response.status_code == 422
