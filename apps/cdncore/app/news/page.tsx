import { getPublishedNews, toNewsArticle, generateNewsListMetadata } from '@cdn/news';
import { newsSeoConfig } from '@/lib/news-seo-config';
import NewsPage from '@/components/News/NewsPage';

export const dynamic = 'force-dynamic';

export function generateMetadata() {
    return generateNewsListMetadata(newsSeoConfig);
}

export default async function News() {
    const rows = await getPublishedNews('cdncore');
    const articles = rows.map(toNewsArticle);
    return <NewsPage articles={articles} />;
}
