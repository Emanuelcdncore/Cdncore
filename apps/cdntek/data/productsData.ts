export interface Product {
  id: number | string;
  title: string;
  model: string;
  category: string;
  subcategory: string;
  image: string;
  _instanceId: string;
}

export interface Category {
  name: string;
  subcategories?: string[];
}

export const CATEGORIES: Category[] = [
  {
    name: "Amplificador PA",
    subcategories: [
      "Amplificador de Mistura",
      "Amplificador Misturador de Zona",
      "Amplificador de Pot\u00eancia Classe-D",
      "Pr\u00e9-Amplificador",
    ],
  },
  {
    name: "Altifalante PA",
    subcategories: [
      "Altifalante de Teto",
      "Altifalante de Parede",
      "Altifalante Ativo",
      "Altifalante Corneta",
      "Altifalante de Proje\u00e7\u00e3o",
      "Altifalante pendente",
      "Altifalante de jardim",
      "Altifalante de coluna",
    ],
  },
  {
    name: "Sistema PA Anal\u00f3gico",
    subcategories: [
      "Controlador",
      "Fontes de \u00c1udio",
      "Microfone",
      "Controlador de Volume",
      "P\u00falpito",
    ],
  },
  {
    name: "PA/IP Intercomunicador",
    subcategories: ["S\u00e9rie 88", "S\u00e9rie 77", "S\u00e9rie 67", "S\u00e9rie 69"],
  },
  {
    name: "Evacua\u00e7\u00e3o de Voz",
    subcategories: [
      "S\u00e9rie 6000",
      "S\u00e9rie 6200",
      "S\u00e9rie 6100",
      "S\u00e9rie de Parede",
    ],
  },
  {
    name: "\u00c1udio Profissional",
    subcategories: [
      "Amplificador Profissional",
      "Altifalante de Confer\u00eancia",
      "Altifalante Multifun\u00e7\u00e3o",
      "Altifalante Monitor",
      "Altifalante Exterior",
      "Array Linear",
      "Subwoofer",
      "Microfone",
      "Mesa de Mistura",
    ],
  },
  {
    name: "Audioconfer\u00eancia",
    subcategories: [
      "Confer\u00eancia Digital",
      "Confer\u00eancia Sem Fio",
      "Confer\u00eancia Sem Papel",
      "Interpreta\u00e7\u00e3o Simult\u00e2nea",
    ],
  },
  {
    name: "Videoconfer\u00eancia HD",
    subcategories: ["Sistema de Videoconfer\u00eancia HD"],
  },
  {
    name: "Painel Interativo",
    subcategories: ["itChub", "Serie 810", "Serie 820"],
  },
  {
    name: "Controle Central e Matriz",
    subcategories: [
      "Controlador Central",
      "Matriz de \u00c1udio e V\u00eddeo",
      "Sistema KVM e Outros",
    ],
  },
  {
    name: "Grava\u00e7\u00e3o HD",
    subcategories: ["Grava\u00e7\u00e3o de Aula Inteligente", "Grava\u00e7\u00e3o de Confer\u00eancia"],
  },
  {
    name: "VMS",
    subcategories: ["Sistema de Gerenciamento Visual"],
  },
  {
    name: "Ecr\u00e3 LED",
    subcategories: [
      "LED Interativo Tudo-em-Um",
      "Fixo Interno",
      "Fixo Externo",
      "Pitch Fino",
      "Aluguel",
    ],
  },
  {
    name: "Ilumina\u00e7\u00e3o de Palco LED",
    subcategories: [
      "Luz Par",
      "Luz Cabe\u00e7a M\u00f3vel",
      "Luz de Efeito",
      "Luz de Est\u00fadio",
      "Luz de Seguimento",
    ],
  },
  {
    name: "Ilumina\u00e7\u00e3o Arquitetural",
    subcategories: [
      "Lavador de Parede",
      "Luz Linear",
      "Luz Pontual",
      "Luz de Inunda\u00e7\u00e3o",
      "Luz de Canto",
    ],
  },
  {
    name: "Sistema de Gest\u00e3o M\u00e9dica",
    subcategories: [
      "Orienta\u00e7\u00e3o M\u00e9dica e Telemedicina",
      "Intercomunicador M\u00e9dico de Fundo",
    ],
  },
  {
    name: "Sistema de Vigil\u00e2ncia CCTV",
    subcategories: [
      "C\u00e2mera de Rede Tipo Canister",
      "C\u00e2mera Web Tipo Bola",
      "C\u00e2mera de Rede Tipo Concha",
      "C\u00e2mera Hemisf\u00e9rica",
      "Gest\u00e3o Integrada de Seguran\u00e7a",
    ],
  },
  {
    name: "TF",
    subcategories: [
      "Tela LED TF",
      "Sistema de Som TF-PRO",
      "Sistema de Confer\u00eancia TF",
      "Sistema PA TF",
    ],
  },
];

