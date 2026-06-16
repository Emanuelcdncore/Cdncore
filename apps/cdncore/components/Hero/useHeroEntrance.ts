'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  HERO_HANDOFF_EVENT,
  type HeroHandoffDetail,
  wasLoaderSkipped,
} from '@/lib/loading-handoff';
import { runHeroEntranceTimeline, type HeroEntranceMode } from './heroTimeline';

type HeroEntranceRefs = {
  contentRef: React.RefObject<HTMLDivElement | null>;
  glowRef: React.RefObject<HTMLDivElement | null>;
  parallaxRef: React.RefObject<HTMLDivElement | null>;
  taglineRef: React.RefObject<HTMLParagraphElement | null>;
  scrollRef: React.RefObject<HTMLDivElement | null>;
};

export function useHeroEntrance(refs: HeroEntranceRefs) {
  const [entranceDone, setEntranceDone] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [parallaxEnabled, setParallaxEnabled] = useState(false);
  const reducedMotionRef = useRef(false);
  const ctxRef = useRef<gsap.Context | null>(null);
  const startedRef = useRef(false);

  const getTargets = useCallback(() => {
    const { contentRef, glowRef, parallaxRef, taglineRef, scrollRef } = refs;
    if (
      !contentRef.current ||
      !glowRef.current ||
      !parallaxRef.current ||
      !taglineRef.current ||
      !scrollRef.current
    ) {
      return null;
    }

    const chars = Array.from(
      taglineRef.current.querySelectorAll<HTMLElement>('.hero-tagline-char')
    );

    return {
      content: contentRef.current,
      glow: glowRef.current,
      parallax: parallaxRef.current,
      chars,
      scrollIndicator: scrollRef.current,
    };
  }, [refs]);

  const runEntrance = useCallback(
    (mode: HeroEntranceMode) => {
      if (startedRef.current) return;
      const targets = getTargets();
      if (!targets) return;

      startedRef.current = true;
      setHasStarted(true);
      ctxRef.current?.revert();

      const root = refs.contentRef.current;
      if (!root) return;

      ctxRef.current = gsap.context(() => {
        runHeroEntranceTimeline(targets, mode, reducedMotionRef.current, () => {
          setEntranceDone(true);
          if (!reducedMotionRef.current) {
            setParallaxEnabled(true);
          }
          root.classList.remove('hero-content--pending');
        });
      }, root);
    },
    [getTargets, refs.contentRef]
  );

  useLayoutEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const onHandoff = (event: Event) => {
      const detail = (event as CustomEvent<HeroHandoffDetail>).detail;
      const mode: HeroEntranceMode = detail.withLoader ? 'full' : 'mini';
      const tryStart = () => {
        if (startedRef.current) return;
        if (!getTargets()) {
          requestAnimationFrame(tryStart);
          return;
        }
        runEntrance(mode);
      };
      tryStart();
    };

    window.addEventListener(HERO_HANDOFF_EVENT, onHandoff);

    if (wasLoaderSkipped()) {
      const tryMini = () => {
        if (startedRef.current) return;
        if (!getTargets()) {
          requestAnimationFrame(tryMini);
          return;
        }
        runEntrance('mini');
      };
      requestAnimationFrame(tryMini);
    }

    return () => {
      window.removeEventListener(HERO_HANDOFF_EVENT, onHandoff);
      ctxRef.current?.revert();
    };
  }, [runEntrance, getTargets]);

  useEffect(() => {
    if (!parallaxEnabled || !refs.parallaxRef.current) return;

    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (!finePointer || coarsePointer) return;

    const el = refs.parallaxRef.current;
    const maxOffset = 12;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * maxOffset * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * maxOffset * 2;
      xTo(x);
      yTo(y);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [parallaxEnabled, refs.parallaxRef]);

  return { entranceDone, isPending: !hasStarted };
}
