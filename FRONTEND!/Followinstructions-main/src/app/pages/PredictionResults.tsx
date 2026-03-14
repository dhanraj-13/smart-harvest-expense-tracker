import { useMemo } from "react";
import { useNavigate } from "react-router";
import {
  TrendingUp,
  TrendingDown,
  BarChart2,
  Brain,
  Share2,
  Download,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { getLastPrediction } from "@/app/lib/predictionStorage";

const SH = {
  green: "#2F6B3B",
  deep: "#1F4D2A",
  paddy: "#7BAE58",
  turmeric: "#D9A441",
  terracotta: "#B85C38",
  soil: "#6B4F3A",
  bg: "#F7F3EA",
  surface: "#FFFDF8",
  text: "#1F2933",
  muted: "#667085",
  border: "#D9D2C3",
};

const fallbackResults = {
  crop: "Paddy",
  district: "Thanjavur",
  season: "Kharif (Kuruvai)",
  area: "2.5 acre",
  confidence: 88,
  predictedYield: 9.4,
  predictedCost: 84500,
  predictedRevenue: 206800,
  predictedProfit: 122300,
  isProfit: true,
};

const fallbackExpenseBreakdown = [
  { name: "Labour", value: 24000, color: SH.paddy },
  { name: "Fertilizer", value: 18500, color: SH.turmeric },
  { name: "Seed", value: 12000, color: SH.soil },
  { name: "Machine", value: 11000, color: SH.terracotta },
  { name: "Water", value: 8500, color: "#5B8DB8" },
  { name: "Pesticide", value: 6000, color: "#9B7EC8" },
  { name: "Transport", value: 3000, color: "#C47A5A" },
  { name: "Misc", value: 1500, color: SH.muted },
];

const fallbackAiExplanation = `Based on Thanjavur district data for Kharif (Kuruvai) season:

Your 2.5 acre Paddy field is predicted to yield approximately 9.4 tons, which is above the district average of 8.1 tons/season for the same period. This is attributed to the season alignment and typical soil conditions in Thanjavur.

The total estimated cultivation cost of ₹84,500 includes labour (₹24,000) as the largest component, typical for Kharif paddy. At a selling price of ₹22,000/ton, your predicted revenue of ₹2,06,800 gives a profit margin of 59%, which is healthy for this crop-season combination.

Confidence is high (88%) as Thanjavur has strong historical data coverage for Paddy in Kharif season.`;

const KPICard = ({
  label,
  value,
  unit,
  icon: Icon,
  color,
  isPositive,
}: {
  label: string;
  value: string;
  unit?: string;
  icon: React.ElementType;
  color: string;
  isPositive?: boolean;
}) => (
  <div
    className="p-5 rounded-2xl"
    style={{
      backgroundColor: SH.surface,
      border: `1px solid ${SH.border}`,
      boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
    }}
  >
    <div className="flex items-start justify-between mb-3">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: `${color}18` }}
      >
        <Icon size={20} color={color} />
      </div>
      {isPositive !== undefined && (
        <div
          className="flex items-center gap-1 px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: isPositive ? `${SH.paddy}20` : `${SH.terracotta}18`,
          }}
        >
          {isPositive ? (
            <TrendingUp size={12} color={SH.paddy} />
          ) : (
            <TrendingDown size={12} color={SH.terracotta} />
          )}
          <span
            style={{ fontSize: "11px", color: isPositive ? SH.paddy : SH.terracotta, fontWeight: 600 }}
          >
            {isPositive ? "Profit" : "Loss"}
          </span>
        </div>
      )}
    </div>
    <div
      style={{
        fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
        fontWeight: 700,
        color: SH.text,
        lineHeight: 1.1,
        fontFamily: "'Work Sans', sans-serif",
      }}
    >
      {value}
      {unit && (
        <span style={{ fontSize: "14px", fontWeight: 400, color: SH.muted, marginLeft: "4px" }}>
          {unit}
        </span>
      )}
    </div>
    <div style={{ fontSize: "13px", color: SH.muted, marginTop: "4px" }}>{label}</div>
  </div>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="px-3 py-2 rounded-lg"
        style={{ backgroundColor: SH.deep, color: "white", fontSize: "13px" }}
      >
        <div style={{ fontWeight: 600 }}>{label}</div>
        <div>₹{payload[0].value.toLocaleString("en-IN")}</div>
      </div>
    );
  }
  return null;
};

