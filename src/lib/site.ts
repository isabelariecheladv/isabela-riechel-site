export const site = {
  name: 'Isabela Riechel',
  description: 'Advocacia em Direito das Sucessões, Planejamento Patrimonial, Direito Imobiliário e Direito Civil em Londrina/PR.',
  location: 'Londrina, Paraná',
  phoneDisplay: '(43) 99129-3349',
  phoneE164: '5543991293349',
  email: 'isabelariecheladv@gmail.com',
  whatsapp: 'https://wa.me/5543991293349',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, ''),
  bookingUrl: process.env.NEXT_PUBLIC_GOOGLE_BOOKING_URL || '',
};
export const services = [
  { number: '01', slug: 'direito-das-sucessoes', title: 'Direito das Sucessões', short: 'Orientação em inventários, partilhas, testamentos e questões sucessórias.', lead: 'Inventário extrajudicial', description: 'Atuação na organização jurídica da sucessão, com avaliação da via extrajudicial quando estiverem presentes os requisitos legais.', topics: ['Inventário extrajudicial e judicial', 'Partilha de bens', 'Testamentos e disposições de última vontade', 'Orientação jurídica a herdeiros e meeiros'] },
  { number: '02', slug: 'planejamento-patrimonial', title: 'Planejamento Patrimonial', short: 'Organização patrimonial e planejamento sucessório considerando as particularidades de cada família.', lead: 'Planejamento sucessório', description: 'Análise de instrumentos jurídicos para organizar a titularidade, a administração e a transmissão do patrimônio, conforme as circunstâncias do caso.', topics: ['Planejamento sucessório', 'Doações e cláusulas de proteção patrimonial', 'Testamentos', 'Avaliação jurídica de estruturas patrimoniais'] },
  { number: '03', slug: 'direito-imobiliario', title: 'Direito Imobiliário', short: 'Análise de contratos, documentação imobiliária e relações envolvendo imóveis.', lead: 'Segurança nas relações imobiliárias', description: 'Consultoria e atuação em assuntos imobiliários, com exame dos documentos e riscos jurídicos pertinentes.', topics: ['Análise e elaboração de contratos', 'Compra, venda e locação', 'Regularização documental', 'Questões possessórias e imobiliárias'] },
  { number: '04', slug: 'direito-civil', title: 'Direito Civil', short: 'Assessoria em contratos, obrigações e relações jurídicas de natureza civil.', lead: 'Orientação jurídica individualizada', description: 'Análise preventiva e atuação em controvérsias civis, com atenção à possibilidade de soluções consensuais.', topics: ['Contratos e obrigações', 'Responsabilidade civil', 'Negociação e composição extrajudicial', 'Questões patrimoniais civis'] },
] as const;
export const suggestedTopics = [
 {category: 'SUCESSÕES', title: 'Inventário extrajudicial: quando essa via pode ser utilizada?', summary:'Pauta sugerida para explicar condições, documentos e participação do advogado.'},
 {category: 'PLANEJAMENTO', title: 'Planejamento sucessório: instrumentos e cuidados jurídicos', summary:'Pauta sugerida para abordar a organização patrimonial e seus limites.'},
 {category: 'IMOBILIÁRIO', title: 'Cuidados jurídicos antes da compra de um imóvel', summary:'Pauta sugerida para orientar sobre documentos e contratos.'},
];
