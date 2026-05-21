"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CTAButton from "./CTAButton";

gsap.registerPlugin(ScrollTrigger);

const rowIcons = ["speed", "auto_awesome", "dashboard"];

export default function Solution() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();
  const rows = t("solution.rows", { returnObjects: true }) as Array<{ before: string; after: string }>;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const headTl = gsap.timeline({
          scrollTrigger: { trigger: "[data-sol-heading]", start: "top 85%", once: true },
        });
        headTl
          .from("[data-sol-title]", { y: 40, autoAlpha: 0, duration: 0.8, ease: "power4.out" })
          .from("[data-sol-sub]", { y: 24, autoAlpha: 0, duration: 0.65, ease: "power3.out" }, "-=0.45");

        gsap.utils.toArray<HTMLElement>("[data-sol-row]").forEach((row) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 82%", once: true } });
          tl.from(row.querySelector("[data-sol-before]")!, { x: -60, autoAlpha: 0, duration: 0.65, ease: "power4.out" });
          tl.from(row.querySelector("[data-sol-icon]")!, { scale: 0, autoAlpha: 0, duration: 0.45, ease: "back.out(3)" }, "-=0.25");
          tl.from(row.querySelector("[data-sol-after]")!, { x: 60, autoAlpha: 0, duration: 0.65, ease: "power4.out" }, "-=0.35");
          tl.to(row.querySelector("[data-sol-strike]")!, { scaleX: 1, duration: 0.4, ease: "power2.inOut" }, "-=0.15");
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => { gsap.set("[data-sol-title], [data-sol-sub], [data-sol-before], [data-sol-icon], [data-sol-after]", { autoAlpha: 1, clearProps: "all" }); gsap.set("[data-sol-strike]", { scaleX: 1 }); });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24" style={{ backgroundColor: "#f7f9fc" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div data-sol-heading className="text-center mb-16">
          <h2 data-sol-title className="font-extrabold mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.6vw, 44px)", letterSpacing: "-0.02em", color: "var(--ink-1)", visibility: "hidden" }}>{t("solution.title")}</h2>
          <p data-sol-sub className="text-lg font-normal max-w-xl mx-auto" style={{ color: "var(--fg-secondary)", visibility: "hidden" }}>{t("solution.subtitle")}</p>
        </div>
        <div className="flex flex-col gap-6">
          {rows.map((r, i) => (
            <div key={i} data-sol-row className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center rounded-2xl bg-white border border-black/8 p-5 md:p-6">
              <div data-sol-before className="relative" style={{ visibility: "hidden" }}>
                <span className="text-sm text-black/45 font-normal leading-relaxed">{r.before}</span>
                <span data-sol-strike className="absolute left-0 top-1/2 w-full h-px bg-black/30 origin-left" style={{ transform: "scaleX(0)" }} />
              </div>
              <div data-sol-icon className="flex items-center justify-center" style={{ visibility: "hidden" }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#94BF5C" }}>
                  <span className="material-icons-round text-lg text-white">{rowIcons[i]}</span>
                </div>
              </div>
              <div data-sol-after style={{ visibility: "hidden" }}>
                <span className="text-sm font-medium leading-relaxed" style={{ color: "#94BF5C" }}>{r.after}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <CTAButton href="https://app.lori-talk.eu" className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-white text-sm" style={{ backgroundColor: "#94BF5C" }}>
            <span className="material-icons-round text-base">rocket_launch</span>
            {t("solution.ctaPrimary")}
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
