'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/Reveal';
import RBCountUp from '@/components/ReactBits/RBCountUp';
import './css/EthicsSection.css';

const EthicsSection: React.FC = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  const principles = [
    { title: t('commitments.ethics.p1_title', 'Transparency'), detail: t('commitments.ethics.p1_detail', 'We maintain open communication with our clients, partners, and team members. Every decision is made with clarity and accountability.') },
    { title: t('commitments.ethics.p2_title', 'Data Privacy'), detail: t('commitments.ethics.p2_detail', 'We treat data as a sacred trust. Our security protocols exceed industry standards, ensuring that sensitive information remains protected at all times.') },
    { title: t('commitments.ethics.p3_title', 'Responsible AI'), detail: t('commitments.ethics.p3_detail', 'We develop AI systems that are fair, explainable, and free from harmful biases. Our AI ethics framework guides every project.') },
    { title: t('commitments.ethics.p4_title', 'Inclusivity'), detail: t('commitments.ethics.p4_detail', 'Technology should serve everyone. We design solutions that are accessible and beneficial to diverse communities and users.') },
    { title: t('commitments.ethics.p5_title', 'Environmental Responsibility'), detail: t('commitments.ethics.p5_detail', 'We optimize our infrastructure for energy efficiency and actively seek ways to reduce the environmental impact of our technology.') },
    { title: t('commitments.ethics.p6_title', 'Continuous Learning'), detail: t('commitments.ethics.p6_detail', 'We invest in our team continuous education and stay at the forefront of technological advancements to deliver the best solutions.') },
    { title: t('commitments.ethics.p7_title', 'Community Impact'), detail: t('commitments.ethics.p7_detail', 'We believe in giving back. Through mentorship, open-source contributions, and community initiatives, we work to uplift the tech ecosystem.') },
  ];

  return (
    <section className="ethics-section">
      <div className="container">
        <div className="section-header">
          <Reveal width="100%" variant="blur">
            <h2>{t('commitments.ethics.label', 'Ethics & Principles')}</h2>
            <p>{t('commitments.ethics.subtitle', 'The ethical foundation that drives our innovation')}</p>
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
              <span className="stat-number"><RBCountUp from={0} to={99} duration={2} />%</span>
              <span className="stat-label">{t('commitments.ethics.stat1_label', 'Client Satisfaction Rate')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number"><RBCountUp from={0} to={50} duration={2} />+</span>
              <span className="stat-label">{t('commitments.ethics.stat2_label', 'Security Certifications')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number"><RBCountUp from={0} to={24} duration={2} />/7</span>
              <span className="stat-label">{t('commitments.ethics.stat3_label', 'Support & Monitoring')}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default EthicsSection;
