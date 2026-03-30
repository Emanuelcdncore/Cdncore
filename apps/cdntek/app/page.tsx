import { Suspense } from "react";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import FeaturesSection from "@/components/FeaturesSection";
import PartnersSection from "@/components/PartnersSection";
import CompanySection from "@/components/CompanySection";
import FAQSection from "@/components/FAQSection";
import MapSection from "@/components/MapSection";
import ScrollToSection from "@/components/ScrollToSection";

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                name: "CDNTEK",
                url: "https://cdntek.pt",
                logo: "https://cdntek.pt/logo.png",
                description:
                  "Soluções profissionais de tecnologia audiovisual, cibersegurança e gestão de redes. Representante oficial ITC na Península Ibérica.",
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
                sameAs: ["https://www.linkedin.com/company/cdntek"],
              },
              {
                "@type": "WebSite",
                name: "CDNTEK",
                url: "https://cdntek.pt",
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Como é que a CDNTEK pode ajudar o meu negócio?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "A CDNTEK oferece soluções completas em infraestrutura de TI, gestão de redes, cibersegurança e equipamentos audiovisuais de última geração.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Que tipo de contactos podem ser estabelecidos para a TEK?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Oferecemos múltiplas formas de contacto: telefone, email, formulário web, presencialmente ou através de reunião agendada.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "O suporte técnico está incluído?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Sim, o suporte técnico está incluído em todos os nossos serviços e contactos, com disponibilidade 24/7 para emergências.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "A TEK é adequada para pequenas empresas?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Possuímos soluções escaláveis adequadas para empresas de qualquer tamanho, desde startups até grandes corporações.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Qual é o tempo de implementação?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "O tempo varia conforme a complexidade do projecto. Trabalhamos para implementar soluções de forma rápida e eficiente.",
                    },
                  },
                ],
              },
            ],
          }),
        }}
      />
      <Suspense>
        <ScrollToSection />
      </Suspense>
      <main className="pt-16 md:pt-20">
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <FeaturesSection />
        <PartnersSection />
        <CompanySection />
        <FAQSection />
        <div className="px-6 bg-black">
          <MapSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
