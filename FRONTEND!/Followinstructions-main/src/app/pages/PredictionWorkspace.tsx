import { useEffect, useRef, useState } from "react";
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
import { useTranslation } from "react-i18next";

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
const FORM_STORAGE_KEY = "formData";
const SELLING_PRICE_UNIT_PER_KG = "per_kg";
const SELLING_PRICE_UNIT_PER_TON = "per_ton";

const expenseFields = [
  { key: "seed", icon: "🌱" },
  { key: "fertilizer", icon: "🧪" },
  { key: "pesticide", icon: "💊" },
  { key: "labor", icon: "👷" },
  { key: "machine", icon: "🚜" },
  { key: "water", icon: "💧" },
  { key: "fuel", icon: "⚡" },
  { key: "transport", icon: "🚚" },
  { key: "storage", icon: "🏪" },
  { key: "misc", icon: "📦" },
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
  sellingPriceUnit: string;
  explainLang: string;
};

type Expenses = Record<string, string>;

type VoiceExpenseField =
  | "seed"
  | "fertilizer"
  | "pesticide"
  | "labour"
  | "machine"
  | "water"
  | "fuel"
  | "transport"
  | "storage"
  | "other";

type ParsedVoiceExpenses = Partial<Record<VoiceExpenseField, number>>;

const WORD_NUMBERS: Record<string, number> = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
  twenty: 20,
  thirty: 30,
  forty: 40,
  fifty: 50,
  sixty: 60,
  seventy: 70,
  eighty: 80,
  ninety: 90,
};

const FIELD_ALIASES: Record<string, VoiceExpenseField> = {
  seed: "seed",
  seeds: "seed",
  planting: "seed",
  fertilizer: "fertilizer",
  fertiliser: "fertilizer",
  manure: "fertilizer",
  urea: "fertilizer",
  pesticide: "pesticide",
  pesticides: "pesticide",
  weedicide: "pesticide",
  spray: "pesticide",
  labour: "labour",
  labor: "labour",
  worker: "labour",
  workers: "labour",
  coolie: "labour",
  machine: "machine",
  machines: "machine",
  equipment: "machine",
  tractor: "machine",
  water: "water",
  irrigation: "water",
  fuel: "fuel",
  diesel: "fuel",
  electricity: "fuel",
  current: "fuel",
  transport: "transport",
  lorry: "transport",
  truck: "transport",
  storage: "storage",
  warehouse: "storage",
  godown: "storage",
  facility: "other",
  facilities: "other",
  other: "other",
  others: "other",
  miscellaneous: "other",
  misc: "other",
};

const CONNECTOR_WORDS = new Set([
  "cost",
  "costs",
  "expense",
  "expenses",
  "charge",
  "charges",
  "amount",
  "amt",
  "is",
  "was",
  "for",
  "of",
  "to",
  "on",
  "and",
  "i",
  "spent",
  "spend",
  "rupee",
  "rupees",
  "rs",
  "inr",
]);

const NUMBER_WORD_TOKENS = new Set([
  ...Object.keys(WORD_NUMBERS),
  "hundred",
  "thousand",
  "and",
]);

