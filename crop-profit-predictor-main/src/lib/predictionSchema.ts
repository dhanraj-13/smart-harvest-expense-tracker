import { z } from "zod";

export const expensePredictionFormSchema = z
  .object({
    farmer_id: z.string().min(2, "Farmer ID is required"),
    district: z.string().min(1, "Select district"),
    crop: z.string().min(1, "Select crop"),
    season: z.string().min(1, "Select season"),
    area_hectare: z.coerce.number().min(0.1, "Area should be at least 0.1 hectare"),
    sowing_date: z.string().optional(),
    harvest_date: z.string().optional(),
    selling_price_per_ton: z.coerce.number().min(1, "Selling price is required"),
    language: z.enum(["thanglish", "english"]),
    seed_cost: z.coerce.number().min(0),
    fertilizer_cost: z.coerce.number().min(0),
    pesticide_cost: z.coerce.number().min(0),
    labor_cost: z.coerce.number().min(0),
    machine_cost: z.coerce.number().min(0),
    water_cost: z.coerce.number().min(0),
    fuel_electricity_cost: z.coerce.number().min(0),
    transport_cost: z.coerce.number().min(0),
    storage_cost: z.coerce.number().min(0),
    misc_cost: z.coerce.number().min(0),
  })
  .refine(
    (data) => {
      if (!data.sowing_date || !data.harvest_date) {
        return true;
      }
      return new Date(data.harvest_date) >= new Date(data.sowing_date);
    },
    {
      message: "Harvest date should be after sowing date",
      path: ["harvest_date"],
    },
  );
