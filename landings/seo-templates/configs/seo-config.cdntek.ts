/**
 * SEO Configuration for CDNTEK
 * Technology/telecom company - Audiovisual equipment, cybersecurity, network management
 */
import type { SiteConfig } from './seo-config.types';

export const siteConfig: SiteConfig = {
  // Company Info
  companyName: 'CDNTEK',
  companyLegalName: 'CDNTEK - CDN Group, Lda.',
  description:
    'Empresa de tecnologia e telecomunicações especializada em equipamentos audiovisuais, cibersegurança, gestão de redes e soluções tecnológicas empresariais.',
  descriptionEn:
    'Technology and telecommunications company specializing in audiovisual equipment, cybersecurity, network management, and enterprise technology solutions.',
  shortDescription: 'Tecnologia, telecomunicações e cibersegurança',
  tagline: 'Tecnologia ao Serviço do Futuro',

  // URLs
  siteUrl: 'https://cdntek.pt',
  baseUrl: 'https://cdntek.pt',

  // Branding
  brandColor: '#22c55e', // Green brand color for CDNTEK
  themeColor: '#22c55e',
  backgroundColor: '#ffffff',

  // Colors for OG images
  ogImage: {
    primaryColor: '#22c55e',
    secondaryColor: '#15803d',
    textColor: '#ffffff',
    accentColor: '#dcfce7',
    gradientFrom: '#22c55e',
    gradientTo: '#0f172a',
    fontFamily: 'Inter',
  },

  // Locale
  locale: 'pt_PT',
  language: 'pt',
  alternateLanguages: ['en'],
  alternateUrls: {
    pt: 'https://cdntek.pt',
    en: 'https://cdntek.pt/en',
  },

  // Contact
  contact: {
    email: 'info@cdntek.pt',
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
    facebook: 'https://facebook.com/cdntek',
    instagram: 'https://instagram.com/cdntek',
    linkedin: 'https://linkedin.com/company/cdntek',
    youtube: '',
    twitter: '',
  },

  // SEO Keywords
  keywords: [
    'tecnologia',
    'telecomunicações',
    'cibersegurança',
    'gestão de redes',
    'equipamentos audiovisuais',
    'soluções tecnológicas',
    'infraestrutura de rede',
    'segurança informática',
    'TI empresarial',
    'suporte técnico',
    'Covilhã',
    'Portugal',
    'CDN Group',
    'CDNTEK',
    'networking',
    'firewall',
    'monitorização de redes',
    'consultoria TI',
    'transformação digital',
    'cloud computing',
  ],
  keywordsEn: [
    'technology',
    'telecommunications',
    'cybersecurity',
    'network management',
    'audiovisual equipment',
    'technology solutions',
    'network infrastructure',
    'IT security',
    'enterprise IT',
    'technical support',
    'Covilhã',
    'Portugal',
    'CDN Group',
    'CDNTEK',
    'networking',
    'firewall',
    'network monitoring',
    'IT consulting',
    'digital transformation',
    'cloud computing',
  ],

  // Authors
  defaultAuthor: {
    name: 'CDNTEK',
    url: 'https://cdntek.pt',
  },

  // Blog/News
  blog: {
    title: 'Notícias CDNTEK',
    description:
      'Últimas notícias, artigos técnicos e novidades da CDNTEK - Tecnologia e Telecomunicações',
    postsPerPage: 12,
    categories: [
      'Cibersegurança',
      'Redes',
      'Equipamentos',
      'Tecnologia',
      'Novidades',
      'Dicas Técnicas',
    ],
  },

  // Schema.org
  organizationType: 'Organization',
  industryKeywords: [
    'Technology',
    'Telecommunications',
    'Cybersecurity',
    'Network Management',
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
