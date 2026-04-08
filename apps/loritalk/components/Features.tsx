"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: "psychology", color: "#94BF5C", bg: "#f0f7e6", title: "Multi-Model AI Deliberation", description: "Not one AI \u2014 multiple models generate independently, then refine each other\u2019s work. You get the best of Claude, GPT, and Gemini combined." },
  { icon: "auto_awesome_mosaic", color: "#5D92E8", bg: "#e8f0fd", title: "Platform-optimized content", description: "Each post is tailored for its platform \u2014 right tone, length, hashtags, emojis, and format. Instagram captions, LinkedIn articles, X threads, TikTok scripts." },
  { icon: "translate", color: "#FF9852", bg: "#fff5ee", title: "Multilingual generation", description: "Generate in Portuguese, English, Spanish and more. Native-level fluency with cultural nuance \u2014 not just translation." },
  { icon: "calendar_month", color: "#E54013", bg: "#fdeee9", title: "Schedule & publish", description: "Calendar view, scheduled publishing, and direct posting to all connected channels. Different times per platform." },
  { icon: "tune", color: "#5D92E8", bg: "#e8f0fd", title: "Brand voice & personas", description: "Create AI personas that write like your brand. Control tone from professional to playful. Every post sounds like you, not a robot." },
  { icon: "analytics", color: "#94BF5C", bg: "#f0f7e6", title: "Analytics dashboard", description: "Track impressions, engagement, clicks, and growth across all channels. Know what content works and double down." },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const heading = section.querySelectorAll("[data-feat-h]");
    const cards = section.querySelectorAll("[data-feat-card]");

    // Hide with GSAP (not inline style) so they're visible if JS fails
    gsap.set(heading, { autoAlpha: 0, y: 30 });
    gsap.set(cards, { autoAlpha: 0, y: 50, scale: 0.9 });

    const ctx = gsap.context(() => {
      // Single ScrollTrigger on the section — most reliable after pins
      ScrollTrigger.create({
        trigger: section,
        start: "top 75%",
        once: true,
        onEnter: () => {
          // Heading
          gsap.to(heading, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
          });

          // Cards with delay
          gsap.to(cards, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.3,
            ease: "back.out(1.4)",
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 data-feat-h className="text-3xl md:text-4xl font-bold mb-4">
            Everything your content team needs
          </h2>
          <p data-feat-h className="text-lg text-black/55 font-normal max-w-xl mx-auto">
            From idea to published post — Loritalk handles the entire workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              data-feat-card
              className="rounded-2xl p-6 border border-black/8 hover:border-black/16 hover:shadow-lg transition-all duration-300 group"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: f.bg }}
              >
                <span className="material-icons-round text-2xl" style={{ color: f.color }}>{f.icon}</span>
              </div>
              <h3 className="text-base font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-black/55 font-normal leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
