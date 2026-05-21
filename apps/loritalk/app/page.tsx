import Navbar from "@/components/Navbar";
import SmoothScroller from "@/components/SmoothScroller";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Imagery from "@/components/Imagery";
import Reviews from "@/components/Reviews";
import UseCases from "@/components/UseCases";
import Plans from "@/components/Plans";
import FAQ from "@/components/FAQ";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "CDN Core Technologies",
      url: "https://lori-talk.eu",
      logo: "https://lori-talk.eu/logo-loritalk.svg",
      foundingDate: "2008",
      address: { "@type": "PostalAddress", streetAddress: "Parkurbis - Parque de Ciencia e Tecnologia da Covilha", addressLocality: "Covilha", postalCode: "6200-865", addressCountry: "PT" },
      contactPoint: { "@type": "ContactPoint", telephone: "+351-275-959-168", contactType: "customer service", email: "info@lori-talk.eu" },
      sameAs: [
        "https://www.instagram.com/loritalk.eu/",
        "https://www.linkedin.com/company/lori-talk/",
      ],
    },
    {
      "@type": "WebApplication",
      name: "Loritalk",
      url: "https://app.lori-talk.eu",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      description: "AI-powered social media content platform that generates platform-native posts for Instagram, LinkedIn, X, TikTok, Facebook, YouTube Shorts, Threads and Telegram — with brand-voice personas, on-brand image generation, scheduling and analytics.",
      offers: [
        { "@type": "Offer", name: "Free", price: "0", priceCurrency: "EUR", description: "100 credits/month (~10 text posts or ~3 AI images), 3 channels, 1 workspace. Free during Beta." },
        { "@type": "Offer", name: "Starter", price: "14", priceCurrency: "EUR", description: "600 credits/month, 3 channels, 4 personas, 1 workspace." },
        { "@type": "Offer", name: "Plus", price: "37", priceCurrency: "EUR", description: "1,700 credits/month, 10 channels, 15 personas, 2 workspaces." },
        { "@type": "Offer", name: "Ultra", price: "97", priceCurrency: "EUR", description: "4,600 credits/month, 25 channels, 40 personas, 5 workspaces." },
        { "@type": "Offer", name: "Business", price: "207", priceCurrency: "EUR", description: "9,700 credits/month, 75 channels, 120 personas, 15 workspaces." },
      ],
      dateModified: new Date().toISOString(),
      creator: { "@type": "Organization", name: "CDN Core Technologies" },
      featureList: [
        "Platform-native content for Instagram, LinkedIn, X, TikTok, Facebook, YouTube Shorts, Threads, Telegram",
        "Brand-voice personas",
        "On-brand image generation per platform",
        "Content scheduling and native publishing",
        "Automated content moderation",
        "Per-channel analytics dashboard",
      ],
    },
    { "@type": "WebSite", name: "Loritalk", url: "https://lori-talk.eu" },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "How does Loritalk's AI work?", acceptedAnswer: { "@type": "Answer", text: "Loritalk generates a platform-native version of your brief for each connected channel, then renders on-brand images in parallel. Everything passes through an automated moderation layer before reaching your dashboard." } },
        { "@type": "Question", name: "How is Loritalk different from other AI tools?", acceptedAnswer: { "@type": "Answer", text: "Other tools give you one block of text to copy-paste everywhere. Loritalk produces native versions per platform \u2014 length, hashtags, emoji and tone adapted to each network \u2014 and publishes through each platform's official API." } },
        { "@type": "Question", name: "Which social networks are supported?", acceptedAnswer: { "@type": "Answer", text: "LinkedIn, Instagram, Facebook, X, TikTok, YouTube Shorts, Threads and Telegram \u2014 eight networks via native APIs." } },
        { "@type": "Question", name: "Where is my data stored?", acceptedAnswer: { "@type": "Answer", text: "Your data is stored on servers in the European Union. The AI providers we use (OpenAI for text, Google for images) operate under their enterprise API terms \u2014 content sent to the API is not used to train their general-purpose models." } },
        { "@type": "Question", name: "Can I use Loritalk with my team?", acceptedAnswer: { "@type": "Answer", text: "Yes. Create workspaces for each brand and invite team members with admin or publisher roles. Each workspace has its own connected channels, personas and calendar." } },
        { "@type": "Question", name: "What happens after the Beta?", acceptedAnswer: { "@type": "Answer", text: "Paid plans begin, but every Beta user keeps their current rate locked forever." } },
      ],
    },
    {
      "@type": "HowTo",
      name: "How to create AI-optimized social media content with Loritalk",
      description: "Generate platform-native content for every connected social network from a single briefing.",
      step: [
        { "@type": "HowToStep", position: 1, name: "Write your briefing", text: "Describe what you want to communicate. Pick your channels, language, persona and tone." },
        { "@type": "HowToStep", position: 2, name: "Generate native versions", text: "Loritalk produces a version of the post adapted to each platform \u2014 length, hashtags, emoji and tone \u2014 plus on-brand images rendered in parallel." },
        { "@type": "HowToStep", position: 3, name: "Pick, edit and publish", text: "Choose the version for each channel. Tweak anything with one click. Publish now or schedule for later." },
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Navbar />
      <SmoothScroller>
        <main>
          <Hero />
          <Stats />
          <Problem />
          <Solution />
          <Features />
          <HowItWorks />
          <Imagery />
          <UseCases />
          <Plans />
          <Reviews />
          <FAQ />
          <CTABanner />
        </main>
        <Footer />
      </SmoothScroller>
    </>
  );
}
