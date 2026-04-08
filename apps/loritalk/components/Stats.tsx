"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const { t } = useTranslation();

  const stats = [
    { value: t("stats.networksValue"), numericEnd: 6, suffix: "+", label: t("stats.networksLabel"), color: "#94BF5C" },
    { value: t("stats.languagesValue"), numericEnd: 3, suffix: "", label: t("stats.languagesLabel"), color: "#5D92E8" },
    { value: t("stats.generationValue"), numericEnd: 5, suffix: "s", prefix: "<", label: t("stats.generationLabel"), color: "#FF9852" },
    { value: t("stats.freeValue"), numericEnd: 0, suffix: "", label: t("stats.freeLabel"), color: "#E54013", isText: true },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-stat]", {
          y: 60, scale: 0.7, autoAlpha: 0, duration: 0.8,
          stagger: { each: 0.12, from: "center" },
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
          onComplete: () => {
            stats.forEach((s, i) => {
              const el = valueRefs.current[i];
              if (!el || s.isText) return;
              const proxy = { val: 0 };
              gsap.to(proxy, {
                val: s.numericEnd, duration: 1.5, ease: "power2.out",
                onUpdate: () => { el.textContent = `${s.prefix || ""}${Math.round(proxy.val)}${s.suffix}`; },
              });
            });
          },
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => { gsap.set("[data-stat]", { autoAlpha: 1, clearProps: "all" }); });
    }, sectionRef);
    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-20 border-b border-black/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={s.label} data-stat className="flex flex-col items-center text-center gap-2" style={{ visibility: "hidden" }}>
              <span ref={(el) => { valueRefs.current[i] = el; }} className="text-4xl md:text-5xl font-bold" style={{ color: s.color }}>
                {s.isText ? s.value : "0"}
              </span>
              <span className="text-sm text-black/50 font-normal">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
