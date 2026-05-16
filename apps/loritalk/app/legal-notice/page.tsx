import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Legal Notice",
  description: "Legal Notice (Impressum) for Loritalk operated by CDN Core Technologies. Company details, registered office, and contact information.",
  alternates: { canonical: "/legal-notice" },
};

export default function LegalNoticePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-black/40 hover:text-black/70 transition-colors mb-8">
            <span className="material-icons-round text-base">arrow_back</span>
            Back to Home
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold mb-2">Legal Notice</h1>
          <p className="text-sm text-black/35 mb-10">Imprint / Aviso Legal · Last updated: May 2026</p>

          <div className="flex flex-col gap-8 text-sm text-black/70 leading-relaxed">
            <section>
              <h2 className="text-lg font-bold mb-3 text-black">1. Operator of the website</h2>
              <p>The website <strong>lori-talk.eu</strong> and the Loritalk service are operated by:</p>
              <div className="rounded-xl bg-black/[0.03] p-5 mt-3">
                <p><strong>CDN Core Technologies</strong></p>
                <p>Parkurbis &mdash; Parque de Ci&ecirc;ncia e Tecnologia da Covilh&atilde;</p>
                <p>6200-865 Covilh&atilde;, Portugal</p>
                <p className="mt-2"><strong>Phone:</strong> +351 275 959 168</p>
                <p><strong>Email:</strong> info@lori-talk.eu</p>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3 text-black">2. Data protection contact</h2>
              <p>For all matters relating to personal data, the General Data Protection Regulation (GDPR), the Brazilian General Data Protection Law (LGPD), or to exercise your rights as a data subject:</p>
              <div className="rounded-xl bg-black/[0.03] p-5 mt-3">
                <p><strong>Email:</strong> info@lori-talk.eu</p>
                <p><strong>Subject line:</strong> &ldquo;GDPR / LGPD request&rdquo;</p>
              </div>
              <p className="mt-3">A formal Data Protection Officer (DPO / Encarregado) will be designated and named here when service scale triggers the legal requirement.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3 text-black">3. Supervisory authorities</h2>
              <p>You may at any time lodge a complaint with a competent supervisory authority. Without prejudice to any other administrative or judicial remedy:</p>
              <ul className="list-disc pl-5 mt-2 flex flex-col gap-2">
                <li>
                  <strong>Portugal (lead authority for CDN Core Technologies):</strong> Comiss&atilde;o Nacional de Protec&ccedil;&atilde;o de Dados (CNPD) &mdash;{" "}
                  <a href="https://www.cnpd.pt" className="underline" target="_blank" rel="noopener noreferrer">www.cnpd.pt</a>, +351 213 928 400, geral@cnpd.pt
                </li>
                <li>
                  <strong>Brazil:</strong> Autoridade Nacional de Prote&ccedil;&atilde;o de Dados (ANPD) &mdash;{" "}
                  <a href="https://www.gov.br/anpd" className="underline" target="_blank" rel="noopener noreferrer">www.gov.br/anpd</a>
                </li>
                <li><strong>European Union (other Member States):</strong> Your national data protection authority. The full list is published by the European Data Protection Board at <a href="https://edpb.europa.eu/about-edpb/about-edpb/members_en" className="underline" target="_blank" rel="noopener noreferrer">edpb.europa.eu</a>.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3 text-black">4. Online dispute resolution (EU)</h2>
              <p>The European Commission provides a platform for online dispute resolution (ODR) available at{" "}
                <a href="https://ec.europa.eu/consumers/odr" className="underline" target="_blank" rel="noopener noreferrer">ec.europa.eu/consumers/odr</a>.
                We are willing to participate in dispute settlement proceedings before a consumer arbitration board where required by law.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3 text-black">5. Liability for content</h2>
              <p>As a service provider, we are responsible for our own content on these pages in accordance with the applicable laws. We are, however, not obligated to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity. Obligations to remove or block the use of information under general laws remain unaffected. Liability in this regard is only possible from the point in time at which a concrete infringement of the law becomes known.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3 text-black">6. Liability for links</h2>
              <p>Our website may contain links to external third-party websites over which we have no control. We therefore cannot accept any liability for these external contents. The respective provider or operator of the linked sites is always responsible for the content of those sites. The linked sites were checked at the time of linking for possible legal violations; illegal content was not recognisable at that time.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3 text-black">7. Intellectual property</h2>
              <p>All trademarks, logos, copy, and visual designs on this site are the property of CDN Core Technologies or used with permission. &ldquo;Loritalk&rdquo; is a registered trademark of CDN Core Technologies. Reproduction, distribution, or creation of derivative works requires prior written consent.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
