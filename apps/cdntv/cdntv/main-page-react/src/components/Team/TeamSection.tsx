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
      bio: "Sérgio the CEO and Founder of CDN and Co-Founder of Privant. He also works as an official cameraman for the European Commission and the Council of the European Union.",
      linkedin: "https://www.linkedin.com/in/sergio-pinheiro-cdntv?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      avatarUrl: "/teamIMG/Sérgio.png",
      iconUrl: undefined
    },
    {
      name: "Joana Fidalgo",
      role: "CFO / COO",
      bio: "Joana brings extensive experience in financial management and operations, ensuring CDNCORE's strategic growth and operational excellence. She oversees financial planning, business operations, and organizational development.",
      linkedin: "https://www.linkedin.com/in/joana-silva-aab83336/",
      avatarUrl: "/teamIMG/Joana.png",
      iconUrl: undefined
    },
    {
      name: "João Garcia",
      role: "CDO / UX Designer",
      bio: "João holds a Bachelor's Degree in Industrial Design, a Master's Degree in Videogame Design, and a PhD in Architecture. Has worked as a secondary school teacher and as a researcher.",
      linkedin: "https://www.linkedin.com/in/joaomrgarcia?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      avatarUrl: "/teamIMG/Garcia.png",
      iconUrl: undefined
    },
    {
      name: "Maria Sarrato",
      role: "Graphic Designer",
      bio: "Maria holds a Bachelor's Degree in Multimedia Design and a specialization in Communication and Web Technologies.",
      linkedin: "https://www.linkedin.com/in/maria-sarrato-8a6115207?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      avatarUrl: "/teamIMG/Maria.png",
      iconUrl: undefined
    },
    {
      name: "Matilde Nunes",
      role: "3D Designer",
      bio: "Matilde holds a degree in Design and Graphic Arts Technologies, currently pursuing a Master's in Digital Game Design and Development. She has experience as a teacher in plastic expression.",
      linkedin: "https://pt.linkedin.com/in/matilde-nunes-5a26b726a",
      avatarUrl: "/teamIMG/Matilde.png",
      iconUrl: undefined
    },
    {
      name: "Neuza Silvestre",
      role: "Graphic Designer",
      bio: "Neuza holds a degree in Multimedia Design. She has worked as a freelance graphic designer and is currently part of the CDNTV design team.",
      linkedin: "https://www.linkedin.com/in/neuza-silvestre-05a9b81b1/",
      avatarUrl: "/teamIMG/Neuza.png",
      iconUrl: undefined
    },
    {
      name: "João Calheiros",
      role: "3D Designer",
      bio: "João holds a degree in Equipment Design, currently pursuing a Master's in Industrial Design at UBI. Completed an internship at RSB Comunicação na Imagem and is now part of the CDNTV design team.",
      linkedin: "https://www.linkedin.com/in/jmgcalheiros",
      avatarUrl: "/teamIMG/João.png",
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
            } else if (member.name.includes('Joana')) {
              iconUrl = '/teamIMG/FinancialIMG.png';
            } else if (
              ['Maria', 'Neuza', 'Matilde', 'Garcia', 'Calheiros'].some((key) =>
                member.name.includes(key)
              )
            ) {
              iconUrl = '/teamIMG/Designers.png';
            } else {
              iconUrl = undefined;
            }

            const scaleUpNames = ['Sergio Pinheiro', 'Sérgio Pinheiro', 'Joana Fidalgo', 'Maria Sarrato'];
            const scaleDownNames = ['Matilde'];
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


