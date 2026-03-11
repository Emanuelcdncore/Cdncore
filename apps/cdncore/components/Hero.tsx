'use client';

import React, { useMemo, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { mobileOptimizedStaggerContainer } from '@/utils/mobileAnimations';
import Image from 'next/image';
import './css/Hero.css';

const VantaFog = lazy(() => import('./Backgrounds/VantaFog'));

const bp = process.env.BASE_PATH || '';

const Hero: React.FC = () => {
  const containerVariants = mobileOptimizedStaggerContainer;

  useEffect(() => {
    const logo = document.querySelector('.main-logo') as HTMLElement;
    const wrapper = document.querySelector('.logo-scale-wrapper') as HTMLElement;
    if (logo) {
      logo.style.setProperty('transform', 'scale(0.78)', 'important');
      logo.style.setProperty('transform-origin', 'center center', 'important');
      logo.style.setProperty('height', 'clamp(495px, 44.55vh, 1485px)', 'important');
      logo.style.setProperty('width', 'auto', 'important');
      logo.style.setProperty('max-width', '90vw', 'important');
      logo.style.setProperty('max-height', '90vh', 'important');
    }
    if (wrapper) {
      wrapper.style.setProperty('transform', 'scale(0.78)', 'important');
      wrapper.style.setProperty('transform-origin', 'center center', 'important');
      wrapper.style.setProperty('display', 'inline-block', 'important');
    }
  }, []);

  const memoizedVantaFog = useMemo(() => (
    <Suspense fallback={<div className="fallback-background" />}>
      <VantaFog className="" style={{}} />
    </Suspense>
  ), []);

  return (
    <motion.section
      className="hero"
      id="hero"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.6, staggerChildren: 0.1 }}
    >
      <div className="fallback-background" />
      <div className="hero-gradient-overlay" />
      <div className="faulty-terminal-background">
        {memoizedVantaFog}
      </div>

      <div className="logo-container" style={{ zIndex: 10 }}>
        <div className="logo-scale-wrapper" style={{ transform: 'scale(0.78)', transformOrigin: 'center center', display: 'inline-block' }}>
          <Image
            src={`${bp}/assets/logos/CDNCORE-03.png`}
            alt="CDN Logo"
            className="main-logo"
            width={800}
            height={800}
            unoptimized
            priority
            style={{
              zIndex: 10,
              transform: 'scale(0.78)',
              transformOrigin: 'center center',
              height: 'clamp(495px, 44.55vh, 1485px)',
              width: 'auto',
              maxWidth: '90vw',
              maxHeight: '90vh'
            }}
          />
        </div>
      </div>

      {/* Scroll mouse indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="relative w-8 h-14 flex justify-center items-start">
          <div className="absolute inset-0 rounded-full border-2 border-transparent" style={{ background: 'linear-gradient(#000, #000) padding-box, linear-gradient(to right, rgba(139,92,246,0.6), rgba(236,72,153,0.6)) border-box' }}>
            <div className="w-full h-full bg-black rounded-full"></div>
          </div>
          <motion.div
            className="relative w-2 h-3 rounded-full mt-3"
            style={{ background: 'linear-gradient(to bottom, rgba(139,92,246,0.8), rgba(236,72,153,0.8))' }}
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
