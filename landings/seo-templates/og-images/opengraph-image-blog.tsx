/**
 * DYNAMIC OG IMAGE FOR BLOG POSTS
 * =================================
 * Place this file at: app/blog/[slug]/opengraph-image.tsx
 *
 * Next.js 16 automatically generates Open Graph images from this route.
 * Each blog post gets a unique, branded OG image with:
 * - Article title
 * - Category badge
 * - Publication date
 * - Company branding
 * - Reading time
 *
 * Requirements:
 * - next/og (ImageResponse) - included in Next.js
 *
 * IMPORTANT: Also create twitter-image.tsx with the same content but
 * different dimensions (see twitter-image-blog.tsx template).
 */

import { ImageResponse } from 'next/og';
// import { siteConfig } from '@/lib/seo-config';
// import { getArticleBySlug } from '@/lib/articles';

// ============================================================
// OG Image Configuration
// ============================================================
export const alt = 'Article image';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const runtime = 'edge'; // Use edge runtime for performance

// ============================================================
// CUSTOMIZE THESE PER SITE
// ============================================================
const BRAND = {
  // CDNTV:
  // name: 'CDNTV',
  // primaryColor: '#e63946',
  // secondaryColor: '#1d3557',
  // gradientFrom: '#e63946',
  // gradientTo: '#1d3557',

  // CDNTEK:
  // name: 'CDNTEK',
  // primaryColor: '#22c55e',
  // secondaryColor: '#15803d',
  // gradientFrom: '#22c55e',
  // gradientTo: '#0f172a',

  // CDNCore:
  // name: 'CDNCore',
  // primaryColor: '#8b5cf6',
  // secondaryColor: '#6d28d9',
  // gradientFrom: '#8b5cf6',
  // gradientTo: '#0f172a',

  // Default placeholder:
  name: 'SITE_NAME',
  primaryColor: '#3b82f6',
  secondaryColor: '#1e40af',
  gradientFrom: '#3b82f6',
  gradientTo: '#0f172a',
  textColor: '#ffffff',
};

// ============================================================
// Reading Time Utility
// ============================================================
function estimateReadingTime(content: string): number {
  const text = content.replace(/<[^>]*>/g, '');
  const wordCount = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

// ============================================================
// Image Generation
// ============================================================
interface ImageProps {
  params: Promise<{ slug: string }>;
}

export default async function OGImage({ params }: ImageProps) {
  const { slug } = await params;

  // Fetch article data
  // const article = await getArticleBySlug(slug);
  // Replace with actual article fetch:
  const article = {
    title: 'Article Title Placeholder',
    category: 'Category',
    publishedAt: new Date().toISOString(),
    content: 'Placeholder content for word count estimation.',
    author: { name: 'Author' },
  };

  if (!article) {
    // Fallback OG image for missing articles
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            background: `linear-gradient(135deg, ${BRAND.gradientFrom}, ${BRAND.gradientTo})`,
            color: BRAND.textColor,
            fontSize: 48,
            fontWeight: 700,
          }}
        >
          {BRAND.name}
        </div>
      ),
      { ...size },
    );
  }

  const readingTime = estimateReadingTime(article.content);
  const publishDate = new Date(article.publishedAt).toLocaleDateString('pt-PT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Truncate title if too long
  const title =
    article.title.length > 80
      ? article.title.slice(0, 77) + '...'
      : article.title;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: `linear-gradient(135deg, ${BRAND.gradientFrom} 0%, ${BRAND.gradientTo} 100%)`,
          color: BRAND.textColor,
          fontFamily: 'Inter, system-ui, sans-serif',
          padding: 0,
        }}
      >
        {/* Top bar with brand accent */}
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '6px',
            background: BRAND.primaryColor,
          }}
        />

        {/* Main content area */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            padding: '48px 60px 40px',
            justifyContent: 'space-between',
          }}
        >
          {/* Top section: Category badge + Logo */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/* Category badge */}
            <div
              style={{
                display: 'flex',
                padding: '8px 20px',
                background: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '24px',
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              {article.category}
            </div>

            {/* Company name/logo */}
            <div
              style={{
                display: 'flex',
                fontSize: 24,
                fontWeight: 800,
                letterSpacing: '-0.02em',
              }}
            >
              {BRAND.name}
            </div>
          </div>

          {/* Middle section: Title */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              maxWidth: '900px',
            }}
          >
            <h1
              style={{
                fontSize: title.length > 50 ? 40 : 48,
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                margin: 0,
                textShadow: '0 2px 10px rgba(0,0,0,0.2)',
              }}
            >
              {title}
            </h1>
          </div>

          {/* Bottom section: Metadata */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              opacity: 0.85,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                fontSize: 16,
              }}
            >
              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: 700,
                  }}
                >
                  {article.author.name.charAt(0)}
                </div>
                <span style={{ fontWeight: 500 }}>{article.author.name}</span>
              </div>

              {/* Separator */}
              <span style={{ opacity: 0.5 }}>|</span>

              {/* Date */}
              <span>{publishDate}</span>

              {/* Separator */}
              <span style={{ opacity: 0.5 }}>|</span>

              {/* Reading time */}
              <span>{readingTime} min de leitura</span>
            </div>

            {/* URL hint */}
            <div style={{ fontSize: 14, opacity: 0.6 }}>
              {BRAND.name.toLowerCase()}.pt/blog
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      // Optional: Load custom fonts
      // fonts: [
      //   {
      //     name: 'Inter',
      //     data: await fetch(
      //       new URL('./fonts/Inter-Bold.ttf', import.meta.url)
      //     ).then((res) => res.arrayBuffer()),
      //     weight: 700,
      //     style: 'normal',
      //   },
      // ],
    },
  );
}
