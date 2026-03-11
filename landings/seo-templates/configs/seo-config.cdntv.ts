/**
 * SEO Configuration for CDNTV
 * TV/Video production company - Audiovisual, institutional videos, corporate videos, social media, live events
 */
import type { SiteConfig } from './seo-config.types';

export const siteConfig: SiteConfig = {
  // Company Info
  companyName: 'CDNTV',
  companyLegalName: 'CDNTV - CDN Group, Lda.',
  description:
    'Produtora audiovisual especializada em produção de vídeo, eventos ao vivo, vídeos corporativos e institucionais, conteúdo para redes sociais e transmissões em direto.',
  descriptionEn:
    'Audiovisual production company specializing in video production, live events, corporate and institutional videos, social media content, and live streaming.',
  shortDescription: 'Produção audiovisual e vídeo profissional',
  tagline: 'Produção Audiovisual de Excelência',

  // URLs
  siteUrl: 'https://cdntv.pt',
  baseUrl: 'https://cdntv.pt',

  // Branding
  brandColor: '#e63946', // Red brand color for CDNTV
  themeColor: '#e63946',
  backgroundColor: '#ffffff',

  // Colors for OG images
  ogImage: {
    primaryColor: '#e63946',
    secondaryColor: '#1d3557',
    textColor: '#ffffff',
    accentColor: '#f1faee',
    gradientFrom: '#e63946',
    gradientTo: '#1d3557',
    fontFamily: 'Inter',
  },

  // Locale
  locale: 'pt_PT',
  language: 'pt',
  alternateLanguages: ['en'],
  alternateUrls: {
    pt: 'https://cdntv.pt',
    en: 'https://cdntv.pt/en',
  },

  // Contact
  contact: {
    email: 'info@cdntv.pt',
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
    facebook: 'https://facebook.com/cdntv',
    instagram: 'https://instagram.com/cdntv',
    linkedin: 'https://linkedin.com/company/cdntv',
    youtube: 'https://youtube.com/@cdntv',
    twitter: '',
  },

  // SEO Keywords
  keywords: [
    'produção audiovisual',
    'produção de vídeo',
    'vídeo corporativo',
    'vídeo institucional',
    'eventos ao vivo',
    'transmissão em direto',
    'live streaming',
    'redes sociais',
    'conteúdo digital',
    'produtora de vídeo',
    'Covilhã',
    'Portugal',
    'CDN Group',
    'CDNTV',
    'produção televisiva',
    'pós-produção',
    'edição de vídeo',
    'motion graphics',
    'fotografia',
    'drone vídeo',
  ],
  keywordsEn: [
    'audiovisual production',
    'video production',
    'corporate video',
    'institutional video',
    'live events',
    'live streaming',
    'social media content',
    'digital content',
    'video producer',
    'Covilhã',
    'Portugal',
    'CDN Group',
    'CDNTV',
    'TV production',
    'post-production',
    'video editing',
    'motion graphics',
    'photography',
    'drone video',
  ],

  // Authors
  defaultAuthor: {
    name: 'CDNTV',
    url: 'https://cdntv.pt',
  },

  // Blog/News
  blog: {
    title: 'Notícias CDNTV',
    description:
      'Últimas notícias, projetos e novidades da CDNTV - Produção Audiovisual',
    postsPerPage: 12,
    categories: [
      'Produção de Vídeo',
      'Eventos ao Vivo',
      'Redes Sociais',
      'Projetos',
      'Novidades',
      'Dicas',
    ],
  },

  // Schema.org
  organizationType: 'Organization',
  industryKeywords: [
    'Audiovisual Production',
    'Video Production',
    'Live Events',
    'Media',
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
