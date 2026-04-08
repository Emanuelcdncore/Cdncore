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
        const headTl = gsap.timeline({ scrollTrigger: { trigger: "[data-problem-heading]", start: "top 85%", once: true } });
        headTl.from("[data-problem-title]", { x: -60, autoAlpha: 0, duration: 0.7, ease: "power3.out" });
        headTl.from("[data-problem-sub]", { x: -40, autoAlpha: 0, duration: 0.5, ease: "power3.out" }, "-=0.3");
        gsap.from("[data-pain-card]", { x: -120, rotation: -6, autoAlpha: 0, duration: 0.7, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: "[data-pain-grid]", start: "top 80%", once: true } });
        ScrollTrigger.create({ trigger: "[data-pain-grid]", start: "top 80%", once: true, onEnter: () => { gsap.fromTo("[data-pain-icon]", { scale: 1 }, { scale: 1.3, duration: 0.3, stagger: 0.15, delay: 0.7, yoyo: true, repeat: 1, ease: "power2.inOut" }); } });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => { gsap.set("[data-problem-title], [data-problem-sub], [data-pain-card]", { autoAlpha: 1, clearProps: "all" }); });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div data-problem-heading className="mb-16 max-w-2xl">
          <h2 data-problem-title className="text-3xl md:text-4xl font-bold mb-4" style={{ visibility: "hidden" }}>{t("problem.title")}</h2>
          <p data-problem-sub className="text-lg text-black/55 font-medium" style={{ visibility: "hidden" }}>{t("problem.subtitle")}</p>
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
