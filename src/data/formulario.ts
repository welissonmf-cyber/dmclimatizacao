/**
 * Configuração do envio do formulário de contato.
 *
 * Web3Forms (padrão): gere a chave em https://web3forms.com informando o e-mail
 *   que vai receber as mensagens e cole em `web3formsChave`.
 * Formspree: crie o formulário em https://formspree.io, troque `provedor` para
 *   'formspree' e cole o ID (a parte depois de /f/) em `formspreeId`.
 *
 * As duas chaves são públicas por natureza (ficam no HTML); não são senha.
 */
export const configFormulario = {
  provedor: 'web3forms' as 'web3forms' | 'formspree',
  web3formsChave: 'b6c5cde7-6dc7-43a4-b940-0d0eb62653e4' as string | null,
  formspreeId: null as string | null,
};

export function endpointFormulario(): string | null {
  const c = configFormulario;
  if (c.provedor === 'web3forms') return c.web3formsChave ? 'https://api.web3forms.com/submit' : null;
  return c.formspreeId ? `https://formspree.io/f/${c.formspreeId}` : null;
}

export const nomeProvedor = configFormulario.provedor === 'web3forms' ? 'Web3Forms' : 'Formspree';
