"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";

const bp = process.env.BASE_PATH || '';

export default function Header() {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);

    if (pathname !== "/") {
      router.push("/?scrollTo=" + sectionId);
    } else {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 50);
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "pt" ? "en" : "pt";
    i18n.changeLanguage(newLang);
  };

  const navItems = [
    { label: "Home", href: "/", isRoute: true },
    { label: t("header.services"), href: "/servicos", isRoute: true },
    { label: t("header.products"), href: "/produtos", isRoute: true },
    { label: t("header.news") || "News", href: "/news", isRoute: true },
    {
      label: t("header.about"),
      href: "#sobre",
      isRoute: false,
      sectionId: "sobre",
    },
    { label: t("header.faq"), href: "#faq", isRoute: false, sectionId: "faq" },
    { label: t("header.contact"), href: "/contact", isRoute: true },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b">
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            onClick={(event) => {
              if (pathname === "/") {
                event.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                setIsMobileMenuOpen(false);
              }
            }}
            className="flex items-center gap-2 flex-shrink-0 group"
          >
            <div className="w-21 h-9 rounded-md flex items-center justify-center overflow-hidden">
              <Image
                src={`${bp}/LOGO_TEK_VERSAO_W.png`}
                alt="CDNTEK Logo"
                width={84}
                height={36}
                unoptimized
                className="w-full h-full object-contain"
              />
            </div>
            <span className="sr-only">CDNTEK</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) =>
              item.isRoute ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-smooth text-xs font-medium tracking-wide uppercase"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.sectionId || "")}
                  className="text-foreground hover:text-primary transition-smooth text-xs font-medium tracking-wide uppercase"
                >
                  {item.label}
                </button>
              )
            )}
          </nav>

          {/* Language Switcher + Login */}
          <div className="hidden md:flex items-center gap-4 ml-6">
            <button
              onClick={toggleLanguage}
              className="text-xs font-semibold text-foreground hover:text-primary transition-smooth uppercase tracking-wider px-3 py-1.5 rounded-full border border-border/50 hover:border-primary/50"
            >
              {i18n.language === "pt" ? "EN" : "PT"}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground hover:text-primary transition-smooth"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            {navItems.map((item) =>
              item.isRoute ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block px-4 py-2 text-foreground hover:text-primary hover:bg-card/50 transition-smooth text-sm font-medium tracking-wide uppercase rounded"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.sectionId || "")}
                  className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-card/50 transition-smooth text-sm font-medium tracking-wide uppercase rounded"
                >
                  {item.label}
                </button>
              )
            )}

            <div className="pt-2 border-t border-zinc-800 mt-2 px-4">
              <button
                onClick={toggleLanguage}
                className="text-xs font-semibold text-foreground hover:text-primary transition-smooth uppercase tracking-wider px-3 py-1.5 rounded-full border border-border/50 hover:border-primary/50"
              >
                {i18n.language === "pt" ? "EN" : "PT"}
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
