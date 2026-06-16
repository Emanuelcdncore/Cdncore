'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/Reveal';
import Image from 'next/image';
import './css/CollaborationSection.css';

const bp = process.env.BASE_PATH || '';

const CollaborationSection: React.FC = () => {
  const { t } = useTranslation();

  const values = [
    { titleKey: 'commitments.collab.v1_title', descKey: 'commitments.collab.v1_desc', titleDefault: 'Innovation', descDefault: 'Pushing boundaries with cutting-edge research and development to create solutions that define the future of technology.', img: `${bp}/assets/images/InnovationIMG.png` },
    { titleKey: 'commitments.collab.v2_title', descKey: 'commitments.collab.v2_desc', titleDefault: 'Collaboration', descDefault: 'Building strong partnerships and fostering teamwork to deliver comprehensive solutions that exceed expectations.', img: `${bp}/assets/images/CollaborationIMG.png` },
    { titleKey: 'commitments.collab.v3_title', descKey: 'commitments.collab.v3_desc', titleDefault: 'Sustainability', descDefault: 'Creating technology with a conscience, ensuring our innovations contribute positively to society and the environment.', img: `${bp}/assets/images/SustainabilityIMG.png` },
  ];

  return (
    <section className="values-section">
      <div className="container">
        <div className="section-header">
          <Reveal width="100%" variant="blur">
            <h2>{t('commitments.collab.label', 'Our Values')}</h2>
            <p>{t('commitments.collab.subtitle', 'The principles that guide everything we do')}</p>
          </Reveal>
        </div>
        <div className="values-grid">
          {values.map((v, i) => (
            <Reveal key={v.titleKey} width="100%" duration={0.5} delay={0.15 * i} variant="fade">
              <div className="value-card">
                <div className="value-icon">
                  <Image src={v.img} alt={t(v.titleKey, v.titleDefault)} width={80} height={80} unoptimized style={{ filter: 'hue-rotate(180deg) saturate(0%) brightness(0) invert(1)', width: '140%', height: '140%' }} />
                </div>
                <h4>{t(v.titleKey, v.titleDefault)}</h4>
                <p>{t(v.descKey, v.descDefault)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollaborationSection;
