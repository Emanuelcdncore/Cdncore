"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { savePlanIntent } from "@/lib/planIntent";

gsap.registerPlugin(ScrollTrigger);

type TierAccent = "green" | "tangerine" | "cobalt" | "flame" | "neutral";
type TierBadge = "most-popular" | "best-value" | null;

type Plan = {
  code: "STARTER" | "PLUS" | "ULTRA" | "BUSINESS";
  monthlyCents: number | null;
  yearlyCents: number | null;
  creditsPerMonth: number;
  quotas: { workspaces: number; channels: number; personas: number; members: number; media: number };
};

const PLANS: Plan[] = [
  { code: "STARTER",  monthlyCents: 1400,  yearlyCents: 14000,  creditsPerMonth: 600,  quotas: { workspaces: 1,  channels: 3,  personas: 4,   members: 3,  media: 100 } },
  { code: "PLUS",     monthlyCents: 3700,  yearlyCents: 37000,  creditsPerMonth: 1700, quotas: { workspaces: 2,  channels: 10, personas: 15,  members: 10, media: 600 } },
  { code: "ULTRA",    monthlyCents: 9700,  yearlyCents: 97000,  creditsPerMonth: 4600, quotas: { workspaces: 5,  channels: 25, personas: 40,  members: 25, media: 2500 } },
  { code: "BUSINESS", monthlyCents: 20700, yearlyCents: 207000, creditsPerMonth: 9700, quotas: { workspaces: 15, channels: 75, personas: 120, members: 75, media: 10000 } },
];

function tierAccent(code: Plan["code"]): TierAccent {
  switch (code) {
    case "STARTER": return "green";
    case "PLUS": return "tangerine";
    case "ULTRA": return "cobalt";
    case "BUSINESS": return "flame";
    default: return "neutral";
  }
}

function tierBadge(code: Plan["code"]): TierBadge {
  switch (code) {
    case "PLUS": return "most-popular";
    case "ULTRA": return "best-value";
    default: return null;
  }
}

