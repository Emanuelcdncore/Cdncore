import type { Metadata } from "next";
import PrivacyPolicy from '@/components/PrivacyPolicy';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read CDNCore's privacy policy. Learn how we collect, use, and protect your personal data in compliance with applicable regulations.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PrivacyPolicy />
      <Footer />
    </>
  );
}
