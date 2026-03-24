import { FloatingNav } from "@/components/ui/floating-nav";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import CTASection from "@/components/CTASection";
import Orb from "@/components/Orb";
import Link from "next/link";

export default function Home() {
  const navItems = [
    { name: "About", link: "/about/" },
    { name: "Services", link: "/services/" },
    { name: "Contact", link: "/contact/" },
  ];
  return (
    <div className="min-h-screen bg-background">
      <FloatingNav navItems={navItems} />
      <main>
        <section id="home">
          <HeroSection />
        </section>
        <section id="services">
          <ServicesSection />
        </section>
        <section id="projects">
          <ProjectsSection />
        </section>
        {/* Orb Section - igual ao About/Services */}
        <section className="py-24 relative overflow-hidden min-h-screen flex items-center">
          {/* Dark background */}
          <div className="absolute inset-0 bg-black" />
          {/* Decorative corner lines */}
          <div className="absolute" style={{ top: 'calc(6rem + 2px)', left: 'calc(10% + 2px)', width: '5rem', height: '5rem', zIndex: 20 }}>
            <div className="w-full h-0.5 bg-gradient-to-r from-orange-500 to-pink-500"></div>
            <div className="w-0.5 h-full bg-gradient-to-b from-orange-500 to-pink-500"></div>
          </div>
          <div className="absolute" style={{ bottom: '5rem', right: '10%', width: '5rem', height: '5rem', zIndex: 20 }}>
            <div className="w-full h-0.5 absolute bottom-0 left-0 bg-gradient-to-l from-pink-500 to-orange-500"></div>
            <div className="w-0.5 h-full absolute right-0 top-0 bg-gradient-to-b from-orange-500 to-pink-500"></div>
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex items-center justify-center">
              {/* Orb com conteúdo centralizado */}
              <div style={{ width: '100%', height: '600px', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
                  <Orb
                    hue={235}
                    hoverIntensity={0}
                    rotateOnHover={false}
                    forceHoverState={false}
                  />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center" style={{ zIndex: 2 }}>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Ready to Create?</h2>
                  <p className="text-lg text-white/80 mb-6">Let&apos;s bring your vision to life.</p>
                  <Link
                    href="/contact"
                    className="bg-white text-black hover:bg-white/90 px-6 py-3 text-base font-semibold rounded-lg transition-colors"
                  >
                    START A PROJECT
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="mission">
          <CTASection />
        </section>
      </main>
    </div>
  );
}
