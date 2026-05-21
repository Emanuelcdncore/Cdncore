"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type StepCopy = {
  badge: string;
  eyebrow: string;
  title: string;
  description: string;
  footLeft: string;
  footRight: string;
};

type Persona = { name: string; desc: string };
type PubItem = { platform: string; kind: string; when: string };

const STEP_ACCENTS = [
  { border: "var(--feather-green)", badge: "var(--feather-green)" },
  { border: "var(--feather-cobalt)", badge: "var(--feather-cobalt)" },
  { border: "var(--feather-tangerine)", badge: "var(--feather-tangerine)" },
];

const CHANNEL_FLAGS = [
  { name: "Instagram", on: true },
  { name: "LinkedIn", on: true },
  { name: "X", on: true },
  { name: "YouTube", on: true },
  { name: "Threads", on: false },
  { name: "Facebook", on: true },
  { name: "Telegram", on: false },
];

const PERSONA_TINTS = [
  { bg: "var(--tint-green)", fg: "var(--feather-green-ink)" },
  { bg: "var(--tint-sky)", fg: "var(--feather-cobalt)" },
  { bg: "var(--tint-green)", fg: "var(--feather-green-ink)" },
];

const PUB_PLATFORM_COLORS: Record<string, string> = {
  Instagram: "linear-gradient(135deg,#f09433,#dc2743,#bc1888)",
  LinkedIn: "#0a66c2",
  X: "var(--ink-1)",
  YouTube: "#ff0000",
  Facebook: "#1877f2",
};

function BriefViz({ comment, text, channelsComment }: { comment: string; text: string; channelsComment: string }) {
  return (
    <div className="p-3.5" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-secondary)" }}>
      <div style={{ color: "var(--fg-tertiary)" }}>{comment}</div>
      <div className="mt-1.5" style={{ color: "var(--ink-1)", fontFamily: "var(--font-sans)", fontSize: 13, lineHeight: 1.5 }}>{text}</div>
      <div className="mt-3.5" style={{ color: "var(--fg-tertiary)", fontSize: 10 }}>{channelsComment}</div>
      <div className="flex flex-wrap gap-1.5 mt-2.5">
        {CHANNEL_FLAGS.map((c) => (
          <span
            key={c.name}
            className="px-2 py-1 rounded-md"
            style={{
              fontSize: 10,
              background: c.on ? "var(--tint-green)" : "#fff",
              border: `1px solid ${c.on ? "var(--feather-green)" : "var(--border-default)"}`,
              color: c.on ? "var(--feather-green-ink)" : "var(--fg-secondary)",
              fontWeight: c.on ? 600 : 400,
            }}
          >
            {c.name}
          </span>
        ))}
      </div>
    </div>
  );
}

function PersonasViz({ personaLabel, languageLabel, personas }: { personaLabel: string; languageLabel: string; personas: Persona[] }) {
  return (
    <div className="p-4 flex flex-col gap-2.5 h-full justify-center">
      <div className="font-bold uppercase" style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.14em", color: "var(--fg-tertiary)" }}>{personaLabel}</div>
      {personas.map((p, i) => {
        const active = i === 2;
        return (
          <div key={p.name} className="flex items-center gap-2.5 p-2.5 bg-white relative" style={{
            border: active ? "1.5px solid var(--feather-green)" : "1px solid var(--border-default)",
            borderRadius: 10,
            boxShadow: active ? "0 0 0 3px var(--tint-green)" : undefined,
          }}>
            <span className="grid place-items-center font-bold flex-shrink-0" style={{ width: 28, height: 28, borderRadius: 8, fontSize: 13, background: PERSONA_TINTS[i].bg, color: PERSONA_TINTS[i].fg }}>
              {p.name.charAt(0)}
            </span>
            <div className="flex-1 min-w-0">
              <div className="font-bold leading-tight" style={{ fontSize: 12, color: "var(--ink-1)" }}>{p.name}</div>
              <div className="mt-0.5" style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--fg-tertiary)", lineHeight: 1.3 }}>{p.desc}</div>
            </div>
            {active && (
              <span className="grid place-items-center text-white font-extrabold flex-shrink-0 ml-auto" style={{ width: 16, height: 16, fontSize: 9, borderRadius: 999, background: "var(--feather-green)" }}>✓</span>
            )}
          </div>
        );
      })}
      <div className="font-bold uppercase mt-1" style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.14em", color: "var(--fg-tertiary)" }}>{languageLabel}</div>
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="px-2.5 py-1.5 rounded-full font-semibold inline-flex items-center gap-1.5" style={{ fontFamily: "var(--font-mono)", fontSize: 10, background: "var(--ink-1)", color: "#fff" }}>
          <span className="font-bold" style={{ fontSize: 10 }}>PT</span>
          Português
        </span>
        <span className="px-2.5 py-1.5 rounded-full font-semibold inline-flex items-center gap-1.5 bg-white" style={{ fontFamily: "var(--font-mono)", fontSize: 10, border: "1px solid var(--border-default)", color: "var(--ink-2)" }}>
          <span className="font-bold" style={{ fontSize: 10 }}>EN</span>
          English
        </span>
        <span className="px-2.5 py-1.5 rounded-full font-semibold bg-white" style={{ fontFamily: "var(--font-mono)", fontSize: 10, border: "1px solid var(--border-default)", color: "var(--ink-2)" }}>+ Other</span>
      </div>
    </div>
  );
}

