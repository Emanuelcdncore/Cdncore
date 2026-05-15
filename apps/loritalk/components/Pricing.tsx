"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type TierAccent = "green" | "tangerine" | "cobalt" | "flame" | "neutral";

const planMeta: { accent: TierAccent; ctaHref: string; badge: boolean }[] = [
  { accent: "neutral", ctaHref: "https://app.lori-talk.eu", badge: false },
  { accent: "tangerine", ctaHref: "https://app.lori-talk.eu", badge: true },
  { accent: "cobalt", ctaHref: "mailto:info@lori-talk.eu", badge: false },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const [annual, setAnnual] = useState(true);
  const { t } = useTranslation();

  const plans = t("pricing.plans", { returnObjects: true }) as Array<{
    name: string; monthlyPrice: string; annualPrice: string; annualMonthly?: string; period: string; description: string; features: string[]; cta: string; customPrice?: boolean;
  }>;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-price-title]", { y: 30, autoAlpha: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: "[data-price-heading]", start: "top 85%", once: true } });
        gsap.from("[data-price-sub]", { y: 20, autoAlpha: 0, duration: 0.6, delay: 0.15, scrollTrigger: { trigger: "[data-price-heading]", start: "top 85%", once: true } });
        const cardTl = gsap.timeline({ scrollTrigger: { trigger: "[data-price-grid]", start: "top 78%", once: true } });
        cardTl.from("[data-price-card-0]", { x: -80, autoAlpha: 0, duration: 0.7, ease: "power3.out" }, 0);
        cardTl.from("[data-price-card-2]", { x: 80, autoAlpha: 0, duration: 0.7, ease: "power3.out" }, 0);
        cardTl.from("[data-price-card-1]", { y: 80, scale: 0.9, autoAlpha: 0, duration: 0.8, ease: "back.out(1.7)" }, 0.15);
      });
      mm.add("(prefers-reduced-motion: reduce)", () => { gsap.set("[data-price-title], [data-price-sub], [data-price-card-0], [data-price-card-1], [data-price-card-2]", { autoAlpha: 1, clearProps: "all" }); });
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

        <div className="flex items-center justify-center mb-12">
          <div className="plan-billing-toggle" role="group" aria-label="Billing cycle">
            <button
              type="button"
              className={`plan-billing-toggle-btn${!annual ? " plan-billing-toggle-btn--active" : ""}`}
              onClick={() => setAnnual(false)}
              aria-pressed={!annual}
            >
              {t("pricing.monthly")}
            </button>
            <button
              type="button"
              className={`plan-billing-toggle-btn${annual ? " plan-billing-toggle-btn--active" : ""}`}
              onClick={() => setAnnual(true)}
              aria-pressed={annual}
            >
              {t("pricing.annual")}
              <span className="plan-billing-toggle-save">{t("pricing.save2Months")}</span>
            </button>
          </div>
        </div>

        <div data-price-grid className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start max-w-5xl mx-auto" style={{ paddingTop: 14 }}>
          {plans.map((plan, i) => {
            const meta = planMeta[i];
            const isFree = plan.monthlyPrice === "€0";
            const isCustom = !!plan.customPrice;
            const displayPrice = isCustom ? t("pricing.customPriceLabel") : isFree ? plan.monthlyPrice : (annual ? (plan.annualMonthly || plan.monthlyPrice) : plan.monthlyPrice);
            const symbol = displayPrice.startsWith("€") ? "€" : "";
            const priceNumber = displayPrice.replace(/^€/, "");
            const periodLabel = isCustom ? "" : isFree ? plan.period : t("pricing.perMonth");
            const showStrike = !isFree && !isCustom && annual && plan.annualMonthly && plan.monthlyPrice !== plan.annualMonthly;
            const cardClass = `plan-card${meta.badge ? " plan-card--badged" : ""}`;

            return (
              <div
                key={i}
                {...{ [`data-price-card-${i}`]: "" }}
                data-accent={meta.accent}
                className={cardClass}
                style={{ visibility: "hidden" }}
              >
                {meta.badge && (
                  <div className="plan-card-badge">
                    <span className="material-icons-round" style={{ fontSize: 12 }}>star</span>
                    {t("pricing.mostPopular")}
                  </div>
                )}

                <div className="plan-card-head">
                  <div className="plan-card-name">{plan.name}</div>
                  <div className="plan-card-sub">{plan.description}</div>
                </div>

                <div className="plan-card-price-block">
                  <div className="plan-card-price-wrap">
                    {showStrike && (
                      <span className="plan-card-price-strike">{plan.monthlyPrice}</span>
                    )}
                    {symbol && !isCustom && <span className="plan-card-currency">{symbol}</span>}
                    <span className="plan-card-price">{isCustom ? displayPrice : priceNumber}</span>
                    {periodLabel && <span className="plan-card-period">{periodLabel}</span>}
                  </div>
                  {!isFree && !isCustom && annual && (
                    <span className="plan-card-save">
                      {plan.annualPrice} {t("pricing.perYear")} · {t("pricing.billedAnnually")}
                    </span>
                  )}
                </div>

                <a href={meta.ctaHref} className="plan-card-cta">{plan.cta}</a>

                <ul className="plan-card-features">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="plan-card-feat">
                      <span className="material-icons-round plan-card-feat-icon">check_circle</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
