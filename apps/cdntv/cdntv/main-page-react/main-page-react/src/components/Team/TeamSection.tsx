'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ProfileCard from './ProfileCard';
import './css/TeamSection.css';

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
      avatarUrl: "/av1.jpg",
      iconUrl: undefined
    },
    {
      name: "Joana Fidalgo",
      role: "CFO/COO",
      bio: "Joana brings extensive experience in financial management and operations, ensuring CDNCORE's strategic growth and operational excellence. She oversees financial planning, business operations, and organizational development.",
      linkedin: "https://www.linkedin.com/in/joana-fidalgo",
      avatarUrl: "/av2.png",
      iconUrl: undefined
    },
    {
      name: "Dr. Daniel Silvestre",
      role: "CO-CTO/Founder",
      bio: "Daniel holds a Bachelor's Degree in Electrical and Computer Engineering, with an Integrated Master's degree, and a PhD, along with a Master's in Renewable Energy Engineering.",
      linkedin: "https://www.linkedin.com/in/dsilvestre/",
      avatarUrl: "/av3.jpg",
      iconUrl: undefined
    },
    {
      name: "Dr. Mehran Pourvahab",
      role: "CO-CTO/R&D",
      bio: "Mehran, IEEE Sr. Member, holds a Ph.D. in Computer Eng. As a R&D, bringing expertise in AI, ML, Cyber Security, Cloud Security, and Data Science.",
      linkedin: "https://www.linkedin.com/in/mehran-pourvahab/",
      avatarUrl: "/av4.jpg",
      iconUrl: undefined
    },
    {
      name: "João Garcia",
      role: "CDO/UX Designer",
      bio: "João holds a Bachelor's Degree in Industrial Design, a Master's Degree in Videogame Design, and a PhD in Architecture. Has worked as a secondary school teacher and as a researcher.",
      linkedin: "https://www.linkedin.com/in/joaomrgarcia?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      avatarUrl: "/av5.png",
      iconUrl: undefined
    },
    {
      name: "Maria Sarrato",
      role: "Graphic Designer",
      bio: "Maria holds a Bachelor's Degree in Multimedia Design and a specialization in Communication and Web Technologies.",
      linkedin: "https://www.linkedin.com/in/maria-sarrato-8a6115207?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      avatarUrl: "/av6.jpg",
      iconUrl: undefined
    },
    {
      name: "Matilde Nunes",
      role: "3D Designer",
      bio: "Matilde holds a degree in Design and Graphic Arts Technologies, currently pursuing a Master's in Digital Game Design and Development. She has experience as a teacher in plastic expression.",
      linkedin: "https://pt.linkedin.com/in/matilde-nunes-5a26b726a",
      avatarUrl: "/av1.jpg",
      iconUrl: undefined
    },
    {
      name: "Neuza Silvestre",
      role: "Graphic Designer",
      bio: "Neuza holds a degree in Multimedia Design. She has worked as a freelance graphic designer and is currently part of the CDNTV design team.",
      linkedin: "https://www.linkedin.com/in/neuza-silvestre-05a9b81b1/",
      avatarUrl: "/av2.png",
      iconUrl: undefined
    },
    {
      name: "João Calheiros",
      role: "3D Designer",
      bio: "João holds a degree in Equipment Design, currently pursuing a Master's in Industrial Design at UBI. Completed an internship at RSB Comunicação na Imagem and is now part of the CDNTV design team.",
      linkedin: "https://www.linkedin.com/in/jmgcalheiros",
      avatarUrl: "/av3.jpg",
      iconUrl: undefined
    },
    {
      name: "Guilherme Poeta",
      role: "Software Engineer",
      bio: "Guilherme holds a Bachelor's Degree in Web Informatics and a Master's Degree in Computer Science with a specialization in AI. Previously worked as an Junior Python Developer at Phillip Morris International.",
      linkedin: "https://www.linkedin.com/in/guilherme-fernandes-5b6a6913b/",
      avatarUrl: "/av4.jpg",
      iconUrl: undefined
    },
    {
      name: "Furtunato Tito",
      role: "Software Engineer",
      bio: "Furtunato holds a degree in Web, Mobile, and Cloud Computing. Specialized in server-side programming and data mining and gained research experience at Cyiente, focusing on anomaly detection in KPI time series.",
      linkedin: "https://linkedin.com/in/your-linkedin-url",
      avatarUrl: "/av5.png",
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
                  status="Available"
                  contactText="LinkedIn"
                  avatarUrl={member.avatarUrl}
                  miniAvatarUrl={member.avatarUrl}
                  iconUrl={member.iconUrl}
                  showUserInfo={true}
                  enableTilt={true}
                  enableMobileTilt={false}
                  onContactClick={() => {
                    if (linkedinUrl && linkedinUrl !== 'https://linkedin.com/in/your-linkedin-url') {
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


