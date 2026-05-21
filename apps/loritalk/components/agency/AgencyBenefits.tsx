"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ICONS = ["workspaces", "record_voice_over", "psychology", "calendar_month", "groups", "query_stats"];
const ACCENTS: Array<{ tint: string; ink: string }> = [
  { tint: "var(--tint-green)",     ink: "var(--feather-green-ink)" },
  { tint: "var(--tint-tangerine)", ink: "var(--feather-tangerine-ink)" },
  { tint: "var(--tint-cobalt)",    ink: "var(--feather-cobalt-hi)" },
  { tint: "var(--tint-sky)",       ink: "var(--feather-sky-ink)" },
  { tint: "var(--tint-flame)",     ink: "var(--feather-flame-hi)" },
  { tint: "var(--tint-green)",     ink: "var(--feather-green-ink)" },
];

export default function AgencyBenefits() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();
  const items = t("agency.benefits.items", { returnObjects: true }) as Array<{ title: string; description: string }>;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set("[data-bene-title], [data-bene-sub], [data-bene]", { autoAlpha: 1, clearProps: "visibility" });
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-bene-title]", { y: 30, autoAlpha: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: "[data-bene-heading]", start: "top 85%", once: true } });
        gsap.from("[data-bene-sub]", { y: 20, autoAlpha: 0, duration: 0.6, delay: 0.15, ease: "power3.out", scrollTrigger: { trigger: "[data-bene-heading]", start: "top 85%", once: true } });
        gsap.from("[data-bene]", { y: 40, autoAlpha: 0, duration: 0.6, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: "[data-bene-grid]", start: "top 80%", once: true } });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="agency-features" className="py-24 md:py-32" style={{ background: "var(--paper-3)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div data-bene-heading className="text-center mb-16 max-w-2xl mx-auto">
          <h2 data-bene-title className="text-3xl md:text-4xl font-bold mb-4" style={{ visibility: "hidden" }}>{t("agency.benefits.title")}</h2>
          <p data-bene-sub className="text-lg text-black/55 font-normal" style={{ visibility: "hidden" }}>{t("agency.benefits.subtitle")}</p>
        </div>
        <div data-bene-grid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((b, i) => (
            <div
              key={i}
              data-bene
              className="rounded-2xl p-6 bg-white border border-black/8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              style={{ visibility: "hidden" }}
            >
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
