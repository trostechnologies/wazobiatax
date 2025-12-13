import { useTranslation } from "react-i18next";

export default function Header() {
  const { t, i18n } = useTranslation();
  const toggle = () => i18n.changeLanguage(i18n.language === "en" ? "pg" : "en");
  return (
    <header className="flex items-center justify-between p-4 bg-[#3A8857] text-white shadow-lg">
      <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
      <button
        onClick={toggle}
        aria-label={t("change_language_label")}
        className="px-4 py-2 rounded-full cursor-pointer bg-[#3A8857] hover:bg-opacity-80 transition-colors duration-200 text-sm font-medium border border-white border-opacity-30"
      >
        {i18n.language === "en" ? "EN" : "PG"}
      </button>
    </header>
  );
}
