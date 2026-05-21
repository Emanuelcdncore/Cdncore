"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEP_ICONS = ["business_center", "auto_awesome", "edit_note", "rocket_launch"];

export default function AgencyWorkflow() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();
  const steps = t("agency.workflow.steps", { returnObjects: true }) as Array<{ badge: string; title: string; description: string }>;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-wf-title]", { y: 30, autoAlpha: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: "[data-wf-heading]", start: "top 85%", once: true } });
        gsap.from("[data-wf-sub]", { y: 20, autoAlpha: 0, duration: 0.6, delay: 0.15, scrollTrigger: { trigger: "[data-wf-heading]", start: "top 85%", once: true } });
        gsap.from("[data-wf-step]", { y: 40, autoAlpha: 0, scale: 0.95, duration: 0.7, stagger: 0.15, ease: "back.out(1.4)", scrollTrigger: { trigger: "[data-wf-grid]", start: "top 80%", once: true } });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => { gsap.set("[data-wf-title], [data-wf-sub], [data-wf-step]", { autoAlpha: 1, clearProps: "all" }); });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div data-wf-heading className="text-center mb-16 max-w-2xl mx-auto">
          <h2 data-wf-title className="text-3xl md:text-4xl font-bold mb-4" style={{ visibility: "hidden" }}>{t("agency.workflow.title")}</h2>
          <p data-wf-sub className="text-lg text-black/55 font-normal" style={{ visibility: "hidden" }}>{t("agency.workflow.subtitle")}</p>
        </div>
        <div data-wf-grid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <div key={i} data-wf-step className="relative rounded-2xl p-6 border border-black/8 bg-white" style={{ visibility: "hidden", boxShadow: "var(--shadow-sm)" }}>
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--fg-tertiary)", fontFamily: "var(--font-mono)" }}>{s.badge}</span>
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "var(--feather-green)" }}>
                  <span className="material-icons-round text-lg text-white">{STEP_ICONS[i % 4]}</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ letterSpacing: "-0.01em" }}>{s.title}</h3>
              <p className="text-sm text-black/55 leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
