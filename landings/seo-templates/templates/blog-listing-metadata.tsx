/**
 * BLOG LISTING PAGE METADATA TEMPLATE
 * =====================================
 * Use this in: app/blog/page.tsx (or app/noticias/page.tsx)
 *
 * Provides metadata for the blog index / listing page.
 * Includes pagination support for generateMetadata with searchParams.
 */

import type { Metadata } from 'next';
// import { siteConfig } from '@/lib/seo-config';

const SITE_URL = 'https://example.com';
const COMPANY_NAME = 'SITE_NAME';

interface PageProps {
  searchParams: Promise<{ page?: string; category?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { page, category } = await searchParams;
  const currentPage = page ? parseInt(page, 10) : 1;

  // Base title and description
  let title = `Blog & Noticias`;
  let description = `Últimas noticias, artigos e novidades da ${COMPANY_NAME}. Fique a par das tendências e projetos mais recentes.`;

  // Adjust for category filter
  if (category) {
    title = `${category} - Blog`;
    description = `Artigos sobre ${category} no blog da ${COMPANY_NAME}.`;
  }

  // Adjust for pagination
  if (currentPage > 1) {
    title = `${title} - Página ${currentPage}`;
  }

  const pageUrl = category
    ? `${SITE_URL}/blog?category=${encodeURIComponent(category)}${currentPage > 1 ? `&page=${currentPage}` : ''}`
    : `${SITE_URL}/blog${currentPage > 1 ? `?page=${currentPage}` : ''}`;

  return {
    title,
    description,

    openGraph: {
      type: 'website',
      title: `${title} | ${COMPANY_NAME}`,
      description,
      url: pageUrl,
      siteName: COMPANY_NAME,
      locale: 'pt_PT',
      images: [
        {
          url: '/opengraph-image.jpg',
          width: 1200,
          height: 630,
          alt: `${COMPANY_NAME} Blog`,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${COMPANY_NAME}`,
      description,
    },

    alternates: {
      canonical: `${SITE_URL}/blog${currentPage > 1 ? `?page=${currentPage}` : ''}`,
    },

    // Prevent indexing of paginated pages beyond page 1 (optional)
    ...(currentPage > 1
      ? {
          robots: {
            index: false,
            follow: true,
          },
        }
      : {}),
  };
}

/**
 * EXAMPLE: Blog listing page component with pagination SEO
 *
 * export default async function BlogPage({ searchParams }: PageProps) {
 *   const { page, category } = await searchParams;
 *   const currentPage = page ? parseInt(page, 10) : 1;
 *
 *   const { articles, totalPages } = await getArticles({
 *     page: currentPage,
 *     category,
 *     perPage: 12,
 *   });
 *
 *   return (
 *     <>
 *       <BreadcrumbSchema items={[
 *         { name: 'Inicio', url: siteConfig.siteUrl },
 *         { name: 'Blog', url: `${siteConfig.siteUrl}/blog` },
 *       ]} />
 *
 *       <section>
 *         <h1>Blog & Noticias</h1>
 *
 *         {-- Article grid --}
 *         <div>
 *           {articles.map((article) => (
 *             <article key={article.slug}>
 *               <a href={`/blog/${article.slug}`}>
 *                 <h2>{article.title}</h2>
 *                 <p>{article.excerpt}</p>
 *                 <time dateTime={article.publishedAt}>
 *                   {formatDatePT(article.publishedAt)}
 *                 </time>
 *               </a>
 *             </article>
 *           ))}
 *         </div>
 *
 *         {-- Pagination with rel="prev" and rel="next" via <link> --}
 *         <nav aria-label="Paginação">
 *           {currentPage > 1 && (
 *             <a href={`/blog?page=${currentPage - 1}`} rel="prev">Anterior</a>
 *           )}
 *           {currentPage < totalPages && (
 *             <a href={`/blog?page=${currentPage + 1}`} rel="next">Seguinte</a>
 *           )}
 *         </nav>
 *       </section>
 *     </>
 *   );
 * }
 */
