"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ICONS = ["record_voice_over", "auto_awesome_motion", "image", "schedule_send", "trending_up", "shield"];
const ACCENTS: Array<{ tint: string; ink: string }> = [
  { tint: "var(--tint-flame)",     ink: "var(--feather-flame-hi)" },
  { tint: "var(--tint-tangerine)", ink: "var(--feather-tangerine-ink)" },
  { tint: "var(--tint-green)",     ink: "var(--feather-green-ink)" },
  { tint: "var(--tint-sky)",       ink: "var(--feather-sky-ink)" },
  { tint: "var(--tint-cobalt)",    ink: "var(--feather-cobalt-hi)" },
  { tint: "var(--tint-tangerine)", ink: "var(--feather-tangerine-ink)" },
];

export default function InfluencerBenefits() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();
  const items = t("influencer.benefits.items", { returnObjects: true }) as Array<{ title: string; description: string }>;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set("[data-ibene-title], [data-ibene-sub], [data-ibene]", { autoAlpha: 1, clearProps: "visibility" });
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-ibene-title]", { y: 30, autoAlpha: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: "[data-ibene-heading]", start: "top 85%", once: true } });
        gsap.from("[data-ibene-sub]", { y: 20, autoAlpha: 0, duration: 0.6, delay: 0.15, ease: "power3.out", scrollTrigger: { trigger: "[data-ibene-heading]", start: "top 85%", once: true } });
        gsap.from("[data-ibene]", { y: 40, autoAlpha: 0, duration: 0.6, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: "[data-ibene-grid]", start: "top 80%", once: true } });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="influencer-features" className="py-24 md:py-32" style={{ background: "var(--paper-3)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div data-ibene-heading className="text-center mb-16 max-w-2xl mx-auto">
          <h2 data-ibene-title className="text-3xl md:text-4xl font-bold mb-4">{t("influencer.benefits.title")}</h2>
          <p data-ibene-sub className="text-lg text-black/55 font-normal">{t("influencer.benefits.subtitle")}</p>
        </div>
        <div data-ibene-grid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((b, i) => (
            <div key={i} data-ibene className="rounded-2xl p-6 bg-white border border-black/8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: ACCENTS[i % 6].tint }}>
                <span className="material-icons-round text-xl" style={{ color: ACCENTS[i % 6].ink }}>{ICONS[i % 6]}</span>
              </div>
              <h3 className="text-base font-semibold mb-2">{b.title}</h3>
              <p className="text-sm text-black/55 font-normal leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
