'use client';

import React from 'react';
import Link from 'next/link';
import { BeehivePattern } from '@/components/Backgrounds/BeehivePattern';
import './css/CommitmentsCTA.css';

const CommitmentsCTA: React.FC = () => {
  return (
    <section className="commitments-cta">
      <BeehivePattern />
      <div className="cta-content">
        <h2 className="cta-title">
          <span className="cta-title-white">Ready to </span>
          <span className="cta-title-pink">Make an Impact?</span>
        </h2>
        <p className="cta-subtitle">
          Join us in building technology that makes a difference. Whether you&apos;re a client, partner, or future team member, we&apos;d love to connect.
        </p>
        <Link href="/contact">
          <button className="cta-button">GET IN TOUCH</button>
        </Link>
      </div>
      <div className="cta-bottom-gradient" />
    </section>
  );
};

export default CommitmentsCTA;
