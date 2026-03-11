import type { NewsSiteConfig } from '@cdn/news';

export const newsSeoConfig: NewsSiteConfig = {
  companyName: 'CDNTV',
  siteUrl: 'https://cdntv.pt',
  locale: 'pt_PT',
  defaultAuthor: { name: 'CDNTV', url: 'https://cdntv.pt' },
  news: {
    title: 'Notícias CDNTV',
    description:
      'Últimas notícias, projetos e novidades da CDNTV - Produção Audiovisual',
  },
  defaultOgImage: '/images/og-default.png',
};