function escapeRegexToken(token: string): string {
  return token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeVoiceText(input: string): string {
  return input
    .toLowerCase()
    .replace(/,/g, "")
    .replace(/[^\p{L}\p{N}\s.]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseWordNumber(tokens: string[], startIndex: number): { value: number; consumed: number } | null {
  let i = startIndex;
  let total = 0;
  let current = 0;
  let consumed = 0;

  while (i < tokens.length) {
    const token = tokens[i];

    if (token === "and") {
      i += 1;
      consumed += 1;
      continue;
    }
    if (token in WORD_NUMBERS) {
      current += WORD_NUMBERS[token];
      i += 1;
      consumed += 1;
      continue;
    }
    if (token === "hundred") {
      current = (current || 1) * 100;
      i += 1;
      consumed += 1;
      continue;
    }
    if (token === "thousand") {
      total += (current || 1) * 1000;
      current = 0;
      i += 1;
      consumed += 1;
      continue;
    }
    break;
  }

  const value = total + current;
  if (consumed === 0 || value < 0) {
    return null;
  }
  return { value, consumed };
}

function parseAmountAt(tokens: string[], index: number): { value: number; consumed: number } | null {
  const numeric = tokens[index]?.match(/^\d+(?:\.\d+)?$/);
  if (numeric) {
    return { value: parseFloat(numeric[0]), consumed: 1 };
  }
  return parseWordNumber(tokens, index);
}

function findFieldKey(tokens: string[], start: number, lookAhead = 3): VoiceExpenseField | null {
  for (let i = start; i < tokens.length && i < start + lookAhead; i += 1) {
    const field = FIELD_ALIASES[tokens[i]];
    if (field) return field;
  }
  return null;
}

function parseAmountPhrase(phrase: string): number | null {
  const cleaned = normalizeVoiceText(phrase).replace(/\b(?:rupee|rupees|rs|inr)\b/g, " ").trim();
  if (!cleaned) return null;

  if (/^\d+(?:\.\d+)?$/.test(cleaned)) {
    const numeric = parseFloat(cleaned);
    return Number.isFinite(numeric) ? numeric : null;
  }

  const tokens = cleaned.split(" ").filter(Boolean);
  if (tokens.length === 0 || tokens.some((token) => !NUMBER_WORD_TOKENS.has(token))) {
    return null;
  }

  const parsed = parseWordNumber(tokens, 0);
  if (!parsed || parsed.consumed !== tokens.length) {
    return null;
  }
  return parsed.value;
}

export function parseVoiceExpense(transcript: string): ParsedVoiceExpenses {
  const text = normalizeVoiceText(transcript);
  if (!text) return {};

  const parsed: ParsedVoiceExpenses = {};
  const fieldPattern = Object.keys(FIELD_ALIASES)
    .sort((a, b) => b.length - a.length)
    .map(escapeRegexToken)
    .join("|");
  const numberWordPattern = Array.from(NUMBER_WORD_TOKENS)
    .sort((a, b) => b.length - a.length)
    .map(escapeRegexToken)
    .join("|");
  const amountPattern = `(?:\\d+(?:\\.\\d+)?|(?:${numberWordPattern})(?:\\s+(?:${numberWordPattern}))*)`;
  const connectorPattern = `(?:\\s+(?:${Array.from(CONNECTOR_WORDS)
    .sort((a, b) => b.length - a.length)
    .map(escapeRegexToken)
    .join("|")}))*`;

  const fieldFirstRegex = new RegExp(
    `\\b(${fieldPattern})\\b${connectorPattern}\\s*(${amountPattern})\\b`,
    "g"
  );
  const amountFirstRegex = new RegExp(
    `\\b(${amountPattern})\\b${connectorPattern}\\s*\\b(${fieldPattern})\\b`,
    "g"
  );

  for (const match of text.matchAll(fieldFirstRegex)) {
    const alias = match[1]?.toLowerCase();
    const amountText = match[2];
    const fieldKey = alias ? FIELD_ALIASES[alias] : null;
    const amount = amountText ? parseAmountPhrase(amountText) : null;
    if (fieldKey && amount !== null && amount >= 0) {
      parsed[fieldKey] = amount;
    }
  }

  for (const match of text.matchAll(amountFirstRegex)) {
    const amountText = match[1];
    const alias = match[2]?.toLowerCase();
    const fieldKey = alias ? FIELD_ALIASES[alias] : null;
    const amount = amountText ? parseAmountPhrase(amountText) : null;
    if (fieldKey && amount !== null && amount >= 0) {
      parsed[fieldKey] = amount;
    }
  }

  // Token scan fallback catches edge cases not covered by regex variations.
  const tokens = text.split(" ").filter(Boolean);

  let i = 0;
  while (i < tokens.length) {
    const fieldFromCurrentToken = FIELD_ALIASES[tokens[i]];
    if (fieldFromCurrentToken) {
      let amountStart = i + 1;
      while (amountStart < tokens.length && CONNECTOR_WORDS.has(tokens[amountStart])) {
        amountStart += 1;
      }
      const amount = parseAmountAt(tokens, amountStart);
      if (amount && amount.value >= 0) {
        parsed[fieldFromCurrentToken] = amount.value;
        i = amountStart + amount.consumed;
        continue;
      }
    }

    const amountFromCurrentToken = parseAmountAt(tokens, i);
    if (amountFromCurrentToken && amountFromCurrentToken.value >= 0) {
      let fieldStart = i + amountFromCurrentToken.consumed;
      while (fieldStart < tokens.length && CONNECTOR_WORDS.has(tokens[fieldStart])) {
        fieldStart += 1;
      }
      const fieldAfterAmount = findFieldKey(tokens, fieldStart);
      if (fieldAfterAmount) {
        parsed[fieldAfterAmount] = amountFromCurrentToken.value;
        i = fieldStart + 1;
        continue;
      }
    }

    i += 1;
  }

  return parsed;
}

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
  sellingPriceUnit: SELLING_PRICE_UNIT_PER_TON,
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
  placeholder = "Select...",
  t,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
  t: any;
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
        <option value="">{placeholder}</option>
        {options.map((o) => {
          let label = o;
          if (["Paddy","Sugarcane","Cotton","Groundnut","Turmeric","Banana","Maize","Ragi","Blackgram","Greengram","Sunflower","Tapioca"].includes(o)) {
            label = t ? t(`dynamic.crops.${o.toLowerCase()}`) : o;
          } else if (["Kharif (Kuruvai)","Rabi (Samba)","Zaid (Navarai)","Annual"].includes(o)) {
            label = t ? t(`dynamic.seasons.${o.toLowerCase().replace(" ", "")}`) : o;
          } else if (["English", "Tamil"].includes(o)) {
             label = o === "Tamil" ? "தமிழ்" : "English";
          }
          return (
            <option key={o} value={o}>
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export function PredictionWorkspace() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const expenseFieldViews = expenseFields.map((f) => ({
    ...f,
    label: t(`predict.expense.${f.key}`),
  }));

  const [step, setStep] = useState(1);
  const [step1, setStep1] = useState<Step1Data>({
    ...defaultStep1,
    explainLang: i18n.language === "ta" ? "Tamil" : "English",
  });
  const [expenses, setExpenses] = useState<Expenses>(defaultExpenses);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState("");
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    try {
      const savedRaw = localStorage.getItem(FORM_STORAGE_KEY);
      if (!savedRaw) return;

      const parsed = JSON.parse(savedRaw) as {
        step?: number;
        step1?: Partial<Step1Data>;
        expenses?: Partial<Expenses>;
      };

      if (typeof parsed.step === "number" && parsed.step >= 1 && parsed.step <= 3) {
        setStep(parsed.step);
      }
      if (parsed.step1) {
        setStep1((prev) => ({
          ...prev,
          ...parsed.step1,
          sellingPriceUnit:
            parsed.step1?.sellingPriceUnit === SELLING_PRICE_UNIT_PER_KG
              ? SELLING_PRICE_UNIT_PER_KG
              : SELLING_PRICE_UNIT_PER_TON,
        }));
      }
      if (parsed.expenses) {
        setExpenses((prev) => ({ ...prev, ...parsed.expenses }));
      }
    } catch {
      // Ignore malformed saved state and continue with defaults.
    }
  }, []);

  useEffect(() => {
    setStep1((prev) => ({
      ...prev,
      explainLang: i18n.language === "ta" ? "Tamil" : "English",
    }));
  }, [i18n.language]);

  useEffect(() => {
    try {
      localStorage.setItem(
        FORM_STORAGE_KEY,
        JSON.stringify({
          step,
          step1,
          expenses,
        })
      );
    } catch {
      // Ignore storage write errors in restricted browser contexts.
    }
  }, [step, step1, expenses]);

  useEffect(() => {
    return () => stopVoiceRecognition();
  }, []);

  const totalExpense = Object.values(expenses).reduce(
    (sum, v) => sum + (parseFloat(v) || 0),
    0
  );

  const updateStep1 = (key: keyof Step1Data, val: string) =>
    setStep1((p) => ({ ...p, [key]: val }));
  const updateExpense = (key: string, val: string) =>
    setExpenses((p) => ({ ...p, [key]: val }));

  const normalizeSeason = (season: string) => season.split("(")[0].trim();
  const toBackendLanguage = (lang: string): "english" | "tamil" =>
    lang === "English" ? "english" : "tamil";
  const parseAmount = (value: string) => {
    const parsed = parseFloat(value);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  };
  const toPricePerTon = (price: number, unit: string) =>
    unit === SELLING_PRICE_UNIT_PER_KG ? price * 1000 : price;
  const toBackendPriceUnit = (unit: string): "kg" | "ton" =>
    unit === SELLING_PRICE_UNIT_PER_KG ? "kg" : "ton";
  const sellingPriceUnitLabel = (unit: string) =>
    unit === SELLING_PRICE_UNIT_PER_KG ? t("predict.priceUnitPerKg") : t("predict.priceUnitPerTon");

  const stopVoiceRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const startVoiceRecognition = () => {
    const SpeechRecognitionCtor =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) {
      setVoiceStatus(t("predict.voiceUnsupported"));
      return;
    }

    const recognition = new SpeechRecognitionCtor();
    recognitionRef.current = recognition;
    recognition.lang = i18n.language === "ta" ? "ta-IN" : "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setVoiceStatus(t("predict.listening"));
    };

    recognition.onresult = (event: any) => {
      const transcript = event?.results?.[0]?.[0]?.transcript ?? "";
      const parsedData = parseVoiceExpense(transcript);
      console.log("transcript:", transcript);
      console.log("parsed:", parsedData);

      const voiceToExpenseMap: Record<VoiceExpenseField, keyof Expenses> = {
        seed: "seed",
        fertilizer: "fertilizer",
        pesticide: "pesticide",
        labour: "labor",
        machine: "machine",
        water: "water",
        fuel: "fuel",
        transport: "transport",
        storage: "storage",
        other: "misc",
      };

      const keysWithValues = Object.keys(parsedData) as VoiceExpenseField[];
      if (keysWithValues.length === 0) {
        setVoiceStatus(t("predict.voiceNoMatch"));
        return;
      }

      const filledLabels: string[] = [];
      setExpenses((prev) => {
        const next = { ...prev };
        for (const key of keysWithValues) {
          const expenseKey = voiceToExpenseMap[key];
          const amount = parsedData[key];
          if (typeof amount !== "number" || !Number.isFinite(amount)) continue;

          // Update only the fields detected in voice; leave all others unchanged.
          next[expenseKey] = amount.toString();
          filledLabels.push(`${t(`predict.expense.${expenseKey}`)} Rs.${amount.toLocaleString("en-IN")}`);
        }
        return next;
      });

      setVoiceStatus(`${t("predict.voiceFilled")}: ${filledLabels.join(" | ")}`);
    };
    recognition.onerror = () => {
      setVoiceStatus(t("predict.voiceNoMatch"));
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognition.start();
  };

  const runPrediction = async () => {
    const areaValue = parseFloat(step1.area);
    if (!step1.crop || !step1.district || !step1.season || !Number.isFinite(areaValue) || areaValue <= 0) {
      setSubmitError(t("predict.validationError"));
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    try {
      const areaHectare = step1.areaUnit === "acre" ? areaValue * 0.404686 : areaValue;
      const sellingPrice = parseAmount(step1.sellingPrice);
      const priceUnit = toBackendPriceUnit(step1.sellingPriceUnit);
      const sellingPricePerTon = toPricePerTon(sellingPrice, step1.sellingPriceUnit);
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
        selling_price: Number(sellingPrice.toFixed(2)),
        price_unit: priceUnit,
        selling_price_per_ton: Number(sellingPricePerTon.toFixed(2)),
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

  const wizardSteps = [
    { num: 1, label: t("predict.step1"), icon: Sprout },
    { num: 2, label: t("predict.step2"), icon: DollarSign },
    { num: 3, label: t("predict.step3"), icon: CheckCircle },
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
            {t("predict.headerTitle")}
          </h1>
          <p style={{ color: SH.muted, fontSize: "14px" }}>
            {t("predict.headerDesc")}
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-0 mb-8">
          {wizardSteps.map((s, i) => (
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
              {i < wizardSteps.length - 1 && (
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
                {t("predict.cropFarmDetails")}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <InputField
                label={t("predict.farmerId")}
                value={step1.farmerId}
                onChange={(v) => updateStep1("farmerId", v)}
                placeholder="e.g. FMR-2025-0091"
                hint={t("predict.farmerHint")}
              />
              <SelectField
                label={t("predict.district")}
                value={step1.district}
                onChange={(v) => updateStep1("district", v)}
                options={districts}
                placeholder={t("common.select")}
                t={t}
              />
              <SelectField
                label={t("predict.cropType")}
                value={step1.crop}
                onChange={(v) => updateStep1("crop", v)}
                options={crops}
                placeholder={t("common.select")}
                t={t}
              />
              <SelectField
                label={t("predict.season")}
                value={step1.season}
                onChange={(v) => updateStep1("season", v)}
                options={seasons}
                placeholder={t("common.select")}
                t={t}
              />
              <div>
                <label
                  className="block mb-1.5"
                  style={{ fontSize: "13px", fontWeight: 600, color: SH.text }}
                >
                  {t("predict.area")}
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
              <div>
                <label
                  className="block mb-1.5"
                  style={{ fontSize: "13px", fontWeight: 600, color: SH.text }}
                >
                  {t("predict.sellingPrice")}
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={step1.sellingPrice}
                    onChange={(e) => updateStep1("sellingPrice", e.target.value)}
                    placeholder="e.g. 22000"
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
                    value={step1.sellingPriceUnit}
                    onChange={(e) => updateStep1("sellingPriceUnit", e.target.value)}
                    className="px-3 py-2.5 rounded-lg outline-none"
                    style={{
                      border: `1.5px solid ${SH.border}`,
                      backgroundColor: SH.surface,
                      color: SH.text,
                      fontSize: "14px",
                      fontFamily: "'Work Sans', sans-serif",
                    }}
                  >
                    <option value={SELLING_PRICE_UNIT_PER_KG}>{t("predict.priceUnitPerKg")}</option>
                    <option value={SELLING_PRICE_UNIT_PER_TON}>{t("predict.priceUnitPerTon")}</option>
                  </select>
                </div>
                <p style={{ fontSize: "12px", color: SH.muted, marginTop: "4px" }}>
                  {t("predict.sellingHint")}
                </p>
              </div>
              <InputField
                label={t("predict.sowingDate")}
                type="date"
                value={step1.sowingDate}
                onChange={(v) => updateStep1("sowingDate", v)}
              />
              <InputField
                label={t("predict.harvestDate")}
                type="date"
                value={step1.harvestDate}
                onChange={(v) => updateStep1("harvestDate", v)}
              />
            </div>

            {/* Voice input hint */}
            <div
              className="mt-5 p-3.5 rounded-xl flex items-center gap-3"
              style={{ backgroundColor: `${SH.paddy}12`, border: `1px solid ${SH.paddy}30` }}
            >
              <Mic size={16} color={SH.green} />
              <p style={{ fontSize: "13px", color: SH.green }}>
                <strong>{t("predict.tip")}</strong> {t("predict.tipText")}
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
                {t("predict.nextExpenses")}
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
                  {t("predict.expenseEntry")}
                </h2>
              </div>
              <div
                className="px-3 py-1.5 rounded-lg"
                style={{ backgroundColor: `${SH.paddy}18` }}
              >
                <span style={{ fontSize: "12px", color: SH.green, fontWeight: 600 }}>
                  {t("predict.leaveBlank")}
                </span>
              </div>
            </div>

            {/* Voice widget */}
            <button
              type="button"
              onClick={() => {
                if (isListening) {
                  stopVoiceRecognition();
                } else {
                  startVoiceRecognition();
                }
              }}
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
                  {t("predict.voiceEntry")}
                </div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>
                  {t("predict.voiceHint")}
                </div>
              </div>
              <div
                className="ml-auto px-3 py-1 rounded-lg text-white"
                style={{ backgroundColor: "rgba(255,255,255,0.1)", fontSize: "12px" }}
              >
                {isListening ? t("predict.stopListening") : t("predict.tapToSpeak")}
              </div>
            </button>
            {voiceStatus && (
              <p className="mb-4" style={{ fontSize: "12px", color: SH.muted }}>
                {voiceStatus}
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {expenseFieldViews.map((f) => (
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
                    placeholder={t("predict.enterAmount")}
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
                <span style={{ fontSize: "13px", color: SH.muted }}>{t("predict.totalEntered")}</span>
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
                {t("common.back")}
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
                {t("predict.reviewPredict")}
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
                {t("predict.reviewPredict")}
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
                  {t("predict.cropFarmDetails")}
                </span>
              </div>
              {[
                [t("predict.farmerId"), step1.farmerId],
                [t("predict.district"), step1.district],
                [t("predict.cropType"), step1.crop],
                [t("predict.season"), step1.season],
                [t("predict.area"), `${step1.area || "—"} ${step1.areaUnit}`],
                [
                  t("predict.sellingPrice"),
                  step1.sellingPrice
                    ? `₹${parseFloat(step1.sellingPrice).toLocaleString("en-IN")}/${sellingPriceUnitLabel(step1.sellingPriceUnit)}`
                    : "—",
                ],
                [t("predict.sowingDate"), step1.sowingDate || "—"],
                [t("predict.harvestDate"), step1.harvestDate || "—"],
                [t("predict.aiLanguage"), step1.explainLang],
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
                  {t("predict.expenseEntry")}
                </span>
                <span style={{ fontSize: "13px", fontWeight: 700, color: SH.green }}>
                  {t("common.total")}: ₹{totalExpense.toLocaleString("en-IN")}
                </span>
              </div>
              {expenseFieldViews.filter((f) => expenses[f.key]).map((f) => (
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
              {expenseFieldViews.every((f) => !expenses[f.key]) && (
                <div className="px-4 py-3 text-center" style={{ fontSize: "13px", color: SH.muted }}>
                  {t("predict.noExpenses")}
                </div>
              )}
            </div>

            <div
              className="p-4 rounded-xl mb-6 flex gap-3"
              style={{ backgroundColor: `${SH.turmeric}12`, border: `1px solid ${SH.turmeric}30` }}
            >
              <Info size={15} color={SH.soil} className="flex-shrink-0 mt-0.5" />
              <p style={{ fontSize: "13px", color: SH.soil, lineHeight: 1.6 }}>
                {t("predict.mlDisclaimer")}
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
                {t("common.back")}
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
                {isSubmitting ? t("predict.running") : t("predict.runPrediction")}
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

