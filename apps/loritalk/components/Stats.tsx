"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "6+", numericEnd: 6, suffix: "+", label: "Social networks supported", color: "#94BF5C" },
  { value: "3", numericEnd: 3, suffix: "", label: "Languages at launch", color: "#5D92E8" },
  { value: "<5s", numericEnd: 5, suffix: "s", prefix: "<", label: "Average generation time", color: "#FF9852" },
  { value: "Free", numericEnd: 0, suffix: "", label: "During Beta \u2014 no limits", color: "#E54013", isText: true },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Cards fly up with elastic bounce
        gsap.from("[data-stat]", {
          y: 60,
          scale: 0.7,
          autoAlpha: 0,
          duration: 0.8,
          stagger: { each: 0.12, from: "center" },
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
          onComplete: () => {
            // Counter animation on the numeric values
            stats.forEach((s, i) => {
              const el = valueRefs.current[i];
              if (!el || s.isText) return;
              const proxy = { val: 0 };
              gsap.to(proxy, {
                val: s.numericEnd,
                duration: 1.5,
                ease: "power2.out",
                onUpdate: () => {
                  el.textContent = `${s.prefix || ""}${Math.round(proxy.val)}${s.suffix}`;
                },
              });
            });
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-stat]", { autoAlpha: 1, clearProps: "all" });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-20 border-b border-black/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={s.label} data-stat className="flex flex-col items-center text-center gap-2" style={{ visibility: "hidden" }}>
              <span
                ref={(el) => { valueRefs.current[i] = el; }}
                className="text-4xl md:text-5xl font-bold"
                style={{ color: s.color }}
              >
                {s.isText ? s.value : "0"}
              </span>
              <span className="text-sm text-black/50 font-normal">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
