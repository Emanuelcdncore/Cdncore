'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { staggerContainer, staggerItem } from '@/utils/animations';
import MissionSection from './Commitments/MissionSection';
import TeamSection from './Commitments/TeamSection';
import CollaborationSection from './Commitments/CollaborationSection';
import EthicsSection from './Commitments/EthicsSection';
import CommitmentsCTA from './Commitments/CommitmentsCTA';
import Footer from './Footer';
import VantaDots from './Backgrounds/VantaDots';
import './css/CommitmentsPage.css';

const CommitmentsPage: React.FC = () => {
  const { t } = useTranslation();
  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0,
    triggerOnce: true
  });

  const containerVariants = staggerContainer;
  const itemVariants = staggerItem;

  return (
    <div className="commitments-page">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="hero finisher-header"
        id="hero"
        variants={containerVariants}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        transition={{ duration: 0.8, staggerChildren: 0.2 }}
      >
        {/* Hero Gradient Overlay */}
        <div className="hero-gradient-overlay"></div>

        {/* VANTA DOTS Background */}
        <VantaDots />

        <div className="hero-content">
          <motion.h1
            variants={itemVariants}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('commitments.hero_title')}
          </motion.h1>
          <motion.p
            variants={itemVariants}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('commitments.hero_subtitle')}
          </motion.p>
        </div>
        <div className="glow-separator"></div>
      </motion.section>

      {/* Mission Section */}
      <MissionSection />

      {/* Team Section */}
      <TeamSection />

      {/* Collaboration Section */}
      <CollaborationSection />

      {/* Ethics Section */}
      <EthicsSection />

      {/* CTA Section */}
      <CommitmentsCTA />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CommitmentsPage;
