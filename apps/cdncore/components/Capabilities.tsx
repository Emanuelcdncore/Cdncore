'use client';

import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Reveal } from './Reveal';
import SpotlightCard from './SpotlightCard';
import Image from 'next/image';
import './css/Capabilities.css';

interface Capability {
  id: string; title: string; description: string; technologies: string[]; icon: string;
}

const bp = process.env.BASE_PATH || '';

const Capabilities: React.FC = () => {
  const { ref } = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeId, setActiveId] = useState('cybersecurity-services');

  const capabilities: Capability[] = [
    { id: 'cybersecurity-services', title: 'Cyber Security & Network Services', description: 'Cutting-edge information security solutions, penetration testing, server hardening, and design of stable network architectures and secure communications to counter modern threats.', technologies: ['Network Security', 'DDoS Protection', 'Penetration Testing', 'Firewall Config', 'Secure VoIP'], icon: '' },
    { id: 'ai-agents', title: 'Enterprise AI & Intelligent Automation', description: 'Deploy custom AI solutions to automate complex workflows, enhance customer support with smart agents, and drive operational efficiency securely within your infrastructure.', technologies: ['Generative AI Solutions', 'Smart Business Assistants', 'Workflow Automation', 'NLP Services'], icon: '' },
    { id: 'ml-neural', title: 'Big Data Analytics & Insights', description: 'Transform raw data into actionable business intelligence. We implement scalable algorithms for forecasting, risk assessment, and behavioral analysis to empower decision-making.', technologies: ['Predictive Modeling', 'Business Intelligence', 'Deep Analytics', 'Pattern Recognition'], icon: '' },
    { id: 'advanced-rnd', title: 'Advanced R&D & Future Systems', description: 'Our R&D division focuses on solving complex, large-scale challenges by pioneering advancements across the entire technology stack. From intelligent edge computing and IoT architectures to data-driven AI and next-generation network design, we build the foundational systems of tomorrow.', technologies: ['Intelligent Edge & IoT', 'AI & Data Platforms', 'Next-Gen System', 'Frontier Tech Integration'], icon: '' }
  ];

  return (
    <section ref={ref} id="capabilities" className="capabilities section-padding">
      <div className="container">
        <div className="section-header">
          <Reveal width="100%" duration={0.8} variant="blur">
            <h2 className="section-title"><span className="depot-font technical-white">TECHNICAL</span> <span className="capabilities-subtitle">Capabilities</span></h2>
          </Reveal>
        </div>

        <div id="cybersecurity" className="core-section">
          <Reveal width="100%" duration={0.8} delay={0.2} variant="slide">
            <SpotlightCard className="cybersecurity-card-wrapper" spotlightColor="rgba(59, 130, 246, 0.35)" borderColor="rgba(59, 130, 246, 0.3)" enableTilt={true} tiltIntensity={5}>
              <div className="relative z-10 flex flex-col gap-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tight" style={{ fontFamily: "var(--font-depot), 'Depot', sans-serif", background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 50%, #A855F7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>
                    CYBERSECURITY
                  </h3>
                  <div className="relative p-4">
                    <div className="absolute inset-0 rounded-lg" style={{ background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.4) 0%, rgba(139, 92, 246, 0.15) 40%, transparent 70%)', filter: 'blur(20px)', zIndex: 0 }} />
                    <Image src={`${bp}/Hiscox.png`} alt="Hiscox" className="h-24 md:h-28 w-auto object-contain relative z-10" width={200} height={112} unoptimized />
                  </div>
                </div>
                <div className="max-w-5xl">
                  <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light">
                    Hiscox is a global specialist insurer focused on professional indemnity, high-value assets, and complex business risks. Known for its premium service and efficient claims handling, the company serves a diverse international clientele. Cdncore is the partner responsible for Hiscox&apos;s cybersecurity, ensuring the protection of its digital infrastructure and the integrity of its global data operations against evolving cyber threats.
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>

        <div id="ai-solutions" className="capabilities-content">
          <div className="sidebar-new">
            <p className="sidebar-intro">We combine cutting-edge technology with industry expertise to deliver transformative solutions</p>
            <div className="sidebar-card-new">
              <div className="sidebar-nav-new">
                {capabilities.map((cap) => (
                  <div key={cap.id} className={`sidebar-nav-item-new ${activeId === cap.id ? 'active' : ''}`} onClick={() => setActiveId(cap.id)}>
                    {activeId === cap.id && <div className="sidebar-item-border" />}
                    <span className={activeId === cap.id ? 'sidebar-item-title-gradient' : 'sidebar-item-title'}>{cap.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="capabilities-cards">
            {capabilities.map((cap, i) => (
              <Reveal key={cap.id} width="100%" duration={0.6} delay={0.1 * i} variant="slide">
                <div className={`capability-card-new ${activeId === cap.id ? 'active' : ''}`} onClick={() => setActiveId(cap.id)}>
                  <div className="capability-card-border" />
                  <div className="capability-card-content-inner">
                    <h4 className="capability-title-new">{cap.title}</h4>
                    <p className="capability-description-new">{cap.description}</p>
                    <div className="tech-tags-new">
                      {cap.technologies.map((tech) => (<span key={tech} className="tech-tag-new">{tech}</span>))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
