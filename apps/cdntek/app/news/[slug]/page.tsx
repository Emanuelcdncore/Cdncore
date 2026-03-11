import type { Metadata } from 'next';
import {
    getNewsBySlug,
    getPublishedNews,
    toNewsArticle,
    incrementViews,
    generateNewsArticleMetadata,
    buildArticleJsonLd,
    buildBreadcrumbJsonLd,
} from '@cdn/news';
import { newsSeoConfig } from '@/lib/news-seo-config';
import { NewsDetailClient } from './NewsDetailClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const row = await getNewsBySlug('cdntek', slug);
    if (!row) return { title: 'Artigo não encontrado' };

    const article = toNewsArticle(row);
    return generateNewsArticleMetadata(newsSeoConfig, article);
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const row = await getNewsBySlug('cdntek', slug);

    if (!row) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">Artigo não encontrado</h1>
                    <a href="/news" className="text-green-500 hover:text-green-400">Voltar às Notícias</a>
                </div>
            </div>
        );
    }

    await incrementViews(row.id);
    const article = toNewsArticle(row);

    const allRows = await getPublishedNews('cdntek');
    const allArticles = allRows.map(toNewsArticle);

    const articleJsonLd = buildArticleJsonLd(newsSeoConfig, article);
    const breadcrumbJsonLd = buildBreadcrumbJsonLd([
        { name: 'Home', url: newsSeoConfig.siteUrl },
        { name: 'Notícias', url: `${newsSeoConfig.siteUrl}/news` },
        { name: article.title, url: `${newsSeoConfig.siteUrl}/news/${article.slug}` },
    ]);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
            <NewsDetailClient article={article} allArticles={allArticles} />
        </>
    );
}
