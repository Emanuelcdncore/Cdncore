import type { Variants } from "framer-motion";

const isMobile = typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)').matches : false;

export const mobileOptimizedStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: isMobile ? 0 : 0.15,
      delayChildren: isMobile ? 0 : 0.1
    }
  }
};

export const mobileOptimizedStaggerItem: Variants = {
  hidden: { opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: isMobile ? 0 : 0.5, ease: "easeOut" }
  }
};

export const mobileOptimizedFadeInUp: Variants = {
  hidden: { opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: isMobile ? 0 : 0.6, ease: "easeOut" }
  }
};

export const mobileOptimizedScaleIn: Variants = {
  hidden: { opacity: isMobile ? 1 : 0, scale: isMobile ? 1 : 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: isMobile ? 0 : 0.6, ease: "easeOut" }
  }
};
