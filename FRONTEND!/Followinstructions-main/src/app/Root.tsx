import { useMemo, useState, type MouseEvent } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Sprout,
  History,
  DollarSign,
  Wallet,
  Map,
  Users,
  Bell,
  FileText,
  Info,
  Menu,
  X,
  ChevronRight,
  Leaf,
  Globe,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getCurrentUser, logout } from "@/app/lib/auth";
import { useTranslation } from "react-i18next";

const navItems = [
  { icon: Sprout, labelKey: "nav.newPrediction", path: "/predict", group: "prediction" },
  { icon: History, labelKey: "nav.history", path: "/history", group: "prediction" },
  { icon: LayoutDashboard, labelKey: "nav.farmDashboard", path: "/dashboard", group: "management" },
  { icon: DollarSign, labelKey: "nav.expenses", path: "/expenses", group: "management" },
  { icon: Wallet, labelKey: "nav.budgets", path: "/budgets", group: "management" },
  { icon: Map, labelKey: "nav.fields", path: "/fields", group: "management" },
  { icon: Users, labelKey: "nav.users", path: "/users", group: "management" },
  { icon: Bell, labelKey: "nav.alerts", path: "/alerts", group: "management" },
  { icon: FileText, labelKey: "nav.reports", path: "/reports", group: "management" },
  { icon: Info, labelKey: "common.about", path: "/about", group: "other" },
] as const;

const setRippleOrigin = (e: MouseEvent<HTMLButtonElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--ripple-x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--ripple-y", `${e.clientY - rect.top}px`);
};

