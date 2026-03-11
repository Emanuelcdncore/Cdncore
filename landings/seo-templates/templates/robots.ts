/**
 * ROBOTS.TS TEMPLATE
 * ==================
 * Place this file at: app/robots.ts
 *
 * Next.js 16 will automatically serve this as /robots.txt
 * Import your siteConfig for the correct sitemap URL.
 */

import type { MetadataRoute } from 'next';
// import { siteConfig } from '@/lib/seo-config';

const SITE_URL = 'https://example.com'; // Replace with siteConfig.siteUrl

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Allow all crawlers to index the site
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',        // API routes
          '/admin/',      // Admin panel
          '/_next/',      // Next.js internals
          '/private/',    // Private pages
          '/*.json$',     // JSON files
          '/search?*',    // Search results with parameters
        ],
      },
      {
        // Google-specific rules (more permissive)
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
        ],
      },
      {
        // Block AI training crawlers (optional - uncomment if desired)
        // userAgent: 'GPTBot',
        // disallow: ['/'],
      },
      {
        // Block AI training crawlers (optional - uncomment if desired)
        // userAgent: 'CCBot',
        // disallow: ['/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
