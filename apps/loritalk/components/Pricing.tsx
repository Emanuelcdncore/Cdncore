"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const planMeta = [
  { color: "#94BF5C", ctaHref: "https://app.lori-talk.com", highlight: false },
  { color: "#5D92E8", ctaHref: "https://app.lori-talk.com", highlight: true },
  { color: "#FF9852", ctaHref: "mailto:info@lori-talk.eu", highlight: false },
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
        cardTl.from("[data-price-card-1]", { y: 80, scale: 0.85, autoAlpha: 0, duration: 0.8, ease: "back.out(1.7)" }, 0.15);
      });
      mm.add("(prefers-reduced-motion: reduce)", () => { gsap.set("[data-price-title], [data-price-sub], [data-price-card-0], [data-price-card-1], [data-price-card-2]", { autoAlpha: 1, clearProps: "all" }); });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="pricing" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div data-price-heading className="text-center mb-10">
          <h2 data-price-title className="text-3xl md:text-4xl font-bold mb-4" style={{ visibility: "hidden" }}>{t("pricing.title")}</h2>
          <p data-price-sub className="text-lg text-black/55 font-normal max-w-lg mx-auto" style={{ visibility: "hidden" }}>{t("pricing.subtitle")}</p>
        </div>

        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <button
            onClick={() => setAnnual(false)}
            className={`text-sm font-medium px-4 py-2 rounded-full transition-all ${!annual ? "bg-black text-white" : "text-black/40 hover:text-black/60"}`}
          >
            {t("pricing.monthly")}
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`text-sm font-medium px-4 py-2 rounded-full transition-all flex items-center gap-2 ${annual ? "bg-black text-white" : "text-black/40 hover:text-black/60"}`}
          >
            {t("pricing.annual")}
            {annual && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#94BF5C", color: "white" }}>{t("pricing.save2Months")}</span>}
          </button>
        </div>

        <div data-price-grid className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => {
            const meta = planMeta[i];
            const isFree = plan.monthlyPrice === "€0";
            const isCustom = !!plan.customPrice;
            const price = isCustom ? t("pricing.customPriceLabel") : isFree ? plan.monthlyPrice : (annual ? (plan.annualMonthly || plan.monthlyPrice) : plan.monthlyPrice);
            const periodLabel = isCustom ? "" : isFree ? plan.period : t("pricing.perMonth");

            return (
              <div
                key={i}
                {...{ [`data-price-card-${i}`]: "" }}
                className={`rounded-2xl p-8 flex flex-col gap-6 ${meta.highlight ? "border-2 shadow-lg md:-mt-4 md:mb-4" : "border border-black/8"}`}
                style={{ visibility: "hidden", ...(meta.highlight ? { borderColor: meta.color, backgroundColor: "white" } : { backgroundColor: "white" }) }}
              >
                {meta.highlight && (
                  <div className="self-start text-xs font-semibold px-3 py-1 rounded-full text-white" style={{ backgroundColor: meta.color }}>{t("pricing.mostPopular")}</div>
                )}
                <div>
                  <p className="text-sm font-semibold text-black/50 mb-1">{plan.name}</p>
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-4xl font-bold">{price}</span>
                    <span className="text-sm text-black/40 pb-1">{periodLabel}</span>
                  </div>
                  {!isFree && !isCustom && annual && (
                    <p className="text-xs text-black/35 mb-2">
                      {plan.annualPrice} {t("pricing.perYear")} · {t("pricing.billedAnnually")}
                    </p>
                  )}
                  <p className="text-sm text-black/55">{plan.description}</p>
                </div>
                <ul className="flex flex-col gap-2.5 flex-1">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-2 text-sm text-black/70">
                      <span className="material-icons-round text-base" style={{ color: meta.color }}>check_circle</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href={meta.ctaHref} className="w-full py-3 rounded-full font-semibold text-sm text-center transition-opacity hover:opacity-85 block" style={meta.highlight ? { backgroundColor: meta.color, color: "white" } : { border: `1.5px solid ${meta.color}`, color: meta.color }}>
                  {plan.cta}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
