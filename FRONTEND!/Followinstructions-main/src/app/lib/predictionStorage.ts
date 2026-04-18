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
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LAST_PREDICTION_KEY, JSON.stringify(value));
  } catch {
    // Ignore storage failures (private mode/restricted browser policies).
  }
}

export function getLastPrediction(): StoredPrediction | null {
  if (typeof window === "undefined") return null;
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(LAST_PREDICTION_KEY);
  } catch {
    return null;
  }
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredPrediction;
  } catch {
    return null;
  }
}
