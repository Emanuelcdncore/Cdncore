"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useConsent, writeConsent } from "@/lib/consent";

export default function CookieBanner() {
  const { t } = useTranslation();
  const { recorded, state } = useConsent();
  const [dismissed, setDismissed] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [marketingDraft, setMarketingDraft] = useState(state.marketing);

  const visible = !recorded && !dismissed;

  const persist = (marketing: boolean) => {
    writeConsent(marketing);
    setDismissed(true);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t("cookieBanner.aria")}
      className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-black/10 bg-white shadow-2xl shadow-black/20 p-5 sm:p-6 flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <span className="material-icons-round text-base text-black/60 mt-0.5">cookie</span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-black mb-1">{t("cookieBanner.title")}</p>
            <p className="text-xs text-black/60 leading-relaxed">
              {t("cookieBanner.body")}{" "}
              <Link href="/cookie-policy" className="underline hover:text-black">
                {t("cookieBanner.policyLink")}
              </Link>
              {" · "}
              <Link href="/privacy-policy" className="underline hover:text-black">
                {t("cookieBanner.privacyLink")}
              </Link>
            </p>
          </div>
        </div>

        {expanded && (
          <div className="flex flex-col gap-2 rounded-xl bg-black/[0.03] p-3">
            <label className="flex items-start gap-3 text-xs">
              <input
                type="checkbox"
                checked
                disabled
                aria-label={t("cookieBanner.necessaryLabel")}
                className="mt-0.5 h-3.5 w-3.5 accent-black"
              />
              <span className="flex-1">
                <span className="block font-semibold text-black">{t("cookieBanner.necessaryLabel")}</span>
                <span className="block text-black/55">{t("cookieBanner.necessaryDesc")}</span>
              </span>
            </label>
            <label className="flex items-start gap-3 text-xs cursor-pointer">
              <input
                type="checkbox"
                checked={marketingDraft}
                onChange={(e) => setMarketingDraft(e.target.checked)}
                aria-label={t("cookieBanner.marketingLabel")}
                className="mt-0.5 h-3.5 w-3.5 accent-black"
              />
              <span className="flex-1">
                <span className="block font-semibold text-black">{t("cookieBanner.marketingLabel")}</span>
                <span className="block text-black/55">{t("cookieBanner.marketingDesc")}</span>
              </span>
            </label>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
          {expanded ? (
            <button
              type="button"
              onClick={() => persist(marketingDraft)}
              className="px-4 py-2 rounded-full text-xs font-semibold text-white bg-black hover:opacity-90"
            >
              {t("cookieBanner.save")}
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="px-4 py-2 rounded-full text-xs font-semibold text-black/70 border border-black/15 hover:bg-black/[0.03]"
              >
                {t("cookieBanner.customize")}
              </button>
              <button
                type="button"
                onClick={() => persist(false)}
                className="px-4 py-2 rounded-full text-xs font-semibold text-black/70 border border-black/15 hover:bg-black/[0.03]"
              >
                {t("cookieBanner.rejectOptional")}
              </button>
              <button
                type="button"
                onClick={() => persist(true)}
                className="px-4 py-2 rounded-full text-xs font-semibold text-white bg-black hover:opacity-90"
              >
                {t("cookieBanner.acceptAll")}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
