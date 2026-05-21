import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie Policy for Loritalk by CDN Core Technologies. Details on cookies, local storage, and tracking technologies used on lori-talk.eu.",
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-black/40 hover:text-black/70 transition-colors mb-8">
            <span className="material-icons-round text-base">arrow_back</span>
            Back to Home
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold mb-2">Cookie Policy</h1>
          <p className="text-sm text-black/35 mb-10">Last updated: May 2026 · Version 1.2</p>

          <div className="flex flex-col gap-8 text-sm text-black/70 leading-relaxed">
            <section>
              <p>This Cookie Policy explains how CDN Core Technologies (&ldquo;we&rdquo;, &ldquo;us&rdquo;) uses cookies and similar storage technologies on the Loritalk website (lori-talk.eu). It complements our <Link href="/privacy-policy" className="underline">Privacy Policy</Link> and is provided under Regulation (EU) 2016/679 (GDPR), Directive 2002/58/EC (ePrivacy), Portuguese Law 41/2004, and Brazilian Law 13.709/2018 (LGPD).</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3 text-black">1. What are cookies and similar technologies?</h2>
              <p>Cookies are small text files stored on your device. Similar technologies include browser <code className="px-1.5 py-0.5 rounded bg-black/5 text-xs">localStorage</code> and <code className="px-1.5 py-0.5 rounded bg-black/5 text-xs">sessionStorage</code>. Together they let a site remember information about your visit, such as your preferred language.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3 text-black">2. Categories we use</h2>
              <p className="mb-4">We classify storage by purpose, following European Data Protection Board (EDPB) Guidelines 2/2023 on Article 5(3) of the ePrivacy Directive. Optional cookies are split into two opt-in categories — <strong>Analytics</strong> (Google Analytics) and <strong>Marketing</strong> (Meta Pixel) — which you accept or refuse independently in the consent banner.</p>

              <div className="overflow-x-auto">
                <table className="w-full text-xs border border-black/10 rounded-xl overflow-hidden">
                  <thead className="bg-black/[0.03]">
                    <tr className="text-left">
                      <th className="p-3 font-semibold">Name</th>
                      <th className="p-3 font-semibold">Type</th>
                      <th className="p-3 font-semibold">Purpose</th>
                      <th className="p-3 font-semibold">Retention</th>
                      <th className="p-3 font-semibold">Consent</th>
                    </tr>
                  </thead>
                  <tbody className="text-black/70">
                    <tr className="border-t border-black/10">
                      <td className="p-3"><code className="text-xs">loritalk-lang</code></td>
                      <td className="p-3">localStorage</td>
                      <td className="p-3">Stores your selected interface language so it persists across visits.</td>
                      <td className="p-3">Until cleared by you</td>
                      <td className="p-3">Strictly necessary (Art. 5(3) ePrivacy exemption — explicitly requested by user)</td>
                    </tr>
                    <tr className="border-t border-black/10">
                      <td className="p-3"><code className="text-xs">loritalk-consent</code></td>
                      <td className="p-3">localStorage</td>
                      <td className="p-3">Records your cookie preferences (whether you accepted or refused marketing cookies) and the timestamp of your choice, so we do not ask again on every page load.</td>
                      <td className="p-3">Until cleared by you</td>
                      <td className="p-3">Strictly necessary</td>
                    </tr>
                    <tr className="border-t border-black/10">
                      <td className="p-3"><code className="text-xs">_ga</code></td>
                      <td className="p-3">First-party cookie (set via Google Analytics 4)</td>
                      <td className="p-3">Distinguishes unique users to Google Analytics so we can measure traffic, audience, and product trends.</td>
                      <td className="p-3">2 years</td>
                      <td className="p-3">Analytics &mdash; opt-in (Art. 5(3) ePrivacy / Art. 6(1)(a) GDPR / Art. 7, I LGPD)</td>
                    </tr>
                    <tr className="border-t border-black/10">
                      <td className="p-3"><code className="text-xs">_ga_VF8DMSWWJB</code></td>
                      <td className="p-3">First-party cookie (set via Google Analytics 4)</td>
                      <td className="p-3">Maintains the GA4 session state for the Loritalk property.</td>
                      <td className="p-3">2 years</td>
                      <td className="p-3">Analytics &mdash; opt-in</td>
                    </tr>
                    <tr className="border-t border-black/10">
                      <td className="p-3"><code className="text-xs">gtag/js</code> (script)</td>
                      <td className="p-3">Third-party script loaded from <code className="text-xs">www.googletagmanager.com</code></td>
                      <td className="p-3">Runtime library that sends GA4 events (page_view, etc.) to Google. Only loaded after you opt in to analytics cookies. IP anonymisation is enabled.</td>
                      <td className="p-3">Session</td>
                      <td className="p-3">Analytics &mdash; opt-in</td>
                    </tr>
                    <tr className="border-t border-black/10">
                      <td className="p-3"><code className="text-xs">_fbp</code></td>
                      <td className="p-3">First-party cookie (set via Meta Pixel)</td>
                      <td className="p-3">Identifies the browser for the Meta (Facebook / Instagram) advertising platform &mdash; measures campaign performance and audiences.</td>
                      <td className="p-3">90 days</td>
                      <td className="p-3">Marketing &mdash; opt-in (Art. 5(3) ePrivacy / Art. 6(1)(a) GDPR / Art. 7, I LGPD)</td>
                    </tr>
                    <tr className="border-t border-black/10">
                      <td className="p-3"><code className="text-xs">_fbc</code></td>
                      <td className="p-3">First-party cookie (set via Meta Pixel)</td>
                      <td className="p-3">Stores the last <code className="text-xs">fbclid</code> click identifier when you arrive from a Meta ad &mdash; used to attribute the visit to the originating campaign.</td>
                      <td className="p-3">90 days</td>
                      <td className="p-3">Marketing &mdash; opt-in</td>
                    </tr>
                    <tr className="border-t border-black/10">
                      <td className="p-3"><code className="text-xs">fbevents.js</code> (script)</td>
                      <td className="p-3">Third-party script loaded from <code className="text-xs">connect.facebook.net</code></td>
                      <td className="p-3">Runtime library that sends Pixel events (PageView, etc.) to Meta. Only loaded after you opt in to marketing cookies.</td>
                      <td className="p-3">Session</td>
                      <td className="p-3">Marketing &mdash; opt-in</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-4">Analytics cookies (Google Analytics) and marketing cookies (Meta Pixel) are <strong>only loaded after you explicitly opt in</strong> via the consent banner. By default they are blocked. Each category can be accepted or refused independently. You can withdraw consent at any time &mdash; see &ldquo;Your choices&rdquo; below.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3 text-black">3. Third-party requests</h2>
              <p>The website may load the following third-party resources:</p>
              <ul className="list-disc pl-5 mt-2 flex flex-col gap-1">
                <li><strong>Google Fonts</strong> (<code className="text-xs">fonts.googleapis.com</code>, <code className="text-xs">fonts.gstatic.com</code>) &mdash; loads the Readex Pro, Plus Jakarta Sans, JetBrains Mono, and Material Icons typefaces. No cookies are set by these endpoints; only your IP address and User-Agent are transmitted to Google as part of the HTTP request. Legal basis: legitimate interest (Art. 6(1)(f) GDPR) in delivering the page.</li>
                <li><strong>Google Analytics 4</strong> (<code className="text-xs">www.googletagmanager.com</code>, <code className="text-xs">www.google-analytics.com</code>) &mdash; <em>only loaded if you opt in to analytics cookies</em>. Operated by Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, Ireland). Property ID: <code className="text-xs">G-VF8DMSWWJB</code>. Sends a <code className="text-xs">page_view</code> event on each navigation so we can measure traffic and product trends. IP anonymisation (<code className="text-xs">anonymize_ip</code>) is enabled. Data may be transferred to the United States &mdash; Google relies on the EU-US Data Privacy Framework and EU Standard Contractual Clauses; see the <Link href="/privacy-policy" className="underline">Privacy Policy</Link> section on international transfers. Legal basis: your prior, freely given consent (Art. 6(1)(a) GDPR / Art. 7, I LGPD / Art. 5(3) ePrivacy).</li>
                <li><strong>Meta Pixel</strong> (<code className="text-xs">connect.facebook.net</code>, <code className="text-xs">www.facebook.com</code>) &mdash; <em>only loaded if you opt in to marketing cookies</em>. Operated by Meta Platforms Ireland Limited (4 Grand Canal Square, Dublin, Ireland). Sends a <code className="text-xs">PageView</code> event when you load a page so we can measure the performance of our Meta advertising campaigns and build audiences. Data is transmitted to Meta servers, which may include transfers to the United States &mdash; see the <Link href="/privacy-policy" className="underline">Privacy Policy</Link> section on international transfers. Legal basis: your prior, freely given consent (Art. 6(1)(a) GDPR / Art. 7, I LGPD / Art. 5(3) ePrivacy).</li>
              </ul>
              <p className="mt-3">If you wish to block Google Fonts, you can self-host the fonts or use a browser extension. We are evaluating moving fonts to self-hosted assets to remove the third-party request entirely.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3 text-black">4. Server logs</h2>
              <p>Our hosting infrastructure records minimal request metadata (IP address, timestamp, requested path, response status, User-Agent) for security purposes — detection of attacks, abuse, and operational debugging. IPs are kept for a maximum of <strong>30 days</strong> and then deleted. Legal basis: legitimate interest (Art. 6(1)(f) GDPR) in network and information security, expressly recognised in Recital 49 GDPR.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3 text-black">5. Your choices</h2>
              <ul className="list-disc pl-5 mt-2 flex flex-col gap-1">
                <li><strong>Consent banner.</strong> The first time you visit, you can accept all cookies, reject the optional ones, or open &ldquo;Customise&rdquo; to choose category by category. Your choice is recorded in <code className="text-xs">loritalk-consent</code>.</li>
                <li><strong>Change your mind.</strong> To withdraw or update your consent, delete the <code className="text-xs">loritalk-consent</code> entry from your browser&apos;s local storage (DevTools &rarr; Application &rarr; Local Storage). The banner will appear again on your next visit so you can re-decide. We are working on an in-page &ldquo;Cookie settings&rdquo; link to make this one click.</li>
                <li><strong>Browser controls.</strong> All major browsers let you view, block, or delete cookies and local storage on a per-site basis. See your browser&apos;s documentation.</li>
                <li><strong>Effect of refusal.</strong> Refusing analytics or marketing cookies has no effect on access to the site or its content. We will simply lose visibility into traffic trends and the performance of our Meta advertising campaigns.</li>
                <li><strong>Do Not Track / Global Privacy Control.</strong> If your browser sends a GPC or DNT signal, we treat it as a refusal of optional cookies in addition to your banner choice.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3 text-black">6. Changes to this policy</h2>
              <p>We will update this page when we introduce new technologies (for example, analytics or a chat widget). Material changes will be announced via the cookie notice and the &ldquo;Last updated&rdquo; date above. Any non-essential cookies introduced in the future will require your prior, granular, opt-in consent before being placed.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3 text-black">7. Contact</h2>
              <div className="rounded-xl bg-black/[0.03] p-5">
                <p className="mb-2">Questions about cookies or this policy? Contact our data protection contact:</p>
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
