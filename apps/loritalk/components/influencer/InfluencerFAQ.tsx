"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function InfluencerFAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useTranslation();
  const faqs = t("influencer.faq.items", { returnObjects: true }) as Array<{ q: string; a: string }>;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-ifaq-title]", { y: 30, autoAlpha: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: "[data-ifaq-heading]", start: "top 85%", once: true } });
        gsap.from("[data-ifaq-item]", { y: 30, autoAlpha: 0, duration: 0.5, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: "[data-ifaq-list]", start: "top 80%", once: true } });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => { gsap.set("[data-ifaq-title], [data-ifaq-item]", { autoAlpha: 1, clearProps: "all" }); });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const toggle = useCallback((i: number) => {
    const prev = openIndex !== null ? contentRefs.current[openIndex] : null;
    const next = contentRefs.current[i];
    if (openIndex === i) {
      if (prev) gsap.to(prev, { height: 0, autoAlpha: 0, duration: 0.35, ease: "power2.inOut" });
      setOpenIndex(null);
    } else {
      if (prev) gsap.to(prev, { height: 0, autoAlpha: 0, duration: 0.3, ease: "power2.in" });
      if (next) { gsap.set(next, { height: "auto", autoAlpha: 1 }); gsap.from(next, { height: 0, autoAlpha: 0, duration: 0.4, ease: "power2.out" }); }
      setOpenIndex(i);
    }
  }, [openIndex]);

  return (
    <section ref={sectionRef} className="py-24" style={{ backgroundColor: "#f7f9fc" }}>
      <div className="max-w-3xl mx-auto px-6">
        <div data-ifaq-heading className="text-center mb-16">
          <h2 data-ifaq-title className="text-3xl md:text-4xl font-bold" style={{ visibility: "hidden" }}>{t("influencer.faq.title")}</h2>
        </div>
        <div data-ifaq-list className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div key={i} data-ifaq-item className="bg-white rounded-xl border border-black/8 overflow-hidden" style={{ visibility: "hidden" }}>
              <button className="w-full flex items-center justify-between px-6 py-5 text-left" onClick={() => toggle(i)}>
                <span className="text-sm font-medium pr-4">{faq.q}</span>
                <span className="material-icons-round text-xl text-black/40 flex-shrink-0 transition-transform duration-300" style={{ transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)" }}>expand_more</span>
              </button>
              <div ref={(el) => { contentRefs.current[i] = el; }} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
                <p className="px-6 pb-5 text-sm text-black/55 font-normal leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
