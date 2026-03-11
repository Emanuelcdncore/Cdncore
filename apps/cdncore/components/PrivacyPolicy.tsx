'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import './css/LegalPages.css';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <Link href="/" className="back-link"><ArrowLeft size={16} /> Back to Home</Link>
        <h1>Privacy Policy</h1>
        <p className="legal-date">Last updated: March 2026</p>

        <h2>1. Information We Collect</h2>
        <p>CDNCore collects information you provide directly, such as when you fill out a contact form, subscribe to our newsletter, or communicate with us. This may include your name, email address, phone number, and company information.</p>

        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to provide, maintain, and improve our services, communicate with you, and comply with legal obligations.</p>
        <ul>
          <li>To respond to your inquiries and provide customer support</li>
          <li>To send you technical notices, updates, and administrative messages</li>
          <li>To detect, prevent, and address technical issues</li>
        </ul>

        <h2>3. Data Security</h2>
        <p>We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.</p>

        <h2>4. Your Rights</h2>
        <p>You have the right to access, correct, or delete your personal data. You may also object to or restrict certain processing of your data.</p>

        <h2>5. Contact Us</h2>
        <div className="contact-box">
          <p>If you have questions about this Privacy Policy, please contact us at:</p>
          <p><strong>Email:</strong> privacy@cdncore.com</p>
          <p><strong>Address:</strong> Lisbon, Portugal</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
