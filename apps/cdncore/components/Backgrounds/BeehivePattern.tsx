'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { getOptimalMoteCount, getOptimalFrameDelay } from '@/utils/mobileOptimizations';
import './BeehivePattern.css';

interface BeehivePatternProps {
  className?: string;
  style?: React.CSSProperties;
  disableAnimation?: boolean;
}

interface Edge {
  x1: number; y1: number; x2: number; y2: number;
}

interface PathPoint {
  edge: Edge; t: number;
}

interface Mote {
  edge: Edge | null; t: number; speed: number; direction: number;
  pulseOffset: number; pathHistory: PathPoint[]; maxTrailSegments: number;
  turnPreference: number; lastTurn: number;
  getPosition(): { x: number; y: number } | null;
  getPositionOnEdge(p: PathPoint): { x: number; y: number } | null;
  checkCollisionPath(targetEdge: Edge, targetDirection: number): boolean;
  update(): void; draw(ctx: CanvasRenderingContext2D): void;
}

const hexRadius = 40;
const hexHeight = hexRadius * 1.732;
const verticalSpacing = hexHeight;
const horizontalSpacing = hexRadius * 1.5;
const darkPurple = { r: 75, g: 40, b: 110 };

export const BeehivePattern: React.FC<BeehivePatternProps> = ({ className = '', style = {}, disableAnimation = false }) => {
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number | null>(null);
  const edgesRef = useRef<Edge[]>([]);
  const motesRef = useRef<Mote[]>([]);
  const dimensionsRef = useRef<{ width: number; height: number; resizeObserver?: ResizeObserver }>({ width: 0, height: 0 });
  const isMobileRef = useRef(false);
  const staticPatternRef = useRef<ImageData | null>(null);
  const isInitializedRef = useRef(false);
  const initTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);
  const pathnameRef = useRef(pathname);
  const lastFrameTimeRef = useRef(0);
  const frameDelayRef = useRef(16);

  useEffect(() => {
    frameDelayRef.current = getOptimalFrameDelay();
    const checkMobile = () => { isMobileRef.current = window.innerWidth <= 768; };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (pathnameRef.current !== pathname) {
      pathnameRef.current = pathname;
      if (animationIdRef.current) { cancelAnimationFrame(animationIdRef.current); animationIdRef.current = null; }
      motesRef.current = []; edgesRef.current = []; staticPatternRef.current = null; isInitializedRef.current = false;
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) { ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.fillStyle = '#1a1a1a'; ctx.fillRect(0, 0, canvas.width, canvas.height); }
      }
    }
  }, [pathname]);

  const collectEdges = useCallback((width: number, height: number): Edge[] => {
    const rows = Math.ceil(height / verticalSpacing) + 2;
    const cols = Math.ceil(width / horizontalSpacing) + 2;
    const edgeMap = new Map<string, Edge>();
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cx = col * horizontalSpacing;
        const cy = row * verticalSpacing + (col % 2) * (verticalSpacing / 2);
        for (let i = 0; i < 6; i++) {
          const a1 = (Math.PI / 3) * i; const a2 = (Math.PI / 3) * ((i + 1) % 6);
          const x1 = cx + hexRadius * Math.cos(a1); const y1 = cy + hexRadius * Math.sin(a1);
          const x2 = cx + hexRadius * Math.cos(a2); const y2 = cy + hexRadius * Math.sin(a2);
          const key = `${Math.round(x1)},${Math.round(y1)}-${Math.round(x2)},${Math.round(y2)}`;
          const rk = `${Math.round(x2)},${Math.round(y2)}-${Math.round(x1)},${Math.round(y1)}`;
          if (!edgeMap.has(key) && !edgeMap.has(rk)) edgeMap.set(key, { x1, y1, x2, y2 });
        }
      }
    }
    return Array.from(edgeMap.values());
  }, []);

  const drawHexagon = useCallback((ctx: CanvasRenderingContext2D, cx: number, cy: number) => {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i;
      const x = cx + hexRadius * Math.cos(a); const y = cy + hexRadius * Math.sin(a);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = `rgba(${darkPurple.r}, ${darkPurple.g}, ${darkPurple.b}, 0.1)`;
    ctx.fill();
    ctx.strokeStyle = `rgba(${darkPurple.r}, ${darkPurple.g}, ${darkPurple.b}, 0.5)`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }, []);

  const drawBeehivePattern = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const rows = Math.ceil(h / verticalSpacing) + 2;
    const cols = Math.ceil(w / horizontalSpacing) + 2;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * horizontalSpacing;
        const y = row * verticalSpacing + (col % 2) * (verticalSpacing / 2);
        drawHexagon(ctx, x, y);
      }
    }
  }, [drawHexagon]);

  const createMote = useCallback((edges: Edge[]): Mote => {
    const mote: Mote = {
      edge: null, t: 0, speed: 0.004 + Math.random() * 0.006,
      direction: Math.random() > 0.5 ? 1 : -1, pulseOffset: Math.random() * Math.PI * 2,
      pathHistory: [], maxTrailSegments: 40, turnPreference: Math.random(), lastTurn: 0,

      getPosition() {
        if (!this.edge) return null;
        const ct = Math.max(0, Math.min(1, this.t));
        return { x: this.edge.x1 + (this.edge.x2 - this.edge.x1) * ct, y: this.edge.y1 + (this.edge.y2 - this.edge.y1) * ct };
      },

      getPositionOnEdge(pp) {
        if (!pp || !pp.edge) return null;
        const ct = Math.max(0, Math.min(1, pp.t));
        return { x: pp.edge.x1 + (pp.edge.x2 - pp.edge.x1) * ct, y: pp.edge.y1 + (pp.edge.y2 - pp.edge.y1) * ct };
      },

      checkCollisionPath(targetEdge, targetDirection) {
        for (const other of motesRef.current) {
          if (other === this) continue;
          if (other.edge === targetEdge) {
            const d = Math.abs(other.t - (targetDirection > 0 ? 0 : 1));
            if (d < 0.3) return true;
          }
          for (let i = Math.max(0, other.pathHistory.length - 10); i < other.pathHistory.length; i++) {
            if (other.pathHistory[i]?.edge === targetEdge) return true;
          }
        }
        return false;
      },

      update() {
        if (!this.edge) return;
        const edges = edgesRef.current;
        if (!edges || edges.length === 0 || !edges.includes(this.edge)) {
          this.edge = edges[Math.floor(Math.random() * edges.length)] || null;
          this.t = Math.random(); this.pathHistory = [];
          if (!this.edge) return;
        }
        this.pathHistory.push({ edge: this.edge, t: this.t });
        if (this.pathHistory.length > this.maxTrailSegments) this.pathHistory.shift();
        this.t += this.speed * this.direction;
        this.lastTurn++;

        if (this.t > 1 || this.t < 0) {
          const endX = this.direction > 0 ? this.edge.x2 : this.edge.x1;
          const endY = this.direction > 0 ? this.edge.y2 : this.edge.y1;
          const tol = 2;
          let connected = edges.filter(e => (e !== this.edge) && (
            (Math.abs(e.x1 - endX) < tol && Math.abs(e.y1 - endY) < tol) ||
            (Math.abs(e.x2 - endX) < tol && Math.abs(e.y2 - endY) < tol)
          ));

          if (connected.length > 0) {
            const safe = connected.filter(ne => {
              const nd = (Math.abs(ne.x1 - endX) < tol && Math.abs(ne.y1 - endY) < tol) ? 1 : -1;
              return !this.checkCollisionPath(ne, nd);
            });
            const choices = safe.length > 0 ? safe : connected;
            const next = choices[Math.floor(Math.random() * choices.length)];
            if (Math.abs(next.x1 - endX) < tol && Math.abs(next.y1 - endY) < tol) {
              this.t = 0; this.direction = 1;
            } else { this.t = 1; this.direction = -1; }
            this.edge = next; this.lastTurn = 0;
          } else {
            this.direction *= -1;
            this.t = this.t > 1 ? 1 : 0;
          }
        }
      },

      draw(ctx) {
        if (!this.edge) return;
        const pos = this.getPosition();
        if (!pos) return;
        const pulse = Math.sin(Date.now() * 0.003 + this.pulseOffset) * 0.15 + 0.85;
        if (this.pathHistory.length > 1) {
          const pts: { x: number; y: number }[] = [];
          const edges = edgesRef.current;
          for (let i = 0; i < this.pathHistory.length; i++) {
            const hi = this.pathHistory[i];
            if (!hi || !hi.edge || !edges.includes(hi.edge)) continue;
            const p = this.getPositionOnEdge(hi);
            if (p) pts.push(p);
          }
          pts.push(pos);
          if (pts.length > 2) {
            ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
            for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${pulse * 0.75})`;
            ctx.lineWidth = 2.2; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
            if (pts.length > 10) {
              ctx.beginPath();
              const si = Math.max(0, pts.length - 20);
              ctx.moveTo(pts[si].x, pts[si].y);
              for (let i = si + 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
              ctx.strokeStyle = `rgba(255, 255, 255, ${pulse * 0.4})`; ctx.lineWidth = 1.2; ctx.stroke();
            }
          }
        }
      }
    };

    if (edges.length > 0) {
      mote.edge = edges[Math.floor(Math.random() * edges.length)];
      mote.t = Math.random();
      for (let j = 0; j < 20; j++) {
        const ht = mote.t - (j * 0.02 * mote.direction);
        if (ht >= 0 && ht <= 1) mote.pathHistory.push({ edge: mote.edge, t: ht });
      }
    }
    return mote;
  }, []);

  const animate = useCallback(() => {
    if (!isMountedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { width, height } = dimensionsRef.current;
    if (width === 0 || height === 0) return;

    const now = performance.now();
    if (now - lastFrameTimeRef.current < frameDelayRef.current) {
      animationIdRef.current = requestAnimationFrame(animate);
      return;
    }
    lastFrameTimeRef.current = now;

    if (staticPatternRef.current) {
      ctx.putImageData(staticPatternRef.current, 0, 0);
    } else {
      ctx.fillStyle = '#1a1a1a'; ctx.fillRect(0, 0, width, height);
      drawBeehivePattern(ctx, width, height);
    }

    ctx.save();
    const motes = motesRef.current;
    for (let i = 0; i < motes.length; i++) motes[i].update();
    for (let i = 0; i < motes.length; i++) motes[i].draw(ctx);
    ctx.restore();

    if (isMountedRef.current) animationIdRef.current = requestAnimationFrame(animate);
  }, [drawBeehivePattern]);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let ow = dimensionsRef.current.width; let oh = dimensionsRef.current.height;
    if (ow === 0 || oh === 0) {
      const r = canvas.getBoundingClientRect(); ow = r.width; oh = r.height;
      dimensionsRef.current = { width: ow, height: oh };
    }
    if (ow === 0 || oh === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (animationIdRef.current) { cancelAnimationFrame(animationIdRef.current); animationIdRef.current = null; }

    if (!dimensionsRef.current.resizeObserver) {
      const ro = new ResizeObserver((entries) => {
        for (const e of entries) { dimensionsRef.current.width = e.contentRect.width; dimensionsRef.current.height = e.contentRect.height; }
      });
      ro.observe(canvas);
      dimensionsRef.current.resizeObserver = ro;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    motesRef.current = []; edgesRef.current = []; staticPatternRef.current = null;
    canvas.width = 0; canvas.height = 0;
    const width = canvas.width = ow; const height = canvas.height = oh;
    dimensionsRef.current = { ...dimensionsRef.current, width, height };

    const edges = collectEdges(width, height);
    edgesRef.current = edges;

    ctx.fillStyle = '#1a1a1a'; ctx.fillRect(0, 0, width, height);
    drawBeehivePattern(ctx, width, height);
    staticPatternRef.current = ctx.getImageData(0, 0, width, height);

    const moteCount = disableAnimation ? 0 : getOptimalMoteCount();
    if (moteCount === 0) return;

    const motes: Mote[] = [];
    const rX = 5; const rY = 4;
    const rW = width / rX; const rH = height / rY;

    for (let i = 0; i < moteCount; i++) {
      const rx = i % rX; const ry = Math.floor(i / rX) % rY;
      const rcx = (rx + 0.5) * rW; const rcy = (ry + 0.5) * rH;
      const ne = edges.filter(e => {
        const ecx = (e.x1 + e.x2) / 2; const ecy = (e.y1 + e.y2) / 2;
        return Math.abs(ecx - rcx) < rW && Math.abs(ecy - rcy) < rH;
      });
      if (ne.length > 0) {
        const m = createMote(ne);
        m.edge = ne[Math.floor(Math.random() * ne.length)]; m.t = Math.random();
        motes.push(m);
      } else {
        const m = createMote(edges);
        if (edges.length > 0) { m.edge = edges[Math.floor(Math.random() * edges.length)]; m.t = Math.random(); }
        motes.push(m);
      }
    }
    motesRef.current = motes;
    if (!disableAnimation) animate();
  }, [collectEdges, createMote, disableAnimation, animate, drawBeehivePattern]);

  useEffect(() => {
    isMountedRef.current = true;
    isInitializedRef.current = false;

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) { ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.fillStyle = '#1a1a1a'; ctx.fillRect(0, 0, canvas.width, canvas.height); }
    }

    const deferredInit = () => {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(() => { if (!isInitializedRef.current && isMountedRef.current) { init(); isInitializedRef.current = true; } }, { timeout: 150 });
      } else {
        initTimeoutRef.current = setTimeout(() => { if (!isInitializedRef.current && isMountedRef.current) { init(); isInitializedRef.current = true; } }, 100);
      }
    };
    deferredInit();

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!isMountedRef.current) return;
        const c = canvasRef.current; if (!c) return;
        const nw = c.offsetWidth; const nh = c.offsetHeight;
        const { width, height } = dimensionsRef.current;
        if (Math.abs(nw - width) > 50 || Math.abs(nh - height) > 50) init();
      }, 250);
    };
    window.addEventListener('resize', handleResize);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationIdRef.current) { cancelAnimationFrame(animationIdRef.current); animationIdRef.current = null; }
      } else if (isMountedRef.current && isInitializedRef.current) { animate(); }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const canvasNode = canvasRef.current;
    return () => {
      isMountedRef.current = false;
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(resizeTimeout);
      if (initTimeoutRef.current) { clearTimeout(initTimeoutRef.current); initTimeoutRef.current = null; }
      if (animationIdRef.current) { cancelAnimationFrame(animationIdRef.current); animationIdRef.current = null; }
      if (canvasNode) { const ctx = canvasNode.getContext('2d'); if (ctx) { ctx.clearRect(0, 0, canvasNode.width, canvasNode.height); canvasNode.width = 0; canvasNode.height = 0; } }
      motesRef.current = []; edgesRef.current = []; staticPatternRef.current = null; isInitializedRef.current = false;
      if (dimensionsRef.current.resizeObserver) dimensionsRef.current.resizeObserver.disconnect();
      dimensionsRef.current = { width: 0, height: 0 };
    };
  }, [init, animate]);

  return (
    <canvas
      ref={canvasRef}
      className={`beehive-pattern ${className}`}
      style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        zIndex: 0, backgroundColor: '#1a1a1a', opacity: 1, transition: 'opacity 0.3s ease-in', ...style
      }}
    />
  );
};

export default React.memo(BeehivePattern);
