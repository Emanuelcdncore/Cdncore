'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { BeehivePattern } from '@/components/Backgrounds/BeehivePattern';
import './css/CommitmentsCTA.css';

const CommitmentsCTA: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="commitments-cta">
      <BeehivePattern />
      <div className="cta-content">
        <h2 className="cta-title">
          <span className="cta-title-white">{t('commitments.cta.heading1', 'Ready to')} </span>
          <span className="cta-title-pink">{t('commitments.cta.heading2', 'Make an Impact?')}</span>
        </h2>
        <p className="cta-subtitle">
          {t('commitments.cta.subtitle', "Join us in building technology that makes a difference. Whether you're a client, partner, or future team member, we'd love to connect.")}
        </p>
        <Link href="/contact">
          <button className="cta-button">{t('commitments.cta.button', 'GET IN TOUCH')}</button>
        </Link>
      </div>
      <div className="cta-bottom-gradient" />
    </section>
  );
};

export default CommitmentsCTA;
