"use client";

import { useTranslation } from "react-i18next";
import Image from "next/image";

const bp = process.env.BASE_PATH || '';

export default function FeaturesSection() {
  const { t } = useTranslation();
  const features = [
    {
      icon: `${bp}/ICON_TECNOLOGIA.png`,
      title: t("features.tech.title"),
      description: t("features.tech.description"),
    },
    {
      icon: `${bp}/ICON_SEGURANCA.png`,
      title: t("features.security.title"),
      description: t("features.security.description"),
    },
    {
      icon: `${bp}/ICON_COBERTURA.png`,
      title: t("features.coverage.title"),
      description: t("features.coverage.description"),
    },
    {
      icon: `${bp}/LAMPPPP.png`,
      title: t("features.innovation.title"),
      description: t("features.innovation.description"),
    },
  ];

  return (
    <section className="py-20 bg-black border-t border-border">
      <div className="section-container">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2
            className="text-3xl md:text-5xl text-foreground mb-4"
            style={{ fontFamily: "Depot, Inter, sans-serif" }}
          >
            <span>{t("features.title")}</span>
            <span className="text-gradient">{t("features.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("features.subtitle")}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-lg glass border border-border/50 hover:border-primary/50 transition-smooth"
            >
              {/* Icon */}
              <div className="mb-6 flex items-center justify-start h-36 -ml-12">
                <div className="group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={150}
                    height={150}
                    unoptimized
                    className="object-contain"
                    style={{ width: "150px", height: "150px" }}
                  />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {feature.description}
              </p>

              {/* Accent line */}
              <div className="mt-6 h-1 w-12 bg-gradient-to-r from-primary to-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-smooth" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
