'use client';

import Link from "next/link";
import { NewsCardLink } from "./NewsCard";
import type { NewsArticle } from "@cdn/news";

export function NewsSection({ articles }: { articles: NewsArticle[] }) {
    const heroArticle = articles[0];
    const gridArticles = articles;

    return (
        <div className="min-h-screen bg-black">
            {/* HERO */}
            {heroArticle && (
                <Link
                    href={`/news/${heroArticle.slug}`}
                    className="group block relative w-full overflow-hidden"
                    style={{
                        height: '60vh',
                        minHeight: '400px',
                        maxHeight: '600px',
                        textDecoration: 'none',
                        color: 'inherit',
                    }}
                >
                    <img
                        src={heroArticle.imageUrl}
                        alt={heroArticle.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                        style={{ maxWidth: 'none' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 z-10 p-8 pb-12">
                        <div className="max-w-7xl mx-auto">
                            <h1 className="text-3xl md:text-5xl font-bold text-white/95 leading-tight max-w-4xl mb-3 uppercase tracking-wide"
                                style={{ fontFamily: "'Depot', 'Inter', sans-serif" }}
                            >
                                {heroArticle.title}
                            </h1>
                            <p className="text-white/60 text-lg max-w-xl leading-relaxed mb-3">
                                {heroArticle.subtitle}
                            </p>
                            <div className="flex items-center gap-3 text-white/40 text-sm">
                                <span>{heroArticle.date}</span>
                                <span className="text-white/20">&middot;</span>
                                <span>{heroArticle.readTime} de leitura</span>
                            </div>
                        </div>
                    </div>
                </Link>
            )}

            {/* DIVIDER */}
            <div className="px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
                </div>
            </div>

            {/* ARTICLES GRID */}
            <div className="px-8 py-16">
                <div className="max-w-7xl mx-auto">
                    <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-8 text-center">
                        Últimos Artigos
                    </p>
                    <div
                        className="grid gap-6"
                        style={{
                            gridTemplateColumns: articles.length === 1 ? '1fr' : 'repeat(auto-fill, minmax(340px, 1fr))',
                            maxWidth: articles.length === 1 ? '420px' : 'none',
                            margin: '0 auto',
                        }}
                    >
                        {gridArticles.map((news) => (
                            <NewsCardLink
                                key={news.slug}
                                slug={news.slug}
                                title={news.title}
                                subtitle={news.subtitle}
                                imageUrl={news.imageUrl}
                                date={news.date}
                                readTime={news.readTime}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
