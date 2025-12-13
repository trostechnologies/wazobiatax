import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import pg from "./pg.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    pg: { translation: pg },
  },
  lng: navigator.language?.startsWith("pt") ? "pg" : (navigator.language?.startsWith("en") ? "en" : "en"),
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;