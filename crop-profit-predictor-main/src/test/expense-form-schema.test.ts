import { describe, expect, it } from "vitest";

import { expensePredictionFormSchema } from "@/lib/predictionSchema";

const validPayload = {
  farmer_id: "FARMER_101",
  district: "Thanjavur",
  crop: "Rice",
  season: "Kharif",
  area_hectare: 2.5,
  sowing_date: "2026-06-10",
  harvest_date: "2026-10-20",
  selling_price_per_ton: 23000,
  language: "thanglish",
  seed_cost: 10000,
  fertilizer_cost: 12000,
  pesticide_cost: 5000,
  labor_cost: 25000,
  machine_cost: 9000,
  water_cost: 6000,
  fuel_electricity_cost: 3000,
  transport_cost: 2500,
  storage_cost: 2000,
  misc_cost: 1800,
};

describe("expensePredictionFormSchema", () => {
  it("accepts a valid harvest-cycle payload", () => {
    const parsed = expensePredictionFormSchema.parse(validPayload);
    expect(parsed.crop).toBe("Rice");
    expect(parsed.language).toBe("thanglish");
  });

  it("rejects negative expense input", () => {
    const invalid = { ...validPayload, labor_cost: -1 };
    expect(() => expensePredictionFormSchema.parse(invalid)).toThrow();
  });

  it("rejects harvest_date before sowing_date", () => {
    const invalid = {
      ...validPayload,
      sowing_date: "2026-11-01",
      harvest_date: "2026-10-01",
    };
    expect(() => expensePredictionFormSchema.parse(invalid)).toThrow(
      /Harvest date should be after sowing date/i,
    );
  });
});
