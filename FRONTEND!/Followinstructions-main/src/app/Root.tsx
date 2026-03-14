import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Sprout,
  History,
  BarChart3,
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
} from "lucide-react";

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

const navItems = [
  { icon: Sprout, label: "New Prediction", path: "/predict", group: "prediction" },
  { icon: History, label: "History", path: "/history", group: "prediction" },
  { icon: LayoutDashboard, label: "Farm Dashboard", path: "/dashboard", group: "management" },
  { icon: DollarSign, label: "Expenses", path: "/expenses", group: "management" },
  { icon: Wallet, label: "Budgets", path: "/budgets", group: "management" },
  { icon: Map, label: "Fields", path: "/fields", group: "management" },
  { icon: Users, label: "Users", path: "/users", group: "management" },
  { icon: Bell, label: "Alerts", path: "/alerts", group: "management" },
  { icon: FileText, label: "Reports", path: "/reports", group: "management" },
  { icon: Info, label: "About", path: "/about", group: "other" },
];

const languages = ["English", "தமிழ்", "Thanglish"];

export function Root() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lang, setLang] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const isLanding = location.pathname === "/";

  const handleNav = (path: string) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full" style={{ backgroundColor: SH.deep }}>
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-5 py-5 cursor-pointer"
        onClick={() => handleNav("/")}
        style={{ borderBottom: `1px solid rgba(255,255,255,0.1)` }}
      >
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: SH.paddy }}
        >
          <Leaf size={20} color="white" />
        </div>
        <div>
          <div
            className="text-white"
            style={{ fontFamily: "'Lora', serif", fontSize: "16px", fontWeight: 600 }}
          >
            Smart Harvest
          </div>
          <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", fontFamily: "'Work Sans', sans-serif" }}>
            Agriculture Intelligence
          </div>
        </div>
      </div>

      {/* Nav Groups */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <div className="mb-4">
          <div
            className="px-3 mb-2"
            style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", fontFamily: "'Work Sans', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase" }}
          >
            Prediction
          </div>
          {navItems.filter((i) => i.group === "prediction").map((item) => {
            const active = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 transition-all text-left"
                style={{
                  backgroundColor: active ? "rgba(123,174,88,0.25)" : "transparent",
                  color: active ? SH.paddy : "rgba(255,255,255,0.72)",
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: "14px",
                }}
              >
                <item.icon size={16} />
                <span>{item.label}</span>
                {active && <ChevronRight size={14} className="ml-auto" />}
              </button>
            );
          })}
        </div>

        <div className="mb-4">
          <div
            className="px-3 mb-2"
            style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", fontFamily: "'Work Sans', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase" }}
          >
            Farm Management
          </div>
          {navItems.filter((i) => i.group === "management").map((item) => {
            const active = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 transition-all text-left"
                style={{
                  backgroundColor: active ? "rgba(123,174,88,0.25)" : "transparent",
                  color: active ? SH.paddy : "rgba(255,255,255,0.72)",
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: "14px",
                }}
              >
                <item.icon size={16} />
                <span>{item.label}</span>
                {active && <ChevronRight size={14} className="ml-auto" />}
              </button>
            );
          })}
        </div>

        <div>
          {navItems.filter((i) => i.group === "other").map((item) => {
            const active = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 transition-all text-left"
                style={{
                  backgroundColor: active ? "rgba(123,174,88,0.25)" : "transparent",
                  color: active ? SH.paddy : "rgba(255,255,255,0.72)",
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: "14px",
                }}
              >
                <item.icon size={16} />
                <span>{item.label}</span>
                {active && <ChevronRight size={14} className="ml-auto" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Language Toggle */}
      <div
        className="px-4 py-4"
        style={{ borderTop: `1px solid rgba(255,255,255,0.1)` }}
      >
        <div
          className="mb-2 flex items-center gap-1.5"
          style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", fontFamily: "'Work Sans', sans-serif" }}
        >
          <Globe size={11} />
          Language
        </div>
        <div className="flex rounded-lg overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
          {languages.map((l, i) => (
            <button
              key={l}
              onClick={() => setLang(i)}
              className="flex-1 py-1.5 transition-all"
              style={{
                backgroundColor: lang === i ? SH.paddy : "transparent",
                color: lang === i ? "white" : "rgba(255,255,255,0.5)",
                fontFamily: "'Work Sans', sans-serif",
                fontSize: "11px",
                borderRight: i < languages.length - 1 ? "1px solid rgba(255,255,255,0.15)" : "none",
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  if (isLanding) {
    return (
      <div style={{ fontFamily: "'Work Sans', sans-serif", minHeight: "100vh" }}>
        {/* Landing top nav */}
        <nav
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
          style={{ backgroundColor: "rgba(31,77,42,0.95)", backdropFilter: "blur(8px)" }}
        >
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: SH.paddy }}
            >
              <Leaf size={18} color="white" />
            </div>
            <span
              className="text-white"
              style={{ fontFamily: "'Lora', serif", fontSize: "18px", fontWeight: 600 }}
            >
              Smart Harvest
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1 rounded-lg px-1 py-1" style={{ border: "1px solid rgba(255,255,255,0.2)" }}>
              {languages.map((l, i) => (
                <button
                  key={l}
                  onClick={() => setLang(i)}
                  className="px-3 py-1 rounded-md transition-all"
                  style={{
                    backgroundColor: lang === i ? SH.paddy : "transparent",
                    color: lang === i ? "white" : "rgba(255,255,255,0.6)",
                    fontFamily: "'Work Sans', sans-serif",
                    fontSize: "12px",
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
            <button
              onClick={() => navigate("/about")}
              className="hidden md:block text-white transition-opacity hover:opacity-75"
              style={{ fontFamily: "'Work Sans', sans-serif", fontSize: "14px" }}
            >
              About
            </button>
            <button
              onClick={() => navigate("/predict")}
              className="px-4 py-2 rounded-lg text-white transition-all hover:opacity-90"
              style={{ backgroundColor: SH.turmeric, fontFamily: "'Work Sans', sans-serif", fontSize: "14px", fontWeight: 600 }}
            >
              Start Prediction
            </button>
          </div>
        </nav>
        <Outlet />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: SH.bg, fontFamily: "'Work Sans', sans-serif" }}>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col w-60 flex-shrink-0 h-full">
        <SidebarContent />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative w-64 h-full z-10">
            <SidebarContent />
          </div>
          <button
            className="absolute top-4 right-4 text-white z-20"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <div
          className="flex items-center justify-between px-4 md:px-6 py-3 flex-shrink-0"
          style={{ backgroundColor: SH.surface, borderBottom: `1px solid ${SH.border}` }}
        >
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-1.5 rounded-md"
              onClick={() => setSidebarOpen(true)}
              style={{ color: SH.text }}
            >
              <Menu size={20} />
            </button>
            <div style={{ fontSize: "13px", color: SH.muted, fontFamily: "'Work Sans', sans-serif" }}>
              {navItems.find((i) => i.path === location.pathname)?.label ?? "Smart Harvest"}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-1 rounded-lg px-1 py-1"
              style={{ border: `1px solid ${SH.border}` }}
            >
              {languages.map((l, i) => (
                <button
                  key={l}
                  onClick={() => setLang(i)}
                  className="px-2.5 py-1 rounded-md transition-all"
                  style={{
                    backgroundColor: lang === i ? SH.green : "transparent",
                    color: lang === i ? "white" : SH.muted,
                    fontFamily: "'Work Sans', sans-serif",
                    fontSize: "11px",
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: SH.green, fontSize: "13px", fontWeight: 600 }}
            >
              RK
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
