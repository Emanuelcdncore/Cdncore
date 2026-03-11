'use client';

import React from 'react';
import { Reveal } from './Reveal';
import SpotlightCard from './SpotlightCard';
import Image from 'next/image';
import './css/RoboticsSection.css';

const bp = process.env.BASE_PATH || '';

const RoboticsSection: React.FC = () => {
  return (
    <section className="robotics-section section-padding">
      <div className="container">
        <div className="core-section">
          <Reveal width="100%" duration={0.8} variant="slide">
            <SpotlightCard className="robotics-card-wrapper" spotlightColor="rgba(139, 92, 246, 0.25)" borderColor="rgba(139, 92, 246, 0.3)" enableTilt={true} tiltIntensity={5}>
              <div className="relative z-10">
                <div className="robotics-image-container">
                  <Image src={`${bp}/GroupRobotic.png`} alt="Robotics" width={400} height={400} unoptimized />
                </div>
                <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-6" style={{ fontFamily: "var(--font-depot), 'Depot', sans-serif", background: 'linear-gradient(90deg, #8B5CF6 0%, #A855F7 50%, #C084FC 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  ROBOTICS
                </h3>
                <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light max-w-3xl">
                  Our robotics division pushes the boundaries of autonomous systems and intelligent automation. From drone technology to industrial robotics, we design and deploy cutting-edge solutions that transform how businesses operate in physical spaces.
                </p>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default RoboticsSection;
