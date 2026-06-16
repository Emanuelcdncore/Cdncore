'use client';

import React, { useMemo, useRef, lazy, Suspense, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { useHeroEntrance } from './Hero/useHeroEntrance';
import BlurText from './ReactBits/BlurText';
import './css/Hero.css';

const VantaFog = lazy(() => import('./Backgrounds/VantaFog'));

const bp = process.env.BASE_PATH || '';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { entranceDone, isPending } = useHeroEntrance({
    contentRef,
    glowRef,
    parallaxRef,
    taglineRef,
    scrollRef,
  });

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const tagline = mounted ? t('home.hero.tagline') : '';

  const memoizedVantaFog = useMemo(
    () => (
      <Suspense fallback={<div className="fallback-background" />}>
        <VantaFog className="" style={{}} />
      </Suspense>
    ),
    []
  );

  return (
    <section className="hero" id="hero">
      <div className="fallback-background" />
      <div className="hero-gradient-overlay" />
      <div className="faulty-terminal-background">{memoizedVantaFog}</div>

      <div className="logo-container">
        <div
          ref={contentRef}
          className={`hero-content${isPending ? ' hero-content--pending' : ''}`}
        >
          <div className="hero-logo-stage">
            <div ref={glowRef} className="hero-logo-glow" aria-hidden="true" />
            <div ref={parallaxRef} className="hero-logo-parallax logo-scale-wrapper">
              <Image
                src={`${bp}/assets/logos/CDNCORE-03.png`}
                alt="CDN Logo"
                className="main-logo"
                width={800}
                height={800}
                unoptimized
                priority
              />
            </div>
          </div>

          {/* Ghost element \u2014 satisfies entrance system's taglineRef non-null check */}
          <p ref={taglineRef} className="hero-tagline-ghost" aria-hidden="true" />

          {/* BlurText tagline \u2014 mounts after entrance completes */}
          {mounted && entranceDone && (
            <BlurText
              text={tagline}
              className="hero-tagline"
              delay={80}
              animateBy="words"
              direction="top"
              stepDuration={0.5}
            />
          )}
        </div>
      </div>

      <motion.div
        ref={scrollRef}
        className="hero-scroll-indicator"
        animate={entranceDone ? { y: [0, 10, 0] } : undefined}
        transition={
          entranceDone
            ? { duration: 2, repeat: Infinity, ease: 'easeInOut' }
            : undefined
        }
      >
        <div className="relative w-8 h-14 flex justify-center items-start">
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent"
            style={{
              background:
                'linear-gradient(#000, #000) padding-box, linear-gradient(to right, rgba(139,92,246,0.6), rgba(236,72,153,0.6)) border-box',
            }}
          >
            <div className="w-full h-full bg-black rounded-full" />
          </div>
          <motion.div
            className="relative w-2 h-3 rounded-full mt-3"
            style={{
              background:
                'linear-gradient(to bottom, rgba(139,92,246,0.8), rgba(236,72,153,0.8))',
            }}
            animate={entranceDone ? { y: [0, 6, 0] } : undefined}
            transition={
              entranceDone
                ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
                : undefined
            }
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
