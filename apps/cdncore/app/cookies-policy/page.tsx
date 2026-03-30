import type { Metadata } from "next";
import CookiesPolicy from '@/components/CookiesPolicy';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "Cookies Policy",
  description:
    "Understand how CDNCore uses cookies on our website. This policy explains the types of cookies we use and how you can manage your preferences.",
  alternates: { canonical: "/cookies-policy" },
};

export default function CookiesPolicyPage() {
  return (
    <>
      <CookiesPolicy />
      <Footer />
    </>
  );
}
