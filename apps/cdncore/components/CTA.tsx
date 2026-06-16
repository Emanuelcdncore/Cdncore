'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { BeehivePattern } from './Backgrounds/BeehivePattern';
import { useCtaScroll } from './ScrollReveal/useCtaScroll';
import './css/CTA.css';

const CTA: React.FC = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useCtaScroll({
    sectionRef,
    backgroundRef,
    titleRef,
    subtitleRef,
    buttonRef,
  });

  return (
    <section ref={sectionRef} className="cta-section">
      <div ref={backgroundRef} className="cta-background-wrap">
        <BeehivePattern />
      </div>
      <div className="cta-content">
        <h2 ref={titleRef} className="cta-title">
          <span className="cta-title-white">{t('cta.heading1', 'Innovation')} </span>
          <span className="cta-title-pink">{t('cta.heading2', 'Starts Here')}</span>
        </h2>
        <p ref={subtitleRef} className="cta-subtitle">
          {t('cta.subtitle', "Ready to transform your business with cutting-edge technology? Let's build the future together.")}
        </p>
        <div ref={buttonRef}>
          <Link href="/contact">
            <button type="button" className="cta-button">
              {t('cta.button', "LET'S TALK")}
            </button>
          </Link>
        </div>
      </div>
      <div className="cta-bottom-gradient" />
    </section>
  );
};

export default CTA;
