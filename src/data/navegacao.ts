export interface ItemMenu {
  rotulo: string;
  href: string;
}

/** Menu principal. As URLs .html seguem build.format: 'file'. */
export const menuPrincipal: ItemMenu[] = [
  { rotulo: 'Início', href: '/' },
  { rotulo: 'Serviços', href: '/servicos.html' },
  { rotulo: 'PMOC', href: '/pmoc.html' },
  { rotulo: 'Clientes', href: '/clientes.html' },
  { rotulo: 'A empresa', href: '/sobre.html' },
  { rotulo: 'Contato', href: '/contato.html' },
];

export const menuServicos: ItemMenu[] = [
  { rotulo: 'Instalação', href: '/instalacao.html' },
  { rotulo: 'Limpeza e higienização', href: '/higienizacao.html' },
  { rotulo: 'PMOC para empresas', href: '/pmoc.html' },
  { rotulo: 'Todos os serviços', href: '/servicos.html' },
];

/** Compara a URL atual com o link, aceitando /servicos e /servicos.html (dev x build). */
export function ehPaginaAtual(pathname: string, href: string): boolean {
  const normalizar = (p: string) => p.replace(/\.html$/, '').replace(/\/index$/, '/').replace(/(.)\/$/, '$1');
  return normalizar(pathname) === normalizar(href);
}
