import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import SmoothScroller from "@/components/SmoothScroller";
import Footer from "@/components/Footer";
import InfluencerHero from "@/components/influencer/InfluencerHero";
import InfluencerPains from "@/components/influencer/InfluencerPains";
import InfluencerBenefits from "@/components/influencer/InfluencerBenefits";
import InfluencerWorkflow from "@/components/influencer/InfluencerWorkflow";
import Plans from "@/components/Plans";
import InfluencerFAQ from "@/components/influencer/InfluencerFAQ";
import InfluencerCTA from "@/components/influencer/InfluencerCTA";

export const metadata: Metadata = {
  title: "Loritalk for Creators — One Idea, Every Platform",
  description:
    "Loritalk turns one idea into native posts for Instagram, TikTok, YouTube Shorts, Threads, X and more. Your voice, your schedule, every platform — without the copy-paste.",
  alternates: { canonical: "/influencer" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Loritalk",
    title: "Loritalk for Creators — One Idea, Every Platform",
    description:
      "One brief, eight native posts. Keep your voice consistent across every social network and get your weekends back.",
    url: "https://lori-talk.eu/influencer",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "Loritalk for Creators" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Loritalk for Creators — One Idea, Every Platform",
    description: "One brief, eight native posts. Built for solo creators.",
    images: ["/og-default.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Loritalk for Creators",
      url: "https://lori-talk.eu/influencer",
      description:
        "AI-powered social media content for solo creators and influencers: persona-driven generation, native publishing across 8 networks, scheduling and analytics.",
      audience: { "@type": "Audience", audienceType: "Content Creators" },
    },
    {
      "@type": "Product",
      name: "Loritalk — Creator Plans",
      brand: "Loritalk",
      description: "AI content platform tailored for solo creators and influencers publishing across multiple social networks.",
    },
  ],
};

export default function InfluencerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Navbar />
      <SmoothScroller>
        <main>
          <InfluencerHero />
          <InfluencerPains />
          <InfluencerBenefits />
          <InfluencerWorkflow />
          <Plans variant="influencer" />
          <InfluencerFAQ />
          <InfluencerCTA />
        </main>
        <Footer />
      </SmoothScroller>
    </>
  );
}
