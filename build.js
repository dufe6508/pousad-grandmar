/* Gerador estático da Pousada Grandmar — Maragogi (AL).
   Sem framework: cada página é montada a partir de um layout comum + o corpo
   definido em src/pages/all.js. Rode `node build.js` para (re)gerar os .html.
   As URLs limpas (/a-pousada) são resolvidas pelo cleanUrls do vercel.json. */
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const ROOT = __dirname;
const SPRITE = fs.readFileSync(path.join(ROOT, 'src/icons.svg'), 'utf8').trim();

/* hash curto do conteúdo p/ cache-busting: ?v=... só muda quando o arquivo muda,
   então o CSS/JS cacheado pelo header de /assets cai sozinho a cada deploy. */
const ver = (rel) => {
  var buf = fs.readFileSync(path.join(ROOT, rel));
  return rel + '?v=' + crypto.createHash('sha1').update(buf).digest('hex').slice(0, 8);
};

const SITE = 'https://pousadagrandmar.vercel.app';
const WA_HERO = 'Olá! Vim pelo site da Pousada Grandmar e gostaria de consultar disponibilidade.';

const ico = (n, cls) =>
  `<svg class="${cls || 'ico'}" aria-hidden="true"><use href="#i-${n}"></use></svg>`;

/* Marca da pousada: sol sobre o mar aberto. Vai inline (e não como <img>) para
   herdar a cor do contexto — branca sobre o hero escuro das páginas internas,
   azul quando o header fica sólido, turquesa no rodapé. */
const MARK = `<svg class="brand__mark" viewBox="0 0 48 46" aria-hidden="true">
        <circle cx="24" cy="15" r="8.5" fill="none" stroke="currentColor" stroke-width="2.2"/>
        <path d="M2 29c4.6 0 4.6 4 9.2 4s4.6-4 9.2-4 4.6 4 9.2 4 4.6-4 9.2-4 4.6 4 9.2 4" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" opacity=".62"/>
        <path d="M2 37c4.6 0 4.6 4 9.2 4s4.6-4 9.2-4 4.6 4 9.2 4 4.6-4 9.2-4 4.6 4 9.2 4" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" opacity=".32"/>
      </svg>`;

/* Divisor de onda — mesmo desenho da marca, esticado. Separa um bloco claro de
   um bloco escuro sem precisar de borda reta. `up` inverte a curva. */
const wave = (up) =>
  `<svg class="wave-div${up ? ' wave-div--up' : ''}" viewBox="0 0 1440 26" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0 26V8c120 0 120 10 240 10S360 8 480 8s120 10 240 10S840 8 960 8s120 10 240 10 120-10 240-10v18Z" fill="currentColor"/>
  </svg>`;

/* páginas na ordem do menu */
const NAV = [
  ['/', 'Início', 'index'],
  ['/a-pousada', 'A pousada', 'a-pousada'],
  ['/acomodacoes', 'Acomodações', 'acomodacoes'],
  ['/estrutura', 'Estrutura', 'estrutura'],
  ['/galeria', 'Galeria', 'galeria'],
  ['/maragogi', 'Maragogi', 'maragogi'],
  ['/contato', 'Contato', 'contato'],
];

const navLinks = (active, cls, withArrow) =>
  NAV.map(function (n) {
    var cur = n[2] === active ? ' aria-current="page"' : '';
    var arrow = withArrow ? ' ' + ico('arrow-right') : '';
    return '<a class="' + cls + '" href="' + n[0] + '"' + cur + '>' + n[1] + arrow + '</a>';
  }).join('\n      ');

