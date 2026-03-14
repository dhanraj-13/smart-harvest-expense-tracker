# ML Models

This project includes two prediction flows:

1) **Yield prediction** (crop yield + price + profit)  
2) **Expense prediction** (total cost + revenue + profit + breakdown)

The backend stores ML artifacts in:
- `backend/app/ml/`

## Yield prediction model
What it uses:
- Crop, district, season, area (hectare)
- Optional: rainfall (a small adjustment based on `cleaned dataset/rainfall_data.csv`)

Main artifact files (already included in this repo):
- `backend/app/ml/model.pkl`
- `backend/app/ml/crop_encoder.pkl`
- `backend/app/ml/district_encoder.pkl`
- `backend/app/ml/season_encoder.pkl`
- `backend/app/ml/dataset_stats.pkl`
- `backend/app/ml/model_metrics.pkl`

### Retrain yield model
Use your own dataset:
```powershell
cd backend
.\venv\Scripts\python.exe app\ml\train_model.py "E:\path\to\your-yield-data.csv"
```

Or train using the bundled Tamil Nadu dataset:
```powershell
cd backend
.\venv\Scripts\python.exe app\ml\train_model.py
```

After training, restart the backend.

## Expense prediction model
The expense predictor accepts a cost breakdown (seed, fertilizer, labor, etc.).
If a trained expense model is missing, the backend can still respond using a safe fallback logic.

### Retrain expense model
```powershell
cd backend
.\venv\Scripts\python.exe app\ml\train_cost_model.py "E:\path\to\your-expense-data.csv"
```

After training, restart the backend.

## AI explanations (optional)
The backend can generate explanation text using OpenRouter.
This is controlled by:
- `OPENROUTER_API_KEY` in `backend/.env`

If the key is not present, the backend returns a deterministic explanation so the app still works.

