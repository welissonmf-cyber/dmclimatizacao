# Roteiro de reformulação — dmclimatizacao.com.br

Documento de trabalho para executar no **Claude Code**. Coloque este arquivo na raiz do repositório novo (pode renomear para `CLAUDE.md` para ele ser lido automaticamente em toda sessão) e execute fase por fase.

---

## 1. Diagnóstico do site atual

Levantamento feito nas 5 páginas públicas (Home, Serviços, Portfólio, Contato, Sobre).

### Técnico
- Feito no **WebAcappella 4.6.10** (editor WYSIWYG para Windows, geração ~2014). Esse tipo de gerador usa posicionamento absoluto: o layout praticamente não é responsivo e fica ruim no celular, que é de onde vem a maior parte de quem procura "manutenção de ar condicionado".
- Menu escrito com letras espaçadas por caractere (`S E R V I Ç O S`). Leitor de tela lê letra por letra e o Google não entende como palavra. Espaçamento tem que ser feito em CSS (`letter-spacing`), não no texto.
- Menu duplicado em todas as páginas (cabeçalho e rodapé idênticos, com os mesmos links).
- `<title>` genérico: "Home", "Serviços", "Contato", "Portifolio" (com erro de grafia). Nenhum cita ar condicionado nem BH.
- Mesma meta description em 4 páginas, com erro ("eresidenciais"). Meta keywords (obsoleta, o Google ignora) com erro ("ambirnte").
- Formulário de contato com botões `javascript:void(0)` — **testar se realmente envia**. É comum formulário desses geradores parar de funcionar quando o script do servidor some.
- Nenhum link de WhatsApp, nenhum `tel:` clicável.
- Imagens sem indicação de texto alternativo relevante; várias versões de cache (`?v=`) indicando exportação manual.

### Conteúdo
- A Home **abre com um aviso negativo** (perda de garantia) em vez de dizer o que a empresa faz, onde atende e como pedir orçamento.
- Não existe chamada para ação clara em nenhuma página.
- Erros de português: "váreas", "ás necessidade", "Possuimos", "alem", "A mais de sete anos" (→ "Há mais de"), "com o proposto" (→ "propósito"), "Dm Climatização", "C O N T A T 0" (zero no lugar do O).
- Contradição no Sobre: "há mais de sete anos no mercado" e, na frase seguinte, "apesar de sermos uma empresa recente". O CNPJ 20.795.576 é de por volta de 2014, então hoje são cerca de 12 anos — **confirmar a data de abertura** e usar isso como argumento de confiança.
- Legislação citada só a Portaria 3.523/98. Hoje o argumento forte para empresas é a **Lei 13.589/2018**, que tornou o PMOC obrigatório em edifícios de uso público e coletivo (verificar redação antes de publicar).
- Lista de serviços é só uma lista de tipos de aparelho. Não cita inverter, higienização, PMOC como produto, laudo/ART, carga de gás, infraestrutura para obra.
- "Sistema Split Multi-Variável" → o mercado procura por **VRF / VRV**.
- Portfólio é uma parede de logos sem contexto, e cada logo leva o visitante para o site do cliente (tira a pessoa do seu site). Caixa sem link, alguns em `http://`.
- Três celulares e um fixo no Contato, só um no rodapé. Não há endereço, área de atendimento, horário nem mapa.
- Sem depoimentos, sem avaliações do Google, sem fotos reais de serviços executados.

### Visual
Não consegui renderizar o site graficamente daqui, então a avaliação visual acima vem da estrutura. Antes da Fase 2, tire prints do site atual (desktop e celular) e passe para o Claude Code como referência do "antes".

---

## 2. Informações a levantar com o cliente (antes de codar)

Sem isso o site novo fica genérico. Marque o que já tiver:

- [ ] Número oficial de WhatsApp (qual dos três celulares) e se o fixo 3387-4960 ainda existe
- [ ] E-mail que recebe os contatos
- [ ] Endereço (ou só bairro/cidade) e **cidades atendidas** (BH, Contagem, Betim, Nova Lima...?)
- [ ] Horário de atendimento e se faz atendimento emergencial
- [ ] Ano de fundação
- [ ] Engenheiro responsável técnico (nome + CREA) — necessário para vender PMOC com ART
- [ ] Marcas em que tem credenciamento **real** (a imagem `marcas1.jpg` sugere autorizada; só afirmar o que for comprovável)
- [ ] Logo em vetor (SVG/AI/PDF) ou pelo menos PNG grande
- [ ] 10–20 fotos reais: equipe uniformizada, veículo, instalações antes/depois, casa de máquinas, VRF
- [ ] Autorização para exibir logos de clientes (Arezzo, Banco do Brasil, Caixa, Vallourec etc. costumam exigir)
- [ ] 3–5 depoimentos ou link do Perfil da Empresa no Google
- [ ] Acesso à hospedagem atual (FTP/painel) e ao Cloudflare (o site já passa pelo Cloudflare)

---

## 3. Decisões de projeto

