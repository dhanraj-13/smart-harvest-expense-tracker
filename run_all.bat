@echo off
echo Starting Smart Harvest Backend...
start cmd /k "cd backend && .\venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000"

echo Starting Smart Harvest Frontend...
start cmd /k "cd FRONTEND!\Followinstructions-main && npm run dev -- --host 127.0.0.1 --port 5173 --strictPort"

echo Both services are starting in separate windows.
