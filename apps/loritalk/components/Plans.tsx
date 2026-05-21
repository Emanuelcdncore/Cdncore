"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { savePlanIntent } from "@/lib/planIntent";
import { onCtaClick } from "@/lib/fbAttribution";

gsap.registerPlugin(ScrollTrigger);

type TierAccent = "green" | "tangerine" | "cobalt" | "flame" | "neutral";
type TierBadge = "most-popular" | "best-value" | null;
type PlanCode = "STARTER" | "PLUS" | "ULTRA" | "BUSINESS" | "CUSTOM";

type Plan = {
  code: PlanCode;
  accent: TierAccent;
  badge: TierBadge;
  monthlyCents: number | null;
  yearlyCents: number | null;
  creditsPerMonth: number | null;
  quotas: {
    workspaces: number | "∞";
    channels: number | "∞";
    personas: number | "∞";
    members: number | "∞";
    media: number | "∞";
  };
};

const BASE_PLANS: Plan[] = [
  { code: "STARTER",  accent: "green",     badge: null,           monthlyCents: 1400,  yearlyCents: 14000,  creditsPerMonth: 600,  quotas: { workspaces: 1,  channels: 3,  personas: 4,   members: 3,  media: 100 } },
  { code: "PLUS",     accent: "tangerine", badge: "most-popular", monthlyCents: 3700,  yearlyCents: 37000,  creditsPerMonth: 1700, quotas: { workspaces: 2,  channels: 10, personas: 15,  members: 10, media: 600 } },
  { code: "ULTRA",    accent: "cobalt",    badge: "best-value",   monthlyCents: 9700,  yearlyCents: 97000,  creditsPerMonth: 4600, quotas: { workspaces: 5,  channels: 25, personas: 40,  members: 25, media: 2500 } },
  { code: "BUSINESS", accent: "flame",     badge: null,           monthlyCents: 20700, yearlyCents: 207000, creditsPerMonth: 9700, quotas: { workspaces: 15, channels: 75, personas: 120, members: 75, media: 10000 } },
];

const CUSTOM_PLAN: Plan = {
  code: "CUSTOM",
  accent: "neutral",
  badge: null,
  monthlyCents: null,
  yearlyCents: null,
  creditsPerMonth: null,
  quotas: { workspaces: "∞", channels: "∞", personas: "∞", members: "∞", media: "∞" },
};

function formatCents(cents: number): string {
  const value = cents / 100;
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
}

type Variant = "default" | "agency" | "influencer";