### Stack
- **Astro** em modo estático (`output: 'static'`, `build.format: 'file'`). Gera HTML puro, rápido, com header/footer reaproveitados como componentes, e com `build.format: 'file'` mantém URLs `servicos.html`, `sobre.html` etc. — sem perder o que já está indexado.
- CSS próprio com variáveis (sem framework pesado). JavaScript mínimo (menu mobile e FAQ).
- Alternativa se quiser zero build: HTML + CSS puro, com o Claude Code mantendo header/footer sincronizados.

### Hospedagem
- Opção A: continuar na hospedagem atual, subindo a pasta `dist/` via FTP.
- Opção B (recomendada): **Cloudflare Pages** ligado ao repositório Git. Já usa Cloudflare no DNS, HTTPS grátis, deploy a cada push.

### Formulário
- Canal principal: **WhatsApp** (`https://wa.me/55319XXXXXXXX?text=...` com mensagem pré-preenchida por serviço).
- Formulário secundário: Formspree / Web3Forms (sem servidor) ou script PHP se a hospedagem atual suportar. Incluir aviso LGPD curto ao lado do botão.

### Identidade visual (proposta — ajustar ao logo)
Direção: técnica, limpa e confiável, puxando para o universo do ofício — o frio do ar e o **cobre da tubulação**, que é o material que todo técnico de refrigeração reconhece. Evitar o clichê de "azul-gelo com floco de neve".

| Token | Hex | Uso |
|---|---|---|
| `--azul-tecnico` | `#12324A` | Cabeçalho, rodapé, títulos |
| `--azul-ar` | `#2E7DA6` | Links, ícones, detalhes |
| `--gelo` | `#EEF4F7` | Fundo de seções alternadas |
| `--cobre` | `#B0602C` | Botões de ação (WhatsApp/orçamento) e destaques pontuais |
| `--texto` | `#1C2833` | Texto corrido |
| `--branco` | `#FFFFFF` | Fundo principal |

Se o logo tiver cores próprias fortes, elas substituem `--azul-tecnico`/`--azul-ar`; o cobre continua como cor de ação. Validar contraste AA (texto branco sobre `--cobre` passa).

Tipografia: **Barlow Semi Condensed** (títulos, 600–700) + **Barlow** (texto, 400/500). Família de inspiração industrial, legível no celular, com um só "sotaque". Hospedar as fontes localmente.

Princípios:
- O elemento marcante são as **fotos reais** de serviço. Banco de imagem genérico só como provisório.
- Sem animação de entrada em toda seção; no máximo uma no hero.
- Texto em caixa normal (nada de títulos em maiúsculas espaçadas).
- Mobile first: botão de WhatsApp fixo no canto no celular.

---

## 4. Nova estrutura e conteúdo

### Mapa do site
| URL | Página | Observação |
|---|---|---|
| `index.html` | Home | Mantida |
| `servicos.html` | Serviços (visão geral) | Mantida |
| `pmoc.html` | PMOC para empresas | **Nova** — página de maior valor comercial |
| `higienizacao.html` | Limpeza e higienização | **Nova** — serviço de maior volume residencial |
| `instalacao.html` | Instalação | **Nova** |
| `clientes.html` | Clientes e obras | Substitui `portfolio.html` (redirect 301) |
| `sobre.html` | A empresa | Mantida, reescrita |
| `contato.html` | Contato | Mantida |
| `privacidade.html` | Política de privacidade | **Nova** (LGPD) |

### Home — ordem das seções
1. **Hero**: título direto ("Instalação e manutenção de ar condicionado em BH e região"), subtítulo com residencial, comercial e industrial, dois botões ("Pedir orçamento no WhatsApp" e "Ligar agora"), foto real de técnico em serviço.
2. **Faixa de confiança**: anos de mercado, CNPJ, garantia no serviço, veículos próprios, equipe treinada por fabricantes.
3. **Serviços**: instalação, manutenção preventiva, corretiva, higienização, PMOC, projetos/VRF — cada um com uma linha e link.
4. **Para empresas — PMOC**: bloco próprio explicando a obrigatoriedade (Lei 13.589/2018), o que o contrato inclui e botão "Solicitar visita técnica".
5. **Por que manutenção**: reaproveitar a lista atual (rendimento, vida útil, consumo, saúde do ar), reescrita em frases curtas.
6. **Como funciona**: contato → visita/orçamento → execução → garantia e relatório. (Aqui numerar faz sentido porque é sequência.)
7. **Clientes atendidos**: logos autorizados, em tons de cinza, sem link externo.
8. **Depoimentos** / nota do Google.
9. **Perguntas frequentes**: de quanto em quanto tempo limpar, quanto custa instalar, atende inverter, emite ART, atende fim de semana etc.
10. **Área de atendimento + contato**: cidades, horário, telefones clicáveis, WhatsApp.

O aviso sobre garantia sai do topo e vira uma pergunta do FAQ ("A manutenção com empresa não autorizada pode tirar a garantia?").

### Serviços — reescrita
- Agrupar por **necessidade do cliente**, não por tipo de aparelho: "Para sua casa", "Para escritório e comércio", "Para indústria e grandes ambientes".
- Tipos de equipamento (janela, hi-wall, cassete, piso-teto, multi-split, built-in/dutado, VRF/VRV) viram uma tabela de referência secundária.
- Incluir: split inverter, higienização completa, recarga de gás/detecção de vazamento, infraestrutura para obra (tubulação embutida), laudo técnico, PMOC com ART.

