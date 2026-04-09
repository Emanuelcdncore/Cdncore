'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './css/TeamSection.css';
import ProfileCard from './ProfileCard';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  linkedin: string;
  avatarUrl: string;
  iconUrl?: string;
}

const TeamSection: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const teamMembers: TeamMember[] = [
    {
      name: "Sergio Pinheiro",
      role: "CEO & Founder",
      bio: "Sergio the CEO and Founder of CDN and Co-Founder of Privant. He also works as an official cameraman for the European Commission and the Council of the European Union.",
      linkedin: "https://www.linkedin.com/in/sergio-pinheiro-cdntv?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      avatarUrl: "/teamIMG/Sérgio.png",
      iconUrl: undefined
    },
    {
      name: "João Garcia",
      role: "CDO / UX Designer",
      bio: "João holds a Bachelor's Degree in Industrial Design, a Master's Degree in Videogame Design, and a PhD in Architecture. Has worked as a secondary school teacher and as a researcher.",
      linkedin: "https://www.linkedin.com/in/joaomrgarcia?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      avatarUrl: "/teamIMG/Garcia.png",
      iconUrl: undefined
    }
  ];

  return (
    <section
      ref={ref}
      className="team-section"
      id="team"
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2
            style={{
              fontFamily: 'Depot, Ethnocentric, Orbitron, Arial, sans-serif',
              fontWeight: 700,
              fontSize: '40px',
              lineHeight: '100%',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: '#F28E12',
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            Team
          </h2>
          <p>Meet the brilliant minds behind CDNCORE&apos;s groundbreaking innovations.</p>
        </motion.div>

        <div className="team-grid">
          {teamMembers.map((member, index) => {
            const handle = member.name.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 15);
            const linkedinUrl = member.linkedin;

            let iconUrl: string | undefined;
            if (member.name.includes('Sergio') || member.name.includes('Sérgio')) {
              iconUrl = '/teamIMG/CEO.png';
            } else if (member.name.includes('Garcia')) {
              iconUrl = '/teamIMG/Designers.png';
            } else {
              iconUrl = undefined;
            }

            const scaleUpNames = ['Sergio Pinheiro', 'Sérgio Pinheiro'];
            const scaleDownNames: string[] = [];
            const shouldScaleAvatar = scaleUpNames.some((key) =>
              member.name.includes(key)
            );
            const shouldShrinkAvatar = scaleDownNames.some((key) =>
              member.name.includes(key)
            );

            return (
              <motion.div
                key={`team-${index}-${member.name.replace(/\s+/g, '-')}`}
                className="team-member-wrapper"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{
                  position: 'relative',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-start'
                }}
              >
                <ProfileCard
                  name={member.name}
                  title={member.role}
                  handle={handle}
                  status="Online"
                  contactText="LinkedIn"
                  avatarUrl={member.avatarUrl}
                  miniAvatarUrl={member.avatarUrl}
                  iconUrl={iconUrl}
                  avatarStyle={
                    shouldScaleAvatar
                      ? { transform: 'translateX(-50%) translateZ(0) scale(1.15)' }
                      : shouldShrinkAvatar
                        ? { transform: 'translateX(-50%) translateZ(0) scale(0.95)' }
                        : undefined
                  }
                  showUserInfo={true}
                  enableTilt={true}
                  enableMobileTilt={false}
                  onContactClick={() => {
                    if (linkedinUrl) {
                      window.open(linkedinUrl, '_blank', 'noopener,noreferrer');
                    }
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
