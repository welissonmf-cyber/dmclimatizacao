import type { APIRoute } from 'astro';

// Gerado a partir dos arquivos de página, com as URLs .html usadas em produção.
const paginas = import.meta.glob('./*.astro');

export const GET: APIRoute = ({ site }) => {
  const hoje = new Date().toISOString().slice(0, 10);
  const urls = Object.keys(paginas)
    .map((arquivo) => arquivo.replace('./', '').replace('.astro', ''))
    .filter((nome) => nome !== '404')
    .map((nome) => (nome === 'index' ? '/' : `/${nome}.html`))
    .sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)))
    .map((caminho) => `  <url><loc>${new URL(caminho, site)}</loc><lastmod>${hoje}</lastmod></url>`)
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
