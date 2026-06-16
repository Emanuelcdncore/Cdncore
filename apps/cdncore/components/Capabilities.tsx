'use client';

import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollReveal } from './ScrollReveal/ScrollReveal';
import { useScrollBatch } from './ScrollReveal/useScrollBatch';
import { GlassCard } from './Glass/GlassCard';
import SpotlightCard from './SpotlightCard';
import DecryptedText from './ReactBits/DecryptedText';
import Image from 'next/image';
import './css/Capabilities.css';

interface Capability {
  id: string;
  label: string;
  title: string;
  description: string;
  technologies: string[];
  icon: string;
}

const bp = process.env.BASE_PATH || '';

const Capabilities: React.FC = () => {
  const { t } = useTranslation();
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState('cybersecurity-services');

  const capabilities: Capability[] = [
    {
      id: 'cybersecurity-services',
      label: t('capabilities.c1_label', 'CYBERSECURITY'),
      title: t('capabilities.c1_title', 'Cyber Security & Network Services'),
      description: t('capabilities.c1_desc', 'Cutting-edge information security solutions, penetration testing, server hardening, and design of stable network architectures and secure communications to counter modern threats.'),
      technologies: [
        t('capabilities.c1_tech1', 'Network Security'),
        t('capabilities.c1_tech2', 'DDoS Protection'),
        t('capabilities.c1_tech3', 'Penetration Testing'),
        t('capabilities.c1_tech4', 'Firewall Config'),
        t('capabilities.c1_tech5', 'Secure VoIP'),
      ],
      icon: '',
    },
    {
      id: 'ai-agents',
      label: t('capabilities.c2_label', 'AI SOLUTIONS'),
      title: t('capabilities.c2_title', 'Enterprise AI & Intelligent Automation'),
      description: t('capabilities.c2_desc', 'Deploy custom AI solutions to automate complex workflows, enhance customer support with smart agents, and drive operational efficiency securely within your infrastructure.'),
      technologies: [
        t('capabilities.c2_tech1', 'Generative AI Solutions'),
        t('capabilities.c2_tech2', 'Smart Business Assistants'),
        t('capabilities.c2_tech3', 'Workflow Automation'),
        t('capabilities.c2_tech4', 'NLP Services'),
      ],
      icon: '',
    },
    {
      id: 'ml-neural',
      label: t('capabilities.c3_label', 'BIG DATA ANALYTICS'),
      title: t('capabilities.c3_title', 'Big Data Analytics & Insights'),
      description: t('capabilities.c3_desc', 'Transform raw data into actionable business intelligence. We implement scalable algorithms for forecasting, risk assessment, and behavioral analysis to empower decision-making.'),
      technologies: [
        t('capabilities.c3_tech1', 'Predictive Modeling'),
        t('capabilities.c3_tech2', 'Business Intelligence'),
        t('capabilities.c3_tech3', 'Deep Analytics'),
        t('capabilities.c3_tech4', 'Pattern Recognition'),
      ],
      icon: '',
    },
    {
      id: 'advanced-rnd',
      label: t('capabilities.c4_label', 'ADVANCED R&D'),
      title: t('capabilities.c4_title', 'Advanced R&D & Future Systems'),
      description: t('capabilities.c4_desc', 'Our R&D division focuses on solving complex, large-scale challenges by pioneering advancements across the entire technology stack. From intelligent edge computing and IoT architectures to data-driven AI and next-generation network design, we build the foundational systems of tomorrow.'),
      technologies: [
        t('capabilities.c4_tech1', 'Intelligent Edge & IoT'),
        t('capabilities.c4_tech2', 'AI & Data Platforms'),
        t('capabilities.c4_tech3', 'Next-Gen System'),
        t('capabilities.c4_tech4', 'Frontier Tech Integration'),
      ],
      icon: '',
    },
  ];

  useScrollBatch(cardsRef, {
    selector: '.capability-card-new',
    mode: 'fade',
    stagger: 0.1,
  });

  return (
    <section id="capabilities" className="capabilities section-padding">
      <div className="container">
        <div className="section-header">
          <ScrollReveal width="100%" variant="fade">
            <h2 className="section-title">
              <span className="depot-font technical-white">{t('capabilities.label', 'TECHNICAL')}</span>{' '}
              <span className="capabilities-subtitle">{t('capabilities.heading', 'Capabilities')}</span>
            </h2>
          </ScrollReveal>
        </div>

        <div id="cybersecurity" className="core-section">
          <ScrollReveal width="100%" variant="scale" delay={0.1}>
            <SpotlightCard
              className="cybersecurity-card-wrapper"
              spotlightColor="rgba(59, 130, 246, 0.35)"
              borderColor="rgba(59, 130, 246, 0.3)"
              enableTilt={true}
              tiltIntensity={5}
            >
              <GlassCard
                variant="frosted"
                glow="brand"
                interactive
                padding="lg"
                border="luminous"
                className="glass-cyber-inner"
              >
                <div className="relative z-10 flex flex-col gap-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <h3
                      className="text-5xl md:text-7xl font-black uppercase tracking-tight"
                      style={{ fontFamily: "var(--font-depot), 'Depot', sans-serif" }}
                    >
                      <DecryptedText
                        text={t('capabilities.cyber_label', 'CYBERSECURITY')}
                        animateOn="view"
                        sequential={true}
                        revealDirection="start"
                        speed={40}
                        characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%"
                        className="cap-decrypt-revealed"
                        encryptedClassName="cap-decrypt-encrypted"
                      />
                    </h3>
                    <div className="relative p-4">
                      <div
                        className="absolute inset-0 rounded-lg"
                        style={{
                          background:
                            'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.4) 0%, rgba(139, 92, 246, 0.15) 40%, transparent 70%)',
                          filter: 'blur(20px)',
                          zIndex: 0,
                        }}
                      />
                      <Image
                        src={`${bp}/Hiscox.png`}
                        alt="Hiscox"
                        className="h-24 md:h-28 w-auto object-contain relative z-10"
                        width={200}
                        height={112}
                        unoptimized
                      />
                    </div>
                  </div>
                  <div className="max-w-5xl">
                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light">
                      {t('capabilities.cyber_hiscox', 'Hiscox is a global specialist insurer focused on professional indemnity, high-value assets, and complex business risks. Known for its premium service and efficient claims handling, the company serves a diverse international clientele. Cdncore is the partner responsible for Hiscox\'s cybersecurity, ensuring the protection of its digital infrastructure and the integrity of its global data operations against evolving cyber threats.')}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </SpotlightCard>
          </ScrollReveal>
        </div>

        <div id="ai-solutions" className="capabilities-content">
          <div className="sidebar-new">
            <p className="sidebar-intro">
              {t('capabilities.sidebar_intro', 'We combine cutting-edge technology with industry expertise to deliver transformative solutions')}
            </p>
            <GlassCard
              variant="surface"
              glow="purple"
              interactive
              padding="md"
              border="luminous"
              className="sidebar-card-new"
            >
              <div className="sidebar-nav-new">
                {capabilities.map((cap) => (
                  <div
                    key={cap.id}
                    className={`sidebar-nav-item-new ${activeId === cap.id ? 'active' : ''}`}
                    onClick={() => setActiveId(cap.id)}
                  >
                    {activeId === cap.id && <div className="sidebar-item-border" />}
                    <span
                      className={
                        activeId === cap.id ? 'sidebar-item-title-gradient' : 'sidebar-item-title'
                      }
                    >
                      {cap.title}
                    </span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          <div ref={cardsRef} className="capabilities-cards">
            {capabilities.map((cap) => (
              <GlassCard
                key={cap.id}
                variant="surface"
                glow="purple"
                interactive
                padding="none"
                border="subtle"
                className={`capability-card-new ${activeId === cap.id ? 'active' : ''}`}
                onClick={() => setActiveId(cap.id)}
              >
                <div className="capability-card-border" />
                <div className="capability-card-content-inner">
                  <p className="capability-category-label">
                    <DecryptedText
                      text={cap.label}
                      animateOn="view"
                      sequential={true}
                      revealDirection="start"
                      speed={35}
                      characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#"
                      className="cap-decrypt-revealed"
                      encryptedClassName="cap-decrypt-encrypted"
                    />
                  </p>
                  <h4 className="capability-title-new">{cap.title}</h4>
                  <p className="capability-description-new">{cap.description}</p>
                  <div className="tech-tags-new">
                    {cap.technologies.map((tech) => (
                      <span key={tech} className="tech-tag-new">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
