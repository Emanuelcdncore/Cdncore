import type { MetadataRoute } from 'next';
import { getPublishedNews } from '@cdn/news';

export const dynamic = 'force-dynamic';

const SITE_URL = 'https://cdncore.pt';

const staticPages = [
  '/',
  '/news',
  '/commitments',
  '/contact',
  '/privacy-policy',
  '/cookies-policy',
  '/terms-of-service',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rows = await getPublishedNews('cdncore');

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === '/news' ? 'daily' : 'monthly',
    priority: path === '/' ? 1 : 0.8,
  }));

  const newsEntries: MetadataRoute.Sitemap = rows.map((row) => ({
    url: `${SITE_URL}/news/${row.slug}`,
    lastModified: row.updated_at,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...staticEntries, ...newsEntries];
}
