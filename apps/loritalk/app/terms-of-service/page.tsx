import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Loritalk by CDN Core Technologies. AI content generation platform. Governed by Portuguese law.",
  alternates: { canonical: "/terms-of-service" },
};

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-black/40 hover:text-black/70 transition-colors mb-8">
            <span className="material-icons-round text-base">arrow_back</span>
            Back to Home
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold mb-2">Terms of Service</h1>
          <p className="text-sm text-black/35 mb-10">Last updated: May 2026</p>

          <div className="flex flex-col gap-8 text-sm text-black/70 leading-relaxed">
            <section>
              <h2 className="text-lg font-bold mb-3 text-black">1. Acceptance of Terms</h2>
              <p>By accessing and using Loritalk&apos;s services and website (lori-talk.eu), you accept and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services.</p>
            </section>
            <section>
              <h2 className="text-lg font-bold mb-3 text-black">2. Description of Services</h2>
              <p>Loritalk is an AI-powered content generation platform operated by CDN Core Technologies. The platform enables users to create optimized social media content for multiple platforms using multiple AI models. The specific scope of services and features available to you depends on your subscription plan.</p>
            </section>
            <section>
              <h2 className="text-lg font-bold mb-3 text-black">3. User Accounts</h2>
              <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.</p>
            </section>
            <section>
              <h2 className="text-lg font-bold mb-3 text-black">4. Content Ownership</h2>
              <p>You retain ownership of the content you create using Loritalk. By using our services, you grant us a limited license to process your content solely for the purpose of providing the service. Your content is never used to train AI models.</p>
            </section>
            <section>
              <h2 className="text-lg font-bold mb-3 text-black">5. Intellectual Property</h2>
              <p>All content, logos, designs, and materials on this website are the property of CDN Core Technologies and are protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written consent.</p>
            </section>
            <section>
              <h2 className="text-lg font-bold mb-3 text-black">6. Acceptable Use</h2>
              <p>You agree not to use Loritalk to generate content that is illegal, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable. We reserve the right to suspend or terminate accounts that violate these guidelines.</p>
            </section>
            <section>
              <h2 className="text-lg font-bold mb-3 text-black">7. Limitation of Liability</h2>
              <p>CDN Core Technologies shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services or website. The AI-generated content is provided as suggestions and should be reviewed before publication.</p>
            </section>
            <section>
              <h2 className="text-lg font-bold mb-3 text-black">8. Beta Program</h2>
              <p>During the Beta period, services are provided free of charge. We may modify, suspend, or discontinue Beta features at any time without prior notice. Beta users who transition to paid plans will have their Beta rate locked as advertised.</p>
            </section>
            <section>
              <h2 className="text-lg font-bold mb-3 text-black">9. Account Deletion &amp; Data Export</h2>
              <p>You can delete your Loritalk account at any time from your account settings, or by emailing info@lori-talk.eu. On deletion, personal data is erased within 30 days, subject to legal retention obligations (for example, tax and accounting records under Portuguese law). You can also request a machine-readable export of your data at any time. Contact-form submissions are retained for 24 months after the last interaction and can be deleted earlier on request.</p>
            </section>
            <section>
              <h2 className="text-lg font-bold mb-3 text-black">10. Data Protection</h2>
              <p>Processing of personal data is governed by our <Link href="/privacy-policy" className="underline">Privacy Policy</Link> and <Link href="/cookie-policy" className="underline">Cookie Policy</Link>, issued under GDPR (Regulation (EU) 2016/679) and the Brazilian LGPD (Lei 13.709/2018). You retain all rights described in those documents, including access, rectification, erasure, portability, and the right to lodge a complaint with a supervisory authority.</p>
            </section>
            <section>
              <h2 className="text-lg font-bold mb-3 text-black">11. Governing Law</h2>
              <p>These Terms shall be governed by and construed in accordance with the laws of Portugal, without regard to its conflict of law provisions. Mandatory consumer-protection rights granted by the law of your habitual residence remain unaffected.</p>
            </section>
            <section>
              <h2 className="text-lg font-bold mb-3 text-black">12. Contact</h2>
              <div className="rounded-xl bg-black/[0.03] p-5">
                <p className="mb-2">For questions about these Terms, contact us at:</p>
                <p><strong>Email:</strong> info@lori-talk.eu</p>
                <p><strong>Company:</strong> CDN Core Technologies</p>
                <p><strong>Address:</strong> Parkurbis, 6200-865 Covilh&atilde;, Portugal</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
