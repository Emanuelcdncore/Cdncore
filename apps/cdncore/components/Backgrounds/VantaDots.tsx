'use client';

import React, { useEffect, useRef } from 'react';

interface VantaDotsProps {
  className?: string;
  style?: React.CSSProperties;
}

const VantaDots: React.FC<VantaDotsProps> = ({ className = '', style = {} }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const checkScriptsLoaded = () => {
      return typeof window !== 'undefined' &&
        window.THREE &&
        window.VANTA &&
        window.VANTA.DOTS;
    };

    const initVanta = () => {
      if (!containerRef.current || !checkScriptsLoaded()) return false;

      try {
        if (effectRef.current) {
          effectRef.current.destroy();
          effectRef.current = null;
        }

        effectRef.current = window.VANTA.DOTS({
          el: containerRef.current,
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x8B5CF6,
          color2: 0x7C3AED,
          backgroundColor: 0x1b181b,
          size: 5.60,
          spacing: 40.00,
          showLines: false
        });
        return true;
      } catch (error) {
        console.error('[VantaDots] Error:', error);
        return false;
      }
    };

    if (initVanta()) return;

    let retryCount = 0;
    const maxRetries = 50;

    const retryInterval = setInterval(() => {
      retryCount++;
      if (checkScriptsLoaded()) {
        clearInterval(retryInterval);
        initVanta();
        return;
      }
      if (retryCount >= maxRetries) {
        clearInterval(retryInterval);
      }
    }, 100);

    return () => {
      clearInterval(retryInterval);
      if (effectRef.current) {
        effectRef.current.destroy();
        effectRef.current = null;
      }
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
        ...style
      }}
    />
  );
};

export default VantaDots;
