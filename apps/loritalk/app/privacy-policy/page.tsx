import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Loritalk",
  description: "Privacy Policy for Loritalk by CDN Core Technologies.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-black/40 hover:text-black/70 transition-colors mb-8">
            <span className="material-icons-round text-base">arrow_back</span>
            Back to Home
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-sm text-black/35 mb-10">Last updated: April 2026</p>

          <div className="flex flex-col gap-8 text-sm text-black/70 leading-relaxed">
            <section>
              <h2 className="text-lg font-bold mb-3 text-black">1. Information We Collect</h2>
              <p>Loritalk collects information you provide directly, such as when you create an account, fill out a contact form, or communicate with us. This may include your name, email address, company information, and content you create using our platform.</p>
            </section>
            <section>
              <h2 className="text-lg font-bold mb-3 text-black">2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-5 mt-2 flex flex-col gap-1">
                <li>Provide, maintain, and improve our services</li>
                <li>Process your content through AI models for generation purposes</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Send you technical notices, updates, and administrative messages</li>
                <li>Detect, prevent, and address technical issues</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>
            <section>
              <h2 className="text-lg font-bold mb-3 text-black">3. Content Privacy</h2>
              <p>Your content is never used to train AI models. All content you create through Loritalk is processed solely for the purpose of generating your requested output. We do not share, sell, or use your content for any other purpose.</p>
            </section>
            <section>
              <h2 className="text-lg font-bold mb-3 text-black">4. Data Storage &amp; Security</h2>
              <p>All data is stored on servers located in Europe and processed under GDPR compliance. We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.</p>
            </section>
            <section>
              <h2 className="text-lg font-bold mb-3 text-black">5. Your Rights</h2>
              <p>Under GDPR, you have the right to:</p>
              <ul className="list-disc pl-5 mt-2 flex flex-col gap-1">
                <li>Access your personal data</li>
                <li>Correct inaccurate personal data</li>
                <li>Request deletion of your personal data</li>
                <li>Object to or restrict certain processing of your data</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>
            <section>
              <h2 className="text-lg font-bold mb-3 text-black">6. Cookies</h2>
              <p>We use essential cookies to maintain your session and preferences (such as language selection). We do not use tracking cookies or share data with third-party advertisers.</p>
            </section>
            <section>
              <h2 className="text-lg font-bold mb-3 text-black">7. Contact Us</h2>
              <div className="rounded-xl bg-black/[0.03] p-5">
                <p className="mb-2">If you have questions about this Privacy Policy, please contact us at:</p>
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
