'use client';

import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

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
        { value: 200, suffix: "+", label: "Projects Delivered" },
        { value: 15, suffix: "K+", label: "Hours of Content" },
        { value: 16, suffix: "+", label: "Years of Experience" },
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
                            fontFamily: "'Depot', 'Inter', sans-serif",
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                        }}
                    >
                        Our Impact
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.4)', maxWidth: '42rem', margin: '0 auto', lineHeight: 1.625 }}>
                        Numbers that demonstrate our commitment to delivering exceptional audiovisual experiences worldwide.
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
                                style={{
                                    fontSize: 'clamp(3rem, 5vw, 3.75rem)',
                                    fontWeight: 900,
                                    color: 'transparent',
                                    background: 'linear-gradient(90deg, #F28E12, #DA1D5D)',
                                    WebkitBackgroundClip: 'text',
                                    backgroundClip: 'text',
                                    marginBottom: '0.75rem',
                                }}
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
                            fontFamily: "'Depot', 'Inter', sans-serif",
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                        }}
                    >
                        Stay Updated
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.4)', maxWidth: '36rem', margin: '0 auto 2rem', lineHeight: 1.625 }}>
                        Subscribe to our newsletter and never miss the latest updates on audiovisual innovation.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', maxWidth: '28rem', margin: '0 auto', flexWrap: 'wrap' }}
                    >
                        <input
                            type="email"
                            placeholder="Enter your email"
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
                                background: isSubmitted ? 'rgba(34,197,94,0.2)' : 'linear-gradient(90deg, rgba(242,142,18,0.2), rgba(218,29,93,0.2))',
                                color: isSubmitted ? 'rgb(134,239,172)' : '#F28E12',
                                border: isSubmitted ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(242,142,18,0.4)',
                                cursor: isSubmitting ? 'wait' : isSubmitted ? 'default' : 'pointer',
                            }}
                        >
                            {isSubmitted ? '✓ Subscribed!' : isSubmitting ? 'Sending...' : 'Subscribe'}
                        </button>
                    </form>

                    <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem', marginTop: '1.5rem' }}>
                        We respect your privacy. Unsubscribe at any time.
                    </p>
                </motion.div>
            </div>
        </>
    );
}
