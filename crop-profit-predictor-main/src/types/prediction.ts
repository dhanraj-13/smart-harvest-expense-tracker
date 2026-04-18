export type ExplanationLanguage = "thanglish" | "english";

export interface ExpensePredictionInput {
  farmer_id: string;
  district: string;
  crop: string;
  season: string;
  area_hectare: number;
  sowing_date?: string;
  harvest_date?: string;
  seed_cost: number;
  fertilizer_cost: number;
  pesticide_cost: number;
  labor_cost: number;
  machine_cost: number;
  water_cost: number;
  fuel_electricity_cost: number;
  transport_cost: number;
  storage_cost: number;
  misc_cost: number;
  selling_price_per_ton: number;
  language?: ExplanationLanguage;
}

export interface CostBreakdownItem {
  key: string;
  label: string;
  amount: number;
  percentage: number;
}

export interface PredictionResult {
  predicted_total_cost: number;
  predicted_revenue: number;
  predicted_profit: number;
  predicted_yield_tons: number;
  confidence_score: number;
  cost_breakdown: CostBreakdownItem[];
  ai_explanation: string;

  farmer_id: string;
  district: string;
  crop: string;
  season: string;
  area_hectare: number;
  selling_price_per_ton: number;
  language: ExplanationLanguage;

  unit_currency?: string;
  unit_area?: string;
  unit_yield?: string;
}

export interface MasterDataResponse {
  districts: string[];
  crops: string[];
  seasons: string[];
}

export interface ApiError {
  detail: string;
  status_code?: number;
}
