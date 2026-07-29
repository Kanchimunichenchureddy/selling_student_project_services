import re
from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Optional, List
from datetime import datetime

class RequirementCreate(BaseModel):
    student_name: str = Field(..., min_length=2, max_length=100, description="Full name of the student")
    college_name: str = Field(..., min_length=2, max_length=150, description="Name of the college/university")
    phone_number: str = Field(..., description="Contact phone number with area code or standard format")
    email: EmailStr = Field(..., description="Valid student email address")
    project_domain: str = Field(..., description="Domain e.g. Web Dev, AI/ML, DevOps & Cloud, Mobile, Custom")
    selected_project_title: str = Field(..., min_length=2, max_length=200, description="Title of selected or custom project")
    budget_range: str = Field(..., description="Budget range selection")
    deadline: str = Field(..., description="Project deadline date (YYYY-MM-DD or formatted date)")
    custom_requirements: Optional[str] = Field(default="", max_length=2000, description="Additional feature notes or requirements")
    company_website: Optional[str] = Field(default="", max_length=200, description="Hidden honeypot field; must remain empty")

    @field_validator("phone_number")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        cleaned = re.sub(r"[\s\-\(\)\+]", "", v)
        if not cleaned.isdigit() or len(cleaned) < 10 or len(cleaned) > 15:
            raise ValueError("Phone number must contain between 10 and 15 digits.")
        return v.strip()

    @field_validator("student_name", "college_name", "selected_project_title")
    @classmethod
    def sanitize_strings(cls, v: str) -> str:
        return v.strip()

    @field_validator("company_website")
    @classmethod
    def validate_honeypot(cls, v: Optional[str]) -> str:
        if v and v.strip():
            raise ValueError("Invalid submission.")
        return ""


class RequirementResponse(BaseModel):
    success: bool
    message: str
    record_id: Optional[str] = None
    timestamp: str


class QuickContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, description="Visitor name")
    contact: str = Field(..., min_length=5, max_length=120, description="WhatsApp number or email")
    message: str = Field(..., min_length=10, max_length=1000, description="Short project help message")
    source: Optional[str] = Field(default="floating_widget", max_length=80)
    company_website: Optional[str] = Field(default="", max_length=200, description="Hidden honeypot field; must remain empty")

    @field_validator("name", "contact", "message")
    @classmethod
    def sanitize_quick_contact_strings(cls, v: str) -> str:
        return v.strip()

    @field_validator("company_website")
    @classmethod
    def validate_quick_contact_honeypot(cls, v: Optional[str]) -> str:
        if v and v.strip():
            raise ValueError("Invalid submission.")
        return ""
