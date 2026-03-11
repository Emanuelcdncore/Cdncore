'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import './css/LegalPages.css';

const TermsOfService: React.FC = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <Link href="/" className="back-link"><ArrowLeft size={16} /> Back to Home</Link>
        <h1>Terms of Service</h1>
        <p className="legal-date">Last updated: March 2026</p>

        <h2>1. Acceptance of Terms</h2>
        <p>By accessing and using CDNCore&apos;s services and website, you accept and agree to be bound by these Terms of Service and our Privacy Policy.</p>

        <h2>2. Description of Services</h2>
        <p>CDNCore provides technology consulting, cybersecurity solutions, AI development, data analytics, and related services. The specific scope of services will be defined in individual agreements.</p>

        <h2>3. Intellectual Property</h2>
        <p>All content, logos, designs, and materials on this website are the property of CDNCore and are protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written consent.</p>

        <h2>4. Limitation of Liability</h2>
        <p>CDNCore shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services or website.</p>

        <h2>5. Governing Law</h2>
        <p>These Terms shall be governed by and construed in accordance with the laws of Portugal, without regard to its conflict of law provisions.</p>

        <h2>6. Contact</h2>
        <div className="contact-box">
          <p>For questions about these Terms, contact us at:</p>
          <p><strong>Email:</strong> legal@cdncore.com</p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