### Sobre — reescrita
- Corrigir a contradição de tempo de mercado.
- Parágrafo curto de história + equipe (com foto) + responsável técnico + diferenciais concretos.
- Remover adjetivos vazios ("extremamente qualificados", "vastos anos"); trocar por fatos (quantos técnicos, marcas em que são treinados, anos de experiência do responsável).

### Clientes (ex-Portfólio)
- Logos autorizados + 3 a 6 **casos** curtos com foto: "Loja X — instalação de 8 cassetes", "Indústria Y — contrato de PMOC desde 20XX".

### Contato
- WhatsApp em destaque, telefones como `tel:`, e-mail como `mailto:`, formulário com campos: nome, telefone/WhatsApp, cidade, tipo de serviço (select), mensagem.
- Mapa incorporado só se houver endereço de atendimento ao público.

---

## 5. SEO e técnico

- `<title>` e meta description únicos por página, com serviço + cidade. Ex.: "Manutenção de Ar Condicionado em BH | DM Climatização".
- Remover meta keywords.
- Um único `<h1>` por página; hierarquia correta de `h2`/`h3`.
- Dados estruturados JSON-LD `HVACBusiness` (nome, telefone, área atendida, horário, logo, CNPJ em `taxID`) na Home; `FAQPage` no FAQ.
- `sitemap.xml`, `robots.txt`, URL canônica, Open Graph (imagem para quando o link for enviado no WhatsApp).
- Redirect 301 `portfolio.html` → `clientes.html` (via `_redirects` no Cloudflare Pages ou `.htaccess`).
- Imagens em WebP/AVIF com `width`/`height`, `loading="lazy"` abaixo da dobra e `alt` descritivo.
- Favicon + ícones para celular.
- Meta de Lighthouse: ≥ 90 em Performance, Acessibilidade, Boas práticas e SEO no mobile.
- Fora do código, mas essencial: criar/atualizar o **Perfil da Empresa no Google** com o mesmo nome, telefone e área de atendimento do site.

---

## 6. Execução no Claude Code — fase por fase

Rodar uma fase por vez, revisando o resultado antes de seguir.

**Fase 0 — Backup e preparo**
```
Crie um repositório git novo. Faça um espelho do site atual com
wget --mirror --convert-links --page-requisites --no-parent https://dmclimatizacao.com.br/
dentro de /legado (não publicar). Liste as imagens aproveitáveis (logo, fotos, logos de clientes)
e copie para /src/assets/legado com nomes descritivos.
```

**Fase 1 — Base do projeto**
```
Inicialize um projeto Astro estático com build.format: 'file'. Crie os tokens de cor e tipografia
da seção 3 deste roteiro em src/styles/tokens.css, fontes Barlow e Barlow Semi Condensed hospedadas
localmente. Crie os componentes Header (menu responsivo com botão hambúrguer acessível),
Footer (CNPJ, telefones, WhatsApp, links, área de atendimento) e BotaoWhatsApp (fixo no mobile).
Centralize telefone, WhatsApp, e-mail e cidades em src/data/empresa.ts.
```

**Fase 2 — Páginas**
```
Implemente a Home seguindo exatamente a ordem da seção 4. Use os textos do site legado
como base, corrigindo todos os erros listados na seção 1. Onde faltar informação do cliente,
use marcador visível [PREENCHER: ...] em vez de inventar dados.
Depois faça servicos, pmoc, higienizacao, instalacao, clientes, sobre, contato e privacidade.
```

**Fase 3 — Formulário e contato**
```
Implemente o formulário de contato com [Formspree | Web3Forms | PHP], validação no navegador,
mensagem de sucesso e de erro claras, e aviso LGPD com link para privacidade.html.
Todos os botões de WhatsApp devem abrir com mensagem pré-preenchida indicando a página/serviço de origem.
```

**Fase 4 — SEO e desempenho**
```
Aplique todos os itens da seção 5: titles, descriptions, JSON-LD HVACBusiness e FAQPage,
sitemap, robots, canonical, Open Graph, otimização de imagens, redirect 301 de portfolio.html.
```

**Fase 5 — Revisão**
```
Rode Lighthouse no mobile e corrija até ≥ 90 nas 4 categorias. Verifique links quebrados,
contraste, navegação só por teclado e larguras de 360px, 768px e 1280px.
Liste todos os marcadores [PREENCHER] restantes.
```

**Fase 6 — Publicação**
```
Configure o deploy [Cloudflare Pages a partir do repositório | FTP da pasta dist para a hospedagem atual].
Mantenha o site antigo em backup até validar o novo em produção.
```

---

## 7. Depois do lançamento

- Enviar o sitemap no Google Search Console e acompanhar erros de indexação por 30 dias.
- Pedir avaliação no Google a cada cliente atendido (link direto no WhatsApp pós-serviço).
- Adicionar um caso novo na página de clientes a cada obra relevante — é o conteúdo que mais convence e mais ranqueia.
