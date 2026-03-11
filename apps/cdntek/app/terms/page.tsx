"use client";

import Footer from "@/components/Footer";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

export default function TermsOfService() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = useMemo(
    () => [
      {
        title: "1. Introduction and Acceptance",
        content: (
          <>
            <p>
              Welcome to CDNTEK. These Terms of Service govern the use of our
              website (cdntek.eu) and our services specialized in artificial
              intelligence, AI agents and autonomous drone technology.
            </p>
            <p>
              By accessing or using our services, you agree to be bound by
              these Terms. If you do not agree with any part of these terms,
              please do not use our services.
            </p>
          </>
        ),
      },
      {
        title: "2. About CDNTEK",
        content: (
          <div>
            <p className="font-semibold text-white">
              CDNTEK - AI Agent & Drone Services
            </p>
            <p>
              {t("contact.address.parkurbis")} -{" "}
              {t("contact.address.park")}
            </p>
            <p>{t("contact.address.postal")}, Portugal</p>
            <p>Phone: +351 275 959 168</p>
            <p>Email: infglobal@cdncore.eu</p>
            <p>Website: cdntek.eu</p>
          </div>
        ),
      },
      {
        title: "3. Services Offered",
        content: (
          <>
            <p>CDNTEK offers the following specialized services:</p>
            <h3 className="text-lg font-semibold text-white">
              3.1 CORE - AI Platform
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Development of customized artificial intelligence agents
              </li>
              <li>
                Implementation of machine learning and deep learning solutions
              </li>
              <li>Digital transformation consulting through AI</li>
              <li>
                Integration of intelligent systems into existing processes
              </li>
            </ul>
            <h3 className="text-lg font-semibold text-white mt-4">
              3.2 Autonomous Drone Services
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Development of intelligent drones for specific missions
              </li>
              <li>Automated monitoring and surveillance</li>
              <li>Technical inspections and aerial mapping</li>
            </ul>
            <h3 className="text-lg font-semibold text-white mt-4">
              3.3 Design and Development Services
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Web development and mobile applications</li>
              <li>User interface design (UI/UX)</li>
              <li>Visual identity and branding creation</li>
              <li>Digital marketing solutions</li>
            </ul>
          </>
        ),
      },
      {
        title: "4. Eligibility and Registration",
        content: (
          <>
            <p>To use our services, you must:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Be at least 18 years old or legally represent a company
              </li>
              <li>Have legal capacity to enter into contracts</li>
              <li>
                Provide accurate and complete information during registration
              </li>
              <li>
                Maintain confidentiality of your access credentials
              </li>
            </ul>
          </>
        ),
      },
      {
        title: "5. Acceptable Use",
        content: (
          <>
            <p>
              You agree to use our services only for legal purposes and in
              accordance with these Terms. It is prohibited to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Use services for illegal or unauthorized activities</li>
              <li>Violate third-party intellectual property rights</li>
              <li>
                Transmit offensive, defamatory or discriminatory content
              </li>
              <li>
                Interfere with the security or operation of our systems
              </li>
              <li>
                Use drones in restricted airspace without authorization
              </li>
              <li>
                Use AI technology for malicious or discriminatory purposes
              </li>
              <li>Reverse engineer our systems or algorithms</li>
            </ul>
          </>
        ),
      },
      {
        title: "6. Intellectual Property",
        content: (
          <>
            <h3 className="text-lg font-semibold text-white">
              6.1 CDNTEK Property
            </h3>
            <p>
              All intellectual property rights related to our
              services--including software, algorithms, designs, logos and
              content--belong to CDNTEK or its licensors.
            </p>
            <h3 className="text-lg font-semibold text-white mt-4">
              6.2 Usage License
            </h3>
            <p>
              We grant you a limited, non-exclusive and revocable license to
              use our services in accordance with these Terms.
            </p>
            <h3 className="text-lg font-semibold text-white mt-4">
              6.3 Client Content
            </h3>
            <p>
              You retain all rights to the content you provide. You grant us a
              license to process that content only to the extent necessary to
              provide the services.
            </p>
          </>
        ),
      },
      {
        title: "7. Data Protection and Privacy",
        content: (
          <p>
            Our Privacy Policy describes how we collect, use and protect
            personal data. By using our services, you also agree to that
            policy.
          </p>
        ),
      },
      {
        title: "8. Fees and Payments",
        content: (
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Project fees and service scopes are defined in each contract or
              proposal.
            </li>
            <li>
              Invoices must be paid within agreed deadlines, typically 30
              days.
            </li>
            <li>
              Late payments may incur interest or service suspension.
            </li>
          </ul>
        ),
      },
      {
        title: "9. Service Availability",
        content: (
          <p>
            We strive to ensure high availability of our platforms, AI systems
            and autonomous drone operations. However, we are not responsible
            for downtime caused by force majeure, third-party failures or
            maintenance windows.
          </p>
        ),
      },
      {
        title: "10. Limitation of Liability",
        content: (
          <ul className="list-disc pl-5 space-y-1">
            <li>
              CDNTEK is not liable for indirect, incidental or consequential
              damages resulting from the use of our services.
            </li>
            <li>
              Our total liability is limited to the amounts paid in the 12
              months preceding the incident, unless otherwise required by law.
            </li>
          </ul>
        ),
      },
      {
        title: "11. Termination",
        content: (
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Either party may terminate a service for breach or by providing
              written notice under contract terms.
            </li>
            <li>
              Upon termination, outstanding amounts become due and
              confidential information must be returned or destroyed.
            </li>
          </ul>
        ),
      },
      {
        title: "12. Governing Law",
        content: (
          <p>
            These Terms are governed by the laws of Portugal. Any dispute will
            be resolved in the competent courts of Covilh\u00e3, without prejudice
            to mandatory EU consumer protection rules.
          </p>
        ),
      },
      {
        title: "13. Changes to the Terms",
        content: (
          <p>
            We may update these Terms to reflect improvements, regulatory
            changes or new services. Updates will be published on cdntek.eu
            and become effective upon posting.
          </p>
        ),
      },
      {
        title: "14. Contact",
        content: (
          <div>
            <p className="font-semibold text-white">
              Legal & Compliance Team
            </p>
            <p>Email: infglobal@cdncore.eu</p>
            <p>Phone: +351 275 959 168</p>
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
              {t("terms.title")}
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold">
              {t("terms.subtitle")}
            </h1>
            <p className="text-sm text-white/50">
              {t("terms.lastUpdated")}
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
