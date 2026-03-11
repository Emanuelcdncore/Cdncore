import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ptTranslations from "@/locales/pt.json";
import enTranslations from "@/locales/en.json";

const mapDetectedLanguage = (lng: string): string => {
  if (!lng) return "pt";
  if (lng === "pt" || lng === "en") return lng;
  const langCode = lng.split("-")[0].toLowerCase();
  if (langCode === "pt" || langCode === "en") return langCode;
  return "pt";
};

if (typeof window !== "undefined") {
  const stored = localStorage.getItem("i18nextLng");
  if (!stored) {
    localStorage.setItem("i18nextLng", "pt");
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      pt: { translation: ptTranslations },
      en: { translation: enTranslations },
    },
    fallbackLng: "pt",
    lng: "pt",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
    },
  });

export default i18n;