function layout(page) {
  var active = page.slug;
  var canonical = SITE + (page.path === '/' ? '/' : page.path);
  var og = page.og || 'img/og.jpg';
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${page.title}</title>
<meta name="description" content="${page.desc}">
<meta name="theme-color" content="#06283F">
<link rel="canonical" href="${canonical}">

<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="Pousada Grandmar">
<meta property="og:title" content="${page.ogTitle || page.title}">
<meta property="og:description" content="${page.desc}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE}/${og}">
<meta name="twitter:card" content="summary_large_image">

<link rel="icon" href="img/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="img/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
${page.preload || ''}<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,400..700&family=Karla:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${ver('assets/styles.css')}">
<noscript><style>.reveal{opacity:1}</style></noscript>
${page.jsonld ? '<script type="application/ld+json">' + JSON.stringify(page.jsonld) + '</script>' : ''}
</head>
<body data-page="${active}">
${SPRITE}

<a class="skip" href="#main">Ir para o conteúdo</a>

<div class="tide" id="tide" aria-hidden="true"></div>

<header class="header${page.solidHeader ? ' header--solid is-stuck' : ''}" id="header">
  <div class="header__inner">
    <a class="brand" href="/">
      ${MARK}
      <span>
        <span class="brand__name">Pousada Grandmar</span>
        <span class="brand__sub">Maragogi · Alagoas</span>
      </span>
    </a>
    <nav class="nav" aria-label="Navegação principal">
      ${navLinks(active, 'nav__link')}
    </nav>
    <a class="btn btn--sm btn--onmedia header__cta" href="#" data-wa="${WA_HERO}">
      ${ico('whatsapp-logo-fill')} Reservar
    </a>
    <button class="burger" type="button" id="burger" aria-expanded="false" aria-controls="drawer">
      <span class="burger__lines" aria-hidden="true"><i></i><i></i><i></i></span>
      <span class="sr-only">Abrir menu</span>
    </button>
  </div>
</header>

<div class="drawer" id="drawer" data-open="false" role="dialog" aria-modal="true" aria-label="Menu">
  <div class="drawer__top">
    <a class="brand" href="/">
      ${MARK}
      <span>
        <span class="brand__name" style="color:var(--brand-900)">Pousada Grandmar</span>
        <span class="brand__sub" style="color:var(--muted)">Maragogi · Alagoas</span>
      </span>
    </a>
    <button class="drawer__close" type="button" id="drawerClose" aria-label="Fechar menu">${ico('x')}</button>
  </div>
  <nav aria-label="Navegação">
    ${navLinks(active, 'drawer__link', true)}
  </nav>
  <div class="drawer__actions">
    <a class="btn btn--whats btn--block" href="#" data-wa="${WA_HERO}">${ico('whatsapp-logo-fill')} Falar no WhatsApp</a>
    <a class="btn btn--outline btn--block" href="https://www.instagram.com/pousadagrandmarmaragogi/" target="_blank" rel="noopener">${ico('instagram-logo-fill')} Ver no Instagram</a>
    <p class="drawer__meta">Rua Arlindo Lins de Melo, 327 · Maragogi (AL)</p>
  </div>
</div>

<main id="main">
${page.body}
</main>

${prefooter(page)}
${footer(active)}

<a class="fab" id="fab" href="#" data-wa="${WA_HERO}" target="_blank" rel="noopener" aria-label="Falar com a pousada no WhatsApp">
  ${ico('whatsapp-logo-fill', 'fab__ico')}
  <span class="fab__label">Reservar no WhatsApp</span>
</a>

<button class="totop" id="totop" type="button" aria-label="Voltar ao topo">${ico('caret-down', 'ico')}</button>

<div class="lightbox" id="lightbox" data-open="false" role="dialog" aria-modal="true" aria-label="Galeria de fotos">
  <div class="lightbox__top">
    <span class="lightbox__title" id="lbTitle"></span>
    <button class="lb-btn" type="button" id="lbClose" aria-label="Fechar galeria">${ico('x')}</button>
  </div>
  <div class="lightbox__stage" id="lbStage">
    <button class="lb-edge lb-edge--prev" type="button" id="lbPrev" aria-label="Foto anterior">${ico('caret-left')}</button>
    <img id="lbImg" alt="" hidden>
    <button class="lb-edge lb-edge--next" type="button" id="lbNext" aria-label="Próxima foto">${ico('caret-right')}</button>
  </div>
  <div class="lightbox__foot" aria-live="polite">
    <p class="lightbox__cap" id="lbCap"></p>
    <span class="lightbox__count" id="lbCount"></span>
  </div>
</div>

<script src="${ver('assets/vendor/gsap.min.js')}"></script>
<script src="${ver('assets/vendor/ScrollTrigger.min.js')}"></script>
<script src="${ver('assets/data.js')}"></script>
<script src="${ver('assets/app.js')}"></script>
<script src="${ver('assets/motion.js')}"></script>
</body>
</html>
`;
}

/* encerramento comum: o convite à reserva antes do rodapé, em todas as páginas */
function prefooter(page) {
  var bg = page.prefooterImg || 'img/t/praia-natureza-05.webp';
  return `${wave(false)}
<section class="prefooter" aria-label="Reservas">
  <img class="prefooter__bg" src="${bg}" alt="" loading="lazy" decoding="async">
  <div class="prefooter__inner">
    <p class="eyebrow eyebrow--light">Sua estadia em Maragogi</p>
    <h2>Quer saber se temos <span class="accent-i">vaga</span> nas suas datas?</h2>
    <p class="prefooter__lead">Fale direto com a pousada: a gente confirma disponibilidade, explica cada acomodação e ajuda a montar os passeios.</p>
    <div class="prefooter__actions">
      <a class="btn btn--light" href="#" data-wa="${WA_HERO}">${ico('calendar-blank')} Consultar disponibilidade</a>
      <a class="btn btn--onmedia" href="#" data-wa="Olá! Vim pelo site da Pousada Grandmar e queria tirar uma dúvida.">${ico('whatsapp-logo-fill')} Falar no WhatsApp</a>
    </div>
    <p class="prefooter__note">Quem responde é a própria pousada · WhatsApp (81) 99829-2985</p>
  </div>
</section>`;
}

function footer(active) {
  return `<footer class="footer">
  <div class="shell">
    <div class="footer__grid">
      <div>
        <a class="brand" href="/" style="margin-right:0">
          ${MARK}
          <span>
            <span class="brand__name">Pousada Grandmar</span>
            <span class="brand__sub">Maragogi · Alagoas</span>
          </span>
        </a>
        <p class="footer__about">Pousada pé na areia na praia de Maragogi, com piscina, quiosque e café da manhã feito na hora.</p>
        <div class="socials">
          <a href="https://www.instagram.com/pousadagrandmarmaragogi/" target="_blank" rel="noopener" aria-label="Instagram da Pousada Grandmar">${ico('instagram-logo-fill')}</a>
          <a href="#" data-wa="Olá! Vim pelo site da Pousada Grandmar." aria-label="WhatsApp da Pousada Grandmar">${ico('whatsapp-logo-fill')}</a>
        </div>
      </div>
      <div>
        <p class="footer__h">Navegação</p>
        <ul>
          ${NAV.map(function (n) { return '<li><a href="' + n[0] + '">' + n[1] + '</a></li>'; }).join('\n          ')}
        </ul>
      </div>
      <div>
        <p class="footer__h">Contato</p>
        <address>
          Rua Arlindo Lins de Melo, 327 — Carotes<br>
          Maragogi / AL · CEP 57955-000<br><br>
          <a href="https://wa.me/5581998292985" target="_blank" rel="noopener">(81) 99829-2985</a> · central de reservas
        </address>
        <a class="btn btn--outline btn--sm" style="margin-top:var(--s4);color:#fff;border-color:rgba(255,255,255,.28)" href="#" data-wa="${WA_HERO}">${ico('whatsapp-logo-fill')} Reservar no WhatsApp</a>
      </div>
    </div>
    <div class="footer__bar">
      <span>© <span id="ano">2026</span> Pousada Grandmar · Maragogi (AL).</span>
      <span>Reservas pelo WhatsApp e pelos canais oficiais da pousada</span>
    </div>
  </div>
</footer>`;
}

/* cabeçalho curto de página interna — não repete o hero da Home */
function pageHead(opts) {
  var crumb = '<nav class="crumb" aria-label="Você está aqui"><a href="/">Início</a>' +
    ico('caret-right') + '<span>' + opts.crumb + '</span></nav>';
  return `<section class="phead${opts.img ? ' phead--img' : ''}">
    ${opts.img ? '<img class="phead__bg" src="' + opts.img + '" alt="" fetchpriority="high">' : ''}
    <div class="shell">
      ${crumb}
      <p class="eyebrow eyebrow--light">${opts.eyebrow}</p>
      <h1>${opts.title}</h1>
      ${opts.lead ? '<p class="phead__lead">' + opts.lead + '</p>' : ''}
    </div>
  </section>`;
}

module.exports = { layout, pageHead, ico, SITE, NAV, WA_HERO };

/* ------------------------------------------------------------------ build */
if (require.main === module) {
  var pages = require('./src/pages/all.js');
  pages.forEach(function (p) {
    fs.writeFileSync(path.join(ROOT, p.slug + '.html'), layout(p));
    console.log('  ->', p.slug + '.html');
  });

  /* sitemap sempre em dia com o NAV */
  var urls = pages.map(function (p) {
    return '  <url><loc>' + SITE + (p.path === '/' ? '/' : p.path) + '</loc></url>';
  }).join('\n');
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'),
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls + '\n</urlset>\n');

  console.log('ok:', pages.length, 'páginas + sitemap.xml');
}
