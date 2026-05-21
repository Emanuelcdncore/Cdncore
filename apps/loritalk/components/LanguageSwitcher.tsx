"use client";

import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "pt", name: "Português" },
];

export default function LanguageSwitcher({ className }: { className?: string }) {
  const { i18n } = useTranslation();

  return (
    <select
      value={i18n.language}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      className={`text-xs bg-transparent border border-black/15 rounded-full px-2.5 py-1.5 text-black/60 focus:outline-none focus:border-black/30 ${className ?? ""}`}
    >
      {LANGUAGES.map((l) => (
        <option key={l.code} value={l.code}>{l.name}</option>
      ))}
    </select>
  );
}
