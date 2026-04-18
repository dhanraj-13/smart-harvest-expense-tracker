import { AlertTriangle, CheckCircle, TrendingUp, Wallet, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
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

const monthlyBudgets = [
  { month: "October 2024", total: 25000, spent: 12000, status: "ok" },
  { month: "November 2024", total: 30000, spent: 18500, status: "ok" },
  { month: "December 2024", total: 28000, spent: 24000, status: "warning" },
  { month: "January 2025", total: 20000, spent: 15000, status: "ok" },
  { month: "February 2025", total: 35000, spent: 32000, status: "warning" },
  { month: "March 2025", total: 30000, spent: 22000, status: "ok" },
];

const categoryBudgets = [
  { cat: "Labour", budget: 20000, spent: 24000, icon: Wallet },
  { cat: "Fertilizer", budget: 22500, spent: 18500, icon: TrendingUp },
  { cat: "Seed", budget: 15000, spent: 12000, icon: ArrowUpRight },
  { cat: "Machine", budget: 12000, spent: 11000, icon: Wallet },
  { cat: "Water", budget: 10000, spent: 8500, icon: TrendingUp },
  { cat: "Pesticide", budget: 8000, spent: 6000, icon: ArrowUpRight },
  { cat: "Fuel", budget: 5000, spent: 1200, icon: Wallet },
  { cat: "Transport", budget: 4000, spent: 1500, icon: TrendingUp },
  { cat: "Storage", budget: 4000, spent: 2000, icon: ArrowUpRight },
  { cat: "Misc", budget: 3000, spent: 1800, icon: Wallet },
];

function ProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="h-2 overflow-hidden rounded-full bg-[#DCFCE7]">
      <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.7, ease: "easeOut" }} className="h-full rounded-full" style={{ backgroundColor: color }} />
    </div>
  );
}

export function Budgets() {
  const { t } = useTranslation();
  const totalBudget = categoryBudgets.reduce((sum, item) => sum + item.budget, 0);
  const totalSpent = categoryBudgets.reduce((sum, item) => sum + item.spent, 0);
  const overBudget = categoryBudgets.filter((item) => item.spent > item.budget);

  return (
    <div className="min-h-full px-2 py-6 md:px-0">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-[#14532D]">{t("pages.budgets.title")}</h1>
          <p className="mt-1 text-sm text-[#4F6D58]">{t("pages.budgets.subtitle")}</p>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: t("pages.budgets.seasonBudget"), value: totalBudget, icon: TrendingUp, color: SH.green },
            { label: t("pages.budgets.totalSpent"), value: totalSpent, icon: AlertTriangle, color: totalSpent > totalBudget ? SH.earth : SH.yellow },
            { label: t("pages.budgets.remaining"), value: totalBudget - totalSpent, icon: CheckCircle, color: "#22C55E" },
          ].map((card, idx) => (
            <motion.div key={card.label} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: idx * 0.06 }} className="premium-card p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: `${card.color}20` }}>
                <card.icon size={18} color={card.color} className="icon-hover" />
              </div>
              <div className="text-[1.55rem] font-bold text-[#14532D]">
                ₹<CountUp end={card.value} />
              </div>
              <div className="mt-1 text-xs text-[#4F6D58]">{card.label}</div>
              <div className="mt-3">
                <ProgressBar value={totalSpent} max={totalBudget} color={totalSpent > totalBudget ? SH.earth : SH.green} />
              </div>
            </motion.div>
          ))}
        </div>

        {overBudget.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="premium-card mb-5 flex gap-3 p-4" style={{ backgroundColor: `${SH.earth}12`, borderColor: `${SH.earth}45` }}>
            <AlertTriangle size={16} color={SH.earth} className="mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-semibold" style={{ color: SH.earth }}>
                {t("pages.budgets.budgetExceeded", { count: overBudget.length })}
              </div>
              <div className="mt-1 text-xs text-[#4F6D58]">
                {overBudget.map((item) => item.cat).join(", ")} - {t("pages.budgets.reviewSpending")}
              </div>
            </div>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="premium-card mb-6 overflow-hidden">
          <div className="border-b border-[#14532D]/10 bg-[#DCFCE7]/40 px-5 py-4">
            <span className="text-sm font-semibold text-[#14532D]">{t("pages.budgets.categoryBudget")}</span>
          </div>
          <div>
            {categoryBudgets.map((item, idx) => {
              const pct = (item.spent / item.budget) * 100;
              const over = item.spent > item.budget;
              const Icon = item.icon;
              return (
                <div key={item.cat} className="px-5 py-4" style={{ borderBottom: idx < categoryBudgets.length - 1 ? `1px solid ${SH.border}` : "none" }}>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="rounded-lg bg-[#DCFCE7] p-1.5">
                        <Icon size={14} color={SH.green} />
                      </div>
                      <span className="text-sm font-medium text-[#14532D]">{item.cat}</span>
                      {over && (
                        <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ backgroundColor: `${SH.earth}20`, color: SH.earth }}>
                          {t("pages.budgets.overBudget")}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[#4F6D58]">₹{item.spent.toLocaleString("en-IN")} / ₹{item.budget.toLocaleString("en-IN")}</span>
                      <span className="w-11 text-right text-xs font-semibold" style={{ color: over ? SH.earth : SH.green }}>{pct.toFixed(0)}%</span>
                    </div>
                  </div>
                  <ProgressBar value={item.spent} max={item.budget} color={over ? SH.earth : pct > 80 ? SH.yellow : SH.green} />
                </div>
              );
            })}
          </div>
        </motion.div>

        <div>
          <h2 className="mb-4 text-base font-semibold text-[#14532D]">{t("pages.budgets.monthlyCards")}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {monthlyBudgets.map((month, idx) => {
              const pct = (month.spent / month.total) * 100;
              const over = month.spent > month.total;
              return (
                <motion.div key={month.month} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: idx * 0.05 }} className="premium-card p-4" style={{ borderColor: over ? `${SH.earth}55` : month.status === "warning" ? `${SH.yellow}55` : SH.border }}>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#14532D]">{month.month}</span>
                    {over ? <AlertTriangle size={14} color={SH.earth} /> : month.status === "warning" ? <AlertTriangle size={14} color={SH.yellow} /> : <CheckCircle size={14} color="#22C55E" />}
                  </div>
                  <div className="text-xl font-bold text-[#14532D]">₹{month.spent.toLocaleString("en-IN")}</div>
                  <div className="mb-2 text-xs text-[#4F6D58]">{t("pages.budgets.ofBudget", { amount: month.total.toLocaleString("en-IN") })}</div>
                  <ProgressBar value={month.spent} max={month.total} color={over ? SH.earth : month.status === "warning" ? SH.yellow : SH.green} />
                  <div className="mt-2 text-xs" style={{ color: over ? SH.earth : SH.muted, fontWeight: over ? 600 : 400 }}>
                    {pct.toFixed(1)}% {t("pages.budgets.used")} · {over ? `₹${(month.spent - month.total).toLocaleString("en-IN")} ${t("pages.budgets.over")}` : `₹${(month.total - month.spent).toLocaleString("en-IN")} ${t("pages.budgets.left")}`}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
