import type { PredictExpenseResponse } from "./predictionApi";

export const LAST_PREDICTION_KEY = "smart-harvest-last-prediction";

export type PredictionContext = {
  crop: string;
  district: string;
  season: string;
  areaLabel: string;
  explainLang: string;
};

export type StoredPrediction = {
  context: PredictionContext;
  response: PredictExpenseResponse;
  createdAt: string;
};

export function saveLastPrediction(value: StoredPrediction): void {
  localStorage.setItem(LAST_PREDICTION_KEY, JSON.stringify(value));
}

export function getLastPrediction(): StoredPrediction | null {
  const raw = localStorage.getItem(LAST_PREDICTION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredPrediction;
  } catch {
    return null;
  }
}
