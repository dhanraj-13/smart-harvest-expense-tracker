import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ChevronDown,
  ChevronUp,
  TrendingUp,
  TrendingDown,
  Filter,
  BarChart2,
  Search,
  GitCompare,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

const predictions = [
  {
    id: "PRD-001",
    date: "Mar 5, 2025",
    crop: "Paddy",
    district: "Thanjavur",
    season: "Kharif",
    area: "2.5 acre",
    yield: 9.4,
    cost: 84500,
    revenue: 206800,
    profit: 122300,
    isProfit: true,
    confidence: 88,
  },
  {
    id: "PRD-002",
    date: "Nov 12, 2024",
    crop: "Sugarcane",
    district: "Coimbatore",
    season: "Annual",
    area: "1.8 acre",
    yield: 45.2,
    cost: 122000,
    revenue: 180800,
    profit: 58800,
    isProfit: true,
    confidence: 82,
  },
  {
    id: "PRD-003",
    date: "Jun 22, 2024",
    crop: "Groundnut",
    district: "Dindigul",
    season: "Kharif",
    area: "3.0 acre",
    yield: 5.1,
    cost: 92000,
    revenue: 76500,
    profit: -15500,
    isProfit: false,
    confidence: 74,
  },
  {
    id: "PRD-004",
    date: "Jan 8, 2024",
    crop: "Paddy",
    district: "Thanjavur",
    season: "Rabi",
    area: "2.5 acre",
    yield: 8.1,
    cost: 78000,
    revenue: 178200,
    profit: 100200,
    isProfit: true,
    confidence: 91,
  },
  {
    id: "PRD-005",
    date: "Sep 14, 2023",
    crop: "Cotton",
    district: "Salem",
    season: "Kharif",
    area: "4.0 acre",
    yield: 8.8,
    cost: 148000,
    revenue: 132000,
    profit: -16000,
    isProfit: false,
    confidence: 70,
  },
];

const trendData = predictions
  .slice()
  .reverse()
  .map((p) => ({
    name: p.date.split(",")[0],
    profit: p.profit,
    crop: p.crop,
  }));

