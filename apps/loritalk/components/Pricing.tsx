"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Free", price: "\u20ac0", period: "during Beta", color: "#94BF5C",
    description: "Try everything with generous limits.",
    features: ["20 posts / month", "3 networks", "3 languages", "Basic tone controls", "Hashtag suggestions"],
    cta: "Start for free", ctaHref: "https://app.lori-talk.eu", highlight: false,
  },
  {
    name: "Creator", price: "\u20ac19", period: "per month", color: "#5D92E8",
    description: "For creators and brands that publish consistently.",
    features: ["200 posts / month", "All networks", "All languages", "Advanced tone & personas", "Content calendar", "Priority support"],
    cta: "Start free trial", ctaHref: "https://app.lori-talk.eu", highlight: true,
  },
  {
    name: "Agency", price: "\u20ac79", period: "per month", color: "#FF9852",
    description: "For teams managing multiple brands.",
    features: ["Unlimited posts", "All networks", "All languages", "Multiple brands", "Team collaboration", "Analytics", "Account manager"],
    cta: "Talk to us", ctaHref: "mailto:infglobal@cdncore.eu", highlight: false,
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-price-title]", { y: 30, autoAlpha: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: "[data-price-heading]", start: "top 85%", once: true } });
        gsap.from("[data-price-sub]", { y: 20, autoAlpha: 0, duration: 0.6, delay: 0.15, scrollTrigger: { trigger: "[data-price-heading]", start: "top 85%", once: true } });

        // Side cards slide in, center (highlighted) bounces up
        const cardTl = gsap.timeline({
          scrollTrigger: { trigger: "[data-price-grid]", start: "top 78%", once: true },
        });

        cardTl.from("[data-price-card-0]", { x: -80, autoAlpha: 0, duration: 0.7, ease: "power3.out" }, 0);
        cardTl.from("[data-price-card-2]", { x: 80, autoAlpha: 0, duration: 0.7, ease: "power3.out" }, 0);
        cardTl.from("[data-price-card-1]", {
          y: 80,
          scale: 0.85,
          autoAlpha: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
        }, 0.15);
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-price-title], [data-price-sub], [data-price-card-0], [data-price-card-1], [data-price-card-2]", { autoAlpha: 1, clearProps: "all" });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="pricing" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div data-price-heading className="text-center mb-16">
          <h2 data-price-title className="text-3xl md:text-4xl font-bold mb-4" style={{ visibility: "hidden" }}>Simple, transparent pricing</h2>
          <p data-price-sub className="text-lg text-black/55 font-normal max-w-lg mx-auto" style={{ visibility: "hidden" }}>
            Free during Beta. Early users lock their rate forever when we launch.
          </p>
        </div>

        <div data-price-grid className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              {...{ [`data-price-card-${i}`]: "" }}
              className={`rounded-2xl p-8 flex flex-col gap-6 ${plan.highlight ? "border-2 shadow-lg md:-mt-4 md:mb-4" : "border border-black/8"}`}
              style={{
                visibility: "hidden",
                ...(plan.highlight ? { borderColor: plan.color, backgroundColor: "white" } : { backgroundColor: "white" }),
              }}
            >
              {plan.highlight && (
                <div className="self-start text-xs font-semibold px-3 py-1 rounded-full text-white" style={{ backgroundColor: plan.color }}>
                  Most popular
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-black/50 mb-1">{plan.name}</p>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-sm text-black/40 pb-1">{plan.period}</span>
                </div>
                <p className="text-sm text-black/55">{plan.description}</p>
              </div>
              <ul className="flex flex-col gap-2.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-black/70">
                    <span className="material-icons-round text-base" style={{ color: plan.color }}>check_circle</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={plan.ctaHref}
                className="w-full py-3 rounded-full font-semibold text-sm text-center transition-opacity hover:opacity-85 block"
                style={plan.highlight ? { backgroundColor: plan.color, color: "white" } : { border: `1.5px solid ${plan.color}`, color: plan.color }}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
