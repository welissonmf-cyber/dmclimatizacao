import { empresa } from './empresa';
import type { Pergunta } from './faq';

const temPendencia = (texto: string) => texto.includes('[PREENCHER');

/** JSON-LD HVACBusiness (Home). Campos ainda sem dado do cliente são omitidos. */
export function jsonLdEmpresa(site: URL) {
  const url = (caminho: string) => new URL(caminho, site).href;

  return {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    '@id': url('/#empresa'),
    name: empresa.nome,
    ...(empresa.razaoSocial && { legalName: empresa.razaoSocial }),
    url: url('/'),
    logo: url('/icone-512.png'),
    image: url('/og-imagem.png'),
    description:
      'Instalação, manutenção preventiva e corretiva, higienização e PMOC de ar condicionado para residências, comércio e indústria.',
    telephone: `+${empresa.telefones[0].numero}`,
    email: empresa.email,
    taxID: empresa.cnpj,
    ...(empresa.anoFundacao && { foundingDate: String(empresa.anoFundacao) }),
    address: {
      '@type': 'PostalAddress',
      ...(empresa.endereco && { streetAddress: empresa.endereco }),
      addressLocality: empresa.cidadePrincipal,
      addressRegion: empresa.uf,
      addressCountry: 'BR',
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Região Metropolitana de Belo Horizonte' },
      ...(empresa.cidadesAtendidas ?? [empresa.cidadePrincipal]).map((cidade) => ({
        '@type': 'City',
        name: cidade,
      })),
    ],
    // Horário comercial; o plantão de fim de semana fica só no texto do site.
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: `+${empresa.whatsapp.numero}`,
      availableLanguage: 'Portuguese',
    },
    // PREENCHER quando houver: sameAs (link do Perfil da Empresa no Google)
  };
}

/** JSON-LD FAQPage. Perguntas com resposta pendente ficam de fora. */
export function jsonLdFaq(perguntas: Pergunta[]) {
  const validas = perguntas.filter((p) => !temPendencia(p.resposta));
  if (!validas.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: validas.map((p) => ({
      '@type': 'Question',
      name: p.pergunta,
      acceptedAnswer: { '@type': 'Answer', text: p.resposta },
    })),
  };
}