export function PredictionResults() {
  const navigate = useNavigate();
  const stored = useMemo(() => getLastPrediction(), []);
  const backend = stored?.response;

  const displayResults = backend
    ? {
        crop: stored?.context.crop || backend.crop,
        district: stored?.context.district || backend.district,
        season: stored?.context.season || backend.season,
        area: stored?.context.areaLabel || `${backend.area_hectare.toFixed(2)} hectare`,
        confidence: Math.round((backend.confidence_score || 0) * 100),
        predictedYield: backend.predicted_yield_tons,
        predictedCost: backend.predicted_total_cost,
        predictedRevenue: backend.predicted_revenue,
        predictedProfit: backend.predicted_profit,
        isProfit: backend.predicted_profit >= 0,
      }
    : fallbackResults;

  const chartColors = [SH.paddy, SH.turmeric, SH.soil, SH.terracotta, "#5B8DB8", "#9B7EC8", "#C47A5A", SH.muted];
  const expenseBreakdown = backend
    ? backend.cost_breakdown.map((item, index) => ({
        name: item.label || item.key,
        value: item.amount,
        color: chartColors[index % chartColors.length],
      }))
    : fallbackExpenseBreakdown;
  const aiExplanation = backend?.ai_explanation || fallbackAiExplanation;
  const confidenceLabel =
    displayResults.confidence >= 80 ? "High Confidence" : displayResults.confidence >= 60 ? "Medium Confidence" : "Low Confidence";

  return (
    <div className="min-h-full" style={{ backgroundColor: SH.bg }}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: SH.paddy }}
              />
              <span style={{ fontSize: "12px", color: SH.muted, letterSpacing: "0.05em" }}>
                PREDICTION COMPLETE
              </span>
            </div>
            <h1
              style={{
                fontFamily: "'Lora', serif",
                fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
                fontWeight: 700,
                color: SH.text,
              }}
            >
              Prediction Results
            </h1>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => navigate("/predict")}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all"
              style={{
                border: `1.5px solid ${SH.border}`,
                color: SH.muted,
                fontSize: "13px",
                fontFamily: "'Work Sans', sans-serif",
              }}
            >
              <RotateCcw size={14} />
              New Prediction
            </button>
            <button
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all"
              style={{
                border: `1.5px solid ${SH.border}`,
                color: SH.muted,
                fontSize: "13px",
                fontFamily: "'Work Sans', sans-serif",
              }}
            >
              <Share2 size={14} />
              Share
            </button>
            <button
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white transition-all hover:opacity-90"
              style={{
                backgroundColor: SH.green,
                fontSize: "13px",
                fontFamily: "'Work Sans', sans-serif",
              }}
            >
              <Download size={14} />
              Export PDF
            </button>
          </div>
        </div>

        {/* Context badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { icon: "🌾", label: displayResults.crop },
            { icon: "📍", label: displayResults.district },
            { icon: "🗓️", label: displayResults.season },
            { icon: "📐", label: displayResults.area },
          ].map((b) => (
            <div
              key={b.label}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{
                backgroundColor: SH.surface,
                border: `1px solid ${SH.border}`,
              }}
            >
              <span>{b.icon}</span>
              <span style={{ fontSize: "13px", color: SH.text }}>{b.label}</span>
            </div>
          ))}
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <KPICard
            label="Predicted Yield"
            value={displayResults.predictedYield.toFixed(2)}
            unit="tons"
            icon={BarChart2}
            color={SH.paddy}
          />
          <KPICard
            label="Predicted Cost"
            value={`₹${(displayResults.predictedCost / 1000).toFixed(1)}K`}
            icon={TrendingDown}
            color={SH.terracotta}
          />
          <KPICard
            label="Predicted Revenue"
            value={`₹${(displayResults.predictedRevenue / 1000).toFixed(1)}K`}
            icon={TrendingUp}
            color={SH.turmeric}
          />
          <KPICard
            label="Predicted Profit"
            value={`₹${(displayResults.predictedProfit / 1000).toFixed(1)}K`}
            icon={displayResults.isProfit ? TrendingUp : TrendingDown}
            color={displayResults.isProfit ? SH.green : SH.terracotta}
            isPositive={displayResults.isProfit}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Expense Chart */}
          <div
            className="lg:col-span-2 p-5 rounded-2xl"
            style={{
              backgroundColor: SH.surface,
              border: `1px solid ${SH.border}`,
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}
          >
            <div className="flex items-center gap-2 mb-5">
              <BarChart2 size={17} color={SH.green} />
              <h3
                style={{
                  fontFamily: "'Lora', serif",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: SH.text,
                }}
              >
                Expense Breakdown
              </h3>
              <span
                className="ml-auto"
                style={{ fontSize: "12px", color: SH.muted }}
              >
                Total: ₹{displayResults.predictedCost.toLocaleString("en-IN")}
              </span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={expenseBreakdown} layout="vertical">
                <XAxis
                  type="number"
                  tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`}
                  style={{ fontSize: "11px", fill: SH.muted }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={80}
                  style={{ fontSize: "12px", fill: SH.muted }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {expenseBreakdown.map((entry, i) => (
                    <Cell key={i} fill={entry.color} opacity={0.85} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Confidence Score */}
          <div
            className="p-5 rounded-2xl flex flex-col"
            style={{
              backgroundColor: SH.surface,
              border: `1px solid ${SH.border}`,
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle size={17} color={SH.green} />
              <h3
                style={{
                  fontFamily: "'Lora', serif",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: SH.text,
                }}
              >
                Confidence Score
              </h3>
            </div>

            {/* Big circle */}
            <div className="flex-1 flex flex-col items-center justify-center py-4">
              <div
                className="relative w-36 h-36 rounded-full flex items-center justify-center mb-4"
                style={{
                  background: `conic-gradient(${SH.paddy} ${displayResults.confidence * 3.6}deg, ${SH.border} 0deg)`,
                  padding: "6px",
                }}
              >
                <div
                  className="w-full h-full rounded-full flex items-center justify-center"
                  style={{ backgroundColor: SH.surface }}
                >
                  <div className="text-center">
                    <div
                      style={{
                        fontSize: "2.5rem",
                        fontWeight: 700,
                        color: SH.green,
                        lineHeight: 1,
                      }}
                    >
                      {displayResults.confidence}%
                    </div>
                    <div style={{ fontSize: "11px", color: SH.muted }}>confidence</div>
                  </div>
                </div>
              </div>

              <div
                className="px-3 py-1.5 rounded-full mb-3"
                style={{ backgroundColor: `${SH.paddy}20` }}
              >
                <span style={{ fontSize: "12px", color: SH.green, fontWeight: 600 }}>
                  {confidenceLabel}
                </span>
              </div>

              <p style={{ fontSize: "12px", color: SH.muted, textAlign: "center", lineHeight: 1.5 }}>
                Based on 14 years of Thanjavur Paddy Kharif data — strong coverage.
              </p>
            </div>

            <div
              className="mt-2 p-3 rounded-lg flex gap-2"
              style={{ backgroundColor: `${SH.turmeric}12`, border: `1px solid ${SH.turmeric}25` }}
            >
              <AlertTriangle size={13} color={SH.soil} className="flex-shrink-0 mt-0.5" />
              <p style={{ fontSize: "11px", color: SH.soil, lineHeight: 1.5 }}>
                Advisory only. Actual yield may vary based on weather, pest, and market conditions.
              </p>
            </div>
          </div>
        </div>

        {/* AI Explanation */}
        <div
          className="mt-5 p-6 rounded-2xl"
          style={{
            backgroundColor: SH.deep,
            border: `1px solid ${SH.deep}`,
            boxShadow: "0 4px 20px rgba(31,77,42,0.2)",
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "rgba(123,174,88,0.25)" }}
            >
              <Brain size={16} color={SH.paddy} />
            </div>
            <h3
              className="text-white"
              style={{ fontFamily: "'Lora', serif", fontSize: "15px", fontWeight: 600 }}
            >
              AI Explanation
            </h3>
            <div
              className="ml-auto px-2.5 py-1 rounded-full"
              style={{ backgroundColor: "rgba(123,174,88,0.2)" }}
            >
              <span style={{ fontSize: "11px", color: SH.paddy }}>
                {(stored?.context.explainLang || "English").toUpperCase()}
              </span>
            </div>
          </div>
          <div
            className="whitespace-pre-line"
            style={{ fontSize: "14px", color: "rgba(255,255,255,0.82)", lineHeight: 1.75 }}
          >
            {aiExplanation}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mt-6">
          <button
            onClick={() => navigate("/history")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all hover:opacity-90"
            style={{
              backgroundColor: SH.green,
              color: "white",
              fontSize: "13px",
              fontFamily: "'Work Sans', sans-serif",
            }}
          >
            View History & Compare
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all"
            style={{
              border: `1.5px solid ${SH.border}`,
              color: SH.muted,
              fontSize: "13px",
              fontFamily: "'Work Sans', sans-serif",
            }}
          >
            Open Farm Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
