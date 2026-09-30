export interface Servico {
  titulo: string;
  resumo: string;
  href: string;
}

/** Serviços da Home e da página de serviços, na ordem do roteiro. */
export const servicos: Servico[] = [
  {
    titulo: 'Instalação',
    resumo: 'Instalação de split, cassete, piso-teto, multi-split e VRF, com tubulação, dreno e elétrica dimensionados.',
    href: '/instalacao',
  },
  {
    titulo: 'Manutenção preventiva',
    resumo: 'Revisões periódicas que mantêm o rendimento, reduzem o consumo de energia e evitam quebras.',
    href: '/servicos#preventiva',
  },
  {
    titulo: 'Manutenção corretiva',
    resumo: 'Diagnóstico e reparo de aparelho que não gela, pinga, faz barulho ou não liga, incluindo inverter.',
    href: '/servicos#corretiva',
  },
  {
    titulo: 'Limpeza e higienização',
    resumo: 'Limpeza completa de evaporadora e condensadora, com remoção de fungos, bactérias e mau cheiro.',
    href: '/higienizacao',
  },
  {
    titulo: 'PMOC para empresas',
    resumo: 'Plano de Manutenção, Operação e Controle exigido por lei em ambientes de uso coletivo.',
    href: '/pmoc',
  },
  {
    titulo: 'Projetos e VRF/VRV',
    resumo: 'Dimensionamento de carga térmica, infraestrutura para obra e sistemas VRF/VRV para grandes ambientes.',
    href: '/servicos#projetos',
  },
];

/** Marcas cujos equipamentos a empresa atende (não implica credenciamento). */
export const marcasAtendidas = [
  'Carrier', 'Consul', 'Electrolux', 'Elgin', 'Fujitsu', 'Gree', 'Hitachi', 'Komeco',
  'LG', 'Midea', 'Samsung', 'York',
];
