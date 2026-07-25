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

const MAPA_LINK = 'https://www.google.com/maps/search/?api=1&query=-9.01990964,-35.22438614';

/* páginas na ordem do menu */
const NAV = [
  ['/', 'Início', 'index'],
  ['/a-pousada', 'A pousada', 'a-pousada'],
  ['/acomodacoes', 'Acomodações', 'acomodacoes'],
  ['/estrutura', 'Estrutura', 'estrutura'],
  ['/galeria', 'Galeria', 'galeria'],
  ['/maragogi', 'Maragogi', 'maragogi'],
  ['/como-chegar', 'Como chegar', 'como-chegar'],
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
${page.preload || ''}<link href="https://fonts.googleapis.com/css2?family=Petrona:ital,wght@0,300..600;1,300..600&family=Karla:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${ver('assets/styles.css')}">
<link rel="stylesheet" href="${ver('assets/pages.css')}">
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
<script src="${ver('assets/pages.js')}"></script>
<script src="${ver('assets/motion.js')}"></script>
</body>
</html>
`;
}

/* encerramento comum: o convite à reserva antes do rodapé, em todas as páginas */
function prefooter(page) {
  var bg = page.prefooterImg || 'img/t/praia-natureza-05.webp';
  return `<section class="prefooter" aria-label="Reservas">
  <img class="prefooter__bg" src="${bg}" alt="" loading="lazy" decoding="async">
  <div class="prefooter__inner">
    <div>
      <h2>Vamos ver se temos <span class="accent-i">vaga</span> nas suas datas?</h2>
      <p class="prefooter__lead">Quem responde é a própria pousada, pelo WhatsApp (81) 99829-2985.</p>
    </div>
    <div class="prefooter__actions">
      <a class="btn btn--whats" href="#" data-wa="${WA_HERO}">${ico('whatsapp-logo-fill')} Consultar disponibilidade</a>
      <a class="btn btn--onmedia" href="/contato">${ico('envelope')} Outros contatos</a>
    </div>
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
        <address>
          Rua Arlindo Lins de Melo, 327 — Carotes · Maragogi / AL · 57955-000<br>
          <a href="https://wa.me/5581998292985" target="_blank" rel="noopener">(81) 99829-2985</a> — central de reservas
        </address>
        <div class="socials">
          <a href="https://www.instagram.com/pousadagrandmarmaragogi/" target="_blank" rel="noopener" aria-label="Instagram da Pousada Grandmar">${ico('instagram-logo-fill')}</a>
          <a href="#" data-wa="Olá! Vim pelo site da Pousada Grandmar." aria-label="WhatsApp da Pousada Grandmar">${ico('whatsapp-logo-fill')}</a>
          <a href="${MAPA_LINK}" target="_blank" rel="noopener" aria-label="A pousada no mapa">${ico('map-pin')}</a>
        </div>
      </div>
      <div>
        <p class="footer__h">Navegação</p>
        <ul class="footer__nav">
          ${NAV.map(function (n) { return '<li><a href="' + n[0] + '">' + n[1] + '</a></li>'; }).join('\n          ')}
        </ul>
        <div class="plats">
          <span>Avaliações</span>
          <a href="https://www.booking.com/hotel/br/grandmarsuitesmaragogi.pt-br.html" target="_blank" rel="noopener">Booking <b>9,1</b></a>
          <a href="https://www.tripadvisor.com/Hotel_Review-g644400-d23376530-Reviews-Grandmar_Suites_Maragogi-Maragogi_State_of_Alagoas.html" target="_blank" rel="noopener">Tripadvisor <b>4,3</b></a>
        </div>
      </div>
    </div>
    <div class="footer__bar">
      <span>© <span id="ano">2026</span> Pousada Grandmar · Maragogi (AL)</span>
      <span>Check-in 14h–22h · Check-out 12h–12h30</span>
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
  /* As páginas internas moram em src/pages/internas.js e substituem, pelo slug,
     o que ainda houver de antigo em all.js — que hoje é a home. Manter os dois
     arquivos separados evita que frentes de trabalho diferentes disputem o
     mesmo arquivo. */
  var internas = require('./src/pages/internas.js');
  var novos = internas.map(function (p) { return p.slug; });
  var pages = require('./src/pages/all.js')
    .filter(function (p) { return novos.indexOf(p.slug) < 0; })
    .concat(internas);

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
