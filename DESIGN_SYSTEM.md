# Design system — Pousada Grandmar

Direção: **luz da manhã na areia**. Base clara e quente, azul-petróleo
dessaturado da logo, verde-água das piscinas naturais. Nada de bloco de cor
forte, nada de aparência de plataforma de tecnologia: o site tem que parecer
uma pousada pequena, arejada e bem cuidada.

Fonte da verdade: `assets/styles.css`. Este arquivo explica; o CSS define.
Nenhum valor de cor, espaço, raio ou duração deve aparecer solto numa página.

---

## Assinatura: a linha de maré

Barra de 3px no topo, em verde-água, que enche conforme a página rola (`.tide`,
animada no `motion.js` com ScrollTrigger). É a barra de progresso do site e o
único elemento puramente gráfico do projeto — diz algo verdadeiro sobre uma
pousada onde os passeios dependem da tábua das marés. O resto é disciplinado.

## Cores

Tokens semânticos, nunca paleta crua de framework. Trocar tema = trocar valor de
token, não reescrever componente — é assim que o modo escuro funciona.

| Papel | Token | Valor | De onde vem |
|---|---|---|---|
| Marca escura | `--brand-900` | `#16323C` | azul-petróleo, o tom mais fundo |
| Marca | `--brand-800` / `--brand-700` | `#1F4E5F` / `#2A6E86` | mar aberto |
| Marca clara | `--brand-600` / `--brand-300` / `--brand-100` | `#4A8FA6` / `#A9CBD5` / `#E7F0F2` | água rasa |
| Acento | `--aqua-700` / `--aqua-400` / `--aqua-200` | `#3C8C84` / `#6BAFA8` / `#C2DFDA` | piscinas naturais das Galés |
| Areia | `--sand` | `#C99A4E` | só nas estrelas do selo de avaliação |
| Fundo | `--bg` / `--surface` / `--surface-2` | `#FBF9F5` / `#FFFFFF` / `#F3F0E9` | areia clara e cal |
| Seção alternada | `--shore` | `#EDF3F2` | verde-água lavado |
| Texto | `--ink` / `--ink-2` / `--muted` | `#16323C` / `#4A6570` / `#7C8E96` | — |
| Linha | `--line` / `--line-strong` | `#E6E1D7` / `#D3CCBE` | — |
| Ação | `--cta` / `--cta-hover` | `#1F4E5F` / `#16323C` | — |
| WhatsApp | `--whats` | `#2E8B57` | cor do canal, só nele |
| Vidro | `--glass` / `--glass-line` / `--glass-blur` | branco 16% / branco 42% / `blur(14px)` | header, etiquetas sobre foto, botão no hero |

**Modo escuro** por `prefers-color-scheme`: troca de valores no `:root`, nenhum
componente duplicado.

Regras:
- Sem gradiente como recurso visual. Exceções funcionais: a máscara de leitura
  sobre foto (`phead`, `prefooter`, `pcard__name`) e o scrim do header.
- Verde-água é acento — eyebrow, ícone, palavra destacada no título, filete.
  Nunca fundo de bloco inteiro.
- Nenhuma seção da home é um bloco chapado de cor forte. O contraste vem de
  foto, filete e mudança sutil de fundo.

## Tipografia

- Display: **Petrona** (serifada variável, contraste baixo, itálico de verdade).
  Títulos e nomes de acomodação. Peso 500, escala contida.
- Texto: **Karla** (humanista, boa em corpo pequeno). Parágrafos, rótulos,
  botões e listas — inclusive nos botões, para não pesar.
- Duas famílias, nada além. Contraste por peso e tamanho.
- `.accent-i` põe uma palavra do título em itálico da serifada, em verde-água —
  uma vez por título, no máximo.
- Escala contida de propósito: h1 `2–3,1rem`, h2 `1,6–2,15rem`, h3 `1,08–1,22rem`.
  Título grande não é hierarquia; é ruído.
- Corpo `1,0625rem` / `line-height 1.65`; `.lead` limitado a `62ch`.

## Espaçamento

Base 4: `--s1 .25rem` … `--s9 6rem`. Seções usam `--s8` no mobile e `--s9` no
desktop (`.sec`), com `.sec--tight` para blocos de respiro menor.
Conteúdo: `--shell` = `min(1220px, 100% - 2.5rem)` (4rem no desktop).

## Formas e elevação

- Raios: `--r-xs 6` · `--r-sm 12` (inputs) · `--r-md 18` (fotos, cards) ·
  `--r-lg 26` (fotos grandes, formulário) · `--r-full` (botões, chips, tiles).
- Botões são pílula — decisão consciente para o site parecer um lugar onde se
  reserva, não um folheto.
- Sombras: três níveis frios e fracos. Em foto e cartão de formulário; nunca em
  bloco de texto.
- Separação entre seções por **fundo, filete e onda**, não por moldura.

