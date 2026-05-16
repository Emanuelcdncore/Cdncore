import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Loritalk by CDN Core Technologies. GDPR and LGPD compliant. Data stored in Europe. Your content is never used to train AI models.",
  alternates: { canonical: "/privacy-policy" },
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
          <p className="text-sm text-black/35 mb-10">Last updated: May 2026 · Version 2.0</p>

          <div className="flex flex-col gap-8 text-sm text-black/70 leading-relaxed">
            <section>
              <p>This Privacy Policy describes how <strong>CDN Core Technologies</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects and processes personal data through the Loritalk website (<strong>lori-talk.eu</strong>) and related services. It is issued under Regulation (EU) 2016/679 (GDPR), Directive 2002/58/EC (ePrivacy), Portuguese Law 58/2019, and the Brazilian General Data Protection Law &mdash; Lei n.&ordm; 13.709/2018 (LGPD).</p>
              <p className="mt-3">If you only want to know the essentials: we collect what you give us through the contact form, we keep server logs for security, we do <strong>not</strong> use analytics or advertising trackers on this site, and your content inside the Loritalk product is never used to train AI models.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3 text-black">1. Controller &amp; contact</h2>
              <div className="rounded-xl bg-black/[0.03] p-5">
                <p><strong>Data controller:</strong> CDN Core Technologies</p>
                <p><strong>Address:</strong> Parkurbis &mdash; Parque de Ci&ecirc;ncia e Tecnologia da Covilh&atilde;, 6200-865 Covilh&atilde;, Portugal</p>
                <p><strong>Email:</strong> info@lori-talk.eu</p>
                <p><strong>Phone:</strong> +351 275 959 168</p>
                <p className="mt-3"><strong>Data protection contact:</strong> info@lori-talk.eu (subject: &ldquo;GDPR / LGPD request&rdquo;).</p>
                <p>A formal DPO (Encarregado) will be appointed and named here once service scale triggers the legal requirement.</p>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3 text-black">2. Categories of personal data we process</h2>
              <p className="mb-3">We only process the categories of personal data listed below. We do not collect special-category data (Art. 9 GDPR / Art. 11 LGPD) on this website. We do not knowingly collect data from children under 16.</p>

              <div className="overflow-x-auto">
                <table className="w-full text-xs border border-black/10 rounded-xl overflow-hidden">
                  <thead className="bg-black/[0.03]">
                    <tr className="text-left">
                      <th className="p-3 font-semibold">What</th>
                      <th className="p-3 font-semibold">When</th>
                      <th className="p-3 font-semibold">Purpose</th>
                      <th className="p-3 font-semibold">Legal basis</th>
                      <th className="p-3 font-semibold">Retention</th>
                    </tr>
                  </thead>
                  <tbody className="text-black/70">
                    <tr className="border-t border-black/10">
                      <td className="p-3">First name, last name, email, company (optional), subject, message</td>
                      <td className="p-3">You submit the contact form</td>
                      <td className="p-3">Reply to your enquiry; pre-contractual steps; customer support history</td>
                      <td className="p-3">Consent (Art. 6(1)(a) GDPR / Art. 7, I LGPD) and pre-contractual measures (Art. 6(1)(b) / Art. 7, V)</td>
                      <td className="p-3">24 months after last interaction, then deleted; you can request earlier erasure</td>
                    </tr>
                    <tr className="border-t border-black/10">
                      <td className="p-3">IP address, User-Agent, timestamp, requested URL, response status</td>
                      <td className="p-3">Each HTTP request to the site</td>
                      <td className="p-3">Network and information security, abuse detection, operational debugging</td>
                      <td className="p-3">Legitimate interest (Art. 6(1)(f) GDPR &mdash; see Recital 49; Art. 7, IX LGPD)</td>
                      <td className="p-3">30 days, then deleted or pseudonymised</td>
                    </tr>
                    <tr className="border-t border-black/10">
                      <td className="p-3">Browser <code className="text-xs">localStorage</code> entries (<code className="text-xs">loritalk-lang</code>, <code className="text-xs">loritalk-cookie-ack</code>)</td>
                      <td className="p-3">You change language or dismiss the cookie notice</td>
                      <td className="p-3">Remember your language choice and that you acknowledged the cookie notice</td>
                      <td className="p-3">Strictly necessary (Art. 5(3) ePrivacy exemption &mdash; explicitly requested by user)</td>
                      <td className="p-3">Until you clear your browser storage</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3">Information about the Loritalk product itself (account creation, content generation, billing) is governed by the in-product privacy notice at <a href="https://app.lori-talk.eu" className="underline" target="_blank" rel="noopener noreferrer">app.lori-talk.eu</a>.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3 text-black">3. Cookies and similar technologies</h2>
              <p>This website does <strong>not</strong> set advertising, profiling, analytics, social-media, or third-party tracking cookies. Full details about the few strictly necessary local-storage entries we use and the third-party requests that load Google Fonts are in the <Link href="/cookie-policy" className="underline">Cookie Policy</Link>.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3 text-black">4. Recipients and sub-processors</h2>
              <p className="mb-3">Your personal data may be shared, under contractual safeguards, with the following categories of recipients:</p>
              <ul className="list-disc pl-5 flex flex-col gap-1">
                <li><strong>Hosting and infrastructure providers</strong> located in the European Union, which run the servers that deliver this website and store contact-form submissions.</li>
                <li><strong>Transactional email provider</strong> used to relay contact-form messages to our team mailbox.</li>
                <li><strong>Professional advisers</strong> (lawyers, accountants) when strictly necessary to defend a legal claim or comply with a legal obligation.</li>
                <li><strong>Competent public authorities</strong> when legally compelled (court order, formal request from a supervisory authority).</li>
              </ul>
              <p className="mt-3">We do not sell, rent, or otherwise commercially share your personal data with third parties. We do not use your contact-form data for advertising or for AI training.</p>
              <p className="mt-3">An up-to-date list of sub-processors is available on request via info@lori-talk.eu.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3 text-black">5. International transfers</h2>
              <p>Personal data collected through this website is stored on servers located in the European Union. If, in the future, any sub-processor is located outside the European Economic Area, transfers will be carried out under one of the safeguards permitted by Chapter V GDPR &mdash; typically Standard Contractual Clauses (Commission Decision (EU) 2021/914) supplemented by appropriate technical and organisational measures. For LGPD purposes, transfers will rely on the mechanisms set out in Articles 33&ndash;35 LGPD.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3 text-black">6. Your rights as a data subject</h2>
              <p className="mb-3">Under GDPR (Articles 15&ndash;22) and LGPD (Article 18) you can exercise the following rights free of charge:</p>
              <ul className="list-disc pl-5 flex flex-col gap-1">
                <li><strong>Access</strong> &mdash; obtain confirmation that we process your data and a copy of it.</li>
                <li><strong>Rectification</strong> &mdash; correct inaccurate or incomplete data.</li>
                <li><strong>Erasure</strong> (&ldquo;right to be forgotten&rdquo;) &mdash; have your data deleted, subject to legal retention obligations.</li>
                <li><strong>Restriction of processing</strong> &mdash; ask us to limit how we use your data in specific situations.</li>
                <li><strong>Data portability</strong> &mdash; receive your data in a structured, commonly used, machine-readable format.</li>
                <li><strong>Objection</strong> &mdash; object to processing based on legitimate interest, including profiling.</li>
                <li><strong>Withdraw consent</strong> at any time, without affecting the lawfulness of processing carried out before withdrawal.</li>
                <li><strong>Anonymisation, blocking or deletion</strong> of unnecessary, excessive, or unlawfully processed data (LGPD Art. 18, IV).</li>
                <li><strong>Information about public and private entities</strong> with which we have shared your data (LGPD Art. 18, VII).</li>
                <li><strong>Information about the possibility of refusing consent</strong> and the consequences of that refusal (LGPD Art. 18, VIII).</li>
                <li><strong>Not to be subject</strong> to a decision based solely on automated processing that produces legal or similarly significant effects (GDPR Art. 22; LGPD Art. 20). The Loritalk landing page does not perform such automated decision-making.</li>
              </ul>

              <p className="mt-4">To exercise any right, email <strong>info@lori-talk.eu</strong> with the subject line &ldquo;GDPR / LGPD request&rdquo;. We answer within <strong>30 days</strong> (extendable by a further 60 days where strictly necessary, with notice).</p>

              <p className="mt-3">You also have the right to lodge a complaint with a supervisory authority &mdash; full contact details are in the <Link href="/legal-notice" className="underline">Legal Notice</Link>.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3 text-black">7. Security</h2>
              <p>We implement appropriate technical and organisational measures to protect personal data against accidental or unlawful destruction, loss, alteration, unauthorised disclosure or access (Art. 32 GDPR / Art. 46 LGPD). Measures include: encryption in transit (TLS), encryption at rest where the storage layer supports it, least-privilege access, segregation of duties, audit logging, periodic backups, vulnerability scanning, and incident response procedures. In the event of a personal data breach likely to result in a risk to your rights and freedoms, we will notify the competent supervisory authority within 72 hours and, where required, inform you directly.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3 text-black">8. Children</h2>
              <p>This site is not directed to children under 16 years of age. We do not knowingly collect personal data from children. If you believe we may have collected data from a child, please contact info@lori-talk.eu and we will delete it.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3 text-black">9. Changes to this policy</h2>
              <p>We update this policy when our processing changes &mdash; for example, when we introduce a new feature or a new sub-processor. Material changes will be announced via the website and, where appropriate, by email. The version and last-updated date at the top of this page always reflect the current version.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3 text-black">10. Contact</h2>
              <div className="rounded-xl bg-black/[0.03] p-5">
                <p className="mb-2">For any privacy-related question or to exercise your rights:</p>
                <p><strong>Email:</strong> info@lori-talk.eu (subject: &ldquo;GDPR / LGPD request&rdquo;)</p>
                <p><strong>Postal:</strong> CDN Core Technologies, Parkurbis, 6200-865 Covilh&atilde;, Portugal</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
