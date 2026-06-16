'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './css/LegalPages.css';

const CookiesPolicy: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="legal-page">
      <div className="legal-container">
        <Link href="/" className="back-link"><ArrowLeft size={16} /> {t('legal.back_home', 'Back to Home')}</Link>
        <h1>{t('legal.cookies.title', 'Cookies Policy')}</h1>
        <p className="legal-date">{t('legal.last_updated', 'Last updated: March 2026')}</p>

        <h2>{t('legal.cookies.s1_title', '1. What Are Cookies')}</h2>
        <p>{t('legal.cookies.s1_text', 'Cookies are small text files stored on your device when you visit our website. They help us provide you with a better experience and understand how you interact with our site.')}</p>

        <h2>{t('legal.cookies.s2_title', '2. Types of Cookies We Use')}</h2>
        <table>
          <thead>
            <tr>
              <th>{t('legal.cookies.table_type', 'Type')}</th>
              <th>{t('legal.cookies.table_purpose', 'Purpose')}</th>
              <th>{t('legal.cookies.table_duration', 'Duration')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{t('legal.cookies.t1_type', 'Essential')}</td>
              <td>{t('legal.cookies.t1_purpose', 'Required for the website to function properly')}</td>
              <td>{t('legal.cookies.t1_duration', 'Session')}</td>
            </tr>
            <tr>
              <td>{t('legal.cookies.t2_type', 'Analytics')}</td>
              <td>{t('legal.cookies.t2_purpose', 'Help us understand how visitors interact with our website')}</td>
              <td>{t('legal.cookies.t2_duration', '1 year')}</td>
            </tr>
            <tr>
              <td>{t('legal.cookies.t3_type', 'Preferences')}</td>
              <td>{t('legal.cookies.t3_purpose', 'Remember your settings and preferences (e.g., language)')}</td>
              <td>{t('legal.cookies.t3_duration', '1 year')}</td>
            </tr>
            <tr>
              <td>{t('legal.cookies.t4_type', 'Performance')}</td>
              <td>{t('legal.cookies.t4_purpose', 'Help us improve website performance')}</td>
              <td>{t('legal.cookies.t4_duration', '6 months')}</td>
            </tr>
          </tbody>
        </table>

        <h2>{t('legal.cookies.s3_title', '3. Managing Cookies')}</h2>
        <p>{t('legal.cookies.s3_text', 'You can control and manage cookies through your browser settings. Please note that removing or blocking cookies may impact your experience on our website.')}</p>

        <h2>{t('legal.cookies.s4_title', '4. Third-Party Cookies')}</h2>
        <p>{t('legal.cookies.s4_text', 'Some cookies are placed by third-party services that appear on our pages, such as analytics providers. We do not control these third-party cookies.')}</p>

        <h2>{t('legal.cookies.s5_title', '5. Contact')}</h2>
        <div className="contact-box">
          <p>{t('legal.cookies.contact_text', 'For questions about our use of cookies, contact us at:')}</p>
          <p><strong>{t('legal.email_label', 'Email:')}</strong> privacy@cdncore.com</p>
        </div>
      </div>
    </div>
  );
};

export default CookiesPolicy;
