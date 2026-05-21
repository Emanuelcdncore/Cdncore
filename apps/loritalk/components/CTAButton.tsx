"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export default function CTAButton({ href, children, onClick, ...rest }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const hashMatch = href.match(/#([^?#]+)/);
    if (hashMatch) {
      const hash = "#" + hashMatch[1];
      const smoother = ScrollSmoother.get();
      if (smoother) {
        e.preventDefault();
        window.history.pushState(null, "", hash);
        smoother.scrollTo(hash, true, "top top+=72");
      }
    }
    onClick?.(e);
  }

  useEffect(() => {
    const btn = ref.current;
    if (!btn) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    const tl = gsap.timeline({ paused: true }).to(btn, {
      scale: 1.05,
      duration: 1.2,
      ease: "elastic.out(1.4, 0.4)",
      easeReverse: "power2.out",
    });

    const onEnter = () => tl.timeScale(1).play();
    const onLeave = () => tl.timeScale(2.5).reverse();

    btn.addEventListener("mouseenter", onEnter);
    btn.addEventListener("mouseleave", onLeave);

    return () => {
      tl.kill();
      btn.removeEventListener("mouseenter", onEnter);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <a ref={ref} href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
