# Smart Harvest Tracking System

Smart Harvest is a full-stack demo project for **farm management + ML predictions**.

It has:
- A **FastAPI backend** (Python) for CRUD, reports, and ML/AI endpoints
- A **React + Vite frontend** (TypeScript) for the UI
- A small **dataset folder** used for demo data + model training

## What you can do in the app
- Predict **crop yield, revenue, and profit** using an ML model trained on Tamil Nadu data
- Predict **total farming cost** and see a **cost breakdown**
- Get a simple **AI explanation** (OpenRouter when key is available, otherwise a safe fallback)
- Manage farm data: **expenses, budgets, fields, users, alerts**
- Download reports as **JSON / CSV / XLSX**

## Tech stack (simple)
- Frontend: React, Vite, TypeScript, Tailwind CSS, Radix UI, MUI
- Backend: FastAPI, SQLAlchemy, Pydantic, XGBoost / scikit-learn
- Database: SQLite by default (PostgreSQL supported via `DATABASE_URL`)

## Quick start (Windows)
### 1) Backend
```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
uvicorn app.main:app --reload --port 8000
```

### 2) Frontend
Open a new terminal:
```powershell
cd frontend
npm install
Copy-Item .env.example .env
npm run dev -- --port 5173
```

Frontend: `http://127.0.0.1:5173`  
Backend (API docs): `http://127.0.0.1:8000/docs`

### 3) Start both (optional)
If you already created the backend venv and installed frontend packages:
```powershell
.\run_all.bat
```

## Environment variables (important)
Backend: `backend/.env`
- `DATABASE_URL` (optional, default is SQLite)
- `OPENROUTER_API_KEY` (optional, enables real AI explanations)

Frontend: `frontend/.env`
- `VITE_API_BASE_URL` (example uses `http://127.0.0.1:8000`)

Do not commit real `.env` files to GitHub.

## Project docs
More details are in the `readme/` folder:
- `readme/README.md`
- `readme/SETUP.md`
- `readme/API.md`
- `readme/ML_MODELS.md`
- `readme/DATASETS.md`

## Before you push to GitHub
This project folder currently contains some items that are usually **not** pushed to GitHub:
- `frontend/node_modules/` (very large)
- `backend/venv/` and `backend/__pycache__/`
- Logs like `backend/*.log`
- Secrets like `backend/.env`
- A nested git repo at `backend/.git/` (remove it unless you want a submodule)

This repo includes a root `.gitignore` to help (see `.gitignore`).

