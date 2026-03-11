export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 768px)').matches ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export function isLowEndDevice(): boolean {
  if (typeof navigator === 'undefined') return false;
  const hardwareConcurrency = (navigator as any).hardwareConcurrency || 4;
  const deviceMemory = (navigator as any).deviceMemory || 4;
  return hardwareConcurrency <= 2 || deviceMemory <= 2;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function getOptimalMoteCount(): number {
  if (prefersReducedMotion()) return 0;
  if (isLowEndDevice()) return 3;
  if (isMobileDevice()) return 5;
  return 12;
}

export function getOptimalFrameDelay(): number {
  if (isLowEndDevice()) return 50; // ~20fps
  if (isMobileDevice()) return 33; // ~30fps
  return 16; // ~60fps
}