export function History() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [compareA, setCompareA] = useState<string | null>(null);
  const [compareB, setCompareB] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [comparing, setComparing] = useState(false);

  const filtered = predictions.filter(
    (p) =>
      p.crop.toLowerCase().includes(search.toLowerCase()) ||
      p.district.toLowerCase().includes(search.toLowerCase()) ||
      p.season.toLowerCase().includes(search.toLowerCase())
  );

  const pA = predictions.find((p) => p.id === compareA);
  const pB = predictions.find((p) => p.id === compareB);

  return (
    <div className="min-h-full" style={{ backgroundColor: SH.bg }}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1
              style={{
                fontFamily: "'Lora', serif",
                fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
                fontWeight: 700,
                color: SH.text,
              }}
            >
              Prediction History
            </h1>
            <p style={{ color: SH.muted, fontSize: "14px", marginTop: "4px" }}>
              All your previous predictions and comparison tools.
            </p>
          </div>
          <button
            onClick={() => navigate("/predict")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white transition-all hover:opacity-90"
            style={{
              backgroundColor: SH.green,
              fontSize: "13px",
              fontFamily: "'Work Sans', sans-serif",
            }}
          >
            + New Prediction
          </button>
        </div>

        {/* Trend Chart */}
        <div
          className="mb-6 p-5 rounded-2xl"
          style={{
            backgroundColor: SH.surface,
            border: `1px solid ${SH.border}`,
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
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
              Profit Trend Over Time
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke={SH.border} />
              <XAxis
                dataKey="name"
                style={{ fontSize: "11px" }}
                stroke={SH.muted}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`}
                style={{ fontSize: "11px" }}
                stroke={SH.muted}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(v: any) => [`₹${v.toLocaleString("en-IN")}`, "Profit"]}
                contentStyle={{
                  backgroundColor: SH.deep,
                  border: "none",
                  borderRadius: "8px",
                  color: "white",
                  fontSize: "12px",
                }}
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke={SH.paddy}
                strokeWidth={2.5}
                dot={{ fill: SH.paddy, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Filter + Search bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div
            className="flex items-center gap-2 flex-1 px-4 py-2.5 rounded-xl"
            style={{
              backgroundColor: SH.surface,
              border: `1.5px solid ${SH.border}`,
            }}
          >
            <Search size={15} color={SH.muted} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by crop, district or season..."
              className="flex-1 outline-none bg-transparent"
              style={{ fontSize: "14px", color: SH.text, fontFamily: "'Work Sans', sans-serif" }}
            />
          </div>
          <button
            onClick={() => setComparing(!comparing)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all"
            style={{
              backgroundColor: comparing ? SH.green : SH.surface,
              border: `1.5px solid ${comparing ? SH.green : SH.border}`,
              color: comparing ? "white" : SH.muted,
              fontSize: "13px",
              fontFamily: "'Work Sans', sans-serif",
            }}
          >
            <GitCompare size={15} />
            Compare Mode
          </button>
        </div>

        {/* Compare panel */}
        {comparing && pA && pB && (
          <div
            className="mb-5 rounded-2xl overflow-hidden"
            style={{ border: `1px solid ${SH.border}` }}
          >
            <div
              className="px-4 py-3 flex items-center gap-2"
              style={{ backgroundColor: SH.deep }}
            >
              <GitCompare size={15} color={SH.paddy} />
              <span style={{ fontSize: "13px", fontWeight: 600, color: "white" }}>
                Comparison: {pA.id} vs {pB.id}
              </span>
            </div>
            <div
              className="grid grid-cols-3"
              style={{ backgroundColor: SH.surface }}
            >
              <div
                className="p-4"
                style={{ borderRight: `1px solid ${SH.border}` }}
              >
                {["Crop","District","Season","Area","Yield","Cost","Revenue","Profit","Confidence"].map((k) => (
                  <div key={k} className="py-2" style={{ fontSize: "13px", color: SH.muted, borderBottom: `1px solid ${SH.border}` }}>
                    {k}
                  </div>
                ))}
              </div>
              {[pA, pB].map((p, idx) => (
                <div
                  key={p.id}
                  className="p-4"
                  style={{ borderLeft: idx === 1 ? `1px solid ${SH.border}` : undefined }}
                >
                  {[
                    p.crop, p.district, p.season, p.area,
                    `${p.yield} tons`,
                    `₹${p.cost.toLocaleString("en-IN")}`,
                    `₹${p.revenue.toLocaleString("en-IN")}`,
                    `₹${p.profit.toLocaleString("en-IN")}`,
                    `${p.confidence}%`,
                  ].map((val, i) => (
                    <div
                      key={i}
                      className="py-2"
                      style={{
                        fontSize: "13px",
                        fontWeight: 500,
                        color: i >= 4 ? SH.green : SH.text,
                        borderBottom: `1px solid ${SH.border}`,
                      }}
                    >
                      {val}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Prediction list */}
        <div className="flex flex-col gap-3">
          {filtered.length === 0 && (
            <div
              className="py-16 rounded-2xl text-center"
              style={{
                backgroundColor: SH.surface,
                border: `1px solid ${SH.border}`,
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>🌾</div>
              <p style={{ fontSize: "15px", color: SH.muted }}>
                No predictions match your search.
              </p>
            </div>
          )}

          {filtered.map((p) => {
            const isExpanded = expanded === p.id;
            const isSelectedA = compareA === p.id;
            const isSelectedB = compareB === p.id;

            return (
              <div
                key={p.id}
                className="rounded-2xl overflow-hidden transition-all"
                style={{
                  backgroundColor: SH.surface,
                  border: `1.5px solid ${isSelectedA || isSelectedB ? SH.green : SH.border}`,
                  boxShadow: isExpanded ? "0 4px 20px rgba(0,0,0,0.07)" : "none",
                }}
              >
                {/* Header row */}
                <div
                  className="flex items-center px-5 py-4 cursor-pointer"
                  onClick={() => setExpanded(isExpanded ? null : p.id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span
                        style={{
                          fontFamily: "'Lora', serif",
                          fontSize: "15px",
                          fontWeight: 600,
                          color: SH.text,
                        }}
                      >
                        {p.crop} — {p.district}
                      </span>
                      <span
                        className="px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${SH.paddy}18`,
                          color: SH.green,
                          fontSize: "11px",
                          fontWeight: 500,
                        }}
                      >
                        {p.season}
                      </span>
                      <span
                        className="px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: p.isProfit ? `${SH.paddy}18` : `${SH.terracotta}18`,
                          color: p.isProfit ? SH.paddy : SH.terracotta,
                          fontSize: "11px",
                          fontWeight: 600,
                        }}
                      >
                        {p.isProfit ? "+" : ""}₹{(Math.abs(p.profit) / 1000).toFixed(1)}K {p.isProfit ? "Profit" : "Loss"}
                      </span>
                    </div>
                    <div style={{ fontSize: "12px", color: SH.muted }}>
                      {p.id} · {p.date} · {p.area} · Confidence: {p.confidence}%
                    </div>
                  </div>

                  <div className="flex items-center gap-3 ml-3">
                    {comparing && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isSelectedA) { setCompareA(null); return; }
                          if (isSelectedB) { setCompareB(null); return; }
                          if (!compareA) { setCompareA(p.id); return; }
                          if (!compareB) { setCompareB(p.id); return; }
                        }}
                        className="px-3 py-1 rounded-lg transition-all"
                        style={{
                          backgroundColor: isSelectedA || isSelectedB ? SH.green : `${SH.green}15`,
                          color: isSelectedA || isSelectedB ? "white" : SH.green,
                          fontSize: "12px",
                        }}
                      >
                        {isSelectedA ? "A" : isSelectedB ? "B" : "Select"}
                      </button>
                    )}
                    {p.isProfit ? (
                      <TrendingUp size={16} color={SH.paddy} />
                    ) : (
                      <TrendingDown size={16} color={SH.terracotta} />
                    )}
                    {isExpanded ? (
                      <ChevronUp size={16} color={SH.muted} />
                    ) : (
                      <ChevronDown size={16} color={SH.muted} />
                    )}
                  </div>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div
                    className="px-5 pb-5"
                    style={{ borderTop: `1px solid ${SH.border}` }}
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                      {[
                        { label: "Predicted Yield", value: `${p.yield} tons` },
                        { label: "Predicted Cost", value: `₹${p.cost.toLocaleString("en-IN")}` },
                        { label: "Predicted Revenue", value: `₹${p.revenue.toLocaleString("en-IN")}` },
                        {
                          label: "Profit / Loss",
                          value: `${p.isProfit ? "+" : ""}₹${p.profit.toLocaleString("en-IN")}`,
                          highlight: true,
                          positive: p.isProfit,
                        },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="p-3 rounded-xl"
                          style={{
                            backgroundColor: item.highlight
                              ? item.positive
                                ? `${SH.paddy}12`
                                : `${SH.terracotta}12`
                              : SH.bg,
                            border: `1px solid ${SH.border}`,
                          }}
                        >
                          <div style={{ fontSize: "11px", color: SH.muted, marginBottom: "4px" }}>
                            {item.label}
                          </div>
                          <div
                            style={{
                              fontSize: "16px",
                              fontWeight: 700,
                              color: item.highlight
                                ? item.positive
                                  ? SH.green
                                  : SH.terracotta
                                : SH.text,
                            }}
                          >
                            {item.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
