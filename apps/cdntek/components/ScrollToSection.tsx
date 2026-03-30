'use client';

import { useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ScrollToSection() {
  const searchParams = useSearchParams();

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition =
      elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const scrollTo = searchParams.get("scrollTo");
    if (scrollTo) {
      const timer = setTimeout(() => {
        scrollToSection(scrollTo);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [searchParams, scrollToSection]);

  return null;
}
