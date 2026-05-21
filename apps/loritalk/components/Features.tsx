"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const featureMeta = [
  { icon: "psychology", color: "#94BF5C", bg: "#f0f7e6" },
  { icon: "auto_awesome_mosaic", color: "#5D92E8", bg: "#e8f0fd" },
  { icon: "translate", color: "#FF9852", bg: "#fff5ee" },
  { icon: "calendar_month", color: "#E54013", bg: "#fdeee9" },
  { icon: "tune", color: "#5D92E8", bg: "#e8f0fd" },
  { icon: "analytics", color: "#94BF5C", bg: "#f0f7e6" },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();
  const items = t("features.items", { returnObjects: true }) as Array<{ title: string; description: string }>;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const headTl = gsap.timeline({
          scrollTrigger: { trigger: "[data-feat-heading]", start: "top 85%", once: true },
        });
        headTl
          .from("[data-feat-title]", { y: 40, autoAlpha: 0, duration: 0.8, ease: "power4.out" })
          .from("[data-feat-sub]", { y: 24, autoAlpha: 0, duration: 0.65, ease: "power3.out" }, "-=0.45");

        gsap.set("[data-feat-card]", { y: 50, autoAlpha: 0, scale: 0.94 });
        ScrollTrigger.batch("[data-feat-card]", {
          onEnter: (els) => gsap.to(els, {
            autoAlpha: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: "back.out(1.7)",
          }),
          start: "top 88%",
          once: true,
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-feat-title], [data-feat-sub], [data-feat-card]", { autoAlpha: 1, clearProps: "all" });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div data-feat-heading className="text-center mb-16">
          <h2 data-feat-title className="font-extrabold mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.6vw, 44px)", letterSpacing: "-0.02em", color: "var(--ink-1)", visibility: "hidden" }}>{t("features.title")}</h2>
          <p data-feat-sub className="text-lg font-normal max-w-xl mx-auto" style={{ color: "var(--fg-secondary)", visibility: "hidden" }}>{t("features.subtitle")}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((f, i) => (
            <div key={i} data-feat-card className="rounded-2xl p-6 border border-black/8 hover:border-black/16 hover:shadow-lg transition-all duration-300 group" style={{ visibility: "hidden" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: featureMeta[i]?.bg }}>
                <span className="material-icons-round text-2xl" style={{ color: featureMeta[i]?.color }}>{featureMeta[i]?.icon}</span>
              </div>
              <h3 className="text-base font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-black/55 font-normal leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
