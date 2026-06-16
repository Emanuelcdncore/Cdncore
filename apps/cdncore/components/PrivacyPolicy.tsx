'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './css/LegalPages.css';

const PrivacyPolicy: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="legal-page">
      <div className="legal-container">
        <Link href="/" className="back-link"><ArrowLeft size={16} /> {t('legal.back_home', 'Back to Home')}</Link>
        <h1>{t('legal.privacy.title', 'Privacy Policy')}</h1>
        <p className="legal-date">{t('legal.last_updated', 'Last updated: March 2026')}</p>

        <h2>{t('legal.privacy.s1_title', '1. Information We Collect')}</h2>
        <p>{t('legal.privacy.s1_text', 'CDNCore collects information you provide directly, such as when you fill out a contact form, subscribe to our newsletter, or communicate with us. This may include your name, email address, phone number, and company information.')}</p>

        <h2>{t('legal.privacy.s2_title', '2. How We Use Your Information')}</h2>
        <p>{t('legal.privacy.s2_text', 'We use the information we collect to provide, maintain, and improve our services, communicate with you, and comply with legal obligations.')}</p>
        <ul>
          <li>{t('legal.privacy.s2_li1', 'To respond to your inquiries and provide customer support')}</li>
          <li>{t('legal.privacy.s2_li2', 'To send you technical notices, updates, and administrative messages')}</li>
          <li>{t('legal.privacy.s2_li3', 'To detect, prevent, and address technical issues')}</li>
        </ul>

        <h2>{t('legal.privacy.s3_title', '3. Data Security')}</h2>
        <p>{t('legal.privacy.s3_text', 'We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.')}</p>

        <h2>{t('legal.privacy.s4_title', '4. Your Rights')}</h2>
        <p>{t('legal.privacy.s4_text', 'You have the right to access, correct, or delete your personal data. You may also object to or restrict certain processing of your data.')}</p>

        <h2>{t('legal.privacy.s5_title', '5. Contact Us')}</h2>
        <div className="contact-box">
          <p>{t('legal.privacy.contact_text', 'If you have questions about this Privacy Policy, please contact us at:')}</p>
          <p><strong>{t('legal.email_label', 'Email:')}</strong> privacy@cdncore.com</p>
          <p><strong>{t('legal.address_label', 'Address:')}</strong> {t('legal.privacy.address', 'Lisbon, Portugal')}</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
