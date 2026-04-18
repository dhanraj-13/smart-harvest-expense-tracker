import { apiRequest } from "./apiClient";

export type PredictExpenseRequest = {
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
  selling_price: number;
  price_unit: "kg" | "ton";
  selling_price_per_ton?: number;
  language: "english" | "tamil" | "thanglish";
};

export type CostBreakdownItem = {
  key: string;
  label: string;
  amount: number;
  percentage: number;
};

export type PredictExpenseResponse = {
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
  selling_price: number;
  price_unit: "kg" | "ton";
  selling_price_per_ton: number;
  language: "english" | "tamil" | "thanglish";
};

export async function predictExpense(payload: PredictExpenseRequest): Promise<PredictExpenseResponse> {
  return apiRequest<PredictExpenseResponse>("/api/predict", {
    method: "POST",
    body: payload,
  });
}
