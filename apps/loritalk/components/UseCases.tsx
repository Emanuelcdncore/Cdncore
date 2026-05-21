"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const caseMeta = [
  { icon: "person", color: "#94BF5C" },
  { icon: "business", color: "#5D92E8" },
  { icon: "groups", color: "#FF9852" },
];

export default function UseCases() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();
  const items = t("useCases.items", { returnObjects: true }) as Array<{ title: string; description: string }>;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const headTl = gsap.timeline({
          scrollTrigger: { trigger: "[data-uc-heading]", start: "top 85%", once: true },
        });
        headTl
          .from("[data-uc-title]", { y: 40, autoAlpha: 0, duration: 0.8, ease: "power4.out" })
          .from("[data-uc-sub]", { y: 24, autoAlpha: 0, duration: 0.65, ease: "power3.out" }, "-=0.45");

        gsap.set("[data-uc-card]", { y: 50, autoAlpha: 0, scale: 0.95 });
        ScrollTrigger.batch("[data-uc-card]", {
          onEnter: (els) => gsap.to(els, {
            autoAlpha: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.14, ease: "back.out(1.5)",
          }),
          start: "top 86%",
          once: true,
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => { gsap.set("[data-uc-title], [data-uc-sub], [data-uc-card]", { autoAlpha: 1, clearProps: "all" }); });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24" style={{ backgroundColor: "#f7f9fc" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div data-uc-heading className="text-center mb-16">
          <h2 data-uc-title className="font-extrabold mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.6vw, 44px)", letterSpacing: "-0.02em", color: "var(--ink-1)", visibility: "hidden" }}>{t("useCases.title")}</h2>
          <p data-uc-sub className="text-lg font-normal max-w-lg mx-auto" style={{ color: "var(--fg-secondary)", visibility: "hidden" }}>{t("useCases.subtitle")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((c, i) => (
            <div key={i} data-uc-card className="rounded-2xl p-8 bg-white border border-black/8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300" style={{ visibility: "hidden" }}>
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5" style={{ backgroundColor: caseMeta[i].color }}>
                <span className="material-icons-round text-2xl text-white">{caseMeta[i].icon}</span>
              </div>
              <h3 className="text-lg font-semibold mb-3">{c.title}</h3>
              <p className="text-sm text-black/55 font-normal leading-relaxed">{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
