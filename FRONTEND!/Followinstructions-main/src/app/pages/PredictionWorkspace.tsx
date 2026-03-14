import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Sprout,
  MapPin,
  Calendar,
  DollarSign,
  Info,
  Mic,
} from "lucide-react";
import { predictExpense } from "@/app/lib/predictionApi";
import { saveLastPrediction } from "@/app/lib/predictionStorage";

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

const districts = [
  "Chennai","Coimbatore","Madurai","Thanjavur","Tiruchirappalli","Salem","Tirunelveli",
  "Vellore","Erode","Tiruppur","Dindigul","Thoothukudi","Kancheepuram","Pudukottai",
  "Nagapattinam","Cuddalore","Villupuram","Tiruvannamalai","Dharmapuri","Krishnagiri",
];
const crops = ["Paddy","Sugarcane","Cotton","Groundnut","Turmeric","Banana","Maize","Ragi","Blackgram","Greengram","Sunflower","Tapioca"];
const seasons = ["Kharif (Kuruvai)","Rabi (Samba)","Zaid (Navarai)","Annual"];
const languages = ["English","Tamil","Thanglish"];

const expenseFields = [
  { key: "seed", label: "Seed & Planting", icon: "🌱" },
  { key: "fertilizer", label: "Fertilizer", icon: "🧪" },
  { key: "pesticide", label: "Pesticide / Weedicide", icon: "💊" },
  { key: "labor", label: "Labour", icon: "👷" },
  { key: "machine", label: "Machine / Equipment", icon: "🚜" },
  { key: "water", label: "Water / Irrigation", icon: "💧" },
  { key: "fuel", label: "Fuel / Electricity", icon: "⚡" },
  { key: "transport", label: "Transport", icon: "🚚" },
  { key: "storage", label: "Storage", icon: "🏪" },
  { key: "misc", label: "Miscellaneous", icon: "📦" },
];

type Step1Data = {
  farmerId: string;
  district: string;
  crop: string;
  season: string;
  area: string;
  areaUnit: string;
  sowingDate: string;
  harvestDate: string;
  sellingPrice: string;
  explainLang: string;
};

type Expenses = Record<string, string>;

const defaultStep1: Step1Data = {
  farmerId: "FMR-2025-0091",
  district: "Thanjavur",
  crop: "Paddy",
  season: "Kharif (Kuruvai)",
  area: "",
  areaUnit: "acre",
  sowingDate: "",
  harvestDate: "",
  sellingPrice: "",
  explainLang: "English",
};

const defaultExpenses: Expenses = {
  seed: "",fertilizer: "",pesticide: "",labor: "",machine: "",water: "",fuel: "",transport: "",storage: "",misc: "",
};

