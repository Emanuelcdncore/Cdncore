"use client";

import { useEffect, useRef } from "react";

const ANIM_CSS = `
  .lori-wm-root { display:inline-block; width:100%; line-height:0; }
  .lori-wm-root svg { width:100%; height:auto; overflow:visible; display:block; }

  .lori-wm-root .lw {
    opacity: 0;
    transform-box: fill-box;
    transform-origin: center;
    transform: translateY(8px) scale(.94);
    animation: loriWmRise 700ms cubic-bezier(.2,.7,.2,1) forwards;
  }
  .lori-wm-root .lp {
    opacity: 0;
    transform-box: fill-box;
    transform-origin: center;
    transform: scale(.86);
    animation: loriWmAssemble 720ms cubic-bezier(.2,.7,.2,1) forwards;
  }

  @keyframes loriWmRise {
    0%   { opacity: 0; transform: translateY(8px) scale(.94); }
    60%  { opacity: 1; }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes loriWmAssemble {
    0%   { opacity: 0; transform: scale(.86); }
    60%  { opacity: 1; }
    100% { opacity: 1; transform: scale(1); }
  }

  /* Letter stagger (fall-delay 350ms + fall-dur 1100ms = 1450ms base) */
  .lori-wm-root .lw-L1 { animation-delay: 1510ms; }
  .lori-wm-root .lw-L2 { animation-delay: 1510ms; }
  .lori-wm-root .lw-o  { animation-delay: 1590ms; }
  .lori-wm-root .lw-r  { animation-delay: 1670ms; }
  .lori-wm-root .lw-i  { animation-delay: 1750ms; }
  .lori-wm-root .lw-id { animation-delay: 1830ms; }
  .lori-wm-root .lw-t  { animation-delay: 1650ms; }
  .lori-wm-root .lw-a  { animation-delay: 1730ms; }
  .lori-wm-root .lw-lk { animation-delay: 1810ms; }
  .lori-wm-root .lw-k  { animation-delay: 1890ms; }

  /* Parrot piece stagger */
  .lori-wm-root .lp-1 { animation-delay: 1530ms; }
  .lori-wm-root .lp-2 { animation-delay: 1630ms; }
  .lori-wm-root .lp-3 { animation-delay: 1710ms; }
  .lori-wm-root .lp-4 { animation-delay: 1770ms; }
  .lori-wm-root .lp-5 { animation-delay: 1850ms; }
  .lori-wm-root .lp-6 { animation-delay: 1930ms; }
  .lori-wm-root .lp-7 { animation-delay: 2010ms; }
  .lori-wm-root .lp-r { animation-delay: 2150ms; }

  /* Falling iris — fill-mode:both so 0% keyframe hides it off-screen during delay */
  .lori-wm-root .lori-iris-el {
    transform-box: fill-box;
    transform-origin: center;
    animation:
      loriWmFall   1100ms cubic-bezier(.55,.05,.85,.4) 350ms  both,
      loriWmSquash  280ms cubic-bezier(.2,.8,.3,1)     1450ms forwards;
  }
  @keyframes loriWmFall {
    0%   { transform: translateY(-520px); opacity: 1; }
    85%  { transform: translateY(4px);    opacity: 1; }
    100% { transform: translateY(0);      opacity: 1; }
  }
  @keyframes loriWmSquash {
    0%   { transform: translateY(0)    scaleX(1)    scaleY(1);    }
    30%  { transform: translateY(1px)  scaleX(1.18) scaleY(.84);  }
    70%  { transform: translateY(-1px) scaleX(.96)  scaleY(1.04); }
    100% { transform: translateY(0)    scaleX(1)    scaleY(1);    }
  }

  /* Pupil */
  .lori-wm-root .lori-pupil-el {
    opacity: 0;
    transform-box: fill-box; transform-origin: center;
    transform: scale(0);
    animation: loriWmPop 420ms cubic-bezier(.2,.9,.3,1.4) 1770ms forwards;
  }
  @keyframes loriWmPop {
    0%   { opacity: 0; transform: scale(0);    }
    60%  { opacity: 1; transform: scale(1.25); }
    100% { opacity: 1; transform: scale(1);    }
  }

  /* Impact ring */
  .lori-wm-root .lori-impact-el {
    fill: none; stroke: #000; stroke-width: .6;
    opacity: 0;
    transform-box: fill-box; transform-origin: center;
    animation: loriWmImpact 700ms cubic-bezier(.2,.8,.2,1) 1410ms forwards;
  }
  @keyframes loriWmImpact {
    0%   { opacity: .55; transform: scale(.4);  stroke-width: .8; }
    100% { opacity: 0;   transform: scale(2.6); stroke-width: .1; }
  }

  @media (prefers-reduced-motion: reduce) {
    .lori-wm-root .lw,
    .lori-wm-root .lp,
    .lori-wm-root .lori-iris-el,
    .lori-wm-root .lori-pupil-el,
    .lori-wm-root .lori-impact-el {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  }
`;

