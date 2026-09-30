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
  razaoSocial: null as string | null, // PREENCHER: razão social conforme CNPJ
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
  /** PREENCHER: lista real de cidades atendidas */
  cidadesAtendidas: null as string[] | null,
  /** Texto curto usado enquanto a lista acima não existir */
  areaResumo: 'Belo Horizonte e região metropolitana',

  endereco: null as string | null, // PREENCHER: endereço ou só bairro/cidade
  horario: null as string | null, // PREENCHER: ex. "Seg a sex, 8h às 18h · Sáb, 8h às 12h"
  atendeEmergencia: null as boolean | null,

  anoFundacao: null as number | null, // PREENCHER: CNPJ sugere ~2014
  responsavelTecnico: null as { nome: string; crea: string } | null,
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
