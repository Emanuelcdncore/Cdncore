'use client';

import { useLayoutEffect } from 'react';
import { gsap, registerGsapPlugins } from '@/lib/gsap/register';
import {
  isMobileViewport,
  prefersReducedMotion,
  revealTo,
} from './scrollMotion';

type IntroScrollRefs = {
  sectionRef: React.RefObject<HTMLElement | null>;
  overlayRef: React.RefObject<HTMLElement | null>;
  leftRef?: React.RefObject<HTMLElement | null>;
  rightRef?: React.RefObject<HTMLElement | null>;
  paragraphRef?: React.RefObject<HTMLElement | null>;
};

export function useIntroScroll(
  refs: IntroScrollRefs,
  { enabled = true }: { enabled?: boolean } = {}
) {
  useLayoutEffect(() => {
    if (!enabled || !refs.sectionRef.current) return;

    const { sectionRef, overlayRef, leftRef, rightRef, paragraphRef } = refs;
    const section = sectionRef.current;
    const overlay = overlayRef.current;
    const left = leftRef?.current ?? null;
    const right = rightRef?.current ?? null;
    const paragraph = paragraphRef?.current ?? null;

    registerGsapPlugins();
    const reduced = prefersReducedMotion();
    const mobile = isMobileViewport();

    const ctx = gsap.context(() => {
      if (reduced) {
        if (left) gsap.set(left, { opacity: 0 });
        if (right) gsap.set(right, { opacity: 0 });
        if (paragraph) gsap.set(paragraph, { opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: section, start: 'top 80%', once: true },
        });
        if (left) tl.to(left, { opacity: 1, duration: 0.35 }, 0);
        if (right) tl.to(right, { opacity: 1, duration: 0.35 }, 0.05);
        if (paragraph) tl.to(paragraph, { opacity: 1, duration: 0.35 }, 0.1);
        return;
      }

      if (overlay && !mobile) {
        gsap.fromTo(
          overlay,
          { y: 40 },
          {
            y: -40,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      }

      if (left) {
        gsap.set(left, { opacity: 0, x: mobile ? -20 : -40 });
        gsap.to(left, {
          ...revealTo,
          duration: 0.75,
          ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 75%', once: true },
        });
      }

      if (right) {
        gsap.set(right, { opacity: 0, x: mobile ? 20 : 40 });
        gsap.to(right, {
          ...revealTo,
          duration: 0.75,
          ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 75%', once: true },
        });
      }

      if (paragraph) {
        gsap.set(paragraph, { opacity: 0, y: mobile ? 12 : 20 });
        gsap.to(paragraph, {
          ...revealTo,
          duration: 0.6,
          delay: 0.15,
          ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 72%', once: true },
        });
      }
    }, section!);

    return () => ctx.revert();
  }, [enabled, refs]);
}
