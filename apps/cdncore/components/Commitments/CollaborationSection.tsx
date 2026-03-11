'use client';

import React from 'react';
import { Reveal } from '@/components/Reveal';
import Image from 'next/image';
import './css/CollaborationSection.css';

const bp = process.env.BASE_PATH || '';

const values = [
  { title: 'Innovation', desc: 'Pushing boundaries with cutting-edge research and development to create solutions that define the future of technology.', img: `${bp}/assets/images/InnovationIMG.png` },
  { title: 'Collaboration', desc: 'Building strong partnerships and fostering teamwork to deliver comprehensive solutions that exceed expectations.', img: `${bp}/assets/images/CollaborationIMG.png` },
  { title: 'Sustainability', desc: 'Creating technology with a conscience, ensuring our innovations contribute positively to society and the environment.', img: `${bp}/assets/images/SustainabilityIMG.png` },
];

const CollaborationSection: React.FC = () => {
  return (
    <section className="values-section">
      <div className="container">
        <div className="section-header">
          <Reveal width="100%" variant="blur">
            <h2>Our Values</h2>
            <p>The principles that guide everything we do</p>
          </Reveal>
        </div>
        <div className="values-grid">
          {values.map((v, i) => (
            <Reveal key={v.title} width="100%" duration={0.5} delay={0.15 * i} variant="fade">
              <div className="value-card">
                <div className="value-icon">
                  <Image src={v.img} alt={v.title} width={80} height={80} unoptimized style={{ filter: 'hue-rotate(180deg) saturate(0%) brightness(0) invert(1)', width: '140%', height: '140%' }} />
                </div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollaborationSection;
