import { useState } from "react";
import { AlertTriangle, Info, CheckCircle, Bell, X } from "lucide-react";

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

type Alert = {
  id: number;
  level: "critical" | "warning" | "info" | "success";
  category: string;
  title: string;
  desc: string;
  date: string;
  dismissed: boolean;
};

const initAlerts: Alert[] = [
  {
    id: 1,
    level: "critical",
    category: "Budget",
    title: "Labour Budget Exceeded",
    desc: "Labour expenses (₹24,000) have exceeded the planned budget of ₹20,000. Overspend: ₹4,000. Review hiring plans or reallocate budget from other categories.",
    date: "Mar 8, 2025",
    dismissed: false,
  },
  {
    id: 2,
    level: "warning",
    category: "Budget",
    title: "Fertilizer Budget at 82%",
    desc: "You have used ₹18,500 of your ₹22,500 fertilizer budget. Only ₹4,000 remaining for the season. Plan purchases accordingly.",
    date: "Mar 7, 2025",
    dismissed: false,
  },
  {
    id: 3,
    level: "warning",
    category: "Budget",
    title: "February Expenses High",
    desc: "February 2025 expenses (₹32,000) are close to the monthly budget ceiling of ₹35,000. Monthly usage at 91%.",
    date: "Mar 5, 2025",
    dismissed: false,
  },
  {
    id: 4,
    level: "info",
    category: "Harvest",
    title: "Harvest Window Approaching — Field A",
    desc: "Your Paddy crop on Field A (Thanjavur, Kharif 2025) is expected to be ready for harvest in approximately 22 days. Begin preparing labour and transport arrangements.",
    date: "Mar 5, 2025",
    dismissed: false,
  },
  {
    id: 5,
    level: "info",
    category: "Prediction",
    title: "New Prediction Available",
    desc: "Based on updated district data, a refreshed prediction model for Thanjavur Kharif Paddy is now available. Rerun your prediction for updated estimates.",
    date: "Mar 3, 2025",
    dismissed: false,
  },
  {
    id: 6,
    level: "success",
    category: "Budget",
    title: "Machine Budget On Track",
    desc: "Machine expenses (₹11,000) are within the budget of ₹12,000. You have ₹1,000 remaining. Good spending control.",
    date: "Mar 2, 2025",
    dismissed: false,
  },
  {
    id: 7,
    level: "info",
    category: "Field",
    title: "Field C Ready for Next Season",
    desc: "Field C (Dindigul — Groundnut) has been marked as Harvested. Consider planning your next crop for the Rabi 2025 season.",
    date: "Feb 28, 2025",
    dismissed: false,
  },
];

const levelConfig = {
  critical: {
    icon: AlertTriangle,
    color: SH.terracotta,
    bg: `${SH.terracotta}12`,
    border: `${SH.terracotta}30`,
    label: "Critical",
    labelBg: `${SH.terracotta}18`,
  },
  warning: {
    icon: AlertTriangle,
    color: SH.turmeric,
    bg: `${SH.turmeric}12`,
    border: `${SH.turmeric}30`,
    label: "Warning",
    labelBg: `${SH.turmeric}18`,
  },
  info: {
    icon: Info,
    color: "#5B8DB8",
    bg: "#5B8DB812",
    border: "#5B8DB830",
    label: "Info",
    labelBg: "#5B8DB818",
  },
  success: {
    icon: CheckCircle,
    color: SH.paddy,
    bg: `${SH.paddy}12`,
    border: `${SH.paddy}25`,
    label: "Good",
    labelBg: `${SH.paddy}18`,
  },
};

const categories = ["All", "Budget", "Harvest", "Prediction", "Field"];
const levels = ["All", "critical", "warning", "info", "success"];

