'use client';

import React from 'react';
import { Reveal } from './Reveal';
import SpotlightCard from './SpotlightCard';
import Image from 'next/image';
import './css/HowWeWork.css';

const bp = process.env.BASE_PATH || '';

const steps = [
  { num: '01', title: 'DISCOVER', desc: 'We analyze your business needs and technical requirements to create a tailored strategy.', img: `${bp}/assets/images/Cube1.png` },
  { num: '02', title: 'DESIGN', desc: 'Our team creates intuitive, user-centered designs that align with your brand identity.', img: `${bp}/assets/images/Cube2.png` },
  { num: '03', title: 'DEVELOP', desc: 'We build robust, scalable solutions using cutting-edge technologies and best practices.', img: `${bp}/assets/images/Cube3.png` },
  { num: '04', title: 'DEPLOY', desc: 'Seamless deployment with continuous integration and monitoring for optimal performance.', img: `${bp}/assets/images/Cube4.png` },
  { num: '05', title: 'MAINTAIN', desc: 'Ongoing support and optimization to ensure your solution evolves with your needs.', img: `${bp}/assets/images/Cube5.png` }
];

const HowWeWork: React.FC = () => {
  return (
    <section className="how-we-work">
      <div className="hww-container">
        <div className="hww-header">
          <Reveal width="100%" duration={0.8} variant="blur">
            <h2 className="hww-title"><span className="depot-font">HOW WE WORK</span></h2>
          </Reveal>
        </div>
        <div className="hww-grid">
          {steps.map((step, i) => (
            <Reveal key={i} width="100%" duration={0.6} delay={0.1 * i} variant="fade">
              <SpotlightCard spotlightColor="rgba(139, 92, 246, 0.15)" borderColor="rgba(139, 92, 246, 0.2)">
                <div className="hww-card">
                  <div className="hww-card-img">
                    <Image src={step.img} alt={step.title} width={120} height={120} unoptimized style={{ animation: 'hww-float 3s ease-in-out infinite' }} />
                  </div>
                  <h3 className="hww-card-title">{step.title}</h3>
                  <p className="hww-card-desc">{step.desc}</p>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
