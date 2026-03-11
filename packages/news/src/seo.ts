import type { NewsArticle } from './types';

export interface NewsSiteConfig {
  companyName: string;
  siteUrl: string;
  locale: string;
  defaultAuthor: { name: string; url: string };
  news: { title: string; description: string };
  defaultOgImage: string;
}

export function generateNewsListMetadata(config: NewsSiteConfig) {
  const url = `${config.siteUrl}/news`;
  return {
    title: config.news.title,
    description: config.news.description,
    alternates: { canonical: url },
    openGraph: {
      title: config.news.title,
      description: config.news.description,
      url,
      siteName: config.companyName,
      locale: config.locale,
      type: 'website',
      images: [config.defaultOgImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.news.title,
      description: config.news.description,
      images: [config.defaultOgImage],
    },
  };
}

export function generateNewsArticleMetadata(
  config: NewsSiteConfig,
  article: NewsArticle,
) {
  const url = `${config.siteUrl}/news/${article.slug}`;
  const image = article.imageUrl || config.defaultOgImage;
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    keywords: article.tags,
    alternates: { canonical: url },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      url,
      siteName: config.companyName,
      locale: config.locale,
      type: 'article',
      publishedTime: article.isoDate,
      tags: article.tags,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.metaTitle,
      description: article.metaDescription,
      images: [image],
    },
  };
}

export function buildArticleJsonLd(
  config: NewsSiteConfig,
  article: NewsArticle,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.metaTitle,
    description: article.metaDescription,
    image: article.imageUrl || config.defaultOgImage,
    datePublished: article.isoDate,
    author: {
      '@type': 'Person',
      name: config.defaultAuthor.name,
      url: config.defaultAuthor.url,
    },
    publisher: {
      '@type': 'Organization',
      name: config.companyName,
      url: config.siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${config.siteUrl}/news/${article.slug}`,
    },
  };
}

export function buildBreadcrumbJsonLd(
  items: { name: string; url: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
