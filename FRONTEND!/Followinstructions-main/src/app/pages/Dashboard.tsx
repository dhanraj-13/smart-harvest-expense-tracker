import { type MouseEvent } from "react";
import { useNavigate } from "react-router";
import {
  DollarSign,
  TrendingUp,
  BarChart2,
  Sprout,
  AlertTriangle,
  Plus,
  Landmark,
} from "lucide-react";
import { motion } from "motion/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useTranslation } from "react-i18next";
import { CountUp } from "@/app/components/ui/count-up";

const SH = {
  green: "#16A34A",
  deep: "#14532D",
  light: "#DCFCE7",
  yellow: "#EAB308",
  earth: "#A16207",
  text: "#14532D",
  muted: "#4F6D58",
  border: "rgba(20, 83, 45, 0.14)",
};

const rawMonthlyData = [
  { month: "Oct", amount: 12000 },
  { month: "Nov", amount: 18500 },
  { month: "Dec", amount: 24000 },
  { month: "Jan", amount: 15000 },
  { month: "Feb", amount: 32000 },
  { month: "Mar", amount: 22000 },
];

const rawCatData = [
  { cat: "Labour", amount: 24000, color: SH.green },
  { cat: "Fertilizer", amount: 18500, color: SH.yellow },
  { cat: "Seed", amount: 12000, color: "#22C55E" },
  { cat: "Machine", amount: 11000, color: SH.earth },
  { cat: "Water", amount: 8500, color: "#15803D" },
  { cat: "Pesticide", amount: 6000, color: "#4D7C0F" },
];

const rawRecentExpenses = [
  { descKey: "dapFertilizer", cat: "Fertilizer", amount: 3200, monthKey: "mar", day: "6" },
  { descKey: "harvestLabour", cat: "Labour", amount: 8000, monthKey: "mar", day: "4" },
  { descKey: "sprinklerRepair", cat: "Machine", amount: 1200, monthKey: "feb", day: "28" },
  { descKey: "neemSpray", cat: "Pesticide", amount: 2800, monthKey: "feb", day: "25" },
];

const rawAlerts = [
  { level: "critical" as const, msgKey: "labourBudgetExceededBy", amount: "4,000" },
  { level: "warning" as const, msgKey: "fertilizerSpendingAt" },
  { level: "info" as const, msgKey: "febExpensesNearCeiling" },
];

const setRippleOrigin = (e: MouseEvent<HTMLButtonElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--ripple-x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--ripple-y", `${e.clientY - rect.top}px`);
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-white/20 bg-[#14532D] px-3 py-2 text-xs text-white shadow-lg">
        <div className="font-semibold">{label}</div>
        <div>₹{payload[0].value.toLocaleString("en-IN")}</div>
      </div>
    );
  }
  return null;
};

