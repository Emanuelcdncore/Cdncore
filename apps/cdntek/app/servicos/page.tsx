"use client";

import Footer from "@/components/Footer";
import MapSection from "@/components/MapSection";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";

const bp = process.env.BASE_PATH || '';

export default function Services() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      title: t("services.audiovisual.title"),
      description: t("services.audiovisual.description"),
      tags: [
        "React 18",
        "Next.js 14",
        "TypeScript",
        "Vue 3",
        "Tailwind CSS",
        "Framer Motion",
      ],
      image: `${bp}/instalacao.jpg`,
    },
    {
      title: t("services.cybersecurity.title"),
      description: t("services.cybersecurity.description"),
      tags: [
        "Ciberseguran\u00e7a",
        "Gest\u00e3o de redes",
        "Prote\u00e7\u00e3o de dados",
        "Firewall",
        "Mitiga\u00e7\u00e3o de rede",
      ],
      image: `${bp}/seguranca.jpg`,
    },
  ];

  const clipPathVariations = [
    "polygon(15% 0%, 85% 0%, 100% 25%, 100% 75%, 85% 100%, 15% 100%, 0% 75%, 0% 25%)",
    "polygon(25% 0%, 75% 0%, 100% 15%, 100% 85%, 75% 100%, 25% 100%, 0% 85%, 0% 15%)",
    "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)",
    "polygon(18% 0%, 82% 0%, 100% 22%, 100% 78%, 82% 100%, 18% 100%, 0% 78%, 0% 22%)",
    "polygon(22% 0%, 78% 0%, 100% 18%, 100% 82%, 78% 100%, 22% 100%, 0% 82%, 0% 18%)",
    "polygon(16% 0%, 84% 0%, 100% 24%, 100% 76%, 84% 100%, 16% 100%, 0% 76%, 0% 24%)",
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden transition-opacity duration-700 ease-in-out">
        <div className="absolute inset-0 z-0">
          <Image
            src={`${bp}/favos.jpg`}
            alt="Hexagonal pattern background"
            fill
            unoptimized
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        </div>

        <div
          className={`max-w-7xl mx-auto relative z-10 w-full px-6 pt-20 transition-opacity duration-1000 ease-in-out ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl leading-tight">
                {t("services.hero.title1")}
                <br />
                {t("services.hero.title2")}
              </h1>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-lg">
                {t("services.hero.description")}
              </p>
              <div className="pt-4">
                <a
                  href="https://www.linkedin.com/company/cdntek/posts/?feedView=all"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block px-10 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition-all duration-300 text-base uppercase tracking-wide shadow-[0_0_20px_rgba(22,163,74,0.3)] hover:shadow-[0_0_30px_rgba(22,163,74,0.5)] transform hover:-translate-y-1"
                >
                  {t("services.hero.learnMore")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Line */}
      <div
        className={`max-w-7xl mx-auto px-6 py-16 transition-opacity duration-1000 ease-in-out delay-150 ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        <div
          className="w-full"
          style={{
            height: "2px",
            background: "#18491e",
            margin: "40px 0",
            borderRadius: 0,
          }}
        />
      </div>

      {/* Services Grid */}
      <section className="py-20">
        <div
          className={`max-w-7xl mx-auto px-6 space-y-32 transition-opacity duration-1000 ease-in-out delay-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          {services.map((service, index) => (
            <div key={index}>
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-cols-[1fr_1fr]" : ""}`}
              >
                {/* Image */}
                <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-auto block transform hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`space-y-6 flex flex-col justify-center ${index % 2 === 1 ? "lg:order-1" : ""}`}
                >
                  <h2 className="text-3xl md:text-4xl leading-tight">
                    {service.title}
                  </h2>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {service.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-3 pt-4">
                    {service.tags.map((tag, tagIndex) => {
                      const clipPath =
                        clipPathVariations[
                          tagIndex % clipPathVariations.length
                        ];
                      return (
                        <span
                          key={tagIndex}
                          className="relative inline-block octagon-tag-item"
                          style={{
                            padding: "6px 16px",
                            backgroundColor: "rgba(20, 83, 45, 0.1)",
                            clipPath: clipPath,
                          }}
                        >
                          <span className="text-sm text-gray-300 hover:text-green-400 transition-colors cursor-default relative z-10">
                            {tag}
                          </span>
                        </span>
                      );
                    })}
                  </div>

                  <style>{`
                    .octagon-tag-item::before {
                      content: '';
                      position: absolute;
                      inset: 0;
                      border: 1px solid rgba(20, 83, 45, 0.5);
                      clip-path: inherit;
                      pointer-events: none;
                      z-index: 1;
                    }
                    .octagon-tag-item:hover::before {
                      border-color: rgb(34, 197, 94);
                    }
                  `}</style>
                </div>
              </div>

              {/* Green line after last service */}
              {index === services.length - 1 && (
                <div
                  className="w-full"
                  style={{
                    height: "2px",
                    background: "#18491e",
                    marginTop: "100px",
                    marginBottom: "40px",
                    borderRadius: 0,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Map */}
      <div
        className={`max-w-7xl mx-auto px-6 transition-opacity duration-1000 ease-in-out delay-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        <MapSection />
      </div>

      <Footer />
    </div>
  );
}
