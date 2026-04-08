"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import LoriLogo from "./icons/LoriLogo";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <nav className="sticky top-0 z-50 bg-white/95 border-b border-black/8 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/">
          <LoriLogo variant="horizontal" size={36} />
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="/#features" className="text-sm font-medium text-black/70 hover:text-black transition-colors">{t("navbar.features")}</a>
          <a href="/#how-it-works" className="text-sm font-medium text-black/70 hover:text-black transition-colors">{t("navbar.howItWorks")}</a>
          <a href="/#pricing" className="text-sm font-medium text-black/70 hover:text-black transition-colors">{t("navbar.pricing")}</a>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: "#5D92E8" }}>{t("navbar.beta")}</span>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <a href="https://app.lori-talk.com" className="text-sm font-semibold px-5 py-2 rounded-full text-white transition-opacity hover:opacity-90" style={{ backgroundColor: "#94BF5C" }}>
            {t("navbar.startForFree")}
          </a>
        </div>

        <button className="md:hidden p-2 rounded-lg hover:bg-black/5 transition-colors" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <span className="material-icons-round text-xl">{open ? "close" : "menu"}</span>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-black/8 bg-white px-6 py-4 flex flex-col gap-4">
          <a href="/#features" className="text-sm font-medium" onClick={() => setOpen(false)}>{t("navbar.features")}</a>
          <a href="/#how-it-works" className="text-sm font-medium" onClick={() => setOpen(false)}>{t("navbar.howItWorks")}</a>
          <a href="/#pricing" className="text-sm font-medium" onClick={() => setOpen(false)}>{t("navbar.pricing")}</a>
          <LanguageSwitcher className="self-start" />
          <div className="flex flex-col gap-2 pt-2 border-t border-black/8">
            <a href="https://app.lori-talk.com" className="text-sm font-semibold py-2 rounded-full text-white text-center hover:opacity-90 transition-opacity" style={{ backgroundColor: "#94BF5C" }}>
              {t("navbar.startForFree")}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
