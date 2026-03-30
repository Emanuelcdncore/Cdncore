import type { Metadata } from "next";
import TermsOfService from '@/components/TermsOfService';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Review CDNCore's terms of service. These terms govern your use of our website and outline the rights and responsibilities of all parties.",
  alternates: { canonical: "/terms-of-service" },
};

export default function TermsOfServicePage() {
  return (
    <>
      <TermsOfService />
      <Footer />
    </>
  );
}
