import type { NewsSiteConfig } from '@cdn/news';

export const newsSeoConfig: NewsSiteConfig = {
  companyName: 'CDNCore',
  siteUrl: 'https://cdncore.pt',
  locale: 'pt_PT',
  defaultAuthor: { name: 'CDNCore', url: 'https://cdncore.pt' },
  news: {
    title: 'Notícias CDNCore',
    description:
      'Últimas notícias, investigação e novidades da CDNCore - IA, Cibersegurança e Software',
  },
  defaultOgImage: '/og-default.png',
};
