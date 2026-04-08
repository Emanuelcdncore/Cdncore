"use client";

import { useEffect, useState } from "react";
import "@/lib/i18n";
import i18n from "@/lib/i18n";

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const updateLang = (lng: string) => {
      document.documentElement.lang = lng;
    };
    updateLang(i18n.language);
    i18n.on("languageChanged", updateLang);
    setReady(true);
    return () => {
      i18n.off("languageChanged", updateLang);
    };
  }, []);

  if (!ready) return null;
  return <>{children}</>;
}
