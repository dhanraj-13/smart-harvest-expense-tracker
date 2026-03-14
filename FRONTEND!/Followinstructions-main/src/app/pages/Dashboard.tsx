import { useNavigate } from "react-router";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Sprout,
  BarChart2,
  Plus,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
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

const monthlyExpenses = [
  { month: "Oct", expense: 12000 },
  { month: "Nov", expense: 18500 },
  { month: "Dec", expense: 24000 },
  { month: "Jan", expense: 15000 },
  { month: "Feb", expense: 32000 },
  { month: "Mar", expense: 22000 },
];

const pieData = [
  { name: "Labour", value: 24000, color: SH.paddy },
  { name: "Fertilizer", value: 18500, color: SH.turmeric },
  { name: "Seed", value: 12000, color: SH.soil },
  { name: "Machine", value: 11000, color: SH.terracotta },
  { name: "Water", value: 8500, color: "#5B8DB8" },
  { name: "Others", value: 10500, color: SH.muted },
];

const recentExpenses = [
  { date: "Mar 8", desc: "DAP Fertilizer", category: "Fertilizer", amount: 4500, field: "Field A" },
  { date: "Mar 6", desc: "Tractor Ploughing", category: "Machine", amount: 2800, field: "Field B" },
  { date: "Mar 5", desc: "Labour — Transplanting", category: "Labour", amount: 3200, field: "Field A" },
  { date: "Mar 3", desc: "Paddy Seed — IET 21212", category: "Seed", amount: 1800, field: "Field A" },
  { date: "Mar 1", desc: "Canal Water Charge", category: "Water", amount: 900, field: "Field B" },
];

const alerts = [
  {
    level: "warning",
    title: "Fertilizer Budget at 82%",
    desc: "You've used ₹18,500 of your ₹22,500 fertilizer budget.",
  },
  {
    level: "error",
    title: "Labour Budget Exceeded",
    desc: "Labour expenses (₹24,000) exceeded budget (₹20,000) by ₹4,000.",
  },
  {
    level: "info",
    title: "Harvest Window Approaching",
    desc: "Expected harvest for Field A (Paddy) is in 22 days.",
  },
];

