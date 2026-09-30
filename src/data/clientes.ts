import type { ImageMetadata } from 'astro';
import windsor from '../assets/clientes/windsor.jpg';
import arezzo from '../assets/clientes/arezzo.png';
import vallourec from '../assets/clientes/vallourec.jpg';
import cea from '../assets/clientes/cea.jpg';
import bancoDoBrasil from '../assets/clientes/banco-do-brasil.png';
import sava from '../assets/clientes/sava.png';
import caixa from '../assets/clientes/caixa.jpg';
import acosAlpha from '../assets/clientes/acos-alpha.jpg';
import puket from '../assets/clientes/puket.jpg';
import cineTj from '../assets/clientes/cine-tj.jpg';
import morana from '../assets/clientes/morana.jpg';

export interface Cliente {
  nome: string;
  logo: ImageMetadata;
  /** Só exibir publicamente depois de autorizado pelo cliente. */
  autorizado: boolean;
}

// Logos vindos do site antigo. CONFIRMAR autorização de uso antes de publicar
// (bancos e grandes marcas costumam exigir) e marcar `autorizado: true`.
export const clientes: Cliente[] = [
  { nome: 'Arezzo', logo: arezzo, autorizado: false },
  { nome: 'Banco do Brasil', logo: bancoDoBrasil, autorizado: false },
  { nome: 'Caixa', logo: caixa, autorizado: false },
  { nome: 'Vallourec', logo: vallourec, autorizado: false },
  { nome: 'C&A', logo: cea, autorizado: false },
  { nome: 'Aços Alpha', logo: acosAlpha, autorizado: false },
  { nome: 'Sava Móveis', logo: sava, autorizado: false },
  { nome: 'Windsor', logo: windsor, autorizado: false },
  { nome: 'Puket', logo: puket, autorizado: false },
  { nome: 'Cine TJ', logo: cineTj, autorizado: false },
  { nome: 'Morana', logo: morana, autorizado: false },
];

/**
 * Enquanto nenhum logo estiver autorizado, mostramos todos com aviso [PREENCHER]
 * para revisão. No lançamento, trocar para `clientes.filter((c) => c.autorizado)`.
 */
export const clientesExibidos = clientes;
export const haClientesPendentes = clientes.some((c) => !c.autorizado);
