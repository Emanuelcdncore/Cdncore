import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AgencyHero from "@/components/agency/AgencyHero";
import AgencyPains from "@/components/agency/AgencyPains";
import AgencyBenefits from "@/components/agency/AgencyBenefits";
import AgencyWorkflow from "@/components/agency/AgencyWorkflow";
import Plans from "@/components/Plans";
import AgencyFAQ from "@/components/agency/AgencyFAQ";
import AgencyCTA from "@/components/agency/AgencyCTA";

export const metadata: Metadata = {
  title: "Loritalk for Agencies — AI Content for Every Client, Every Network",
  description:
    "Run dozens of brands from one workspace. Brand-voice personas, approval workflows, multi-client calendar, native publishing across 7 social networks.",
  alternates: { canonical: "/agency" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Loritalk",
    title: "Loritalk for Agencies — AI Content for Every Client, Every Network",
    description:
      "Run dozens of brands from one workspace. Brand-voice personas, approval workflows, multi-client calendar, native publishing.",
    url: "https://lori-talk.eu/agency",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "Loritalk for Agencies" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Loritalk for Agencies — AI Content for Every Client",
    description: "Run dozens of brands from one workspace.",
    images: ["/og-default.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Loritalk for Agencies",
      url: "https://lori-talk.eu/agency",
      description:
        "AI-powered social media content for marketing agencies: multi-brand workspaces, brand-voice personas, approval workflows, multi-client calendar.",
      audience: { "@type": "Audience", audienceType: "Marketing Agencies" },
    },
    {
      "@type": "Product",
      name: "Loritalk — Agency Plans",
      brand: "Loritalk",
      description: "AI content platform tailored for marketing agencies managing multiple client brands.",
      offers: [
        { "@type": "Offer", name: "Ultra",    price: "97",  priceCurrency: "EUR", description: "5 workspaces, 25 channels, 40 personas, 25 team members, 4,600 credits/month." },
        { "@type": "Offer", name: "Business", price: "207", priceCurrency: "EUR", description: "15 workspaces, 75 channels, 120 personas, 75 team members, 9,700 credits/month." },
        { "@type": "Offer", name: "Custom",   priceCurrency: "EUR", description: "Custom limits, SSO, DPA and dedicated CSM. Contact sales." },
      ],
    },
  ],
};

export default function AgencyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Navbar />
      <main className="flex-1">
        <AgencyHero />
        <AgencyPains />
        <AgencyBenefits />
        <AgencyWorkflow />
        <Plans variant="agency" />
        <AgencyFAQ />
        <AgencyCTA />
      </main>
      <Footer />
    </div>
  );
}
