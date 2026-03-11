'use client';

import React, { useRef, useState } from 'react';
import './css/SpotlightCard.css';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  borderColor?: string;
  enableTilt?: boolean;
  tiltIntensity?: number;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(139, 92, 246, 0.25)',
  borderColor = 'rgba(139, 92, 246, 0.3)',
  enableTilt = false,
  tiltIntensity = 10
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });

    if (enableTilt) {
      const tiltX = ((e.clientY - rect.top) / rect.height - 0.5) * -tiltIntensity;
      const tiltY = ((e.clientX - rect.left) / rect.width - 0.5) * tiltIntensity;
      cardRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-2px)`;
    }
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    if (enableTilt && cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    }
  };

  return (
    <div
      ref={cardRef}
      className={`spotlight-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ transition: enableTilt ? 'transform 0.15s ease-out' : undefined }}
    >
      {/* Spotlight overlay */}
      <div
        className="spotlight-overlay"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}% ${position.y}%, ${spotlightColor}, transparent 40%)`
        }}
      />

      {/* Border spotlight */}
      <div
        className="spotlight-border"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}% ${position.y}%, ${borderColor}, transparent 40%)`
        }}
      />

      {/* Content */}
      <div className="spotlight-card-content">
        {children}
      </div>
    </div>
  );
};

export default SpotlightCard;
