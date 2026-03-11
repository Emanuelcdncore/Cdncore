import type { NewsSiteConfig } from '@cdn/news';

export const newsSeoConfig: NewsSiteConfig = {
  companyName: 'CDNTEK',
  siteUrl: 'https://cdntek.pt',
  locale: 'pt_PT',
  defaultAuthor: { name: 'CDNTEK', url: 'https://cdntek.pt' },
  news: {
    title: 'Notícias CDNTEK',
    description:
      'Últimas notícias, artigos técnicos e novidades da CDNTEK - Tecnologia e Telecomunicações',
  },
  defaultOgImage: '/images/og-default.png',
};
