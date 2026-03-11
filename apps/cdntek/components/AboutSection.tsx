"use client";

import { useTranslation } from "react-i18next";

const bp = process.env.BASE_PATH || '';

export default function AboutSection() {
  const { t } = useTranslation();
  return (
    <section
      id="sobre"
      className="py-16 md:py-24 bg-black scroll-mt-16 md:scroll-mt-20"
    >
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="space-y-6 text-center md:text-left">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl text-white"
              style={{ fontFamily: "Depot, Inter, sans-serif" }}
            >
              {t("about.title")}
            </h2>

            <div className="space-y-4 text-gray-300 text-base md:text-lg leading-relaxed">
              <p>{t("about.paragraph1")}</p>

              <p>
                {t("about.paragraph2")}{" "}
                <span className="text-white font-semibold">
                  {t("about.pillars")}
                </span>{" "}
                {t("about.paragraph3")}
              </p>
            </div>
          </div>

          {/* Right: Circuit Board Video */}
          <div className="relative">
            <div className="rounded-lg overflow-hidden">
              <video
                src={`${bp}/0_Circuit_Board_Technology_3840x2160 - Compressed with FlexClip.mp4`}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-auto object-cover opacity-80"
                style={{
                  filter: "brightness(0.7) contrast(1.2)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
