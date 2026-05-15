"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const BP = ""; // BASE_PATH placeholder

export default function Differentiator() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: full pinned horizontal scroll animation
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const container = scrollRef.current!;
        const nodes = gsap.utils.toArray<HTMLElement>("[data-node]");
        const connectors = gsap.utils.toArray<HTMLElement>("[data-connector]");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "[data-pipeline]",
            start: "top 10%",
            end: "+=3030",
            scrub: 0.8,
            pin: true,
            pinSpacing: true,
          },
        });

        // Heading
        tl.from("[data-diff-title]", { y: 30, autoAlpha: 0, duration: 1.5, ease: "power3.out" });
        tl.from("[data-diff-sub]", { y: 20, autoAlpha: 0, duration: 1, ease: "power3.out" }, "-=0.5");

        // Each node pops in → inner elements animate → connector draws → next
        nodes.forEach((node, i) => {
          // Node entrance
          tl.from(node, { scale: 0.6, y: 40, autoAlpha: 0, duration: 2, ease: "back.out(2)" });

          // Auto-scroll to center on this node
          tl.to(container, {
            scrollLeft: () => Math.max(0, node.offsetLeft + node.offsetWidth / 2 - container.offsetWidth / 2),
            duration: 1.5,
            ease: "power2.inOut",
          }, "<0.5");

          // Typing animation on brief card
          const typingEl = node.querySelector("[data-typing]");
          if (typingEl) {
            const cursor = typingEl.querySelector("[data-cursor]");
            tl.to(typingEl, {
              text: { value: '"Launch of our new sustainable sneaker collection targeting Gen Z across all social channels"', delimiter: "" },
              duration: 4,
              ease: "none",
            }, ">-0.5");
            // Hide cursor after typing
            if (cursor) {
              tl.to(cursor, { autoAlpha: 0, duration: 0.3 }, ">");
            }
          }

          // Inner elements appear one by one
          const inners = node.querySelectorAll("[data-inner]");
          if (inners.length) {
            tl.from(inners, {
              autoAlpha: 0,
              y: 10,
              duration: 1.5,
              stagger: 0.8,
              ease: "power2.out",
            }, ">-0.3");
          }

          // Progress bars fill — very slow, satisfying
          const bars = node.querySelectorAll("[data-bar]");
          bars.forEach((bar) => {
            tl.from(bar, { scaleX: 0, transformOrigin: "left center", duration: 4, ease: "power1.inOut" }, "<0.3");
          });

          // Skeleton pulse: hide skeleton after bar fills
          const skeletons = node.querySelectorAll("[data-skeleton]");
          if (skeletons.length) {
            tl.to(skeletons, { autoAlpha: 0, duration: 0.6, ease: "power2.out" }, ">0.3");
          }

          // Reveal content hidden behind skeleton
          const reveals = node.querySelectorAll("[data-reveal]");
          if (reveals.length) {
            tl.from(reveals, { autoAlpha: 0, y: 5, duration: 1, stagger: 0.3, ease: "power2.out" }, "<0.2");
          }

          // Check marks pop after everything
          const checks = node.querySelectorAll("[data-check]");
          if (checks.length) {
            tl.from(checks, { scale: 0, autoAlpha: 0, duration: 0.8, stagger: 0.4, ease: "back.out(3)" }, ">0.5");
          }

          // Pause between stages
          tl.to({}, { duration: 0.5 });

          // Connector
          if (i < connectors.length) {
            tl.from(connectors[i], { scaleX: 0, autoAlpha: 0, transformOrigin: "left center", duration: 1, ease: "power2.out" }, ">-0.2");
          }
        });

        // Explanation
        gsap.from("[data-diff-explain]", {
          y: 20, autoAlpha: 0, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: "[data-diff-explain]", start: "top 90%", once: true },
        });
      });

      // Mobile: everything visible, just simple fade-in on scroll
      mm.add("(max-width: 767px)", () => {
        // Show everything immediately — clear all visibility:hidden
        gsap.set("[data-diff-title], [data-diff-sub], [data-node], [data-connector], [data-diff-explain], [data-inner], [data-bar], [data-check], [data-reveal], [data-skeleton]", { autoAlpha: 1, clearProps: "transform,scale" });
        // Hide skeletons on mobile (show final content directly)
        gsap.set("[data-skeleton]", { autoAlpha: 0 });
        // Simple fade-in for each node as it enters viewport
        gsap.utils.toArray<HTMLElement>("[data-node]").forEach((node) => {
          gsap.from(node, {
            opacity: 0, y: 20, duration: 0.5, ease: "power2.out",
            scrollTrigger: { trigger: node, start: "top 90%", once: true },
          });
          // Typing on brief card
          const typingEl = node.querySelector("[data-typing]");
          if (typingEl) {
            const cursor = typingEl.querySelector("[data-cursor]");
            ScrollTrigger.create({
              trigger: node,
              start: "top 90%",
              once: true,
              onEnter: () => {
                gsap.to(typingEl, {
                  text: { value: '"Launch of our new sustainable sneaker collection targeting Gen Z across all social channels"', delimiter: "" },
                  duration: 2,
                  ease: "none",
                  onComplete: () => { if (cursor) gsap.to(cursor, { autoAlpha: 0, duration: 0.3 }); },
                });
              },
            });
          }
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-diff-title], [data-diff-sub], [data-node], [data-connector], [data-diff-explain], [data-inner], [data-bar], [data-check], [data-reveal]", { autoAlpha: 1, clearProps: "all" });
        gsap.set("[data-skeleton]", { autoAlpha: 0 });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white overflow-hidden">
      <div data-pipeline className="pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <div className="text-center">
            <h2 data-diff-title className="text-3xl md:text-4xl font-bold mb-4" style={{ visibility: "hidden" }}>
              Why multiple AIs beat a single one
            </h2>
            <p data-diff-sub className="text-lg text-black/55 font-normal max-w-xl mx-auto" style={{ visibility: "hidden" }}>
              Other tools use one model. Loritalk uses several — and makes them improve each other.
            </p>
          </div>
        </div>

        <div ref={scrollRef} className="md:overflow-x-auto pb-6" style={{ scrollbarWidth: "none" }}>
          <div className="flex flex-col items-center gap-3 px-4 py-4 md:flex-row md:gap-0 md:items-center md:px-16 md:mx-auto md:w-max">

            {/* ═══ 1. BRIEF ═══ */}
            <div data-node className="flex-shrink-0 w-full md:w-[clamp(220px,20vw,300px)]" style={{ visibility: "hidden" }}>
              <div className="bg-white rounded-2xl border-2 border-black/10 shadow-sm overflow-hidden">
                <div className="px-4 py-2.5 border-b border-black/5 flex items-center gap-2">
                  <span className="material-icons-round text-sm" style={{ color: "#94BF5C" }}>edit_note</span>
                  <span className="text-xs font-semibold text-black/50">{t("differentiator.briefLabel")}</span>
                  <span className="ml-auto text-[10px] text-black/25">1/6</span>
                </div>
                <div className="p-4 flex flex-col gap-3">
                  <p data-typing className="text-xs text-black/70 leading-relaxed italic min-h-[2.5rem]">
                    <span className="inline-block w-px h-3.5 bg-black/40 animate-pulse align-middle" data-cursor />
                  </p>
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] text-black/35 font-medium">{t("differentiator.channels")}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { name: "Instagram", logo: "instagram", color: "#E4405F" },
                        { name: "LinkedIn", logo: "linkedin", color: "#0A66C2" },
                        { name: "X", logo: "x", color: "#000000" },
                        { name: "TikTok", logo: "tiktok", color: "#000000" },
                        { name: "Facebook", logo: "facebook", color: "#1877F2" },
                      ].map((ch) => (
                        <div key={ch.name} data-inner className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-full font-medium" style={{ visibility: "hidden", backgroundColor: ch.color + "12", color: ch.color, border: `1px solid ${ch.color}25` }}>
                          <img src={`${BP}/logos/${ch.logo}.svg`} alt={ch.name} className="w-3 h-3" />
                          {ch.name}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-black/35">{t("differentiator.language")}</span>
                    <span data-inner className="text-[10px] font-medium text-black/60" style={{ visibility: "hidden" }}>{t("differentiator.languages")}</span>
                  </div>
                  <div data-inner className="text-[10px] text-black/25 flex items-center gap-1" style={{ visibility: "hidden" }}>
                    <span className="material-icons-round text-xs">schedule</span>
                    {t("differentiator.submitted")}
                  </div>
                </div>
              </div>
            </div>

            <FanOut color1="#94BF5C" color2="#5D92E8" />

            {/* ═══ 2. AI MODELS — Round 1 ═══ */}
            <div data-node className="flex-shrink-0 flex flex-col gap-2 w-full md:w-[clamp(240px,22vw,340px)]" style={{ visibility: "hidden" }}>
              <span className="text-[10px] font-semibold px-3 py-1 rounded-full bg-black/5 text-black/30 self-center">{t("differentiator.round1")}</span>
              {[
                { name: "Lori-Standard", text: "Step into the future of fashion. Our sustainable sneakers prove eco-conscious choices don\u2019t mean compromising style. \ud83d\udc5f\u2728 #SustainableFashion", time: "1.2s" },
                { name: "Lori-DeepThink", text: "We\u2019re proud to announce our most eco-friendly collection. Built from 80% recycled materials, designed for Gen Z streets.", time: "1.8s" },
                { name: "Lori-Professional", text: "Sustainability meets Gen Z style. Introducing sneakers crafted from ocean plastic and recycled rubber. The future is here.", time: "1.4s" },
              ].map((m) => (
                <div key={m.name} className="bg-white rounded-xl border border-black/8 shadow-sm overflow-hidden">
                  <div className="px-3 py-1.5 border-b border-black/5 flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-black/60">{m.name}</span>
                    <span data-inner className="ml-auto text-[10px] text-black/25 flex items-center gap-0.5" style={{ visibility: "hidden" }}>
                      <span className="material-icons-round text-[10px]">timer</span>
                      {m.time}
                    </span>
                  </div>
                  <div className="p-3 flex flex-col gap-2">
                    {/* Loading bar */}
                    <div className="h-1.5 rounded-full bg-black/5 overflow-hidden">
                      <div data-bar className="h-full rounded-full" style={{ backgroundColor: "#94BF5C", width: "100%" }} />
                    </div>
                    {/* Skeleton + real text stacked in same space */}
                    <div className="relative">
                      {/* Skeleton — absolute so it doesn't push layout */}
                      <div data-skeleton className="absolute inset-0 flex flex-col gap-1.5 z-10">
                        <div className="h-2.5 rounded w-full" style={{ animation: "shimmer 1.5s infinite", background: "linear-gradient(90deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.08) 50%, rgba(0,0,0,0.04) 100%)", backgroundSize: "200% 100%" }} />
                        <div className="h-2.5 rounded w-4/5" style={{ animation: "shimmer 1.5s infinite 0.2s", background: "linear-gradient(90deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.08) 50%, rgba(0,0,0,0.04) 100%)", backgroundSize: "200% 100%" }} />
                        <div className="h-2.5 rounded w-3/5" style={{ animation: "shimmer 1.5s infinite 0.4s", background: "linear-gradient(90deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.08) 50%, rgba(0,0,0,0.04) 100%)", backgroundSize: "200% 100%" }} />
                      </div>
                      {/* Real text — same space, revealed after skeleton hides */}
                      <p data-reveal className="text-[11px] text-black/55 leading-relaxed" style={{ visibility: "hidden" }}>{m.text}</p>
                    </div>
                    <div data-inner className="flex items-center gap-1" style={{ visibility: "hidden" }}>
                      <span data-check className="material-icons-round text-xs" style={{ color: "#94BF5C", visibility: "hidden" }}>check_circle</span>
                      <span className="text-[10px] text-black/30">{t("differentiator.generated")}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <FanIn color1="#5D92E8" color2="#FF9852" />

            {/* ═══ 3. REFINEMENT — Round 2 ═══ */}
            <div data-node className="flex-shrink-0 w-full md:w-[clamp(230px,21vw,310px)]" style={{ visibility: "hidden" }}>
              <div className="bg-white rounded-2xl border-2 shadow-sm overflow-hidden" style={{ borderColor: "#5D92E8" }}>
                <div className="px-4 py-2.5 border-b border-black/5 flex items-center gap-2" style={{ backgroundColor: "#5D92E810" }}>
                  <span className="material-icons-round text-sm" style={{ color: "#5D92E8" }}>sync</span>
                  <span className="text-xs font-semibold text-black/50">{t("differentiator.round2")}</span>
                  <span className="ml-auto text-[10px] text-black/25">3/6</span>
                </div>
                <div className="p-4 flex flex-col gap-2.5">
                  <p data-inner className="text-[11px] text-black/40 leading-relaxed" style={{ visibility: "hidden" }}>{t("differentiator.round2Desc")}</p>
                  {[
                    { name: "Lori-Standard" },
                    { name: "Lori-DeepThink" },
                    { name: "Lori-Professional" },
                  ].map((m) => (
                    <div key={m.name} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/[0.03]">
                      <span className="text-[11px] font-medium text-black/55">{m.name}</span>
                      <div className="flex-1 h-1 rounded-full bg-black/5 overflow-hidden mx-1">
                        <div data-bar className="h-full rounded-full" style={{ backgroundColor: "#5D92E8", width: "100%" }} />
                      </div>
                      <span data-check className="material-icons-round text-xs" style={{ color: "#94BF5C", visibility: "hidden" }}>check_circle</span>
                    </div>
                  ))}
                  <div data-inner className="text-[10px] text-black/25 flex items-center gap-1 pt-1" style={{ visibility: "hidden" }}>
                    <span className="material-icons-round text-xs">auto_awesome</span>
                    {t("differentiator.qualityNote")}
                  </div>
                </div>
              </div>
            </div>

            <Connector color1="#FF9852" color2="#94BF5C" />

            {/* ═══ 4. PICK & EDIT ═══ */}
            <div data-node className="flex-shrink-0 w-full md:w-[clamp(240px,22vw,330px)]" style={{ visibility: "hidden" }}>
              <div className="bg-white rounded-2xl border-2 border-black/10 shadow-sm overflow-hidden">
                <div className="px-4 py-2.5 border-b border-black/5 flex items-center gap-2">
                  <span className="material-icons-round text-sm" style={{ color: "#94BF5C" }}>touch_app</span>
                  <span className="text-xs font-semibold text-black/50">{t("differentiator.pickEdit")}</span>
                  <span className="ml-auto text-[10px] text-black/25">4/6</span>
                </div>
                <div className="p-4 flex flex-col gap-3">
                  {/* Instagram — show 3 text options, 1 selected */}
                  <div data-inner style={{ visibility: "hidden" }}>
                    <div className="flex items-center gap-1.5 mb-2">
                      <img src={`${BP}/logos/instagram.svg`} alt="Instagram" className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-semibold text-black/60">Instagram</span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      {/* Selected */}
                      <div className="px-3 py-2 rounded-lg border-2 relative" style={{ borderColor: "#94BF5C", backgroundColor: "#94BF5C08" }}>
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-[10px] font-medium text-black/40">Lori-Standard</span>
                          <span data-check className="material-icons-round text-xs ml-auto" style={{ color: "#94BF5C", visibility: "hidden" }}>check_circle</span>
                        </div>
                        <p className="text-[10px] text-black/60 leading-relaxed">Step into the future of fashion. Sustainable sneakers that prove eco-conscious choices don&apos;t compromise style. &#x1f45f;&#x2728;</p>
                      </div>
                      {/* Not selected */}
                      <div className="px-3 py-2 rounded-lg border border-black/6 opacity-50">
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-[10px] text-black/30">Lori-DeepThink</span>
                        </div>
                        <p className="text-[10px] text-black/35 leading-relaxed line-clamp-2">We&apos;re proud to announce our most eco-friendly collection yet...</p>
                      </div>
                      <div className="px-3 py-2 rounded-lg border border-black/6 opacity-50">
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-[10px] text-black/30">Lori-Professional</span>
                        </div>
                        <p className="text-[10px] text-black/35 leading-relaxed line-clamp-2">Sustainability meets Gen Z style. Introducing sneakers crafted from ocean plastic...</p>
                      </div>
                    </div>
                  </div>
                  {/* Other platforms — compact */}
                  {[
                    { net: "LinkedIn", logo: "linkedin", model: "Lori-DeepThink", selected: true },
                    { net: "X", logo: "x", model: "Lori-Standard", selected: true },
                    { net: "TikTok", logo: "tiktok", model: "Lori-Professional", selected: false },
                  ].map((r) => (
                    <div
                      key={r.net}
                      data-inner
                      className="flex items-center gap-2 px-3 py-2 rounded-lg border"
                      style={{
                        visibility: "hidden",
                        borderColor: r.selected ? "#94BF5C" : "rgba(0,0,0,0.08)",
                        backgroundColor: r.selected ? "#94BF5C08" : "transparent",
                      }}
                    >
                      <img src={`${BP}/logos/${r.logo}.svg`} alt={r.net} className="w-3.5 h-3.5" />
                      <span className="text-[11px] text-black/60">{r.net}</span>
                      <span className="text-[10px] text-black/30 ml-auto">{r.model}</span>
                      {r.selected && <span data-check className="material-icons-round text-xs" style={{ color: "#94BF5C", visibility: "hidden" }}>check</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Connector color1="#94BF5C" color2="#FF9852" />

            {/* ═══ 5. ADD MEDIA ═══ */}
            <div data-node className="flex-shrink-0 w-full md:w-[clamp(210px,19vw,280px)]" style={{ visibility: "hidden" }}>
              <div className="bg-white rounded-2xl border-2 border-black/10 shadow-sm overflow-hidden">
                <div className="px-4 py-2.5 border-b border-black/5 flex items-center gap-2">
                  <span className="material-icons-round text-sm" style={{ color: "#FF9852" }}>image</span>
                  <span className="text-xs font-semibold text-black/50">{t("differentiator.addMedia")}</span>
                  <span className="ml-auto text-[10px] text-black/25">5/6</span>
                </div>
                <div className="p-4 flex flex-col gap-3">
                  {/* Upload progress bar */}
                  <div data-inner style={{ visibility: "hidden" }}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-black/40">{t("differentiator.uploading")}</span>
                      <span className="text-[10px] text-black/25">100%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-black/5 overflow-hidden">
                      <div data-bar className="h-full rounded-full" style={{ backgroundColor: "#FF9852", width: "100%" }} />
                    </div>
                  </div>
                  {/* Skeleton + real image in same space */}
                  <div className="relative w-full rounded-xl overflow-hidden">
                    {/* Skeleton — absolute overlay */}
                    <div data-skeleton className="absolute inset-0 z-10 rounded-xl" style={{ backgroundColor: "#f0f0f0" }}>
                      <div className="absolute inset-0" style={{ animation: "shimmer 1.5s infinite", background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)", backgroundSize: "200% 100%" }} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="material-icons-round text-2xl text-black/15">image</span>
                      </div>
                    </div>
                    {/* Real image behind skeleton */}
                    <div data-reveal style={{ visibility: "hidden" }}>
                      <img src={`${BP}/demo-sneaker.png`} alt="Product" className="w-full h-auto border border-black/5 rounded-xl" />
                    </div>
                  </div>
                  <div data-inner className="flex items-center gap-2" style={{ visibility: "hidden" }}>
                    <span data-check className="material-icons-round text-xs" style={{ color: "#94BF5C", visibility: "hidden" }}>check_circle</span>
                    <span className="text-[10px] text-black/40">{t("differentiator.imageAttached")}</span>
                  </div>
                  <div data-inner className="flex gap-2" style={{ visibility: "hidden" }}>
                    <div className="flex-1 py-1.5 rounded-lg text-[10px] font-semibold text-white text-center" style={{ backgroundColor: "#FF9852" }}>
                      <span className="material-icons-round text-xs align-middle mr-0.5">auto_awesome</span>
                      {t("differentiator.generateAI")}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Connector color1="#FF9852" color2="#94BF5C" />

            {/* ═══ 6. PUBLISH ═══ */}
            <div data-node className="flex-shrink-0 w-full md:w-[clamp(210px,19vw,280px)]" style={{ visibility: "hidden" }}>
              <div className="bg-white rounded-2xl border-2 shadow-md overflow-hidden" style={{ borderColor: "#94BF5C" }}>
                <div className="px-4 py-2.5 border-b flex items-center gap-2" style={{ backgroundColor: "#94BF5C10", borderColor: "#94BF5C20" }}>
                  <span className="material-icons-round text-sm" style={{ color: "#94BF5C" }}>rocket_launch</span>
                  <span className="text-xs font-semibold text-black/50">{t("differentiator.readyPublish")}</span>
                  <span className="ml-auto text-[10px] text-black/25">6/6</span>
                </div>
                <div className="p-4 flex flex-col gap-2.5">
                  {[
                    { net: "Instagram", logo: "instagram", time: "Today, 14:00", statusKey: "scheduled" },
                    { net: "LinkedIn", logo: "linkedin", time: "Today, 15:30", statusKey: "scheduled" },
                    { net: "X", logo: "x", time: "Today, 16:00", statusKey: "draft" },
                    { net: "TikTok", logo: "tiktok", time: "Today, 17:00", statusKey: "scheduled" },
                  ].map((ch) => (
                    <div key={ch.net} data-inner className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/[0.03]" style={{ visibility: "hidden" }}>
                      <img src={`${BP}/logos/${ch.logo}.svg`} alt={ch.net} className="w-3 h-3" />
                      <span className="text-[11px] font-medium text-black/60">{ch.net}</span>
                      <span className="text-[10px] text-black/25 ml-auto">{ch.time}</span>
                      <span
                        className="text-[9px] font-semibold px-1.5 py-0.5 rounded"
                        style={{
                          backgroundColor: ch.statusKey === "scheduled" ? "#94BF5C15" : "#FF985215",
                          color: ch.statusKey === "scheduled" ? "#94BF5C" : "#FF9852",
                        }}
                      >
                        {t(`differentiator.${ch.statusKey}`)}
                      </span>
                    </div>
                  ))}
                  <div data-inner className="flex gap-2 pt-1" style={{ visibility: "hidden" }}>
                    <div className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-1" style={{ backgroundColor: "#94BF5C" }}>
                      <span className="material-icons-round text-sm">send</span>
                      {t("differentiator.publishAll")}
                    </div>
                    <div className="py-2.5 px-3 rounded-xl text-xs font-medium border border-black/10 flex items-center">
                      <span className="material-icons-round text-sm text-black/40">schedule</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Explanation */}
      <div data-diff-explain className="max-w-2xl mx-auto px-6 mt-10 mb-16 text-center" style={{ visibility: "hidden" }}>
        <p className="text-sm text-black/45 font-normal leading-relaxed">
          {t("differentiator.explanation")}
        </p>
      </div>
    </section>
  );
}

function VArrow({ color }: { color: string }) {
  return (
    <svg width="12" height="28" viewBox="0 0 12 28" fill="none" className="md:hidden">
      <line x1="6" y1="0" x2="6" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <polygon points="2,20 6,28 10,20" fill={color} />
    </svg>
  );
}

function Connector({ color1, color2 }: { color1: string; color2: string }) {
  const id = `g-${color1.replace("#","")}-${color2.replace("#","")}`;
  return (
    <div data-connector style={{ visibility: "hidden" }}>
      <div className="hidden md:block flex-shrink-0 mx-2">
        <svg width="48" height="12" viewBox="0 0 48 12" fill="none" className="w-12 h-3">
          <line x1="0" y1="6" x2="40" y2="6" stroke={`url(#${id})`} strokeWidth="2" strokeLinecap="round" />
          <polygon points="40,2 48,6 40,10" fill={color2} />
          <defs><linearGradient id={id} x1="0" y1="0" x2="48" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor={color1} /><stop offset="1" stopColor={color2} /></linearGradient></defs>
        </svg>
      </div>
      <VArrow color={color2} />
    </div>
  );
}

function FanOut({ color1, color2 }: { color1: string; color2: string }) {
  return (
    <div data-connector style={{ visibility: "hidden" }}>
      <div className="hidden md:block flex-shrink-0 mx-2">
        <svg width="56" height="120" viewBox="0 0 56 120" fill="none" className="w-14 h-[120px]">
          <path d="M0,60 Q28,60 48,16" stroke={color1} strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M0,60 Q28,60 48,60" stroke={color1} strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M0,60 Q28,60 48,104" stroke={color1} strokeWidth="2" fill="none" strokeLinecap="round" />
          <polygon points="48,12 56,16 48,20" fill={color2} />
          <polygon points="48,56 56,60 48,64" fill={color2} />
          <polygon points="48,100 56,104 48,108" fill={color2} />
        </svg>
      </div>
      <VArrow color={color2} />
    </div>
  );
}

function FanIn({ color1, color2 }: { color1: string; color2: string }) {
  return (
    <div data-connector style={{ visibility: "hidden" }}>
      <div className="hidden md:block flex-shrink-0 mx-2">
        <svg width="56" height="120" viewBox="0 0 56 120" fill="none" className="w-14 h-[120px]">
          <path d="M0,16 Q28,16 48,60" stroke={color1} strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M0,60 Q28,60 48,60" stroke={color1} strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M0,104 Q28,104 48,60" stroke={color1} strokeWidth="2" fill="none" strokeLinecap="round" />
          <polygon points="48,56 56,60 48,64" fill={color2} />
        </svg>
      </div>
      <VArrow color={color2} />
    </div>
  );
}
