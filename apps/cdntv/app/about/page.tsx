import type { Metadata } from "next";
import AboutSection from "@/components/AboutSection";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the CDNTV team. A passionate group of audiovisual professionals delivering high-end production services from Covilha, Portugal since 2009.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
    return (
        <main className="relative bg-black min-h-screen">
            <AboutSection />
        </main>
    );
}
