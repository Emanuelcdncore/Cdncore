'use client';

import React from 'react';
import { Reveal } from './Reveal';
import SpotlightCard from './SpotlightCard';
import Image from 'next/image';
import './css/OurWork.css';

const bp = process.env.BASE_PATH || '';

interface Project {
  title: string;
  description: string;
  tags: string[];
  type: string;
  image: string;
  link?: { url: string; label: string };
}

const projects: Project[] = [
  {
    title: 'CortexHub',
    description:
      'AI-powered content platform that leverages multi-model deliberation to generate, refine, and distribute content across channels. Claude, GPT, and Gemini work in two deliberation rounds — producing outputs no single model can match — then publish directly to LinkedIn, Facebook, Instagram, and more from one dashboard.',
    tags: ['AI', 'Multi-Model', 'Content'],
    type: 'SaaS Platform',
    image: `${bp}/assets/images/project-cortexhub.png`,
    link: { url: 'https://cortexhub.cdnglobal.eu', label: 'Visit Platform' },
  },
  {
    title: 'AppDrop',
    description:
      'Open-source Nextcloud app installer that eliminates the need for SSH access. Drag-and-drop .zip uploads with 20+ automated health checks, pre-installation validation, timestamped backups, and a built-in app skeleton generator — all from a clean web UI with dark and light theme support.',
    tags: ['Open Source', 'Nextcloud', 'DevTools'],
    type: 'Open Source Tool',
    image: `${bp}/assets/images/project-appdrop.png`,
    link: { url: 'https://cdncore-pt.github.io/AppDrop/', label: 'View Product' },
  },
  {
    title: 'cdnMonitor',
    description:
      'Unified monitoring platform that brings infrastructure visibility, topology mapping, syslog investigation, actionable alerts, and AI-powered operational guidance into one system. Built-in AI explains alerts in plain language, summarizes noisy events, and helps teams act without deep specialist knowledge.',
    tags: ['Monitoring', 'AI Ops', 'Infrastructure'],
    type: 'Software',
    image: `${bp}/assets/images/project-cdnmonitor.png`,
    link: { url: 'https://cdnmonitor.cdnglobal.eu', label: 'Visit Platform' },
  },
  {
    title: 'Vertex Network',
    description:
      'Integrated operations and growth platform that connects partners, admins, and IT teams in one secure environment to manage referrals, contracts, commissions, communications, and infrastructure in real time. Helps organizations scale partnerships with clear visibility, automated workflows, and reliable governance across both commercial and technical operations.',
    tags: ['Partners', 'Commissions', 'Enterprise'],
    type: 'Software',
    image: `${bp}/assets/images/project-vertex.jpg`,
    link: { url: 'https://vertex.cdnglobal.eu', label: 'Visit Platform' },
  },
  {
    title: 'Auth-Central',
    description:
      'Centralized Identity & Access Management infrastructure built on Keycloak 26.2. Multi-realm architecture serving the entire internal ecosystem with OIDC/OAuth 2.0, brute-force protection, enforced password policies, and a high-availability cluster with PostgreSQL streaming replication and automated Ansible deployments.',
    tags: ['IAM', 'Keycloak', 'Infrastructure'],
    type: 'Internal Infrastructure',
    image: `${bp}/assets/images/project-authcentral.png`,
  },
];

const OurWork: React.FC = () => {
  return (
    <section className="our-work" id="our-work">
      <div className="ow-container">
        <div className="ow-header">
          <Reveal width="100%" duration={0.8} variant="blur">
            <h2 className="ow-title">
              <span className="depot-font">PRODUCTS</span>
            </h2>
          </Reveal>
        </div>
        <Reveal width="100%" duration={0.6} delay={0.1} variant="fade">
          <p className="ow-subtitle">
            A selection of projects that reflect how we approach engineering — from AI platforms to identity infrastructure.
          </p>
        </Reveal>
        <div className="ow-grid">
          {projects.map((project, i) => (
            <Reveal key={project.title} width="100%" duration={0.6} delay={0.15 * i} variant="fade">
              <SpotlightCard
                spotlightColor="rgba(139, 92, 246, 0.15)"
                borderColor="rgba(139, 92, 246, 0.2)"
                enableTilt
                tiltIntensity={4}
              >
                <div className="ow-card">
                  <div className="ow-card-image">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={600}
                      height={300}
                      unoptimized
                    />
                    <div className="ow-card-image-overlay" />
                  </div>
                  <div className="ow-card-body">
                    <div className="ow-card-tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="ow-card-tag">{tag}</span>
                      ))}
                    </div>
                    <h3 className="ow-card-title">{project.title}</h3>
                    <p className="ow-card-desc">{project.description}</p>
                    <div className="ow-card-footer">
                      <span className="ow-card-type">{project.type}</span>
                      {project.link ? (
                        <a
                          href={project.link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ow-card-link"
                        >
                          {project.link.label}
                          <span className="ow-card-link-arrow">→</span>
                        </a>
                      ) : (
                        <span className="ow-card-internal">
                          <span className="ow-card-internal-dot" />
                          Internal
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurWork;
