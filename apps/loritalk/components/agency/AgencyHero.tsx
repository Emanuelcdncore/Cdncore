"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { onCtaClick } from "@/lib/fbAttribution";

type ClientCard = {
  brand: string;
  industry: string;
  voice: string;
  accent: string;
  tint: string;
  pos: { top?: string; bottom?: string; left?: string; right?: string };
};

const CLIENT_CARDS: ClientCard[] = [
  { brand: "Acme Run", industry: "Sportswear",  voice: "Bold · Gen-Z",   accent: "var(--feather-green)",     tint: "var(--tint-green)",     pos: { top: "0%",     left: "-6%" } },
  { brand: "Lumea",    industry: "Skincare",    voice: "Soft · Premium", accent: "var(--feather-tangerine)", tint: "var(--tint-tangerine)", pos: { top: "8%",     right: "-4%" } },
  { brand: "Ironforge",industry: "B2B SaaS",    voice: "Expert · Sharp", accent: "var(--feather-cobalt)",    tint: "var(--tint-cobalt)",    pos: { top: "44%",    left: "-10%" } },
  { brand: "Petits",   industry: "Food retail", voice: "Warm · Family",  accent: "var(--feather-flame)",     tint: "var(--tint-flame)",     pos: { bottom: "4%",  right: "-2%" } },
  { brand: "Vela",     industry: "Travel",      voice: "Cinematic",      accent: "var(--feather-sky)",       tint: "var(--tint-sky)",       pos: { bottom: "-2%", left: "10%" } },
];

