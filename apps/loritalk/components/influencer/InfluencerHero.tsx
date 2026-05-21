"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { onCtaClick } from "@/lib/fbAttribution";

type PlatformId = "instagram" | "tiktok" | "youtube" | "x" | "threads" | "linkedin";

type PlatformCard = {
  id: PlatformId;
  label: string;
  format: string;
  accent: string;
  tint: string;
  bg: string;
  iconPath: string;
  pos: { top?: string; bottom?: string; left?: string; right?: string };
};

const ICONS: Record<PlatformId, { bg: string; path: string }> = {
  instagram: {
    bg: "linear-gradient(135deg,#f58529,#dd2a7b 50%,#8134af)",
    path: "M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 5.3a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 7.4a2.9 2.9 0 110-5.8 2.9 2.9 0 010 5.8zm5.7-7.6a1.05 1.05 0 100-2.1 1.05 1.05 0 000 2.1z",
  },
  tiktok: { bg: "#000", path: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-6.99 6.84 6.84 6.84 0 0011.64 4.84 6.84 6.84 0 002-4.84V8.21a8.16 8.16 0 004.77 1.52V6.31a4.85 4.85 0 01-2.19-.38z" },
  youtube: { bg: "#ff0000", path: "M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6z" },
  x: { bg: "#000", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
  threads: { bg: "#000", path: "M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.781 3.631 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 013.02.142c-.126-.742-.375-1.332-.749-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.32.143 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 00-2.215-.221z" },
  linkedin: { bg: "#0a66c2", path: "M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3v9zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" },
};

const PLATFORM_CARDS: PlatformCard[] = [
  { id: "instagram", label: "Instagram",  format: "Reel · 1:1 caption", accent: "var(--feather-tangerine)", tint: "var(--tint-tangerine)", bg: ICONS.instagram.bg, iconPath: ICONS.instagram.path, pos: { top: "0%", left: "-6%" } },
  { id: "tiktok",    label: "TikTok",     format: "Script · 9:16",      accent: "var(--feather-flame)",     tint: "var(--tint-flame)",     bg: ICONS.tiktok.bg,    iconPath: ICONS.tiktok.path,    pos: { top: "8%", right: "-4%" } },
  { id: "youtube",   label: "YT Shorts",  format: "Hook · ≤100s",       accent: "#ff0000",                  tint: "#ffe8e8",               bg: ICONS.youtube.bg,   iconPath: ICONS.youtube.path,   pos: { top: "44%", left: "-10%" } },
  { id: "x",         label: "X",          format: "Thread · 280",       accent: "var(--ink-1)",             tint: "var(--paper-3)",        bg: ICONS.x.bg,         iconPath: ICONS.x.path,         pos: { bottom: "4%", right: "-2%" } },
  { id: "threads",   label: "Threads",    format: "Native post",         accent: "var(--ink-1)",             tint: "var(--paper-3)",        bg: ICONS.threads.bg,   iconPath: ICONS.threads.path,   pos: { bottom: "-2%", left: "10%" } },
];

export default function InfluencerHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const { t } = useTranslation();

  const trustItems = t("influencer.hero.trust", { returnObjects: true }) as string[];

  useEffect(() => {
    const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

      if (reduced) {
        gsap.set("[data-ihero-badge], [data-ihero-line], [data-ihero-lead], [data-ihero-cta], [data-ihero-trust], [data-ihero-hub]", { autoAlpha: 1, clearProps: "all" });
        gsap.set(cards, { opacity: 1, scale: 1, clearProps: "transform,opacity" });
        drawConnectors();
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-ihero-badge]", { y: -30, autoAlpha: 0, duration: 0.6, ease: "back.out(2)" });
      tl.from("[data-ihero-line]", { y: 30, autoAlpha: 0, duration: 0.7, stagger: 0.12 }, "-=0.25");
      tl.from("[data-ihero-lead]", { y: 20, autoAlpha: 0, duration: 0.5 }, "-=0.3");
      tl.from("[data-ihero-cta]", { scale: 0.9, autoAlpha: 0, duration: 0.5, stagger: 0.08, ease: "back.out(2)" }, "-=0.2");
      tl.from("[data-ihero-trust]", { y: 12, autoAlpha: 0, duration: 0.5, stagger: 0.06 }, "-=0.2");
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
      path.setAttribute("stroke", "#ff9852");
      path.setAttribute("stroke-width", "1.4");
      path.setAttribute("fill", "none");
      path.setAttribute("stroke-dasharray", "4 5");
      path.setAttribute("opacity", "0.55");
      svg.appendChild(path);
    });
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden pt-28 pb-16 md:pb-24" style={{ background: "var(--paper-2)" }}>
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute rounded-full blur-3xl opacity-35" style={{ width: 600, height: 600, top: -200, left: -200, background: "var(--feather-tangerine)", mixBlendMode: "multiply", animation: "floatBlob 16s ease-in-out infinite" }} />
        <div className="absolute rounded-full blur-3xl opacity-30" style={{ width: 500, height: 500, top: -100, right: -100, background: "var(--feather-flame)", mixBlendMode: "multiply", animation: "floatBlob 16s ease-in-out -4s infinite" }} />
        <div className="absolute rounded-full blur-3xl opacity-25" style={{ width: 400, height: 400, bottom: -100, right: "20%", background: "var(--feather-sky)", mixBlendMode: "multiply", animation: "floatBlob 16s ease-in-out -8s infinite" }} />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-8 grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-20 items-center">
        <div>
          <div data-ihero-badge className="inline-flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full text-xs font-semibold bg-white border" style={{ borderColor: "var(--border-default)", color: "var(--fg-secondary)", boxShadow: "var(--shadow-sm)", visibility: "hidden" }}>
            <span className="relative w-[18px] h-[18px] grid place-items-center rounded-full" style={{ background: "var(--feather-flame)" }}>
              <span className="w-[7px] h-[7px] rounded-full bg-white" />
              <span className="absolute inset-0 rounded-full" style={{ background: "var(--feather-flame)", animation: "pulseRing 2s ease-out infinite", opacity: 0.6 }} />
            </span>
            {t("influencer.hero.badge")}
          </div>

          <h1 className="mt-6 mb-7 font-extrabold" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 5.6vw, 80px)", lineHeight: 1.02, letterSpacing: "-0.035em", color: "var(--ink-1)" }}>
            <span data-ihero-line className="block">{t("influencer.hero.headlineOne")}</span>
            <span data-ihero-line className="block">
              <span style={{ background: "var(--feather-gradient)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", display: "inline-block" }}>{t("influencer.hero.headlineTwo")}</span>
            </span>
            <span data-ihero-line className="block" style={{ color: "var(--ink-3)" }}>{t("influencer.hero.headlineThree")}</span>
          </h1>

          <p data-ihero-lead className="text-lg leading-relaxed max-w-[560px] mb-8" style={{ color: "var(--fg-secondary)", visibility: "hidden" }} dangerouslySetInnerHTML={{ __html: t("influencer.hero.lead") }} />

          <div className="flex flex-wrap items-center gap-3">
            <a data-ihero-cta href="https://app.lori-talk.eu/register?plan=starter&cycle=yearly" onClick={onCtaClick()} className="inline-flex items-center gap-2 rounded-full font-semibold text-sm text-white transition-transform" style={{ padding: "14px 24px", background: "var(--feather-flame)", visibility: "hidden" }}>
              {t("influencer.hero.ctaPrimary")}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
            <a data-ihero-cta href="#influencer-plans" className="inline-flex items-center gap-2 rounded-full font-semibold text-sm transition-colors" style={{ padding: "14px 22px", border: "1px solid var(--border-default)", color: "var(--ink-1)", visibility: "hidden" }}>
              {t("influencer.hero.ctaSecondary")}
            </a>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-5 text-sm" style={{ color: "var(--fg-tertiary)" }}>
            {trustItems.map((item, i) => (
              <span key={i} data-ihero-trust className="inline-flex items-center gap-1.5" style={{ visibility: "hidden" }}>
                <span className="inline-grid place-items-center text-white font-extrabold" style={{ width: 16, height: 16, fontSize: 9, borderRadius: 999, background: "var(--feather-flame)" }}>✓</span>
                {item}
              </span>
            ))}
          </div>
        </div>

        <div ref={stageRef} className="relative hidden lg:block" style={{ height: 600 }}>
          <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }} />

          <div ref={hubRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-5" style={{ width: 260, border: "1px solid var(--border-default)", borderRadius: "var(--r-lg)", boxShadow: "var(--shadow-pop)", zIndex: 5, visibility: "hidden" }}>
            <div className="flex items-center gap-2 mb-3 uppercase font-semibold" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-tertiary)", letterSpacing: "0.06em" }}>
              <span className="grid place-items-center" style={{ width: 18, height: 18, borderRadius: 6, background: "var(--tint-flame)", color: "var(--feather-flame-hi)" }}>★</span>
              {t("influencer.hero.hubLabel")}
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.1, color: "var(--ink-1)", letterSpacing: "-0.02em" }}>
              {t("influencer.hero.hubTitle")}
            </div>
            <div style={{ marginTop: 10, fontSize: 12.5, color: "var(--fg-secondary)", lineHeight: 1.5 }}>
              {t("influencer.hero.hubBody")}
            </div>
            <div className="mt-4 pt-3 flex justify-between items-center" style={{ borderTop: "1px dashed var(--border-default)", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-tertiary)" }}>
              <span>{t("influencer.hero.hubMeta")}</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 font-semibold text-white rounded-full" style={{ background: "var(--feather-flame)", fontSize: 11 }}>{t("influencer.hero.hubBadge")}</span>
            </div>
          </div>

          {PLATFORM_CARDS.map((card, i) => (
            <div
              key={card.id}
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
                <span className="inline-grid place-items-center rounded-md text-white" style={{ width: 28, height: 28, background: card.bg }}>
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14, color: "#fff" }}>
                    <path d={card.iconPath} />
                  </svg>
                </span>
                <div className="flex flex-col">
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink-1)", lineHeight: 1.1 }}>{card.label}</span>
                  <span style={{ fontSize: 10.5, color: "var(--fg-tertiary)", lineHeight: 1.1 }}>{card.format}</span>
                </div>
              </div>
              <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: card.tint, color: "var(--ink-2)", fontSize: 10.5, fontWeight: 600 }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: card.accent }} />
                {t("influencer.hero.cardTag")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
