import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Brain,
  Gauge,
  IndianRupee,
  Tractor,
  TrendingDown,
  TrendingUp,
  Wheat,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PredictionResult } from "@/types/prediction";

interface PredictionResultsProps {
  result: PredictionResult;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatNumber(value: number, decimals = 2): string {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: decimals }).format(value);
}

const BAR_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--primary))",
  "hsl(var(--muted-foreground))",
];

export function PredictionResults({ result }: PredictionResultsProps) {
  const isProfitable = result.predicted_profit >= 0;
  const breakdownData = result.cost_breakdown
    .slice(0, 7)
    .map((item) => ({
      name: item.label,
      amount: Math.abs(item.amount),
      percentage: item.percentage,
      signedAmount: item.amount,
    }));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline">Farmer: {result.farmer_id}</Badge>
        <Badge variant="outline">Crop: {result.crop}</Badge>
        <Badge variant="outline">District: {result.district}</Badge>
        <Badge variant="outline">Season: {result.season}</Badge>
        <Badge variant="outline">Area: {formatNumber(result.area_hectare)} hectare</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <IndianRupee className="h-4 w-4" />
              Predicted Total Cost
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(result.predicted_total_cost)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              Predicted Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(result.predicted_revenue)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              {isProfitable ? (
                <TrendingUp className="h-4 w-4 text-chart-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
              Predicted Profit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${isProfitable ? "text-chart-1" : "text-destructive"}`}>
              {formatCurrency(result.predicted_profit)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Wheat className="h-4 w-4" />
              Predicted Yield
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatNumber(result.predicted_yield_tons)} tons</p>
            <p className="text-xs text-muted-foreground">
              Selling price: {formatCurrency(result.selling_price_per_ton)} / ton
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Tractor className="h-4 w-4" />
              Expense Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={breakdownData} margin={{ top: 8, right: 12, left: 16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    type="number"
                    tickFormatter={(value) => new Intl.NumberFormat("en-IN", { notation: "compact" }).format(Number(value))}
                  />
                  <YAxis type="category" dataKey="name" width={120} />
                  <Tooltip
                    formatter={(value: number, _name, payload: { payload: { percentage: number } }) => [
                      `${formatCurrency(Number(value))} (${payload.payload.percentage}%)`,
                      "Amount",
                    ]}
                  />
                  <Bar dataKey="amount" radius={[0, 6, 6, 0]}>
                    {breakdownData.map((item, index) => (
                      <Cell key={item.name} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted-foreground">
              Showing top {breakdownData.length} heads by amount.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Gauge className="h-4 w-4" />
              Model Confidence
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-3xl font-bold">{formatNumber(result.confidence_score * 100, 0)}%</p>
            <Progress value={result.confidence_score * 100} />
            <p className="text-xs text-muted-foreground">
              Confidence is based on model validation score and input familiarity.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Brain className="h-4 w-4" />
            AI Explanation ({result.language === "thanglish" ? "Thanglish" : "English"})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line leading-relaxed text-muted-foreground">{result.ai_explanation}</p>
        </CardContent>
      </Card>
    </div>
  );
}