export function Dashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const monthlyData = rawMonthlyData.map((item) => ({
    ...item,
    month: t(`dynamic.months.${item.month.toLowerCase()}`),
  }));
  const catData = rawCatData.map((item) => ({
    ...item,
    cat: t(`dynamic.categories.${item.cat.toLowerCase()}`),
  }));
  const recentExpenses = rawRecentExpenses.map((item) => ({
    ...item,
    cat: t(`dynamic.categories.${item.cat.toLowerCase()}`),
    desc: t(`dynamic.expenses.${item.descKey}`),
    date: `${t(`dynamic.months.${item.monthKey}`)} ${item.day}`,
  }));
  const alerts = rawAlerts.map((item) => ({
    ...item,
    msg: t(`dynamic.alerts.${item.msgKey}`, { amount: item.amount || "" }),
  }));

  const totalExpenses = 123500;
  const totalBudget = 168000;
  const remaining = totalBudget - totalExpenses;
  const profit = 83300;
  const yieldTons = 9.4;
  const costPerAcre = Math.round(totalExpenses / 2.5);

  const kpis = [
    { label: t("pages.dashboard.totalExpenses"), value: totalExpenses, icon: DollarSign, color: SH.yellow, prefix: "₹" },
    { label: t("pages.dashboard.remainingBudget"), value: remaining, icon: TrendingUp, color: "#22C55E", prefix: "₹" },
    { label: t("pages.dashboard.estimatedProfit"), value: profit, icon: Landmark, color: SH.green, prefix: "₹" },
    { label: t("pages.dashboard.predictedYield"), value: yieldTons, icon: Sprout, color: "#4ADE80", suffix: " tons" },
    { label: t("pages.dashboard.costPerAcre"), value: costPerAcre, icon: BarChart2, color: SH.earth, prefix: "₹" },
  ];

  return (
    <div className="min-h-full px-2 py-6 md:px-0">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-[#14532D]">{t("pages.dashboard.title")}</h1>
            <p className="mt-1 text-sm text-[#4F6D58]">{t("pages.dashboard.subtitle")}</p>
          </div>
          <button
            onPointerDown={setRippleOrigin}
            onClick={() => navigate("/expenses")}
            className="agri-btn inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold"
          >
            <Plus size={15} className="icon-hover" />
            {t("pages.dashboard.addExpense")}
          </button>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {kpis.map((kpi, index) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="premium-card p-4"
            >
              <div
                className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${kpi.color}22` }}
              >
                <kpi.icon size={18} color={kpi.color} className="icon-hover" />
              </div>
              <div className="text-2xl font-bold text-[#14532D]">
                {kpi.suffix ? (
                  <CountUp end={kpi.value} suffix={kpi.suffix} />
                ) : (
                  <CountUp end={kpi.value} prefix={kpi.prefix} compactThousands />
                )}
              </div>
              <div className="mt-1 text-xs font-medium text-[#4F6D58]">{kpi.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="mb-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="premium-card p-5">
            <div className="mb-4 flex items-center gap-2">
              <BarChart2 size={16} color={SH.green} className="icon-hover" />
              <h3 className="text-sm font-semibold text-[#14532D]">{t("pages.dashboard.monthlyTrend")}</h3>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke={SH.border} />
                <XAxis dataKey="month" style={{ fontSize: "11px" }} stroke={SH.muted} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} style={{ fontSize: "11px" }} stroke={SH.muted} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="amount" fill={SH.green} radius={[6, 6, 0, 0]} animationDuration={950}>
                  {monthlyData.map((entry) => (
                    <Cell key={entry.month} fill="url(#barGradientMonthly)" />
                  ))}
                </Bar>
                <defs>
                  <linearGradient id="barGradientMonthly" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22C55E" />
                    <stop offset="100%" stopColor="#14532D" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="premium-card p-5">
            <div className="mb-4 flex items-center gap-2">
              <BarChart2 size={16} color={SH.green} className="icon-hover" />
              <h3 className="text-sm font-semibold text-[#14532D]">{t("pages.dashboard.byCategory")}</h3>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={catData} layout="vertical">
                <XAxis type="number" tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} style={{ fontSize: "11px" }} stroke={SH.muted} axisLine={false} tickLine={false} />
                <YAxis dataKey="cat" type="category" width={82} style={{ fontSize: "11px" }} stroke={SH.muted} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="amount" radius={[0, 6, 6, 0]} animationDuration={900}>
                  {catData.map((item, idx) => (
                    <Cell key={idx} fill={item.color} opacity={0.9} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="premium-card overflow-hidden lg:col-span-2">
            <div className="flex items-center justify-between border-b border-[#14532D]/10 bg-[#DCFCE7]/40 px-5 py-4">
              <h3 className="text-sm font-semibold text-[#14532D]">{t("pages.dashboard.recentExpenses")}</h3>
              <button
                onClick={() => navigate("/expenses")}
                className="text-xs font-semibold text-[#16A34A] transition-all hover:scale-105"
              >
                {t("common.viewAll")} →
              </button>
            </div>
            {recentExpenses.map((exp, idx) => (
              <div key={idx} className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: idx < recentExpenses.length - 1 ? `1px solid ${SH.border}` : "none" }}>
                <div>
                  <div className="text-sm font-medium text-[#14532D]">{exp.desc}</div>
                  <div className="text-xs text-[#4F6D58]">
                    {exp.cat} · {exp.date}
                  </div>
                </div>
                <div className="text-sm font-bold text-[#A16207]">₹{exp.amount.toLocaleString("en-IN")}</div>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="premium-card overflow-hidden">
            <div className="border-b border-[#14532D]/10 bg-[#DCFCE7]/40 px-5 py-4">
              <h3 className="text-sm font-semibold text-[#14532D]">{t("pages.dashboard.budgetAlerts")}</h3>
            </div>
            {alerts.map((alert, idx) => (
              <div key={idx} className="flex gap-3 px-5 py-3.5" style={{ borderBottom: idx < alerts.length - 1 ? `1px solid ${SH.border}` : "none" }}>
                <AlertTriangle
                  size={14}
                  color={alert.level === "critical" ? "#b45309" : alert.level === "warning" ? SH.yellow : SH.muted}
                  className="mt-0.5 flex-shrink-0"
                />
                <p className="text-[13px] leading-relaxed text-[#14532D]">{alert.msg}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