function formatCents(cents: number): string {
  const value = cents / 100;
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
}

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const [yearly, setYearly] = useState(true);
  const { t } = useTranslation();

  const symbol = "€";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-price-title]", { y: 30, autoAlpha: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: "[data-price-heading]", start: "top 85%", once: true } });
        gsap.from("[data-price-sub]", { y: 20, autoAlpha: 0, duration: 0.6, delay: 0.15, scrollTrigger: { trigger: "[data-price-heading]", start: "top 85%", once: true } });
        gsap.from("[data-price-toggle]", { y: 14, autoAlpha: 0, duration: 0.5, delay: 0.3, scrollTrigger: { trigger: "[data-price-heading]", start: "top 85%", once: true } });
        gsap.from("[data-price-card]", { y: 40, autoAlpha: 0, scale: 0.96, duration: 0.7, stagger: 0.12, ease: "back.out(1.4)", scrollTrigger: { trigger: "[data-price-grid]", start: "top 80%", once: true } });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-price-title], [data-price-sub], [data-price-toggle], [data-price-card]", { autoAlpha: 1, clearProps: "all" });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="pricing" className="py-24 md:py-32" style={{ background: "var(--paper-2)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div data-price-heading className="text-center mb-10">
          <h2 data-price-title className="font-extrabold mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.6vw, 44px)", letterSpacing: "-0.02em", color: "var(--ink-1)", visibility: "hidden" }}>{t("pricing.title")}</h2>
          <p data-price-sub className="max-w-lg mx-auto" style={{ fontSize: 16, color: "var(--ink-3)", visibility: "hidden" }}>{t("pricing.subtitle")}</p>
        </div>

        <div data-price-toggle className="flex items-center justify-center mb-8" style={{ visibility: "hidden" }}>
          <div className="plan-billing-toggle" role="group" aria-label="Billing cycle">
            <button
              type="button"
              className={`plan-billing-toggle-btn${!yearly ? " plan-billing-toggle-btn--active" : ""}`}
              onClick={() => setYearly(false)}
              aria-pressed={!yearly}
            >
              {t("pricing.monthly")}
            </button>
            <button
              type="button"
              className={`plan-billing-toggle-btn${yearly ? " plan-billing-toggle-btn--active" : ""}`}
              onClick={() => setYearly(true)}
              aria-pressed={yearly}
            >
              {t("pricing.annual")}
              <span className="plan-billing-toggle-save">{t("pricing.save2Months")}</span>
            </button>
          </div>
        </div>

        {yearly && (
          <div className="plan-promo-banner" role="status">
            <span className="material-icons-round plan-promo-banner-icon">card_giftcard</span>
            <span>{t("pricing.promoExplainer", { count: "2×" })}</span>
          </div>
        )}

        <div data-price-grid className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto" style={{ paddingTop: 14, alignItems: "stretch" }}>
          {PLANS.map((plan) => {
            const accent = tierAccent(plan.code);
            const badge = tierBadge(plan.code);
            const name = t(`pricing.tiers.${plan.code}.name`, plan.code);
            const description = t(`pricing.tiers.${plan.code}.description`, "");

            const effectiveCents = yearly
              ? plan.yearlyCents != null
                ? Math.round(plan.yearlyCents / 12)
                : null
              : plan.monthlyCents;
            const strikeCents =
              yearly &&
              plan.monthlyCents != null &&
              plan.yearlyCents != null &&
              plan.yearlyCents < plan.monthlyCents * 12
                ? plan.monthlyCents
                : null;
            const savingCents =
              yearly && plan.monthlyCents != null && plan.yearlyCents != null
                ? plan.monthlyCents * 12 - plan.yearlyCents
                : 0;

            const promoEligible = yearly;
            const effectiveCredits = promoEligible ? plan.creditsPerMonth * 2 : plan.creditsPerMonth;
            const textsPerMonth = Math.floor(effectiveCredits / 10);
            const imagesPerMonth = Math.floor(effectiveCredits / 30);

            const checkoutHref = `https://app.lori-talk.eu/register?plan=${plan.code.toLowerCase()}&cycle=${yearly ? "yearly" : "monthly"}`;

            return (
              <div
                key={plan.code}
                data-price-card
                data-accent={accent}
                className={`plan-card${badge ? " plan-card--badged" : ""}`}
                style={{ visibility: "hidden" }}
              >
                {badge && (
                  <div className="plan-card-badge">
                    <span className="material-icons-round" style={{ fontSize: 12 }}>
                      {badge === "most-popular" ? "star" : "workspace_premium"}
                    </span>
                    {badge === "most-popular" ? t("pricing.mostPopular") : t("pricing.bestValue")}
                  </div>
                )}

                <div className="plan-card-head">
                  <div className="plan-card-name">{name}</div>
                  {description && <div className="plan-card-sub">{description}</div>}
                </div>

                {plan.creditsPerMonth > 0 && (
                  <div className="plan-card-credits-hero">
                    <div className="plan-card-credits-hero-top">
                      <span className="material-icons-round plan-card-credits-hero-icon">auto_awesome</span>
                      <span className="plan-card-credits-hero-number">{plan.creditsPerMonth.toLocaleString()}</span>
                      <span className="plan-card-credits-hero-unit">{t("pricing.creditsUnit")}</span>
                    </div>
                    {promoEligible && (
                      <div className="plan-card-credits-hero-promo">
                        {t("pricing.promoHeroExtra", { count: plan.creditsPerMonth.toLocaleString() })}
                      </div>
                    )}
                    <div className="plan-card-credits-hero-conv">
                      <div>{t("pricing.creditsTexts", { count: textsPerMonth })}</div>
                      <div className="plan-card-credits-hero-or">{t("pricing.creditsOr")}</div>
                      <div>{t("pricing.creditsImages", { count: imagesPerMonth })}</div>
                    </div>
                  </div>
                )}

                <div className="plan-card-price-block">
                  <div className="plan-card-price-wrap">
                    {effectiveCents != null ? (
                      <>
                        {strikeCents != null && (
                          <span className="plan-card-price-strike">{symbol}{formatCents(strikeCents)}</span>
                        )}
                        <span className="plan-card-currency">{symbol}</span>
                        <span className="plan-card-price">{formatCents(effectiveCents)}</span>
                        <span className="plan-card-period">
                          {yearly ? t("pricing.perMonthBilledYearly") : t("pricing.perMonth")}
                        </span>
                      </>
                    ) : (
                      <span className="plan-card-price">—</span>
                    )}
                  </div>
                  {yearly && savingCents > 0 && (
                    <span className="plan-card-save">
                      {t("pricing.saveYearly", { amount: `${symbol}${formatCents(savingCents)}` })}
                    </span>
                  )}
                </div>

                <a
                  href={checkoutHref}
                  className="plan-card-cta"
                  onClick={() => savePlanIntent(plan.code.toLowerCase(), yearly ? "yearly" : "monthly")}
                >
                  {t("pricing.tierChoose")}
                </a>

                <ul className="plan-card-features">
                  <li className="plan-card-feat">
                    <span className="material-icons-round plan-card-feat-icon">check</span>
                    <span>{t("pricing.features.workspaces", { count: plan.quotas.workspaces })}</span>
                  </li>
                  <li className="plan-card-feat">
                    <span className="material-icons-round plan-card-feat-icon">check</span>
                    <span>{t("pricing.features.channels", { count: plan.quotas.channels })}</span>
                  </li>
                  <li className="plan-card-feat">
                    <span className="material-icons-round plan-card-feat-icon">check</span>
                    <span>{t("pricing.features.personas", { count: plan.quotas.personas })}</span>
                  </li>
                  <li className="plan-card-feat">
                    <span className="material-icons-round plan-card-feat-icon">check</span>
                    <span>{t("pricing.features.members", { count: plan.quotas.members })}</span>
                  </li>
                  <li className="plan-card-feat">
                    <span className="material-icons-round plan-card-feat-icon">check</span>
                    <span>{t("pricing.features.media", { count: plan.quotas.media.toLocaleString() })}</span>
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
