import type { Metadata } from "next";
import React from 'react';
import '@/components/css/LegalPages.css';
import Navigation from '@/components/Navigation';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "CDNTV terms of service. Read the conditions governing the use of our website and audiovisual production services.",
  alternates: { canonical: "/terms-of-service" },
};

export default function TermsOfService() {
  return (
    <>
      <Navigation />
      <div className="legal-page">
        <div className="legal-container">
          <div className="legal-header">
            <h1>Terms of Service</h1>
            <p className="legal-updated">Last updated: November 18, 2025</p>
          </div>

          <div className="legal-content">
            <section>
              <h2>1. Introduction and Acceptance</h2>
              <p>
                Welcome to CDN TV. These Terms of Service govern the use of our website
                and our television broadcast services.
              </p>
              <p>
                By accessing or using our services, you agree to be bound by these Terms.
                If you do not agree with any part of these terms, you should not use our services.
              </p>
            </section>

            <section>
              <h2>2. About CDN TV</h2>
              <div className="contact-info">
                <p><strong>CDN TV - Television Broadcast Services</strong></p>
                <p>Contact: info@cdntv.pt</p>
                <p>Website: cdntv.pt</p>
              </div>
            </section>

            <section>
              <h2>3. Services Offered</h2>
              <p>CDN TV offers the following services:</p>

              <ul>
                <li>Television broadcast services</li>
                <li>Digital content streaming</li>
                <li>Media production and distribution</li>
                <li>Advertising and promotional services</li>
                <li>Live event coverage</li>
                <li>Content creation and editing</li>
              </ul>
            </section>

            <section>
              <h2>4. Eligibility and Registration</h2>
              <p>
                To use our services, you must:
              </p>
              <ul>
                <li>Be at least 18 years old or legally represent a company</li>
                <li>Have legal capacity to enter into contracts</li>
                <li>Provide accurate and complete information during registration</li>
                <li>Maintain confidentiality of your access credentials</li>
              </ul>
            </section>

            <section>
              <h2>5. Acceptable Use</h2>
              <p>You agree to use our services only for legal purposes and in accordance with these Terms.
              It is expressly prohibited to:</p>

              <ul>
                <li>Use services for illegal or unauthorized activities</li>
                <li>Violate third-party intellectual property rights</li>
                <li>Transmit offensive, defamatory or discriminatory content</li>
                <li>Interfere with the security or operation of our systems</li>
                <li>Attempt to gain unauthorized access to our services</li>
                <li>Use services in a way that harms other users</li>
                <li>Reverse engineer our systems or technology</li>
              </ul>
            </section>

            <section>
              <h2>6. Intellectual Property</h2>

              <h3>6.1 CDN TV Property:</h3>
              <p>
                All intellectual property rights related to our services, including
                but not limited to content, software, designs, logos and branding, belong to CDN TV
                or its licensors.
              </p>

              <h3>6.2 Usage License:</h3>
              <p>
                We grant you a limited, non-exclusive and revocable license to use our
                services in accordance with these Terms.
              </p>

              <h3>6.3 Client Content:</h3>
              <p>
                You retain all rights to the content you provide. You grant us a license to
                process that content only to the extent necessary to provide the services.
              </p>
            </section>

            <section>
              <h2>7. Data Protection and Privacy</h2>
              <p>
                The processing of your personal data is governed by our{' '}
                <Link href="/privacy-policy" className="legal-link">Privacy Policy</Link>,
                which complies with GDPR and other applicable data protection laws.
              </p>
              <p>
                For projects involving sensitive or critical data, we enter into specific
                data processing agreements (DPA - Data Processing Agreement).
              </p>
            </section>

            <section>
              <h2>8. Pricing and Payment</h2>

              <h3>8.1 Pricing:</h3>
              <ul>
                <li>Prices are determined case by case, based on project scope and complexity</li>
                <li>All prices are presented in euros (EUR) and include VAT when applicable</li>
                <li>We reserve the right to change prices with reasonable notice</li>
              </ul>

              <h3>8.2 Payment:</h3>
              <ul>
                <li>Payments are processed as agreed in the specific contract</li>
                <li>Late payments may result in service suspension</li>
                <li>Invoices are issued electronically unless otherwise requested</li>
              </ul>
            </section>

            <section>
              <h2>9. Warranties and Limitations</h2>

              <h3>9.1 Service Warranty:</h3>
              <ul>
                <li>We guarantee that our services will be provided with professional competence</li>
                <li>Broadcast services are provided with quality standards according to industry norms</li>
                <li>We strive for maximum uptime but cannot guarantee uninterrupted service</li>
              </ul>

              <h3>9.2 Limitation of Liability:</h3>
              <p>
                To the maximum extent permitted by law, CDN TV will not be liable for:
              </p>
              <ul>
                <li>Indirect, consequential or special damages</li>
                <li>Loss of profits, data or business opportunities</li>
                <li>Failures caused by external factors (third parties, force majeure)</li>
                <li>Technical issues beyond our control</li>
              </ul>
            </section>

            <section>
              <h2>10. Termination</h2>

              <h3>10.1 Termination by you:</h3>
              <p>You may terminate these Terms at any time by ceasing to use our services and closing your account.</p>

              <h3>10.2 Termination by CDN TV:</h3>
              <p>We may terminate or suspend access to our services if you:</p>
              <ul>
                <li>Violate our Terms of Service</li>
                <li>Fail to make due payments</li>
                <li>Use services in a way that harms other users</li>
                <li>Provide false or misleading information</li>
              </ul>

              <h3>10.3 Effect of Termination:</h3>
              <p>Upon termination:</p>
              <ul>
                <li>Your access to services will be immediately revoked</li>
                <li>You remain liable for any outstanding payments</li>
                <li>We will retain data as required by law</li>
              </ul>
            </section>

            <section>
              <h2>11. Content and Broadcasting</h2>

              <h3>11.1 Content Standards:</h3>
              <p>All content broadcast through our services must:</p>
              <ul>
                <li>Comply with Portuguese and European broadcasting regulations</li>
                <li>Not contain illegal, defamatory or harmful material</li>
                <li>Respect intellectual property rights</li>
                <li>Meet industry standards for quality</li>
              </ul>

              <h3>11.2 Content Rights:</h3>
              <p>Clients must ensure they have all necessary rights and licenses for content they provide for broadcast.</p>
            </section>

            <section>
              <h2>12. Dispute Resolution</h2>
              <p>
                These Terms are governed by Portuguese law. Any dispute will be resolved through:
              </p>
              <ol>
                <li><strong>Direct negotiation:</strong> We will attempt to resolve any dispute amicably</li>
                <li><strong>Mediation:</strong> If necessary, we will resort to mediation through a recognized entity</li>
                <li><strong>Portuguese courts:</strong> As a last resort, disputes will be resolved by the competent Portuguese courts</li>
              </ol>
            </section>

            <section>
              <h2>13. General Provisions</h2>

              <h3>13.1 Changes to Terms:</h3>
              <p>
                We reserve the right to modify these Terms. Significant changes will be
                communicated with 30 days&apos; notice through our website or by email.
              </p>

              <h3>13.2 Force Majeure:</h3>
              <p>
                We will not be liable for delays or failures caused by circumstances beyond our
                reasonable control (natural disasters, pandemics, government actions, technical failures, etc.).
              </p>

              <h3>13.3 Severability:</h3>
              <p>
                If any part of these Terms is deemed invalid, the remaining provisions
                will remain in force.
              </p>

              <h3>13.4 Entire Agreement:</h3>
              <p>
                These Terms constitute the entire agreement between you and CDN TV regarding
                the use of our services.
              </p>
            </section>

            <section>
              <h2>14. Contact</h2>
              <p>
                For questions about these Terms of Service, contact us:
              </p>
              <div className="contact-info">
                <p><strong>Email:</strong> info@cdntv.pt</p>
                <p><strong>Website:</strong> cdntv.pt</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
