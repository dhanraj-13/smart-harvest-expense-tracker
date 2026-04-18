import axios from "axios";

import { API_BASE_URL } from "@/lib/constants";
import {
  ApiError,
  ExpensePredictionInput,
  MasterDataResponse,
  PredictionResult,
} from "@/types/prediction";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

function normalizeApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return {
        detail: error.response?.data?.detail || "Prediction failed. Please try again.",
        status_code: error.response?.status,
      };
    }
    if (error.request) {
      return {
        detail: "Cannot connect to backend server. Ensure backend is running on http://localhost:8000",
        status_code: 0,
      };
    }
  }
  return { detail: "An unexpected error occurred. Please try again." };
}

export async function getExpensePrediction(
  input: ExpensePredictionInput,
): Promise<PredictionResult> {
  try {
    const response = await api.post<PredictionResult>("/predict-expense/", input);
    return response.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}

export async function getMasterData(): Promise<MasterDataResponse> {
  try {
    const response = await api.get<MasterDataResponse>("/master-data/");
    return response.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}

export async function healthCheck(): Promise<boolean> {
  try {
    const response = await api.get("/health");
    return response.status === 200;
  } catch {
    return false;
  }
}
