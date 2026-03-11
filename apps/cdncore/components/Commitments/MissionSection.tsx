'use client';

import React from 'react';
import { Reveal } from '@/components/Reveal';
import Image from 'next/image';
import './css/MissionSection.css';

const bp = process.env.BASE_PATH || '';

const MissionSection: React.FC = () => {
  return (
    <section className="mission-section">
      <div className="container">
        <div className="section-header">
          <Reveal width="100%" variant="blur">
            <h2>Our Mission</h2>
            <p>Building innovative technology that empowers organizations worldwide</p>
          </Reveal>
        </div>

        <div className="mission-content">
          <Reveal width="100%" variant="fade">
            <h3>We believe technology should serve humanity, not the other way around.</h3>
          </Reveal>

          <div className="mission-layout">
            <div className="mission-left">
              <Reveal width="100%" variant="slide">
                <div className="mission-services-box">
                  <h4>What We Build</h4>
                  <ul className="mission-services">
                    <li><strong>Enterprise Security</strong> - Protecting digital infrastructure against evolving threats</li>
                    <li><strong>AI Solutions</strong> - Intelligent automation that drives efficiency</li>
                    <li><strong>Data Platforms</strong> - Transforming raw data into actionable insights</li>
                    <li><strong>Future Systems</strong> - R&D for next-generation technology</li>
                  </ul>
                </div>
              </Reveal>
            </div>
            <div className="mission-right">
              <Reveal width="100%" variant="fade">
                <div className="mission-advantage">
                  <h4>Our Advantage</h4>
                  <p>With deep expertise across cybersecurity, AI, and data science, we deliver comprehensive solutions that address the full spectrum of modern enterprise challenges.</p>
                </div>
              </Reveal>
              <Reveal width="100%" variant="fade" delay={0.2}>
                <div className="mission-beyond">
                  <h4>Beyond Technology</h4>
                  <p>We are committed to ethical innovation, sustainable practices, and creating technology that makes a positive impact on society.</p>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="mission-full-image">
            <Image src={`${bp}/assets/images/Image_mission.jpg`} alt="Mission" width={1200} height={400} unoptimized style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
