/**
 * Dados centrais da empresa. Qualquer telefone, e-mail ou cidade exibido no site
 * deve vir daqui — nunca digitado direto nas páginas.
 *
 * Campos `null` ainda dependem do cliente e aparecem no site como [PREENCHER: ...].
 */

export interface Telefone {
  /** Como aparece para o visitante */
  exibicao: string;
  /** Só dígitos, com DDI e DDD (ex.: 5531999999999) */
  numero: string;
  tipo: 'celular' | 'fixo';
}

export const empresa = {
  nome: 'DM Climatização',
  // Nome empresarial na Receita inclui o CPF (empresário individual); publicar sem ele.
  razaoSocial: 'Denis Guedes de Oliveira' as string | null,
  cnpj: '20.795.576/0001-08',
  site: 'https://dmclimatizacao.com.br',
  email: 'denis@dmclimatizacao.com.br',
  contatoNome: 'Denis Guedes',

  /** Número principal, usado em todos os botões de WhatsApp. */
  whatsapp: {
    exibicao: '(31) 99143-2173',
    numero: '5531991432173',
  },

  /** Em ordem de prioridade: o primeiro aparece no cabeçalho e no "Ligar agora". */
  telefones: [
    { exibicao: '(31) 99143-2173', numero: '5531991432173', tipo: 'celular' },
    { exibicao: '(31) 99361-7923', numero: '5531993617923', tipo: 'celular' },
  ] satisfies Telefone[],

  cidadePrincipal: 'Belo Horizonte',
  uf: 'MG',
  /** Principais cidades da Grande BH (a empresa atende toda a região metropolitana). */
  cidadesAtendidas: [
    'Belo Horizonte', 'Contagem', 'Betim', 'Nova Lima', 'Sabará', 'Santa Luzia',
    'Ribeirão das Neves', 'Vespasiano', 'Lagoa Santa', 'Ibirité', 'Sarzedo',
    'Brumadinho', 'Pedro Leopoldo', 'Confins',
  ] as string[] | null,
  /** Texto curto para cabeçalho e rodapé */
  areaResumo: 'Belo Horizonte e Grande BH',

  endereco: null as string | null, // não publicar: sede é de empresário individual
  horario: 'Segunda a sexta, das 8h às 18h' as string | null,
  /** Atendimento fora do horário comercial */
  plantao: 'Plantão aos sábados e domingos' as string | null,

  anoFundacao: 2014 as number | null, // início de atividade no CNPJ: 07/08/2014
  /** Técnico responsável, registrado no CFT (emite TRT). Não publicar o nº de registro: tem formato de CPF. */
  responsavelTecnico: 'Denis Guedes de Oliveira' as string | null,
} as const;

export function linkWhatsApp(mensagem?: string): string {
  const base = `https://wa.me/${empresa.whatsapp.numero}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
}

export function linkTel(numero: string): string {
  return `tel:+${numero}`;
}

export const mensagemPadraoWhatsApp =
  'Olá! Vim pelo site da DM Climatização e gostaria de pedir um orçamento.';
