'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import TextType from './TextType';
import { Reveal } from './Reveal';
import './css/FAQ.css';

const faqItems = [
  { q: 'What services does CDNCore offer?', a: 'CDNCore provides comprehensive technology solutions including cybersecurity, AI & intelligent automation, big data analytics, advanced R&D, robotics, and full-stack software development.' },
  { q: 'How does CDNCore approach cybersecurity?', a: 'We employ a multi-layered defense strategy including penetration testing, server hardening, DDoS protection, firewall configuration, and continuous monitoring to safeguard your digital infrastructure.' },
  { q: 'Can CDNCore integrate AI into existing systems?', a: 'Absolutely. We specialize in deploying custom AI solutions that seamlessly integrate with your existing infrastructure, from smart business assistants to workflow automation and NLP services.' },
  { q: 'What industries does CDNCore serve?', a: 'We serve diverse industries including finance, insurance, healthcare, telecommunications, and enterprise technology, delivering tailored solutions for each sector\'s unique challenges.' }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="faq-section section-padding">
      <div className="container">
        <div className="faq-container">
          <div className="faq-title">
            <Reveal width="100%" duration={0.8} variant="blur">
              <h2 className="section-title">
                <TextType sentences={['Frequently Asked Questions', 'Got Questions?', 'We Have Answers']} typingSpeed={40} deletingSpeed={25} pauseTime={3000} />
              </h2>
            </Reveal>
          </div>
          {faqItems.map((item, i) => (
            <Reveal key={i} width="100%" duration={0.5} delay={0.1 * i} variant="fade">
              <div className="faq-item" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                <div className="faq-question">
                  <span>{item.q}</span>
                  <ChevronDown style={{ transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </div>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      className="faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
