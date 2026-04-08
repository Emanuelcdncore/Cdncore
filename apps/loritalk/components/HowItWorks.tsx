"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stepMeta = [
  { number: "01", color: "#94BF5C", icon: "edit_note" },
  { number: "02", color: "#5D92E8", icon: "auto_awesome" },
  { number: "03", color: "#FF9852", icon: "send" },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();
  const steps = t("howItWorks.steps", { returnObjects: true }) as Array<{ title: string; description: string }>;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-hiw-title]", { y: 30, autoAlpha: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: "[data-hiw-heading]", start: "top 85%", once: true } });
        gsap.from("[data-hiw-sub]", { y: 20, autoAlpha: 0, duration: 0.6, delay: 0.15, ease: "power3.out", scrollTrigger: { trigger: "[data-hiw-heading]", start: "top 85%", once: true } });
        const stepTl = gsap.timeline({ scrollTrigger: { trigger: "[data-hiw-steps]", start: "top 75%", once: true } });
        stepTl.from("[data-hiw-connector]", { scaleX: 0, transformOrigin: "left center", duration: 0.8, stagger: 0.5, ease: "power2.inOut" }, 0);
        stepMeta.forEach((_, i) => {
          stepTl.from(`[data-hiw-circle-${i}]`, { scale: 0, autoAlpha: 0, duration: 0.5, ease: "back.out(3)" }, i * 0.5);
          stepTl.from(`[data-hiw-text-${i}]`, { y: 25, autoAlpha: 0, duration: 0.5, ease: "power2.out" }, i * 0.5 + 0.2);
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-hiw-title], [data-hiw-sub], [data-hiw-connector], [data-hiw-circle-0], [data-hiw-circle-1], [data-hiw-circle-2], [data-hiw-text-0], [data-hiw-text-1], [data-hiw-text-2]", { autoAlpha: 1, clearProps: "all" });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="how-it-works" className="py-24" style={{ backgroundColor: "#f7f9fc" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div data-hiw-heading className="text-center mb-16">
          <h2 data-hiw-title className="text-3xl md:text-4xl font-bold mb-4" style={{ visibility: "hidden" }}>{t("howItWorks.title")}</h2>
          <p data-hiw-sub className="text-lg text-black/55 font-normal max-w-lg mx-auto" style={{ visibility: "hidden" }}>{t("howItWorks.subtitle")}</p>
        </div>
        <div data-hiw-steps className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center">
              {i < steps.length - 1 && (
                <div data-hiw-connector className="hidden md:block absolute top-10 left-[calc(50%+48px)] w-[calc(100%-96px)] h-[2px]" style={{ backgroundColor: stepMeta[i].color, opacity: 0.3 }} />
              )}
              <div {...{ [`data-hiw-circle-${i}`]: "" }} className="w-20 h-20 rounded-full flex items-center justify-center mb-6 z-10" style={{ backgroundColor: stepMeta[i].color, visibility: "hidden" }}>
                <span className="material-icons-round text-3xl text-white">{stepMeta[i].icon}</span>
              </div>
              <div {...{ [`data-hiw-text-${i}`]: "" }} style={{ visibility: "hidden" }}>
                <span className="text-xs font-semibold text-black/30 mb-2 block">STEP {stepMeta[i].number}</span>
                <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                <p className="text-sm text-black/55 font-normal leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
