'use client';

import { useLayoutEffect } from 'react';
import { gsap, registerGsapPlugins, ScrollTrigger } from '@/lib/gsap/register';
import {
  getRevealFrom,
  isMobileViewport,
  prefersReducedMotion,
  revealTo,
} from './scrollMotion';

export type ScrollBatchMode = 'fade' | 'alternate-x';

type UseScrollBatchOptions = {
  selector: string;
  mode?: ScrollBatchMode;
  stagger?: number;
  start?: string;
  enabled?: boolean;
};

export function useScrollBatch(
  containerRef: React.RefObject<HTMLElement | null>,
  {
    selector,
    mode = 'fade',
    stagger = 0.08,
    start = 'top 88%',
    enabled = true,
  }: UseScrollBatchOptions
) {
  useLayoutEffect(() => {
    if (!enabled || !containerRef.current) return;

    registerGsapPlugins();
    const container = containerRef.current;
    const items = gsap.utils.toArray<HTMLElement>(container.querySelectorAll(selector));
    if (!items.length) return;

    const reduced = prefersReducedMotion();
    const mobile = isMobileViewport();

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(items, { opacity: 0 });
        ScrollTrigger.batch(items, {
          start,
          once: true,
          onEnter: (elements) => {
            gsap.to(elements, {
              opacity: 1,
              duration: 0.35,
              stagger: 0.04,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          },
        });
        return;
      }

      if (mode === 'alternate-x') {
        items.forEach((el, i) => {
          const fromX = i % 2 === 0 ? (mobile ? -16 : -24) : mobile ? 16 : 24;
          gsap.set(el, {
            opacity: 0,
            x: fromX,
            y: mobile ? 16 : 24,
          });
        });
        ScrollTrigger.batch(items, {
          start,
          once: true,
          onEnter: (elements) => {
            gsap.to(elements, {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.65,
              stagger,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          },
        });
        return;
      }

      gsap.set(items, getRevealFrom('fade', mobile));
      ScrollTrigger.batch(items, {
        start,
        once: true,
        onEnter: (elements) => {
          gsap.to(elements, {
            ...revealTo,
            duration: 0.65,
            stagger,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        },
      });
    }, container);

    return () => ctx.revert();
  }, [containerRef, selector, mode, stagger, start, enabled]);
}
