"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const icons = ["schedule", "psychology", "group_off"];
const colors = ["#E54013", "#FF9852", "#5D92E8"];

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();
  const items = t("problem.items", { returnObjects: true }) as Array<{ title: string; description: string }>;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const headTl = gsap.timeline({
          scrollTrigger: { trigger: "[data-problem-heading]", start: "top 85%", once: true },
        });
        headTl
          .from("[data-problem-title]", { y: 40, autoAlpha: 0, duration: 0.8, ease: "power4.out" })
          .from("[data-problem-sub]", { y: 24, autoAlpha: 0, duration: 0.65, ease: "power3.out" }, "-=0.45");

        gsap.set("[data-pain-card]", { y: 55, autoAlpha: 0, scale: 0.95 });
        ScrollTrigger.batch("[data-pain-card]", {
          onEnter: (els) => gsap.to(els, {
            autoAlpha: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.12, ease: "power3.out",
            onComplete: () => gsap.fromTo("[data-pain-icon]",
              { scale: 1 },
              { scale: 1.18, duration: 0.28, stagger: 0.12, yoyo: true, repeat: 1, ease: "power2.inOut" }
            ),
          }),
          start: "top 88%",
          once: true,
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-problem-title], [data-problem-sub], [data-pain-card]", { autoAlpha: 1, clearProps: "all" });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div data-problem-heading className="mb-16 max-w-2xl">
          <h2 data-problem-title className="font-extrabold mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.6vw, 44px)", letterSpacing: "-0.02em", color: "var(--ink-1)", visibility: "hidden" }}>{t("problem.title")}</h2>
          <p data-problem-sub className="text-lg font-normal" style={{ color: "var(--fg-secondary)", visibility: "hidden" }}>{t("problem.subtitle")}</p>
        </div>
        <div data-pain-grid className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((p, i) => (
            <div key={i} data-pain-card className="rounded-2xl p-6 border border-black/8 hover:shadow-lg transition-shadow duration-300" style={{ visibility: "hidden" }}>
              <div data-pain-icon className="w-14 h-14 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: colors[i] + "15" }}>
                <span className="material-icons-round text-2xl" style={{ color: colors[i] }}>{icons[i]}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
              <p className="text-sm text-black/55 font-normal leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
