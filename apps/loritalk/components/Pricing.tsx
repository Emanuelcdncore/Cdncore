"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type TierAccent = "green" | "tangerine" | "cobalt" | "flame" | "neutral";
type TierBadge = "most-popular" | "best-value" | null;

type Plan = {
  code: string;
  name: string;
  description: string;
  monthlyCents: number | null;
  yearlyCents: number | null;
  creditsPerMonth: number;
  quotas: { workspaces: number; channels: number; personas: number; members: number; media: number };
};

function tierAccent(code: string | undefined): TierAccent {
  switch ((code ?? "").toUpperCase()) {
    case "STARTER": return "green";
    case "PLUS": return "tangerine";
    case "ULTRA": return "cobalt";
    case "BUSINESS": return "flame";
    default: return "neutral";
  }
}

function tierBadge(code: string | undefined): TierBadge {
  switch ((code ?? "").toUpperCase()) {
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

  const plans = t("pricing.plans", { returnObjects: true }) as Plan[];
  const symbol = "€";

  if (!Array.isArray(plans)) return null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const headTl = gsap.timeline({
          scrollTrigger: { trigger: "[data-price-heading]", start: "top 85%", once: true },
        });
        headTl
          .from("[data-price-title]", { y: 40, autoAlpha: 0, duration: 0.8, ease: "power4.out" })
          .from("[data-price-sub]", { y: 24, autoAlpha: 0, duration: 0.65, ease: "power3.out" }, "-=0.45")
          .from("[data-price-toggle]", { y: 16, autoAlpha: 0, duration: 0.5, ease: "power3.out" }, "-=0.35");

        gsap.set("[data-price-card]", { y: 45, autoAlpha: 0, scale: 0.96 });
        ScrollTrigger.batch("[data-price-card]", {
          onEnter: (els) => gsap.to(els, {
            autoAlpha: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.14, ease: "back.out(1.6)",
          }),
          start: "top 82%",
          once: true,
        });
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

        <div data-price-toggle className="flex items-center justify-center mb-12" style={{ visibility: "hidden" }}>
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

        <div data-price-grid className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto" style={{ paddingTop: 14, alignItems: "stretch" }}>
          {plans.map((plan) => {
            const accent = tierAccent(plan.code);
            const badge = tierBadge(plan.code);

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

            const textsPerMonth = Math.floor(plan.creditsPerMonth / 10);
            const imagesPerMonth = Math.floor(plan.creditsPerMonth / 30);

            const checkoutHref = `https://app.lori-talk.eu/signup?plan=${(plan.code ?? "").toLowerCase()}&cycle=${yearly ? "yearly" : "monthly"}`;

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
                  <div className="plan-card-name">{plan.name}</div>
                  {plan.description && <div className="plan-card-sub">{plan.description}</div>}
                </div>

                {plan.creditsPerMonth > 0 && (
                  <div className="plan-card-credits-hero">
                    <div className="plan-card-credits-hero-top">
                      <span className="material-icons-round plan-card-credits-hero-icon">auto_awesome</span>
                      <span className="plan-card-credits-hero-number">{plan.creditsPerMonth.toLocaleString()}</span>
                      <span className="plan-card-credits-hero-unit">{t("pricing.creditsUnit")}</span>
                    </div>
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

                <a href={checkoutHref} className="plan-card-cta">
                  <span className="scribble-wrapper">
                    {t("pricing.tierChoose")}
                    <svg className="scribble-line" aria-hidden="true" viewBox="0 0 80 7" preserveAspectRatio="none">
                      <path pathLength="1" d="M1,4 C15,1.5 35,6 55,2 C65,0.5 75,5.5 79,4" />
                    </svg>
                  </span>
                </a>

                <ul className="plan-card-features">
                  <li className="plan-card-feat">
                    <span className="material-icons-round plan-card-feat-icon">check</span>
                    <span>{t("pricing.features.workspaces", { count: plan.quotas?.workspaces ?? 0 })}</span>
                  </li>
                  <li className="plan-card-feat">
                    <span className="material-icons-round plan-card-feat-icon">check</span>
                    <span>{t("pricing.features.channels", { count: plan.quotas?.channels ?? 0 })}</span>
                  </li>
                  <li className="plan-card-feat">
                    <span className="material-icons-round plan-card-feat-icon">check</span>
                    <span>{t("pricing.features.personas", { count: plan.quotas?.personas ?? 0 })}</span>
                  </li>
                  <li className="plan-card-feat">
                    <span className="material-icons-round plan-card-feat-icon">check</span>
                    <span>{t("pricing.features.members", { count: plan.quotas?.members ?? 0 })}</span>
                  </li>
                  <li className="plan-card-feat">
                    <span className="material-icons-round plan-card-feat-icon">check</span>
                    <span>{t("pricing.features.media", { count: (plan.quotas?.media ?? 0).toLocaleString() })}</span>
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