## Botões

O padrão é **leve**: borda fina e fundo quase ausente. Preenchimento sólido só
no WhatsApp, que é a ação de reserva — assim ele é o elemento mais visível da
página sem que o resto compita.

| Nível | Classe | Uso |
|---|---|---|
| Reserva | `.btn--whats` (verde sólido) | consultar disponibilidade, falar com a pousada |
| Primário | `.btn--primary` (contorno azul-petróleo) | ação principal fora do canal de reserva |
| Secundário | `.btn--outline` / `.btn--onmedia` (vidro) | navegação e apoio; `--onmedia` só sobre foto |
| Textual | `.tlink` / `.btn--ghost` | "ver todas", "ver a galeria", "ver em detalhe" |

Altura mínima 46px (38 no `--sm`), raio full, tipografia de texto (não display),
sem gradiente, sem glow, sem sombra forte. Hover, foco visível, active e disabled
definidos. Rótulos são ações concretas, nunca "Saiba mais".

O botão flutuante do WhatsApp é **só o ícone**, 52px, com o rótulo em `sr-only`.

## Home

A página inicial apresenta e encaminha; ela não conta o site inteiro. Ordem:
hero → faixa de destaques → a pousada (resumo) → três acomodações → estrutura
em lista curta → carrossel de áreas comuns → Maragogi (resumo) → chamada de
reserva → rodapé. Cada bloco tem um link para a página que aprofunda o assunto.

As avaliações saíram da home: a nota do Booking aparece no selo do hero e os
links das plataformas ficam no rodapé, em uma linha discreta (`.plats`).

## Header

Transparente com scrim sobre o hero escuro das páginas internas; sólido com
`backdrop-filter: blur(14px)` ao rolar. Na home, onde o hero é claro, já nasce
sólido (`solidHeader`). Marca à esquerda, **menu centralizado** com pílula no
item ativo, CTA de reserva à direita. Abaixo de 1040px vira burger + drawer
lateral com as mesmas rotas, WhatsApp, Instagram e endereço.

## Hero

Editorial dividido — texto à esquerda, colagem de fotos à direita. O título não
fica por cima da imagem: contraste sem depender de máscara escura, legível em
qualquer foto. Compõem o bloco o eyebrow com filete, o h1, o lead, dois CTAs e o
selo de avaliação (nota, estrelas e a fonte do dado). A colagem tem foto
principal 4:5, foto sobreposta 4:3 e a etiqueta de distância até a areia.
No mobile vira uma coluna: texto primeiro, colagem depois.

## Marca

Sol sobre o mar aberto, em SVG inline (`MARK` no `build.js`) para herdar
`currentColor` — branca sobre o hero escuro, azul no header sólido, turquesa no
rodapé. Também em `img/logo.svg` (versão colorida) e `img/favicon.svg`.

## Ícones

Um pacote só: sprite SVG em `src/icons.svg` (traço Phosphor, contorno). Tamanho
`1.2em` acompanhando a tipografia; em destaque, dentro de tile arredondado com
fundo `--tint`. Sempre `aria-hidden` quando o texto ao lado já diz a informação.

## Movimento

GSAP 3.15 + ScrollTrigger, vendorizados em `assets/vendor/`, orquestrados em
`assets/motion.js`:

- linha de maré presa ao progresso da página (`scrub`)
- abertura do hero em cascata: eyebrow → título → lead → CTAs → selo, com a
  colagem entrando logo atrás e a foto sobreposta atrasada
- parallax de -6% na foto principal do hero
- entrada em lote dos `.reveal` (opacidade + 16px, stagger 0,07s)
- faixa de destaques e `phead` em cascata curta
- hover em CSS: `--t-fast 140ms`, `--t 240ms`, `--t-slow 620ms`, com
  `--ease cubic-bezier(.22,1,.36,1)`

`prefers-reduced-motion: reduce`, GSAP ausente ou JS desligado (`<noscript>`):
página inteira visível, sem transição e sem linha de maré.

## Acessibilidade

- Foco visível em tudo (`:focus-visible`, 3px, claro sobre fundo escuro).
- `skip link`; `inert` no resto da página com drawer ou lightbox aberto.
- Lightbox com teclado (Esc, setas) e gesto de arrastar no toque.
- HTML semântico: `button` para ação, `a` para navegação, `details` no FAQ,
  `figure/figcaption` na colagem do hero.
- Alvos de toque ≥ 42px; `touch-action: manipulation` nos controles.
- `scroll-margin-top` nas âncoras de acomodação, para não pararem sob o header.
- Informação nunca só por cor.

## O que este projeto não faz

Sem gradiente colorido, glassmorphism decorativo, aurora, sombra colorida,
brilho, círculo decorativo, card para tudo, ícone em círculo colorido em toda
seção, título centralizado no meio da foto, seção só para preencher espaço.
