/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Supported Networks",
  description: "Loritalk supports Instagram, LinkedIn, Facebook, X (Twitter), and TikTok. Generate optimized content for each platform with AI.",
  alternates: { canonical: "/supported-networks" },
};

const networks = [
  {
    name: "Instagram",
    logo: "/logos/instagram.svg",
    color: "#E4405F",
    description: "Generate captions, carousel descriptions, Reels scripts, and Stories copy. Loritalk optimizes hashtags, emoji placement, and caption length for maximum engagement.",
    formats: ["Feed captions", "Carousel descriptions", "Reels scripts", "Stories copy", "Hashtag sets"],
  },
  {
    name: "LinkedIn",
    logo: "/logos/linkedin.svg",
    color: "#0A66C2",
    description: "Create professional posts, thought leadership articles, and company updates. Loritalk adapts tone for B2B audiences with the right mix of expertise and approachability.",
    formats: ["Professional posts", "Article drafts", "Company updates", "Event announcements", "Industry insights"],
  },
  {
    name: "Facebook",
    logo: "/logos/facebook.svg",
    color: "#1877F2",
    description: "Write engaging posts for pages and groups. Loritalk balances informality with brand voice, optimizing for shares and comments.",
    formats: ["Page posts", "Group posts", "Event descriptions", "Ad copy drafts", "Community updates"],
  },
  {
    name: "X (Twitter)",
    logo: "/logos/x.svg",
    color: "#000000",
    description: "Craft concise posts, threads, and replies within character limits. Loritalk maximizes impact in minimal space with punchy, shareable copy.",
    formats: ["Single posts", "Threads", "Quote posts", "Poll questions", "Engagement replies"],
  },
  {
    name: "TikTok",
    logo: "/logos/tiktok.svg",
    color: "#000000",
    description: "Generate video scripts, captions, and trending hashtag combinations. Loritalk understands TikTok's casual, trend-driven culture and writes accordingly.",
    formats: ["Video scripts", "Captions", "Hashtag strategies", "Hook lines", "Call-to-actions"],
  },
];

export default function SupportedNetworksPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-black/40 hover:text-black/70 transition-colors mb-8">
            <span className="material-icons-round text-base">arrow_back</span>
            Back to Home
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">Supported Networks</h1>
          <p className="text-lg text-black/55 font-normal mb-12 max-w-2xl">
            Loritalk generates optimized content for each platform — respecting format, tone, character limits, and best practices.
          </p>

          <div className="flex flex-col gap-8">
            {networks.map((n) => (
              <div key={n.name} className="rounded-2xl border border-black/8 p-6 md:p-8 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: n.color + "12" }}>
                    <img src={n.logo} alt={n.name} className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold">{n.name}</h2>
                </div>
                <p className="text-sm text-black/60 font-normal leading-relaxed mb-4">{n.description}</p>
                <div className="flex flex-wrap gap-2">
                  {n.formats.map((f) => (
                    <span key={f} className="text-xs px-3 py-1 rounded-full bg-black/5 text-black/50">{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-black/40 mb-4">More networks coming soon.</p>
            <Link href="https://app.lori-talk.eu/register" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: "#94BF5C" }}>
              <span className="material-icons-round text-base">rocket_launch</span>
              Start creating for free
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
