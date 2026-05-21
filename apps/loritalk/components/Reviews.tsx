"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    name: "Sofia Ribeiro",
    text: "Poupei horas por semana. Um briefing e tenho conteúdo pronto para todas as redes.",
  },
  {
    name: "James Whitfield",
    text: "Finally a tool that actually understands platform differences. LinkedIn, X and Instagram all get the right tone.",
  },
  {
    name: "Ana Fonseca",
    text: "Adorei a qualidade dos textos! Seria ainda melhor ter templates guardados para campanhas recorrentes.",
  },
  {
    name: "Marco Delgado",
    text: "A nossa voz de marca ficou finalmente consistente em todos os canais. Os seguidores notaram a diferença.",
  },
  {
    name: "Chiara Moretti",
    text: "Switched from three different tools to just Loritalk. Simpler workflow, noticeably better results.",
  },
  {
    name: "David Müller",
    text: "We onboarded 3 new clients in a single week using Loritalk. Game changer for our agency.",
  },
  {
    name: "Inês Carvalho",
    text: "Conteúdo excelente, mas o menu de agendamento podia ser mais fácil de encontrar.",
  },
  {
    name: "Tom Hargreaves",
    text: "Our approval cycle went from 3 days to same-day. The draft quality is high enough that we barely edit.",
  },
  {
    name: "Lena Kovač",
    text: "Three languages, all sound native. The multilingual support is genuinely impressive.",
  },
  {
    name: "Pedro Simões",
    text: "Muito bom! Queria poder ver o histórico de publicações diretamente no dashboard principal.",
  },
  {
    name: "Fatima Al-Rashid",
    text: "Our reach grew 40% in six weeks. Hard to believe it came from just optimising the format per platform.",
  },
  {
    name: "Raphaël Dupont",
    text: "Outil excellent. Une intégration Pinterest serait la cerise sur le gâteau.",
  },
];

export default function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const track = [...reviews, ...reviews];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(sectionRef.current, {
          y: 30, autoAlpha: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 88%", once: true },
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(sectionRef.current, { autoAlpha: 1, clearProps: "all" });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-14 bg-white overflow-hidden">
      <style>{`
        @keyframes lori-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .lori-marquee-track {
          animation: lori-marquee 55s linear infinite;
          will-change: transform;
        }
      `}</style>

      <div
        className="overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="lori-marquee-track flex gap-5" style={{ width: "max-content" }}>
          {track.map((review, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-72 rounded-2xl border border-black/8 bg-white shadow-sm p-5 flex flex-col gap-3"
            >
              <p className="text-sm text-black/65 leading-relaxed">
                &ldquo;{review.text}&rdquo;
              </p>
              <span className="text-xs font-semibold text-black/35">
                — {review.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
