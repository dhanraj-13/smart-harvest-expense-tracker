import { useCallback, useEffect, useState } from "react";

import { PredictionResult } from "@/types/prediction";

export interface HistoryEntry {
  id: string;
  timestamp: string;
  result: PredictionResult;
}

const STORAGE_KEY = "prediction_history";
const MAX_HISTORY = 50;

function isExpensePrediction(result: unknown): result is PredictionResult {
  const value = result as Partial<PredictionResult>;
  return (
    !!value &&
    typeof value.predicted_total_cost === "number" &&
    typeof value.predicted_revenue === "number" &&
    typeof value.predicted_profit === "number"
  );
}

function migrateLegacyResult(result: unknown): PredictionResult | null {
  const value = result as Record<string, unknown> | null;

  if (isExpensePrediction(result)) {
    return result;
  }

  if (
    value &&
    typeof value.predicted_yield === "number" &&
    typeof value.predicted_price === "number" &&
    typeof value.predicted_profit === "number"
  ) {
    const predictedYield = Number(value.predicted_yield);
    const predictedPrice = Number(value.predicted_price);
    const predictedProfit = Number(value.predicted_profit);
    const predictedRevenue = predictedYield * predictedPrice;
    const predictedTotalCost = predictedRevenue - predictedProfit;

    return {
      predicted_total_cost: Number.isFinite(predictedTotalCost) ? predictedTotalCost : 0,
      predicted_revenue: Number.isFinite(predictedRevenue) ? predictedRevenue : 0,
      predicted_profit: Number.isFinite(predictedProfit) ? predictedProfit : 0,
      predicted_yield_tons: predictedYield,
      confidence_score:
        typeof value.confidence_score === "number" ? Number(value.confidence_score) : 0.6,
      cost_breakdown: [],
      ai_explanation:
        typeof value.ai_explanation === "string"
          ? value.ai_explanation
          : "Legacy prediction migrated.",
      farmer_id: typeof value.farmer_id === "string" ? value.farmer_id : "LEGACY_ENTRY",
      district: typeof value.district === "string" ? value.district : "Unknown",
      crop: typeof value.crop === "string" ? value.crop : "Unknown",
      season: typeof value.season === "string" ? value.season : "Unknown",
      area_hectare:
        typeof value.area === "number"
          ? Number(value.area)
          : typeof value.area_hectare === "number"
            ? Number(value.area_hectare)
            : 0,
      selling_price_per_ton: predictedPrice,
      language:
        value.language === "thanglish" || value.language === "english"
          ? value.language
          : "english",
      unit_currency: typeof value.unit_currency === "string" ? value.unit_currency : "INR",
      unit_area: typeof value.unit_area === "string" ? value.unit_area : "hectare",
      unit_yield: typeof value.unit_yield === "string" ? value.unit_yield : "tons",
    };
  }

  return null;
}

export function usePredictionHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return;
    }

    try {
      const parsed = JSON.parse(stored) as Array<Partial<HistoryEntry>>;
      const normalized = parsed
        .map((entry) => {
          const migratedResult = migrateLegacyResult(entry?.result);
          if (!migratedResult) {
            return null;
          }

          return {
            id: entry?.id ?? crypto.randomUUID(),
            timestamp: entry?.timestamp ?? new Date().toISOString(),
            result: migratedResult,
          } as HistoryEntry;
        })
        .filter((entry): entry is HistoryEntry => entry !== null);

      setHistory(normalized);
    } catch {
      setHistory([]);
    }
  }, []);

  const saveHistory = useCallback((entries: HistoryEntry[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    setHistory(entries);
  }, []);

  const addPrediction = useCallback(
    (result: PredictionResult) => {
      const entry: HistoryEntry = {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        result,
      };

      const updated = [entry, ...history].slice(0, MAX_HISTORY);
      saveHistory(updated);
      return entry;
    },
    [history, saveHistory],
  );

  const removePrediction = useCallback(
    (id: string) => {
      const updated = history.filter((entry) => entry.id !== id);
      saveHistory(updated);
    },
    [history, saveHistory],
  );

  const clearHistory = useCallback(() => {
    saveHistory([]);
  }, [saveHistory]);

  return {
    history,
    addPrediction,
    removePrediction,
    clearHistory,
  };
}
