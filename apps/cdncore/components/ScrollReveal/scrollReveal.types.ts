export type ScrollRevealVariant =
  | 'fade'
  | 'slide'
  | 'slide-right'
  | 'scale';

/** @deprecated blur maps to fade — filter animations are not GPU-friendly */
export type ScrollRevealLegacyVariant = ScrollRevealVariant | 'blur';
