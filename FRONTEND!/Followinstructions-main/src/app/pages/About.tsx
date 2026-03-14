import { useNavigate } from "react-router";
import {
  Brain,
  Shield,
  Sprout,
  MapPin,
  BarChart2,
  CheckCircle,
  Leaf,
  Globe,
  AlertTriangle,
  Activity,
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

const dataCoverage = [
  { label: "Districts", value: "38", desc: "All Tamil Nadu districts" },
  { label: "Crop Types", value: "24+", desc: "Major TN crops" },
  { label: "Data Years", value: "15+", desc: "Historical records" },
  { label: "Seasons", value: "6", desc: "Kharif, Rabi, Zaid & more" },
  { label: "Prediction Accuracy", value: "91%", desc: "Mean Absolute % Error < 9%" },
  { label: "Explanations", value: "3 Langs", desc: "English, Tamil, Thanglish" },
];

const techStack = [
  {
    icon: Brain,
    title: "Machine Learning Model",
    desc: "Random Forest Regressor trained on 15+ years of Tamil Nadu Department of Agriculture yield, cost, and market data. Separately trained models for yield prediction and expense prediction.",
    color: SH.green,
  },
  {
    icon: Globe,
    title: "AI Explanation Engine",
    desc: "GPT-based explanation generation conditioned on crop, district, season, and prediction output. Supports English, Tamil, and Thanglish to reach farmers at every literacy level.",
    color: "#5B8DB8",
  },
  {
    icon: BarChart2,
    title: "Data Pipeline",
    desc: "Structured data ingested from government datasets, mandi price APIs, and satellite-informed seasonal indices. Updated quarterly.",
    color: SH.turmeric,
  },
  {
    icon: Shield,
    title: "Validation & Testing",
    desc: "Leave-one-season-out cross-validation. District-level back-testing on 2020–2023 yield data. Ongoing feedback loop from user predictions.",
    color: SH.soil,
  },
];

const principles = [
  "Predictions are based on historical patterns and do not account for unprecedented weather events, pest outbreaks, or policy changes.",
  "Smart Harvest provides advisory estimates only — not financial guarantees or crop insurance.",
  "Model accuracy varies by district and crop. Thanjavur Paddy has the highest confidence due to data richness.",
  "All data is anonymized and used only to improve prediction accuracy. No personally identifiable information is shared.",
  "We do not recommend specific chemical inputs, pesticides, or vendors. Consult a certified agronomist for advisory.",
];

export function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full" style={{ backgroundColor: SH.bg }}>
      {/* Hero */}
      <div
        className="relative py-16 px-6 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${SH.deep} 0%, ${SH.green} 100%)` }}
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border"
              style={{
                width: `${250 + i * 120}px`,
                height: `${250 + i * 120}px`,
                borderColor: "rgba(255,255,255,0.4)",
                right: "-60px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
          ))}
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: SH.paddy }}
            >
              <Leaf size={20} color="white" />
            </div>
            <span
              className="text-white"
              style={{ fontFamily: "'Lora', serif", fontSize: "18px", fontWeight: 600 }}
            >
              Smart Harvest
            </span>
          </div>
          <h1
            className="text-white mb-4"
            style={{
              fontFamily: "'Lora', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              lineHeight: 1.25,
            }}
          >
            Agriculture Intelligence for
            <br />
            Tamil Nadu Farmers
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "16px", lineHeight: 1.7, maxWidth: "600px" }}>
            Smart Harvest combines machine learning, agricultural science, and farmer-first design to bring
            accurate, explainable crop predictions to every corner of Tamil Nadu.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Mission */}
        <section className="mb-12">
          <h2
            className="mb-4"
            style={{ fontFamily: "'Lora', serif", fontSize: "1.5rem", fontWeight: 600, color: SH.text }}
          >
            Our Mission
          </h2>
          <p style={{ fontSize: "16px", color: SH.muted, lineHeight: 1.8 }}>
            Tamil Nadu farmers make high-stakes cultivation decisions every season based on experience and word-of-mouth —
            with very little access to data. Smart Harvest was built to change that. By translating decades of agricultural
            data into a simple, accurate, and explainable prediction tool, we help farmers plan better, spend smarter,
            and protect their livelihoods.
          </p>
        </section>

        {/* Data Coverage */}
        <section className="mb-12">
          <h2
            className="mb-5"
            style={{ fontFamily: "'Lora', serif", fontSize: "1.5rem", fontWeight: 600, color: SH.text }}
          >
            Data Coverage
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {dataCoverage.map((d) => (
              <div
                key={d.label}
                className="p-4 rounded-2xl"
                style={{ backgroundColor: SH.surface, border: `1px solid ${SH.border}` }}
              >
                <div
                  style={{
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: SH.green,
                    fontFamily: "'Work Sans', sans-serif",
                    lineHeight: 1,
                  }}
                >
                  {d.value}
                </div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: SH.text, marginTop: "4px" }}>
                  {d.label}
                </div>
                <div style={{ fontSize: "12px", color: SH.muted, marginTop: "2px" }}>
                  {d.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technology */}
        <section className="mb-12">
          <h2
            className="mb-5"
            style={{ fontFamily: "'Lora', serif", fontSize: "1.5rem", fontWeight: 600, color: SH.text }}
          >
            Technology Overview
          </h2>
          <div className="flex flex-col gap-4">
            {techStack.map((t) => (
              <div
                key={t.title}
                className="p-5 rounded-2xl flex gap-4"
                style={{ backgroundColor: SH.surface, border: `1px solid ${SH.border}` }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${t.color}15` }}
                >
                  <t.icon size={20} color={t.color} />
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "'Lora', serif",
                      fontSize: "15px",
                      fontWeight: 600,
                      color: SH.text,
                      marginBottom: "6px",
                    }}
                  >
                    {t.title}
                  </h3>
                  <p style={{ fontSize: "14px", color: SH.muted, lineHeight: 1.65 }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How ML Prediction Works */}
        <section className="mb-12">
          <h2
            className="mb-5"
            style={{ fontFamily: "'Lora', serif", fontSize: "1.5rem", fontWeight: 600, color: SH.text }}
          >
            How ML-Based Prediction Works
          </h2>
          <div
            className="p-6 rounded-2xl"
            style={{ backgroundColor: SH.surface, border: `1px solid ${SH.border}` }}
          >
            <div className="flex flex-col gap-4">
              {[
                {
                  step: "1",
                  title: "Input Collection",
                  desc: "You provide crop type, district, season, area, and expected inputs. These become feature vectors.",
                },
                {
                  step: "2",
                  title: "Feature Engineering",
                  desc: "Season codes, district-level soil indices, historical price trends, and rainfall averages are appended automatically.",
                },
                {
                  step: "3",
                  title: "Model Inference",
                  desc: "Our Random Forest and Gradient Boosting ensemble models output yield, total cost, revenue, and profit distributions.",
                },
                {
                  step: "4",
                  title: "Confidence Scoring",
                  desc: "Based on the density of historical data for your district-crop-season combination, a confidence score is computed.",
                },
                {
                  step: "5",
                  title: "AI Explanation",
                  desc: "A language model translates the prediction into a plain-language explanation in your chosen language.",
                },
              ].map((s, i) => (
                <div key={s.step} className="flex gap-4">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: SH.green }}
                  >
                    <span className="text-white" style={{ fontSize: "13px", fontWeight: 700 }}>
                      {s.step}
                    </span>
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: SH.text, marginBottom: "2px" }}>
                      {s.title}
                    </div>
                    <div style={{ fontSize: "13px", color: SH.muted, lineHeight: 1.6 }}>
                      {s.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="mb-12">
          <h2
            className="mb-5"
            style={{ fontFamily: "'Lora', serif", fontSize: "1.5rem", fontWeight: 600, color: SH.text }}
          >
            Important Disclaimer
          </h2>
          <div
            className="p-5 rounded-2xl"
            style={{ backgroundColor: `${SH.turmeric}10`, border: `1px solid ${SH.turmeric}30` }}
          >
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={16} color={SH.soil} />
              <span style={{ fontSize: "14px", fontWeight: 600, color: SH.soil }}>
                Advisory Notice — Please Read
              </span>
            </div>
            <ul className="flex flex-col gap-3">
              {principles.map((p, i) => (
                <li key={i} className="flex gap-2.5">
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                    style={{ backgroundColor: SH.soil }}
                  />
                  <p style={{ fontSize: "13px", color: SH.soil, lineHeight: 1.65 }}>{p}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <div
          className="p-8 rounded-2xl text-center"
          style={{ background: `linear-gradient(135deg, ${SH.deep} 0%, ${SH.green} 100%)` }}
        >
          <h3
            className="text-white mb-3"
            style={{ fontFamily: "'Lora', serif", fontSize: "1.4rem", fontWeight: 700 }}
          >
            Ready to try Smart Harvest?
          </h3>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "14px", marginBottom: "20px" }}>
            Free to use. No registration required. Powered by Tamil Nadu agricultural data.
          </p>
          <button
            onClick={() => navigate("/predict")}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white transition-all hover:opacity-90"
            style={{
              backgroundColor: SH.turmeric,
              fontSize: "14px",
              fontWeight: 600,
              boxShadow: "0 4px 16px rgba(217,164,65,0.4)",
            }}
          >
            <Sprout size={17} />
            Start Prediction
          </button>
        </div>
      </div>
    </div>
  );
}
