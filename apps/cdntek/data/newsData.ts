export interface NewsItem {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  type: "not\u00edcias" | "eventos" | "papers";
  readTime: string;
  content: string;
}

export const newsData: NewsItem[] = [
  {
    id: 1,
    slug: "nova-tecnologia-revoluciona-mercado",
    title: "Nova Tecnologia Revoluciona o Mercado",
    description:
      "Descobertas recentes em intelig\u00eancia artificial prometem transformar a forma como trabalhamos e nos comunicamos.",
    image:
      "https://images.unsplash.com/photo-1579532537902-1e50099867b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwbmV3c3xlbnwxfHx8fDE3NjU4NjgyMjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Tecnologia",
    date: "15 Dez 2024",
    type: "not\u00edcias",
    readTime: "3 min",
    content: `
      <p>A intelig\u00eancia artificial est\u00e1 a revolucionar o mercado de tecnologia de formas nunca antes imaginadas. Empresas de todo o mundo est\u00e3o a adoptar solu\u00e7\u00f5es baseadas em IA para automatizar processos, melhorar a efici\u00eancia e criar novas experi\u00eancias para os utilizadores.</p>
      <h3>O Impacto no Dia a Dia</h3>
      <p>Desde assistentes virtuais mais inteligentes at\u00e9 sistemas de recomenda\u00e7\u00e3o personalizados, a IA est\u00e1 presente em quase todos os aspectos da nossa vida digital. As empresas que abra\u00e7am esta tecnologia est\u00e3o a ver melhorias significativas na produtividade e satisfa\u00e7\u00e3o do cliente.</p>
      <h3>O Futuro \u00e9 Agora</h3>
      <p>Especialistas prev\u00eaem que nos pr\u00f3ximos anos, a IA continuar\u00e1 a evoluir, tornando-se ainda mais integrada nas nossas rotinas di\u00e1rias. A capacidade de processar grandes volumes de dados em tempo real permitir\u00e1 decis\u00f5es mais informadas e r\u00e1pidas em todos os sectores.</p>
      <p>Este \u00e9 apenas o come\u00e7o de uma transforma\u00e7\u00e3o que promete redefinir o futuro do trabalho e da comunica\u00e7\u00e3o humana.</p>
    `,
  },
  {
    id: 2,
    slug: "estrategias-futuro-negocios",
    title: "Estrat\u00e9gias para o Futuro dos Neg\u00f3cios",
    description:
      "Empresas globais se re\u00fanem para discutir as principais tend\u00eancias e desafios do mercado atual.",
    image:
      "https://images.unsplash.com/photo-1709715357520-5e1047a2b691?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmd8ZW58MXx8fHwxNzY1OTU3OTU0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Neg\u00f3cios",
    date: "14 Dez 2024",
    type: "eventos",
    readTime: "5 min",
    content: `
      <p>O evento anual de l\u00edderes empresariais reuniu CEOs e executivos das maiores empresas do mundo para discutir estrat\u00e9gias inovadoras para enfrentar os desafios do mercado contempor\u00e2neo.</p>
      <h3>Principais Temas Abordados</h3>
      <p>Entre os t\u00f3picos mais discutidos estavam a transforma\u00e7\u00e3o digital, sustentabilidade corporativa e a import\u00e2ncia da diversidade nas equipas de lideran\u00e7a. Os participantes partilharam casos de sucesso e li\u00e7\u00f5es aprendidas.</p>
      <h3>Networking e Colabora\u00e7\u00e3o</h3>
      <p>O evento tamb\u00e9m proporcionou oportunidades valiosas de networking, permitindo que empres\u00e1rios estabelecessem parcerias estrat\u00e9gicas e explorassem novas oportunidades de neg\u00f3cio.</p>
    `,
  },
  {
    id: 3,
    slug: "inovacao-digital-em-alta",
    title: "Inova\u00e7\u00e3o Digital em Alta",
    description:
      "O setor de tecnologia digital apresenta crescimento exponencial com solu\u00e7\u00f5es inovadoras para empresas.",
    image:
      "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwaW5ub3ZhdGlvbnxlbnwxfHx8fDE3NjU4NDQ1OTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Inova\u00e7\u00e3o",
    date: "13 Dez 2024",
    type: "papers",
    readTime: "8 min",
    content: `
      <p>Um estudo recente revela que o sector de tecnologia digital continua em crescimento acelerado, impulsionado pela procura crescente por solu\u00e7\u00f5es inovadoras que ajudem as empresas a manter-se competitivas.</p>
      <h3>Metodologia do Estudo</h3>
      <p>Os investigadores analisaram dados de mais de 500 empresas durante um per\u00edodo de 3 anos, identificando padr\u00f5es de adop\u00e7\u00e3o de tecnologias digitais e o seu impacto nos resultados financeiros.</p>
      <h3>Resultados Surpreendentes</h3>
      <p>As empresas que investiram em transforma\u00e7\u00e3o digital viram um aumento m\u00e9dio de 35% na efici\u00eancia operacional e 28% no crescimento de receitas. Estes n\u00fameros demonstram o valor real da inova\u00e7\u00e3o digital.</p>
    `,
  },
  {
    id: 4,
    slug: "ciberseguranca-novos-desafios-2025",
    title: "Ciberseguran\u00e7a: Novos Desafios em 2025",
    description:
      "Com o aumento de ataques cibern\u00e9ticos, empresas refor\u00e7am as suas defesas digitais com solu\u00e7\u00f5es avan\u00e7adas.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Seguran\u00e7a",
    date: "10 Dez 2024",
    type: "not\u00edcias",
    readTime: "6 min",
    content: `
      <p>O panorama da ciberseguran\u00e7a est\u00e1 em constante evolu\u00e7\u00e3o, com novas amea\u00e7as a surgir diariamente. As empresas precisam de estar preparadas para proteger os seus dados e sistemas.</p>
      <h3>Tend\u00eancias de Ciberseguran\u00e7a</h3>
      <p>A intelig\u00eancia artificial est\u00e1 a ser cada vez mais utilizada tanto por atacantes como por defensores. Sistemas de detec\u00e7\u00e3o baseados em IA conseguem identificar amea\u00e7as em tempo real.</p>
      <h3>Recomenda\u00e7\u00f5es</h3>
      <p>Especialistas recomendam uma abordagem multicamada para a seguran\u00e7a, incluindo forma\u00e7\u00e3o dos colaboradores, monitoriza\u00e7\u00e3o cont\u00ednua e planos de resposta a incidentes bem definidos.</p>
    `,
  },
  {
    id: 5,
    slug: "conferencia-audiovisual-2025",
    title: "Confer\u00eancia Audiovisual 2025",
    description:
      "Principais fabricantes de equipamento audiovisual re\u00fanem-se para apresentar as \u00faltimas inova\u00e7\u00f5es do setor.",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Audiovisual",
    date: "08 Dez 2024",
    type: "eventos",
    readTime: "4 min",
    content: `
      <p>A Confer\u00eancia Audiovisual 2025 reuniu os principais players do mercado para discutir o futuro da tecnologia de som e v\u00eddeo profissional.</p>
      <h3>Novidades Apresentadas</h3>
      <p>Entre as novidades estavam sistemas de som imersivo, ecr\u00e3s LED de nova gera\u00e7\u00e3o e solu\u00e7\u00f5es de videoconfer\u00eancia com IA integrada.</p>
      <h3>Impacto no Mercado</h3>
      <p>As novas tecnologias prometem revolucionar tanto o sector empresarial como o de entretenimento, oferecendo experi\u00eancias cada vez mais imersivas e de alta qualidade.</p>
    `,
  },
  {
    id: 6,
    slug: "redes-5g-futuro-conectividade",
    title: "Redes 5G: O Futuro da Conectividade",
    description:
      "A expans\u00e3o das redes 5G promete transformar a forma como nos conectamos e comunicamos.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Tecnologia",
    date: "05 Dez 2024",
    type: "papers",
    readTime: "7 min",
    content: `
      <p>A tecnologia 5G est\u00e1 a expandir-se rapidamente, prometendo velocidades de conex\u00e3o sem precedentes e lat\u00eancia ultra-baixa.</p>
      <h3>Aplica\u00e7\u00f5es Pr\u00e1ticas</h3>
      <p>Desde cidades inteligentes at\u00e9 cirurgias remotas, o 5G est\u00e1 a abrir portas para aplica\u00e7\u00f5es que antes eram imposs\u00edveis. A Internet das Coisas (IoT) benef\u00edcia enormemente desta tecnologia.</p>
      <h3>Desafios de Implementa\u00e7\u00e3o</h3>
      <p>Apesar das promessas, a implementa\u00e7\u00e3o do 5G enfrenta desafios como o custo de infraestrutura, quest\u00f5es regulat\u00f3rias e a necessidade de uma cobertura uniforme.</p>
    `,
  },
];

export function getNewsBySlug(slug: string): NewsItem | undefined {
    return newsData.find(item => item.slug === slug);
}

export function getAllSlugs(): string[] {
    return newsData.map(item => item.slug);
}
