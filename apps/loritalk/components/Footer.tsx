"use client";

import { useTranslation } from "react-i18next";
import LoriLogo from "./icons/LoriLogo";

export default function Footer() {
  const { t } = useTranslation();

  const links = {
    [t("footer.product")]: [
      { label: t("footer.features"), href: "#features" },
      { label: t("navbar.pricing"), href: "#pricing" },
      { label: t("footer.supportedNetworks"), href: "/supported-networks" },
      { label: t("footer.changelog"), href: "#" },
    ],
    [t("footer.resources")]: [
      { label: t("footer.helpCenter"), href: "/contact" },
      { label: t("footer.contactUs"), href: "/contact" },
    ],
    [t("footer.legal")]: [
      { label: t("footer.privacyPolicy"), href: "/privacy-policy" },
      { label: t("footer.termsOfService"), href: "/terms-of-service" },
    ],
  };

  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="flex flex-col gap-4">
            <LoriLogo variant="horizontal" size={32} className="text-white" />
            <p className="text-sm text-white/50 font-light leading-relaxed">
              {t("footer.description")}<br />
              CDN Core Technologies<br />
              Parkurbis, Covilh&atilde; · Portugal
            </p>
            <div className="flex flex-col gap-1 text-xs text-white/35 font-light">
              <span>+351 275 959 168</span>
              <span>info@lori-talk.eu</span>
            </div>
          </div>
          {Object.entries(links).map(([section, items]) => (
            <div key={section} className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-white/40 uppercase">{section}</p>
              {items.map((item) => (
                <a key={item.label} href={item.href} className="text-sm text-white/65 font-light hover:text-white transition-colors">{item.label}</a>
              ))}
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-8">
          <p className="text-xs text-white/35 font-light text-center">{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
