## Dataset Audit

### Real files used for backend and ML
- `Tamilnadu_agriculture_yield_data.csv`
  - Primary yield/profit ML dataset.
  - Used for training the yield model, crop master data, and crop production reporting.
- `rainfall_data.csv`
  - Used for rainfall-aware yield adjustment when rainfall input is provided.

### Sample app datasets added for missing backend features
- `farm_users_sample.csv`
  - Multi-user roles: Admin, Editor, Viewer.
- `farm_fields_sample.csv`
  - Field management data with crop, district, season, area, GPS, and soil type.
- `farm_budgets_sample.csv`
  - Category-wise monthly budgets for dashboard, budget tracking, and alerts.
- `farm_expenses_sample.csv`
  - Daily expense history for dashboard, expense history, reports, and alerts.

### Existing files not required for the current backend flow
- `Tamilnadu_Crop-Production.csv`
  - Overlaps with the main yield dataset for current ML needs.
- `crop_production_history.csv`
  - Useful as reference, but not required because production reports are generated from the main yield dataset.
- `rice_production.csv`
  - Rice-only reference file; not needed for the generalized backend.
- `land_use.csv`
  - Useful for future land benchmarking, but not required for the current backend feature set.
