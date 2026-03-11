/**
 * ARTICLE SCHEMA COMPONENT
 * =========================
 * Place in: components/seo/article-schema.tsx
 *
 * Renders Schema.org NewsArticle / Article structured data as JSON-LD.
 * Use on individual blog/news article pages.
 *
 * Usage:
 *   import { ArticleSchema } from '@/components/seo/article-schema';
 *   <ArticleSchema article={article} siteUrl="https://example.com" companyName="SITE" />
 */

import type { ArticleSEO } from '../../configs/seo-config.types';

interface ArticleSchemaProps {
  article: ArticleSEO;
  siteUrl: string;
  companyName: string;
  /** Use 'NewsArticle' for news, 'BlogPosting' for blogs, 'Article' for generic */
  schemaType?: 'NewsArticle' | 'BlogPosting' | 'Article';
}

/**
 * Estimate reading time from content text
 */
function estimateReadingTime(content: string): number {
  const text = content.replace(/<[^>]*>/g, '');
  const wordCount = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

/**
 * Count words in content
 */
function countWords(content: string): number {
  const text = content.replace(/<[^>]*>/g, '');
  return text.trim().split(/\s+/).length;
}

export function ArticleSchema({
  article,
  siteUrl,
  companyName,
  schemaType = 'NewsArticle',
}: ArticleSchemaProps) {
  const articleUrl = `${siteUrl}/blog/${article.slug}`;
  const readingTime = estimateReadingTime(article.content);
  const wordCount = countWords(article.content);

  const schema = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    '@id': `${articleUrl}#article`,
    headline: article.title,
    name: article.title,
    description: article.description || article.excerpt,
    url: articleUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    datePublished: article.publishedAt,
    dateModified: article.modifiedAt || article.publishedAt,
    dateCreated: article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author.name,
      ...(article.author.url ? { url: article.author.url } : {}),
      ...(article.author.image
        ? {
            image: {
              '@type': 'ImageObject',
              url: article.author.image,
            },
          }
        : {}),
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: companyName,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
        width: 512,
        height: 512,
      },
    },
    ...(article.image
      ? {
          image: {
            '@type': 'ImageObject',
            url: article.image.url.startsWith('http')
              ? article.image.url
              : `${siteUrl}${article.image.url}`,
            width: article.image.width || 1200,
            height: article.image.height || 630,
            caption: article.image.alt,
          },
          thumbnailUrl: article.image.url.startsWith('http')
            ? article.image.url
            : `${siteUrl}${article.image.url}`,
        }
      : {
          image: {
            '@type': 'ImageObject',
            url: `${siteUrl}/blog/${article.slug}/opengraph-image`,
            width: 1200,
            height: 630,
          },
        }),
    articleSection: article.category,
    keywords: article.tags.join(', '),
    wordCount,
    timeRequired: `PT${readingTime}M`,
    inLanguage: article.locale || 'pt-PT',
    isAccessibleForFree: true,
    isPartOf: {
      '@type': 'Blog',
      '@id': `${siteUrl}/blog#blog`,
      name: `Blog ${companyName}`,
      url: `${siteUrl}/blog`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
    />
  );
}
