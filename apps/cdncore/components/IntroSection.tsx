'use client';

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
import { LayoutTextFlip } from './ui/layout-text-flip';
import { useIntroScroll } from './ScrollReveal/useIntroScroll';
import RBScrollReveal from './ReactBits/RBScrollReveal';
import './css/IntroSection.css';

const Antigravity = dynamic(() => import('./ReactBits/Antigravity'), { ssr: false });

const IntroSection: React.FC = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useIntroScroll({
    sectionRef,
    overlayRef,
    rightRef: contentRef,
  });

  const words = [
    t('intro.word1', 'Build'),
    t('intro.word2', 'Develop'),
    t('intro.word3', 'Deploy'),
    t('intro.word4', 'Maintain'),
    t('intro.word5', 'Secure'),
  ];

  return (
    <section ref={sectionRef} className="intro-section section-padding">
      <div ref={overlayRef} className="intro-gradient-overlay" />
      <div className="intro-antigravity-bg">
        <Antigravity
          count={80}
          autoAnimate={true}
          color="#9945ff"
          particleSize={1.2}
          waveAmplitude={1.0}
          waveSpeed={0.25}
          ringRadius={8}
          magnetRadius={8}
          lerpSpeed={0.03}
        />
      </div>
      <div className="container">
        <div ref={contentRef} className="intro-content">
          <div className="intro-text">
            <LayoutTextFlip
              text={t('intro.prefix', 'We') + ' '}
              words={words}
              duration={2000}
            />
            <div className="mt-4">
              <RBScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={2}
                blurStrength={5}
                containerClassName="intro-paragraph-scroll-reveal"
                textClassName="intro-paragraph-text"
              >
                {t('intro.description', 'Cutting-edge applied informatics and AI solutions, driven by R&D and innovation, empowering modern enterprises through agentic intelligence.')}
              </RBScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
