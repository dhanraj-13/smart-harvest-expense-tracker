import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Calculator, Loader2, Sprout } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { expensePredictionFormSchema } from "@/lib/predictionSchema";
import {
  ExpensePredictionInput,
  ExplanationLanguage,
  MasterDataResponse,
} from "@/types/prediction";

interface PredictionFormProps {
  onSubmit: (data: ExpensePredictionInput) => Promise<void>;
  isLoading?: boolean;
  masterData: MasterDataResponse;
}

const EXPENSE_FIELDS: Array<{ key: keyof ExpensePredictionInput; label: string }> = [
  { key: "seed_cost", label: "Seed Cost" },
  { key: "fertilizer_cost", label: "Fertilizer Cost" },
  { key: "pesticide_cost", label: "Pesticide Cost" },
  { key: "labor_cost", label: "Labor Cost" },
  { key: "machine_cost", label: "Machine Cost" },
  { key: "water_cost", label: "Water Cost" },
  { key: "fuel_electricity_cost", label: "Fuel / Electricity Cost" },
  { key: "transport_cost", label: "Transport Cost" },
  { key: "storage_cost", label: "Storage Cost" },
  { key: "misc_cost", label: "Miscellaneous Cost" },
];

const LANGUAGE_OPTIONS: Array<{ value: ExplanationLanguage; label: string }> = [
  { value: "thanglish", label: "Thanglish (Default)" },
  { value: "english", label: "English" },
];

function currencyFormat(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function PredictionForm({ onSubmit, isLoading = false, masterData }: PredictionFormProps) {
  const form = useForm<z.infer<typeof expensePredictionFormSchema>>({
    resolver: zodResolver(expensePredictionFormSchema),
    defaultValues: {
      farmer_id: "",
      district: "",
      crop: "",
      season: "",
      area_hectare: 1,
      sowing_date: "",
      harvest_date: "",
      selling_price_per_ton: 22000,
      language: "thanglish",
      seed_cost: 0,
      fertilizer_cost: 0,
      pesticide_cost: 0,
      labor_cost: 0,
      machine_cost: 0,
      water_cost: 0,
      fuel_electricity_cost: 0,
      transport_cost: 0,
      storage_cost: 0,
      misc_cost: 0,
    },
  });

  const values = form.watch();

  const totalExpenseInput = useMemo(() => {
    return EXPENSE_FIELDS.reduce((sum, item) => sum + Number(values[item.key] || 0), 0);
  }, [values]);

  const handleSubmit = async (formValues: z.infer<typeof expensePredictionFormSchema>) => {
    const payload: ExpensePredictionInput = {
      farmer_id: formValues.farmer_id,
      district: formValues.district,
      crop: formValues.crop,
      season: formValues.season,
      area_hectare: formValues.area_hectare,
      sowing_date: formValues.sowing_date || undefined,
      harvest_date: formValues.harvest_date || undefined,
      seed_cost: formValues.seed_cost,
      fertilizer_cost: formValues.fertilizer_cost,
      pesticide_cost: formValues.pesticide_cost,
      labor_cost: formValues.labor_cost,
      machine_cost: formValues.machine_cost,
      water_cost: formValues.water_cost,
      fuel_electricity_cost: formValues.fuel_electricity_cost,
      transport_cost: formValues.transport_cost,
      storage_cost: formValues.storage_cost,
      misc_cost: formValues.misc_cost,
      selling_price_per_ton: formValues.selling_price_per_ton,
      language: formValues.language,
    };

    await onSubmit(payload);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">1. Crop Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="farmer_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Farmer ID</FormLabel>
                  <FormControl>
                    <Input placeholder="FARMER_101" {...field} />
                  </FormControl>
                  <FormDescription>Unique harvest-cycle identifier for this farmer.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="area_hectare"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area (hectare)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" min="0.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>District</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {masterData.districts.map((district) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="crop"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Crop</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select crop" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {masterData.crops.map((crop) => (
                        <SelectItem key={crop} value={crop}>
                          {crop}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="season"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Season</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select season" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {masterData.seasons.map((season) => (
                        <SelectItem key={season} value={season}>
                          {season}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="selling_price_per_ton"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selling Price Per Ton (INR)</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" step="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sowing_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sowing Date (optional)</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="harvest_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Harvest Date (optional)</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LLM Explanation Language</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {LANGUAGE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">2. Expense Entry</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {EXPENSE_FIELDS.map((expense) => (
              <FormField
                key={expense.key}
                control={form.control}
                name={expense.key as keyof z.infer<typeof expensePredictionFormSchema>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{expense.label} (INR)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">3. Review & Predict</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Farmer: {values.farmer_id || "-"}</Badge>
              <Badge variant="secondary">Crop: {values.crop || "-"}</Badge>
              <Badge variant="secondary">District: {values.district || "-"}</Badge>
              <Badge variant="secondary">Season: {values.season || "-"}</Badge>
            </div>

            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Calculator className="h-4 w-4" />
                Total Entered Expense
              </div>
              <p className="text-2xl font-semibold text-foreground">{currencyFormat(totalExpenseInput)}</p>
            </div>

            <Button type="submit" size="lg" className="w-full gap-2" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Predicting cost and profit...
                </>
              ) : (
                <>
                  <Sprout className="h-4 w-4" />
                  Predict Expense & Profit
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