export function Root() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const isLanding = location.pathname === "/";
  const currentLang = i18n.language;

  const switchLang = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const currentUser = getCurrentUser();
  const initials = useMemo(() => {
    const parts = currentUser.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "U";
    if (parts.length === 1) return parts[0][0]?.toUpperCase() || "U";
    return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
  }, [currentUser]);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const handleNav = (path: string) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const SidebarMenu = ({ group }: { group: "prediction" | "management" | "other" }) =>
    navItems
      .filter((item) => item.group === group)
      .map((item) => {
        const active = location.pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => handleNav(item.path)}
            className={`nav-link-underline mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all ${
              active ? "active bg-white/18 text-white" : "text-emerald-100/80 hover:bg-white/10"
            }`}
          >
            <motion.div whileHover={{ rotate: 8, scale: 1.08 }} className="icon-hover">
              <item.icon size={16} />
            </motion.div>
            <span className="text-sm font-medium">{t(item.labelKey)}</span>
            {active && <ChevronRight size={14} className="ml-auto" />}
          </button>
        );
      });

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#14532D] via-[#166534] to-[#14532D]">
      <div
        className="flex cursor-pointer items-center gap-3 border-b border-white/10 px-5 py-5"
        onClick={() => handleNav("/")}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#16A34A] to-[#EAB308] text-white shadow-lg shadow-green-900/35">
          <Leaf size={20} />
        </div>
        <div>
          <div className="text-base font-semibold text-white">{t("common.appName")}</div>
          <div className="text-xs text-emerald-100/65">{t("common.agriIntel")}</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        <div className="mb-5">
          <div className="mb-2 px-3 text-[10px] uppercase tracking-[0.1em] text-emerald-100/45">
            {t("nav.prediction")}
          </div>
          <SidebarMenu group="prediction" />
        </div>

        <div className="mb-5">
          <div className="mb-2 px-3 text-[10px] uppercase tracking-[0.1em] text-emerald-100/45">
            {t("nav.farmManagement")}
          </div>
          <SidebarMenu group="management" />
        </div>

        <SidebarMenu group="other" />
      </div>

      <div className="border-t border-white/10 px-4 py-4">
        <div className="mb-2 flex items-center gap-1.5 text-[11px] text-emerald-100/55">
          <Globe size={11} />
          {t("common.language")}
        </div>
        <div className="flex overflow-hidden rounded-xl border border-white/20 bg-white/10 p-1">
          {(["en", "ta"] as const).map((lng) => (
            <button
              key={lng}
              onClick={() => switchLang(lng)}
              className={`flex-1 rounded-lg py-1.5 text-xs transition-all ${
                currentLang === lng
                  ? "bg-white text-[#14532D] shadow-sm"
                  : "text-emerald-100/70 hover:bg-white/15"
              }`}
            >
              {lng === "en" ? t("common.english") : t("common.tamil")}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  if (isLanding) {
    return (
      <div className="min-h-screen" style={{ fontFamily: "Inter, sans-serif" }}>
        <nav className="glass-nav fixed inset-x-4 top-4 z-50 flex items-center justify-between rounded-2xl px-4 py-3 md:px-6">
          <div className="flex cursor-pointer items-center gap-3" onClick={() => navigate("/")}>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#16A34A] to-[#EAB308] text-white shadow-lg shadow-green-900/25">
              <Leaf size={18} />
            </div>
            <span className="text-lg font-semibold text-[#14532D]">{t("common.appName")}</span>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <div className="hidden items-center gap-3 md:flex">
              {(["en", "ta"] as const).map((lng) => (
                <button
                  key={lng}
                  onClick={() => switchLang(lng)}
                  className={`nav-link-underline px-1 py-1 text-sm font-semibold transition-colors ${
                    currentLang === lng ? "active text-[#14532D]" : "text-[#14532D]/70"
                  }`}
                >
                  {lng === "en" ? t("common.english") : t("common.tamil")}
                </button>
              ))}
            </div>
            <button onClick={() => navigate("/about")} className="nav-link-underline hidden text-sm text-[#14532D] md:block">
              {t("common.about")}
            </button>
            <button
              onPointerDown={setRippleOrigin}
              onClick={() => navigate("/predict")}
              className="agri-btn px-4 py-2 text-sm font-semibold"
            >
              {t("common.startPrediction")}
            </button>
            <button
              onClick={handleLogout}
              className="rounded-full border border-[#14532D]/30 bg-white/70 px-3 py-2 text-xs font-semibold text-[#14532D] transition-all hover:scale-105 hover:bg-white"
            >
              <span className="inline-flex items-center gap-1.5">
                <LogOut size={14} /> {t("common.logout")}
              </span>
            </button>
          </div>
        </nav>
        <Outlet />
      </div>
    );
  }

  const currentNavItem = navItems.find((item) => item.path === location.pathname);
  const breadcrumb = currentNavItem ? t(currentNavItem.labelKey) : t("common.appName");

  return (
    <div className="agri-app-shell flex h-screen overflow-hidden" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="hidden h-full w-64 flex-shrink-0 lg:flex">
        <SidebarContent />
      </div>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex lg:hidden"
          >
            <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
            <motion.div
              initial={{ x: -24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -24, opacity: 0 }}
              className="relative z-10 h-full w-64"
            >
              <SidebarContent />
            </motion.div>
            <button className="absolute right-4 top-4 z-20 text-white" onClick={() => setSidebarOpen(false)}>
              <X size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <div className="glass-nav mx-3 mt-3 flex flex-shrink-0 items-center justify-between rounded-2xl px-4 py-3 md:mx-5 md:px-6">
          <div className="flex items-center gap-3">
            <button
              className="rounded-xl p-2 text-[#14532D] transition-all hover:bg-[#DCFCE7] lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div className="text-sm font-medium text-[#14532D]/75">{breadcrumb}</div>
          </div>

          <div className="flex items-center gap-2.5 md:gap-3">
            <div className="flex items-center gap-1 rounded-full border border-[#14532D]/15 bg-white/70 p-1">
              {(["en", "ta"] as const).map((lng) => (
                <button
                  key={lng}
                  onClick={() => switchLang(lng)}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-all ${
                    currentLang === lng
                      ? "bg-gradient-to-r from-[#16A34A] to-[#14532D] text-white"
                      : "text-[#14532D]/65 hover:bg-[#DCFCE7]"
                  }`}
                >
                  {lng === "en" ? t("common.english") : t("common.tamil")}
                </button>
              ))}
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1 rounded-full border border-[#14532D]/20 bg-white/70 px-3 py-1.5 text-xs font-semibold text-[#14532D] transition-all hover:scale-105 hover:bg-white"
            >
              <LogOut size={13} /> {t("common.logout")}
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#16A34A] to-[#14532D] text-sm font-semibold text-white shadow-lg shadow-green-900/25">
              {initials}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 pb-3 md:px-5 md:pb-5">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
