import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ta from "./locales/ta.json";

function safeGetLanguagePreference(): "en" | "ta" {
  if (typeof window === "undefined") return "en";
  try {
    const savedLanguage = window.localStorage.getItem("lang");
    return savedLanguage === "ta" || savedLanguage === "en" ? savedLanguage : "en";
  } catch {
    return "en";
  }
}

function safeSetLanguagePreference(lng: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem("lang", lng);
  } catch {
    // Ignore storage failures (private mode/restricted browser policies).
  }
}

void i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, ta: { translation: ta } },
  lng: safeGetLanguagePreference(),
  fallbackLng: "en",
  supportedLngs: ["en", "ta"],
  interpolation: { escapeValue: false },
  returnNull: false,
});

i18n.on("languageChanged", (lng) => {
  safeSetLanguagePreference(lng);
});

export default i18n;
