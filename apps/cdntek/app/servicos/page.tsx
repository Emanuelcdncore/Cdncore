import type { Metadata } from "next";
import Footer from "@/components/Footer";
import MapSection from "@/components/MapSection";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Serviços profissionais de instalação audiovisual, cibersegurança e gestão de redes. Soluções completas para o seu negócio.",
  alternates: { canonical: "/servicos" },
};

const bp = process.env.BASE_PATH || '';

const services = [
  {
    title: "INSTALAÇÃO, GESTÃO E MANUTENÇÃO DE EQUIPAMENTOS AUDIOVISUAIS",
    description:
      "Cobertura oficial de eventos institucionais e sessões fotográficas. Suporte técnico completo, incluindo interpretação simultânea, gestão de multimédia e assistência de som.",
    tags: [
      "React 18",
      "Next.js 14",
      "TypeScript",
      "Vue 3",
      "Tailwind CSS",
      "Framer Motion",
    ],
    image: `${bp}/instalacao.jpg`,
  },
  {
    title: "CIBERSEGURANÇA E GESTÃO DE REDES",
    description:
      "A TEK protege a sua infraestrutura com tecnologias avançadas de cibersegurança e uma gestão de redes totalmente optimizada. Monitorizamos, prevenimos e respondemos a ameaças em tempo real, garantindo um ambiente digital seguro, estável e preparado para escalar com o seu negócio.",
    tags: [
      "Cibersegurança",
      "Gestão de redes",
      "Proteção de dados",
      "Firewall",
      "Mitigação de rede",
    ],
    image: `${bp}/seguranca.jpg`,
  },
];

const clipPathVariations = [
  "polygon(15% 0%, 85% 0%, 100% 25%, 100% 75%, 85% 100%, 15% 100%, 0% 75%, 0% 25%)",
  "polygon(25% 0%, 75% 0%, 100% 15%, 100% 85%, 75% 100%, 25% 100%, 0% 85%, 0% 15%)",
  "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)",
  "polygon(18% 0%, 82% 0%, 100% 22%, 100% 78%, 82% 100%, 18% 100%, 0% 78%, 0% 22%)",
  "polygon(22% 0%, 78% 0%, 100% 18%, 100% 82%, 78% 100%, 22% 100%, 0% 82%, 0% 18%)",
  "polygon(16% 0%, 84% 0%, 100% 24%, 100% 76%, 84% 100%, 16% 100%, 0% 76%, 0% 24%)",
];

export default function Services() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={`${bp}/favos.jpg`}
            alt="Hexagonal pattern background"
            fill
            unoptimized
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full px-6 pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl leading-tight">
                Os nossos servi&#231;os
                <br />
                ao seu dispor
              </h1>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-lg">
                A CDNTEK &#233; a representante oficial da Guangdong BaoLun
                Electronics Co., Ltd. na Pen&#237;nsula Ib&#233;rica, garantindo acesso
                directo a produtos de qualidade e tecnologia de ponta.
              </p>
              <div className="pt-4">
                <a
                  href="https://www.linkedin.com/company/cdntek/posts/?feedView=all"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block px-10 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition-all duration-300 text-base uppercase tracking-wide shadow-[0_0_20px_rgba(22,163,74,0.3)] hover:shadow-[0_0_30px_rgba(22,163,74,0.5)] transform hover:-translate-y-1"
                >
                  Saber mais
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Line */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div
          className="w-full"
          style={{
            height: "2px",
            background: "#18491e",
            margin: "40px 0",
            borderRadius: 0,
          }}
        />
      </div>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 space-y-32">
          {services.map((service, index) => (
            <div key={index}>
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-cols-[1fr_1fr]" : ""}`}
              >
                {/* Image */}
                <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-auto block transform hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`space-y-6 flex flex-col justify-center ${index % 2 === 1 ? "lg:order-1" : ""}`}
                >
                  <h2 className="text-3xl md:text-4xl leading-tight">
                    {service.title}
                  </h2>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {service.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-3 pt-4">
                    {service.tags.map((tag, tagIndex) => {
                      const clipPath =
                        clipPathVariations[
                          tagIndex % clipPathVariations.length
                        ];
                      return (
                        <span
                          key={tagIndex}
                          className="relative inline-block octagon-tag-item"
                          style={{
                            padding: "6px 16px",
                            backgroundColor: "rgba(20, 83, 45, 0.1)",
                            clipPath: clipPath,
                          }}
                        >
                          <span className="text-sm text-gray-300 hover:text-green-400 transition-colors cursor-default relative z-10">
                            {tag}
                          </span>
                        </span>
                      );
                    })}
                  </div>

                  <style>{`
                    .octagon-tag-item::before {
                      content: '';
                      position: absolute;
                      inset: 0;
                      border: 1px solid rgba(20, 83, 45, 0.5);
                      clip-path: inherit;
                      pointer-events: none;
                      z-index: 1;
                    }
                    .octagon-tag-item:hover::before {
                      border-color: rgb(34, 197, 94);
                    }
                  `}</style>
                </div>
              </div>

              {/* Green line after last service */}
              {index === services.length - 1 && (
                <div
                  className="w-full"
                  style={{
                    height: "2px",
                    background: "#18491e",
                    marginTop: "100px",
                    marginBottom: "40px",
                    borderRadius: 0,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Map */}
      <div className="max-w-7xl mx-auto px-6">
        <MapSection />
      </div>

      <Footer />
    </div>
  );
}
