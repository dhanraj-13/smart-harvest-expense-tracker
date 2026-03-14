# Setup and Run Guide

This guide is written for Windows, because this repo includes `run_all.bat`.  
If you are on Mac/Linux, the same steps work (but paths are different).

## Prerequisites
- Node.js 18+ (for the frontend)
- Python 3.10+ (recommended: Python 3.11) for the backend
- (Optional) PostgreSQL if you want a real DB instead of SQLite

## Backend (FastAPI)
### 1) Create venv and install packages
```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### 2) Configure environment
```powershell
cd backend
Copy-Item .env.example .env
```

Notes:
- If you do not change `DATABASE_URL`, the backend will still run (it defaults to SQLite internally).
- If you do not set `OPENROUTER_API_KEY`, AI explanations will use a deterministic fallback.

### 3) Run backend
```powershell
cd backend
.\venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --port 8000
```

Useful links:
- Health check: `http://127.0.0.1:8000/health`
- Swagger UI: `http://127.0.0.1:8000/docs`

## Frontend (React + Vite)
### 1) Install packages
```powershell
cd frontend
npm install
```

### 2) Configure environment
```powershell
cd frontend
Copy-Item .env.example .env
```

The key value is:
- `VITE_API_BASE_URL` (example: `http://127.0.0.1:8000`)

### 3) Run frontend
```powershell
cd frontend
npm run dev -- --port 5173
```

Open:
- `http://127.0.0.1:5173`

## Start both together
After you set up both backend and frontend:
```powershell
.\run_all.bat
```

## Basic verification (quick checks)
Backend quick checks:
```powershell
cd backend
.\venv\Scripts\python.exe test_backend_features.py
```

Frontend quick check:
- Open the site and try the **Prediction Workspace** page.
- If you see API errors, confirm `frontend/.env` has the correct backend URL.

## Build (optional)
Frontend production build:
```powershell
cd frontend
npm run build
```

Backend “production style” run (no reload):
```powershell
cd backend
.\venv\Scripts\Activate.ps1
uvicorn app.main:app --host 0.0.0.0 --port 8000
```
