# Backend API (routes used by the frontend)

Base URL (local):
- `http://127.0.0.1:8000`

Tip: open Swagger UI for the latest details:
- `GET /docs`

## Health
- `GET /health`  
  Returns `{ "status": "ok" }`

## Yield prediction
- `POST /predict-yield/`  
  Predicts yield, price, profit, confidence score, and an explanation.

Notes:
- Area can be in `acre` or `hectare` (backend converts acre to hectare).
- You can optionally provide `rainfall_mm`. If provided, the backend applies a small adjustment.

## Expense prediction + master data
- `GET /master-data/`  
  Returns dropdown data used by the frontend.

- `POST /predict-expense/`  
  Predicts total cost + revenue + profit + cost breakdown + explanation.

- `GET /expense-predictions/`  
  Lists saved expense predictions (supports `?farmer_id=...`).

- `GET /expense-predictions/{id}`  
  Reads one saved expense prediction.

## Farmers (CRUD)
- `GET /farmers/`
- `POST /farmers/`
- `PUT /farmers/{id}`
- `DELETE /farmers/{id}`

## Farm management (CRUD + dashboard)
- `GET /dashboard/summary`
- `GET /expenses/` (supports filters like `date_from`, `date_to`, `crop`, `category`, `field_name`)
- `POST /expenses/`
- `PUT /expenses/{id}`
- `DELETE /expenses/{id}`
- `GET /budgets/`
- `POST /budgets/`
- `PUT /budgets/{id}`
- `GET /budgets/summary` (supports `?year=...&month=...`)
- `GET /fields/`
- `POST /fields/`
- `PUT /fields/{id}`
- `DELETE /fields/{id}`
- `GET /users/`
- `POST /users/`
- `PUT /users/{id}`
- `GET /alerts/` (supports `?year=...&month=...`)

## Reports (download)
These routes accept `export_format=json|csv|xlsx`:
- `GET /reports/expense`
- `GET /reports/profit`
- `GET /reports/crop-production` (optional `?crop=...`)

## AI insights
- `POST /ai/explain-profit`

If `OPENROUTER_API_KEY` is missing, the backend returns a fallback explanation.

