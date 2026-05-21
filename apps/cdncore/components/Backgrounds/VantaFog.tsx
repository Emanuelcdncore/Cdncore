'use client';

import { useEffect, useRef, useState } from 'react';
import { loadAllScripts } from '@/lib/load-external';
import './VantaFog.css';

declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}

const SCRIPTS = [
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js',
  'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js',
];

const VantaFog = ({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);
  const [, setIsLoaded] = useState(true);

  useEffect(() => {
    const el = vantaRef.current;
    if (!el) return;
    let cancelled = false;

    const init = () => {
      if (cancelled || !el || !window.VANTA?.FOG) return;
      try {
        if (vantaEffect.current) {
          vantaEffect.current.destroy();
          vantaEffect.current = null;
        }
        vantaEffect.current = window.VANTA.FOG({
          el,
          THREE: window.THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          highlightColor: 0x34342f,
          midtoneColor: 0x7e2ee8,
          lowlightColor: 0xf71bf7,
          baseColor: 0x0,
          blurFactor: 0.38,
          speed: 0.30,
          zoom: 0.40,
        });
        setIsLoaded(true);
      } catch (error) {
        console.error('[VantaFog] Error:', error);
      }
    };

    const destroy = () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };

    // Load scripts then init once they are available.
    loadAllScripts(SCRIPTS).then(() => {
      if (!cancelled) init();
    }).catch((err) => console.error('[VantaFog] script load failed', err));

    // Pause WebGL when the hero is off-screen so it does not compete with
    // the scroll handler / rAF budget for the rest of the page.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!vantaEffect.current && window.VANTA?.FOG) init();
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
      ref={vantaRef}
      id="vanta-fog-background"
      className={`vanta-fog-container ${className || ''}`}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        ...style,
      }}
    />
  );
};

export default VantaFog;