export default function Plans({ variant = "default" }: { variant?: Variant }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [yearly, setYearly] = useState(true);
  const { t } = useTranslation();

  const symbol = "€";
  const isAgency = variant === "agency";
  const isInfluencer = variant === "influencer";
  const plans = isInfluencer ? BASE_PLANS : [...BASE_PLANS, CUSTOM_PLAN];

  const titleKey = isAgency ? "agency.plans.title" : isInfluencer ? "influencer.plans.title" : "pricing.title";
  const subtitleKey = isAgency ? "agency.plans.subtitle" : isInfluencer ? "influencer.plans.subtitle" : "pricing.subtitle";
  const sectionId = isAgency ? "agency-plans" : isInfluencer ? "influencer-plans" : "pricing";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-plans-title]", { y: 30, autoAlpha: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: "[data-plans-heading]", start: "top 85%", once: true } });
        gsap.from("[data-plans-sub]", { y: 20, autoAlpha: 0, duration: 0.6, delay: 0.15, scrollTrigger: { trigger: "[data-plans-heading]", start: "top 85%", once: true } });
        gsap.from("[data-plans-toggle]", { y: 14, autoAlpha: 0, duration: 0.5, delay: 0.3, scrollTrigger: { trigger: "[data-plans-heading]", start: "top 85%", once: true } });
        gsap.from("[data-plans-card]", { y: 40, autoAlpha: 0, scale: 0.96, duration: 0.7, stagger: 0.1, ease: "back.out(1.4)", scrollTrigger: { trigger: "[data-plans-grid]", start: "top 80%", once: true } });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-plans-title], [data-plans-sub], [data-plans-toggle], [data-plans-card]", { autoAlpha: 1, clearProps: "all" });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id={sectionId} className="py-24 md:py-32" style={{ background: "var(--paper-2)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div data-plans-heading className="text-center mb-10">
          <h2 data-plans-title className="font-extrabold mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.6vw, 44px)", letterSpacing: "-0.02em", color: "var(--ink-1)", visibility: "hidden" }}>{t(titleKey)}</h2>
          <p data-plans-sub className="max-w-xl mx-auto" style={{ fontSize: 16, color: "var(--ink-3)", visibility: "hidden" }}>{t(subtitleKey)}</p>
        </div>

        <div data-plans-toggle className="flex items-center justify-center mb-8" style={{ visibility: "hidden" }}>
          <div className="plan-billing-toggle" role="group" aria-label="Billing cycle">
            <button type="button" className={`plan-billing-toggle-btn${!yearly ? " plan-billing-toggle-btn--active" : ""}`} onClick={() => setYearly(false)} aria-pressed={!yearly}>
              {t("pricing.monthly")}
            </button>
            <button type="button" className={`plan-billing-toggle-btn${yearly ? " plan-billing-toggle-btn--active" : ""}`} onClick={() => setYearly(true)} aria-pressed={yearly}>
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

        <div
          data-plans-grid
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-auto"
          style={{ paddingTop: 14, alignItems: "stretch", maxWidth: "72rem" }}
        >
          {plans.map((plan) => {
            const isCustom = plan.code === "CUSTOM";
            const nameKey = isCustom ? "agency.plans.tiers.CUSTOM.name" : `pricing.tiers.${plan.code}.name`;
            const descriptionKey = isCustom ? "agency.plans.tiers.CUSTOM.description" : `pricing.tiers.${plan.code}.description`;
            const ctaKey = isCustom ? "agency.plans.tiers.CUSTOM.cta" : "pricing.tierChoose";

            const name = t(nameKey, plan.code);
            const description = t(descriptionKey, "");
            const ctaLabel = t(ctaKey);

            const effectiveCents = isCustom
              ? null
              : yearly
                ? plan.yearlyCents != null ? Math.round(plan.yearlyCents / 12) : null
                : plan.monthlyCents;
            const strikeCents =
              !isCustom &&
              yearly &&
              plan.monthlyCents != null &&
              plan.yearlyCents != null &&
              plan.yearlyCents < plan.monthlyCents * 12
                ? plan.monthlyCents
                : null;
            const savingCents =
              !isCustom && yearly && plan.monthlyCents != null && plan.yearlyCents != null
                ? plan.monthlyCents * 12 - plan.yearlyCents
                : 0;

            const promoEligible = yearly && !isCustom && plan.creditsPerMonth != null;
            const effectiveCredits = promoEligible ? (plan.creditsPerMonth as number) * 2 : (plan.creditsPerMonth ?? 0);
            const textsPerMonth = Math.floor(effectiveCredits / 10);
            const imagesPerMonth = Math.floor(effectiveCredits / 30);

            const checkoutHref = isCustom
              ? "/contact?subject=agency-custom"
              : `https://app.lori-talk.eu/register?plan=${plan.code.toLowerCase()}&cycle=${yearly ? "yearly" : "monthly"}`;

            return (
              <div
                key={plan.code}
                data-plans-card
                data-accent={plan.accent}
                className={`plan-card${plan.badge ? " plan-card--badged" : ""}`}
                style={{ visibility: "hidden" }}
              >
                {plan.badge && (
                  <div className="plan-card-badge">
                    <span className="material-icons-round" style={{ fontSize: 12 }}>
                      {plan.badge === "most-popular" ? "star" : "workspace_premium"}
                    </span>
                    {plan.badge === "most-popular" ? t("pricing.mostPopular") : t("pricing.bestValue")}
                  </div>
                )}

                <div className="plan-card-head">
                  <div className="plan-card-name">{name}</div>
                  {description && <div className="plan-card-sub">{description}</div>}
                </div>

                {plan.creditsPerMonth != null ? (
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
                ) : (
                  <div className="plan-card-credits-hero">
                    <div className="plan-card-credits-hero-top">
                      <span className="material-icons-round plan-card-credits-hero-icon">all_inclusive</span>
                      <span className="plan-card-credits-hero-unit" style={{ fontSize: 14, fontWeight: 600 }}>{t("agency.plans.customCredits")}</span>
                    </div>
                    <div className="plan-card-credits-hero-conv">
                      <div>{t("agency.plans.customCreditsDetail")}</div>
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
                        <span className="plan-card-period">{yearly ? t("pricing.perMonthBilledYearly") : t("pricing.perMonth")}</span>
                      </>
                    ) : (
                      <span className="plan-card-price" style={{ fontSize: 28 }}>{t("agency.plans.customPrice")}</span>
                    )}
                  </div>
                  {yearly && savingCents > 0 && (
                    <span className="plan-card-save">{t("pricing.saveYearly", { amount: `${symbol}${formatCents(savingCents)}` })}</span>
                  )}
                </div>

                <a
                  href={checkoutHref}
                  className="plan-card-cta"
                  onClick={isCustom ? undefined : onCtaClick(() => savePlanIntent(plan.code.toLowerCase(), yearly ? "yearly" : "monthly"))}
                >
                  {ctaLabel}
                </a>

                <ul className="plan-card-features">
                  <li className="plan-card-feat">
                    <span className="material-icons-round plan-card-feat-icon">check</span>
                    <span>{isCustom ? t("pricing.features.workspaces_other", { count: "∞" }) : t("pricing.features.workspaces", { count: plan.quotas.workspaces })}</span>
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
                    <span>{isCustom ? t("pricing.features.members_other", { count: "∞" }) : t("pricing.features.members", { count: plan.quotas.members })}</span>
                  </li>
                  <li className="plan-card-feat">
                    <span className="material-icons-round plan-card-feat-icon">check</span>
                    <span>{t("pricing.features.media", { count: plan.quotas.media })}</span>
                  </li>
                  {isCustom && (
                    <>
                      <li className="plan-card-feat">
                        <span className="material-icons-round plan-card-feat-icon">check</span>
                        <span>{t("agency.plans.features.customVolumes")}</span>
                      </li>
                      <li className="plan-card-feat">
                        <span className="material-icons-round plan-card-feat-icon">check</span>
                        <span>{t("agency.plans.features.priorityEmail")}</span>
                      </li>
                      <li className="plan-card-feat">
                        <span className="material-icons-round plan-card-feat-icon">check</span>
                        <span>{t("agency.plans.features.euData")}</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
