'use client';

import { useState, useEffect, useRef } from 'react';
import { Mail } from 'lucide-react';

function Counter({ from, to, duration = 2000, suffix = "" }: { from: number; to: number; duration?: number; suffix?: string }) {
    const [count, setCount] = useState(from);
    const ref = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    const steps = 60;
                    const increment = (to - from) / steps;
                    let current = from;
                    let step = 0;
                    const interval = setInterval(() => {
                        step++;
                        current += increment;
                        setCount(Math.round(current));
                        if (step >= steps) {
                            setCount(to);
                            clearInterval(interval);
                        }
                    }, duration / steps);
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [from, to, duration]);

    return (
        <div ref={ref} className="text-gradient" style={{ fontSize: 'clamp(3rem, 5vw, 3.75rem)', fontWeight: 900 }}>
            {count}{suffix}
        </div>
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
        { value: 500, suffix: "+", label: "Artigos Publicados" },
        { value: 10, suffix: "K+", label: "Leitores Ativos" },
        { value: 16, suffix: "+", label: "Anos de Experiência" },
    ];

    return (
        <>
            {/* IMPACT STATS */}
            <div className="py-20 px-8 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4"
                        style={{ fontFamily: "'Depot', 'Inter', sans-serif" }}
                    >
                        O NOSSO IMPACTO
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Números que demonstram o nosso compromisso com a inovação e excelência tecnológica.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {stats.map((stat, i) => (
                        <div key={i} className="glass rounded-lg p-8">
                            <Counter from={0} to={stat.value} suffix={stat.suffix} />
                            <div className="text-gray-400 text-xs uppercase tracking-widest mt-2 font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* NEWSLETTER */}
            <section className="border-t border-white/10 bg-zinc-900/30">
                <div className="max-w-7xl mx-auto px-6 py-16">
                    <div className="max-w-2xl mx-auto text-center">
                        <Mail className="w-12 h-12 text-green-500 mx-auto mb-4" />
                        <h2 className="text-3xl font-bold mb-3 uppercase"
                            style={{ fontFamily: "'Depot', 'Inter', sans-serif" }}
                        >
                            Receba as Últimas Notícias
                        </h2>
                        <p className="text-gray-400 mb-8 text-sm">
                            Inscreva-se na nossa newsletter para receber atualizações sobre as novidades mais importantes do setor.
                        </p>
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                        >
                            <input
                                type="email"
                                placeholder="seu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="flex-1 px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-green-500 transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting || isSubmitted}
                                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                                    isSubmitted
                                        ? 'bg-green-600/20 text-green-400 border border-green-600/50'
                                        : 'bg-green-600 text-white hover:bg-green-700'
                                }`}
                            >
                                {isSubmitted ? '✓ Inscrito!' : isSubmitting ? 'Enviando...' : 'Inscrever'}
                            </button>
                        </form>
                        <p className="text-gray-600 text-xs mt-4">
                            Respeitamos a sua privacidade. Cancele a inscrição a qualquer momento.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
