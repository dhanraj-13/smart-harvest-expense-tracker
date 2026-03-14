import {
  FileText,
  Download,
  BarChart2,
  TrendingUp,
  Sprout,
  DollarSign,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
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

const expenseReportData = [
  { cat: "Labour", amount: 24000 },
  { cat: "Fertilizer", amount: 18500 },
  { cat: "Seed", amount: 12000 },
  { cat: "Machine", amount: 11000 },
  { cat: "Water", amount: 8500 },
  { cat: "Pesticide", amount: 6000 },
  { cat: "Fuel", amount: 1200 },
  { cat: "Transport", amount: 1500 },
  { cat: "Storage", amount: 2000 },
];

const profitReportData = [
  { season: "Rabi 2023", profit: 78000 },
  { season: "Kharif 2023", profit: -15500 },
  { season: "Rabi 2024", profit: 100200 },
  { season: "Annual 2024", profit: 58800 },
  { season: "Kharif 2025", profit: 122300 },
];

const cropReportData = [
  { crop: "Paddy", area: 2.5, yield: 9.4, revenue: 206800 },
  { crop: "Sugarcane", area: 1.8, yield: 45.2, revenue: 180800 },
  { crop: "Groundnut", area: 3.0, yield: 5.1, revenue: 76500 },
];

const reports = [
  {
    icon: DollarSign,
    title: "Expense Report",
    desc: "Full breakdown of all farm expenses by category and month.",
    tag: "Season 2025",
    color: SH.turmeric,
    chart: "expense",
  },
  {
    icon: TrendingUp,
    title: "Profit & Loss Report",
    desc: "Predicted and actual profit/loss trends across seasons.",
    tag: "5 Seasons",
    color: SH.paddy,
    chart: "profit",
  },
  {
    icon: Sprout,
    title: "Crop Production Report",
    desc: "Yield, area, and revenue comparison across crops.",
    tag: "3 Crops",
    color: SH.soil,
    chart: "crop",
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="px-3 py-2 rounded-lg" style={{ backgroundColor: SH.deep, color: "white", fontSize: "12px" }}>
        <div style={{ fontWeight: 600 }}>{label}</div>
        <div>
          {typeof payload[0].value === "number" && payload[0].value < 0 ? "-" : ""}
          ₹{Math.abs(payload[0].value).toLocaleString("en-IN")}
        </div>
      </div>
    );
  }
  return null;
};

export function Reports() {
  return (
    <div className="min-h-full" style={{ backgroundColor: SH.bg }}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 style={{ fontFamily: "'Lora', serif", fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 700, color: SH.text }}>
            Reports
          </h1>
          <p style={{ color: SH.muted, fontSize: "14px", marginTop: "4px" }}>
            Generate and export reports for expenses, profit, and crop production.
          </p>
        </div>

        {/* Report cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {reports.map((r) => (
            <div
              key={r.title}
              className="p-5 rounded-2xl"
              style={{ backgroundColor: SH.surface, border: `1px solid ${SH.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${r.color}18` }}
                >
                  <r.icon size={20} color={r.color} />
                </div>
                <span
                  className="px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: `${r.color}15`, color: r.color, fontSize: "11px", fontWeight: 500 }}
                >
                  {r.tag}
                </span>
              </div>
              <h3 style={{ fontFamily: "'Lora', serif", fontSize: "15px", fontWeight: 600, color: SH.text, marginBottom: "4px" }}>
                {r.title}
              </h3>
              <p style={{ fontSize: "13px", color: SH.muted, lineHeight: 1.5, marginBottom: "16px" }}>
                {r.desc}
              </p>
              <div className="flex gap-2">
                <button
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: SH.green, fontSize: "12px" }}
                >
                  <BarChart2 size={13} />
                  View
                </button>
                <button
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all"
                  style={{ border: `1.5px solid ${SH.border}`, color: SH.muted, fontSize: "12px" }}
                >
                  <Download size={13} />
                  Export PDF
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Expense chart */}
        <div
          className="rounded-2xl p-5 mb-5"
          style={{ backgroundColor: SH.surface, border: `1px solid ${SH.border}` }}
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <DollarSign size={16} color={SH.green} />
              <h3 style={{ fontFamily: "'Lora', serif", fontSize: "15px", fontWeight: 600, color: SH.text }}>
                Expense by Category — Kharif 2025
              </h3>
            </div>
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all"
              style={{ border: `1.5px solid ${SH.border}`, color: SH.muted, fontSize: "12px" }}
            >
              <Download size={12} />
              Export
            </button>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={expenseReportData}>
              <CartesianGrid strokeDasharray="3 3" stroke={SH.border} />
              <XAxis dataKey="cat" style={{ fontSize: "11px" }} stroke={SH.muted} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} style={{ fontSize: "11px" }} stroke={SH.muted} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="amount" fill={SH.paddy} radius={[4, 4, 0, 0]} opacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Profit trend */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div
            className="rounded-2xl p-5"
            style={{ backgroundColor: SH.surface, border: `1px solid ${SH.border}` }}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} color={SH.green} />
                <h3 style={{ fontFamily: "'Lora', serif", fontSize: "15px", fontWeight: 600, color: SH.text }}>
                  Profit Trend
                </h3>
              </div>
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                style={{ border: `1.5px solid ${SH.border}`, color: SH.muted, fontSize: "12px" }}
              >
                <Download size={12} />
                Export
              </button>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={profitReportData}>
                <CartesianGrid strokeDasharray="3 3" stroke={SH.border} />
                <XAxis dataKey="season" style={{ fontSize: "10px" }} stroke={SH.muted} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} style={{ fontSize: "11px" }} stroke={SH.muted} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="profit" stroke={SH.paddy} strokeWidth={2.5} dot={{ fill: SH.paddy, r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Crop table */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ backgroundColor: SH.surface, border: `1px solid ${SH.border}` }}
          >
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: `1px solid ${SH.border}`, backgroundColor: SH.bg }}
            >
              <div className="flex items-center gap-2">
                <Sprout size={16} color={SH.green} />
                <h3 style={{ fontFamily: "'Lora', serif", fontSize: "15px", fontWeight: 600, color: SH.text }}>
                  Crop Production Summary
                </h3>
              </div>
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                style={{ border: `1.5px solid ${SH.border}`, color: SH.muted, fontSize: "12px" }}
              >
                <Download size={12} />
                Export
              </button>
            </div>
            <div>
              <div
                className="grid px-5 py-2.5"
                style={{ gridTemplateColumns: "1fr 80px 80px 100px", borderBottom: `1px solid ${SH.border}`, backgroundColor: SH.bg }}
              >
                {["Crop", "Area", "Yield", "Revenue"].map((h) => (
                  <div key={h} style={{ fontSize: "11px", fontWeight: 600, color: SH.muted }}>
                    {h}
                  </div>
                ))}
              </div>
              {cropReportData.map((c, i) => (
                <div
                  key={c.crop}
                  className="grid px-5 py-3.5 items-center"
                  style={{
                    gridTemplateColumns: "1fr 80px 80px 100px",
                    borderBottom: i < cropReportData.length - 1 ? `1px solid ${SH.border}` : "none",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${SH.paddy}18` }}
                    >
                      <Sprout size={13} color={SH.green} />
                    </div>
                    <span style={{ fontSize: "13px", fontWeight: 500, color: SH.text }}>{c.crop}</span>
                  </div>
                  <span style={{ fontSize: "13px", color: SH.muted }}>{c.area} ac</span>
                  <span style={{ fontSize: "13px", color: SH.muted }}>{c.yield} ton</span>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: SH.green }}>
                    ₹{c.revenue.toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
