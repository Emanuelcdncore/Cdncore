'use client';

import React, { useRef, useEffect } from 'react';

interface FloatingLinesProps { className?: string; }

const FloatingLines: React.FC<FloatingLinesProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;

    const setCanvasSize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    setCanvasSize();

    interface Line { x: number; y: number; length: number; speed: number; angle: number; opacity: number; width: number; hue: number; }
    const lines: Line[] = [];
    for (let i = 0; i < 15; i++) {
      lines.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        length: 200 + Math.random() * 400, speed: 0.3 + Math.random() * 0.7,
        angle: Math.random() * Math.PI * 2, opacity: 0.1 + Math.random() * 0.3,
        width: 1 + Math.random() * 3, hue: 260 + Math.random() * 40
      });
    }

    let animationId: number; let time = 0;
    const animate = () => {
      ctx.fillStyle = 'rgba(6, 0, 16, 0.05)'; ctx.fillRect(0, 0, canvas.width, canvas.height);
      time += 0.01;
      lines.forEach((line) => {
        line.x += Math.cos(line.angle + Math.sin(time * line.speed)) * line.speed;
        line.y += Math.sin(line.angle + Math.cos(time * line.speed)) * line.speed;
        if (line.x < -line.length) line.x = canvas.width + line.length;
        if (line.x > canvas.width + line.length) line.x = -line.length;
        if (line.y < -line.length) line.y = canvas.height + line.length;
        if (line.y > canvas.height + line.length) line.y = -line.length;

        const gradient = ctx.createLinearGradient(line.x, line.y,
          line.x + Math.cos(line.angle + time) * line.length,
          line.y + Math.sin(line.angle + time) * line.length
        );
        gradient.addColorStop(0, `hsla(${line.hue}, 80%, 60%, 0)`);
        gradient.addColorStop(0.3, `hsla(${line.hue}, 80%, 60%, ${line.opacity})`);
        gradient.addColorStop(0.7, `hsla(${line.hue}, 80%, 60%, ${line.opacity})`);
        gradient.addColorStop(1, `hsla(${line.hue}, 80%, 60%, 0)`);
        ctx.beginPath(); ctx.strokeStyle = gradient; ctx.lineWidth = line.width; ctx.lineCap = 'round';
        ctx.moveTo(line.x, line.y);
        const cx1 = line.x + Math.cos(line.angle + time) * line.length * 0.3;
        const cy1 = line.y + Math.sin(line.angle + time * 1.2) * line.length * 0.3;
        const cx2 = line.x + Math.cos(line.angle + time * 0.8) * line.length * 0.7;
        const cy2 = line.y + Math.sin(line.angle + time) * line.length * 0.7;
        const endX = line.x + Math.cos(line.angle + time) * line.length;
        const endY = line.y + Math.sin(line.angle + time) * line.length;
        ctx.bezierCurveTo(cx1, cy1, cx2, cy2, endX, endY);
        ctx.stroke();
      });
      animationId = requestAnimationFrame(animate);
    };
    ctx.fillStyle = '#060010'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    animate();

    const handleResize = () => { setCanvasSize(); ctx.fillStyle = '#060010'; ctx.fillRect(0, 0, canvas.width, canvas.height); };
    window.addEventListener('resize', handleResize);
    return () => { cancelAnimationFrame(animationId); window.removeEventListener('resize', handleResize); };
  }, []);

  return (
    <canvas ref={canvasRef} className={`floating-lines-canvas ${className}`}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
    />
  );
};

export default FloatingLines;
