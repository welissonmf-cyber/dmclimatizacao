/**
 * Gera favicon, ícones de celular e a imagem de compartilhamento (Open Graph)
 * a partir do logo. Rodar de novo quando o logo em vetor chegar:
 *   node scripts/gerar-imagens.mjs
 */
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';

const LOGO = 'src/assets/logo-miniatura-cdr.png';
const PUBLICO = 'public';
const AZUL = '#14305c';

await mkdir(PUBLICO, { recursive: true });

// 1. Recorta a gota (símbolo) do logo: linhas acima do primeiro vão em branco.
const { data, info } = await sharp(LOGO).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const linhaTemTinta = (y) => {
  for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * info.channels;
    if (data[i] + data[i + 1] + data[i + 2] < 600) return true;
  }
  return false;
};
let topo = 0;
while (!linhaTemTinta(topo)) topo++;
let base = topo;
while (linhaTemTinta(base)) base++;
let esq = info.width, dir = 0;
for (let y = topo; y < base; y++) {
  for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * info.channels;
    if (data[i] + data[i + 1] + data[i + 2] < 600) { esq = Math.min(esq, x); dir = Math.max(dir, x); }
  }
}
const simbolo = await sharp(LOGO)
  .extract({ left: esq, top: topo, width: dir - esq + 1, height: base - topo })
  .png()
  .toBuffer();
console.log(`símbolo recortado: ${dir - esq + 1}x${base - topo} (linhas ${topo}–${base})`);

// Ícone quadrado com fundo branco e margem
async function icone(tamanho, margem = 0.12) {
  const interno = Math.round(tamanho * (1 - 2 * margem));
  const s = await sharp(simbolo).resize(interno, interno, { fit: 'contain', background: '#ffffff' }).toBuffer();
  return sharp({ create: { width: tamanho, height: tamanho, channels: 4, background: '#ffffff' } })
    .composite([{ input: s, gravity: 'center' }])
    .png()
    .toBuffer();
}

const png32 = await icone(32, 0.04);
await writeFile(`${PUBLICO}/favicon-32.png`, png32);
await writeFile(`${PUBLICO}/apple-touch-icon.png`, await icone(180));
await writeFile(`${PUBLICO}/icone-192.png`, await icone(192));
await writeFile(`${PUBLICO}/icone-512.png`, await icone(512));

// favicon.ico com um PNG 32x32 embutido
const cab = Buffer.alloc(22);
cab.writeUInt16LE(0, 0); cab.writeUInt16LE(1, 2); cab.writeUInt16LE(1, 4);
cab.writeUInt8(32, 6); cab.writeUInt8(32, 7); cab.writeUInt8(0, 8); cab.writeUInt8(0, 9);
cab.writeUInt16LE(1, 10); cab.writeUInt16LE(32, 12);
cab.writeUInt32LE(png32.length, 14); cab.writeUInt32LE(22, 18);
await writeFile(`${PUBLICO}/favicon.ico`, Buffer.concat([cab, png32]));

// 2. Imagem de compartilhamento 1200x630 (WhatsApp, Facebook, LinkedIn)
const logoCartao = await sharp(LOGO).resize({ height: 300 }).png().toBuffer();
const texto = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="${AZUL}"/>
  <rect x="0" y="600" width="1200" height="30" fill="#b0602c"/>
  <rect x="70" y="135" width="360" height="360" rx="24" fill="#ffffff"/>
  <g font-family="Segoe UI, Arial, sans-serif" fill="#ffffff">
    <text x="490" y="250" font-size="54" font-weight="700">Instalação e manutenção</text>
    <text x="490" y="315" font-size="54" font-weight="700">de ar condicionado</text>
    <text x="490" y="395" font-size="34" fill="#cfe3ef">Residencial · Comercial · Industrial · PMOC</text>
    <text x="490" y="450" font-size="34" fill="#cfe3ef">Belo Horizonte e região</text>
  </g>
</svg>`;
await sharp(Buffer.from(texto))
  .composite([{ input: logoCartao, left: 250 - Math.round(295 / 2), top: 165 }])
  .png({ compressionLevel: 9 })
  .toFile(`${PUBLICO}/og-imagem.png`);

console.log('imagens geradas em public/');
