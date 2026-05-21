'use client';

import React, { useState, useEffect, useRef } from 'react';
import FinalFloatingNav from './FinalFloatingNav';
import MobileNav from './MobileNav';

const HIDE_THRESHOLD = 80;
const DELTA = 6;

const NavigationWrapper: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile(e.matches);
    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    lastY.current = window.scrollY;
    const evaluate = () => {
      const y = window.scrollY;
      const diff = y - lastY.current;
      if (Math.abs(diff) < DELTA) {
        ticking.current = false;
        return;
      }
      if (y > HIDE_THRESHOLD && diff > 0) setHidden(true);
      else if (diff < 0 || y <= HIDE_THRESHOLD) setHidden(false);
      lastY.current = y;
      ticking.current = false;
    };
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      if (typeof requestAnimationFrame === 'function') requestAnimationFrame(evaluate);
      else evaluate();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return isMobile ? <MobileNav hidden={hidden} /> : <FinalFloatingNav hidden={hidden} />;
};

export default NavigationWrapper;
