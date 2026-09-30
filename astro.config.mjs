// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://dmclimatizacao.com.br',
  output: 'static',
  // Mantém as URLs antigas (servicos.html, sobre.html...) já indexadas pelo Google.
  build: { format: 'file' },
});
