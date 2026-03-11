import type { Metadata } from 'next';
import {
    getNewsBySlug,
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
    const row = await getNewsBySlug('cdntv', slug);
    if (!row) return { title: 'Article not found' };

    const article = toNewsArticle(row);
    return generateNewsArticleMetadata(newsSeoConfig, article);
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const row = await getNewsBySlug('cdntv', slug);

    if (!row) {
        return (
            <div style={{ minHeight: '100vh', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>Article not found</h1>
                    <a href="/news" style={{
                        background: 'linear-gradient(90deg, #F28E12, #DA1D5D)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}>Back to News</a>
                </div>
            </div>
        );
    }

    await incrementViews(row.id);
    const article = toNewsArticle(row);

    const articleJsonLd = buildArticleJsonLd(newsSeoConfig, article);
    const breadcrumbJsonLd = buildBreadcrumbJsonLd([
        { name: 'Home', url: newsSeoConfig.siteUrl },
        { name: 'News', url: `${newsSeoConfig.siteUrl}/news` },
        { name: article.title, url: `${newsSeoConfig.siteUrl}/news/${article.slug}` },
    ]);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
            <NewsDetailClient article={article} />
        </>
    );
}
