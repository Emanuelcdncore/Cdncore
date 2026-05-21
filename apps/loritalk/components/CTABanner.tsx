"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CTAButton from "./CTAButton";
import { onCtaClick } from "@/lib/fbAttribution";

gsap.registerPlugin(ScrollTrigger);

const CTA_GREEN = "#94BF5C";
const FAQ_BG = "#f7f9fc"; // background of the section directly above
const VB_W = 1440;
const VB_H = 80;   // height of the drip SVG (must fit inside pt-20 = 80px)
const DROOP = 62;  // how far the FAQ-colour drip hangs down into the CTABanner

// Inverted arch: fills from top edge, curves DOWN into the CTABanner
function wavePath(d: number): string {
  return `M0,0 L${VB_W},0 C${VB_W * 0.67},${d} ${VB_W * 0.33},${d} 0,0 Z`;
}

export default function CTABanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const path = pathRef.current;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Content entrance
        const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true } });
        tl.from("[data-cta-headline]", { y: 30, autoAlpha: 0, duration: 0.75, ease: "power4.out" });
        tl.from("[data-cta-sub]", { y: 20, autoAlpha: 0, duration: 0.6, ease: "power3.out" }, "-=0.35");
        tl.from("[data-cta-btn]", { scale: 0.85, autoAlpha: 0, duration: 0.5, stagger: 0.1, ease: "back.out(2.5)" }, "-=0.25");

        // Parallax shapes
        gsap.utils.toArray<HTMLElement>("[data-cta-shape]").forEach((shape, i) => {
          gsap.to(shape, { y: (i + 1) * -30, rotation: (i + 1) * 10, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 } });
        });

        // Bouncy wave: FAQ-colour drip bounces away on enter
        if (path) {
          const proxy = { d: DROOP };
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top bottom",
            onEnter(self) {
              const vel = Math.abs(self.getVelocity());
              const v = Math.min(vel / 8000, 0.5);
              gsap.to(proxy, {
                d: 0,
                duration: 2.2,
                ease: `elastic.out(${1.5 + v}, 0.52)`,
                overwrite: true,
                onUpdate() {
                  path.setAttribute("d", wavePath(proxy.d));
                },
              });
            },
            onLeaveBack() {
              gsap.to(proxy, {
                d: DROOP,
                duration: 0.45,
                ease: "power3.inOut",
                overwrite: true,
                onUpdate() {
                  path.setAttribute("d", wavePath(proxy.d));
                },
              });
            },
          });
        }
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-cta-headline], [data-cta-sub], [data-cta-btn]", { autoAlpha: 1, clearProps: "all" });
        if (path) path.setAttribute("d", wavePath(0));
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 overflow-hidden relative">
      {/* Solid green background */}
      <div className="absolute inset-0" style={{ backgroundColor: CTA_GREEN }} aria-hidden="true" />

      {/* FAQ-colour drip — sits at top of section, bounces away on scroll-enter */}
      <div className="absolute top-0 left-0 w-full pointer-events-none" style={{ height: VB_H, zIndex: 4 }}>
        <svg
          preserveAspectRatio="none"
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          style={{ width: "100%", height: "100%", display: "block" }}
        >
          <path ref={pathRef} fill={FAQ_BG} d={wavePath(DROOP)} />
        </svg>
      </div>

      {/* Decorative shapes */}
      <div data-cta-shape className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-20" style={{ backgroundColor: "#5D92E8" }} aria-hidden="true" />
      <div data-cta-shape className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-15" style={{ backgroundColor: "#E54013" }} aria-hidden="true" />
      <div data-cta-shape className="absolute top-1/2 left-[15%] w-32 h-32 rotate-45 rounded-lg opacity-10" style={{ backgroundColor: "#fff" }} aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-6 flex flex-col items-center text-center gap-6" style={{ zIndex: 5 }}>
        <h2 data-cta-headline className="text-3xl md:text-4xl font-bold text-white" style={{ visibility: "hidden" }}>{t("ctaBanner.headline")}</h2>
        <p data-cta-sub className="text-lg text-white/80 font-normal max-w-md" style={{ visibility: "hidden" }}>{t("ctaBanner.subtitle")}</p>
        <div className="flex items-center">
          <CTAButton data-cta-btn href="https://app.lori-talk.eu" onClick={onCtaClick()} className="px-8 py-3.5 rounded-full font-semibold text-sm bg-white" style={{ color: CTA_GREEN, visibility: "hidden" }}>{t("ctaBanner.ctaPrimary")}</CTAButton>
        </div>
      </div>
    </section>
  );
}