const kpiCards = [
  {
    label: "Total Expenses (Season)",
    value: "₹84,500",
    sub: "of ₹1,00,000 budget",
    icon: DollarSign,
    color: SH.soil,
    progress: 84.5,
  },
  {
    label: "Remaining Budget",
    value: "₹15,500",
    sub: "15.5% remaining",
    icon: TrendingDown,
    color: SH.terracotta,
    progress: 15.5,
  },
  {
    label: "Estimated Profit",
    value: "₹1,22,300",
    sub: "Predicted — Kharif Paddy",
    icon: TrendingUp,
    color: SH.paddy,
    progress: null,
  },
  {
    label: "Predicted Yield",
    value: "9.4 tons",
    sub: "2.5 acre · Thanjavur",
    icon: Sprout,
    color: SH.green,
    progress: null,
  },
  {
    label: "Cost Per Acre",
    value: "₹33,800",
    sub: "vs. ₹36,000 district avg",
    icon: BarChart2,
    color: SH.turmeric,
    progress: null,
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="px-3 py-2 rounded-lg"
        style={{ backgroundColor: SH.deep, color: "white", fontSize: "12px" }}
      >
        <div style={{ fontWeight: 600 }}>{label}</div>
        <div>₹{payload[0].value.toLocaleString("en-IN")}</div>
      </div>
    );
  }
  return null;
};

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full" style={{ backgroundColor: SH.bg }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
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
              Farm Management Dashboard
            </h1>
            <p style={{ color: SH.muted, fontSize: "14px", marginTop: "4px" }}>
              Kharif Season 2025 · Field A & B · Paddy, Thanjavur
            </p>
          </div>
          <button
            onClick={() => navigate("/expenses")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white transition-all hover:opacity-90"
            style={{
              backgroundColor: SH.green,
              fontSize: "13px",
              fontFamily: "'Work Sans', sans-serif",
            }}
          >
            <Plus size={15} />
            Add Expense
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {kpiCards.map((card) => (
            <div
              key={card.label}
              className="p-4 rounded-2xl"
              style={{
                backgroundColor: SH.surface,
                border: `1px solid ${SH.border}`,
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: `${card.color}18` }}
              >
                <card.icon size={18} color={card.color} />
              </div>
              <div
                style={{
                  fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                  fontWeight: 700,
                  color: SH.text,
                  lineHeight: 1.1,
                }}
              >
                {card.value}
              </div>
              <div style={{ fontSize: "11px", color: SH.muted, marginTop: "4px" }}>
                {card.label}
              </div>
              {card.progress !== null && (
                <div className="mt-2.5">
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ backgroundColor: SH.border }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${card.progress}%`,
                        backgroundColor: card.progress > 80 ? SH.terracotta : card.color,
                      }}
                    />
                  </div>
                  <div style={{ fontSize: "10px", color: SH.muted, marginTop: "3px" }}>
                    {card.sub}
                  </div>
                </div>
              )}
              {card.progress === null && (
                <div style={{ fontSize: "11px", color: SH.muted, marginTop: "2px" }}>
                  {card.sub}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
          {/* Monthly Trend */}
          <div
            className="lg:col-span-2 p-5 rounded-2xl"
            style={{
              backgroundColor: SH.surface,
              border: `1px solid ${SH.border}`,
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <div className="flex items-center gap-2 mb-5">
              <BarChart2 size={16} color={SH.green} />
              <h3
                style={{
                  fontFamily: "'Lora', serif",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: SH.text,
                }}
              >
                Monthly Expense Trend
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={monthlyExpenses}>
                <defs>
                  <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={SH.paddy} stopOpacity={0.25} />
                    <stop offset="95%" stopColor={SH.paddy} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={SH.border} />
                <XAxis
                  dataKey="month"
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
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="expense"
                  stroke={SH.paddy}
                  strokeWidth={2.5}
                  fill="url(#expGrad)"
                  dot={{ fill: SH.paddy, r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div
            className="p-5 rounded-2xl"
            style={{
              backgroundColor: SH.surface,
              border: `1px solid ${SH.border}`,
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <BarChart2 size={16} color={SH.green} />
              <h3
                style={{
                  fontFamily: "'Lora', serif",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: SH.text,
                }}
              >
                By Category
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  dataKey="value"
                  paddingAngle={2}
                >
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v: any) => [`₹${v.toLocaleString("en-IN")}`, ""]}
                  contentStyle={{
                    backgroundColor: SH.deep,
                    border: "none",
                    borderRadius: "8px",
                    color: "white",
                    fontSize: "12px",
                  }}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(val) => (
                    <span style={{ fontSize: "11px", color: SH.muted }}>{val}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom row: Expenses table + Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Recent expenses */}
          <div
            className="lg:col-span-2 rounded-2xl overflow-hidden"
            style={{
              backgroundColor: SH.surface,
              border: `1px solid ${SH.border}`,
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: `1px solid ${SH.border}` }}
            >
              <h3
                style={{
                  fontFamily: "'Lora', serif",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: SH.text,
                }}
              >
                Recent Expenses
              </h3>
              <button
                onClick={() => navigate("/expenses")}
                style={{ fontSize: "12px", color: SH.green }}
              >
                View All
              </button>
            </div>
            <div>
              {recentExpenses.map((exp, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 px-5 py-3.5"
                  style={{ borderBottom: `1px solid ${SH.border}` }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${SH.paddy}15` }}
                  >
                    <DollarSign size={16} color={SH.green} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div style={{ fontSize: "13px", fontWeight: 500, color: SH.text }}>
                      {exp.desc}
                    </div>
                    <div style={{ fontSize: "11px", color: SH.muted }}>
                      {exp.date} · {exp.field} ·{" "}
                      <span
                        className="px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: `${SH.paddy}18`, color: SH.green }}
                      >
                        {exp.category}
                      </span>
                    </div>
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: SH.text }}>
                    ₹{exp.amount.toLocaleString("en-IN")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts Panel */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              backgroundColor: SH.surface,
              border: `1px solid ${SH.border}`,
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: `1px solid ${SH.border}` }}
            >
              <h3
                style={{
                  fontFamily: "'Lora', serif",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: SH.text,
                }}
              >
                Budget Alerts
              </h3>
              <button
                onClick={() => navigate("/alerts")}
                style={{ fontSize: "12px", color: SH.green }}
              >
                View All
              </button>
            </div>
            <div className="p-4 flex flex-col gap-3">
              {alerts.map((a, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl flex gap-3"
                  style={{
                    backgroundColor:
                      a.level === "error"
                        ? `${SH.terracotta}12`
                        : a.level === "warning"
                        ? `${SH.turmeric}12`
                        : `${SH.paddy}10`,
                    border: `1px solid ${
                      a.level === "error"
                        ? `${SH.terracotta}30`
                        : a.level === "warning"
                        ? `${SH.turmeric}30`
                        : `${SH.paddy}25`
                    }`,
                  }}
                >
                  <AlertTriangle
                    size={15}
                    color={
                      a.level === "error"
                        ? SH.terracotta
                        : a.level === "warning"
                        ? SH.turmeric
                        : SH.paddy
                    }
                    className="flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color:
                          a.level === "error"
                            ? SH.terracotta
                            : a.level === "warning"
                            ? SH.soil
                            : SH.green,
                      }}
                    >
                      {a.title}
                    </div>
                    <div style={{ fontSize: "12px", color: SH.muted, lineHeight: 1.5, marginTop: "2px" }}>
                      {a.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
