import Hero from '@/components/Hero';
import IntroSection from '@/components/IntroSection';
import TrustedBy from '@/components/TrustedBy';
import Capabilities from '@/components/Capabilities';
import HowWeWork from '@/components/HowWeWork';
import OurWork from '@/components/OurWork';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import { LandingScrollProvider } from '@/components/ScrollReveal/LandingScrollProvider';

export default function Home() {
  return (
    <LandingScrollProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                name: "CDNCore",
                url: "https://cdncore.pt",
                logo: "https://cdncore.pt/logo.png",
                description:
                  "Applied informatics and AI solutions company specializing in cybersecurity, intelligent automation, big data analytics, and advanced R&D.",
                foundingDate: "2008",
                address: {
                  "@type": "PostalAddress",
                  streetAddress:
                    "Parkurbis - Parque de Ciência e Tecnologia da Covilhã",
                  addressLocality: "Covilhã",
                  postalCode: "6200-865",
                  addressCountry: "PT",
                },
                contactPoint: {
                  "@type": "ContactPoint",
                  telephone: "+351-275-959-168",
                  contactType: "customer service",
                  email: "infglobal@cdncore.eu",
                },
                sameAs: ["https://www.linkedin.com/company/cdncore"],
              },
              {
                "@type": "WebSite",
                name: "CDNCore",
                url: "https://cdncore.pt",
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "What services does CDNCore offer?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "CDNCore provides comprehensive technology solutions including cybersecurity, AI & intelligent automation, big data analytics, advanced R&D, and full-stack software development.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How does CDNCore approach cybersecurity?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "We employ a multi-layered defense strategy including penetration testing, server hardening, DDoS protection, firewall configuration, and continuous monitoring to safeguard your digital infrastructure.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Can CDNCore integrate AI into existing systems?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "We specialize in deploying custom AI solutions that seamlessly integrate with your existing infrastructure, from smart business assistants to workflow automation and NLP services.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What industries does CDNCore serve?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "We serve diverse industries including finance, insurance, healthcare, telecommunications, and enterprise technology, delivering tailored solutions for each sector's unique challenges.",
                    },
                  },
                ],
              },
            ],
          }),
        }}
      />
      <Hero />
      <IntroSection />
      <TrustedBy />
      <Capabilities />
      <HowWeWork />
      <OurWork />
      <FAQ />
      <CTA />
      <Footer />
    </LandingScrollProvider>
  );
}
