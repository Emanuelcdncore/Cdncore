/**
 * ROOT LAYOUT METADATA TEMPLATE
 * ==============================
 * Copy this metadata export into your app/layout.tsx file.
 * Import your site-specific config: import { siteConfig } from '@/lib/seo-config';
 *
 * This template provides comprehensive metadata for the root layout,
 * which acts as the default metadata for all pages.
 */

import type { Metadata, Viewport } from 'next';
// import { siteConfig } from '@/lib/seo-config';

// Example usage with a placeholder config - replace with actual import
const siteConfig = {
  companyName: 'SITE_NAME',
  siteUrl: 'https://example.com',
  description: 'Site description',
  keywords: ['keyword1'],
  locale: 'pt_PT',
  language: 'pt',
  brandColor: '#000000',
  backgroundColor: '#ffffff',
  defaultAuthor: { name: 'Author', url: 'https://example.com' },
  alternateUrls: { pt: 'https://example.com', en: 'https://example.com/en' },
  verification: { google: '', bing: '', yandex: '' },
  social: { twitter: '' },
};

/**
 * Viewport configuration - exported separately in Next.js 16
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: siteConfig.brandColor },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

/**
 * Root metadata - serves as default for all pages
 * Individual pages can override any of these values
 */
export const metadata: Metadata = {
  // Base URL for resolving relative URLs in metadata
  metadataBase: new URL(siteConfig.siteUrl),

  // Title configuration with template
  title: {
    default: `${siteConfig.companyName} - ${siteConfig.description}`,
    template: `%s | ${siteConfig.companyName}`,
  },

  // Description
  description: siteConfig.description,

  // Keywords
  keywords: siteConfig.keywords,

  // Authors
  authors: [siteConfig.defaultAuthor],
  creator: siteConfig.companyName,
  publisher: siteConfig.companyName,

  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Open Graph
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.siteUrl,
    siteName: siteConfig.companyName,
    title: siteConfig.companyName,
    description: siteConfig.description,
    images: [
      {
        url: '/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: siteConfig.companyName,
        type: 'image/jpeg',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.companyName,
    description: siteConfig.description,
    images: ['/twitter-image.jpg'],
    ...(siteConfig.social.twitter
      ? { site: siteConfig.social.twitter }
      : {}),
  },

  // Canonical and alternate languages
  alternates: {
    canonical: siteConfig.siteUrl,
    languages: siteConfig.alternateUrls,
  },

  // Icons - Next.js resolves these from the app directory file convention
  // Place favicon.ico, icon.png, apple-icon.png in app/
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.ico',
  },

  // Manifest
  manifest: '/manifest.webmanifest',

  // Category
  category: 'technology',

  // Verification
  verification: {
    ...(siteConfig.verification.google
      ? { google: siteConfig.verification.google }
      : {}),
    ...(siteConfig.verification.bing
      ? { other: { 'msvalidate.01': siteConfig.verification.bing } }
      : {}),
  },

  // Other meta tags
  other: {
    'format-detection': 'telephone=no',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
  },
};

/**
 * EXAMPLE ROOT LAYOUT STRUCTURE:
 *
 * import { Inter } from 'next/font/google';
 * import { OrganizationSchema, WebSiteSchema } from '@/components/seo/schemas';
 *
 * const inter = Inter({ subsets: ['latin'] });
 *
 * export { metadata, viewport } from './metadata';
 * // OR define them directly in this file
 *
 * export default function RootLayout({ children }: { children: React.ReactNode }) {
 *   return (
 *     <html lang="pt" dir="ltr">
 *       <head>
 *         <OrganizationSchema />
 *         <WebSiteSchema />
 *       </head>
 *       <body className={inter.className}>
 *         {children}
 *       </body>
 *     </html>
 *   );
 * }
 */
