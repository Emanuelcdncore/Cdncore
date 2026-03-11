"use client";

import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import FeaturesSection from "@/components/FeaturesSection";
import PartnersSection from "@/components/PartnersSection";
import CompanySection from "@/components/CompanySection";
import FAQSection from "@/components/FAQSection";
import MapSection from "@/components/MapSection";
import { useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function HomeContent() {
  const searchParams = useSearchParams();

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition =
      elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const scrollTo = searchParams.get("scrollTo");
    if (scrollTo) {
      const timer = setTimeout(() => {
        scrollToSection(scrollTo);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [searchParams, scrollToSection]);

  return (
    <div className="bg-background text-foreground min-h-screen">
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

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <HomeContent />
    </Suspense>
  );
}
