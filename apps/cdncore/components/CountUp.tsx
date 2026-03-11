'use client';

import React, { useState, useEffect, useRef } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  decimals?: number;
}

const CountUp: React.FC<CountUpProps> = ({
  end,
  duration = 2000,
  suffix = '',
  decimals = 0
}) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = easeOutQuart * end;
      setCount(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [hasStarted, end, duration]);

  const formattedCount = decimals > 0
    ? count.toFixed(decimals)
    : Math.floor(count).toString();

  return (
    <span ref={elementRef}>
      {formattedCount}{suffix}
    </span>
  );
};

export default CountUp;
