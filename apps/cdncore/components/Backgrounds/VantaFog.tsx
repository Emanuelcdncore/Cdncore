'use client';

import { useEffect, useRef, useState } from 'react';
import './VantaFog.css';

declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}

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
    if (!vantaRef.current) return;

    const checkScriptsLoaded = () => {
      return typeof window !== 'undefined' &&
        window.THREE &&
        window.VANTA &&
        window.VANTA.FOG;
    };

    const initVanta = () => {
      if (!vantaRef.current) return false;
      if (!checkScriptsLoaded()) return false;

      try {
        if (vantaEffect.current) {
          vantaEffect.current.destroy();
          vantaEffect.current = null;
        }

        vantaEffect.current = window.VANTA.FOG({
          el: vantaRef.current,
          THREE: window.THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          highlightColor: 0x34342f,
          midtoneColor: 0x7e2ee8,
          lowlightColor: 0xf71bf7,
          baseColor: 0x0,
          blurFactor: 0.38,
          speed: 0.30,
          zoom: 0.40
        });

        setIsLoaded(true);
        return true;
      } catch (error) {
        console.error('[VantaFog] Error:', error);
        return false;
      }
    };

    if (initVanta()) return;

    let retryCount = 0;
    const maxRetries = 20;

    const retryInterval = setInterval(() => {
      retryCount++;
      if (checkScriptsLoaded()) {
        clearInterval(retryInterval);
        initVanta();
        return;
      }

      if (retryCount >= maxRetries) {
        clearInterval(retryInterval);
        setIsLoaded(true);
      }
    }, 100);

    return () => {
      clearInterval(retryInterval);
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
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
        ...style
      }}
    />
  );
};

export default VantaFog;
