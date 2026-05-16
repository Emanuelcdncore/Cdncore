"use client";

import { useSyncExternalStore, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const STORAGE_KEY = "loritalk-cookie-ack";
const STORAGE_VERSION = "1";

const subscribe = (cb: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
};

const readStored = () => {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

export default function CookieBanner() {
  const { t } = useTranslation();
  const stored = useSyncExternalStore(subscribe, readStored, () => null);
  const [dismissed, setDismissed] = useState(false);
  const visible = stored !== STORAGE_VERSION && !dismissed;

  const acknowledge = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, STORAGE_VERSION);
    } catch {}
    setDismissed(true);
  };

  if (!visible) return null;

  return (
    <div role="dialog" aria-live="polite" aria-label={t("cookieBanner.aria")} className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="mx-auto max-w-3xl rounded-2xl border border-black/10 bg-white shadow-2xl shadow-black/20 p-5 sm:p-6 flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <span className="material-icons-round text-base text-black/60 mt-0.5">cookie</span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-black mb-1">{t("cookieBanner.title")}</p>
            <p className="text-xs text-black/60 leading-relaxed">
              {t("cookieBanner.body")}{" "}
              <Link href="/cookie-policy" className="underline hover:text-black">{t("cookieBanner.policyLink")}</Link>{" · "}
              <Link href="/privacy-policy" className="underline hover:text-black">{t("cookieBanner.privacyLink")}</Link>
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
          <Link
            href="/cookie-policy"
            className="px-4 py-2 rounded-full text-xs font-semibold text-black/70 border border-black/15 hover:bg-black/[0.03] text-center"
          >
            {t("cookieBanner.learnMore")}
          </Link>
          <button
            type="button"
            onClick={acknowledge}
            className="px-4 py-2 rounded-full text-xs font-semibold text-white bg-black hover:opacity-90"
          >
            {t("cookieBanner.acknowledge")}
          </button>
        </div>
      </div>
    </div>
  );
}
