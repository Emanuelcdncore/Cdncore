/**
 * SEO Configuration for CDNCore
 * AI & Drone services, cybersecurity, robotics
 */
import type { SiteConfig } from './seo-config.types';

export const siteConfig: SiteConfig = {
  // Company Info
  companyName: 'CDNCore',
  companyLegalName: 'CDNCore - CDN Group, Lda.',
  description:
    'Empresa de inteligência artificial, drones, cibersegurança e robótica. Soluções inovadoras com tecnologia de ponta para empresas e organizações.',
  descriptionEn:
    'Artificial intelligence, drone services, cybersecurity, and robotics company. Innovative solutions with cutting-edge technology for businesses and organizations.',
  shortDescription: 'IA, Drones, Cibersegurança e Robótica',
  tagline: 'Inovação com Inteligência',

  // URLs
  siteUrl: 'https://cdncore.pt',
  baseUrl: 'https://cdncore.pt',

  // Branding
  brandColor: '#8b5cf6', // Purple brand color for CDNCore
  themeColor: '#8b5cf6',
  backgroundColor: '#ffffff',

  // Colors for OG images
  ogImage: {
    primaryColor: '#8b5cf6',
    secondaryColor: '#6d28d9',
    textColor: '#ffffff',
    accentColor: '#ede9fe',
    gradientFrom: '#8b5cf6',
    gradientTo: '#0f172a',
    fontFamily: 'Inter',
  },

  // Locale
  locale: 'pt_PT',
  language: 'pt',
  alternateLanguages: ['en'],
  alternateUrls: {
    pt: 'https://cdncore.pt',
    en: 'https://cdncore.pt/en',
  },

  // Contact
  contact: {
    email: 'info@cdncore.pt',
    phone: '+351275000000',
    address: {
      streetAddress: 'Covilhã',
      addressLocality: 'Covilhã',
      addressRegion: 'Castelo Branco',
      postalCode: '6200',
      addressCountry: 'PT',
    },
  },

  // Social Media
  social: {
    facebook: 'https://facebook.com/cdncore',
    instagram: 'https://instagram.com/cdncore',
    linkedin: 'https://linkedin.com/company/cdncore',
    youtube: '',
    twitter: '',
  },

  // SEO Keywords
  keywords: [
    'inteligência artificial',
    'IA',
    'drones',
    'cibersegurança',
    'robótica',
    'automação',
    'machine learning',
    'visão computacional',
    'drone profissional',
    'inspeção com drone',
    'segurança informática',
    'IoT',
    'Covilhã',
    'Portugal',
    'CDN Group',
    'CDNCore',
    'deep learning',
    'processamento de dados',
    'análise de dados',
    'tecnologia avançada',
  ],
  keywordsEn: [
    'artificial intelligence',
    'AI',
    'drones',
    'cybersecurity',
    'robotics',
    'automation',
    'machine learning',
    'computer vision',
    'professional drone',
    'drone inspection',
    'IT security',
    'IoT',
    'Covilhã',
    'Portugal',
    'CDN Group',
    'CDNCore',
    'deep learning',
    'data processing',
    'data analysis',
    'advanced technology',
  ],

  // Authors
  defaultAuthor: {
    name: 'CDNCore',
    url: 'https://cdncore.pt',
  },

  // Blog/News
  blog: {
    title: 'Notícias CDNCore',
    description:
      'Últimas notícias, investigação e novidades da CDNCore - IA, Drones e Robótica',
    postsPerPage: 12,
    categories: [
      'Inteligência Artificial',
      'Drones',
      'Cibersegurança',
      'Robótica',
      'Investigação',
      'Novidades',
    ],
  },

  // Schema.org
  organizationType: 'Organization',
  industryKeywords: [
    'Artificial Intelligence',
    'Drone Services',
    'Cybersecurity',
    'Robotics',
  ],
  areaServed: 'Portugal',
  foundingDate: '2020',

  // Verification (fill in with actual values)
  verification: {
    google: '',
    bing: '',
    yandex: '',
  },
};
