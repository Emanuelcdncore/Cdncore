import type { Metadata } from "next";
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with CDNCore. Reach out to our team for inquiries about our applied informatics, AI solutions, and technology services.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Contact />
      <Footer />
    </>
  );
}
