import gsap from 'gsap';

export type HeroEntranceMode = 'full' | 'mini';

export type HeroEntranceTargets = {
  content: HTMLElement;
  glow: HTMLElement;
  parallax: HTMLElement;
  chars: HTMLElement[];
  scrollIndicator: HTMLElement;
};

const LOGO_SCALE = 0.78;

export function runHeroEntranceTimeline(
  targets: HeroEntranceTargets,
  mode: HeroEntranceMode,
  reducedMotion: boolean,
  onComplete?: () => void
): gsap.core.Timeline {
  const { content, glow, parallax, chars, scrollIndicator } = targets;
  const isMini = mode === 'mini';

  gsap.set(content, { opacity: 1, pointerEvents: 'auto' });

  if (reducedMotion) {
    const tl = gsap.timeline({ onComplete });
    gsap.set([glow, parallax], { clearProps: 'transform' });
    tl.set([glow, parallax, scrollIndicator], { opacity: 1 }, 0)
      .set(parallax, { scale: LOGO_SCALE }, 0)
      .set(chars, { opacity: 1, y: 0 }, 0)
      .fromTo(
        content,
        { opacity: 0 },
        { opacity: 1, duration: isMini ? 0.25 : 0.35, ease: 'power2.out' },
        0
      );
    return tl;
  }

  gsap.set(scrollIndicator, { opacity: 0, y: 10 });
  gsap.set(glow, { opacity: 0, scale: 0.6, transformOrigin: 'center center' });
  gsap.set(parallax, {
    opacity: 0,
    scale: isMini ? 0.82 : 0.88,
    x: 0,
    y: 0,
    transformOrigin: 'center center',
  });
  gsap.set(chars, { opacity: 0, y: 12 });

  const tl = gsap.timeline({ onComplete });

  if (isMini) {
    tl.to(glow, { opacity: 0.55, scale: 1, duration: 0.35, ease: 'power2.out' }, 0)
      .to(
        parallax,
        { opacity: 1, scale: LOGO_SCALE, duration: 0.4, ease: 'power3.out' },
        0
      )
      .to(
        chars,
        { opacity: 1, y: 0, duration: 0.22, stagger: 0.012, ease: 'power2.out' },
        0.12
      )
      .to(
        scrollIndicator,
        { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out' },
        0.32
      );
    return tl;
  }

  tl.to(glow, { opacity: 0.65, scale: 1, duration: 0.5, ease: 'power2.out' }, 0)
    .to(
      parallax,
      { opacity: 1, scale: LOGO_SCALE, duration: 0.55, ease: 'power3.out' },
      0
    )
    .to(
      glow,
      { opacity: 0.45, duration: 0.2, ease: 'sine.inOut', yoyo: true, repeat: 1 },
      0.35
    )
    .to(
      chars,
      { opacity: 1, y: 0, duration: 0.35, stagger: 0.025, ease: 'power2.out' },
      0.25
    )
    .to(
      scrollIndicator,
      { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
      0.55
    );

  return tl;
}
