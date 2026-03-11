'use client';

import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import type { NewsArticle } from "@cdn/news";

const detailGridCSS = `
.detail-grid { display: grid; grid-template-columns: 1fr; gap: 2.5rem; }
@media (min-width: 1024px) { .detail-grid { grid-template-columns: 1fr 320px; } }
.detail-sidebar { display: none; }
@media (min-width: 1024px) { .detail-sidebar { display: block; position: sticky; top: 1.5rem; align-self: start; } }
`;

export function NewsDetail({ article }: { article: NewsArticle }) {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#000' }}>
            <style dangerouslySetInnerHTML={{ __html: detailGridCSS }} />
            {/* Ambient background */}
            <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                <div style={{ position: 'absolute', top: 0, left: '25%', width: '500px', height: '500px', background: 'rgba(242,142,18,0.03)', borderRadius: '50%', filter: 'blur(150px)' }} />
                <div style={{ position: 'absolute', top: '33%', right: '25%', width: '600px', height: '600px', background: 'rgba(218,29,93,0.03)', borderRadius: '50%', filter: 'blur(150px)' }} />
            </div>

            {/* Back button */}
            <Link
                href="/news"
                style={{
                    position: 'fixed', top: '1.5rem', left: '1.5rem', zIndex: 50,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '40px', height: '40px',
                    background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '0.5rem', backdropFilter: 'blur(4px)',
                    textDecoration: 'none', color: 'rgba(255,255,255,0.7)',
                    transition: 'all 200ms',
                }}
            >
                <ArrowLeft style={{ width: '20px', height: '20px' }} />
            </Link>

            {/* Hero image */}
            <div style={{ position: 'relative', width: '100%', height: '55vh', minHeight: '360px', overflow: 'hidden' }}>
                <img
                    src={article.imageUrl}
                    alt={article.title}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', maxWidth: 'none', pointerEvents: 'auto' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.1) 50%, #000)' }} />
            </div>

            {/* Article content */}
            <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', marginTop: '-7rem' }}>
                <div className="detail-grid">
                    {/* Main article */}
                    <article style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '0.75rem', padding: 'clamp(2rem, 4vw, 3rem)' }}>
                        {/* Meta */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontWeight: 500, flexWrap: 'wrap' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Calendar style={{ width: '14px', height: '14px' }} />
                                <time dateTime={article.isoDate}>{article.date}</time>
                            </span>
                            <span style={{ color: 'rgba(255,255,255,0.15)' }}>&middot;</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Clock style={{ width: '14px', height: '14px' }} />
                                {article.readTime} read
                            </span>
                        </div>

                        {/* Title */}
                        <h1 style={{
                            fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
                            fontWeight: 800,
                            color: 'rgba(255,255,255,0.95)',
                            marginBottom: '2rem',
                            lineHeight: 1.15,
                            fontFamily: "'Depot', 'Inter', sans-serif",
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                        }}>
                            {article.title}
                        </h1>

                        {/* Lead */}
                        <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.6)', marginBottom: '2rem', lineHeight: 1.625, maxWidth: '65ch' }}>
                            {article.subtitle}
                        </p>

                        {/* Content */}
                        <div
                            className="prose prose-invert prose-lg"
                            style={{ maxWidth: '65ch', marginBottom: '3rem' }}
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />

                        {/* Back link */}
                        <div style={{ paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                            <Link
                                href="/news"
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                    textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500,
                                    background: 'linear-gradient(90deg, #F28E12, #DA1D5D)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}
                            >
                                <ArrowLeft style={{ width: '16px', height: '16px', color: '#F28E12' }} />
                                Back to News
                            </Link>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="detail-sidebar">
                        {/* Tags */}
                        <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '0.75rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>
                                Related Tags
                            </h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {(article.tags.length > 0 ? article.tags : ["Streaming", "Production", "Broadcast", "Innovation", "Media"]).map(tag => (
                                    <span
                                        key={tag}
                                        style={{
                                            padding: '0.375rem 0.75rem',
                                            background: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(255,255,255,0.06)',
                                            borderRadius: '0.5rem',
                                            color: 'rgba(255,255,255,0.5)',
                                            fontSize: '0.875rem',
                                        }}
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </aside>
                </div>
            </div>

            {/* Bottom spacing */}
            <div style={{ height: '5rem' }} />
        </div>
    );
}
