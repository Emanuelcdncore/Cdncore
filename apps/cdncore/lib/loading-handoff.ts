export const HERO_HANDOFF_EVENT = 'cdncore:hero-handoff';

export type HeroHandoffDetail = {
  reducedMotion: boolean;
  withLoader: boolean;
};

export function dispatchHeroHandoff(detail: HeroHandoffDetail) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent<HeroHandoffDetail>(HERO_HANDOFF_EVENT, { detail })
  );
}

export function wasLoaderSkipped(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    return sessionStorage.getItem('cdncore-loaded') === '1';
  } catch {
    return true;
  }
}