// Demo product data with placeholder images
export const demoProducts: Product[] = [
  {
    id: 1,
    title: "Amplificador de Mistura T-120DM",
    model: "T-120DM",
    category: "Amplificador PA",
    subcategory: "Amplificador de Mistura",
    image: "/uploads/1765985911695-360504175.jpg",
    _instanceId: "demo-1",
  },
  {
    id: 2,
    title: "Amplificador Misturador de Zona T-2120UC",
    model: "T-2120UC",
    category: "Amplificador PA",
    subcategory: "Amplificador Misturador de Zona",
    image: "/uploads/1766060543039-523678012.jpg",
    _instanceId: "demo-2",
  },
  {
    id: 3,
    title: "Amplificador de Pot\u00eancia Classe-D T-220AP",
    model: "T-220AP",
    category: "Amplificador PA",
    subcategory: "Amplificador de Pot\u00eancia Classe-D",
    image: "/uploads/1766423207380-626778921.jpg",
    _instanceId: "demo-3",
  },
  {
    id: 4,
    title: "Pr\u00e9-Amplificador T-6201",
    model: "T-6201",
    category: "Amplificador PA",
    subcategory: "Pr\u00e9-Amplificador",
    image: "/uploads/1765985911695-360504175.jpg",
    _instanceId: "demo-4",
  },
  {
    id: 5,
    title: "Altifalante de Teto T-104",
    model: "T-104",
    category: "Altifalante PA",
    subcategory: "Altifalante de Teto",
    image: "/uploads/1766060543039-523678012.jpg",
    _instanceId: "demo-5",
  },
  {
    id: 6,
    title: "Altifalante de Parede T-601",
    model: "T-601",
    category: "Altifalante PA",
    subcategory: "Altifalante de Parede",
    image: "/uploads/1766423207380-626778921.jpg",
    _instanceId: "demo-6",
  },
  {
    id: 7,
    title: "Altifalante Ativo T-206H",
    model: "T-206H",
    category: "Altifalante PA",
    subcategory: "Altifalante Ativo",
    image: "/uploads/1765985911695-360504175.jpg",
    _instanceId: "demo-7",
  },
  {
    id: 8,
    title: "Altifalante Corneta T-720A",
    model: "T-720A",
    category: "Altifalante PA",
    subcategory: "Altifalante Corneta",
    image: "/uploads/1766060543039-523678012.jpg",
    _instanceId: "demo-8",
  },
  {
    id: 9,
    title: "Controlador T-6600",
    model: "T-6600",
    category: "Sistema PA Anal\u00f3gico",
    subcategory: "Controlador",
    image: "/uploads/1766423207380-626778921.jpg",
    _instanceId: "demo-9",
  },
  {
    id: 10,
    title: "Microfone T-521A",
    model: "T-521A",
    category: "Sistema PA Anal\u00f3gico",
    subcategory: "Microfone",
    image: "/uploads/1765985911695-360504175.jpg",
    _instanceId: "demo-10",
  },
  {
    id: 11,
    title: "Confer\u00eancia Digital TS-0699",
    model: "TS-0699",
    category: "Audioconfer\u00eancia",
    subcategory: "Confer\u00eancia Digital",
    image: "/uploads/1766060543039-523678012.jpg",
    _instanceId: "demo-11",
  },
  {
    id: 12,
    title: "Array Linear LA-205M",
    model: "LA-205M",
    category: "\u00c1udio Profissional",
    subcategory: "Array Linear",
    image: "/uploads/1766423207380-626778921.jpg",
    _instanceId: "demo-12",
  },
];
