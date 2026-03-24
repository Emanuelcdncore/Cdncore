'use client';

import React, { useEffect, useRef } from 'react';

interface LightRayProps {
  raySpeed?: number;
  lightSpread?: number;
  rayLength?: number;
  fadeDistance?: number;
  saturation?: number;
  mouseInfluence?: number;
  noiseAmount?: number;
  distortion?: number;
  direction?: 'up' | 'down';
  className?: string;
}

const LightRay: React.FC<LightRayProps> = ({
  raySpeed = 0.1,
  lightSpread = 0.4,
  rayLength = 3,
  fadeDistance = 2,
  saturation = 1,
  mouseInfluence = 0,
  noiseAmount = 0,
  distortion = 0.1,
  direction = 'down',
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);
      
      timeRef.current += raySpeed;

      // Create multiple light rays
      const numRays = 3;
      for (let i = 0; i < numRays; i++) {
        const xOffset = (i - 1) * (width * lightSpread);
        const centerX = width / 2 + xOffset;
        
        // Calculate ray position based on direction
        const rayProgress = (timeRef.current + i * 0.5) % (rayLength + fadeDistance);
        let startY, endY;
        
        if (direction === 'down') {
          startY = (rayProgress - fadeDistance) * (height / rayLength);
          endY = rayProgress * (height / rayLength);
        } else {
          startY = height - (rayProgress - fadeDistance) * (height / rayLength);
          endY = height - rayProgress * (height / rayLength);
        }

        // Apply distortion
        const distortionOffset = Math.sin(timeRef.current * 2 + i) * distortion * 20;
        
        // Create gradient for the light ray
        const gradient = ctx.createLinearGradient(centerX, startY, centerX, endY);
        
        if (direction === 'down') {
          gradient.addColorStop(0, `hsla(0, 0%, 100%, 0)`);
          gradient.addColorStop(0.3, `hsla(0, 0%, 100%, ${saturation * 0.8})`);
          gradient.addColorStop(0.7, `hsla(0, 0%, 100%, ${saturation})`);
          gradient.addColorStop(1, `hsla(0, 0%, 100%, 0)`);
        } else {
          gradient.addColorStop(0, `hsla(0, 0%, 100%, 0)`);
          gradient.addColorStop(0.3, `hsla(0, 0%, 100%, ${saturation})`);
          gradient.addColorStop(0.7, `hsla(0, 0%, 100%, ${saturation * 0.8})`);
          gradient.addColorStop(1, `hsla(0, 0%, 100%, 0)`);
        }

        ctx.fillStyle = gradient;
        
        // Draw the ray
        ctx.beginPath();
        const rayWidth = 2 + Math.sin(timeRef.current + i) * 1;
        ctx.fillRect(
          centerX - rayWidth / 2 + distortionOffset, 
          Math.min(startY, endY), 
          rayWidth, 
          Math.abs(endY - startY)
        );
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [raySpeed, lightSpread, rayLength, fadeDistance, saturation, mouseInfluence, noiseAmount, distortion, direction]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    />
  );
};

export default LightRay;