import { AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";

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

const monthlyBudgets = [
  { month: "October 2024", total: 25000, spent: 12000, status: "ok" },
  { month: "November 2024", total: 30000, spent: 18500, status: "ok" },
  { month: "December 2024", total: 28000, spent: 24000, status: "warning" },
  { month: "January 2025", total: 20000, spent: 15000, status: "ok" },
  { month: "February 2025", total: 35000, spent: 32000, status: "warning" },
  { month: "March 2025", total: 30000, spent: 22000, status: "ok" },
];

const categoryBudgets = [
  { cat: "Labour", budget: 20000, spent: 24000, icon: "👷" },
  { cat: "Fertilizer", budget: 22500, spent: 18500, icon: "🧪" },
  { cat: "Seed", budget: 15000, spent: 12000, icon: "🌱" },
  { cat: "Machine", budget: 12000, spent: 11000, icon: "🚜" },
  { cat: "Water", budget: 10000, spent: 8500, icon: "💧" },
  { cat: "Pesticide", budget: 8000, spent: 6000, icon: "💊" },
  { cat: "Fuel", budget: 5000, spent: 1200, icon: "⚡" },
  { cat: "Transport", budget: 4000, spent: 1500, icon: "🚚" },
  { cat: "Storage", budget: 4000, spent: 2000, icon: "🏪" },
  { cat: "Misc", budget: 3000, spent: 1800, icon: "📦" },
];

function ProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: SH.border }}>
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
    </div>
  );
}

