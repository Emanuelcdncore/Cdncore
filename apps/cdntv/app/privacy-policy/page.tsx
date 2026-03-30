import type { Metadata } from "next";
import React from 'react';
import '@/components/css/LegalPages.css';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "CDNTV privacy policy. Learn how we collect, use and protect your personal data in compliance with GDPR.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicy() {
  return (
    <>
      <Navigation />
      <div className="legal-page">
        <div className="legal-container">
          <div className="legal-header">
            <h1>Privacy Policy</h1>
            <p className="legal-updated">Last updated: November 18, 2025</p>
          </div>

          <div className="legal-content">
            <section>
              <h2>1. Introduction</h2>
              <p>
                CDN TV is committed to protecting your privacy.
                This Privacy Policy explains how we collect, use, disclose and protect
                your information when you use our website and our television broadcast services.
              </p>
              <p>
                This policy is in compliance with the European Union&apos;s General Data Protection
                Regulation (GDPR) and other applicable data protection laws.
              </p>
            </section>

            <section>
              <h2>2. Data Controller</h2>
              <div className="contact-info">
                <p><strong>CDN TV</strong></p>
                <p>Contact: info@cdntv.pt</p>
              </div>
            </section>

            <section>
              <h2>3. Personal Data We Collect</h2>

              <h3>3.1 Data provided directly by you:</h3>
              <ul>
                <li><strong>Contact data:</strong> name, email, phone, company</li>
                <li><strong>Communication data:</strong> messages sent through our forms</li>
                <li><strong>Professional data:</strong> role, area of interest</li>
              </ul>

              <h3>3.2 Data collected automatically:</h3>
              <ul>
                <li><strong>Technical data:</strong> IP address, browser type, operating system</li>
                <li><strong>Navigation data:</strong> pages visited, time on site, traffic source</li>
                <li><strong>Cookies and similar technologies:</strong> as described in our Cookie Policy</li>
              </ul>
            </section>

            <section>
              <h2>4. Legal Basis and Processing Purposes</h2>

              <h3>4.1 Consent (Art. 6(1)(a) GDPR):</h3>
              <ul>
                <li>Direct marketing and promotional communications</li>
                <li>Non-essential cookies and behavior analysis</li>
              </ul>

              <h3>4.2 Contract performance (Art. 6(1)(b) GDPR):</h3>
              <ul>
                <li>Provision of our television broadcast services</li>
                <li>Communication related to programs and services</li>
              </ul>

              <h3>4.3 Legitimate interests (Art. 6(1)(f) GDPR):</h3>
              <ul>
                <li>Website security and protection</li>
                <li>Statistical analysis and service improvement</li>
                <li>Fraud prevention and malicious activities</li>
              </ul>
            </section>

            <section>
              <h2>5. Data Sharing</h2>
              <p>
                Your personal data may be shared in the following circumstances:
              </p>
              <ul>
                <li><strong>Service providers:</strong> companies that help us operate the website (hosting, email, analytics)</li>
                <li><strong>Legal obligations:</strong> when required by law or competent authorities</li>
                <li><strong>Rights protection:</strong> to protect our rights, property or security</li>
              </ul>
              <p>
                <strong>International transfers:</strong> Some of our service providers may be
                located outside the EEA. We ensure adequate guarantees exist in accordance with GDPR.
              </p>
            </section>

            <section>
              <h2>6. Retention Period</h2>
              <ul>
                <li><strong>Contact data:</strong> retained while you maintain interest in our services</li>
                <li><strong>Contractual data:</strong> retained during the contract term</li>
                <li><strong>Marketing data:</strong> until consent is withdrawn or for 3 years without interaction</li>
                <li><strong>Technical logs:</strong> maximum of 12 months</li>
              </ul>
            </section>

            <section>
              <h2>7. Your Rights</h2>
              <p>You have the following rights regarding your personal data:</p>
              <ul>
                <li><strong>Access:</strong> request information about the data we process</li>
                <li><strong>Rectification:</strong> correct inaccurate or incomplete data</li>
                <li><strong>Erasure:</strong> request deletion of your data</li>
                <li><strong>Restriction:</strong> restrict processing in certain circumstances</li>
                <li><strong>Portability:</strong> receive your data in a structured format</li>
                <li><strong>Objection:</strong> object to processing based on legitimate interests</li>
                <li><strong>Withdrawal of consent:</strong> withdraw consent at any time</li>
              </ul>

              <p className="contact-rights">
                To exercise your rights, contact us at: <strong>info@cdntv.pt</strong>
              </p>
            </section>

            <section>
              <h2>8. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal data
                against unauthorized access, alteration, disclosure or destruction. These include:
              </p>
              <ul>
                <li>Data encryption in transit and at rest</li>
                <li>Access controls and authentication</li>
                <li>Regular security monitoring</li>
                <li>Regular team training on data protection</li>
              </ul>
            </section>

            <section>
              <h2>9. Minors</h2>
              <p>
                Our services are not intended for minors under 16 years old. We do not knowingly
                collect personal data from minors under 16 without parental or legal guardian consent.
              </p>
            </section>

            <section>
              <h2>10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy occasionally. We will notify about
                significant changes through our website or by email, as appropriate.
              </p>
            </section>

            <section>
              <h2>11. Contact and Complaints</h2>
              <p>
                If you have questions about this policy or want to exercise your rights, contact us:
              </p>
              <div className="contact-info">
                <p><strong>Email:</strong> info@cdntv.pt</p>
                <p><strong>Website:</strong> cdntv.pt</p>
              </div>

              <p>
                You also have the right to file a complaint with the National Data Protection Commission (CNPD)
                if you consider that the processing of your personal data violates GDPR.
              </p>

              <div className="contact-info">
                <p><strong>CNPD - National Data Protection Commission</strong></p>
                <p>Rua de São Bento, 148-3º, 1200-821 Lisboa</p>
                <p>Phone: +351 213 928 400</p>
                <p>Website: cnpd.pt</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
