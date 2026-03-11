import type { NewsSiteConfig } from '@cdn/news';

export const newsSeoConfig: NewsSiteConfig = {
  companyName: 'CDNCore',
  siteUrl: 'https://cdncore.pt',
  locale: 'pt_PT',
  defaultAuthor: { name: 'CDNCore', url: 'https://cdncore.pt' },
  news: {
    title: 'Notícias CDNCore',
    description:
      'Últimas notícias, investigação e novidades da CDNCore - IA, Drones e Robótica',
  },
  defaultOgImage: '/images/og-default.png',
};
