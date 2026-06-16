'use client';

import { useEffect, useRef, useState } from 'react';

export function prefersReducedGlassMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function prefersReducedTransparency(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-transparency: reduce)').matches;
}

export function useGlassLight(interactive: boolean) {
  const ref = useRef<HTMLElement>(null);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    const reduced = prefersReducedGlassMotion();
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    setIsInteractive(interactive && !reduced && finePointer);
  }, [interactive]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !isInteractive) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty('--glass-x', `${x}%`);
      el.style.setProperty('--glass-y', `${y}%`);
    };

    const onLeave = () => {
      el.style.setProperty('--glass-x', '50%');
      el.style.setProperty('--glass-y', '50%');
    };

    el.addEventListener('mousemove', onMove, { passive: true });
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [isInteractive]);

  return ref;
}
