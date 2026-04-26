"use client";

import { useEffect, useRef } from "react";

const EASE = 0.013;
const DAMPING = 0.92;
const MAX_DELAY_MS = 4500;
const MIN_FLY_MS = 9000;
const LOGO_W = 560;

interface Particle {
  x: number; y: number;
  tx: number; ty: number;
  vx: number; vy: number;
  r: number; g: number; b: number;
  size: number;
  delay: number;
}

export default function ParticleIntro({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let rafId: number;
    let cancelled = false;

    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, W, H);

    async function run() {
      await document.fonts.ready;
      if (cancelled) return;

      // Load full Loritalk logo (SVG)
      const img = new Image();
      img.src = `${process.env.BASE_PATH || ""}/logo-loritalk.svg`;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load logo"));
      });
      if (cancelled) return;

      const LOGO_H = Math.round(LOGO_W * (img.naturalHeight / img.naturalWidth));

      // Draw logo on offscreen canvas
      const off = document.createElement("canvas");
      off.width = LOGO_W;
      off.height = LOGO_H;
      const oc = off.getContext("2d")!;
      oc.drawImage(img, 0, 0, LOGO_W, LOGO_H);

      // Sample colored pixels — uniform 2px grid
      const imgData = oc.getImageData(0, 0, LOGO_W, LOGO_H).data;
      const candidates: Array<{ lx: number; ly: number; r: number; g: number; b: number }> = [];

      for (let ly = 0; ly < LOGO_H; ly += 2) {
        for (let lx = 0; lx < LOGO_W; lx += 2) {
          const i = (ly * LOGO_W + lx) * 4;
          const pr = imgData[i], pg = imgData[i + 1], pb = imgData[i + 2], pa = imgData[i + 3];
          if (pa < 128) continue;
          if (pr > 235 && pg > 235 && pb > 235) continue;
          candidates.push({ lx, ly, r: pr, g: pg, b: pb });
        }
      }

      console.log(`[ParticleIntro] candidates=${candidates.length} logoH=${LOGO_H}`);
      if (cancelled) return;

      // Logo centered on screen
      const logoLeft = Math.round(W / 2 - LOGO_W / 2);
      const logoTop = Math.max(20, Math.round(H / 2 - LOGO_H / 2));

      const particles: Particle[] = candidates.map((c) => ({
        x: Math.random() * W,
        y: Math.random() * H,
        tx: logoLeft + c.lx,
        ty: logoTop + c.ly,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        r: c.r, g: c.g, b: c.b,
        size: 0.55 + Math.random() * 0.4,
        delay: Math.random() * MAX_DELAY_MS,
      }));

      console.log(`[ParticleIntro] particles=${particles.length}`);

      // Animation
      let startMs: number | null = null;
      let phase: "fly" | "hold" | "out" = "fly";
      let holdStart = 0;
      let fadeAlpha = 1;

      function frame(now: number) {
        if (cancelled) return;
        if (!startMs) startMs = now;
        const t = now - startMs;

        if (phase === "fly") {
          ctx.fillStyle = "rgba(255,255,255,0.12)";
          ctx.fillRect(0, 0, W, H);

          let settled = 0;
          for (const p of particles) {
            if (t > p.delay) {
              const dx = p.tx - p.x;
              const dy = p.ty - p.y;
              p.vx = (p.vx + dx * EASE) * DAMPING;
              p.vy = (p.vy + dy * EASE) * DAMPING;
              p.x += p.vx;
              p.y += p.vy;
              if (Math.abs(dx) < 2 && Math.abs(dy) < 2) settled++;
            }
            ctx.fillStyle = `rgb(${p.r},${p.g},${p.b})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          }

          if (t > MIN_FLY_MS && settled > particles.length * 0.90) {
            console.log(`[ParticleIntro] settled! t=${t.toFixed(0)}ms settled=${settled}/${particles.length}`);
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, W, H);
            for (const p of particles) {
              ctx.fillStyle = `rgb(${p.r},${p.g},${p.b})`;
              ctx.beginPath();
              ctx.arc(p.tx, p.ty, p.size, 0, Math.PI * 2);
              ctx.fill();
            }
            phase = "hold";
            holdStart = now;
          }
        } else if (phase === "hold") {
          if (now - holdStart > 1200) phase = "out";
        } else if (phase === "out") {
          fadeAlpha -= 0.016;
          canvas!.style.opacity = String(Math.max(0, fadeAlpha));
          if (fadeAlpha <= 0) {
            if (!doneRef.current) {
              doneRef.current = true;
              onComplete();
            }
            return;
          }
        }

        rafId = requestAnimationFrame(frame);
      }

      rafId = requestAnimationFrame(frame);
    }

    run();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "white",
        touchAction: "none",
      }}
    />
  );
}
