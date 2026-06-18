import os
import smtplib
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

logger = logging.getLogger(__name__)

SMTP_HOST = os.environ.get("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "587"))
SMTP_USER = os.environ.get("SMTP_USER")
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD")

def send_smtp_email(to_email: str, subject: str, body_text: str):
    """Sends an email using standard SMTP. Falls back to mock logs if SMTP_USER is not configured."""
    if not SMTP_USER or not SMTP_PASSWORD:
        logger.info(f"[Email Simulator] (SMTP credentials not configured) Send email to: {to_email} | Subject: {subject} | Body: {body_text}")
        return True
        
    try:
        msg = MIMEMultipart()
        msg['From'] = SMTP_USER
        msg['To'] = to_email
        msg['Subject'] = subject
        
        msg.attach(MIMEText(body_text, 'plain'))
        
        # Connect and send
        server = smtplib.SMTP(SMTP_HOST, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.sendmail(SMTP_USER, to_email, msg.as_string())
        server.quit()
        
        logger.info(f"[Email SMTP] Email successfully sent to {to_email}.")
        return True
    except Exception as e:
        logger.error(f"[Email SMTP] Failed to send email to {to_email} via SMTP: {e}")
        return False