function InputField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  hint,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <div>
      <label
        className="block mb-1.5"
        style={{ fontSize: "13px", fontWeight: 600, color: SH.text }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3.5 py-2.5 rounded-lg outline-none transition-all"
        style={{
          border: `1.5px solid ${SH.border}`,
          backgroundColor: SH.surface,
          color: SH.text,
          fontSize: "14px",
          fontFamily: "'Work Sans', sans-serif",
        }}
        onFocus={(e) => (e.target.style.borderColor = SH.green)}
        onBlur={(e) => (e.target.style.borderColor = SH.border)}
      />
      {hint && <p style={{ fontSize: "12px", color: SH.muted, marginTop: "4px" }}>{hint}</p>}
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label
        className="block mb-1.5"
        style={{ fontSize: "13px", fontWeight: 600, color: SH.text }}
      >
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3.5 py-2.5 rounded-lg outline-none transition-all appearance-none cursor-pointer"
        style={{
          border: `1.5px solid ${SH.border}`,
          backgroundColor: SH.surface,
          color: SH.text,
          fontSize: "14px",
          fontFamily: "'Work Sans', sans-serif",
        }}
      >
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

export function PredictionWorkspace() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [step1, setStep1] = useState<Step1Data>(defaultStep1);
  const [expenses, setExpenses] = useState<Expenses>(defaultExpenses);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const totalExpense = Object.values(expenses).reduce(
    (sum, v) => sum + (parseFloat(v) || 0),
    0
  );

  const updateStep1 = (key: keyof Step1Data, val: string) =>
    setStep1((p) => ({ ...p, [key]: val }));
  const updateExpense = (key: string, val: string) =>
    setExpenses((p) => ({ ...p, [key]: val }));

  const normalizeSeason = (season: string) => season.split("(")[0].trim();
  const toBackendLanguage = (lang: string): "english" | "thanglish" =>
    lang === "English" ? "english" : "thanglish";
  const parseAmount = (value: string) => {
    const parsed = parseFloat(value);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  };

  const runPrediction = async () => {
    const areaValue = parseFloat(step1.area);
    if (!step1.crop || !step1.district || !step1.season || !Number.isFinite(areaValue) || areaValue <= 0) {
      setSubmitError("Please fill Crop, District, Season, and a valid Area before running prediction.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    try {
      const areaHectare = step1.areaUnit === "acre" ? areaValue * 0.404686 : areaValue;
      const response = await predictExpense({
        farmer_id: step1.farmerId.trim() || "FARMER-UNKNOWN",
        district: step1.district,
        crop: step1.crop,
        season: normalizeSeason(step1.season),
        area_hectare: Number(areaHectare.toFixed(6)),
        ...(step1.sowingDate ? { sowing_date: step1.sowingDate } : {}),
        ...(step1.harvestDate ? { harvest_date: step1.harvestDate } : {}),
        seed_cost: parseAmount(expenses.seed),
        fertilizer_cost: parseAmount(expenses.fertilizer),
        pesticide_cost: parseAmount(expenses.pesticide),
        labor_cost: parseAmount(expenses.labor),
        machine_cost: parseAmount(expenses.machine),
        water_cost: parseAmount(expenses.water),
        fuel_electricity_cost: parseAmount(expenses.fuel),
        transport_cost: parseAmount(expenses.transport),
        storage_cost: parseAmount(expenses.storage),
        misc_cost: parseAmount(expenses.misc),
        selling_price_per_ton: parseAmount(step1.sellingPrice),
        language: toBackendLanguage(step1.explainLang),
      });

      saveLastPrediction({
        context: {
          crop: step1.crop,
          district: step1.district,
          season: step1.season,
          areaLabel: `${step1.area} ${step1.areaUnit}`,
          explainLang: step1.explainLang,
        },
        response,
        createdAt: new Date().toISOString(),
      });

      navigate("/results");
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Prediction failed. Check backend server and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { num: 1, label: "Crop Details", icon: Sprout },
    { num: 2, label: "Expenses", icon: DollarSign },
    { num: 3, label: "Review & Predict", icon: CheckCircle },
  ];

  return (
    <div className="min-h-full" style={{ backgroundColor: SH.bg }}>
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1
            style={{
              fontFamily: "'Lora', serif",
              fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
              fontWeight: 700,
              color: SH.text,
              marginBottom: "6px",
            }}
          >
            New Crop Prediction
          </h1>
          <p style={{ color: SH.muted, fontSize: "14px" }}>
            Complete these 3 steps to get your yield, cost, and profit prediction.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-0 mb-8">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center flex-1">
              <button
                className="flex items-center gap-2.5 flex-shrink-0"
                onClick={() => step > s.num && setStep(s.num)}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                  style={{
                    backgroundColor:
                      step > s.num ? SH.paddy : step === s.num ? SH.green : "white",
                    border: `2px solid ${step >= s.num ? SH.green : SH.border}`,
                  }}
                >
                  {step > s.num ? (
                    <CheckCircle size={16} color="white" />
                  ) : (
                    <s.icon size={15} color={step === s.num ? "white" : SH.muted} />
                  )}
                </div>
                <span
                  className="hidden sm:block"
                  style={{
                    fontSize: "13px",
                    fontWeight: step === s.num ? 600 : 400,
                    color: step >= s.num ? SH.text : SH.muted,
                    whiteSpace: "nowrap",
                  }}
                >
                  {s.label}
                </span>
              </button>
              {i < steps.length - 1 && (
                <div
                  className="flex-1 h-0.5 mx-3"
                  style={{ backgroundColor: step > s.num ? SH.paddy : SH.border }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Crop Details */}
        {step === 1 && (
          <div
            className="rounded-2xl p-6 md:p-8"
            style={{ backgroundColor: SH.surface, border: `1px solid ${SH.border}` }}
          >
            <div className="flex items-center gap-2 mb-6">
              <MapPin size={18} color={SH.green} />
              <h2
                style={{
                  fontFamily: "'Lora', serif",
                  fontSize: "17px",
                  fontWeight: 600,
                  color: SH.text,
                }}
              >
                Crop & Farm Details
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <InputField
                label="Farmer ID"
                value={step1.farmerId}
                onChange={(v) => updateStep1("farmerId", v)}
                placeholder="e.g. FMR-2025-0091"
                hint="Your registered farmer ID"
              />
              <SelectField
                label="District"
                value={step1.district}
                onChange={(v) => updateStep1("district", v)}
                options={districts}
              />
              <SelectField
                label="Crop Type"
                value={step1.crop}
                onChange={(v) => updateStep1("crop", v)}
                options={crops}
              />
              <SelectField
                label="Season"
                value={step1.season}
                onChange={(v) => updateStep1("season", v)}
                options={seasons}
              />
              <div>
                <label
                  className="block mb-1.5"
                  style={{ fontSize: "13px", fontWeight: 600, color: SH.text }}
                >
                  Area (Cultivated)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={step1.area}
                    onChange={(e) => updateStep1("area", e.target.value)}
                    placeholder="e.g. 2.5"
                    className="flex-1 px-3.5 py-2.5 rounded-lg outline-none"
                    style={{
                      border: `1.5px solid ${SH.border}`,
                      backgroundColor: SH.surface,
                      color: SH.text,
                      fontSize: "14px",
                      fontFamily: "'Work Sans', sans-serif",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = SH.green)}
                    onBlur={(e) => (e.target.style.borderColor = SH.border)}
                  />
                  <select
                    value={step1.areaUnit}
                    onChange={(e) => updateStep1("areaUnit", e.target.value)}
                    className="px-3 py-2.5 rounded-lg outline-none"
                    style={{
                      border: `1.5px solid ${SH.border}`,
                      backgroundColor: SH.surface,
                      color: SH.text,
                      fontSize: "14px",
                      fontFamily: "'Work Sans', sans-serif",
                    }}
                  >
                    <option>acre</option>
                    <option>hectare</option>
                  </select>
                </div>
              </div>
              <InputField
                label="Selling Price (per ton)"
                type="number"
                value={step1.sellingPrice}
                onChange={(v) => updateStep1("sellingPrice", v)}
                placeholder="e.g. 22000"
                hint="Expected selling price in ₹/ton"
              />
              <InputField
                label="Sowing Date"
                type="date"
                value={step1.sowingDate}
                onChange={(v) => updateStep1("sowingDate", v)}
              />
              <InputField
                label="Expected Harvest Date"
                type="date"
                value={step1.harvestDate}
                onChange={(v) => updateStep1("harvestDate", v)}
              />
              <div className="sm:col-span-2">
                <label
                  className="block mb-2"
                  style={{ fontSize: "13px", fontWeight: 600, color: SH.text }}
                >
                  AI Explanation Language
                </label>
                <div className="flex gap-2 flex-wrap">
                  {languages.map((l) => (
                    <button
                      key={l}
                      onClick={() => updateStep1("explainLang", l)}
                      className="px-4 py-2 rounded-lg transition-all"
                      style={{
                        backgroundColor:
                          step1.explainLang === l ? SH.green : "white",
                        color: step1.explainLang === l ? "white" : SH.muted,
                        border: `1.5px solid ${step1.explainLang === l ? SH.green : SH.border}`,
                        fontSize: "13px",
                        fontFamily: "'Work Sans', sans-serif",
                      }}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Voice input hint */}
            <div
              className="mt-5 p-3.5 rounded-xl flex items-center gap-3"
              style={{ backgroundColor: `${SH.paddy}12`, border: `1px solid ${SH.paddy}30` }}
            >
              <Mic size={16} color={SH.green} />
              <p style={{ fontSize: "13px", color: SH.green }}>
                <strong>Tip:</strong> You can use voice input to log expenses quickly. Available in Step 2.
              </p>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white transition-all hover:opacity-90"
                style={{
                  backgroundColor: SH.green,
                  fontSize: "14px",
                  fontWeight: 600,
                  fontFamily: "'Work Sans', sans-serif",
                }}
              >
                Next: Expenses
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Expenses */}
        {step === 2 && (
          <div
            className="rounded-2xl p-6 md:p-8"
            style={{ backgroundColor: SH.surface, border: `1px solid ${SH.border}` }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <DollarSign size={18} color={SH.green} />
                <h2
                  style={{
                    fontFamily: "'Lora', serif",
                    fontSize: "17px",
                    fontWeight: 600,
                    color: SH.text,
                  }}
                >
                  Expense Entry
                </h2>
              </div>
              <div
                className="px-3 py-1.5 rounded-lg"
                style={{ backgroundColor: `${SH.paddy}18` }}
              >
                <span style={{ fontSize: "12px", color: SH.green, fontWeight: 600 }}>
                  Leave blank to use ML estimates
                </span>
              </div>
            </div>

            {/* Voice widget */}
            <div
              className="mb-6 p-4 rounded-xl flex items-center gap-3 cursor-pointer transition-all hover:opacity-80"
              style={{
                backgroundColor: SH.deep,
                border: `1px solid ${SH.paddy}40`,
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: SH.paddy }}
              >
                <Mic size={18} color="white" />
              </div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "white" }}>
                  Voice Expense Entry
                </div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>
                  Say "Fertilizer 4500 rupees" to auto-fill — works in Tamil too
                </div>
              </div>
              <div
                className="ml-auto px-3 py-1 rounded-lg text-white"
                style={{ backgroundColor: "rgba(255,255,255,0.1)", fontSize: "12px" }}
              >
                Tap to speak
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {expenseFields.map((f) => (
                <div key={f.key}>
                  <label
                    className="block mb-1.5 flex items-center gap-1.5"
                    style={{ fontSize: "13px", fontWeight: 600, color: SH.text }}
                  >
                    <span>{f.icon}</span>
                    {f.label} (₹)
                  </label>
                  <input
                    type="number"
                    value={expenses[f.key]}
                    onChange={(e) => updateExpense(f.key, e.target.value)}
                    placeholder="Enter amount in ₹"
                    className="w-full px-3.5 py-2.5 rounded-lg outline-none"
                    style={{
                      border: `1.5px solid ${SH.border}`,
                      backgroundColor: SH.surface,
                      color: SH.text,
                      fontSize: "14px",
                      fontFamily: "'Work Sans', sans-serif",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = SH.green)}
                    onBlur={(e) => (e.target.style.borderColor = SH.border)}
                  />
                </div>
              ))}
            </div>

            {/* Running total */}
            <div
              className="mt-5 p-4 rounded-xl flex items-center justify-between"
              style={{ backgroundColor: SH.bg, border: `1px solid ${SH.border}` }}
            >
              <div className="flex items-center gap-2">
                <Info size={15} color={SH.muted} />
                <span style={{ fontSize: "13px", color: SH.muted }}>Total entered expenses</span>
              </div>
              <span
                style={{ fontSize: "18px", fontWeight: 700, color: SH.text }}
              >
                ₹{totalExpense.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl transition-all"
                style={{
                  border: `1.5px solid ${SH.border}`,
                  color: SH.muted,
                  fontSize: "14px",
                  fontFamily: "'Work Sans', sans-serif",
                }}
              >
                <ChevronLeft size={16} />
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white transition-all hover:opacity-90"
                style={{
                  backgroundColor: SH.green,
                  fontSize: "14px",
                  fontWeight: 600,
                  fontFamily: "'Work Sans', sans-serif",
                }}
              >
                Review & Predict
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div
            className="rounded-2xl p-6 md:p-8"
            style={{ backgroundColor: SH.surface, border: `1px solid ${SH.border}` }}
          >
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle size={18} color={SH.green} />
              <h2
                style={{
                  fontFamily: "'Lora', serif",
                  fontSize: "17px",
                  fontWeight: 600,
                  color: SH.text,
                }}
              >
                Review & Predict
              </h2>
            </div>

            {/* Summary badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { icon: "🌾", label: step1.crop || "Paddy" },
                { icon: "📍", label: step1.district || "Thanjavur" },
                { icon: "🗓️", label: step1.season || "Kharif" },
                { icon: "📐", label: `${step1.area || "—"} ${step1.areaUnit}` },
              ].map((b) => (
                <div
                  key={b.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                  style={{
                    backgroundColor: `${SH.paddy}18`,
                    border: `1px solid ${SH.paddy}30`,
                  }}
                >
                  <span style={{ fontSize: "14px" }}>{b.icon}</span>
                  <span style={{ fontSize: "13px", color: SH.green, fontWeight: 500 }}>
                    {b.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Review table */}
            <div
              className="rounded-xl overflow-hidden mb-5"
              style={{ border: `1px solid ${SH.border}` }}
            >
              <div
                className="px-4 py-3"
                style={{ backgroundColor: SH.bg, borderBottom: `1px solid ${SH.border}` }}
              >
                <span style={{ fontSize: "13px", fontWeight: 600, color: SH.text }}>
                  Crop Details
                </span>
              </div>
              {[
                ["Farmer ID", step1.farmerId],
                ["District", step1.district],
                ["Crop", step1.crop],
                ["Season", step1.season],
                ["Area", `${step1.area || "—"} ${step1.areaUnit}`],
                ["Selling Price", step1.sellingPrice ? `₹${parseInt(step1.sellingPrice).toLocaleString("en-IN")}/ton` : "—"],
                ["Sowing Date", step1.sowingDate || "—"],
                ["Harvest Date", step1.harvestDate || "—"],
                ["Explanation Language", step1.explainLang],
              ].map(([key, val]) => (
                <div
                  key={key}
                  className="flex justify-between px-4 py-2.5"
                  style={{ borderBottom: `1px solid ${SH.border}` }}
                >
                  <span style={{ fontSize: "13px", color: SH.muted }}>{key}</span>
                  <span style={{ fontSize: "13px", color: SH.text, fontWeight: 500 }}>{val}</span>
                </div>
              ))}
            </div>

            <div
              className="rounded-xl overflow-hidden mb-6"
              style={{ border: `1px solid ${SH.border}` }}
            >
              <div
                className="px-4 py-3 flex justify-between items-center"
                style={{ backgroundColor: SH.bg, borderBottom: `1px solid ${SH.border}` }}
              >
                <span style={{ fontSize: "13px", fontWeight: 600, color: SH.text }}>
                  Expenses Entered
                </span>
                <span style={{ fontSize: "13px", fontWeight: 700, color: SH.green }}>
                  Total: ₹{totalExpense.toLocaleString("en-IN")}
                </span>
              </div>
              {expenseFields.filter((f) => expenses[f.key]).map((f) => (
                <div
                  key={f.key}
                  className="flex justify-between px-4 py-2.5"
                  style={{ borderBottom: `1px solid ${SH.border}` }}
                >
                  <span style={{ fontSize: "13px", color: SH.muted }}>
                    {f.icon} {f.label}
                  </span>
                  <span style={{ fontSize: "13px", color: SH.text, fontWeight: 500 }}>
                    ₹{parseInt(expenses[f.key]).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
              {expenseFields.every((f) => !expenses[f.key]) && (
                <div className="px-4 py-3 text-center" style={{ fontSize: "13px", color: SH.muted }}>
                  No expenses entered — ML will estimate all costs.
                </div>
              )}
            </div>

            <div
              className="p-4 rounded-xl mb-6 flex gap-3"
              style={{ backgroundColor: `${SH.turmeric}12`, border: `1px solid ${SH.turmeric}30` }}
            >
              <Info size={15} color={SH.soil} className="flex-shrink-0 mt-0.5" />
              <p style={{ fontSize: "13px", color: SH.soil, lineHeight: 1.6 }}>
                Our ML model will predict your <strong>yield (tons)</strong>, <strong>total cost (₹)</strong>,{" "}
                <strong>revenue (₹)</strong>, and <strong>profit/loss (₹)</strong> with a confidence score.
                Predictions are advisory only.
              </p>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl transition-all"
                style={{
                  border: `1.5px solid ${SH.border}`,
                  color: SH.muted,
                  fontSize: "14px",
                  fontFamily: "'Work Sans', sans-serif",
                }}
              >
                <ChevronLeft size={16} />
                Back
              </button>
              {submitError && (
                <div className="mx-3 flex-1 self-center" style={{ fontSize: "12px", color: SH.terracotta }}>
                  {submitError}
                </div>
              )}
              <button
                onClick={runPrediction}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl text-white transition-all hover:opacity-90"
                style={{
                  backgroundColor: isSubmitting ? `${SH.green}AA` : SH.green,
                  fontSize: "15px",
                  fontWeight: 600,
                  fontFamily: "'Work Sans', sans-serif",
                  boxShadow: "0 4px 16px rgba(47,107,59,0.3)",
                }}
              >
                <Sprout size={18} />
                {isSubmitting ? "Running..." : "Run Prediction"}
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
