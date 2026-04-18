import { useEffect, useState } from "react";
import { AlertCircle, BarChart3, Database } from "lucide-react";

import { Layout } from "@/components/layout/Layout";
import { PredictionForm } from "@/components/prediction/PredictionForm";
import { PredictionResults } from "@/components/prediction/PredictionResults";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CROPS, DISTRICTS } from "@/lib/constants";
import { getExpensePrediction, getMasterData } from "@/services/api";
import {
  ApiError,
  ExpensePredictionInput,
  MasterDataResponse,
  PredictionResult,
} from "@/types/prediction";
import { usePredictionHistory } from "@/hooks/usePredictionHistory";

const fallbackMasterData: MasterDataResponse = {
  districts: [...DISTRICTS],
  crops: [...CROPS],
  seasons: ["Kharif", "Rabi", "Summer", "Whole Year"],
};

export default function Predict() {
  const [isLoading, setIsLoading] = useState(false);
  const [isMasterDataLoading, setIsMasterDataLoading] = useState(false);
  const [masterData, setMasterData] = useState<MasterDataResponse>(fallbackMasterData);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { addPrediction } = usePredictionHistory();
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;
    setIsMasterDataLoading(true);

    getMasterData()
      .then((data) => {
        if (!mounted) {
          return;
        }
        setMasterData(data);
      })
      .catch(() => {
        if (!mounted) {
          return;
        }
        setMasterData(fallbackMasterData);
        toast({
          variant: "destructive",
          title: "Using fallback master data",
          description: "Could not load dynamic crop/district list from backend.",
        });
      })
      .finally(() => {
        if (mounted) {
          setIsMasterDataLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [toast]);

  const handlePrediction = async (input: ExpensePredictionInput) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const prediction = await getExpensePrediction(input);
      setResult(prediction);
      addPrediction(prediction);
      toast({
        title: "Prediction complete",
        description: "Expense, revenue and profit forecast generated successfully.",
      });
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.detail || "Prediction failed");
      toast({
        variant: "destructive",
        title: "Prediction failed",
        description: apiError.detail || "Unexpected API error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="mb-8 text-center">
          <h1 className="mb-3 font-serif text-3xl font-bold text-foreground md:text-4xl">
            Smart Harvest Expense Tracker
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Track per-farmer harvest-cycle expenses and get ML-driven cost, revenue, and profit estimation.
          </p>
        </div>

        <div className="mx-auto max-w-6xl space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Expense Prediction Input
              </CardTitle>
              <CardDescription>
                Enter crop details, expense heads, and selling price to estimate total cost and net profit.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isMasterDataLoading ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Database className="h-4 w-4 animate-pulse" />
                  Loading master data...
                </div>
              ) : (
                <PredictionForm
                  onSubmit={handlePrediction}
                  isLoading={isLoading}
                  masterData={masterData}
                />
              )}
            </CardContent>
          </Card>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="mb-4 font-serif text-xl font-semibold text-foreground">
                Prediction Output
              </h2>
              <PredictionResults result={result} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
