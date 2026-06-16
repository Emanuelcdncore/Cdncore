import type gsap from 'gsap';
import type { ScrollRevealVariant } from './scrollReveal.types';

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function isMobileViewport(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 768px)').matches;
}

export function getRevealFrom(
  variant: ScrollRevealVariant,
  mobile = isMobileViewport()
): gsap.TweenVars {
  const y = mobile ? 16 : 30;
  const x = mobile ? 16 : 30;

  switch (variant) {
    case 'slide':
      return { opacity: 0, x: -x };
    case 'slide-right':
      return { opacity: 0, x };
    case 'scale':
      return { opacity: 0, scale: mobile ? 0.96 : 0.92 };
    default:
      return { opacity: 0, y };
  }
}

export const revealTo: gsap.TweenVars = {
  opacity: 1,
  x: 0,
  y: 0,
  scale: 1,
};
