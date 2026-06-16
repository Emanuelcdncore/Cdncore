'use client';

import { useEffect } from 'react';
import { HERO_HANDOFF_EVENT, wasLoaderSkipped } from '@/lib/loading-handoff';
import { registerGsapPlugins, ScrollTrigger } from '@/lib/gsap/register';

function refreshScrollTriggers() {
  registerGsapPlugins();
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
}

export function useLandingScrollRefresh() {
  useEffect(() => {
    registerGsapPlugins();

    const onHandoff = () => refreshScrollTriggers();
    window.addEventListener(HERO_HANDOFF_EVENT, onHandoff);
    window.addEventListener('load', refreshScrollTriggers);

    if (wasLoaderSkipped()) {
      refreshScrollTriggers();
    }

    const onResize = () => refreshScrollTriggers();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener(HERO_HANDOFF_EVENT, onHandoff);
      window.removeEventListener('load', refreshScrollTriggers);
      window.removeEventListener('resize', onResize);
    };
  }, []);
}
