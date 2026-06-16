'use client';

import { useEffect } from 'react';
import i18n, { STORAGE_KEY, SUPPORTED_LANGUAGES } from '@/lib/i18n';

const validCodes = new Set<string>(SUPPORTED_LANGUAGES.map((l) => l.code));

function detectLanguage(): string {
  // 1. User's explicit manual selection — always wins
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && validCodes.has(stored)) return stored;
  } catch { /* localStorage unavailable */ }

  // 2. Browser/OS preference list (navigator.languages gives the full ordered list,
  //    e.g. ['fr-FR', 'fr', 'en-US', 'en'] — check each until one matches)
  const langs: readonly string[] =
    navigator.languages?.length ? navigator.languages : [navigator.language ?? 'en'];

  for (const tag of langs) {
    const code = tag.split('-')[0].toLowerCase();
    if (validCodes.has(code)) return code;
  }

  return 'en';
}

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lang = detectLanguage();
    if (lang !== i18n.language) i18n.changeLanguage(lang);
  }, []);

  return <>{children}</>;
}
