"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Tiles = {
  instagramCaption: string;
  storyQuote: string;
  storySwipe: string;
  linkedinAuthor: string;
  linkedinTitle: string;
  linkedinCta: string;
  xName: string;
  xHandle: string;
  xBody: string;
  generatingLabel: string;
  generatingSub: string;
  ytTitleLineOne: string;
  ytTitleLineTwo: string;
  ytSubtitle: string;
  ytMeta: string;
};

const UNSPLASH = {
  igDesk: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=900&auto=format&fit=crop&q=70",
  storyCity: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=700&auto=format&fit=crop&q=70",
  linkedinTeam: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&auto=format&fit=crop&q=70",
  xLaptop: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=900&auto=format&fit=crop&q=70",
  ytPodcast: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1400&auto=format&fit=crop&q=70",
};

function PChip({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 uppercase font-semibold text-white z-10"
      style={{
        background: dark ? "rgba(255,255,255,0.16)" : "rgba(0,0,0,0.55)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        borderRadius: 999,
        fontFamily: "var(--font-mono)",
        fontSize: 9.5,
        letterSpacing: "0.06em",
      }}
    >
      {children}
    </span>
  );
}

function PxBadge({ size, dark = false }: { size: string; dark?: boolean }) {
  return (
    <span
      className="absolute bottom-2.5 right-2.5 px-1.5 py-0.5 text-white font-medium z-10"
      style={{
        background: dark ? "rgba(255,255,255,0.16)" : "rgba(0,0,0,0.4)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        borderRadius: 4,
        fontFamily: "var(--font-mono)",
        fontSize: 9.5,
      }}
    >
      {size}
    </span>
  );
}

