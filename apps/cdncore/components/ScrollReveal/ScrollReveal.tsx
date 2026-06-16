'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { gsap, registerGsapPlugins } from '@/lib/gsap/register';
import {
  getRevealFrom,
  isMobileViewport,
  prefersReducedMotion,
  revealTo,
} from './scrollMotion';
import type { ScrollRevealLegacyVariant, ScrollRevealVariant } from './scrollReveal.types';

interface ScrollRevealProps {
  children: React.ReactNode;
  width?: string;
  delay?: number;
  variant?: ScrollRevealLegacyVariant;
  scrub?: boolean;
  scrubEnd?: string;
  className?: string;
}

function normalizeVariant(variant: ScrollRevealLegacyVariant): ScrollRevealVariant {
  if (variant === 'blur') return 'fade';
  return variant;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  width = 'fit-content',
  delay = 0,
  variant = 'fade',
  scrub = false,
  scrubEnd = 'top 65%',
  className = '',
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const resolvedVariant = normalizeVariant(variant);

  useLayoutEffect(() => {
    const el = targetRef.current;
    const root = rootRef.current;
    if (!el || !root) return;

    registerGsapPlugins();
    const reduced = prefersReducedMotion();
    const mobile = isMobileViewport();

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(el, { opacity: 0 });
        gsap.to(el, {
          opacity: 1,
          duration: 0.35,
          delay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            once: true,
          },
        });
        return;
      }

      gsap.set(el, getRevealFrom(resolvedVariant, mobile));

      if (scrub) {
        gsap.to(el, {
          ...revealTo,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top bottom',
            end: scrubEnd,
            scrub: 1,
          },
        });
        return;
      }

      gsap.to(el, {
        ...revealTo,
        duration: 0.7,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [resolvedVariant, delay, scrub, scrubEnd]);

  return (
    <div ref={rootRef} className={className} style={{ width, position: 'relative' }}>
      <div ref={targetRef}>{children}</div>
    </div>
  );
};

export default ScrollReveal;
