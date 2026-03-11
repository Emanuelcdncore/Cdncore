"use client";

import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const bp = process.env.BASE_PATH || '';

export default function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const performScroll = () => {
        const element = document.getElementById(sectionId);
        if (!element) return;
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      };

      if (pathname !== "/") {
        router.push("/?scrollTo=" + sectionId);
      } else {
        performScroll();
      }
    },
    [pathname, router]
  );

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const footerSections = [
    {
      title: t("footer.sections.services"),
      links: [
        { label: t("footer.links.installation"), isInfo: true },
        { label: t("footer.links.management"), isInfo: true },
        { label: t("footer.links.maintenance"), isInfo: true },
        { label: t("footer.links.networks"), isInfo: true },
        { label: t("footer.links.cybersecurity"), isInfo: true },
      ],
    },
    {
      title: t("footer.sections.company"),
      links: [
        {
          label: "Sobre",
          href: "#sobre",
          isRoute: false,
          sectionId: "sobre",
        },
        { label: "FAQ", href: "#faq", isRoute: false, sectionId: "faq" },
        { label: "Contact", to: "/contact" },
      ],
    },
    {
      title: t("footer.sections.legal"),
      links: [
        { label: t("footer.links.privacy"), to: "/privacy" },
        { label: t("footer.links.terms"), to: "/terms" },
      ],
    },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_auto_auto_auto] gap-16 mb-12 text-center md:text-left">
          {/* Brand Section */}
          <div className="space-y-6 flex flex-col items-center md:items-start">
            <div className="w-48 h-12">
              <Image
                src={`${bp}/LOGO_TEK_VERSAO_W.png`}
                alt="CDNTEK Logo"
                width={192}
                height={48}
                unoptimized
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              {t("footer.description")}
            </p>

            {/* Newsletter Signup */}
            <form onSubmit={handleSubscribe} className="space-y-3 mt-6">
              <input
                type="email"
                placeholder={t("footer.emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-800 text-white border-none rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                {subscribed ? t("footer.subscribed") : t("footer.subscribe")}
              </button>
            </form>
          </div>

          {/* Footer Links Sections */}
          {footerSections.map((section) => (
            <div
              key={section.title}
              className="lg:pl-8 flex flex-col items-center md:items-start"
            >
              <h3 className="text-green-500 font-semibold text-base mb-6">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link: any) => (
                  <li key={link.label}>
                    {link.isInfo ? (
                      <span className="text-gray-400 text-sm">
                        {link.label}
                      </span>
                    ) : link.sectionId ? (
                      <button
                        onClick={() => scrollToSection(link.sectionId)}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {link.label}
                      </button>
                    ) : link.to ? (
                      <Link
                        href={link.to}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
