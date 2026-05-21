"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function SmoothScroller({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // useLayoutEffect fires synchronously before any child useEffect,
  // so ScrollSmoother and its pinType default are set before Differentiator
  // (or any other component) creates its pinned ScrollTriggers.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollSmoother.create({
        wrapper: wrapperRef.current!,
        content: contentRef.current!,
        smooth: 1.4,
        effects: true,
        normalizeScroll: true,
      });
      // ScrollSmoother uses CSS transforms on #smooth-content, so all pinned
      // ScrollTriggers must use transform-based pinning instead of position:fixed.
      ScrollTrigger.defaults({ pinType: "transform" });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
