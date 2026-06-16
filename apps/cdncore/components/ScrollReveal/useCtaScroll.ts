'use client';

import { useLayoutEffect } from 'react';
import { gsap, registerGsapPlugins } from '@/lib/gsap/register';
import { isMobileViewport, prefersReducedMotion, revealTo } from './scrollMotion';

type CtaScrollRefs = {
  sectionRef: React.RefObject<HTMLElement | null>;
  backgroundRef: React.RefObject<HTMLElement | null>;
  titleRef: React.RefObject<HTMLElement | null>;
  subtitleRef: React.RefObject<HTMLElement | null>;
  buttonRef: React.RefObject<HTMLElement | null>;
};

export function useCtaScroll(refs: CtaScrollRefs) {
  useLayoutEffect(() => {
    const section = refs.sectionRef.current;
    if (!section) return;

    const { backgroundRef, titleRef, subtitleRef, buttonRef } = refs;
    const background = backgroundRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const button = buttonRef.current;

    registerGsapPlugins();
    const reduced = prefersReducedMotion();
    const mobile = isMobileViewport();

    const ctx = gsap.context(() => {
      if (reduced) {
        [title, subtitle, button].forEach((el) => el && gsap.set(el, { opacity: 0 }));
        const tl = gsap.timeline({
          scrollTrigger: { trigger: section, start: 'top 85%', once: true },
        });
        if (title) tl.to(title, { opacity: 1, duration: 0.35 }, 0);
        if (subtitle) tl.to(subtitle, { opacity: 1, duration: 0.35 }, 0.08);
        if (button) tl.to(button, { opacity: 1, duration: 0.35 }, 0.16);
        return;
      }

      if (background && !mobile) {
        gsap.fromTo(
          background,
          { y: 60, opacity: 0.85 },
          {
            y: -60,
            opacity: 1,
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

      if (title) {
        gsap.set(title, { opacity: 0, y: mobile ? 24 : 40 });
        gsap.to(title, {
          ...revealTo,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'top 55%',
            scrub: 1,
          },
        });
      }

      if (subtitle) {
        gsap.set(subtitle, { opacity: 0, y: mobile ? 16 : 24 });
        gsap.to(subtitle, {
          ...revealTo,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 62%', once: true },
        });
      }

      if (button) {
        gsap.set(button, { opacity: 0, scale: 0.92 });
        gsap.to(button, {
          ...revealTo,
          duration: 0.55,
          ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 70%', once: true },
        });
      }
    }, section);

    return () => ctx.revert();
  }, [refs]);
}
