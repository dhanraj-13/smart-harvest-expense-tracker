import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PredictionResults } from "@/components/prediction/PredictionResults";
import { PredictionResult } from "@/types/prediction";

const sampleResult: PredictionResult = {
  predicted_total_cost: 120000,
  predicted_revenue: 210000,
  predicted_profit: 90000,
  predicted_yield_tons: 9.5,
  confidence_score: 0.84,
  cost_breakdown: [
    { key: "labor_cost", label: "Labor", amount: 45000, percentage: 37.5 },
    { key: "seed_cost", label: "Seed", amount: 15000, percentage: 12.5 },
    { key: "water_cost", label: "Water", amount: 12000, percentage: 10 },
  ],
  ai_explanation: "Reason: Cost is driven mainly by labor.\\nRisk: Water rate can increase.\\nAction: Control top cost heads.",
  farmer_id: "FARMER_101",
  district: "Thanjavur",
  crop: "Rice",
  season: "Kharif",
  area_hectare: 3,
  selling_price_per_ton: 22000,
  language: "thanglish",
  unit_currency: "INR",
  unit_area: "hectare",
  unit_yield: "tons",
};

describe("PredictionResults", () => {
  it("renders cost/profit KPI labels and AI explanation", () => {
    render(<PredictionResults result={sampleResult} />);

    expect(screen.getByText(/Predicted Total Cost/i)).toBeInTheDocument();
    expect(screen.getByText(/Predicted Revenue/i)).toBeInTheDocument();
    expect(screen.getByText(/Predicted Profit/i)).toBeInTheDocument();
    expect(screen.getByText(/AI Explanation/i)).toBeInTheDocument();
    expect(screen.getByText(/Reason: Cost is driven mainly by labor/i)).toBeInTheDocument();
  });
});
