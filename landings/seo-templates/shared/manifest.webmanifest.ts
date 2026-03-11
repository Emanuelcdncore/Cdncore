/**
 * WEB APP MANIFEST TEMPLATE
 * ==========================
 * Place this file at: app/manifest.ts (or app/manifest.webmanifest as route handler)
 *
 * Next.js 16 can generate this automatically.
 * Provides PWA support and improved mobile experience.
 */

import type { MetadataRoute } from 'next';
// import { siteConfig } from '@/lib/seo-config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SITE_NAME', // Replace with siteConfig.companyName
    short_name: 'SITE_NAME', // Replace with siteConfig.companyName
    description: 'Site description', // Replace with siteConfig.description
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff', // Replace with siteConfig.backgroundColor
    theme_color: '#3b82f6', // Replace with siteConfig.brandColor
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
