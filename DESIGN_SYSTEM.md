# Design system — Pousada Grandmar

Direção: **maré alta**. Clareza de plataforma de reserva (o hóspede já sabe ler
esse tipo de página) com voz própria — azul da logo, turquesa das piscinas
naturais das Galés e um grotesco de personalidade nos títulos, em vez da
serifada que todo site de pousada usa.

Fonte da verdade: `assets/styles.css`. Este arquivo explica; o CSS define.
Nenhum valor de cor, espaço, raio ou duração deve aparecer solto numa página.

---

## Assinatura: a linha de maré

O único elemento puramente gráfico do projeto, e ele diz algo verdadeiro sobre
uma pousada onde os passeios dependem da tábua das marés:

1. **Barra de progresso** turquesa de 3px no topo, que enche conforme a página
   rola (`.tide`, animada no `motion.js` com ScrollTrigger).
2. **Divisor de onda** (`wave()` no `build.js`) separando o bloco claro do bloco
   escuro antes da chamada de reserva. É o mesmo desenho das ondas da marca,
   esticado na largura da tela.

Toda a boldness do projeto está aqui. O resto é disciplinado de propósito.

## Cores

Tokens semânticos, nunca paleta crua de framework. Trocar tema = trocar valor de
token, não reescrever componente — é assim que o modo escuro funciona.

| Papel | Token | Valor | De onde vem |
|---|---|---|---|
| Marca escura | `--brand-900` | `#082A3F` | azul da logo, no tom mais fundo |
| Marca | `--brand-800` / `--brand-700` | `#0A4E6D` / `#0E6B93` | mar aberto |
| Marca clara | `--brand-600` / `--brand-300` / `--brand-100` | `#1B8CBA` / `#A7D2E4` / `#E6F1F6` | água rasa |
| Acento | `--aqua-700` / `--aqua-400` / `--aqua-200` | `#0E8A8F` / `#2EBEC2` / `#B4E5E5` | piscinas naturais das Galés |
| Areia | `--sand` | `#E8A33D` | só nas estrelas do selo de avaliação |
| Fundo | `--bg` / `--surface-2` | `#FFFFFF` / `#F1F5F6` | branco e vidro-do-mar |
| Seção alternada | `--shore` | `#EAF3F4` | azul lavado |
| Texto | `--ink` / `--ink-2` / `--muted` | `#082A3F` / `#35586C` / `#6A8595` | — |
| Linha | `--line` / `--line-strong` | `#E3EAEC` / `#C9D6DA` | — |
| Ação | `--cta` / `--cta-hover` | `#0A4E6D` / `#082A3F` | — |
| WhatsApp | `--whats` | `#12793F` | cor do canal, só nele |

**Modo escuro** por `prefers-color-scheme`: troca de valores no `:root`, nenhum
componente duplicado. Fundo `#071C29`, CTA vira turquesa para manter contraste.

Regras:
- Sem gradiente como recurso visual. Exceções, todas funcionais: a máscara de
  leitura sobre foto (`phead`, `pcard__name`), o scrim do header transparente e
  a própria linha de maré.
- Turquesa é acento — eyebrow, ícone, filete de citação, palavra destacada no
  título. Nunca fundo de bloco inteiro.
- Fundo escuro usa `--brand-900`, não preto puro.

## Tipografia

- Display: **Bricolage Grotesque** (variável, eixos `opsz` e `wdth`). Títulos,
  botões, nomes de acomodação e números grandes. Peso 600, `letter-spacing`
  negativo — o que dá a personalidade e diferencia de qualquer site de pousada
  com serifada.
- Texto: **Karla** (humanista, boa em corpo pequeno). Parágrafos, rótulos, listas.
- Duas famílias, nada além. Contraste por peso, largura e tamanho.
- `.accent-i` destaca uma palavra do título em turquesa e um grau mais estreita
  (`wdth 85`) — o recurso tipográfico da casa, uma vez por título.
- Escala fluida com `clamp()`: h1 `2,35–4,1rem`, h2 `1,85–2,75rem`, h3 `1,15–1,35rem`.
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

Três níveis, nada além:

| Nível | Classe | Uso |
|---|---|---|
| Primário | `.btn--primary` (ou `.btn--whats` no canal) | reservar, consultar disponibilidade |
| Secundário | `.btn--outline` / `.btn--light` / `.btn--onmedia` | navegação e ações de apoio |
| Textual | `.tlink` / `.btn--ghost` | "ver todas as categorias", "ver fotos" |

Altura mínima 50px (42 no `--sm`), raio full, sem gradiente, sem glow, sem sombra
forte. Hover, foco visível, active e disabled definidos. Rótulos são ações
concretas ("Consultar disponibilidade", "Como chegar"), nunca "Saiba mais".

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
