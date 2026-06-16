'use client';

import { useCallback, useLayoutEffect, useState } from 'react';

export const LOADING_SESSION_KEY = 'cdncore-loaded';

export type LoadingScreenState = 'pending' | 'show' | 'skip';

export function useLoadingScreen() {
  const [state, setState] = useState<LoadingScreenState>('pending');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setPrefersReducedMotion(reduced);

    try {
      if (sessionStorage.getItem(LOADING_SESSION_KEY) === '1') {
        setState('skip');
        return;
      }
    } catch {
      setState('skip');
      return;
    }

    setState('show');
    document.body.style.overflow = 'hidden';
  }, []);

  const onComplete = useCallback(() => {
    try {
      sessionStorage.setItem(LOADING_SESSION_KEY, '1');
    } catch {
      // sessionStorage unavailable (private mode, etc.)
    }
    document.body.style.overflow = '';
    setState('skip');
  }, []);

  return {
    state,
    shouldShow: state === 'show',
    prefersReducedMotion,
    onComplete,
  };
}
