import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Audience } from "@/components/Audience";
import { Features } from "@/components/Features";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-emerald-100 selection:text-emerald-900">
      <Header />

      <main>
        <Hero />
        <Audience />
        <Features />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
