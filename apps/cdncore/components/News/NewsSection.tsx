'use client';

import Link from "next/link";
import { useTranslation } from 'react-i18next';
import { NewsCard } from "./NewsCard";
import type { NewsArticle } from "@cdn/news";

export function NewsSection({ articles }: { articles: NewsArticle[] }) {
    const { t } = useTranslation();
    const heroArticle = articles[0];
    const gridArticles = articles;

    if (articles.length === 0) {
        return (
            <div style={{
                backgroundColor: '#0c0c14',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                padding: '4rem 2rem',
            }}>
                <p style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.3)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                }}>
                    CDNCore News
                </p>
                <h2 style={{
                    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                    fontWeight: 900,
                    color: 'rgba(255,255,255,0.85)',
                    textAlign: 'center',
                    fontFamily: "var(--font-depot), 'Inter', sans-serif",
                }}>
                    {t('news.coming_soon_title')}
                </h2>
                <p style={{
                    fontSize: '1rem',
                    color: 'rgba(255,255,255,0.4)',
                    textAlign: 'center',
                    maxWidth: '28rem',
                    lineHeight: 1.7,
                }}>
                    {t('news.coming_soon_desc')}
                </p>
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: '#0c0c14', minHeight: '100vh' }}>
            {/* ===== HERO ===== */}
            {heroArticle && (
                <Link
                    href={`/news/${heroArticle.slug}`}
                    style={{
                        display: 'block',
                        position: 'relative',
                        width: '100%',
                        height: '60vh',
                        minHeight: '400px',
                        maxHeight: '600px',
                        overflow: 'hidden',
                        textDecoration: 'none',
                        color: 'inherit',
                    }}
                    className="group"
                >
                    {/* Hero image */}
                    <img
                        src={heroArticle.imageUrl}
                        alt={heroArticle.title}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            maxWidth: 'none',
                            transition: 'transform 700ms ease',
                        }}
                        className="group-hover:scale-[1.02]"
                    />
                    {/* Gradient overlay */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, #0c0c14, rgba(12,12,20,0.6) 50%, transparent)',
                        }}
                    />
                    {/* Text content at bottom */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            zIndex: 10,
                            padding: '0 2rem 3rem',
                        }}
                    >
                        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                            <h1
                                style={{
                                    fontSize: 'clamp(1.875rem, 4vw, 3rem)',
                                    fontWeight: 900,
                                    color: 'rgba(255,255,255,0.95)',
                                    lineHeight: 1.1,
                                    maxWidth: '56rem',
                                    marginBottom: '1rem',
                                    fontFamily: "var(--font-depot), 'Inter', sans-serif",
                                }}
                            >
                                {heroArticle.title}
                            </h1>
                            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.125rem', maxWidth: '28rem', lineHeight: 1.625, marginBottom: '1rem' }}>
                                {heroArticle.subtitle}
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: 500 }}>
                                <span>{heroArticle.date}</span>
                                <span style={{ color: 'rgba(255,255,255,0.2)' }}>&middot;</span>
                                <span>{heroArticle.readTime} read</span>
                            </div>
                        </div>
                    </div>
                </Link>
            )}

            {/* ===== DIVIDER ===== */}
            <div style={{ padding: '0 2rem' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)' }} />
                </div>
            </div>

            {/* ===== ARTICLES GRID ===== */}
            <div style={{ padding: '4rem 2rem' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2rem', textAlign: 'center' }}>
                        Latest Articles
                    </p>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: articles.length === 1 ? '1fr' : 'repeat(auto-fill, minmax(340px, 1fr))',
                            gap: '1.5rem',
                            maxWidth: articles.length === 1 ? '420px' : 'none',
                            margin: '0 auto',
                        }}
                    >
                        {gridArticles.map((news) => (
                            <NewsCard
                                key={news.slug}
                                slug={news.slug}
                                title={news.title}
                                subtitle={news.subtitle}
                                date={news.date}
                                imageUrl={news.imageUrl}
                                readTime={news.readTime}
                                featured
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
