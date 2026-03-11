"use client";

import { useTranslation } from "react-i18next";

export default function CompanySection() {
  const { t } = useTranslation();
  return (
    <section className="py-20 bg-black border-t border-border">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2
                className="text-3xl md:text-5xl text-foreground"
                style={{ fontFamily: "Depot, Inter, sans-serif" }}
              >
                <span className="text-gradient">{t("company.title")}</span>
              </h2>
              <p className="text-primary/80 text-sm md:text-base italic font-light tracking-wide">
                &ldquo;{t("company.tagline")}&rdquo;
              </p>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              {t("company.description")}
            </p>

            <ul className="space-y-4">
              {[
                t("company.founded2008"),
                t("company.founded1993"),
                t("company.employees"),
                t("company.coverage"),
                t("company.highTech"),
                t("company.solutions"),
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="https://www.itctech.com.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-smooth mt-6 uppercase tracking-wide text-sm"
            >
              {t("company.moreInfo")}
            </a>
          </div>

          {/* Video */}
          <div
            className="rounded-lg overflow-hidden relative"
            style={{ height: "450px" }}
          >
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/DTq3K-ZtFaA?autoplay=1&mute=1&loop=1&playlist=DTq3K-ZtFaA&controls=0&modestbranding=1&rel=0&showinfo=0&disablekb=1&fs=0&iv_load_policy=3"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              className="w-full h-full pointer-events-none"
            />
            <div className="absolute inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
