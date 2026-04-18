import { useMemo, useState } from "react";
import { format } from "date-fns";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  History as HistoryIcon,
  LineChart as LineChartIcon,
  MapPin,
  Sprout,
  Trash2,
} from "lucide-react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Layout } from "@/components/layout/Layout";
import { PredictionComparison } from "@/components/prediction/PredictionComparison";
import { PredictionResults } from "@/components/prediction/PredictionResults";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { HistoryEntry, usePredictionHistory } from "@/hooks/usePredictionHistory";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function History() {
  const { history, removePrediction, clearHistory } = usePredictionHistory();
  const { t } = useLanguage();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const chartData = useMemo(() => {
    return [...history]
      .reverse()
      .map((entry, index) => ({
        idx: index + 1,
        profit: entry.result.predicted_profit,
      }));
  }, [history]);

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="mb-2 font-serif text-3xl font-bold text-foreground md:text-4xl">
              {t("history.title")}
            </h1>
            <p className="text-muted-foreground">{t("history.description")}</p>
          </div>

          {history.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Trash2 className="h-4 w-4" />
                  {t("history.clear")}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t("history.clear")}</AlertDialogTitle>
                  <AlertDialogDescription>{t("history.clear.confirm")}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={clearHistory}>{t("history.clear")}</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>

        <div className="mx-auto max-w-6xl space-y-6">
          {history.length > 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <LineChartIcon className="h-4 w-4" />
                  Profit Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[220px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <XAxis dataKey="idx" tickLine={false} axisLine={false} />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) =>
                          new Intl.NumberFormat("en-IN", { notation: "compact" }).format(Number(value))
                        }
                      />
                      <Tooltip formatter={(value: number) => [formatCurrency(Number(value)), "Profit"]} />
                      <Line
                        type="monotone"
                        dataKey="profit"
                        stroke="hsl(var(--chart-1))"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}

          <Tabs defaultValue="history" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="history" className="gap-2">
                <HistoryIcon className="h-4 w-4" />
                {t("history.title")}
              </TabsTrigger>
              <TabsTrigger value="compare" className="gap-2">
                <LineChartIcon className="h-4 w-4" />
                Compare
              </TabsTrigger>
            </TabsList>

            <TabsContent value="history">
              {history.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                    <HistoryIcon className="mb-4 h-12 w-12 text-muted-foreground/50" />
                    <h3 className="mb-2 text-lg font-medium text-foreground">{t("history.empty")}</h3>
                    <p className="text-sm text-muted-foreground">{t("history.empty.desc")}</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {history.map((entry) => (
                    <HistoryCard
                      key={entry.id}
                      entry={entry}
                      isExpanded={expandedId === entry.id}
                      onToggle={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
                      onRemove={() => removePrediction(entry.id)}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="compare">
              <PredictionComparison />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}

interface HistoryCardProps {
  entry: HistoryEntry;
  isExpanded: boolean;
  onToggle: () => void;
  onRemove: () => void;
}

function HistoryCard({ entry, isExpanded, onToggle, onRemove }: HistoryCardProps) {
  const { result } = entry;
  const isProfitable = result.predicted_profit >= 0;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="cursor-pointer transition-colors hover:bg-muted/50" onClick={onToggle}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="gap-1">
                <Sprout className="h-3 w-3" />
                {result.crop}
              </Badge>
              <Badge variant="outline" className="gap-1">
                <MapPin className="h-3 w-3" />
                {result.district}
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Calendar className="h-3 w-3" />
                {result.season}
              </Badge>
            </div>

            <div className="flex items-center gap-4">
              <span className={`text-lg font-semibold ${isProfitable ? "text-chart-1" : "text-destructive"}`}>
                {formatCurrency(result.predicted_profit)}
              </span>
              <span className="text-sm text-muted-foreground">
                {format(new Date(entry.timestamp), "MMM d, yyyy 'at' h:mm a")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={(event) => {
                event.stopPropagation();
                onRemove();
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="border-t border-border pt-6">
          <PredictionResults result={result} />
        </CardContent>
      )}
    </Card>
  );
}