function PhotoBg({ src }: { src: string }) {
  return (
    <>
      <div className="absolute inset-0" style={{ backgroundImage: `url('${src}')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.62) 100%)" }} />
    </>
  );
}

export default function Imagery() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();
  const tiles = t("imagery.tiles", { returnObjects: true }) as Tiles;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const headTl = gsap.timeline({
          scrollTrigger: { trigger: "[data-img-head]", start: "top 85%", once: true },
        });
        headTl
          .from("[data-img-title]", { y: 40, autoAlpha: 0, duration: 0.8, ease: "power4.out" })
          .from("[data-img-sub]", { y: 24, autoAlpha: 0, duration: 0.65, ease: "power3.out" }, "-=0.45");

        gsap.from("[data-img-tile]", {
          y: 35, autoAlpha: 0, scale: 0.96, duration: 0.7, stagger: 0.09, ease: "back.out(1.4)",
          scrollTrigger: { trigger: "[data-img-grid]", start: "top 80%", once: true },
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-img-title], [data-img-sub], [data-img-tile]", { autoAlpha: 1, clearProps: "all" });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative" style={{ background: "var(--paper-2)" }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-start">
          <div data-img-grid className="grid grid-cols-3 gap-3.5" style={{ gridAutoRows: 140 }}>
            <div data-img-tile className="relative overflow-hidden bg-white" style={{ borderRadius: "var(--r-md)", boxShadow: "0 12px 32px -16px rgba(15,17,21,0.18), 0 1px 0 rgba(15,17,21,0.04)" }}>
              <PhotoBg src={UNSPLASH.igDesk} />
              <PChip>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 10, height: 10 }}>
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.7" fill="currentColor" />
                </svg>
                IG · 1:1
              </PChip>
              <div className="absolute bottom-7 left-2.5 right-10 z-10 whitespace-pre-line" style={{ fontFamily: "var(--font-display)", color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: "-0.01em", lineHeight: 1.15, textShadow: "0 1px 2px rgba(0,0,0,0.4)" }}>
                {tiles.instagramCaption}
              </div>
              <PxBadge size="1080×1080" />
            </div>

            <div data-img-tile className="relative overflow-hidden bg-white" style={{ gridRow: "span 2", borderRadius: "var(--r-md)", boxShadow: "0 12px 32px -16px rgba(15,17,21,0.18), 0 1px 0 rgba(15,17,21,0.04)" }}>
              <PhotoBg src={UNSPLASH.storyCity} />
              <div className="absolute top-2 left-2 right-2 flex gap-1 z-10">
                {["on", "on", "now", "", ""].map((s, i) => (
                  <span key={i} className="flex-1 rounded relative overflow-hidden" style={{ height: 2, background: "rgba(255,255,255,0.3)" }}>
                    {s === "on" && <span className="absolute inset-0 bg-white" />}
                    {s === "now" && <span className="absolute left-0 top-0 h-full bg-white" style={{ animation: "storyProg 3.4s linear infinite" }} />}
                  </span>
                ))}
              </div>
              <PChip dark>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ width: 10, height: 10 }}>
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
                Story · 9:16
              </PChip>
              <div className="absolute left-3.5 right-3.5 z-10 text-white" style={{ top: "38%", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 15, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                {tiles.storyQuote.split("1M MRR").map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && <em style={{ fontStyle: "normal", background: "#facc15", color: "#1b1300", padding: "0 4px", borderRadius: 3 }}>1M MRR</em>}
                  </span>
                ))}
              </div>
              <div className="absolute bottom-9 left-3.5 text-white font-bold uppercase z-10" style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.08em" }}>{tiles.storySwipe}</div>
              <PxBadge size="1080×1920" dark />
            </div>

            <div data-img-tile className="relative overflow-hidden bg-white" style={{ borderRadius: "var(--r-md)", boxShadow: "0 12px 32px -16px rgba(15,17,21,0.18), 0 1px 0 rgba(15,17,21,0.04)" }}>
              <PhotoBg src={UNSPLASH.linkedinTeam} />
              <PChip dark>
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 10, height: 10 }}>
                  <path d="M4.98 3.5C4.98 4.881 3.87 6 2.5 6S.02 4.881.02 3.5C.02 2.12 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v12H.22V8zm7.5 0h4.37v1.64h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 7v6.74h-4.56v-5.97c0-1.42-.03-3.25-1.98-3.25-1.98 0-2.29 1.55-2.29 3.15V20H7.72V8z" />
                </svg>
                LinkedIn
              </PChip>
              <div className="absolute left-2.5 top-9 flex items-center gap-1.5 z-10">
                <span className="grid place-items-center text-white font-extrabold" style={{ width: 18, height: 18, borderRadius: "50%", background: "linear-gradient(135deg,#fff,#cbe1ff)", fontSize: 9, color: "#0a66c2", fontFamily: "var(--font-display)" }}>M</span>
                <span className="text-white font-semibold" style={{ fontFamily: "var(--font-mono)", fontSize: 8.5 }}>{tiles.linkedinAuthor}</span>
              </div>
              <div className="absolute left-2.5 right-12 z-10 text-white font-extrabold" style={{ top: 58, fontFamily: "var(--font-display)", fontSize: 13, letterSpacing: "-0.015em", lineHeight: 1.1 }}>{tiles.linkedinTitle}</div>
              <span className="absolute left-2.5 bottom-7 inline-flex items-center gap-1 px-2 py-1 font-bold uppercase z-10" style={{ background: "#fff", color: "#0a66c2", borderRadius: 999, fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "0.04em" }}>{tiles.linkedinCta}</span>
              <PxBadge size="1200×627" dark />
            </div>

            <div data-img-tile className="relative overflow-hidden bg-white" style={{ borderRadius: "var(--r-md)", boxShadow: "0 12px 32px -16px rgba(15,17,21,0.18), 0 1px 0 rgba(15,17,21,0.04)" }}>
              <PhotoBg src={UNSPLASH.xLaptop} />
              <PChip dark>
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 10, height: 10 }}>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                X · 16:9
              </PChip>
              <div className="absolute left-3 top-7 flex items-center gap-1.5 z-10">
                <span className="grid place-items-center text-white font-extrabold" style={{ width: 18, height: 18, borderRadius: "50%", background: "linear-gradient(135deg,#1d9bf0,#0b6dab)", fontSize: 9, fontFamily: "var(--font-display)" }}>J</span>
                <span className="text-white font-extrabold" style={{ fontFamily: "var(--font-display)", fontSize: 10, letterSpacing: "-0.01em" }}>{tiles.xName}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#71808d" }}>{tiles.xHandle}</span>
              </div>
              <div className="absolute left-3 right-3.5 z-10 text-white font-medium" style={{ top: 50, fontFamily: "var(--font-display)", fontSize: 11.5, lineHeight: 1.25, letterSpacing: "-0.005em" }}>{tiles.xBody}</div>
              <PxBadge size="1600×900" dark />
            </div>

            <div data-img-tile className="relative overflow-hidden grid place-items-center" style={{ background: "linear-gradient(180deg,#fff,var(--paper-3))", border: "1px dashed var(--feather-green)", borderRadius: "var(--r-md)", padding: 14 }}>
              <div className="flex flex-col items-center gap-2.5 text-center">
                <div className="rounded-full" style={{ width: 30, height: 30, border: "2.5px solid var(--tint-green)", borderTopColor: "var(--feather-green)", animation: "spin 1s linear infinite" }} />
                <div className="font-bold uppercase" style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--feather-green-ink)", letterSpacing: "0.06em" }}>{tiles.generatingLabel}</div>
                <div className="font-medium" style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--fg-tertiary)" }}>{tiles.generatingSub}</div>
                <div className="relative overflow-hidden" style={{ width: "80%", height: 3, background: "var(--paper-4)", borderRadius: 999 }}>
                  <span className="absolute top-0" style={{ left: "-30%", height: "100%", width: "30%", background: "linear-gradient(90deg, transparent, var(--feather-green), transparent)", animation: "genbar 1.6s ease-in-out infinite" }} />
                </div>
              </div>
            </div>

            <div data-img-tile className="relative overflow-hidden bg-white" style={{ gridColumn: "span 2", borderRadius: "var(--r-md)", boxShadow: "0 12px 32px -16px rgba(15,17,21,0.18), 0 1px 0 rgba(15,17,21,0.04)" }}>
              <PhotoBg src={UNSPLASH.ytPodcast} />
              <PChip dark>
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 10, height: 10 }}>
                  <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6z" />
                </svg>
                YT · cover
              </PChip>
              <div className="absolute left-4.5 z-10 text-white font-black uppercase" style={{ top: "42%", transform: "translateY(-50%)", fontFamily: "var(--font-display)", fontSize: 22, lineHeight: 0.98, letterSpacing: "-0.03em", maxWidth: "60%", left: 18 }}>
                {tiles.ytTitleLineOne}<br />
                <span style={{ color: "#ff3030" }}>{tiles.ytTitleLineTwo}</span>
                <span className="block" style={{ fontSize: 11, color: "#fff", marginTop: 6, letterSpacing: "0.04em", fontWeight: 700 }}>{tiles.ytSubtitle}</span>
              </div>
              <div className="absolute bottom-6 left-4.5 flex items-center gap-1.5 z-10" style={{ left: 18 }}>
                <span className="rounded-full" style={{ width: 14, height: 14, background: "#ff3030" }} />
                <span className="uppercase font-semibold text-white" style={{ fontFamily: "var(--font-mono)", fontSize: 9, opacity: 0.7, letterSpacing: "0.06em" }}>{tiles.ytMeta}</span>
              </div>
              <div className="absolute right-5 z-10 rounded-full grid place-items-center" style={{ top: "50%", transform: "translateY(-50%)", width: 42, height: 42, background: "rgba(255,48,48,0.95)", boxShadow: "0 8px 28px rgba(255,48,48,0.35)", animation: "ytfloat 3s ease-in-out infinite" }}>
                <span style={{ width: 0, height: 0, borderLeft: "14px solid #fff", borderTop: "9px solid transparent", borderBottom: "9px solid transparent", marginLeft: 3 }} />
              </div>
              <PxBadge size="1280×720" dark />
            </div>
          </div>

          <div data-img-head>

            <h2 data-img-title className="font-extrabold mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4.6vw, 64px)", lineHeight: 1.05, letterSpacing: "-0.025em", color: "var(--ink-1)", visibility: "hidden" }}>
              {t("imagery.title")} <span style={{ color: "var(--feather-flame)" }}>{t("imagery.titleAccent")}</span><br />
              {t("imagery.titleTail")}
            </h2>
            <p data-img-sub style={{ fontSize: 18, lineHeight: 1.5, color: "var(--fg-secondary)", maxWidth: 540, visibility: "hidden" }}>{t("imagery.subtitle")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
