/**
 * Type definitions for SEO site configuration
 * Shared across all CDN Group sites
 */

export interface SiteConfig {
  // Company Info
  companyName: string;
  companyLegalName: string;
  description: string;
  descriptionEn: string;
  shortDescription: string;
  tagline: string;

  // URLs
  siteUrl: string;
  baseUrl: string;

  // Branding
  brandColor: string;
  themeColor: string;
  backgroundColor: string;

  // OG Image configuration
  ogImage: {
    primaryColor: string;
    secondaryColor: string;
    textColor: string;
    accentColor: string;
    gradientFrom: string;
    gradientTo: string;
    fontFamily: string;
  };

  // Locale
  locale: string;
  language: string;
  alternateLanguages: string[];
  alternateUrls: Record<string, string>;

  // Contact
  contact: {
    email: string;
    phone: string;
    address: {
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
      postalCode: string;
      addressCountry: string;
    };
  };

  // Social Media
  social: {
    facebook: string;
    instagram: string;
    linkedin: string;
    youtube: string;
    twitter: string;
  };

  // SEO Keywords
  keywords: string[];
  keywordsEn: string[];

  // Authors
  defaultAuthor: {
    name: string;
    url: string;
  };

  // Blog/News
  blog: {
    title: string;
    description: string;
    postsPerPage: number;
    categories: string[];
  };

  // Schema.org
  organizationType: string;
  industryKeywords: string[];
  areaServed: string;
  foundingDate: string;

  // Verification
  verification: {
    google: string;
    bing: string;
    yandex: string;
  };
}

/**
 * Blog post / Article type used in SEO metadata generation
 */
export interface ArticleSEO {
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
  publishedAt: string; // ISO date string
  modifiedAt?: string; // ISO date string
  image?: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
  locale?: string;
}

/**
 * Breadcrumb item for structured data
 */
export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * FAQ item for structured data
 */
export interface FAQItem {
  question: string;
  answer: string;
}
