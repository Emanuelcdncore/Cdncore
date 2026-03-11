/**
 * SITEMAP.TS TEMPLATE
 * ====================
 * Place this file at: app/sitemap.ts
 *
 * Next.js 16 will automatically serve this as /sitemap.xml
 * This generates a comprehensive sitemap with static and dynamic pages.
 */

import type { MetadataRoute } from 'next';
// import { siteConfig } from '@/lib/seo-config';
// import { getAllArticles } from '@/lib/articles';

const SITE_URL = 'https://example.com'; // Replace with siteConfig.siteUrl

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ===========================================
  // 1. Static pages
  // ===========================================
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/servicos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/politica-privacidade`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/termos-condicoes`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // ===========================================
  // 2. Dynamic blog/news pages
  // ===========================================
  // Replace with your actual data fetching logic
  // const articles = await getAllArticles();
  const articles: Array<{
    slug: string;
    publishedAt: string;
    modifiedAt?: string;
  }> = []; // placeholder

  const blogPages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/blog/${article.slug}`,
    lastModified: new Date(article.modifiedAt || article.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // ===========================================
  // 3. Blog category pages (optional)
  // ===========================================
  // import { siteConfig } from '@/lib/seo-config';
  const categories = [
    'categoria1',
    'categoria2',
  ]; // Replace with siteConfig.blog.categories

  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${SITE_URL}/blog/categoria/${encodeURIComponent(category.toLowerCase())}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // ===========================================
  // 4. Blog tag pages (optional)
  // ===========================================
  // Extract unique tags from all articles
  // const allTags = [...new Set(articles.flatMap((a) => a.tags))];
  // const tagPages = allTags.map((tag) => ({
  //   url: `${SITE_URL}/blog/tag/${encodeURIComponent(tag.toLowerCase())}`,
  //   lastModified: new Date(),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.5,
  // }));

  // ===========================================
  // 5. Service detail pages (optional)
  // ===========================================
  // const services = await getServices();
  // const servicePages = services.map((service) => ({
  //   url: `${SITE_URL}/servicos/${service.slug}`,
  //   lastModified: new Date(service.updatedAt),
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.8,
  // }));

  return [
    ...staticPages,
    ...blogPages,
    ...categoryPages,
    // ...tagPages,
    // ...servicePages,
  ];
}

/**
 * FOR LARGE SITES (>50,000 URLs):
 * Use multiple sitemaps with a sitemap index.
 *
 * Create app/sitemap/[id]/route.ts for split sitemaps:
 *
 * export async function generateSitemaps() {
 *   const totalArticles = await getArticleCount();
 *   const sitemapCount = Math.ceil(totalArticles / 50000);
 *   return Array.from({ length: sitemapCount }, (_, i) => ({ id: i }));
 * }
 *
 * export default async function sitemap({ id }: { id: number }) {
 *   const start = id * 50000;
 *   const articles = await getArticles({ start, limit: 50000 });
 *   return articles.map((article) => ({
 *     url: `${SITE_URL}/blog/${article.slug}`,
 *     lastModified: article.modifiedAt,
 *   }));
 * }
 */