export function Alerts() {
  const [alerts, setAlerts] = useState(initAlerts);
  const [catFilter, setCatFilter] = useState("All");
  const [levelFilter, setLevelFilter] = useState("All");

  const filtered = alerts.filter((a) => {
    if (a.dismissed) return false;
    const matchCat = catFilter === "All" || a.category === catFilter;
    const matchLevel = levelFilter === "All" || a.level === levelFilter;
    return matchCat && matchLevel;
  });

  const dismiss = (id: number) => {
    setAlerts((p) => p.map((a) => a.id === id ? { ...a, dismissed: true } : a));
  };

  const counts = {
    critical: alerts.filter((a) => !a.dismissed && a.level === "critical").length,
    warning: alerts.filter((a) => !a.dismissed && a.level === "warning").length,
    info: alerts.filter((a) => !a.dismissed && a.level === "info").length,
    success: alerts.filter((a) => !a.dismissed && a.level === "success").length,
  };

  return (
    <div className="min-h-full" style={{ backgroundColor: SH.bg }}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 style={{ fontFamily: "'Lora', serif", fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 700, color: SH.text }}>
            Alerts & Notifications
          </h1>
          <p style={{ color: SH.muted, fontSize: "14px", marginTop: "4px" }}>
            Budget warnings, harvest reminders, and system notifications.
          </p>
        </div>

        {/* Count cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {(Object.entries(counts) as [keyof typeof counts, number][]).map(([level, count]) => {
            const cfg = levelConfig[level];
            return (
              <div
                key={level}
                className="p-4 rounded-2xl cursor-pointer transition-all"
                onClick={() => setLevelFilter(levelFilter === level ? "All" : level)}
                style={{
                  backgroundColor: levelFilter === level ? cfg.bg : SH.surface,
                  border: `1.5px solid ${levelFilter === level ? cfg.color : SH.border}`,
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <cfg.icon size={15} color={cfg.color} />
                  <span style={{ fontSize: "12px", color: cfg.color, fontWeight: 600 }}>{cfg.label}</span>
                </div>
                <div style={{ fontSize: "1.5rem", fontWeight: 700, color: SH.text }}>{count}</div>
              </div>
            );
          })}
        </div>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-5">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCatFilter(c)}
              className="px-3 py-1.5 rounded-lg transition-all"
              style={{
                backgroundColor: catFilter === c ? SH.green : SH.surface,
                color: catFilter === c ? "white" : SH.muted,
                border: `1.5px solid ${catFilter === c ? SH.green : SH.border}`,
                fontSize: "12px",
                fontFamily: "'Work Sans', sans-serif",
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Alert cards */}
        <div className="flex flex-col gap-3">
          {filtered.length === 0 && (
            <div
              className="py-20 rounded-2xl text-center"
              style={{ backgroundColor: SH.surface, border: `1px solid ${SH.border}` }}
            >
              <Bell size={36} color={SH.border} className="mx-auto mb-3" />
              <p style={{ fontSize: "15px", color: SH.muted }}>No alerts to show.</p>
            </div>
          )}

          {filtered.map((alert) => {
            const cfg = levelConfig[alert.level];
            return (
              <div
                key={alert.id}
                className="p-4 rounded-2xl"
                style={{ backgroundColor: cfg.bg, border: `1px solid ${cfg.border}` }}
              >
                <div className="flex items-start gap-3">
                  <cfg.icon size={18} color={cfg.color} className="flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span style={{ fontSize: "14px", fontWeight: 600, color: SH.text }}>
                        {alert.title}
                      </span>
                      <span
                        className="px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: cfg.labelBg, color: cfg.color, fontSize: "10px", fontWeight: 600 }}
                      >
                        {cfg.label.toUpperCase()}
                      </span>
                      <span
                        className="px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: `${SH.muted}15`, color: SH.muted, fontSize: "10px" }}
                      >
                        {alert.category}
                      </span>
                    </div>
                    <p style={{ fontSize: "13px", color: SH.muted, lineHeight: 1.65 }}>
                      {alert.desc}
                    </p>
                    <div style={{ fontSize: "11px", color: SH.muted, marginTop: "8px" }}>
                      {alert.date}
                    </div>
                  </div>
                  <button
                    onClick={() => dismiss(alert.id)}
                    className="flex-shrink-0 p-1 rounded-lg hover:bg-black/5 transition-all"
                  >
                    <X size={14} color={SH.muted} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
