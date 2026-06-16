import type { Variants } from "framer-motion";

function isMobileViewport(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 768px)').matches;
}

export function getMobileOptimizedStaggerContainer(): Variants {
  const mobile = isMobileViewport();
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: mobile ? 0 : 0.15,
        delayChildren: mobile ? 0 : 0.1
      }
    }
  };
}

export function getMobileOptimizedStaggerItem(): Variants {
  const mobile = isMobileViewport();
  return {
    hidden: { opacity: mobile ? 1 : 0, y: mobile ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: mobile ? 0 : 0.5, ease: "easeOut" }
    }
  };
}

export function getMobileOptimizedFadeInUp(): Variants {
  const mobile = isMobileViewport();
  return {
    hidden: { opacity: mobile ? 1 : 0, y: mobile ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: mobile ? 0 : 0.6, ease: "easeOut" }
    }
  };
}

export function getMobileOptimizedScaleIn(): Variants {
  const mobile = isMobileViewport();
  return {
    hidden: { opacity: mobile ? 1 : 0, scale: mobile ? 1 : 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: mobile ? 0 : 0.6, ease: "easeOut" }
    }
  };
}
