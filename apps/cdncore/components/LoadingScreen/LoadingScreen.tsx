'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';
import { dispatchHeroHandoff } from '@/lib/loading-handoff';
import { useLoadingScreen } from './useLoadingScreen';
import './LoadingScreen.css';

const bp = process.env.BASE_PATH || '';
const LOGO_SRC = `${bp}/assets/logos/CDNCORE-03.png`;

export default function LoadingScreen() {
  const { t } = useTranslation();
  const { shouldShow, prefersReducedMotion, onComplete } = useLoadingScreen();
  const loadingText = t('loading.text', 'LOADING...');
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!shouldShow || !overlayRef.current || !logoWrapRef.current || !progressRef.current || !textRef.current) {
      return;
    }

    const overlay = overlayRef.current;
    const logoWrap = logoWrapRef.current;
    const progress = progressRef.current;
    const chars = textRef.current.querySelectorAll<HTMLElement>('.loading-screen__char');

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([logoWrap, progress], { clearProps: 'transform' });
        gsap.set(logoWrap, { opacity: 1, scale: 1 });
        gsap.set(progress, { scaleX: 1 });
        gsap.set(chars, { opacity: 1 });

        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3,
          delay: 0.35,
          ease: 'power2.inOut',
          onStart: () => {
            dispatchHeroHandoff({ reducedMotion: true, withLoader: true });
          },
          onComplete,
        });
        return;
      }

      gsap.set(progress, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(logoWrap, { opacity: 0, scale: 0.92, x: 0 });
      gsap.set(chars, { opacity: 0 });

      const tl = gsap.timeline({ onComplete });

      tl.to(
        logoWrap,
        { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' },
        0.1
      )
        .to(
          chars,
          { opacity: 1, duration: 0.04, stagger: 0.035, ease: 'none' },
          0.28
        )
        .to(
          progress,
          { scaleX: 1, duration: 1.15, ease: 'power2.inOut' },
          0.38
        )
        .call(
          () => {
            dispatchHeroHandoff({ reducedMotion: false, withLoader: true });
          },
          [],
          1.82
        )
        .add(() => {
          logoWrap.classList.add('loading-glitch-active');
          gsap
            .timeline()
            .to(logoWrap, { x: -5, duration: 0.04, ease: 'none' })
            .to(logoWrap, { x: 5, duration: 0.04, ease: 'none' })
            .to(logoWrap, { x: -3, duration: 0.04, ease: 'none' })
            .to(logoWrap, { x: 0, duration: 0.05, ease: 'power2.out' });
          gsap.delayedCall(0.22, () => {
            logoWrap.classList.remove('loading-glitch-active');
          });
        }, 1.05)
        .to(
          overlay,
          { opacity: 0, duration: 0.65, ease: 'power2.inOut' },
          1.82
        )
        .to(
          logoWrap,
          { scale: 1.02, duration: 0.65, ease: 'power2.inOut' },
          1.82
        );
    }, overlayRef);

    return () => ctx.revert();
  }, [shouldShow, prefersReducedMotion, onComplete]);

  if (!shouldShow) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      className="loading-screen"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading site"
    >
      <div className="loading-screen__scanlines" aria-hidden="true" />
      <div className="loading-screen__vignette" aria-hidden="true" />

      <div className="loading-screen__content">
        <div ref={logoWrapRef} className="loading-screen__logo-wrap">
          <Image
            src={LOGO_SRC}
            alt="CDNCore"
            className="loading-screen__logo"
            width={280}
            height={280}
            priority
            unoptimized
          />
        </div>

        <div className="loading-screen__progress-track" aria-hidden="true">
          <div ref={progressRef} className="loading-screen__progress-fill" />
        </div>

        <div ref={textRef} className="loading-screen__text" aria-hidden="true">
          {loadingText.split('').map((char, index) => (
            <span key={`${char}-${index}`} className="loading-screen__char">
              {char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
