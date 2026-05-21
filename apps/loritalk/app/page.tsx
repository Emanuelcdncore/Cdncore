import Navbar from "@/components/Navbar";
import SmoothScroller from "@/components/SmoothScroller";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Imagery from "@/components/Imagery";
import Differentiator from "@/components/Differentiator";
import Reviews from "@/components/Reviews";
import UseCases from "@/components/UseCases";
import Pricing from "@/components/Pricing";
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
    },
    {
      "@type": "WebApplication",
      name: "Loritalk",
      url: "https://app.lori-talk.eu",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      description: "AI-powered social media content generation platform that uses multiple AI models to create optimized posts for Instagram, LinkedIn, X, TikTok, and Facebook.",
      offers: [
        { "@type": "Offer", name: "Free", price: "0", priceCurrency: "EUR", description: "5 posts/month, 3 networks. Free during Beta." },
        { "@type": "Offer", name: "Creator", price: "25", priceCurrency: "EUR", description: "200 posts/month, all networks, advanced personas, content calendar." },
      ],
      creator: { "@type": "Organization", name: "CDN Core Technologies" },
      featureList: [
        "Multi-model AI deliberation",
        "Platform-optimized content for Instagram, LinkedIn, X, TikTok, Facebook",
        "Multilingual generation in 24+ languages",
        "Content scheduling and publishing",
        "Brand voice and persona customization",
        "Analytics dashboard",
      ],
    },
    { "@type": "WebSite", name: "Loritalk", url: "https://lori-talk.eu" },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "How does Loritalk's AI work?", acceptedAnswer: { "@type": "Answer", text: "Loritalk connects to multiple leading AI providers. You can configure which models participate in your generation pipeline." } },
        { "@type": "Question", name: "How is Loritalk different from other AI tools?", acceptedAnswer: { "@type": "Answer", text: "Other AI tools give you one output from one model. Loritalk runs multiple models in parallel, then makes them refine each other\u2019s work \u2014 producing consistently higher quality. Plus, every post is automatically optimized for each specific platform." } },
        { "@type": "Question", name: "Which social networks are supported?", acceptedAnswer: { "@type": "Answer", text: "LinkedIn, Instagram, Facebook, X (Twitter), and TikTok." } },
        { "@type": "Question", name: "Is my content private?", acceptedAnswer: { "@type": "Answer", text: "Yes. Your content is never used to train AI models. All data is stored on servers in Europe and processed under GDPR compliance." } },
        { "@type": "Question", name: "Can I use Loritalk with my team?", acceptedAnswer: { "@type": "Answer", text: "Yes. Create workspaces for each brand, invite team members with admin or publisher roles, and set up approval workflows." } },
        { "@type": "Question", name: "What happens after the Beta?", acceptedAnswer: { "@type": "Answer", text: "Paid plans begin, but every Beta user keeps their current rate locked forever." } },
      ],
    },
    {
      "@type": "HowTo",
      name: "How to create AI-optimized social media content with Loritalk",
      description: "Generate optimized content for multiple social networks from a single briefing using multiple AI models.",
      step: [
        { "@type": "HowToStep", position: 1, name: "Write your briefing", text: "Describe what you want to communicate. Pick your channels, language, and tone." },
        { "@type": "HowToStep", position: 2, name: "AI models compete for you", text: "Multiple AI models generate content independently, then review and refine each other\u2019s output." },
        { "@type": "HowToStep", position: 3, name: "Pick, edit and publish", text: "Choose your favorite version for each channel. Tweak anything with one click. Publish now or schedule for later." },
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
          <Differentiator />
          <UseCases />
          <Pricing />
          <Reviews />
          <FAQ />
          <CTABanner />
        </main>
        <Footer />
      </SmoothScroller>
    </>
  );
}