function PubViz({ items, cta }: { items: PubItem[]; cta: string }) {
  return (
    <div className="p-3.5">
      {items.map((it) => (
        <div key={it.platform} className="flex items-center gap-2 px-2.5 py-1.5 mb-1.5 bg-white" style={{
          border: "1px solid var(--border-default)",
          borderRadius: "var(--r-sm)",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          fontWeight: 500,
        }}>
          <span className="inline-grid place-items-center text-white flex-shrink-0" style={{ width: 16, height: 16, borderRadius: 4, background: PUB_PLATFORM_COLORS[it.platform] || "var(--ink-3)" }}>
            <span style={{ fontSize: 9, fontWeight: 700 }}>{it.platform.charAt(0)}</span>
          </span>
          {it.platform}
          <span style={{ color: "var(--fg-tertiary)" }}>· {it.kind}</span>
          <span className="ml-auto" style={{ color: "var(--fg-tertiary)", fontSize: 10 }}>{it.when}</span>
        </div>
      ))}
      <div className="text-center text-white font-bold mt-2.5" style={{
        padding: 6,
        background: "var(--feather-flame)",
        borderRadius: "var(--r-sm)",
        fontSize: 11,
        fontFamily: "var(--font-sans)",
      }}>
        {cta}
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();
  const steps = t("howItWorks.steps", { returnObjects: true }) as StepCopy[];
  const briefViz = t("howItWorks.briefViz", { returnObjects: true }) as { comment: string; text: string; channelsComment: string };
  const personasViz = t("howItWorks.personasViz", { returnObjects: true }) as { personaLabel: string; languageLabel: string; personas: Persona[] };
  const pubViz = t("howItWorks.pubViz", { returnObjects: true }) as { items: PubItem[]; cta: string };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const headTl = gsap.timeline({
          scrollTrigger: { trigger: "[data-hiw-head]", start: "top 85%", once: true },
        });
        headTl
          .from("[data-hiw-title]", { y: 40, autoAlpha: 0, duration: 0.8, ease: "power4.out" })
          .from("[data-hiw-sub]", { y: 24, autoAlpha: 0, duration: 0.65, ease: "power3.out" }, "-=0.45");

        gsap.set("[data-hiw-step]", { y: 55, autoAlpha: 0, scale: 0.95 });
        ScrollTrigger.batch("[data-hiw-step]", {
          onEnter: (els) => gsap.to(els, {
            autoAlpha: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.4)",
          }),
          start: "top 82%",
          once: true,
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-hiw-title], [data-hiw-sub], [data-hiw-step]", { autoAlpha: 1, clearProps: "all" });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="how-it-works" className="py-24 md:py-32 relative" style={{ background: "var(--paper-2)" }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div data-hiw-head className="max-w-[820px] mb-16">

          <h2 data-hiw-title className="font-extrabold" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4.6vw, 64px)", lineHeight: 1.05, letterSpacing: "-0.025em", color: "var(--ink-1)", visibility: "hidden" }}>
            {t("howItWorks.title")}
            <br />
            <span style={{ color: "var(--feather-cobalt)" }}>{t("howItWorks.titleAccent")}</span>{" "}{t("howItWorks.titleTail")}
          </h2>
          <p data-hiw-sub className="mt-4" style={{ fontSize: 18, lineHeight: 1.5, color: "var(--fg-secondary)", maxWidth: 600, visibility: "hidden" }}>{t("howItWorks.subtitle")}</p>
        </div>

        <div data-hiw-grid className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => {
            const accent = STEP_ACCENTS[i];
            return (
              <div key={i} data-hiw-step className="bg-white flex flex-col overflow-hidden" style={{
                border: "1px solid var(--border-default)",
                borderTop: `3px solid ${accent.border}`,
                borderRadius: "var(--r-xl)",
                visibility: "hidden",
              }}>
                <div className="flex items-center gap-3 px-7 pt-6">
                  <div className="grid place-items-center text-white font-bold flex-shrink-0" style={{ width: 34, height: 34, borderRadius: 9, background: accent.badge, fontFamily: "var(--font-mono)", fontSize: 12 }}>{step.badge}</div>
                  <div className="font-semibold uppercase" style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.12em", color: "var(--fg-tertiary)" }}>{step.eyebrow}</div>
                </div>
                <h3 className="font-bold mx-7 mt-4 mb-2.5" style={{ fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: "-0.02em", color: "var(--ink-1)" }}>{step.title}</h3>
                <p className="mx-7 mb-4" style={{ fontSize: 14, color: "var(--fg-secondary)", lineHeight: 1.55 }}>{step.description}</p>
                <div className="mx-6 mb-5 overflow-hidden" style={{ minHeight: 180, borderRadius: "var(--r-md)", background: "var(--paper-3)", border: "1px solid var(--border-default)" }}>
                  {i === 0 && <BriefViz {...briefViz} />}
                  {i === 1 && <PersonasViz {...personasViz} />}
                  {i === 2 && <PubViz {...pubViz} />}
                </div>
                <div className="flex-1" />
                <div className="mx-7 py-4 flex items-center justify-between font-medium" style={{ borderTop: "1px dashed var(--border-default)", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-tertiary)" }}>
                  <span>{step.footLeft}</span>
                  <span>{step.footRight}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
