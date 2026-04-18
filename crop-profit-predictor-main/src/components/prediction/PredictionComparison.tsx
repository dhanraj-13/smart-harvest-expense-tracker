import { useState } from "react";
import {
  IndianRupee,
  Scale,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react";

import { usePredictionHistory } from "@/hooks/usePredictionHistory";
import { PredictionResult } from "@/types/prediction";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ComparisonCardProps {
  result: PredictionResult;
  label: string;
  onRemove: () => void;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function ComparisonCard({ result, label, onRemove }: ComparisonCardProps) {
  const isProfitable = result.predicted_profit >= 0;

  return (
    <Card className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 h-6 w-6"
        onClick={onRemove}
      >
        <X className="h-4 w-4" />
      </Button>

      <CardHeader className="pb-2">
        <Badge variant="outline" className="w-fit">
          {label}
        </Badge>
        <CardTitle className="text-lg">
          {result.crop} - {result.district}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {result.season} | {result.area_hectare.toFixed(2)} ha
        </p>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Total Cost</span>
          <span className="font-semibold">{formatCurrency(result.predicted_total_cost)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Revenue</span>
          <span className="font-semibold">{formatCurrency(result.predicted_revenue)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Confidence</span>
          <span className="font-semibold">{(result.confidence_score * 100).toFixed(0)}%</span>
        </div>

        <div className={`rounded-lg p-3 ${isProfitable ? "bg-chart-1/10" : "bg-destructive/10"}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isProfitable ? (
                <TrendingUp className="h-4 w-4 text-chart-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
              <span className="text-sm font-medium">Profit</span>
            </div>
            <span className={`font-bold ${isProfitable ? "text-chart-1" : "text-destructive"}`}>
              {formatCurrency(result.predicted_profit)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function PredictionComparison() {
  const { history } = usePredictionHistory();
  const [selectedA, setSelectedA] = useState<string | null>(null);
  const [selectedB, setSelectedB] = useState<string | null>(null);

  const predictionA = history.find((item) => item.id === selectedA)?.result;
  const predictionB = history.find((item) => item.id === selectedB)?.result;

  if (history.length < 2) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <Scale className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
          <p className="text-muted-foreground">Not enough predictions to compare</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Make at least 2 predictions to use comparison.
          </p>
        </CardContent>
      </Card>
    );
  }

  const availableForA = history.filter((item) => item.id !== selectedB);
  const availableForB = history.filter((item) => item.id !== selectedA);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">First Prediction</label>
          <Select value={selectedA || ""} onValueChange={setSelectedA}>
            <SelectTrigger>
              <SelectValue placeholder="Select a prediction" />
            </SelectTrigger>
            <SelectContent>
              {availableForA.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.result.crop} - {item.result.district} ({item.result.season})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Second Prediction</label>
          <Select value={selectedB || ""} onValueChange={setSelectedB}>
            <SelectTrigger>
              <SelectValue placeholder="Select a prediction" />
            </SelectTrigger>
            <SelectContent>
              {availableForB.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.result.crop} - {item.result.district} ({item.result.season})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {(predictionA || predictionB) && (
        <div className="grid gap-4 md:grid-cols-2">
          {predictionA && (
            <ComparisonCard
              result={predictionA}
              label="Option A"
              onRemove={() => setSelectedA(null)}
            />
          )}
          {predictionB && (
            <ComparisonCard
              result={predictionB}
              label="Option B"
              onRemove={() => setSelectedB(null)}
            />
          )}
        </div>
      )}

      {predictionA && predictionB && (
        <Card className="border-primary/50 bg-primary/5">
          <CardContent className="py-4">
            <h4 className="mb-3 flex items-center gap-2 font-medium">
              <IndianRupee className="h-4 w-4" />
              Expense Comparison Summary
            </h4>

            <div className="grid gap-4 text-sm md:grid-cols-3">
              <div>
                <span className="text-muted-foreground">Lower Cost</span>
                <p className="font-semibold">
                  {predictionA.predicted_total_cost < predictionB.predicted_total_cost
                    ? predictionA.crop
                    : predictionB.crop}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Higher Revenue</span>
                <p className="font-semibold">
                  {predictionA.predicted_revenue > predictionB.predicted_revenue
                    ? predictionA.crop
                    : predictionB.crop}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Better Profit</span>
                <p className="font-semibold">
                  {predictionA.predicted_profit > predictionB.predicted_profit
                    ? predictionA.crop
                    : predictionB.crop}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
