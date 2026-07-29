# B2B/B2C Student Project Portal & Requirement Gathering Pipeline

A production-ready, high-converting B2B/B2C student project portal with an end-to-end client onboarding and requirement-gathering pipeline. Built with React (Vite + Tailwind CSS + Framer Motion) and FastAPI (Python + Pydantic v2 + Google Sheets API sink).

---

## 🌟 Tech Stack Overview

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Framer Motion
- **Backend**: Python 3.11+, FastAPI, Pydantic v2, `gspread`, `google-auth`
- **Sink / Database**: Google Sheets API via Service Account authentication
- **Hosting**:
  - Frontend: Vercel / Netlify (Free Tier)
  - Backend: Render / Railway / Fly.io / Vercel Serverless

---

## 📁 Repository Structure

```text
freelancing-portfolio/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py               # FastAPI entry point & routers
│   │   ├── config.py             # Pydantic environment configuration
│   │   ├── schemas.py            # Pydantic v2 request/response models
│   │   └── services/
│   │       ├── __init__.py
│   │       └── sheets.py         # Asynchronous Google Sheets service
│   ├── tests/
│   │   └── test_main.py          # Pytest suite for API endpoints
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Navigation & CTA header
│   │   │   ├── Hero.jsx          # High-converting Hero section & Trust Badges
│   │   │   ├── ProjectCatalog.jsx # Filterable capstone project grid
│   │   │   ├── IntakeForm.jsx    # Client-side validated requirement form & modal
│   │   │   ├── TrustBadges.jsx   # Guarantee cards & 4-step workflow
│   │   │   └── Footer.jsx        # Site footer
│   │   ├── data/
│   │   │   └── projects.js       # Pre-configured project templates
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css             # Tailwind Directives & custom glass styles
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
└── README.md
```

---

## 🚀 Local Development Setup

### 1. Backend Setup

```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create local environment file
cp .env.example .env

# Run FastAPI development server
uvicorn app.main:app --reload --port 8000
```

- API Interactive Docs: `http://localhost:8000/docs`
- Health Check: `http://localhost:8000/api/health`

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create local environment file
cp .env.example .env

# Start Vite dev server
npm run dev
```

- Local Web App: `http://localhost:3000`

---

## 🔐 Production Readiness Checklist

Before publishing this project or pushing it to GitHub:

- Keep `backend/.env`, `backend/service_account.json`, `frontend/node_modules`, `backend/venv`, `frontend/dist`, and `backend/data` out of version control. The root `.gitignore` is configured for this.
- If a service account key was ever committed or shared, revoke and rotate it in Google Cloud.
- Set `ALLOWED_ORIGINS` to exact production frontend domains instead of `*`.
- Set `VITE_API_BASE_URL` to the deployed backend URL on Vercel/Netlify.
- Monitor `backend/data/lead_backup.jsonl`; new lines there mean Google Sheets was unavailable or not configured.
- Configure SMTP and webhook credentials only as hosting-provider environment variables.
- Use `GET /api/health` to confirm backend status and whether Google Sheets is configured.

---

## 🛠️ Step-by-Step Google Cloud & Google Sheets Setup

To write incoming student requirements directly to your Google Sheet without manual intervention:

### Step 1: Create a Google Cloud Service Account
1. Open the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (e.g., `student-project-portal`).
3. Enable the **Google Sheets API** and **Google Drive API** under **APIs & Services > Library**.
4. Go to **APIs & Services > Credentials** and click **Create Credentials > Service Account**.
5. Give the service account a name (e.g., `sheets-pipeline-sa`), click **Create and Continue**, and finish.
6. Click on the newly created Service Account, navigate to the **Keys** tab, click **Add Key > Create new key**, select **JSON**, and click **Create**. This downloads your Service Account JSON file.

### Step 2: Create & Share the Google Sheet
1. Open [Google Sheets](https://sheets.google.com) and create a new blank spreadsheet (e.g., `Student_Requirements_2026`).
2. Copy the **Spreadsheet ID** from the URL bar:
   `https://docs.google.com/spreadsheets/d/<SPREADSHEET_ID_HERE>/edit`
3. Open your downloaded Service Account JSON file and copy the `client_email` value (e.g., `sheets-pipeline-sa@project-id.iam.gserviceaccount.com`).
4. In your Google Sheet, click the **Share** button at top right and add the `client_email` as **Editor**.

---

## ☁️ Deployment Guide

### 1. Backend Deployment (Render / Railway / Vercel)

#### Deploying on Render (Free Web Service)
1. Push your repository to GitHub.
2. Log into [Render](https://render.com) and create a **New Web Service**.
3. Connect your repository and select the `backend` directory.
4. Set Build Command: `pip install -r requirements.txt`
5. Set Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
6. Add Environment Variables under **Environment**:
   - `SPREADSHEET_ID`: `<YOUR_SPREADSHEET_ID>`
   - `GOOGLE_SERVICE_ACCOUNT_JSON`: Paste the raw contents of your Service Account `.json` file (or base64 encoded string).
   - `ALLOWED_ORIGINS`: `https://your-frontend.vercel.app,http://localhost:3000`
   - `LEAD_BACKUP_PATH`: `data/lead_backup.jsonl`
   - `RATE_LIMIT_WINDOW_SECONDS`: `600`
   - `RATE_LIMIT_MAX_SUBMISSIONS`: `5`

---

### 2. Frontend Deployment (Vercel / Netlify)

#### Deploying on Vercel
1. Log into [Vercel](https://vercel.com) and click **Add New > Project**.
2. Select your GitHub repository and set the **Root Directory** to `frontend`.
3. Framework Preset will automatically be detected as **Vite**.
4. Under **Environment Variables**, add:
   - `VITE_API_BASE_URL`: `https://your-backend-service.onrender.com`
5. Click **Deploy**.

---

## 🧪 Running Unit Tests

```bash
cd backend
python -m pytest -v
```

The tests mock Google Sheets and notification delivery so they can run without live credentials or network access.
