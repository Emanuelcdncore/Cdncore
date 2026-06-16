'use client';

import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import TextType from './TextType';
import { ScrollReveal } from './ScrollReveal/ScrollReveal';
import { useScrollBatch } from './ScrollReveal/useScrollBatch';
import { GlassCard } from './Glass/GlassCard';
import './css/FAQ.css';

const FAQ: React.FC = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useScrollBatch(listRef, {
    selector: '.faq-item',
    mode: 'fade',
    stagger: 0.1,
  });

  const faqItems = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
  ];

  return (
    <section className="faq-section section-padding">
      <div className="container">
        <div className="faq-container">
          <div className="faq-title">
            <ScrollReveal width="100%" variant="fade">
              <h2 className="section-title">
                <TextType
                  sentences={[
                    t('faq.label', 'Frequently Asked Questions'),
                    t('faq.heading1', 'Got Questions?'),
                    t('faq.heading2', 'We Have Answers'),
                  ]}
                  typingSpeed={40}
                  deletingSpeed={25}
                  pauseTime={3000}
                />
              </h2>
            </ScrollReveal>
          </div>
          <GlassCard
            variant="inset"
            glow="neutral"
            interactive={false}
            padding="lg"
            border="subtle"
            className="faq-glass-panel"
          >
            <div ref={listRef}>
              {faqItems.map((item, i) => (
                <div
                  key={i}
                  className="faq-item"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <div className="faq-question">
                    <span>{item.q}</span>
                    <ChevronDown
                      style={{
                        transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    />
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
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
