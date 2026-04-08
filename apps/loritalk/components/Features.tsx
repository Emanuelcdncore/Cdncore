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
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const items = t("features.items", { returnObjects: true }) as Array<{ title: string; description: string }>;

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const grid = gridRef.current;
    if (!section || !heading || !grid) return;

    const headingEls = heading.children;
    const cards = grid.querySelectorAll("[data-feat-card]");

    // Hide with GSAP, not inline — keeps layout intact
    gsap.set(headingEls, { autoAlpha: 0, y: 30 });
    gsap.set(cards, { autoAlpha: 0, y: 50, scale: 0.9 });

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: scroll-triggered reveal
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 75%",
          once: true,
          onEnter: () => {
            gsap.to(headingEls, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out" });
            gsap.to(cards, { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, delay: 0.3, ease: "back.out(1.4)" });
          },
        });
      });

      // Mobile: same approach — onEnter callback, simple fade
      mm.add("(max-width: 767px)", () => {
        // Show heading immediately
        gsap.set(headingEls, { autoAlpha: 1, y: 0 });
        // Each card fades in on scroll
        cards.forEach((card) => {
          gsap.set(card, { autoAlpha: 0, y: 20, scale: 1 });
          ScrollTrigger.create({
            trigger: card,
            start: "top 92%",
            once: true,
            onEnter: () => {
              gsap.to(card, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" });
            },
          });
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(headingEls, { autoAlpha: 1, clearProps: "all" });
        gsap.set(cards, { autoAlpha: 1, clearProps: "all" });
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("features.title")}</h2>
          <p className="text-lg text-black/55 font-normal max-w-xl mx-auto">{t("features.subtitle")}</p>
        </div>
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((f, i) => (
            <div key={i} data-feat-card className="rounded-2xl p-6 border border-black/8 hover:border-black/16 hover:shadow-lg transition-all duration-300 group">
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
