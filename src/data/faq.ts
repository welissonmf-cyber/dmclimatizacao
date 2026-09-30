export interface Pergunta {
  pergunta: string;
  /** Texto simples (também vai para o JSON-LD FAQPage na Fase 4). */
  resposta: string;
}

/** FAQ da Home. Respostas sem preço nem prazo inventados. */
export const faqGeral: Pergunta[] = [
  {
    pergunta: 'De quanto em quanto tempo devo limpar o ar condicionado?',
    resposta:
      'Em residências com uso moderado, o recomendado é uma limpeza completa a cada 6 meses. Em escritórios, lojas e ambientes com uso diário intenso, o intervalo costuma ser de 3 meses, e os filtros devem ser limpos todo mês. Em empresas, a frequência é definida no PMOC.',
  },
  {
    pergunta: 'Quanto custa instalar um ar condicionado?',
    resposta:
      'Depende da potência do aparelho, da distância entre a unidade interna e a externa, do acesso à parede e da necessidade de infraestrutura elétrica. Por isso fazemos o orçamento depois de entender o local — mande fotos pelo WhatsApp que respondemos com o valor.',
  },
  {
    pergunta: 'Vocês atendem aparelhos inverter?',
    resposta:
      'Sim. Instalamos e fazemos manutenção em aparelhos inverter e convencionais de todas as principais marcas, incluindo diagnóstico de placa eletrônica.',
  },
  {
    pergunta: 'A manutenção com empresa não autorizada pode tirar a garantia?',
    resposta:
      'Pode. Cada fabricante tem suas regras: alguns exigem que a instalação seja feita por empresa credenciada para manter a garantia. Antes de instalar ou mexer em um aparelho na garantia, verifique o manual ou nos envie o modelo que conferimos para você.',
  },
  {
    pergunta: 'Vocês emitem ART e laudo técnico?',
    resposta:
      'Sim. Para contratos de PMOC e laudos técnicos, emitimos a ART (Anotação de Responsabilidade Técnica) junto ao CREA, assinada pelo engenheiro responsável. [PREENCHER: confirmar engenheiro responsável e CREA]',
  },
  {
    pergunta: 'Qual a diferença entre limpeza e higienização?',
    resposta:
      'A limpeza simples cuida dos filtros e da parte externa. A higienização completa desmonta a evaporadora, lava a serpentina e a turbina com produtos bactericidas e limpa a bandeja e o dreno — é o que elimina mau cheiro, fungos e bactérias.',
  },
  {
    pergunta: 'Atendem fim de semana e emergências?',
    resposta:
      '[PREENCHER: confirmar se há atendimento aos sábados, domingos e emergências]',
  },
];
