'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  width?: string;
  duration?: number;
  delay?: number;
  variant?: 'fade' | 'slide' | 'blur' | 'scale';
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  width = 'fit-content',
  duration = 0.5,
  delay = 0,
  variant = 'fade'
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const variants = {
    fade: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 }
    },
    slide: {
      hidden: { opacity: 0, x: -30 },
      visible: { opacity: 1, x: 0 }
    },
    blur: {
      hidden: { opacity: 0, filter: 'blur(10px)' },
      visible: { opacity: 1, filter: 'blur(0px)' }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 }
    }
  };

  return (
    <div ref={ref} style={{ width, position: 'relative', overflow: 'hidden' }}>
      <motion.div
        variants={variants[variant]}
        initial="hidden"
        animate={controls}
        transition={{ duration, delay, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Reveal;
