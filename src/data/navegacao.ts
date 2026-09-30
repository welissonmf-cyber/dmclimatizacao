export interface ItemMenu {
  rotulo: string;
  href: string;
}

/** Menu principal. URLs sem extensão (Cloudflare Pages serve /servicos a partir de servicos.html). */
export const menuPrincipal: ItemMenu[] = [
  { rotulo: 'Início', href: '/' },
  { rotulo: 'Serviços', href: '/servicos' },
  { rotulo: 'PMOC', href: '/pmoc' },
  { rotulo: 'Clientes', href: '/clientes' },
  { rotulo: 'A empresa', href: '/sobre' },
  { rotulo: 'Contato', href: '/contato' },
];

export const menuServicos: ItemMenu[] = [
  { rotulo: 'Instalação', href: '/instalacao' },
  { rotulo: 'Limpeza e higienização', href: '/higienizacao' },
  { rotulo: 'PMOC para empresas', href: '/pmoc' },
  { rotulo: 'Todos os serviços', href: '/servicos' },
];

/** Compara a URL atual com o link, aceitando /servicos e /servicos.html. */
export function ehPaginaAtual(pathname: string, href: string): boolean {
  const normalizar = (p: string) => p.replace(/\.html$/, '').replace(/\/index$/, '/').replace(/(.)\/$/, '$1');
  return normalizar(pathname) === normalizar(href);
}
