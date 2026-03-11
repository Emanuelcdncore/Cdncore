'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import './css/LegalPages.css';

const CookiesPolicy: React.FC = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <Link href="/" className="back-link"><ArrowLeft size={16} /> Back to Home</Link>
        <h1>Cookies Policy</h1>
        <p className="legal-date">Last updated: March 2026</p>

        <h2>1. What Are Cookies</h2>
        <p>Cookies are small text files stored on your device when you visit our website. They help us provide you with a better experience and understand how you interact with our site.</p>

        <h2>2. Types of Cookies We Use</h2>
        <table>
          <thead>
            <tr><th>Type</th><th>Purpose</th><th>Duration</th></tr>
          </thead>
          <tbody>
            <tr><td>Essential</td><td>Required for the website to function properly</td><td>Session</td></tr>
            <tr><td>Analytics</td><td>Help us understand how visitors interact with our website</td><td>1 year</td></tr>
            <tr><td>Preferences</td><td>Remember your settings and preferences (e.g., language)</td><td>1 year</td></tr>
            <tr><td>Performance</td><td>Help us improve website performance</td><td>6 months</td></tr>
          </tbody>
        </table>

        <h2>3. Managing Cookies</h2>
        <p>You can control and manage cookies through your browser settings. Please note that removing or blocking cookies may impact your experience on our website.</p>

        <h2>4. Third-Party Cookies</h2>
        <p>Some cookies are placed by third-party services that appear on our pages, such as analytics providers. We do not control these third-party cookies.</p>

        <h2>5. Contact</h2>
        <div className="contact-box">
          <p>For questions about our use of cookies, contact us at:</p>
          <p><strong>Email:</strong> privacy@cdncore.com</p>
        </div>
      </div>
    </div>
  );
};

export default CookiesPolicy;
