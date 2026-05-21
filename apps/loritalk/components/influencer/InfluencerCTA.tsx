"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onCtaClick } from "@/lib/fbAttribution";

gsap.registerPlugin(ScrollTrigger);

export default function InfluencerCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true } });
        tl.from("[data-icta-headline]", { clipPath: "inset(0 0 100% 0)", y: 30, duration: 0.8, ease: "power4.out" });
        tl.from("[data-icta-sub]", { y: 20, autoAlpha: 0, duration: 0.6 }, "-=0.3");
        tl.from("[data-icta-btn]", { scale: 0, autoAlpha: 0, duration: 0.5, stagger: 0.1, ease: "back.out(3)" }, "-=0.2");
        gsap.utils.toArray<HTMLElement>("[data-icta-shape]").forEach((shape, i) => {
          gsap.to(shape, { y: (i + 1) * -30, rotation: (i + 1) * 10, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 } });
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => { gsap.set("[data-icta-headline], [data-icta-sub], [data-icta-btn]", { autoAlpha: 1, clearProps: "all" }); });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 overflow-hidden relative">
      <div className="absolute inset-0" style={{ backgroundColor: "#FF6903" }} aria-hidden="true" />
      <div data-icta-shape className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-20" style={{ backgroundColor: "#FFC107" }} aria-hidden="true" />
      <div data-icta-shape className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-15" style={{ backgroundColor: "#fff" }} aria-hidden="true" />
      <div data-icta-shape className="absolute top-1/2 left-[15%] w-32 h-32 rotate-45 rounded-lg opacity-10" style={{ backgroundColor: "#fff" }} aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto px-6 flex flex-col items-center text-center gap-6">
        <h2 data-icta-headline className="text-3xl md:text-4xl font-bold text-white" style={{ clipPath: "inset(0 0 0 0)" }}>{t("influencer.cta.headline")}</h2>
        <p data-icta-sub className="text-lg text-white/90 font-normal max-w-xl" style={{ visibility: "hidden" }}>{t("influencer.cta.subtitle")}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a data-icta-btn href="https://app.lori-talk.eu/register?plan=starter&cycle=yearly" onClick={onCtaClick()} className="px-8 py-3.5 rounded-full font-semibold text-sm bg-white hover:bg-white/90 transition-colors" style={{ color: "#FF6903", visibility: "hidden" }}>{t("influencer.cta.ctaPrimary")}</a>
          <a data-icta-btn href="#influencer-plans" className="px-8 py-3.5 rounded-full font-semibold text-sm bg-transparent text-white border-2 border-white/70 hover:bg-white/10 transition-colors" style={{ visibility: "hidden" }}>{t("influencer.cta.ctaSecondary")}</a>
        </div>
      </div>
    </section>
  );
}
