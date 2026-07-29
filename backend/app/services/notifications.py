import smtplib
import logging
import asyncio
import httpx
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Optional
from app.config import settings
from app.schemas import QuickContactCreate, RequirementCreate

logger = logging.getLogger("uvicorn.error")

class NotificationService:
    def __init__(self):
        self.smtp_host = settings.SMTP_HOST
        self.smtp_port = settings.SMTP_PORT
        self.smtp_user = settings.SMTP_USER
        self.smtp_password = settings.SMTP_PASSWORD
        self.sender_email = settings.SENDER_EMAIL or settings.SMTP_USER
        self.webhook_url = settings.NOTIFICATION_WEBHOOK_URL

    def send_client_email_sync(self, req: RequirementCreate) -> bool:
        """Sends a rich HTML & Plain Text confirmation email to the student and an admin alert copy."""
        if not self.smtp_host or not self.smtp_user or not self.smtp_password:
            logger.info(f"[MOCK EMAIL SINK] Email confirmation queued for student: {req.email}")
            return True

        import email.utils

        try:
            # 1. Build Student Confirmation Email
            msg = MIMEMultipart("alternative")
            msg["Subject"] = f"Project Requirement Confirmation - NexGen Architects ({req.selected_project_title})"
            msg["From"] = f"NexGen Architects <{self.sender_email}>"
            msg["To"] = req.email
            msg["Reply-To"] = self.sender_email
            msg["Date"] = email.utils.formatdate(localtime=True)
            msg["Message-ID"] = email.utils.make_msgid(domain="nexgenprojects.dev")

            text_plain = f"""Hello {req.student_name},

Thank you for reaching out to NexGen Architects! We have received your capstone project details and our senior technical lead is reviewing your requirements.

Project Details:
- College: {req.college_name}
- Selected Title: {req.selected_project_title}
- Domain: {req.project_domain}
- Budget Range: {req.budget_range}
- Target Deadline: {req.deadline}

Our engineering lead will reach out to you via WhatsApp at {req.phone_number} or reply to this email within 2 hours.

Best regards,
NexGen Architects Team
"""

            html_content = f"""<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 24px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #1e293b; border-radius: 16px; padding: 32px; border: 1px solid #334155;">
        <h2 style="color: #818cf8; margin-top: 0;">Requirement Registered Successfully!</h2>
        <p>Dear <strong>{req.student_name}</strong>,</p>
        <p>Thank you for reaching out to <strong>NexGen Architects</strong>. We have received your capstone project details and our senior technical lead is reviewing your requirements.</p>

        <div style="background-color: #090d16; padding: 16px; border-radius: 12px; margin: 20px 0; border: 1px solid #334155;">
            <h3 style="color: #38bdf8; margin-top: 0; font-size: 14px;">Project Summary</h3>
            <p style="margin: 4px 0; font-size: 13px;"><strong>College:</strong> {req.college_name}</p>
            <p style="margin: 4px 0; font-size: 13px;"><strong>Selected Title:</strong> {req.selected_project_title}</p>
            <p style="margin: 4px 0; font-size: 13px;"><strong>Domain:</strong> {req.project_domain}</p>
            <p style="margin: 4px 0; font-size: 13px;"><strong>Budget Range:</strong> {req.budget_range}</p>
            <p style="margin: 4px 0; font-size: 13px;"><strong>Target Deadline:</strong> {req.deadline}</p>
        </div>

        <p style="font-size: 13px; color: #94a3b8;">
            Our engineering lead will reach out to you via WhatsApp at <strong>{req.phone_number}</strong> or reply to this email within 2 hours to share the system architecture blueprint and project roadmap.
        </p>

        <hr style="border: 0; border-top: 1px solid #334155; margin: 24px 0;" />
        <p style="font-size: 11px; color: #64748b; text-align: center;">
            © {req.student_name}'s Capstone Support • NexGen Architects Labs
        </p>
    </div>
</body>
</html>
"""

            msg.attach(MIMEText(text_plain, "plain"))
            msg.attach(MIMEText(html_content, "html"))

            # 2. Build Admin Alert Email (Sent to self.sender_email)
            admin_msg = MIMEMultipart("alternative")
            admin_msg["Subject"] = f"🚨 NEW LEAD: {req.student_name} ({req.project_domain})"
            admin_msg["From"] = f"NexGen Portal System <{self.sender_email}>"
            admin_msg["To"] = self.sender_email
            admin_msg["Date"] = email.utils.formatdate(localtime=True)
            admin_msg["Message-ID"] = email.utils.make_msgid(domain="nexgenprojects.dev")

            admin_plain = f"""NEW STUDENT REQUIREMENT RECEIVED:
Name: {req.student_name}
Email: {req.email}
Phone: {req.phone_number}
College: {req.college_name}
Domain: {req.project_domain}
Title: {req.selected_project_title}
Budget: {req.budget_range}
Deadline: {req.deadline}
Notes: {req.custom_requirements or 'None'}
"""
            admin_msg.attach(MIMEText(admin_plain, "plain"))

            recipients = [req.email]
            if self.sender_email and self.sender_email.lower() != req.email.lower():
                recipients.append(self.sender_email)

            with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                server.starttls()
                server.login(self.smtp_user, self.smtp_password)
                # Send student confirmation
                server.sendmail(self.sender_email, [req.email], msg.as_string())
                # Send admin notification copy (if different email)
                if self.sender_email and self.sender_email.lower() != req.email.lower():
                    server.sendmail(self.sender_email, [self.sender_email], admin_msg.as_string())

            logger.info(f"Successfully sent confirmation email to {req.email} and admin notification to {self.sender_email}")
            return True
        except Exception as e:
            logger.error(f"Failed to send email notification to {req.email}: {str(e)}")
            return False

    async def trigger_webhook(self, req: RequirementCreate) -> bool:
        """Sends an instant webhook notification to Slack/Discord/Zapier if configured."""
        if not self.webhook_url or "..." in self.webhook_url or not self.webhook_url.startswith("http"):
            logger.info(f"[MOCK WEBHOOK SINK] Webhook not configured or placeholder detected for: {req.selected_project_title}")
            return True

        payload = {
            "event": "new_project_requirement",
            "student_name": req.student_name,
            "college_name": req.college_name,
            "phone_number": req.phone_number,
            "email": req.email,
            "domain": req.project_domain,
            "project_title": req.selected_project_title,
            "budget": req.budget_range,
            "deadline": req.deadline,
            "custom_notes": req.custom_requirements or ""
        }

        try:
            async with httpx.AsyncClient(timeout=5.0) as client:
                resp = await client.post(self.webhook_url, json=payload)
                if resp.status_code < 300:
                    logger.info("Successfully dispatched requirement webhook notification.")
                    return True
                else:
                    logger.warning(f"Webhook returned status code {resp.status_code}")
                    return False
        except Exception as e:
            logger.error(f"Webhook dispatch error: {str(e)}")
            return False

    async def notify_all(self, req: RequirementCreate):
        """Dispatches both email confirmation and webhook asynchronously."""
        email_task = asyncio.to_thread(self.send_client_email_sync, req)
        webhook_task = self.trigger_webhook(req)
        await asyncio.gather(email_task, webhook_task, return_exceptions=True)

    def send_quick_contact_email_sync(self, contact: QuickContactCreate) -> bool:
        """Sends an admin alert for short floating-widget contact messages."""
        if not self.smtp_host or not self.smtp_user or not self.smtp_password or not self.sender_email:
            logger.info(f"[MOCK EMAIL SINK] Quick contact queued from: {contact.contact}")
            return True

        import email.utils

        try:
            msg = MIMEMultipart("alternative")
            msg["Subject"] = f"Instant Help Request - {contact.name}"
            msg["From"] = f"NexGen Portal System <{self.sender_email}>"
            msg["To"] = self.sender_email
            msg["Reply-To"] = contact.contact if "@" in contact.contact else self.sender_email
            msg["Date"] = email.utils.formatdate(localtime=True)
            msg["Message-ID"] = email.utils.make_msgid(domain="nexgenprojects.dev")

            text_plain = f"""INSTANT PROJECT HELP REQUEST
Name: {contact.name}
Contact: {contact.contact}
Source: {contact.source}

Message:
{contact.message}
"""
            msg.attach(MIMEText(text_plain, "plain"))

            with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                server.starttls()
                server.login(self.smtp_user, self.smtp_password)
                server.sendmail(self.sender_email, [self.sender_email], msg.as_string())

            logger.info(f"Successfully sent quick contact alert for {contact.contact}")
            return True
        except Exception as e:
            logger.error(f"Failed to send quick contact alert: {str(e)}")
            return False

    async def trigger_quick_contact_webhook(self, contact: QuickContactCreate) -> bool:
        if not self.webhook_url or "..." in self.webhook_url or not self.webhook_url.startswith("http"):
            logger.info(f"[MOCK WEBHOOK SINK] Quick contact webhook not configured for: {contact.contact}")
            return True

        payload = {
            "event": "quick_project_help_request",
            "name": contact.name,
            "contact": contact.contact,
            "message": contact.message,
            "source": contact.source or "floating_widget"
        }

        try:
            async with httpx.AsyncClient(timeout=5.0) as client:
                resp = await client.post(self.webhook_url, json=payload)
                return resp.status_code < 300
        except Exception as e:
            logger.error(f"Quick contact webhook dispatch error: {str(e)}")
            return False

    async def notify_quick_contact(self, contact: QuickContactCreate):
        email_task = asyncio.to_thread(self.send_quick_contact_email_sync, contact)
        webhook_task = self.trigger_quick_contact_webhook(contact)
        await asyncio.gather(email_task, webhook_task, return_exceptions=True)

notification_service = NotificationService()
