"use client";

import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "pt-PT", name: "Português (Portugal)" },
  { code: "pt-BR", name: "Português (Brasil)" },
  { code: "es-ES", name: "Español (España)" },
  { code: "es-MX", name: "Español (México)" },
  { code: "es-AR", name: "Español (Argentina)" },
  { code: "es-CO", name: "Español (Colombia)" },
  { code: "es-CL", name: "Español (Chile)" },
  { code: "es-PE", name: "Español (Perú)" },
  { code: "es-VE", name: "Español (Venezuela)" },
  { code: "es-EC", name: "Español (Ecuador)" },
  { code: "es-GT", name: "Español (Guatemala)" },
  { code: "es-CU", name: "Español (Cuba)" },
  { code: "es-BO", name: "Español (Bolivia)" },
  { code: "es-DO", name: "Español (Rep. Dominicana)" },
  { code: "es-HN", name: "Español (Honduras)" },
  { code: "es-PY", name: "Español (Paraguay)" },
  { code: "es-SV", name: "Español (El Salvador)" },
  { code: "es-NI", name: "Español (Nicaragua)" },
  { code: "es-CR", name: "Español (Costa Rica)" },
  { code: "es-PR", name: "Español (Puerto Rico)" },
  { code: "es-PA", name: "Español (Panamá)" },
  { code: "es-UY", name: "Español (Uruguay)" },
  { code: "es-GQ", name: "Español (Guinea Ec.)" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "it", name: "Italiano" },
  { code: "nl", name: "Nederlands" },
  { code: "pl", name: "Polski" },
  { code: "sv", name: "Svenska" },
  { code: "da", name: "Dansk" },
  { code: "fi", name: "Suomi" },
  { code: "el", name: "Ελληνικά" },
  { code: "cs", name: "Čeština" },
  { code: "sk", name: "Slovenčina" },
  { code: "sl", name: "Slovenščina" },
  { code: "hr", name: "Hrvatski" },
  { code: "bg", name: "Български" },
  { code: "ro", name: "Română" },
  { code: "hu", name: "Magyar" },
  { code: "et", name: "Eesti" },
  { code: "lv", name: "Latviešu" },
  { code: "lt", name: "Lietuvių" },
  { code: "mt", name: "Malti" },
  { code: "ga", name: "Gaeilge" },
  { code: "ru", name: "Русский" },
  { code: "nb", name: "Norsk" },
  { code: "is", name: "Íslenska" },
  { code: "uk", name: "Українська" },
  { code: "sr", name: "Српски" },
  { code: "bs", name: "Bosanski" },
  { code: "sq", name: "Shqip" },
  { code: "mk", name: "Македонски" },
  { code: "be", name: "Беларуская" },
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
