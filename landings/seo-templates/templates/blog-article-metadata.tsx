/**
 * BLOG / NEWS ARTICLE METADATA TEMPLATE
 * =======================================
 * Use this in: app/blog/[slug]/page.tsx or app/noticias/[slug]/page.tsx
 *
 * This template provides:
 * - generateMetadata() for dynamic article pages
 * - Full Open Graph article tags
 * - Twitter card for articles
 * - Canonical URLs
 * - Reading time estimation
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
// import { siteConfig } from '@/lib/seo-config';
// import { getArticleBySlug, getAllArticleSlugs } from '@/lib/articles';
// import { ArticleSchema, BreadcrumbSchema } from '@/components/seo/schemas';

// ============================================================
// Type definitions (use from seo-config.types.ts in production)
// ============================================================
interface Article {
  title: string;
  slug: string;
  description: string;
  content: string;
  excerpt?: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    url?: string;
    image?: string;
  };
  publishedAt: string;
  modifiedAt?: string;
  image?: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
}

// ============================================================
// Utility: Reading Time Estimation
// ============================================================
export function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

/**
 * Strip HTML tags from content for word counting
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

// ============================================================
// generateStaticParams - for SSG of blog posts
// ============================================================
// export async function generateStaticParams() {
//   const slugs = await getAllArticleSlugs();
//   return slugs.map((slug) => ({ slug }));
// }

// ============================================================
// generateMetadata - Dynamic metadata for each article
// ============================================================

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  // Replace with your data fetching logic
  // const article = await getArticleBySlug(slug);
  const article: Article | null = null; // placeholder

  if (!article) {
    return {
      title: 'Artigo não encontrado',
      description: 'O artigo que procura não foi encontrado.',
      robots: { index: false, follow: false },
    };
  }

  const siteUrl = 'https://example.com'; // Replace with siteConfig.siteUrl
  const companyName = 'SITE_NAME'; // Replace with siteConfig.companyName
  const articleUrl = `${siteUrl}/blog/${slug}`;
  const readingTime = estimateReadingTime(stripHtml(article.content));

  return {
    title: article.title,
    description: article.description || article.excerpt,

    // Article-specific keywords: combine article tags with site keywords
    keywords: [...article.tags, article.category],

    // Authors
    authors: [{ name: article.author.name, url: article.author.url }],

    // Open Graph - Article type
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description,
      url: articleUrl,
      siteName: companyName,
      locale: 'pt_PT',
      images: article.image
        ? [
            {
              url: article.image.url,
              width: article.image.width || 1200,
              height: article.image.height || 630,
              alt: article.image.alt,
              type: 'image/jpeg',
            },
          ]
        : [
            {
              // Falls back to dynamic OG image route
              url: `/blog/${slug}/opengraph-image`,
              width: 1200,
              height: 630,
              alt: article.title,
              type: 'image/png',
            },
          ],
      // Article-specific Open Graph tags
      publishedTime: article.publishedAt,
      modifiedTime: article.modifiedAt || article.publishedAt,
      authors: [article.author.name],
      section: article.category,
      tags: article.tags,
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: article.image
        ? [article.image.url]
        : [`/blog/${slug}/opengraph-image`],
    },

    // Canonical URL
    alternates: {
      canonical: articleUrl,
      languages: {
        'pt-PT': articleUrl,
        // 'en': `${siteUrl}/en/blog/${slug}`,
      },
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Additional meta tags
    other: {
      'article:reading_time': `${readingTime} min`,
    },
  };
}

// ============================================================
// Page Component with JSON-LD
// ============================================================

/**
 * EXAMPLE PAGE COMPONENT:
 *
 * export default async function ArticlePage({ params }: PageProps) {
 *   const { slug } = await params;
 *   const article = await getArticleBySlug(slug);
 *
 *   if (!article) notFound();
 *
 *   const readingTime = estimateReadingTime(stripHtml(article.content));
 *
 *   return (
 *     <>
 *       <ArticleSchema article={article} siteUrl={siteConfig.siteUrl} />
 *       <BreadcrumbSchema
 *         items={[
 *           { name: 'Início', url: siteConfig.siteUrl },
 *           { name: 'Blog', url: `${siteConfig.siteUrl}/blog` },
 *           { name: article.title, url: `${siteConfig.siteUrl}/blog/${slug}` },
 *         ]}
 *       />
 *
 *       <article itemScope itemType="https://schema.org/NewsArticle">
 *         <header>
 *           <h1 itemProp="headline">{article.title}</h1>
 *           <div className="meta">
 *             <time dateTime={article.publishedAt} itemProp="datePublished">
 *               {new Date(article.publishedAt).toLocaleDateString('pt-PT')}
 *             </time>
 *             <span>{readingTime} min de leitura</span>
 *             <span itemProp="articleSection">{article.category}</span>
 *             <address itemProp="author" itemScope itemType="https://schema.org/Person">
 *               <span itemProp="name">{article.author.name}</span>
 *             </address>
 *           </div>
 *         </header>
 *
 *         {article.image && (
 *           <figure>
 *             <img
 *               src={article.image.url}
 *               alt={article.image.alt}
 *               width={article.image.width}
 *               height={article.image.height}
 *               itemProp="image"
 *             />
 *           </figure>
 *         )}
 *
 *         <div
 *           itemProp="articleBody"
 *           dangerouslySetInnerHTML={{ __html: article.content }}
 *         />
 *
 *         <footer>
 *           <ul>
 *             {article.tags.map((tag) => (
 *               <li key={tag}>
 *                 <a href={`/blog/tag/${tag}`} rel="tag">{tag}</a>
 *               </li>
 *             ))}
 *           </ul>
 *         </footer>
 *       </article>
 *     </>
 *   );
 * }
 */
