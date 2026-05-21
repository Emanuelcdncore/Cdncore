import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import SmoothScroller from "@/components/SmoothScroller";
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
    "One workspace per brand. Brand-voice personas, per-workspace calendar and analytics, native publishing across 8 social networks.",
  alternates: { canonical: "/agency" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Loritalk",
    title: "Loritalk for Agencies — AI Content for Every Client, Every Network",
    description:
      "One workspace per brand. Brand-voice personas, per-workspace calendar and analytics, native publishing across 8 networks.",
    url: "https://lori-talk.eu/agency",
  },
  twitter: {
    card: "summary_large_image",
    title: "Loritalk for Agencies — AI Content for Every Client",
    description: "One workspace per brand, eight networks via native APIs.",
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
        "AI-powered social media content for marketing agencies: one workspace per client brand, brand-voice personas, per-workspace calendar and analytics, native publishing across 8 networks.",
      audience: { "@type": "Audience", audienceType: "Marketing Agencies" },
      dateModified: new Date().toISOString(),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://lori-talk.eu" },
        { "@type": "ListItem", position: 2, name: "For Agencies", item: "https://lori-talk.eu/agency" },
      ],
    },
    {
      "@type": "Product",
      name: "Loritalk — Agency Plans",
      brand: "Loritalk",
      description: "AI content platform tailored for marketing agencies managing multiple client brands.",
      offers: [
        { "@type": "Offer", name: "Ultra",    price: "97",  priceCurrency: "EUR", description: "5 workspaces, 25 channels, 40 personas, 25 team members, 4,600 credits/month." },
        { "@type": "Offer", name: "Business", price: "207", priceCurrency: "EUR", description: "15 workspaces, 75 channels, 120 personas, 75 team members, 9,700 credits/month." },
        { "@type": "Offer", name: "Custom",   priceCurrency: "EUR", description: "Bespoke volumes, priority email support and EU data residency. Contact sales." },
      ],
    },
  ],
};

export default function AgencyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Navbar />
      <SmoothScroller>
        <main>
          <AgencyHero />
          <AgencyPains />
          <AgencyBenefits />
          <AgencyWorkflow />
          <Plans variant="agency" />
          <AgencyFAQ />
          <AgencyCTA />
        </main>
        <Footer />
      </SmoothScroller>
    </>
  );
}
