'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/Reveal';
import ProfileCard from './ProfileCard';
import './css/TeamSection.css';

const bp = process.env.BASE_PATH || '';

const getPhotoFilename = (name: string): string => {
  const nameMap: Record<string, string> = {
    'Sergio Pinheiro': 'Sergio.png',
    'Joana Fidalgo': 'Joana.png',
    'Dr. Mehran Pourvahab': 'Mehran.png',
    'Guilherme Poeta': 'Poeta.png',
    'Henrique Ramos': 'Henrique.png'
  };
  return nameMap[name] || 'avatar.png';
};

const getAvatarScale = (name: string): number => {
  if (name === "Sergio Pinheiro") return 1.15;
  if (name === "Joana Fidalgo") return 1.1;
  if (name === "Dr. Mehran Pourvahab") return 0.9;
  if (name === "Henrique Ramos") return 0.70;
  return 1.0;
};

const getAvatarOffsetY = (name: string): number => {
  if (name === "Henrique Ramos") return 100;
  return 0;
};

const TeamSection: React.FC = () => {
  const { t } = useTranslation();

  const teamMembers = [
    {
      name: "Sergio Pinheiro",
      role: t('commitments.team.m1_role', 'CEO & Founder'),
      bio: t('commitments.team.m1_bio', 'Sérgio the CEO and Founder of CDN and Co-Founder of Privant. He also works as an official cameraman for the European Commission and the Council of the European Union.'),
      linkedin: "https://www.linkedin.com/in/sergio-pinheiro-cdntv",
      icon: `${bp}/assets/images/CEO.png`
    },
    {
      name: "Dr. Mehran Pourvahab",
      role: t('commitments.team.m2_role', 'CO-CTO/R&D/CISO'),
      bio: t('commitments.team.m2_bio', 'Mehran, IEEE Sr. Member, holds a Ph.D. in Computer Eng. As a R&D, bringing expertise in AI, ML, Cyber Security, Cloud Security, and Data Science.'),
      linkedin: "https://www.linkedin.com/in/mehran-pourvahab/",
      icon: `${bp}/assets/images/Developers.png`
    },
    {
      name: "Guilherme Poeta",
      role: t('commitments.team.m3_role', 'Software Engineer'),
      bio: t('commitments.team.m3_bio', "Guilherme holds a Bachelor's Degree in Web Informatics and a Master's Degree in Computer Science with a specialization in AI. Previously worked as a Junior Python Developer at Phillip Morris International."),
      linkedin: "https://www.linkedin.com/in/guilherme-fernandes-5b6a6913b/",
      icon: `${bp}/assets/images/Developers.png`
    },
    {
      name: "Henrique Ramos",
      role: t('commitments.team.m4_role', 'Software Engineer'),
      bio: t('commitments.team.m4_bio', 'Henrique is a talented Software Engineer contributing to the development and innovation at CDNCORE with a focus on cutting-edge technologies.'),
      linkedin: "https://www.linkedin.com/in/henriquer01/",
      icon: `${bp}/assets/images/Developers.png`
    }
  ];

  return (
    <section className="team-section" id="team">
      <div className="container">
        <Reveal width="100%" duration={0.6} variant="blur">
          <div className="leadership-message">
            <blockquote>
              {t('commitments.team.quote', 'Together, we can face any challenges as deep as the ocean and as high as the sky.')}
            </blockquote>
            <cite>&mdash; {t('commitments.team.quote_author', '— Dr. Maya Angelou').replace('— ', '')}</cite>
          </div>
        </Reveal>

        <Reveal width="100%" duration={0.6} delay={0.2} variant="blur">
          <div className="section-header">
            <h2>{t('commitments.team.label', 'Team')}</h2>
            <p>{t('commitments.team.subtitle', "Meet the brilliant minds behind CDNCORE's groundbreaking innovations")}</p>
          </div>
        </Reveal>

        <div className="team-grid">
          {teamMembers.map((member, index) => {
            const handle = member.name.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 15);
            const photoFilename = getPhotoFilename(member.name);
            const avatarUrl = `${bp}/assets/images/Team_Photos/${photoFilename}`;
            const avatarScale = getAvatarScale(member.name);
            const avatarOffsetY = getAvatarOffsetY(member.name);

            return (
              <Reveal
                key={member.name}
                width="100%"
                duration={0.5}
                delay={0.1 * index}
                variant="scale"
              >
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', maxWidth: '100%' }}>
                  <ProfileCard
                    name={member.name}
                    title={member.role}
                    handle={handle}
                    status={t('commitments.team.available', 'Available')}
                    contactText={t('commitments.team.linkedin', 'LinkedIn')}
                    avatarUrl={avatarUrl}
                    miniAvatarUrl={avatarUrl}
                    iconUrl={member.icon}
                    avatarScale={avatarScale}
                    avatarOffsetX={0}
                    avatarOffsetY={avatarOffsetY}
                    showUserInfo={true}
                    enableTilt={true}
                    onContactClick={() => {
                      if (member.linkedin) {
                        window.open(member.linkedin, '_blank', 'noopener,noreferrer');
                      }
                    }}
                  />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
