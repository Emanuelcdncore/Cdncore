'use client';

import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import type { NewsArticle } from "@cdn/news";

const detailGridCSS = `
.news-detail-grid { display: grid; grid-template-columns: 1fr; gap: 2.5rem; }
@media (min-width: 1024px) { .news-detail-grid { grid-template-columns: 1fr 350px; } }
.news-detail-sidebar { display: none; }
@media (min-width: 1024px) { .news-detail-sidebar { display: block; position: sticky; top: 6rem; align-self: start; } }
`;

export function NewsDetail({ article, allArticles }: { article: NewsArticle; allArticles: NewsArticle[] }) {
    const relatedNews = allArticles
        .filter(n => n.slug !== article.slug)
        .slice(0, 3);

    return (
        <div className="min-h-screen bg-black">
            <style dangerouslySetInnerHTML={{ __html: detailGridCSS }} />

            {/* Back button */}
            <Link
                href="/news"
                className="fixed top-24 left-6 z-40 flex items-center justify-center w-10 h-10 bg-zinc-900/95 hover:bg-green-600 border border-white/20 hover:border-green-600 rounded-lg transition-all group backdrop-blur-sm shadow-xl"
                style={{ textDecoration: 'none' }}
            >
                <ArrowLeft className="w-5 h-5 text-white group-hover:text-black transition-colors" />
            </Link>

            {/* Hero image */}
            <div className="relative w-full overflow-hidden" style={{ height: '55vh', minHeight: '360px' }}>
                <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ maxWidth: 'none' }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black" />
            </div>

            {/* Article content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6" style={{ marginTop: '-7rem' }}>
                <div className="news-detail-grid">
                    {/* Main article */}
                    <article className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8 md:p-12">
                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                            <span className="flex items-center gap-2 text-gray-400">
                                <Calendar className="w-4 h-4" />
                                <time dateTime={article.isoDate}>{article.date}</time>
                            </span>
                            {article.readTime && (
                                <>
                                    <span className="text-gray-600">&bull;</span>
                                    <span className="flex items-center gap-2 text-gray-400">
                                        <Clock className="w-4 h-4" />
                                        {article.readTime} de leitura
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className="mb-6 uppercase tracking-wide text-3xl md:text-5xl text-white font-bold"
                            style={{ fontFamily: "'Depot', 'Inter', sans-serif", lineHeight: 1.15 }}
                        >
                            {article.title}
                        </h1>

                        {/* Lead */}
                        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                            {article.subtitle}
                        </p>

                        {/* Content */}
                        <div
                            className="prose prose-invert prose-lg max-w-none"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                            style={{ lineHeight: '1.8' }}
                        />

                        {/* Back link */}
                        <div className="mt-12 pt-8 border-t border-white/10">
                            <Link
                                href="/news"
                                className="inline-flex items-center gap-2 text-green-500 hover:text-green-400 transition-colors text-sm font-medium"
                                style={{ textDecoration: 'none' }}
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Voltar às Notícias
                            </Link>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="news-detail-sidebar space-y-6">
                        {/* Related News */}
                        {relatedNews.length > 0 && (
                            <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-6">
                                <h3 className="uppercase text-sm mb-4 text-green-500 font-bold">
                                    Notícias Relacionadas
                                </h3>
                                <div className="space-y-4">
                                    {relatedNews.map((related) => (
                                        <Link
                                            key={related.slug}
                                            href={`/news/${related.slug}`}
                                            className="block group"
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <div className="flex gap-3">
                                                <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden relative border border-white/10 group-hover:border-green-500/50 transition-all">
                                                    <img
                                                        src={related.imageUrl}
                                                        alt=""
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                </div>
                                                <div className="flex-1 space-y-2 min-w-0">
                                                    <h4 className="text-white text-sm group-hover:text-green-500 transition-colors line-clamp-2">
                                                        {related.title}
                                                    </h4>
                                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                                        <Calendar className="w-3 h-3" />
                                                        <span>{related.date}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tags */}
                        <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-6">
                            <h3 className="uppercase text-sm mb-4 text-green-500 font-bold">
                                Tags Relacionadas
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {(article.tags.length > 0 ? article.tags : ["IA", "Tecnologia", "Digital", "Inovação", "Negócios", "Design"]).map(tag => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-full text-white/50"
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
            <div className="h-20" />
        </div>
    );
}
