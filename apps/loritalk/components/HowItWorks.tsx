"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { number: "01", color: "#94BF5C", icon: "edit_note", title: "Write your briefing", description: "Describe what you want to communicate \u2014 as simple as \u201cnew product launch\u201d or as detailed as a full brief. Pick your channels, language, and tone." },
  { number: "02", color: "#5D92E8", icon: "auto_awesome", title: "AI models compete for you", description: "Multiple AI models generate content independently, then review and refine each other\u2019s output. You receive N polished versions per platform." },
  { number: "03", color: "#FF9852", icon: "send", title: "Pick, edit & publish", description: "Choose your favorite version for each channel. Tweak anything with one click. Publish now or schedule for later." },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Heading
        gsap.from("[data-hiw-title]", { y: 30, autoAlpha: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: "[data-hiw-heading]", start: "top 85%", once: true } });
        gsap.from("[data-hiw-sub]", { y: 20, autoAlpha: 0, duration: 0.6, delay: 0.15, ease: "power3.out", scrollTrigger: { trigger: "[data-hiw-heading]", start: "top 85%", once: true } });

        // Sequential timeline: each step builds on the previous
        const stepTl = gsap.timeline({
          scrollTrigger: { trigger: "[data-hiw-steps]", start: "top 75%", once: true },
        });

        // Connector lines draw from left to right
        stepTl.from("[data-hiw-connector]", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.8,
          stagger: 0.5,
          ease: "power2.inOut",
        }, 0);

        // Step circles pop in with bounce
        steps.forEach((_, i) => {
          stepTl.from(`[data-hiw-circle-${i}]`, {
            scale: 0,
            autoAlpha: 0,
            duration: 0.5,
            ease: "back.out(3)",
          }, i * 0.5);

          // Step text reveals
          stepTl.from(`[data-hiw-text-${i}]`, {
            y: 25,
            autoAlpha: 0,
            duration: 0.5,
            ease: "power2.out",
          }, i * 0.5 + 0.2);
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-hiw-title], [data-hiw-sub], [data-hiw-connector], [data-hiw-circle-0], [data-hiw-circle-1], [data-hiw-circle-2], [data-hiw-text-0], [data-hiw-text-1], [data-hiw-text-2]", { autoAlpha: 1, clearProps: "all" });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="how-it-works" className="py-24" style={{ backgroundColor: "#f7f9fc" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div data-hiw-heading className="text-center mb-16">
          <h2 data-hiw-title className="text-3xl md:text-4xl font-bold mb-4" style={{ visibility: "hidden" }}>From idea to post in 3 steps</h2>
          <p data-hiw-sub className="text-lg text-black/55 font-normal max-w-lg mx-auto" style={{ visibility: "hidden" }}>
            No more blank screens. No more copy-pasting between platforms.
          </p>
        </div>

        <div data-hiw-steps className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={step.number} className="relative flex flex-col items-center text-center">
              {i < steps.length - 1 && (
                <div
                  data-hiw-connector
                  className="hidden md:block absolute top-10 left-[calc(50%+48px)] w-[calc(100%-96px)] h-[2px]"
                  style={{ backgroundColor: step.color, opacity: 0.3 }}
                />
              )}
              <div
                {...{ [`data-hiw-circle-${i}`]: "" }}
                className="w-20 h-20 rounded-full flex items-center justify-center mb-6 z-10"
                style={{ backgroundColor: step.color, visibility: "hidden" }}
              >
                <span className="material-icons-round text-3xl text-white">{step.icon}</span>
              </div>
              <div {...{ [`data-hiw-text-${i}`]: "" }} style={{ visibility: "hidden" }}>
                <span className="text-xs font-semibold text-black/30 mb-2 block">STEP {step.number}</span>
                <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                <p className="text-sm text-black/55 font-normal leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
