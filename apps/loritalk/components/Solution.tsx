"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
        gsap.from("[data-sol-title]", { y: 30, autoAlpha: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: "[data-sol-heading]", start: "top 85%", once: true } });
        gsap.from("[data-sol-sub]", { y: 20, autoAlpha: 0, duration: 0.6, delay: 0.2, ease: "power3.out", scrollTrigger: { trigger: "[data-sol-heading]", start: "top 85%", once: true } });
        gsap.utils.toArray<HTMLElement>("[data-sol-row]").forEach((row) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 82%", once: true } });
          tl.from(row.querySelector("[data-sol-before]")!, { x: -80, autoAlpha: 0, duration: 0.6, ease: "power3.out" });
          tl.from(row.querySelector("[data-sol-icon]")!, { scale: 0, autoAlpha: 0, duration: 0.4, ease: "back.out(3)" }, "-=0.2");
          tl.from(row.querySelector("[data-sol-after]")!, { x: 80, autoAlpha: 0, duration: 0.6, ease: "power3.out" }, "-=0.3");
          tl.to(row.querySelector("[data-sol-strike]")!, { scaleX: 1, duration: 0.4, ease: "power2.inOut" }, "-=0.1");
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => { gsap.set("[data-sol-title], [data-sol-sub], [data-sol-before], [data-sol-icon], [data-sol-after]", { autoAlpha: 1, clearProps: "all" }); gsap.set("[data-sol-strike]", { scaleX: 1 }); });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24" style={{ backgroundColor: "#f7f9fc" }}>
      <div className="max-w-5xl mx-auto px-6">
        <div data-sol-heading className="text-center mb-16">
          <h2 data-sol-title className="text-3xl md:text-4xl font-bold mb-4" style={{ visibility: "hidden" }}>{t("solution.title")}</h2>
          <p data-sol-sub className="text-lg text-black/55 font-normal max-w-xl mx-auto" style={{ visibility: "hidden" }}>{t("solution.subtitle")}</p>
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
          <a href="https://app.lori-talk.eu/register" className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-white text-sm hover:opacity-90 transition-opacity" style={{ backgroundColor: "#94BF5C" }}>
            <span className="material-icons-round text-base">rocket_launch</span>
            {t("solution.ctaPrimary")}
          </a>
        </div>
      </div>
    </section>
  );
}
