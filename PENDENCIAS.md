# Pendências antes de publicar — dmclimatizacao.com.br

Tudo abaixo aparece no site como `[PREENCHER: ...]` (destacado em amarelo) ou como quadro tracejado de foto.
Onde preencher: quase tudo em `src/data/empresa.ts`; o resto indicado em cada item.

## Dados da empresa (`src/data/empresa.ts`)
- [x] Ano de fundação: 2014 (início de atividade no CNPJ em 07/08/2014).
- [x] Cidades: Grande BH (14 principais listadas + "demais cidades da região metropolitana").
- [x] Horário: segunda a sexta, 8h às 18h.
- [x] Plantão aos sábados e domingos.
- [x] Técnico responsável: Denis Guedes de Oliveira, registrado no CFT (TRT). Nº de registro não publicado (tem formato de CPF; informar só no TRT/contrato).
- [x] Razão social: Denis Guedes de Oliveira (publicada sem o CPF que consta no nome empresarial).
- [ ] Endereço: não publicado (sede no Diamante/Barreiro é de empresário individual). Mostrar só o bairro se o cliente quiser.

## Sobre (`src/pages/sobre.astro`)
- [ ] 1 ou 2 frases sobre a origem da empresa (quem fundou, experiência, marcos).
- [ ] Quantidade de técnicos na equipe.
- [ ] Marcas em que a equipe tem treinamento ou credenciamento **comprovado**.

## Clientes e prova social
- [ ] **Autorização de uso de cada logo** (Arezzo, Banco do Brasil, Caixa, Vallourec, C&A, Aços Alpha, Sava, Windsor, Puket, Cine TJ, Morana). Marcar `autorizado: true` em `src/data/clientes.ts`; os não autorizados saem do site.
- [ ] **3 casos de obra** (`src/pages/clientes.astro`): cliente ou segmento, serviço, quantidade de equipamentos, ano, 2–3 linhas e foto.
- [ ] **3 a 5 depoimentos** ou link do Perfil da Empresa no Google (Home).

## Fotos reais (8)
- [ ] Home: técnico uniformizado instalando um split.
- [ ] Higienização: antes e depois da serpentina.
- [ ] Instalação: técnico fazendo vácuo na tubulação.
- [ ] Sobre: equipe ao lado do veículo da empresa.
- [ ] Sobre: técnicos em serviço numa casa de máquinas ou cobertura.
- [ ] Clientes: 3 fotos das obras em destaque.

## Marca
- [ ] **Logo em vetor**: exportar o `Logo.cdr` como SVG (texto em curvas) e PNG de 1000px com fundo transparente. Depois, `npm run imagens` regenera favicon e imagem de compartilhamento.

## Revisar antes de publicar
- [ ] Texto sobre a **Lei 13.589/2018** na página PMOC (referências no topo de `src/pages/pmoc.astro`).
- [ ] Política de privacidade: data de publicação e, se entrar Google Analytics, atualizar a seção de cookies.
