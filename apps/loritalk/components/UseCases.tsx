"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cases = [
  { icon: "person", color: "#94BF5C", title: "Solo creators & freelancers", description: "Stop spending hours adapting content. Write once, publish everywhere. Focus on strategy, not copy-pasting." },
  { icon: "business", color: "#5D92E8", title: "Marketing teams", description: "One workspace per brand. Approval workflows. Calendar view. Everyone knows what\u2019s publishing and when." },
  { icon: "groups", color: "#FF9852", title: "Agencies", description: "Manage multiple brands from one account. Assign roles, control access, track performance across all clients. Unlimited posts on Agency plan." },
];

export default function UseCases() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-uc-title]", { y: 30, autoAlpha: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: "[data-uc-heading]", start: "top 85%", once: true } });
        gsap.from("[data-uc-sub]", { y: 20, autoAlpha: 0, duration: 0.6, delay: 0.15, scrollTrigger: { trigger: "[data-uc-heading]", start: "top 85%", once: true } });

        // Cards slide in from different x positions
        gsap.utils.toArray<HTMLElement>("[data-uc-card]").forEach((card, i) => {
          const xStart = i === 0 ? -100 : i === 2 ? 100 : 0;
          gsap.from(card, {
            x: xStart,
            y: 40,
            autoAlpha: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%", once: true },
          });
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-uc-title], [data-uc-sub], [data-uc-card]", { autoAlpha: 1, clearProps: "all" });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24" style={{ backgroundColor: "#f7f9fc" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div data-uc-heading className="text-center mb-16">
          <h2 data-uc-title className="text-3xl md:text-4xl font-bold mb-4" style={{ visibility: "hidden" }}>Built for teams that publish</h2>
          <p data-uc-sub className="text-lg text-black/55 font-normal max-w-lg mx-auto" style={{ visibility: "hidden" }}>
            Whether you&apos;re a solo creator or a 50-person agency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((c) => (
            <div
              key={c.title}
              data-uc-card
              className="rounded-2xl p-8 bg-white border border-black/8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              style={{ visibility: "hidden" }}
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5" style={{ backgroundColor: c.color }}>
                <span className="material-icons-round text-2xl text-white">{c.icon}</span>
              </div>
              <h3 className="text-lg font-semibold mb-3">{c.title}</h3>
              <p className="text-sm text-black/55 font-normal leading-relaxed">{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