export default function AgencyHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const { t } = useTranslation();

  const trustItems = t("agency.hero.trust", { returnObjects: true }) as string[];

  useEffect(() => {
    const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

      if (reduced) {
        gsap.set("[data-ahero-badge], [data-ahero-line], [data-ahero-lead], [data-ahero-cta], [data-ahero-trust], [data-ahero-hub]", { autoAlpha: 1, clearProps: "all" });
        gsap.set(cards, { opacity: 1, scale: 1, clearProps: "transform,opacity" });
        drawConnectors();
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-ahero-badge]", { y: -30, autoAlpha: 0, duration: 0.6, ease: "back.out(2)" });
      tl.from("[data-ahero-line]", { y: 30, autoAlpha: 0, duration: 0.7, stagger: 0.12 }, "-=0.25");
      tl.from("[data-ahero-lead]", { y: 20, autoAlpha: 0, duration: 0.5 }, "-=0.3");
      tl.from("[data-ahero-cta]", { scale: 0.9, autoAlpha: 0, duration: 0.5, stagger: 0.08, ease: "back.out(2)" }, "-=0.2");
      tl.from("[data-ahero-trust]", { y: 12, autoAlpha: 0, duration: 0.5, stagger: 0.06 }, "-=0.2");
      tl.from(hubRef.current, { scale: 0.85, autoAlpha: 0, duration: 0.7, ease: "back.out(1.6)" }, "-=0.5");
      tl.to(cards, {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: "back.out(1.4)",
        stagger: 0.09,
        onComplete: () => {
          drawConnectors();
          const paths = svgRef.current?.querySelectorAll("path");
          if (paths && paths.length) {
            gsap.fromTo(paths, { strokeDashoffset: 320 }, { strokeDashoffset: 0, duration: 1.1, ease: "power2.out", stagger: 0.05 });
          }
        },
      }, "-=0.1");

      const onResize = () => { if (svgRef.current?.querySelectorAll("path").length) drawConnectors(); };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const drawConnectors = () => {
    const svg = svgRef.current;
    const stage = stageRef.current;
    const hub = hubRef.current;
    if (!svg || !stage || !hub) return;
    svg.innerHTML = "";
    const sRect = stage.getBoundingClientRect();
    const hRect = hub.getBoundingClientRect();
    const hx = hRect.left - sRect.left + hRect.width / 2;
    const hy = hRect.top - sRect.top + hRect.height / 2;
    cardRefs.current.forEach((card) => {
      if (!card) return;
      const c = card.getBoundingClientRect();
      const cx = c.left - sRect.left + c.width / 2;
      const cy = c.top - sRect.top + c.height / 2;
      const mx = (hx + cx) / 2;
      const my = (hy + cy) / 2 + (cy > hy ? -32 : 32);
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", `M${hx},${hy} Q${mx},${my} ${cx},${cy}`);
      path.setAttribute("stroke", "#94bf5c");
      path.setAttribute("stroke-width", "1.4");
      path.setAttribute("fill", "none");
      path.setAttribute("stroke-dasharray", "4 5");
      path.setAttribute("opacity", "0.5");
      svg.appendChild(path);
    });
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden pt-28 pb-16 md:pb-24" style={{ background: "var(--paper-2)" }}>
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute rounded-full blur-3xl opacity-35" style={{ width: 600, height: 600, top: -200, left: -200, background: "var(--feather-green)", mixBlendMode: "multiply", animation: "floatBlob 16s ease-in-out infinite" }} />
        <div className="absolute rounded-full blur-3xl opacity-30" style={{ width: 500, height: 500, top: -100, right: -100, background: "var(--feather-sky)", mixBlendMode: "multiply", animation: "floatBlob 16s ease-in-out -4s infinite" }} />
        <div className="absolute rounded-full blur-3xl opacity-25" style={{ width: 400, height: 400, bottom: -100, right: "20%", background: "var(--feather-tangerine)", mixBlendMode: "multiply", animation: "floatBlob 16s ease-in-out -8s infinite" }} />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-8 grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-20 items-center">
        <div>
          <div data-ahero-badge className="inline-flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full text-xs font-semibold bg-white border" style={{ borderColor: "var(--border-default)", color: "var(--fg-secondary)", boxShadow: "var(--shadow-sm)", visibility: "hidden" }}>
            <span className="relative w-[18px] h-[18px] grid place-items-center rounded-full" style={{ background: "var(--feather-tangerine)" }}>
              <span className="w-[7px] h-[7px] rounded-full bg-white" />
              <span className="absolute inset-0 rounded-full" style={{ background: "var(--feather-tangerine)", animation: "pulseRing 2s ease-out infinite", opacity: 0.6 }} />
            </span>
            {t("agency.hero.badge")}
          </div>

          <h1 className="mt-6 mb-7 font-extrabold" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 5.6vw, 80px)", lineHeight: 1.02, letterSpacing: "-0.035em", color: "var(--ink-1)" }}>
            <span data-ahero-line className="block">{t("agency.hero.headlineOne")}</span>
            <span data-ahero-line className="block">
              <span style={{ background: "var(--feather-gradient)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", display: "inline-block" }}>{t("agency.hero.headlineTwo")}</span>
            </span>
            <span data-ahero-line className="block" style={{ color: "var(--ink-3)" }}>{t("agency.hero.headlineThree")}</span>
          </h1>

          <p data-ahero-lead className="text-lg leading-relaxed max-w-[560px] mb-8" style={{ color: "var(--fg-secondary)", visibility: "hidden" }} dangerouslySetInnerHTML={{ __html: t("agency.hero.lead") }} />

          <div className="flex flex-wrap items-center gap-3">
            <a data-ahero-cta href="https://app.lori-talk.eu/register?plan=ultra&cycle=yearly" onClick={onCtaClick()} className="inline-flex items-center gap-2 rounded-full font-semibold text-sm text-white transition-transform" style={{ padding: "14px 24px", background: "var(--feather-green)", visibility: "hidden" }}>
              {t("agency.hero.ctaPrimary")}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
            <a data-ahero-cta href="#agency-plans" className="inline-flex items-center gap-2 rounded-full font-semibold text-sm transition-colors" style={{ padding: "14px 22px", border: "1px solid var(--border-default)", color: "var(--ink-1)", visibility: "hidden" }}>
              {t("agency.hero.ctaSecondary")}
            </a>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-5 text-sm" style={{ color: "var(--fg-tertiary)" }}>
            {trustItems.map((item, i) => (
              <span key={i} data-ahero-trust className="inline-flex items-center gap-1.5" style={{ visibility: "hidden" }}>
                <span className="inline-grid place-items-center text-white font-extrabold" style={{ width: 16, height: 16, fontSize: 9, borderRadius: 999, background: "var(--feather-green)" }}>✓</span>
                {item}
              </span>
            ))}
          </div>
        </div>

        <div ref={stageRef} className="relative hidden lg:block" style={{ height: 600 }}>
          <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }} />

          <div ref={hubRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-5" style={{ width: 260, border: "1px solid var(--border-default)", borderRadius: "var(--r-lg)", boxShadow: "var(--shadow-pop)", zIndex: 5, visibility: "hidden" }}>
            <div className="flex items-center gap-2 mb-3 uppercase font-semibold" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-tertiary)", letterSpacing: "0.06em" }}>
              <span className="grid place-items-center" style={{ width: 18, height: 18, borderRadius: 6, background: "var(--tint-green)", color: "var(--feather-green-ink)" }}>★</span>
              {t("agency.hero.hubLabel")}
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.1, color: "var(--ink-1)", letterSpacing: "-0.02em" }}>
              {t("agency.hero.hubTitle")}
            </div>
            <div style={{ marginTop: 10, fontSize: 12.5, color: "var(--fg-secondary)", lineHeight: 1.5 }}>
              {t("agency.hero.hubBody")}
            </div>
            <div className="mt-4 pt-3 flex justify-between items-center" style={{ borderTop: "1px dashed var(--border-default)", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-tertiary)" }}>
              <span>{t("agency.hero.hubMeta")}</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 font-semibold text-white rounded-full" style={{ background: "var(--feather-green)", fontSize: 11 }}>{t("agency.hero.hubBadge")}</span>
            </div>
          </div>

          {CLIENT_CARDS.map((card, i) => (
            <div
              key={card.brand}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="absolute bg-white p-3"
              style={{
                width: 200,
                ...card.pos,
                border: "1px solid var(--border-default)",
                borderRadius: "var(--r-md)",
                boxShadow: "var(--shadow-lg)",
                opacity: 0,
                transform: "scale(0.4)",
                transformOrigin: "50% 50%",
                zIndex: 2,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="grid place-items-center font-extrabold text-white" style={{ width: 28, height: 28, borderRadius: 8, background: card.accent, fontSize: 12 }}>
                  {card.brand.charAt(0)}
                </span>
                <div className="flex flex-col">
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink-1)", lineHeight: 1.1 }}>{card.brand}</span>
                  <span style={{ fontSize: 10.5, color: "var(--fg-tertiary)", lineHeight: 1.1 }}>{card.industry}</span>
                </div>
              </div>
              <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: card.tint, color: "var(--ink-2)", fontSize: 10.5, fontWeight: 600 }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: card.accent }} />
                {card.voice}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
