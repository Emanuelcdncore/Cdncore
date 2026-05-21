"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import LoriLogo from "./icons/LoriLogo";
import LanguageSwitcher from "./LanguageSwitcher";
import CTAButton from "./CTAButton";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function scrollToSection(hash: string) {
  window.history.pushState(null, "", hash);
  const smoother = ScrollSmoother.get();
  if (smoother) {
    smoother.scrollTo(hash, true, "top top+=72");
  } else {
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  }
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const nav = navRef.current;
    const inner = innerRef.current;
    if (!nav || !inner) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    // Exact pattern from the CodePen:
    // Create the hide animation paused, then set to progress(1) = fully visible
    const showAnim = gsap.from(nav, {
      yPercent: -100,
      paused: true,
      duration: 0.25,
      ease: "power2.out",
    }).progress(1);

    const dirSt = ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate(self) {
        self.direction === -1 ? showAnim.play() : showAnim.reverse();
      },
    });

    // Shrink inner bar height when scrolled away from top
    const shrinkSt = ScrollTrigger.create({
      start: "80px top",
      onEnter: () => gsap.to(inner, { height: 48, duration: 0.35, ease: "power2.inOut" }),
      onLeaveBack: () => gsap.to(inner, { height: 64, duration: 0.35, ease: "power2.inOut" }),
    });

    return () => {
      dirSt.kill();
      shrinkSt.kill();
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 border-b border-black/8 backdrop-blur-sm"
    >
      <div
        ref={innerRef}
        className="max-w-6xl mx-auto px-6 flex items-center justify-between overflow-hidden"
        style={{ height: 64 }}
      >
        <a href="/">
          <LoriLogo variant="horizontal" size={36} />
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection("#features"); }} className="nav-link text-sm font-medium text-black/70 hover:text-black transition-colors">{t("navbar.features")}</a>
          <a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollToSection("#how-it-works"); }} className="nav-link text-sm font-medium text-black/70 hover:text-black transition-colors">{t("navbar.howItWorks")}</a>
          <a href="#pricing" onClick={(e) => { e.preventDefault(); scrollToSection("#pricing"); }} className="nav-link text-sm font-medium text-black/70 hover:text-black transition-colors">{t("navbar.pricing")}</a>
          <a href="/agency" className="text-sm font-medium text-black/70 hover:text-black transition-colors">{t("navbar.forAgencies")}</a>
          <a href="/influencer" className="text-sm font-medium text-black/70 hover:text-black transition-colors">{t("navbar.forCreators")}</a>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: "#5D92E8" }}>{t("navbar.beta")}</span>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <CTAButton href="https://app.lori-talk.eu" className="text-sm font-semibold px-5 py-2 rounded-full text-white" style={{ backgroundColor: "#94BF5C" }}>
            {t("navbar.startForFree")}
          </CTAButton>
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-black/5 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="material-icons-round text-xl">{open ? "close" : "menu"}</span>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-black/8 bg-white px-6 py-4 flex flex-col gap-4">
          <a href="#features" onClick={(e) => { e.preventDefault(); setOpen(false); scrollToSection("#features"); }} className="text-sm font-medium">{t("navbar.features")}</a>
          <a href="#how-it-works" onClick={(e) => { e.preventDefault(); setOpen(false); scrollToSection("#how-it-works"); }} className="text-sm font-medium">{t("navbar.howItWorks")}</a>
          <a href="#pricing" onClick={(e) => { e.preventDefault(); setOpen(false); scrollToSection("#pricing"); }} className="text-sm font-medium">{t("navbar.pricing")}</a>
          <a href="/agency" className="text-sm font-medium" onClick={() => setOpen(false)}>{t("navbar.forAgencies")}</a>
          <a href="/influencer" className="text-sm font-medium" onClick={() => setOpen(false)}>{t("navbar.forCreators")}</a>
          <LanguageSwitcher className="self-start" />
          <div className="flex flex-col gap-2 pt-2 border-t border-black/8">
            <CTAButton href="https://app.lori-talk.eu" className="text-sm font-semibold py-2 rounded-full text-white text-center" style={{ backgroundColor: "#94BF5C" }}>
              {t("navbar.startForFree")}
            </CTAButton>
          </div>
        </div>
      )}
    </nav>
  );
}
