# Project Overview (Smart Harvest Tracking System)

## One-line description
Smart Harvest is a farm tracking and prediction system that helps a farmer (or farm manager) plan expenses and estimate yield, revenue, and profit.

## What is inside this repo
This project is split into 3 parts:

1) `frontend/`  
   A React (TypeScript) web app built with Vite.

2) `backend/`  
   A FastAPI server (Python) that provides:
   - farm CRUD APIs (users, fields, budgets, expenses)
   - reports (JSON/CSV/XLSX)
   - ML predictions (yield + expense)
   - AI explanation endpoints

3) `cleaned dataset/`  
   CSV files used for:
   - ML model training (Tamil Nadu crop yield dataset)
   - demo seed data for missing farm features (sample users/fields/budgets/expenses)

## Main features (simple list)
- **Yield prediction**: predicts yield + price + profit for a crop in a district and season.
- **Expense prediction**: predicts total cost and gives a category breakdown.
- **Farm management**: add expenses, set budgets, manage fields and users.
- **Alerts**: budget usage warnings (for example 80% used, exceeded).
- **Reports**: export reports in JSON, CSV, or XLSX.
- **AI explanations**: short text explanations using OpenRouter (optional).

## Tech stack (what tools are used)
Frontend:
- React + TypeScript
- Vite
- Tailwind CSS
- UI libraries (Radix UI, MUI)
- React Router

Backend:
- FastAPI (REST API)
- SQLAlchemy (database models)
- Pydantic (request/response validation)
- ML: XGBoost / scikit-learn + joblib (saved model files)

Database:
- SQLite by default (creates a local `backend/*.db` file)
- PostgreSQL supported by setting `DATABASE_URL`

## How data flows (high level)
1) Frontend collects input (district, crop, season, area, etc.).
2) Frontend calls backend APIs using `VITE_API_BASE_URL`.
3) Backend runs ML prediction code from `backend/app/ml/`.
4) Backend returns the prediction + confidence score (+ AI explanation).
5) Backend also saves some records to the database (when DB is available).

## Important notes
- Backend seeds demo farm data on startup **only if** tables are empty (it reads CSVs from `cleaned dataset/`).
- AI explanation works without `OPENROUTER_API_KEY` (fallback text is returned).
- The frontend landing page uses external images (Unsplash URLs).

