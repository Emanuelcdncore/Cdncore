"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ICONS = ["hourglass_empty", "trending_down", "handshake", "psychology_alt"];
const COLORS = ["#E54013", "#FF9852", "#5D92E8", "#94BF5C"];

export default function InfluencerPains() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();
  const items = t("influencer.pains.items", { returnObjects: true }) as Array<{ title: string; description: string }>;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const head = gsap.timeline({ scrollTrigger: { trigger: "[data-ipains-heading]", start: "top 85%", once: true } });
        head.from("[data-ipains-title]", { x: -60, autoAlpha: 0, duration: 0.7, ease: "power3.out" });
        head.from("[data-ipains-sub]", { x: -40, autoAlpha: 0, duration: 0.5, ease: "power3.out" }, "-=0.3");
        gsap.from("[data-ipain]", { y: 40, rotation: -3, autoAlpha: 0, duration: 0.7, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: "[data-ipains-grid]", start: "top 80%", once: true } });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => { gsap.set("[data-ipains-title], [data-ipains-sub], [data-ipain]", { autoAlpha: 1, clearProps: "all" }); });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div data-ipains-heading className="mb-16 max-w-2xl">
          <h2 data-ipains-title className="text-3xl md:text-4xl font-bold mb-4" style={{ visibility: "hidden" }}>{t("influencer.pains.title")}</h2>
          <p data-ipains-sub className="text-lg text-black/55 font-medium" style={{ visibility: "hidden" }}>{t("influencer.pains.subtitle")}</p>
        </div>
        <div data-ipains-grid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((p, i) => (
            <div key={i} data-ipain className="rounded-2xl p-6 border border-black/8 hover:shadow-lg transition-shadow duration-300" style={{ visibility: "hidden" }}>
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
