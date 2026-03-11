/**
 * NEXT.JS CONFIG SEO ADDITIONS
 * =============================
 * Add these settings to your next.config.ts / next.config.mjs
 *
 * These are SEO-relevant Next.js configuration options.
 */

// import type { NextConfig } from 'next';

const seoConfig = {
  // ============================================================
  // Image optimization (important for Core Web Vitals / LCP)
  // ============================================================
  images: {
    // Define allowed image domains for next/image
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: '**.cdntv.pt',
      },
      {
        protocol: 'https' as const,
        hostname: '**.cdntek.pt',
      },
      {
        protocol: 'https' as const,
        hostname: '**.cdncore.pt',
      },
    ],
    // Image formats - prefer modern formats
    formats: ['image/avif', 'image/webp'] as const,
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // ============================================================
  // Headers for SEO
  // ============================================================
  async headers() {
    return [
      {
        // Cache static assets aggressively
        source: '/(.*)\\.(ico|png|jpg|jpeg|gif|svg|webp|avif|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Security headers (also impacts SEO indirectly)
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // ============================================================
  // Redirects for SEO (example patterns)
  // ============================================================
  async redirects() {
    return [
      // Redirect www to non-www (or vice versa)
      // {
      //   source: '/:path*',
      //   has: [{ type: 'host', value: 'www.example.com' }],
      //   destination: 'https://example.com/:path*',
      //   permanent: true,
      // },

      // Redirect old blog URLs if migrating
      // {
      //   source: '/noticias/:slug',
      //   destination: '/blog/:slug',
      //   permanent: true,
      // },
    ];
  },

  // ============================================================
  // Trailing slash configuration
  // Choose one and stick with it for canonical URL consistency
  // ============================================================
  trailingSlash: false,

  // ============================================================
  // Compress output
  // ============================================================
  compress: true,

  // ============================================================
  // HTML Limited Bots - Next.js 16 feature
  // Stream metadata to bots for faster indexing
  // ============================================================
  htmlLimitedBots: [
    'Googlebot',
    'Bingbot',
    'Yandex',
    'DuckDuckBot',
    'Baiduspider',
    'Slurp',
  ],

  // ============================================================
  // Powered by header (remove for cleaner headers)
  // ============================================================
  poweredByHeader: false,
};

export default seoConfig;

/**
 * USAGE IN next.config.ts:
 *
 * import type { NextConfig } from 'next';
 *
 * const nextConfig: NextConfig = {
 *   // ...your existing config
 *   images: seoConfig.images,
 *   headers: seoConfig.headers,
 *   redirects: seoConfig.redirects,
 *   trailingSlash: seoConfig.trailingSlash,
 *   compress: seoConfig.compress,
 *   poweredByHeader: seoConfig.poweredByHeader,
 *   // htmlLimitedBots: seoConfig.htmlLimitedBots,  // if supported in your Next.js version
 * };
 *
 * export default nextConfig;
 */
