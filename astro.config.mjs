// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://dmclimatizacao.com.br',
  output: 'static',
  // Gera servicos.html, sobre.html... O Cloudflare Pages serve como /servicos e redireciona
  // as URLs antigas com .html (já indexadas pelo Google) para a versão sem extensão.
  build: { format: 'file' },
});
