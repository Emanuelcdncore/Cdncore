'use client';

import React, { useEffect, useRef } from 'react';
import { loadAllScripts } from '@/lib/load-external';

interface VantaDotsProps {
  className?: string;
  style?: React.CSSProperties;
}

const SCRIPTS = [
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js',
  'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.dots.min.js',
];

const VantaDots: React.FC<VantaDotsProps> = ({ className = '', style = {} }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<any>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let cancelled = false;

    const init = () => {
      if (cancelled || !el || !window.VANTA?.DOTS) return;
      try {
        if (effectRef.current) {
          effectRef.current.destroy();
          effectRef.current = null;
        }
        effectRef.current = window.VANTA.DOTS({
          el,
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x8b5cf6,
          color2: 0x7c3aed,
          backgroundColor: 0x1b181b,
          size: 5.6,
          spacing: 40.0,
          showLines: false,
        });
      } catch (error) {
        console.error('[VantaDots] Error:', error);
      }
    };

    const destroy = () => {
      if (effectRef.current) {
        effectRef.current.destroy();
        effectRef.current = null;
      }
    };

    loadAllScripts(SCRIPTS).then(() => {
      if (!cancelled) init();
    }).catch((err) => console.error('[VantaDots] script load failed', err));

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!effectRef.current && window.VANTA?.DOTS) init();
        } else {
          destroy();
        }
      },
      { rootMargin: '120px' }
    );
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      destroy();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`vanta-dots-background ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        touchAction: 'none',
        ...style,
      }}
    />
  );
};

export default VantaDots;
