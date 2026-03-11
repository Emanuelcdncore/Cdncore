'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { staggerContainer, staggerItem } from '@/utils/animations';
import Cubes from './Backgrounds/Cubes';
import { LayoutTextFlip } from './ui/layout-text-flip';
import './css/IntroSection.css';

const IntroSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.section
      ref={ref}
      className="intro-section section-padding"
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <div className="intro-gradient-overlay" />
      <div className="container">
        <div className="intro-content">
          {!isMobile && (
            <div className="intro-left">
              <Cubes
                gridSize={3} maxAngle={45} radius={2.5}
                borderStyle="2px dashed #8B5CF6" faceColor="#000000"
                rippleColor="hsla(263, 69.30%, 42.20%, 0.70)"
                rippleSpeed={0.8} autoAnimate={false}
                rippleOnClick={true} cubeSize={80} cellGap={25}
              />
            </div>
          )}
          <div className="intro-right">
            <motion.div
              className="intro-text"
              variants={staggerItem}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <LayoutTextFlip
                text="We "
                words={['Engineer', 'Architect', 'Develop', 'Maintain', 'Secure']}
                duration={2000}
              />
              <div className="mt-4">
                <span className="gray-text">Cutting-edge applied informatics and AI solutions, driven by R&D and innovation, empowering modern enterprises through agentic intelligence.</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default IntroSection;
