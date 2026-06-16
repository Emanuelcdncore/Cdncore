'use client';

import React, { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { ScrollReveal } from './ScrollReveal/ScrollReveal';
import { useScrollBatch } from './ScrollReveal/useScrollBatch';
import { gsap, registerGsapPlugins } from '@/lib/gsap/register';
import { isMobileViewport, prefersReducedMotion } from './ScrollReveal/scrollMotion';
import { GlassCard } from './Glass/GlassCard';
import './css/HowWeWork.css';

const bp = process.env.BASE_PATH || '';

const HowWeWork: React.FC = () => {
  const { t } = useTranslation();
  const gridRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      num: '01',
      title: t('hww.step1_title', 'DISCOVER'),
      desc: t('hww.step1_desc', 'We analyze your business needs and technical requirements to create a tailored strategy.'),
      img: `${bp}/assets/images/Cube1.png`,
    },
    {
      num: '02',
      title: t('hww.step2_title', 'DESIGN'),
      desc: t('hww.step2_desc', 'Our team creates intuitive, user-centered designs that align with your brand identity.'),
      img: `${bp}/assets/images/Cube2.png`,
    },
    {
      num: '03',
      title: t('hww.step3_title', 'DEVELOP'),
      desc: t('hww.step3_desc', 'We build robust, scalable solutions using cutting-edge technologies and best practices.'),
      img: `${bp}/assets/images/Cube3.png`,
    },
    {
      num: '04',
      title: t('hww.step4_title', 'DEPLOY'),
      desc: t('hww.step4_desc', 'Seamless deployment with continuous integration and monitoring for optimal performance.'),
      img: `${bp}/assets/images/Cube4.png`,
    },
    {
      num: '05',
      title: t('hww.step5_title', 'MAINTAIN'),
      desc: t('hww.step5_desc', 'Ongoing support and optimization to ensure your solution evolves with your needs.'),
      img: `${bp}/assets/images/Cube5.png`,
    },
  ];

  useScrollBatch(gridRef, {
    selector: '.hww-card-reveal',
    mode: 'fade',
    stagger: 0.08,
  });

  useLayoutEffect(() => {
    if (!gridRef.current || prefersReducedMotion() || isMobileViewport()) return;

    registerGsapPlugins();
    const wrappers = gsap.utils.toArray<HTMLElement>('.hww-card-img-float');
    if (!wrappers.length) return;

    const ctx = gsap.context(() => {
      wrappers.forEach((wrap) => {
        gsap.fromTo(
          wrap,
          { y: 8 },
          {
            y: -8,
            ease: 'none',
            scrollTrigger: {
              trigger: wrap.closest('.hww-card') ?? wrap,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="how-we-work">
      <div className="hww-container">
        <div className="hww-header">
          <ScrollReveal width="100%" variant="fade">
            <h2 className="hww-title">
              <span className="depot-font">{t('hww.title', 'HOW WE WORK')}</span>
            </h2>
          </ScrollReveal>
        </div>
        <div ref={gridRef} className="hww-grid">
          {steps.map((step, i) => (
            <div key={i} className="hww-card-reveal">
              <GlassCard
                variant="surface"
                glow="purple"
                interactive
                padding="none"
                border="luminous"
                className="hww-glass-card"
              >
                <div className="hww-card">
                  <div className="hww-card-img hww-card-img-float">
                    <Image
                      src={step.img}
                      alt={step.title}
                      width={120}
                      height={120}
                      unoptimized
                      style={{ animation: 'hww-float 3s ease-in-out infinite' }}
                    />
                  </div>
                  <h3 className="hww-card-title">{step.title}</h3>
                  <p className="hww-card-desc">{step.desc}</p>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
