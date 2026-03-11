'use client';

import React from 'react';
import Link from 'next/link';
import { BeehivePattern } from './Backgrounds/BeehivePattern';
import './css/CTA.css';

const CTA: React.FC = () => {
  return (
    <section className="cta-section">
      <BeehivePattern />
      <div className="cta-content">
        <h2 className="cta-title">
          <span className="cta-title-white">Innovation </span>
          <span className="cta-title-pink">Starts Here</span>
        </h2>
        <p className="cta-subtitle">
          Ready to transform your business with cutting-edge technology? Let&apos;s build the future together.
        </p>
        <Link href="/contact">
          <button className="cta-button">LET&apos;S TALK</button>
        </Link>
      </div>
      <div className="cta-bottom-gradient" />
    </section>
  );
};

export default CTA;
