'use client';

import React, { useState } from 'react';
import { Reveal } from '@/components/Reveal';
import CountUp from '@/components/CountUp';
import './css/EthicsSection.css';

const principles = [
  { title: 'Transparency', detail: 'We maintain open communication with our clients, partners, and team members. Every decision is made with clarity and accountability.' },
  { title: 'Data Privacy', detail: 'We treat data as a sacred trust. Our security protocols exceed industry standards, ensuring that sensitive information remains protected at all times.' },
  { title: 'Responsible AI', detail: 'We develop AI systems that are fair, explainable, and free from harmful biases. Our AI ethics framework guides every project.' },
  { title: 'Inclusivity', detail: 'Technology should serve everyone. We design solutions that are accessible and beneficial to diverse communities and users.' },
  { title: 'Environmental Responsibility', detail: 'We optimize our infrastructure for energy efficiency and actively seek ways to reduce the environmental impact of our technology.' },
  { title: 'Continuous Learning', detail: 'We invest in our team continuous education and stay at the forefront of technological advancements to deliver the best solutions.' },
  { title: 'Community Impact', detail: 'We believe in giving back. Through mentorship, open-source contributions, and community initiatives, we work to uplift the tech ecosystem.' },
];

const EthicsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="ethics-section">
      <div className="container">
        <div className="section-header">
          <Reveal width="100%" variant="blur">
            <h2>Ethics & Principles</h2>
            <p>The ethical foundation that drives our innovation</p>
          </Reveal>
        </div>

        <div className="ethics-grid">
          <div className="ethics-principles">
            <ul className="principles-list">
              {principles.map((p, i) => (
                <li key={i} className={`principle-item ${activeIndex === i ? 'active' : ''}`} onClick={() => setActiveIndex(i)}>
                  {p.title}
                </li>
              ))}
            </ul>
          </div>
          <div className="ethics-content">
            {principles.map((p, i) => (
              <div key={i} className={`principle-detail ${activeIndex === i ? 'active' : ''}`}>
                <h3>{p.title}</h3>
                <p>{p.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <Reveal width="100%" variant="fade">
          <div className="commitment-stats">
            <div className="stat-item">
              <span className="stat-number"><CountUp end={99} suffix="%" duration={2000} /></span>
              <span className="stat-label">Client Satisfaction Rate</span>
            </div>
            <div className="stat-item">
              <span className="stat-number"><CountUp end={50} suffix="+" duration={2000} /></span>
              <span className="stat-label">Security Certifications</span>
            </div>
            <div className="stat-item">
              <span className="stat-number"><CountUp end={24} suffix="/7" duration={2000} /></span>
              <span className="stat-label">Support & Monitoring</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default EthicsSection;
