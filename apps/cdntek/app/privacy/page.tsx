"use client";

import Footer from "@/components/Footer";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

export default function PrivacyPolicy() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = useMemo(
    () => [
      {
        title: "1. Introduction",
        content: (
          <>
            <p>
              CDNTEK is committed to protecting your privacy. This Privacy
              Policy explains how we collect, use, disclose and protect your
              information when you use our website (cdntek.eu) and our
              artificial intelligence and autonomous drone services.
            </p>
            <p>
              This policy complies with the European Union&apos;s General Data
              Protection Regulation (GDPR) and other applicable data protection
              laws.
            </p>
          </>
        ),
      },
      {
        title: "2. Data Controller",
        content: (
          <div>
            <p className="font-semibold text-white">CDNTEK</p>
            <p>
              {t("contact.address.parkurbis")} -{" "}
              {t("contact.address.park")}
            </p>
            <p>{t("contact.address.postal")}, Portugal</p>
            <p>Phone: +351 275 959 168</p>
            <p>Email: infglobal@cdncore.eu</p>
          </div>
        ),
      },
      {
        title: "3. Personal Data We Collect",
        content: (
          <>
            <h3 className="text-lg font-semibold text-white">
              3.1 Data you provide
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Contact data:</strong> name, email, phone, company
              </li>
              <li>
                <strong>Communication data:</strong> messages sent through our
                forms
              </li>
              <li>
                <strong>Professional data:</strong> role, area of interest in AI
                and drones
              </li>
            </ul>
            <h3 className="text-lg font-semibold text-white mt-4">
              3.2 Data collected automatically
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Technical data:</strong> IP address, browser type,
                operating system
              </li>
              <li>
                <strong>Navigation data:</strong> pages visited, time on site,
                traffic source
              </li>
              <li>
                <strong>Cookies and similar technologies:</strong> as described
                in our Cookie Policy
              </li>
            </ul>
          </>
        ),
      },
      {
        title: "4. Legal Basis and Processing Purposes",
        content: (
          <>
            <h3 className="text-lg font-semibold text-white">
              4.1 Consent (Art. 6(1)(a) GDPR)
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Direct marketing and promotional communications</li>
              <li>Non-essential cookies and behavior analysis</li>
            </ul>
            <h3 className="text-lg font-semibold text-white mt-4">
              4.2 Contract performance (Art. 6(1)(b) GDPR)
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provision of our AI and drone services</li>
              <li>Communication related to projects and services</li>
            </ul>
            <h3 className="text-lg font-semibold text-white mt-4">
              4.3 Legitimate interests (Art. 6(1)(f) GDPR)
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Website security and protection</li>
              <li>Statistical analysis and service improvement</li>
              <li>Fraud prevention and malicious activities</li>
            </ul>
          </>
        ),
      },
      {
        title: "5. How We Use Your Data",
        content: (
          <ul className="list-disc pl-5 space-y-1">
            <li>Provide and manage AI, drone and digital services</li>
            <li>Customize your experience on our platforms</li>
            <li>
              Communicate about project updates, proposals and new services
            </li>
            <li>
              Conduct research and development to improve our technology
            </li>
            <li>
              Ensure compliance with legal obligations and security standards
            </li>
          </ul>
        ),
      },
      {
        title: "6. Data Sharing and International Transfers",
        content: (
          <>
            <p>We may share your data with:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Group companies and strategic partners</li>
              <li>
                Technology service providers (cloud, analytics, CRM, security)
              </li>
              <li>Regulatory authorities, when legally required</li>
            </ul>
            <p className="mt-4">
              Any international transfer of data outside the EU will be
              protected through Standard Contractual Clauses or equivalent
              mechanisms recognized by GDPR.
            </p>
          </>
        ),
      },
      {
        title: "7. Data Retention",
        content: (
          <>
            <p>
              We retain your personal data only for the period strictly
              necessary to fulfill the purposes described:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Marketing data:</strong> up to 24 months after the last
                interaction
              </li>
              <li>
                <strong>Contractual data:</strong> for the duration of the
                contract and up to 10 years for compliance
              </li>
              <li>
                <strong>Cookies:</strong> according to preferences defined in
                our Cookie Policy
              </li>
            </ul>
          </>
        ),
      },
      {
        title: "8. Your Rights (Art. 15-22 GDPR)",
        content: (
          <>
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Access, rectify or update your data</li>
              <li>
                Request erasure (&ldquo;right to be forgotten&rdquo;)
              </li>
              <li>Restrict processing or object to processing</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="mt-4">
              To exercise your rights, contact us at{" "}
              <a
                href="mailto:infglobal@cdncore.eu"
                className="text-white underline"
              >
                infglobal@cdncore.eu
              </a>
              . We respond within 30 days.
            </p>
          </>
        ),
      },
      {
        title: "9. Security Measures",
        content: (
          <ul className="list-disc pl-5 space-y-1">
            <li>Data encryption at rest and in transit</li>
            <li>Multifactor authentication</li>
            <li>Access control and activity monitoring</li>
            <li>Security audits and penetration tests</li>
            <li>Security policies for AI and drones</li>
          </ul>
        ),
      },
      {
        title: "10. Cookies and Similar Technologies",
        content: (
          <p>
            We use cookies to improve your experience, analyze traffic and
            personalize content. You can manage your preferences through our
            Cookie Policy.
          </p>
        ),
      },
      {
        title: "11. Contact",
        content: (
          <div>
            <p className="font-semibold text-white">
              Data Protection Officer (DPO)
            </p>
            <p>Email: infglobal@cdncore.eu</p>
            <p>
              Address: {t("contact.address.parkurbis")} -{" "}
              {t("contact.address.park")}, {t("contact.address.postal")},
              Portugal
            </p>
          </div>
        ),
      },
    ],
    [t]
  );

  return (
    <div className="bg-black text-white min-h-screen">
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto space-y-10 text-gray-300 leading-relaxed">
          <div className="space-y-2 text-center md:text-left">
            <p className="text-sm uppercase tracking-[0.4em] text-white/60">
              {t("privacy.title")}
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold">
              {t("privacy.subtitle")}
            </h1>
            <p className="text-sm text-white/50">
              {t("privacy.lastUpdated")}
            </p>
          </div>
          {sections.map((section) => (
            <section
              key={section.title}
              className="space-y-4 border border-white/5 rounded-2xl p-6 bg-[#101010] shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
            >
              <h2 className="text-2xl font-semibold text-white">
                {section.title}
              </h2>
              <div className="space-y-4">{section.content}</div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
