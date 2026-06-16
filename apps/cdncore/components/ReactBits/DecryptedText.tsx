'use client';

import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';

const wrapperStyle: React.CSSProperties = {
  display: 'inline-block',
  whiteSpace: 'pre-wrap',
};

const srOnlyStyle: React.CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0,0,0,0)',
  border: 0,
};

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: 'start' | 'end' | 'center';
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: 'view' | 'hover' | 'inViewHover' | 'click';
  clickMode?: 'once' | 'toggle';
}

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover',
  clickMode = 'once',
}: DecryptedTextProps) {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState(new Set<number>());
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isDecrypted, setIsDecrypted] = useState(animateOn !== 'click');
  const [direction, setDirection] = useState('forward');

  const containerRef = useRef<HTMLSpanElement>(null);
  const orderRef = useRef<number[]>([]);
  const pointerRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const availableChars = useMemo(() => {
    return useOriginalCharsOnly
      ? Array.from(new Set(text.split(''))).filter((c) => c !== ' ')
      : characters.split('');
  }, [useOriginalCharsOnly, text, characters]);

  const shuffleText = useCallback(
    (original: string, revealed: Set<number>) =>
      original
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (revealed.has(i)) return original[i];
          return availableChars[Math.floor(Math.random() * availableChars.length)];
        })
        .join(''),
    [availableChars]
  );

  const computeOrder = useCallback(
    (len: number) => {
      const order: number[] = [];
      if (len <= 0) return order;
      if (revealDirection === 'start') {
        for (let i = 0; i < len; i++) order.push(i);
        return order;
      }
      if (revealDirection === 'end') {
        for (let i = len - 1; i >= 0; i--) order.push(i);
        return order;
      }
      const middle = Math.floor(len / 2);
      let offset = 0;
      while (order.length < len) {
        const idx =
          offset % 2 === 0 ? middle + offset / 2 : middle - Math.ceil(offset / 2);
        if (idx >= 0 && idx < len) order.push(idx);
        offset++;
      }
      return order.slice(0, len);
    },
    [revealDirection]
  );

  const fillAllIndices = useCallback(() => {
    const s = new Set<number>();
    for (let i = 0; i < text.length; i++) s.add(i);
    return s;
  }, [text]);

  const removeRandomIndices = useCallback((set: Set<number>, count: number) => {
    const arr = Array.from(set);
    for (let i = 0; i < count && arr.length > 0; i++) {
      arr.splice(Math.floor(Math.random() * arr.length), 1);
    }
    return new Set<number>(arr);
  }, []);

  const encryptInstantly = useCallback(() => {
    const empty = new Set<number>();
    setRevealedIndices(empty);
    setDisplayText(shuffleText(text, empty));
    setIsDecrypted(false);
  }, [text, shuffleText]);

  const triggerDecrypt = useCallback(() => {
    if (sequential) {
      orderRef.current = computeOrder(text.length);
      pointerRef.current = 0;
    }
    setRevealedIndices(new Set());
    setDirection('forward');
    setIsAnimating(true);
  }, [sequential, computeOrder, text.length]);

  const triggerReverse = useCallback(() => {
    const full = fillAllIndices();
    if (sequential) {
      orderRef.current = computeOrder(text.length).reverse();
      pointerRef.current = 0;
      setRevealedIndices(full);
      setDisplayText(shuffleText(text, full));
    } else {
      setRevealedIndices(full);
      setDisplayText(shuffleText(text, full));
    }
    setDirection('reverse');
    setIsAnimating(true);
  }, [sequential, computeOrder, fillAllIndices, shuffleText, text]);

  useEffect(() => {
    if (!isAnimating) return;
    if (prefersReducedMotion) {
      setDisplayText(text);
      setIsDecrypted(true);
      setIsAnimating(false);
      return;
    }

    let currentIteration = 0;

    const getNextIndex = (revealed: Set<number>) => {
      const len = text.length;
      if (revealDirection === 'start') return revealed.size;
      if (revealDirection === 'end') return len - 1 - revealed.size;
      const middle = Math.floor(len / 2);
      const offset = Math.floor(revealed.size / 2);
      const next = revealed.size % 2 === 0 ? middle + offset : middle - offset - 1;
      if (next >= 0 && next < len && !revealed.has(next)) return next;
      for (let i = 0; i < len; i++) { if (!revealed.has(i)) return i; }
      return 0;
    };

    intervalRef.current = setInterval(() => {
      setRevealedIndices((prev) => {
        if (sequential) {
          if (direction === 'forward') {
            if (prev.size < text.length) {
              const next = getNextIndex(prev);
              const updated = new Set(prev);
              updated.add(next);
              setDisplayText(shuffleText(text, updated));
              return updated;
            }
            if (intervalRef.current) clearInterval(intervalRef.current);
            setIsAnimating(false);
            setIsDecrypted(true);
            return prev;
          }
          if (pointerRef.current < orderRef.current.length) {
            const idx = orderRef.current[pointerRef.current++];
            const updated = new Set(prev);
            updated.delete(idx);
            setDisplayText(shuffleText(text, updated));
            if (updated.size === 0) {
              if (intervalRef.current) clearInterval(intervalRef.current);
              setIsAnimating(false);
              setIsDecrypted(false);
            }
            return updated;
          }
          if (intervalRef.current) clearInterval(intervalRef.current);
          setIsAnimating(false);
          setIsDecrypted(false);
          return prev;
        }
        // non-sequential
        if (direction === 'forward') {
          setDisplayText(shuffleText(text, prev));
          currentIteration++;
          if (currentIteration >= maxIterations) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setIsAnimating(false);
            setDisplayText(text);
            setIsDecrypted(true);
          }
          return prev;
        }
        let cur = prev.size === 0 ? fillAllIndices() : prev;
        const removeCount = Math.max(1, Math.ceil(text.length / Math.max(1, maxIterations)));
        const next = removeRandomIndices(cur, removeCount);
        setDisplayText(shuffleText(text, next));
        currentIteration++;
        if (next.size === 0 || currentIteration >= maxIterations) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setIsAnimating(false);
          setIsDecrypted(false);
          setDisplayText(shuffleText(text, new Set()));
          return new Set();
        }
        return next;
      });
    }, speed);

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isAnimating, text, speed, maxIterations, sequential, revealDirection, shuffleText, direction, fillAllIndices, removeRandomIndices, prefersReducedMotion]);

  const handleClick = () => {
    if (animateOn !== 'click') return;
    if (clickMode === 'once') { if (!isDecrypted) { setDirection('forward'); triggerDecrypt(); } }
    else if (isDecrypted) triggerReverse();
    else { setDirection('forward'); triggerDecrypt(); }
  };

  const triggerHoverDecrypt = useCallback(() => {
    if (isAnimating) return;
    setRevealedIndices(new Set());
    setIsDecrypted(false);
    setDisplayText(text);
    setDirection('forward');
    setIsAnimating(true);
  }, [isAnimating, text]);

  const resetToPlainText = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsAnimating(false);
    setRevealedIndices(new Set());
    setDisplayText(text);
    setIsDecrypted(true);
    setDirection('forward');
  }, [text]);

  useEffect(() => {
    if (animateOn !== 'view' && animateOn !== 'inViewHover') return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            triggerDecrypt();
            setHasAnimated(true);
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.1 }
    );
    const el = containerRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [animateOn, hasAnimated, triggerDecrypt]);

  useEffect(() => {
    if (animateOn === 'click') encryptInstantly();
    else { setDisplayText(text); setIsDecrypted(true); }
    setRevealedIndices(new Set());
    setDirection('forward');
  }, [animateOn, text, encryptInstantly]);

  const eventProps =
    animateOn === 'hover' || animateOn === 'inViewHover'
      ? { onMouseEnter: triggerHoverDecrypt, onMouseLeave: resetToPlainText }
      : animateOn === 'click'
      ? { onClick: handleClick }
      : {};

  return (
    <motion.span
      className={parentClassName}
      ref={containerRef}
      style={wrapperStyle}
      {...eventProps}
    >
      <span style={srOnlyStyle}>{displayText}</span>
      <span aria-hidden="true">
        {displayText.split('').map((char, index) => {
          const revealed = revealedIndices.has(index) || (!isAnimating && isDecrypted);
          return (
            <span key={index} className={revealed ? className : encryptedClassName}>
              {char}
            </span>
          );
        })}
      </span>
    </motion.span>
  );
}
