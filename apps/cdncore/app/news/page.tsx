import { getPublishedNews, toNewsArticle, generateNewsListMetadata } from '@cdn/news';
import { newsSeoConfig } from '@/lib/news-seo-config';
import NewsPage from '@/components/News/NewsPage';

export const dynamic = 'force-dynamic';

export function generateMetadata() {
    return generateNewsListMetadata(newsSeoConfig);
}

export default async function News() {
    let articles: ReturnType<typeof toNewsArticle>[] = [];
    try {
        const rows = await getPublishedNews('cdncore');
        articles = rows.map(toNewsArticle);
    } catch {
        // DB unavailable locally — render empty state
    }
    return <NewsPage articles={articles} />;
}
