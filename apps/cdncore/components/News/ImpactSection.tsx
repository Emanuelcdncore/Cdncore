'use client';

import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

function Counter({ from, to, duration = 2, suffix = "" }: { from: number; to: number; duration?: number; suffix?: string }) {
    const nodeRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(nodeRef, { once: true, margin: "-100px" });
    const count = useMotionValue(from);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
        if (isInView) {
            animate(count, to, { duration, ease: "easeOut" });
        }
    }, [isInView, from, to, duration, count]);

    return (
        <span ref={nodeRef} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.span>{rounded}</motion.span>
            {suffix}
        </span>
    );
}

export function ImpactSection() {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSubmitted(true);
        setIsSubmitting(false);
        setEmail('');
        setTimeout(() => setIsSubmitted(false), 3000);
    };

    const stats = [
        { value: 500, suffix: "+", label: t('impact.stats.published_articles') },
        { value: 10, suffix: "K+", label: t('impact.stats.active_readers') },
        { value: 50, suffix: "+", label: t('impact.stats.connected_years') },
    ];

    return (
        <>
            {/* IMPACT STATS */}
            <div style={{ padding: '5rem 2rem', maxWidth: '1280px', margin: '0 auto' }}>
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    style={{ textAlign: 'center', marginBottom: '3rem' }}
                >
                    <h2
                        style={{
                            fontSize: 'clamp(1.875rem, 4vw, 3rem)',
                            fontWeight: 800,
                            color: 'rgba(255,255,255,0.95)',
                            marginBottom: '1rem',
                            fontFamily: "var(--font-depot), 'Inter', sans-serif",
                        }}
                    >
                        {t('impact.title')}
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.4)', maxWidth: '42rem', margin: '0 auto', lineHeight: 1.625 }}>
                        {t('impact.description')}
                    </p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', textAlign: 'center' }}>
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
                        >
                            <div
                                className="bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
                                style={{ fontSize: 'clamp(3rem, 5vw, 3.75rem)', fontWeight: 900, color: 'transparent', WebkitBackgroundClip: 'text', marginBottom: '0.75rem' }}
                            >
                                <Counter from={0} to={stat.value} suffix={stat.suffix} />
                            </div>
                            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500 }}>
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* NEWSLETTER */}
            <div style={{ padding: '0 2rem 5rem', maxWidth: '1280px', margin: '0 auto' }}>
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    style={{ textAlign: 'center' }}
                >
                    <h2
                        style={{
                            fontSize: 'clamp(1.5rem, 3vw, 1.875rem)',
                            fontWeight: 800,
                            color: 'rgba(255,255,255,0.95)',
                            marginBottom: '1rem',
                            fontFamily: "var(--font-depot), 'Inter', sans-serif",
                        }}
                    >
                        {t('impact.newsletter.title')}
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.4)', maxWidth: '36rem', margin: '0 auto 2rem', lineHeight: 1.625 }}>
                        {t('impact.newsletter.description')}
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', maxWidth: '28rem', margin: '0 auto', flexWrap: 'wrap' }}
                    >
                        <input
                            type="email"
                            placeholder={t('impact.newsletter.placeholder')}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                flex: 1,
                                minWidth: '200px',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: '0.5rem',
                                padding: '0.75rem 1.25rem',
                                color: '#fff',
                                fontSize: '0.875rem',
                                outline: 'none',
                            }}
                        />
                        <button
                            type="submit"
                            disabled={isSubmitting || isSubmitted}
                            style={{
                                padding: '0.75rem 1.5rem',
                                borderRadius: '0.5rem',
                                fontWeight: 600,
                                fontSize: '0.875rem',
                                transition: 'all 300ms',
                                background: isSubmitted ? 'rgba(34,197,94,0.2)' : 'rgba(168,85,247,0.2)',
                                color: isSubmitted ? 'rgb(134,239,172)' : 'rgb(196,181,253)',
                                border: isSubmitted ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(168,85,247,0.4)',
                                cursor: isSubmitting ? 'wait' : isSubmitted ? 'default' : 'pointer',
                            }}
                        >
                            {isSubmitted ? t('impact.newsletter.button_success') : isSubmitting ? t('impact.newsletter.button_sending') : t('impact.newsletter.button')}
                        </button>
                    </form>

                    <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem', marginTop: '1.5rem' }}>
                        {t('impact.newsletter.disclaimer')}
                    </p>
                </motion.div>
            </div>
        </>
    );
}
