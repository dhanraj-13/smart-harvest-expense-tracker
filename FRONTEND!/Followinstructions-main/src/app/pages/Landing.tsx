import { useNavigate } from "react-router";
import {
  Sprout,
  TrendingUp,
  Brain,
  BarChart2,
  Shield,
  CheckCircle,
  ChevronRight,
  Star,
  ArrowRight,
  Leaf,
  MapPin,
  Calendar,
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

const heroImageUrl =
  "https://images.unsplash.com/photo-1628179148156-d9cfac053d6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWRkeSUyMHJpY2UlMjBmaWVsZCUyMFRhbWlsJTIwTmFkdSUyMGdyZWVufGVufDF8fHx8MTc3MzA3ODE1NXww&ixlib=rb-4.1.0&q=80&w=1080";

const farmerImageUrl =
  "https://images.unsplash.com/photo-1662815094316-917f52876324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBmYXJtZXIlMjBhZ3JpY3VsdHVyZSUyMGZpZWxkJTIwbW9ybmluZ3xlbnwxfHx8fDE3NzMwNzgxNTV8MA&ixlib=rb-4.1.0&q=80&w=1080";

const trustStats = [
  { label: "Districts Covered", value: "38", icon: MapPin },
  { label: "Crops Supported", value: "24+", icon: Leaf },
  { label: "Seasons Tracked", value: "6", icon: Calendar },
  { label: "Model Accuracy", value: "91%", icon: Activity },
];

const features = [
  {
    icon: TrendingUp,
    title: "Yield Prediction",
    desc: "ML-powered crop yield forecasting based on district, season, crop type, and area — calibrated on Tamil Nadu data.",
    color: SH.paddy,
  },
  {
    icon: BarChart2,
    title: "Expense Prediction",
    desc: "Accurate cost estimates across seed, fertilizer, labor, machine, water, and transport for your farming cycle.",
    color: SH.turmeric,
  },
  {
    icon: Brain,
    title: "AI Explanation",
    desc: "Clear, farmer-friendly explanations of predictions in English, Tamil, or Thanglish — powered by AI.",
    color: SH.terracotta,
  },
  {
    icon: Sprout,
    title: "Farm Management",
    desc: "Track expenses, manage budgets, monitor fields, set alerts, and generate reports — all in one place.",
    color: SH.soil,
  },
];

const steps = [
  {
    num: "01",
    title: "Enter Crop Details",
    desc: "Tell us your district, crop, season, area, and sowing dates. Simple fields, no jargon.",
  },
  {
    num: "02",
    title: "Add Your Expenses",
    desc: "Enter your expected costs — seed, labor, fertilizer, and more. Or let Smart Harvest estimate for you.",
  },
  {
    num: "03",
    title: "Get Predictions",
    desc: "Receive yield, revenue, and profit predictions with confidence scores and AI-powered explanation.",
  },
];

const testimonials = [
  {
    name: "Murugan K.",
    role: "Paddy Farmer, Thanjavur",
    quote:
      "Smart Harvest predicted my paddy yield within 2% of what I actually harvested. The Tamil explanation helped me understand the numbers.",
    stars: 5,
  },
  {
    name: "Kavitha Devi",
    role: "Farm Manager, Coimbatore",
    quote:
      "The expense prediction saved me from over-investing in fertilizers. Budget tracking is now simple.",
    stars: 5,
  },
  {
    name: "Dr. Arumugam S.",
    role: "Agri Advisor, Madurai",
    quote:
      "I use Smart Harvest to prepare pre-season reports for 12 farms. The comparison feature is excellent.",
    stars: 5,
  },
];

export function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Work Sans', sans-serif", backgroundColor: SH.bg }}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={heroImageUrl}
            alt="Paddy fields"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, rgba(31,77,42,0.92) 0%, rgba(31,77,42,0.75) 50%, rgba(31,77,42,0.4) 100%)`,
            }}
          />
        </div>

        {/* Decorative contour lines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border"
              style={{
                width: `${300 + i * 120}px`,
                height: `${300 + i * 120}px`,
                borderColor: "rgba(255,255,255,0.3)",
                top: "50%",
                left: "60%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20">
          <div className="max-w-2xl">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{
                backgroundColor: "rgba(123,174,88,0.2)",
                border: "1px solid rgba(123,174,88,0.4)",
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: SH.paddy }}
              />
              <span
                className="text-white"
                style={{ fontSize: "13px", fontFamily: "'Work Sans', sans-serif" }}
              >
                ML-Powered Crop Intelligence for Tamil Nadu
              </span>
            </div>

            <h1
              className="text-white mb-5"
              style={{
                fontFamily: "'Lora', serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Plan Smarter.
              <br />
              <span style={{ color: SH.turmeric }}>Predict Profit.</span>
              <br />
              Farm Better.
            </h1>

            <p
              className="mb-8 max-w-xl"
              style={{
                fontSize: "17px",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.82)",
                fontFamily: "'Work Sans', sans-serif",
              }}
            >
              Smart Harvest uses machine learning trained on Tamil Nadu agriculture data to predict your
              crop yield, cultivation costs, revenue, and profit — before you spend a single rupee.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/predict")}
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-white transition-all hover:opacity-90 active:scale-95"
                style={{
                  backgroundColor: SH.turmeric,
                  fontSize: "15px",
                  fontWeight: 600,
                  fontFamily: "'Work Sans', sans-serif",
                  boxShadow: "0 4px 20px rgba(217,164,65,0.4)",
                }}
              >
                <Sprout size={18} />
                Start Prediction
                <ChevronRight size={16} />
              </button>
              <button
                onClick={() => navigate("/about")}
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-white transition-all hover:bg-white/10"
                style={{
                  border: "1px solid rgba(255,255,255,0.35)",
                  fontSize: "15px",
                  fontFamily: "'Work Sans', sans-serif",
                }}
              >
                Learn More
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Trust Stats */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ backgroundColor: "rgba(31,77,42,0.85)", backdropFilter: "blur(8px)" }}
        >
          <div className="max-w-6xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustStats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(123,174,88,0.2)" }}
                >
                  <stat.icon size={18} color={SH.paddy} />
                </div>
                <div>
                  <div
                    className="text-white"
                    style={{ fontSize: "20px", fontWeight: 700, lineHeight: 1 }}
                  >
                    {stat.value}
                  </div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6" style={{ backgroundColor: SH.surface }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div
              className="inline-block px-3 py-1 rounded-full mb-3"
              style={{ backgroundColor: `${SH.paddy}22`, color: SH.green }}
            >
              <span style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em" }}>
                PLATFORM FEATURES
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Lora', serif",
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                color: SH.text,
                fontWeight: 600,
              }}
            >
              Everything a Tamil Nadu Farmer Needs
            </h2>
            <p style={{ color: SH.muted, fontSize: "16px", marginTop: "12px" }}>
              From pre-season planning to post-harvest analysis — in one platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feat) => (
              <div
                key={feat.title}
                className="p-6 rounded-2xl transition-all hover:-translate-y-1"
                style={{
                  backgroundColor: SH.surface,
                  border: `1px solid ${SH.border}`,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${feat.color}18` }}
                >
                  <feat.icon size={22} color={feat.color} />
                </div>
                <h3
                  style={{
                    fontFamily: "'Lora', serif",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: SH.text,
                    marginBottom: "8px",
                  }}
                >
                  {feat.title}
                </h3>
                <p style={{ fontSize: "14px", color: SH.muted, lineHeight: 1.6 }}>
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6" style={{ backgroundColor: SH.bg }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div
              className="inline-block px-3 py-1 rounded-full mb-3"
              style={{ backgroundColor: `${SH.turmeric}22`, color: SH.soil }}
            >
              <span style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em" }}>
                HOW IT WORKS
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Lora', serif",
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                color: SH.text,
                fontWeight: 600,
              }}
            >
              Three Steps to Smarter Farming
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.num} className="relative">
                {i < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute top-8 left-full w-full h-0.5 -translate-y-1/2 z-0"
                    style={{ backgroundColor: SH.border, width: "calc(100% - 32px)", left: "calc(50% + 32px)" }}
                  />
                )}
                <div className="relative z-10 text-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: SH.green, boxShadow: "0 4px 16px rgba(47,107,59,0.3)" }}
                  >
                    <span
                      className="text-white"
                      style={{ fontFamily: "'Lora', serif", fontSize: "20px", fontWeight: 700 }}
                    >
                      {step.num}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Lora', serif",
                      fontSize: "17px",
                      fontWeight: 600,
                      color: SH.text,
                      marginBottom: "8px",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ fontSize: "14px", color: SH.muted, lineHeight: 1.65 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate("/predict")}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white transition-all hover:opacity-90"
              style={{
                backgroundColor: SH.green,
                fontSize: "15px",
                fontWeight: 600,
                fontFamily: "'Work Sans', sans-serif",
                boxShadow: "0 4px 20px rgba(47,107,59,0.35)",
              }}
            >
              <Sprout size={18} />
              Try Smart Harvest Free
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6" style={{ backgroundColor: SH.surface }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div
              className="inline-block px-3 py-1 rounded-full mb-3"
              style={{ backgroundColor: `${SH.green}18`, color: SH.green }}
            >
              <span style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em" }}>
                FROM FARMERS
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Lora', serif",
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                color: SH.text,
                fontWeight: 600,
              }}
            >
              Trusted Across Tamil Nadu
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="p-6 rounded-2xl"
                style={{
                  backgroundColor: SH.bg,
                  border: `1px solid ${SH.border}`,
                }}
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} size={14} fill={SH.turmeric} color={SH.turmeric} />
                  ))}
                </div>
                <p
                  className="mb-5"
                  style={{
                    fontSize: "15px",
                    color: SH.text,
                    lineHeight: 1.7,
                    fontStyle: "italic",
                    fontFamily: "'Lora', serif",
                  }}
                >
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: SH.green, fontSize: "14px", fontWeight: 600 }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: SH.text }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: "12px", color: SH.muted }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section
        className="py-16 px-6"
        style={{
          background: `linear-gradient(135deg, ${SH.deep} 0%, ${SH.green} 100%)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border"
              style={{
                width: `${200 + i * 100}px`,
                height: `${200 + i * 100}px`,
                borderColor: "rgba(255,255,255,0.5)",
                right: "-50px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
          ))}
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <h2
            className="text-white mb-4"
            style={{
              fontFamily: "'Lora', serif",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 700,
            }}
          >
            Ready to predict your next harvest?
          </h2>
          <p
            className="mb-8"
            style={{ color: "rgba(255,255,255,0.75)", fontSize: "16px", fontFamily: "'Work Sans', sans-serif" }}
          >
            Join thousands of Tamil Nadu farmers making data-driven decisions.
            <br />
            Free to use. Powered by ML.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate("/predict")}
              className="flex items-center gap-2 px-8 py-4 rounded-xl text-white transition-all hover:opacity-90"
              style={{
                backgroundColor: SH.turmeric,
                fontSize: "15px",
                fontWeight: 600,
                fontFamily: "'Work Sans', sans-serif",
                boxShadow: "0 4px 20px rgba(217,164,65,0.4)",
              }}
            >
              <Sprout size={18} />
              Start Prediction
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 px-8 py-4 rounded-xl text-white transition-all"
              style={{
                border: "1px solid rgba(255,255,255,0.3)",
                fontSize: "15px",
                fontFamily: "'Work Sans', sans-serif",
              }}
            >
              View Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-6 py-10"
        style={{ backgroundColor: SH.deep }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: SH.paddy }}
              >
                <Leaf size={18} color="white" />
              </div>
              <div>
                <div
                  className="text-white"
                  style={{ fontFamily: "'Lora', serif", fontSize: "16px", fontWeight: 600 }}
                >
                  Smart Harvest
                </div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)" }}>
                  Agriculture Intelligence Platform
                </div>
              </div>
            </div>

            <div
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
              style={{ backgroundColor: "rgba(123,174,88,0.15)", border: "1px solid rgba(123,174,88,0.25)" }}
            >
              <Shield size={14} color={SH.paddy} />
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>
                Predictions are advisory. Not financial guarantees. For Tamil Nadu conditions only.
              </span>
            </div>

            <div className="flex items-center gap-5">
              {["About", "Dashboard", "Predict", "Reports"].map((item) => (
                <button
                  key={item}
                  className="hover:opacity-100 transition-opacity"
                  style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}
                  onClick={() => navigate(`/${item.toLowerCase()}`)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div
            className="mt-6 pt-6 text-center"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)", fontSize: "12px", color: "rgba(255,255,255,0.3)" }}
          >
            © 2025 Smart Harvest. Built for Tamil Nadu Farmers. Powered by ML & AI.
          </div>
        </div>
      </footer>
    </div>
  );
}
