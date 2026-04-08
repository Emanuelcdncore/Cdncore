"use client";

import { useEffect, useRef, useState } from "react";
import LoriLogo from "./icons/LoriLogo";

const EASE = 0.018;
const DAMPING = 0.9;
const MAX_DELAY_MS = 2500;
const MIN_FLY_MS = 5000;
const FONT_SIZE = 36;
const BIRD_W = 140;
const GRID = 2;

interface Particle {
  x: number; y: number;
  tx: number; ty: number;
  vx: number; vy: number;
  r: number; g: number; b: number;
  size: number;
  delay: number;
}

export default function HeroParticleLogo({ logoSize = 40 }: { logoSize?: number }) {
  const placeholderRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    const canvas = canvasRef.current;
    const placeholder = placeholderRef.current;
    if (!canvas || !placeholder) return;

    let rafId: number;
    let cancelled = false;

    async function run() {
      await document.fonts.ready;
      if (cancelled) return;

      // Load the bird image
      const img = new Image();
      img.src = `${process.env.BASE_PATH || ""}/logo-bird.png`;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load logo"));
      });
      if (cancelled) return;

      const birdH = Math.round(BIRD_W * (img.naturalHeight / img.naturalWidth));

      // Stacked logo layout: "lori" + bird + "_talk"
      const textH = FONT_SIZE;
      const gap = 8;
      const logoW = Math.max(BIRD_W, FONT_SIZE * 3);
      const logoH = textH + gap + birdH + gap + textH;

      // Full viewport canvas
      const VW = window.innerWidth;
      const VH = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = VW * dpr;
      canvas!.height = VH * dpr;
      canvas!.style.width = `${VW}px`;
      canvas!.style.height = `${VH}px`;
      const ctx = canvas!.getContext("2d")!;
      ctx.scale(dpr, dpr);

      // Draw solid logo on offscreen canvas
      const off = document.createElement("canvas");
      off.width = logoW;
      off.height = logoH;
      const oc = off.getContext("2d")!;

      oc.fillStyle = "#111111";
      oc.font = `700 ${FONT_SIZE}px "Readex Pro", sans-serif`;
      oc.textAlign = "center";
      oc.textBaseline = "top";
      oc.fillText("lori", logoW / 2, 0);

      const birdX = Math.round((logoW - BIRD_W) / 2);
      const birdY = textH + gap;
      oc.drawImage(img, birdX, birdY, BIRD_W, birdH);

      oc.fillStyle = "#111111";
      oc.font = `700 ${FONT_SIZE}px "Readex Pro", sans-serif`;
      oc.textAlign = "center";
      oc.textBaseline = "top";
      oc.fillText("_talk", logoW / 2, birdY + birdH + gap);

      // Sample pixels for particles
      const imgData = oc.getImageData(0, 0, logoW, logoH).data;
      const candidates: Array<{ lx: number; ly: number; r: number; g: number; b: number }> = [];

      for (let ly = 0; ly < logoH; ly += GRID) {
        for (let lx = 0; lx < logoW; lx += GRID) {
          const i = (ly * logoW + lx) * 4;
          const pr = imgData[i], pg = imgData[i + 1], pb = imgData[i + 2], pa = imgData[i + 3];
          if (pa < 128) continue;
          if (pr > 235 && pg > 235 && pb > 235) continue;
          candidates.push({ lx, ly, r: pr, g: pg, b: pb });
        }
      }

      if (cancelled) return;

      // Target: center the logo where the placeholder div is
      const rect = placeholder!.getBoundingClientRect();
      const targetX = rect.left + rect.width / 2 - logoW / 2;
      const targetY = rect.top + rect.height / 2 - logoH / 2;

      // Particles start from random positions across the full viewport
      const particles: Particle[] = candidates.map((c) => ({
        x: Math.random() * VW,
        y: Math.random() * VH,
        tx: targetX + c.lx,
        ty: targetY + c.ly,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.5) * 12,
        r: c.r, g: c.g, b: c.b,
        size: 0.6 + Math.random() * 0.4,
        delay: Math.random() * MAX_DELAY_MS,
      }));

      // Animation
      let startMs: number | null = null;
      let phase: "fly" | "solidify" | "hold" | "out" = "fly";
      let phaseStart = 0;

      function frame(now: number) {
        if (cancelled) return;
        if (!startMs) startMs = now;
        const t = now - startMs;

        if (phase === "fly") {
          ctx.clearRect(0, 0, VW, VH);

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

          if (t > MIN_FLY_MS && settled > particles.length * 0.9) {
            phase = "solidify";
            phaseStart = now;
          }
        } else if (phase === "solidify") {
          // Crossfade from particles to solid logo over 600ms
          const progress = Math.min(1, (now - phaseStart) / 600);

          ctx.clearRect(0, 0, VW, VH);

          // Draw particles fading out
          if (progress < 1) {
            ctx.globalAlpha = 1 - progress;
            for (const p of particles) {
              ctx.fillStyle = `rgb(${p.r},${p.g},${p.b})`;
              ctx.beginPath();
              ctx.arc(p.tx, p.ty, p.size, 0, Math.PI * 2);
              ctx.fill();
            }
          }

          // Draw solid logo fading in
          ctx.globalAlpha = progress;
          ctx.drawImage(off, targetX, targetY);
          ctx.globalAlpha = 1;

          if (progress >= 1) {
            phase = "hold";
            phaseStart = now;
          }
        } else if (phase === "hold") {
          if (now - phaseStart > 800) {
            phase = "out";
            phaseStart = now;
          }
        } else if (phase === "out") {
          const progress = Math.min(1, (now - phaseStart) / 400);
          canvas!.style.opacity = String(1 - progress);
          if (progress >= 1) {
            setDone(true);
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
  }, [done]);

  if (done) {
    return <LoriLogo variant="stacked" size={logoSize} />;
  }

  return (
    <>
      {/* Placeholder reserves space in the hero layout */}
      <div ref={placeholderRef} style={{ width: 160, height: 220 }} />
      {/* Fullscreen canvas for particles flying from across the page */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 50,
          pointerEvents: "none",
        }}
      />
    </>
  );
}
