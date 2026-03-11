'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export const LayoutTextFlip = ({
  text = 'Build Amazing',
  words = ['Landing Pages', 'Component Blocks', 'Page Sections', '3D Shaders'],
  duration = 3000,
}: {
  text: string;
  words: string[];
  duration?: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);
    return () => clearInterval(interval);
  }, [words.length, duration]);

  return (
    <>
      <motion.span
        layoutId="subtext"
        className="text-2xl font-bold tracking-tight drop-shadow-lg md:text-4xl"
      >
        {text}
      </motion.span>

      <motion.span
        layout
        className="relative w-fit overflow-hidden rounded-md border border-transparent bg-white px-4 py-2 font-sans text-2xl font-bold tracking-tight shadow-sm ring shadow-black/10 ring-black/10 drop-shadow-lg md:text-4xl dark:bg-neutral-900 dark:shadow-sm dark:ring-1 dark:shadow-white/10 dark:ring-white/10"
        style={{ fontWeight: 'bold' }}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={currentIndex}
            initial={{ y: -40, filter: 'blur(10px)' }}
            animate={{ y: 0, filter: 'blur(0px)' }}
            exit={{ y: 50, filter: 'blur(10px)', opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={cn('inline-block whitespace-nowrap')}
            style={{
              background: 'linear-gradient(90deg, #8B5CF6, #3B82F6, #06B6D4, #00FFFF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
              fontWeight: '700',
              fontFamily: "var(--font-depot), 'Depot', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
              textRendering: 'geometricPrecision',
              letterSpacing: '0.02em'
            }}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );
};
