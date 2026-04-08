"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LoriLogo from "./icons/LoriLogo";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Badge drops in with bounce
        tl.from("[data-hero-badge]", {
          y: -40,
          autoAlpha: 0,
          duration: 0.7,
          ease: "back.out(2)",
        });

        // Headline lines reveal with clip-path wipe
        tl.from("[data-hero-line]", {
          clipPath: "inset(0 0 100% 0)",
          y: 40,
          duration: 0.8,
          stagger: 0.15,
          ease: "power4.out",
        }, "-=0.3");

        // Subheadline fades up
        tl.from("[data-hero-sub]", {
          y: 30,
          autoAlpha: 0,
          duration: 0.6,
        }, "-=0.3");

        // CTAs pop in with elastic scale
        tl.from("[data-hero-cta]", {
          scale: 0,
          autoAlpha: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(3)",
        }, "-=0.2");

        // Note fades
        tl.from("[data-hero-note]", { autoAlpha: 0, duration: 0.5 }, "-=0.3");

        // Mockup slides up with 3D rotation
        tl.from("[data-hero-mockup]", {
          y: 100,
          rotationX: 8,
          autoAlpha: 0,
          duration: 1,
          ease: "power2.out",
        }, "-=0.5");

        // Parallax on decorative shapes
        gsap.utils.toArray<HTMLElement>("[data-hero-shape]").forEach((shape, i) => {
          gsap.to(shape, {
            y: (i + 1) * -40,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
        });
      });

      // Reduced motion: just show everything
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-hero-badge], [data-hero-line], [data-hero-sub], [data-hero-cta], [data-hero-note], [data-hero-mockup]", {
          autoAlpha: 1,
          clearProps: "all",
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white" style={{ perspective: "1200px" }}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div data-hero-shape className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10" style={{ backgroundColor: "#5D92E8" }} />
        <div data-hero-shape className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-8" style={{ backgroundColor: "#94BF5C" }} />
        <div data-hero-shape className="absolute top-1/3 -right-16 w-48 h-48 rounded-full opacity-10" style={{ backgroundColor: "#FF9852" }} />
        <div data-hero-shape className="absolute top-1/2 left-[10%] w-24 h-24 rotate-45 rounded-lg opacity-6" style={{ backgroundColor: "#E54013" }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-14 md:py-20 flex flex-col items-center text-center gap-6">
        <div
          data-hero-badge
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-white"
          style={{ backgroundColor: "#5D92E8", visibility: "hidden" }}
        >
          <span className="material-icons-round text-sm">science</span>
          Now in Beta — free early access
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <LoriLogo variant="stacked" size={40} />

          <div className="flex flex-col gap-4 max-w-xl md:text-left text-center">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              <span data-hero-line className="block" style={{ clipPath: "inset(0 0 0 0)" }}>One idea.</span>
              <span data-hero-line className="block" style={{ color: "#94BF5C", clipPath: "inset(0 0 0 0)" }}>Every platform.</span>
            </h1>
            <p data-hero-sub className="text-base md:text-lg text-black/60 font-normal" style={{ visibility: "hidden" }}>
              Type a theme or idea. Loritalk&apos;s AI writes optimized posts for Instagram, LinkedIn, X, TikTok, and more — in seconds. Multiple AI models compete to give you the best result.
            </p>

            <div className="flex flex-col sm:flex-row items-center md:items-start gap-3 mt-1">
              <a data-hero-cta href="https://app.lori-talk.eu" className="px-7 py-3 rounded-full font-semibold text-white text-sm hover:opacity-90 transition-opacity" style={{ backgroundColor: "#94BF5C", visibility: "hidden" }}>
                Start creating for free
              </a>
              <a data-hero-cta href="#how-it-works" className="px-7 py-3 rounded-full font-semibold text-sm border border-black/20 hover:bg-black/5 transition-colors flex items-center gap-2" style={{ visibility: "hidden" }}>
                <span className="material-icons-round text-base">play_circle</span>
                See how it works
              </a>
            </div>
          </div>
        </div>

        <p data-hero-note className="text-sm text-black/40 font-light" style={{ visibility: "hidden" }}>
          No credit card required · Free during Beta
        </p>

        <div data-hero-mockup className="w-full max-w-3xl rounded-2xl overflow-hidden border border-black/8 shadow-xl" style={{ visibility: "hidden", transformStyle: "preserve-3d" }}>
          <div className="w-full p-4 md:p-6 flex flex-col gap-4" style={{ background: "linear-gradient(135deg, #f0f7e6 0%, #e8f0fd 60%, #fff5ee 100%)" }}>
            <div className="bg-white rounded-xl p-3 border border-black/8 flex items-center gap-3">
              <span className="material-icons-round text-lg" style={{ color: "#94BF5C" }}>edit</span>
              <span className="text-sm text-black/40 font-normal italic">&quot;Launch of our new sustainable sneaker collection...&quot;</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { net: "Instagram", logo: "/logos/instagram.svg", color: "#E4405F", text: "Step into sustainability. \ud83d\udc5f\ud83c\udf3f Our new collection is here \u2014 crafted with recycled materials, built for the streets. #SustainableFashion" },
                { net: "LinkedIn", logo: "/logos/linkedin.svg", color: "#0A66C2", text: "Today we launch our most ambitious product yet: sustainable sneakers built from 80% recycled materials, without compromising performance." },
                { net: "X", logo: "/logos/x.svg", color: "#000000", text: "We just dropped something big. Sustainable sneakers are now a reality \ud83d\udd25 Meet our new collection \ud83d\udc47" },
              ].map((c) => (
                <div key={c.net} className="bg-white rounded-xl p-3 border border-black/8 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.logo} alt={c.net} className="w-4 h-4" style={{ filter: c.color === "#000000" ? "none" : undefined }} />
                    <span className="text-xs font-semibold" style={{ color: c.color }}>{c.net}</span>
                  </div>
                  <p className="text-xs text-black/65 leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
