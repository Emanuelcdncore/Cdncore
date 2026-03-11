/**
 * DYNAMIC TWITTER IMAGE FOR BLOG POSTS
 * ======================================
 * Place this file at: app/blog/[slug]/twitter-image.tsx
 *
 * Same as opengraph-image.tsx but with Twitter-specific dimensions.
 * Twitter uses 2:1 aspect ratio for summary_large_image cards.
 *
 * In practice, you can often re-export the OG image with different size:
 */

import { ImageResponse } from 'next/og';

export const alt = 'Article image';
export const size = { width: 1200, height: 600 }; // Twitter 2:1 ratio
export const contentType = 'image/png';
export const runtime = 'edge';

/**
 * NOTE: The implementation is identical to opengraph-image-blog.tsx.
 * You can either:
 *
 * 1. Duplicate the code with adjusted size (this file)
 * 2. Create a shared function and import it in both files:
 *
 *    // lib/og-renderer.tsx
 *    export function renderArticleOG(article, brand, size) { ... }
 *
 *    // app/blog/[slug]/opengraph-image.tsx
 *    import { renderArticleOG } from '@/lib/og-renderer';
 *    export default async function OGImage({ params }) {
 *      return renderArticleOG(article, brand, { width: 1200, height: 630 });
 *    }
 *
 *    // app/blog/[slug]/twitter-image.tsx
 *    import { renderArticleOG } from '@/lib/og-renderer';
 *    export default async function TwitterImage({ params }) {
 *      return renderArticleOG(article, brand, { width: 1200, height: 600 });
 *    }
 */

interface ImageProps {
  params: Promise<{ slug: string }>;
}

export default async function TwitterImage({ params }: ImageProps) {
  const { slug } = await params;

  // Same implementation as opengraph-image-blog.tsx
  // Fetch article, render image with BRAND config
  // Use the same rendering logic but with Twitter size

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #3b82f6, #0f172a)',
          color: '#ffffff',
          fontSize: 48,
          fontWeight: 700,
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        {/* Replace with full rendering from opengraph-image-blog.tsx */}
        Article Title - SITE_NAME
      </div>
    ),
    { ...size },
  );
}
