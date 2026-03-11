"use client";

import { useTranslation } from "react-i18next";

export default function PartnersSection() {
  const { t } = useTranslation();
  const partners = [
    {
      name: "Parkurbis",
      logo: "/LOGO_PARKURBIS V2@4x.png",
      sizeMultiplier: 1.15,
      verticalOffset: -15,
      horizontalMargin: "mx-2 md:mx-4",
    },
    { name: "ITC", logo: "/LOGO_ITC.png", sizeMultiplier: 0.55 },
    {
      name: "TV",
      logo: "/LOGO_TV_VERSAO_PRINCIPAL.png",
      sizeMultiplier: 0.9,
    },
    {
      name: "Core",
      logo: "/LOGO_CORE_VERSAO_PRINCIPAL.png",
      sizeMultiplier: 1,
    },
    {
      name: "Parceiro 2025",
      logo: "/Logo 2025 - Cinza.png",
      sizeMultiplier: 0.6,
    },
  ];

  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-20 bg-black border-t border-border overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <h2
          className="text-3xl md:text-4xl text-foreground text-center mb-16"
          style={{ fontFamily: "Depot, Inter, sans-serif" }}
        >
          {t("partners.title")}
        </h2>

        {/* Infinite Carousel Container */}
        <div className="relative w-full overflow-hidden carousel-container">
          <div className="flex animate-scroll-left">
            {duplicatedPartners.map((partner, index) => (
              <div
                key={index}
                className={`flex-shrink-0 flex items-center justify-center ${partner.horizontalMargin || "mx-8 md:mx-12"}`}
                style={{
                  width: `${280 * partner.sizeMultiplier}px`,
                  height: "176px",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={partner.logo}
                  alt={partner.name}
                  loading="lazy"
                  className="logo-image"
                  style={{
                    width: "auto",
                    height: "auto",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    pointerEvents: "auto",
                    verticalAlign: "middle",
                    transform: partner.verticalOffset
                      ? `translateY(${partner.verticalOffset}px)`
                      : "none",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* CSS Animation */}
        <style>{`
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .carousel-container {
            mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
            -webkit-mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
          }
          .animate-scroll-left {
            animation: scroll-left 20s linear infinite;
            display: flex;
            width: fit-content;
            align-items: center;
          }
          .logo-image {
            filter: grayscale(100%);
            opacity: 0.5;
            transition: opacity 0.5s ease, filter 0.5s ease;
            display: block;
          }
          .logo-image:hover {
            filter: grayscale(0%);
            opacity: 1;
          }
          .animate-scroll-left > div { pointer-events: none; }
          .animate-scroll-left > div > img { pointer-events: auto; }
          .animate-scroll-left:has(.logo-image:hover) { animation-play-state: paused; }
        `}</style>
      </div>
    </section>
  );
}
