"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ICONS = ["groups", "campaign", "schedule", "insights"];
const COLORS = ["#E54013", "#FF9852", "#5D92E8", "#94BF5C"];

export default function AgencyPains() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();
  const items = t("agency.pains.items", { returnObjects: true }) as Array<{ title: string; description: string }>;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const head = gsap.timeline({ scrollTrigger: { trigger: "[data-pains-heading]", start: "top 85%", once: true } });
        head.from("[data-pains-title]", { x: -60, autoAlpha: 0, duration: 0.7, ease: "power3.out" });
        head.from("[data-pains-sub]", { x: -40, autoAlpha: 0, duration: 0.5, ease: "power3.out" }, "-=0.3");
        gsap.from("[data-pain]", { y: 40, rotation: -3, autoAlpha: 0, duration: 0.7, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: "[data-pains-grid]", start: "top 80%", once: true } });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => { gsap.set("[data-pains-title], [data-pains-sub], [data-pain]", { autoAlpha: 1, clearProps: "all" }); });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div data-pains-heading className="mb-16 max-w-2xl">
          <h2 data-pains-title className="text-3xl md:text-4xl font-bold mb-4" style={{ visibility: "hidden" }}>{t("agency.pains.title")}</h2>
          <p data-pains-sub className="text-lg text-black/55 font-medium" style={{ visibility: "hidden" }}>{t("agency.pains.subtitle")}</p>
        </div>
        <div data-pains-grid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((p, i) => (
            <div key={i} data-pain className="rounded-2xl p-6 border border-black/8 hover:shadow-lg transition-shadow duration-300" style={{ visibility: "hidden" }}>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: COLORS[i % 4] + "15" }}>
                <span className="material-icons-round text-2xl" style={{ color: COLORS[i % 4] }}>{ICONS[i % 4]}</span>
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