export default function LoriAnimLogo({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const injected = useRef(false);

  useEffect(() => {
    if (injected.current || document.getElementById("lori-wm-styles")) return;
    injected.current = true;
    const el = document.createElement("style");
    el.id = "lori-wm-styles";
    el.textContent = ANIM_CSS;
    document.head.appendChild(el);
  }, []);

  return (
    <div
      className={`lori-wm-root${className ? ` ${className}` : ""}`}
      aria-label="Loritalk logo"
      style={style}
    >
      <svg viewBox="0 0 385.1 179.98" xmlns="http://www.w3.org/2000/svg" role="img">

        {/* ── Letters ── */}
        <path className="lw lw-L1" fill="#000000" d="M0,82.84V0H18.3V82.84Z"/>
        <path className="lw lw-L2" fill="#000000" d="M0,142H119.76v18.3H0Z"/>
        <path className="lw lw-o"  fill="#000000" d="M90.29,55.33a29.59,29.59,0,0,1-2.41,12.11,27.13,27.13,0,0,1-6.58,9.21,30.19,30.19,0,0,1-9.64,5.86,33.92,33.92,0,0,1-23.39,0,29.39,29.39,0,0,1-9.65-5.86,27.53,27.53,0,0,1-6.52-9.21,29.59,29.59,0,0,1-2.41-12.11,29.23,29.23,0,0,1,2.41-12,27,27,0,0,1,6.52-9.09,28.36,28.36,0,0,1,9.65-5.7,35.7,35.7,0,0,1,23.39,0,29.1,29.1,0,0,1,9.64,5.7,26.65,26.65,0,0,1,6.58,9.09A29.23,29.23,0,0,1,90.29,55.33ZM73,55.33a15.74,15.74,0,0,0-.87-5.15,13.81,13.81,0,0,0-2.52-4.43,12.94,12.94,0,0,0-4.06-3.13,13.6,13.6,0,0,0-11.17,0,12.15,12.15,0,0,0-4,3.13,13.2,13.2,0,0,0-2.41,4.43,16.39,16.39,0,0,0,0,10.3A13.94,13.94,0,0,0,50.4,65a12.5,12.5,0,0,0,19.29,0,14.13,14.13,0,0,0,2.46-4.55A16.37,16.37,0,0,0,73,55.33Z"/>
        <path className="lw lw-r"  fill="#000000" d="M137.07,43.06a14.65,14.65,0,0,0-2.35-.44c-.77-.07-1.52-.11-2.25-.11a12.74,12.74,0,0,0-6.08,1.32,12.41,12.41,0,0,0-4,3.17,12,12,0,0,0-2.13,4,13.43,13.43,0,0,0-.66,3.82v28h-18V28.33H119v7.89h.22a17.86,17.86,0,0,1,5.92-6.84A15.26,15.26,0,0,1,134,26.74a18.69,18.69,0,0,1,2.14.11,8.6,8.6,0,0,1,1.7.32Z"/>
        <path className="lw lw-i"  fill="#000000" d="M163.2,28.26,145.3,46.17V82.84h17.95V28.26Z"/>
        <path className="lw lw-id" fill="#000000" d="M163.88,9.48a9.06,9.06,0,0,1-.79,3.74,9.86,9.86,0,0,1-2.11,3,9.74,9.74,0,0,1-3.16,2A10.29,10.29,0,0,1,154,19a9.66,9.66,0,0,1-7.06-2.8,9,9,0,0,1-2.84-6.68,9.08,9.08,0,0,1,.74-3.64,8.76,8.76,0,0,1,2.1-3,11.54,11.54,0,0,1,3.16-2A9.47,9.47,0,0,1,154,0a10.29,10.29,0,0,1,3.84.74,9.74,9.74,0,0,1,3.16,2,9.62,9.62,0,0,1,2.11,3A9,9,0,0,1,163.88,9.48Z"/>
        <path className="lw lw-t"  fill="#000000" d="M176.05,137.47V124.09H163.23V105.21l-17.54,17.61v37.72a29.74,29.74,0,0,0,1,8,15.24,15.24,0,0,0,3.23,6.15,14.32,14.32,0,0,0,6,4A27,27,0,0,0,165.1,180a33.13,33.13,0,0,0,5.69-.49,29.42,29.42,0,0,0,4.71-1.16l-.21-13.13a10,10,0,0,1-2.48.64,17.29,17.29,0,0,1-2.79.23c-2.56,0-4.32-.65-5.32-1.93s-1.47-3.2-1.47-5.77v-20.9Z"/>
        <path className="lw lw-a"  fill="#000000" d="M188,131.55a31.37,31.37,0,0,1,11.23-6.9,38.33,38.33,0,0,1,13.09-2.3,34.74,34.74,0,0,1,11.67,1.7,17.37,17.37,0,0,1,7.73,5.25,22.59,22.59,0,0,1,4.33,9,53.27,53.27,0,0,1,1.37,12.87v27.51H221v-5.81h-.33a13.56,13.56,0,0,1-6.3,5.26,22.41,22.41,0,0,1-9.15,1.86,27.71,27.71,0,0,1-6.79-.88,19.81,19.81,0,0,1-6.41-2.84,15.54,15.54,0,0,1-4.77-5.26,16.27,16.27,0,0,1-1.86-8.11,13.77,13.77,0,0,1,3.23-9.53,21.08,21.08,0,0,1,8.33-5.59,44,44,0,0,1,11.34-2.63,115.71,115.71,0,0,1,12.16-.66v-.88a6.69,6.69,0,0,0-2.85-6,12.24,12.24,0,0,0-7-1.91,17.34,17.34,0,0,0-7.39,1.64,23.5,23.5,0,0,0-6.09,3.94Zm33,23.34h-2.3q-3,0-6,.27a25.08,25.08,0,0,0-5.37,1,10,10,0,0,0-3.89,2.25,5.17,5.17,0,0,0-1.53,3.89,4.68,4.68,0,0,0,.71,2.63,5.41,5.41,0,0,0,1.81,1.75,7.49,7.49,0,0,0,2.52.93,13.85,13.85,0,0,0,2.74.28q5.48,0,8.38-3a11.26,11.26,0,0,0,2.9-8.16Z"/>
        <path className="lw lw-lk" fill="#000000" d="M249.4,178.67V95.83h18.3v82.84Z"/>
        <path className="lw lw-k"  fill="#000000" d="M337.78,178.67H315.53l-17.86-26.19h-.33v26.19H279.26V95.83h18.08v50.4h.33l17.42-22.13H336.9l-21,24.65Z"/>

        {/* ── Parrot ── */}
        <path className="lp lp-1" fill="transparent" d="M284.62,25.56l-1.7-1.7c-5.42-5.86-11.55-9.22-19.67-9.22a25.71,25.71,0,0,0-25.73,25.73h0V82.84l26.1-26.09,26.08-26.09v0ZM260.9,42.21a7.85,7.85,0,1,1,7.85-7.85A7.85,7.85,0,0,1,260.9,42.21Z"/>
        <path className="lp lp-2" fill="#5d92e8" d="M301.47,18.87,289.7,30.64l-5.08-5.08-1.7-1.7c-5.42-5.86-11.55-9.22-19.67-9.22A25.74,25.74,0,0,0,238.9,32L227.64,20.78c2.05-2.58,3.9-4.94,5.43-6.54A47.47,47.47,0,0,1,252.73,2a51.39,51.39,0,0,1,13.14-2A42.94,42.94,0,0,1,301.47,18.87Z"/>
        <path className="lp lp-3" fill="#2267b2" d="M308.87,43a44.25,44.25,0,0,1-.46,6.35L289.7,30.65l11.77-11.77A42.66,42.66,0,0,1,308.87,43Z"/>
        <path className="lp lp-4" fill="#94bf5c" d="M238.9,32a25.8,25.8,0,0,0-1.38,8.33h0V82.84H188c25.42-40.64,26.27-43,39.65-62.06Z"/>
        <path className="lp lp-5" fill="#ff6903" d="M308.41,49.34c0,.29-.09.59-.14.87s-.06.37-.1.55,0,.05,0,.07c-.06.32-.12.64-.19,1a.07.07,0,0,1,0,.05c-.07.35-.15.68-.23,1-.11.49-.24,1-.37,1.46s-.2.73-.31,1.09l-.27.86a.42.42,0,0,1,0,.06c0,.14-.09.28-.14.42s-.18.53-.28.79q-.27.8-.6,1.56c-.11.29-.23.58-.35.86-.31.73-.64,1.44-1,2.15l-.24.48c0,.09-.09.19-.14.27-.16.31-.32.6-.48.9-.27.48-.54,1-.83,1.43-.11.18-.22.37-.34.55l-.37.58-.38.58-.62.9-.28.39-.3.4c-.13.19-.27.38-.42.56l-.38.48c-.47.6-.95,1.19-1.47,1.76-.19.23-.39.46-.6.68l-.69.73c-.14.15-.27.29-.41.42l-.72.71c-.25.25-.51.48-.76.72-.61.56-1.23,1.1-1.87,1.62l-.85.68-1.1.83-.88.62c-.32.22-.17.13-.49.34s-.91.59-1.13.72a33.7,33.7,0,0,0,1.05-48.8v0Z"/>
        <path className="lp lp-6" fill="#ff9852" d="M299.63,54.56a33.61,33.61,0,0,1-11,24.9l0,0c-.25.17-.51.32-.78.48s-.41.25-.63.37L263.61,56.75l26.08-26.09A33.59,33.59,0,0,1,299.63,54.56Z"/>
        <path className="lp lp-7" fill="#e54013" d="M287.19,80.33c-.61.35-1.24.69-1.88,1-.26.13-.53.27-.8.39-.81.39-1.63.76-2.46,1.1H237.51l26.1-26.09Z"/>

        {/* Impact ring */}
        <circle className="lori-impact-el" cx="260.9" cy="34.36" r="7.85"/>

        {/* Iris — opacity="0" hides it before JS runs; animation overrides via fill-mode:both */}
        <path className="lori-iris-el" fill="#000000" opacity="0" d="M268.75,34.36a7.85,7.85,0,1,1-7.85-7.85A7.86,7.86,0,0,1,268.75,34.36Z"/>

        {/* Pupil */}
        <circle className="lori-pupil-el" fill="#ffffff" cx="264.4" cy="34.36" r="2.16"/>

        {/* ® — smaller, next to the k */}
        <g transform="translate(239.55 165.665) scale(0.3)">
          <path className="lp lp-r" fill="#000000" d="M360.78,48A23.53,23.53,0,0,1,360.91.9,23.53,23.53,0,1,1,360.78,48Zm.13-44.72A21,21,0,0,0,339.79,24.5a21.06,21.06,0,1,0,42.12-.13A20.82,20.82,0,0,0,360.91,3.24Zm5.2,23.53,6.63,9.3h-5.59l-6-8.52H356v8.52h-4.68V11.43h11c5.72,0,9.49,2.93,9.49,7.87A7.34,7.34,0,0,1,366.11,26.77Zm-4-11.11H356v7.8h6.11c3.05,0,4.87-1.5,4.87-3.9S365.2,15.66,362.15,15.66Z"/>
        </g>
      </svg>
    </div>
  );
}
