'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/Reveal';
import Image from 'next/image';
import './css/MissionSection.css';

const bp = process.env.BASE_PATH || '';

const MissionSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="mission-section" id="mission">
      <div className="container">
        <div className="section-header">
          <Reveal width="100%" variant="blur">
            <h2>{t('commitments.mission.title', 'Our Mission')}</h2>
            <p>{t('commitments.mission.subtitle', 'Building innovative technology that empowers organizations worldwide')}</p>
          </Reveal>
        </div>

        <div className="mission-content">
          <Reveal width="100%" variant="fade">
            <h3>{t('commitments.mission.belief', 'We believe technology should serve humanity, not the other way around.')}</h3>
          </Reveal>

          <div className="mission-layout">
            <div className="mission-left">
              <Reveal width="100%" variant="slide">
                <div className="mission-services-box">
                  <h4>{t('commitments.mission.what_we_build', 'What We Build')}</h4>
                  <ul className="mission-services">
                    <li><strong>{t('commitments.mission.service1', 'Enterprise Security')}</strong> - {t('commitments.mission.service1_desc', 'Protecting digital infrastructure against evolving threats')}</li>
                    <li><strong>{t('commitments.mission.service2', 'AI Solutions')}</strong> - {t('commitments.mission.service2_desc', 'Intelligent automation that drives efficiency')}</li>
                    <li><strong>{t('commitments.mission.service3', 'Data Platforms')}</strong> - {t('commitments.mission.service3_desc', 'Transforming raw data into actionable insights')}</li>
                    <li><strong>{t('commitments.mission.service4', 'Future Systems')}</strong> - {t('commitments.mission.service4_desc', 'R&D for next-generation technology')}</li>
                  </ul>
                </div>
              </Reveal>
            </div>
            <div className="mission-right">
              <Reveal width="100%" variant="fade">
                <div className="mission-advantage">
                  <h4>{t('commitments.mission.our_advantage', 'Our Advantage')}</h4>
                  <p>{t('commitments.mission.advantage_desc', 'With deep expertise across cybersecurity, AI, and data science, we deliver comprehensive solutions that address the full spectrum of modern enterprise challenges.')}</p>
                </div>
              </Reveal>
              <Reveal width="100%" variant="fade" delay={0.2}>
                <div className="mission-beyond">
                  <h4>{t('commitments.mission.beyond_tech', 'Beyond Technology')}</h4>
                  <p>{t('commitments.mission.beyond_tech_desc', 'We are committed to ethical innovation, sustainable practices, and creating technology that makes a positive impact on society.')}</p>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="mission-full-image">
            <Image src={`${bp}/assets/images/Image_mission.jpg`} alt={t('commitments.mission.title', 'Our Mission')} width={1200} height={400} unoptimized style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
