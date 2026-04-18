import { useNavigate } from "react-router";
import {
  Database,
  Cpu,
  FileSearch,
  Brain,
  Languages,
  Shield,
  AlertTriangle,
  ChevronRight,
  Leaf,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const SH = {
  green: "#2F6B3B",
  deep: "#1F4D2A",
  paddy: "#7BAE58",
  turmeric: "#D9A441",
  soil: "#6B4F3A",
  bg: "#F7F3EA",
  surface: "#FFFDF8",
  text: "#1F2933",
  muted: "#667085",
  border: "#D9D2C3",
};

export function About() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const dataCoverage = [
    { label: t("pages.about.dataCov1Label"), value: t("pages.about.dataCov1Value"), desc: t("pages.about.dataCov1Desc") },
    { label: t("pages.about.dataCov2Label"), value: t("pages.about.dataCov2Value"), desc: t("pages.about.dataCov2Desc") },
    { label: t("pages.about.dataCov3Label"), value: t("pages.about.dataCov3Value"), desc: t("pages.about.dataCov3Desc") },
    { label: t("pages.about.dataCov4Label"), value: t("pages.about.dataCov4Value"), desc: t("pages.about.dataCov4Desc") },
    { label: t("pages.about.dataCov5Label"), value: t("pages.about.dataCov5Value"), desc: t("pages.about.dataCov5Desc") },
    { label: t("pages.about.dataCov6Label"), value: t("pages.about.dataCov6Value"), desc: t("pages.about.dataCov6Desc") },
  ];

  const techStack = [
    { icon: Database, title: t("pages.about.tech1Title"), desc: t("pages.about.tech1Desc") },
    { icon: Brain, title: t("pages.about.tech2Title"), desc: t("pages.about.tech2Desc") },
    { icon: FileSearch, title: t("pages.about.tech3Title"), desc: t("pages.about.tech3Desc") },
    { icon: Shield, title: t("pages.about.tech4Title"), desc: t("pages.about.tech4Desc") },
  ];

  const mlSteps = [
    { num: "01", title: t("pages.about.mlStep1Title"), desc: t("pages.about.mlStep1Desc"), icon: Cpu },
    { num: "02", title: t("pages.about.mlStep2Title"), desc: t("pages.about.mlStep2Desc"), icon: FileSearch },
    { num: "03", title: t("pages.about.mlStep3Title"), desc: t("pages.about.mlStep3Desc"), icon: Brain },
    { num: "04", title: t("pages.about.mlStep4Title"), desc: t("pages.about.mlStep4Desc"), icon: Shield },
    { num: "05", title: t("pages.about.mlStep5Title"), desc: t("pages.about.mlStep5Desc"), icon: Languages },
  ];

  const disclaimers = [
    t("pages.about.disclaimer1"),
    t("pages.about.disclaimer2"),
    t("pages.about.disclaimer3"),
    t("pages.about.disclaimer4"),
    t("pages.about.disclaimer5"),
  ];

  return (
    <div className="min-h-full" style={{ backgroundColor: SH.bg }}>
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: SH.paddy }}>
              <Leaf size={22} color="white" />
            </div>
          </div>
          <h1 style={{ fontFamily: "'Lora', serif", fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", fontWeight: 700, color: SH.text }}>
            {t("pages.about.heroTitle1")}
            <br />
            <span style={{ color: SH.green }}>{t("pages.about.heroTitle2")}</span>
          </h1>
          <p className="max-w-2xl mx-auto mt-4" style={{ fontSize: "15px", color: SH.muted, lineHeight: 1.7 }}>{t("pages.about.heroDesc")}</p>
        </div>

        {/* Mission */}
        <div className="rounded-2xl p-6 mb-8" style={{ backgroundColor: SH.deep, border: `1px solid ${SH.deep}`, boxShadow: "0 4px 20px rgba(31,77,42,0.15)" }}>
          <h2 className="text-white mb-3" style={{ fontFamily: "'Lora', serif", fontSize: "17px", fontWeight: 600 }}>{t("pages.about.missionTitle")}</h2>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.78)", lineHeight: 1.8 }}>{t("pages.about.missionDesc")}</p>
        </div>

        {/* Data Coverage */}
        <div className="mb-8">
          <h2 className="mb-4" style={{ fontFamily: "'Lora', serif", fontSize: "17px", fontWeight: 600, color: SH.text }}>{t("pages.about.dataCoverage")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {dataCoverage.map((d) => (
              <div key={d.label} className="p-4 rounded-xl" style={{ backgroundColor: SH.surface, border: `1px solid ${SH.border}` }}>
                <div style={{ fontSize: "1.5rem", fontWeight: 700, color: SH.green, fontFamily: "'Work Sans', sans-serif" }}>{d.value}</div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: SH.text, marginTop: "2px" }}>{d.label}</div>
                <div style={{ fontSize: "11px", color: SH.muted, marginTop: "2px" }}>{d.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech */}
        <div className="mb-8">
          <h2 className="mb-4" style={{ fontFamily: "'Lora', serif", fontSize: "17px", fontWeight: 600, color: SH.text }}>{t("pages.about.techOverview")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {techStack.map((tech) => (
              <div key={tech.title} className="p-5 rounded-2xl" style={{ backgroundColor: SH.surface, border: `1px solid ${SH.border}` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${SH.paddy}20` }}>
                  <tech.icon size={20} color={SH.green} />
                </div>
                <h3 style={{ fontSize: "14px", fontWeight: 600, color: SH.text, marginBottom: "4px" }}>{tech.title}</h3>
                <p style={{ fontSize: "13px", color: SH.muted, lineHeight: 1.6 }}>{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl p-6 text-center mb-8" style={{ backgroundColor: SH.surface, border: `1.5px solid ${SH.paddy}40` }}>
          <h3 style={{ fontFamily: "'Lora', serif", fontSize: "18px", fontWeight: 600, color: SH.text }}>{t("pages.about.ctaTitle")}</h3>
          <p className="mt-2" style={{ fontSize: "13px", color: SH.muted }}>{t("pages.about.ctaDesc")}</p>
          <button
            onClick={() => navigate("/predict")}
            className="mt-5 inline-flex items-center gap-2 px-7 py-3 rounded-xl text-white"
            style={{ backgroundColor: SH.green, fontSize: "14px", fontWeight: 600 }}
          >
            {t("pages.about.ctaButton")} <ChevronRight size={16} />
          </button>
        </div>

        {/* ML Steps */}
        <div className="mb-8">
          <h2 className="mb-5" style={{ fontFamily: "'Lora', serif", fontSize: "17px", fontWeight: 600, color: SH.text }}>{t("pages.about.mlTitle")}</h2>
          <div className="flex flex-col gap-3">
            {mlSteps.map((step) => (
              <div key={step.num} className="flex gap-4 p-4 rounded-xl" style={{ backgroundColor: SH.surface, border: `1px solid ${SH.border}` }}>
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${SH.paddy}18` }}>
                  <step.icon size={18} color={SH.green} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span style={{ fontSize: "11px", color: SH.paddy, fontWeight: 700 }}>{step.num}</span>
                    <span style={{ fontSize: "14px", fontWeight: 600, color: SH.text }}>{step.title}</span>
                  </div>
                  <p style={{ fontSize: "13px", color: SH.muted, lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="rounded-2xl p-5 mb-6" style={{ backgroundColor: `${SH.turmeric}10`, border: `1px solid ${SH.turmeric}28` }}>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={16} color={SH.soil} />
            <h3 style={{ fontSize: "14px", fontWeight: 600, color: SH.soil }}>{t("pages.about.disclaimerNotice")}</h3>
          </div>
          <ul className="space-y-2">
            {disclaimers.map((d, i) => (
              <li key={i} className="flex gap-2" style={{ fontSize: "13px", color: SH.soil, lineHeight: 1.6 }}>
                <span className="flex-shrink-0 mt-1">•</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
