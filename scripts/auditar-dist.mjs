/**
 * Auditoria rápida do build (rodar depois de `npm run build`):
 *   node scripts/auditar-dist.mjs
 * Confere h1, title, description, canonical, JSON-LD, imagens, links internos e pendências.
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const paginas = readdirSync(DIST).filter((f) => f.endsWith('.html'));
const titulos = new Map();
const problemas = [];
let pendencias = 0;

for (const f of paginas) {
  const h = readFileSync(join(DIST, f), 'utf8');
  const titulo = h.match(/<title>(.*?)<\/title>/)?.[1] ?? '';
  const desc = h.match(/name="description" content="([^"]*)"/)?.[1] ?? '';
  const canonical = h.match(/rel="canonical" href="([^"]+)"/)?.[1] ?? '(noindex)';
  const h1 = (h.match(/<h1[\s>]/g) ?? []).length;
  const ld = [...h.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((m) => {
    try {
      const j = JSON.parse(m[1]);
      return j['@type'] + (j.mainEntity ? `(${j.mainEntity.length})` : '');
    } catch {
      problemas.push(`${f}: JSON-LD inválido`);
      return 'INVÁLIDO';
    }
  });
  const imgs = [...h.matchAll(/<img [^>]+>/g)].map((m) => m[0]);
  const pend = (h.match(/PREENCHER/g) ?? []).length;
  pendencias += pend;

  titulos.set(titulo, (titulos.get(titulo) ?? 0) + 1);
  if (h1 !== 1) problemas.push(`${f}: ${h1} h1`);
  if (canonical !== '(noindex)' && (desc.length < 70 || desc.length > 160)) problemas.push(`${f}: description com ${desc.length} caracteres`);
  if (titulo.length > 70) problemas.push(`${f}: title com ${titulo.length} caracteres`);
  imgs.filter((i) => !/\swidth=/.test(i) || !/\sheight=/.test(i)).forEach(() => problemas.push(`${f}: imagem sem width/height`));
  imgs.filter((i) => !/\salt=/.test(i)).forEach(() => problemas.push(`${f}: imagem sem alt`));

  for (const [, url, ancora] of h.matchAll(/href="(\/[^"#?]*)(#[^"]*)?"/g)) {
    if (url.startsWith('/_astro')) continue;
    // URLs sem extensão (/servicos) são servidas a partir de servicos.html
    const alvo = url === '/' ? 'index.html' : /\.\w+$/.test(url) ? url.slice(1) : `${url.slice(1)}.html`;
    if (!existsSync(join(DIST, alvo))) problemas.push(`${f}: link quebrado ${url}`);
    else if (ancora && alvo.endsWith('.html') && !readFileSync(join(DIST, alvo), 'utf8').includes(`id="${ancora.slice(1)}"`))
      problemas.push(`${f}: âncora inexistente ${url}${ancora}`);
  }

  console.log(
    `${f.padEnd(18)} ${canonical.padEnd(46)} ld: ${(ld.join(',') || '-').padEnd(24)} imgs: ${imgs.length}  pendências: ${pend}`,
  );
}

for (const [t, n] of titulos) if (n > 1) problemas.push(`title repetido ${n}x: ${t}`);

console.log(`\nPendências [PREENCHER] no site: ${pendencias}`);
console.log(problemas.length ? `Problemas:\n- ${[...new Set(problemas)].join('\n- ')}` : 'Nenhum problema encontrado.');
