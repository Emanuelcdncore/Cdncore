'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState, useMemo } from 'react';

type AnimationSnapshot = Record<string, string | number>;

function buildKeyframes(
  from: AnimationSnapshot,
  steps: AnimationSnapshot[]
): Record<string, (string | number)[]> {
  const keys = new Set([...Object.keys(from), ...steps.flatMap((s) => Object.keys(s))]);
  const kf: Record<string, (string | number)[]> = {};
  keys.forEach((k) => {
    kf[k] = [from[k], ...steps.map((s) => s[k])];
  });
  return kf;
}

interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: AnimationSnapshot;
  animationTo?: AnimationSnapshot[];
  easing?: (t: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
}

export default function BlurText({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = (t) => t,
  onAnimationComplete,
  stepDuration = 0.35,
}: BlurTextProps) {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) { setInView(true); return; }
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin, prefersReducedMotion]);

  const defaultFrom = useMemo<AnimationSnapshot>(
    () => (direction === 'top'
      ? { filter: 'blur(10px)', opacity: 0, y: -50 }
      : { filter: 'blur(10px)', opacity: 0, y: 50 }),
    [direction]
  );

  const defaultTo = useMemo<AnimationSnapshot[]>(
    () => [
      { filter: 'blur(5px)', opacity: 0.5, y: direction === 'top' ? 5 : -5 },
      { filter: 'blur(0px)', opacity: 1, y: 0 },
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;
  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1)
  );

  if (prefersReducedMotion) {
    return (
      <p ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25em' }}>
        {text}
      </p>
    );
  }

  return (
    <p ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {elements.map((segment, index) => (
        <motion.span
          className="inline-block will-change-[transform,filter,opacity]"
          key={index}
          initial={fromSnapshot}
          animate={inView ? buildKeyframes(fromSnapshot, toSnapshots) : fromSnapshot}
          transition={{ duration: totalDuration, times, delay: (index * delay) / 1000, ease: easing }}
          onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
        >
          {segment === ' ' ? ' ' : segment}
          {animateBy === 'words' && index < elements.length - 1 && ' '}
        </motion.span>
      ))}
    </p>
  );
}