export function Budgets() {
  const totalBudget = categoryBudgets.reduce((s, c) => s + c.budget, 0);
  const totalSpent = categoryBudgets.reduce((s, c) => s + c.spent, 0);
  const overBudget = categoryBudgets.filter((c) => c.spent > c.budget);

  return (
    <div className="min-h-full" style={{ backgroundColor: SH.bg }}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 style={{ fontFamily: "'Lora', serif", fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 700, color: SH.text }}>
            Budget Tracker
          </h1>
          <p style={{ color: SH.muted, fontSize: "14px", marginTop: "4px" }}>
            Monitor spending against your planned budgets.
          </p>
        </div>

        {/* Season summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {[
            {
              label: "Season Budget",
              value: `₹${totalBudget.toLocaleString("en-IN")}`,
              icon: TrendingUp,
              color: SH.green,
            },
            {
              label: "Total Spent",
              value: `₹${totalSpent.toLocaleString("en-IN")}`,
              icon: AlertTriangle,
              color: totalSpent > totalBudget ? SH.terracotta : SH.turmeric,
            },
            {
              label: "Remaining",
              value: `₹${(totalBudget - totalSpent).toLocaleString("en-IN")}`,
              icon: CheckCircle,
              color: SH.paddy,
            },
          ].map((c) => (
            <div
              key={c.label}
              className="p-5 rounded-2xl"
              style={{ backgroundColor: SH.surface, border: `1px solid ${SH.border}` }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: `${c.color}18` }}
              >
                <c.icon size={18} color={c.color} />
              </div>
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: SH.text }}>{c.value}</div>
              <div style={{ fontSize: "12px", color: SH.muted, marginTop: "3px" }}>{c.label}</div>
              <div className="mt-3">
                <ProgressBar
                  value={totalSpent}
                  max={totalBudget}
                  color={totalSpent > totalBudget ? SH.terracotta : SH.paddy}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Over budget warning */}
        {overBudget.length > 0 && (
          <div
            className="mb-5 p-4 rounded-xl flex gap-3"
            style={{ backgroundColor: `${SH.terracotta}10`, border: `1px solid ${SH.terracotta}30` }}
          >
            <AlertTriangle size={16} color={SH.terracotta} className="flex-shrink-0 mt-0.5" />
            <div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: SH.terracotta }}>
                Budget Exceeded in {overBudget.length} {overBudget.length === 1 ? "category" : "categories"}
              </div>
              <div style={{ fontSize: "12px", color: SH.muted, marginTop: "2px" }}>
                {overBudget.map((c) => c.cat).join(", ")} — review your spending.
              </div>
            </div>
          </div>
        )}

        {/* Category budgets */}
        <div
          className="rounded-2xl overflow-hidden mb-6"
          style={{ backgroundColor: SH.surface, border: `1px solid ${SH.border}` }}
        >
          <div
            className="px-5 py-4"
            style={{ borderBottom: `1px solid ${SH.border}`, backgroundColor: SH.bg }}
          >
            <span style={{ fontFamily: "'Lora', serif", fontSize: "15px", fontWeight: 600, color: SH.text }}>
              Category-wise Budget
            </span>
          </div>
          <div>
            {categoryBudgets.map((c, i) => {
              const pct = (c.spent / c.budget) * 100;
              const over = c.spent > c.budget;
              return (
                <div
                  key={c.cat}
                  className="px-5 py-4"
                  style={{ borderBottom: i < categoryBudgets.length - 1 ? `1px solid ${SH.border}` : "none" }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <span style={{ fontSize: "16px" }}>{c.icon}</span>
                      <span style={{ fontSize: "14px", fontWeight: 500, color: SH.text }}>{c.cat}</span>
                      {over && (
                        <span
                          className="px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: `${SH.terracotta}18`, color: SH.terracotta, fontSize: "10px", fontWeight: 600 }}
                        >
                          OVER BUDGET
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span style={{ fontSize: "13px", color: SH.muted }}>
                        ₹{c.spent.toLocaleString("en-IN")} / ₹{c.budget.toLocaleString("en-IN")}
                      </span>
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: 600,
                          color: over ? SH.terracotta : SH.green,
                          width: "42px",
                          textAlign: "right",
                        }}
                      >
                        {pct.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  <ProgressBar
                    value={c.spent}
                    max={c.budget}
                    color={over ? SH.terracotta : pct > 80 ? SH.turmeric : SH.paddy}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Monthly budgets */}
        <div>
          <h2
            className="mb-4"
            style={{ fontFamily: "'Lora', serif", fontSize: "16px", fontWeight: 600, color: SH.text }}
          >
            Monthly Budget Cards
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {monthlyBudgets.map((m) => {
              const pct = (m.spent / m.total) * 100;
              const over = m.spent > m.total;
              return (
                <div
                  key={m.month}
                  className="p-4 rounded-2xl"
                  style={{
                    backgroundColor: SH.surface,
                    border: `1.5px solid ${over ? SH.terracotta : m.status === "warning" ? SH.turmeric : SH.border}`,
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span style={{ fontSize: "13px", fontWeight: 600, color: SH.text }}>{m.month}</span>
                    {over ? (
                      <AlertTriangle size={14} color={SH.terracotta} />
                    ) : m.status === "warning" ? (
                      <AlertTriangle size={14} color={SH.turmeric} />
                    ) : (
                      <CheckCircle size={14} color={SH.paddy} />
                    )}
                  </div>
                  <div style={{ fontSize: "1.2rem", fontWeight: 700, color: SH.text }}>
                    ₹{m.spent.toLocaleString("en-IN")}
                  </div>
                  <div style={{ fontSize: "11px", color: SH.muted, marginBottom: "8px" }}>
                    of ₹{m.total.toLocaleString("en-IN")} budget
                  </div>
                  <ProgressBar
                    value={m.spent}
                    max={m.total}
                    color={over ? SH.terracotta : m.status === "warning" ? SH.turmeric : SH.paddy}
                  />
                  <div
                    style={{
                      fontSize: "11px",
                      color: over ? SH.terracotta : SH.muted,
                      marginTop: "6px",
                      fontWeight: over ? 600 : 400,
                    }}
                  >
                    {pct.toFixed(1)}% used · {over ? `₹${(m.spent - m.total).toLocaleString("en-IN")} over` : `₹${(m.total - m.spent).toLocaleString("en-IN")} left`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
