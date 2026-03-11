'use client';

import { useEffect, useRef, useState } from 'react';

interface PerformanceMetrics {
  fps: number;
  avgFps: number;
  lowFps: boolean;
}

class PerformanceMonitor {
  private frameCount = 0;
  private lastTime = 0;
  private fps = 60;
  private fpsHistory: number[] = [];
  private rafId: number | null = null;

  start() {
    this.lastTime = performance.now();
    this.tick();
  }

  stop() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  private tick = () => {
    this.frameCount++;
    const now = performance.now();
    const delta = now - this.lastTime;

    if (delta >= 1000) {
      this.fps = Math.round((this.frameCount * 1000) / delta);
      this.fpsHistory.push(this.fps);
      if (this.fpsHistory.length > 60) this.fpsHistory.shift();
      this.frameCount = 0;
      this.lastTime = now;
    }

    this.rafId = requestAnimationFrame(this.tick);
  };

  getMetrics(): PerformanceMetrics {
    const avgFps = this.fpsHistory.length > 0
      ? Math.round(this.fpsHistory.reduce((a, b) => a + b, 0) / this.fpsHistory.length)
      : 60;

    return {
      fps: this.fps,
      avgFps,
      lowFps: avgFps < 30
    };
  }
}

const globalMonitor = typeof window !== 'undefined' ? new PerformanceMonitor() : null;

export function usePerformanceMonitoring(_componentName?: string): PerformanceMetrics {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({ fps: 60, avgFps: 60, lowFps: false });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!globalMonitor) return;

    globalMonitor.start();

    intervalRef.current = setInterval(() => {
      setMetrics(globalMonitor.getMetrics());
    }, 2000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return metrics;
}

export function getOptimalAnimationSettings() {
  const metrics = globalMonitor?.getMetrics();
  const lowPerf = metrics?.lowFps ?? false;

  return {
    enableParticles: !lowPerf,
    enableBlur: !lowPerf,
    enableShadows: !lowPerf,
    reducedMotion: lowPerf
  };
}
