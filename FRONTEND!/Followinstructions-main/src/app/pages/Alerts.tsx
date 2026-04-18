import { useState } from "react";
import { AlertTriangle, Info, CheckCircle, Bell, X, Filter } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";

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

type Alert = {
  id: number;
  level: "critical" | "warning" | "info" | "success";
  category: string;
  title: string;
  desc: string;
  date: string;
  dismissed: boolean;
};

const rawInitAlerts: Alert[] = [
  { id: 1, level: "critical", category: "Budget", title: "labourBudgetExceeded", desc: "labourBudgetExceededDesc", date: "Mar 8, 2025", dismissed: false },
  { id: 2, level: "warning", category: "Budget", title: "fertilizerBudget82", desc: "fertilizerBudget82Desc", date: "Mar 7, 2025", dismissed: false },
  { id: 3, level: "warning", category: "Budget", title: "febExpensesHigh", desc: "febExpensesHighDesc", date: "Mar 5, 2025", dismissed: false },
  { id: 4, level: "info", category: "Harvest", title: "harvestWindow", desc: "harvestWindowDesc", date: "Mar 5, 2025", dismissed: false },
  { id: 5, level: "info", category: "Prediction", title: "newPrediction", desc: "newPredictionDesc", date: "Mar 3, 2025", dismissed: false },
  { id: 6, level: "success", category: "Budget", title: "machineBudgetOnTrack", desc: "machineBudgetOnTrackDesc", date: "Mar 2, 2025", dismissed: false },
  { id: 7, level: "info", category: "Field", title: "fieldCReady", desc: "fieldCReadyDesc", date: "Feb 28, 2025", dismissed: false },
];

const categories = ["All", "Budget", "Harvest", "Prediction", "Field"];

export function Alerts() {
  const { t } = useTranslation();

  const levelConfig = {
    critical: { icon: AlertTriangle, color: SH.earth, bg: `${SH.earth}12`, border: `${SH.earth}40`, label: t("pages.alerts.critical"), labelBg: `${SH.earth}20` },
    warning: { icon: AlertTriangle, color: SH.yellow, bg: `${SH.yellow}14`, border: `${SH.yellow}45`, label: t("pages.alerts.warning"), labelBg: `${SH.yellow}25` },
    info: { icon: Info, color: SH.green, bg: `${SH.green}12`, border: `${SH.green}35`, label: t("pages.alerts.info"), labelBg: `${SH.green}20` },
    success: { icon: CheckCircle, color: "#22C55E", bg: "#22C55E14", border: "#22C55E35", label: t("pages.alerts.good"), labelBg: "#22C55E22" },
  };

  const [alerts, setAlerts] = useState(rawInitAlerts);
  const [catFilter, setCatFilter] = useState("All");
  const [levelFilter, setLevelFilter] = useState("All");

  const filtered = alerts.filter((item) => {
    if (item.dismissed) return false;
    const matchCat = catFilter === "All" || item.category === catFilter;
    const matchLevel = levelFilter === "All" || item.level === levelFilter;
    return matchCat && matchLevel;
  });

  const dismiss = (id: number) => setAlerts((prev) => prev.map((item) => (item.id === id ? { ...item, dismissed: true } : item)));

  const counts = {
    critical: alerts.filter((item) => !item.dismissed && item.level === "critical").length,
    warning: alerts.filter((item) => !item.dismissed && item.level === "warning").length,
    info: alerts.filter((item) => !item.dismissed && item.level === "info").length,
    success: alerts.filter((item) => !item.dismissed && item.level === "success").length,
  };

  return (
    <div className="min-h-full px-2 py-6 md:px-0">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-[#14532D]">{t("pages.alerts.title")}</h1>
          <p className="mt-1 text-sm text-[#4F6D58]">{t("pages.alerts.subtitle")}</p>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(Object.entries(counts) as [keyof typeof counts, number][]).map(([level, count], idx) => {
            const cfg = levelConfig[level];
            return (
              <motion.div
                key={level}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="premium-card cursor-pointer p-4"
                style={{ backgroundColor: levelFilter === level ? cfg.bg : undefined, borderColor: levelFilter === level ? cfg.border : SH.border }}
                onClick={() => setLevelFilter(levelFilter === level ? "All" : level)}
              >
                <div className="mb-1 flex items-center gap-2">
                  <cfg.icon size={15} color={cfg.color} className="icon-hover" />
                  <span className="text-xs font-semibold" style={{ color: cfg.color }}>{cfg.label}</span>
                </div>
                <div className="text-2xl font-bold text-[#14532D]">{count}</div>
              </motion.div>
            );
          })}
        </div>

        <div className="premium-card mb-5 p-3">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#14532D]">
            <Filter size={14} /> Filter by category
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCatFilter(cat)}
                className={`rounded-full border px-3 py-1.5 text-xs transition-all ${
                  catFilter === cat
                    ? "bg-gradient-to-r from-[#16A34A] to-[#14532D] text-white"
                    : "bg-white text-[#4F6D58] hover:scale-105 hover:bg-[#DCFCE7]"
                }`}
                style={{ borderColor: catFilter === cat ? "transparent" : SH.border }}
              >
                {t(`dynamic.categories.${cat.toLowerCase()}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {filtered.length === 0 && (
            <div className="premium-card py-20 text-center">
              <Bell size={36} color="#86A593" className="mx-auto mb-3" />
              <p className="text-sm text-[#4F6D58]">{t("pages.alerts.noAlerts")}</p>
            </div>
          )}

          <AnimatePresence>
            {filtered.map((alert, idx) => {
              const cfg = levelConfig[alert.level];
              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, delay: idx * 0.03 }}
                  className="premium-card p-4"
                  style={{ backgroundColor: cfg.bg, borderColor: cfg.border }}
                >
                  <div className="flex items-start gap-3">
                    <cfg.icon size={18} color={cfg.color} className="mt-0.5 flex-shrink-0 icon-hover" />
                    <div className="min-w-0 flex-1">
                      <div className="mb-1.5 flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold text-[#14532D]">{t(`dynamic.alerts.${alert.title}`)}</span>
                        <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ backgroundColor: cfg.labelBg, color: cfg.color }}>
                          {cfg.label.toUpperCase()}
                        </span>
                        <span className="rounded-full bg-[#14532D]/10 px-2 py-0.5 text-[10px] text-[#4F6D58]">
                          {t(`dynamic.categories.${alert.category.toLowerCase()}`)}
                        </span>
                      </div>
                      <p className="text-[13px] leading-relaxed text-[#4F6D58]">{t(`dynamic.alerts.${alert.desc}`)}</p>
                      <div className="mt-2 text-[11px] text-[#4F6D58]">
                        {alert.date.replace("Mar", t("dynamic.months.mar")).replace("Feb", t("dynamic.months.feb"))}
                      </div>
                    </div>
                    <button onClick={() => dismiss(alert.id)} className="rounded-lg p-1 transition-all hover:scale-110 hover:bg-black/5">
                      <X size={14} color={SH.muted} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
