/* Conteúdo de cada página. O layout comum (header, rodapé, chamada de reserva)
   fica no build.js — aqui mora só o miolo. Textos escritos a partir do que a
   própria pousada publica; nada de número ou serviço não confirmado. */
const { pageHead, ico, SITE } = require('../../build.js');

const WA = (msg) => `#" data-wa="${msg}`;   /* o app.js troca por wa.me */
const WA_DISP = 'Olá! Vim pelo site da Pousada Grandmar e gostaria de consultar disponibilidade.';

const ENDERECO = 'Rua Arlindo Lins de Melo, 327 — Carotes, Maragogi/AL, 57955-000';
const MAPA = 'https://www.google.com/maps?q=-9.01990964,-35.22438614&z=16&output=embed';
const MAPA_LINK = 'https://www.google.com/maps/search/?api=1&query=-9.01990964,-35.22438614';

/* dados estruturados para busca — só campos que temos confirmados */
const JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: 'Pousada Grandmar',
  description: 'Pousada pé na areia na praia de Maragogi, em Alagoas, com piscina, quiosque, jardim e quartos com varanda e vista para o mar.',
  url: SITE,
  image: SITE + '/og.jpg',
  telephone: '+55-81-99829-2985',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rua Arlindo Lins de Melo, 327 — Carotes',
    addressLocality: 'Maragogi',
    addressRegion: 'AL',
    postalCode: '57955-000',
    addressCountry: 'BR',
  },
  geo: { '@type': 'GeoCoordinates', latitude: -9.01990964, longitude: -35.22438614 },
  checkinTime: '14:00',
  checkoutTime: '12:00',
  sameAs: ['https://www.instagram.com/pousadagrandmarmaragogi/'],
  amenityFeature: [
    'Piscina ao ar livre', 'Acesso à praia', 'Café da manhã', 'Estacionamento gratuito',
    'Wi-Fi gratuito', 'Jardim', 'Terraço', 'Ar-condicionado',
  ].map((n) => ({ '@type': 'LocationFeatureSpecification', name: n, value: true })),
};

/* ------------------------------------------------------------------ home */
const home = {
  slug: 'index',
  path: '/',
  title: 'Pousada Grandmar — pousada pé na areia em Maragogi (AL)',
  desc: 'Pousada pé na areia na praia de Maragogi, com quartos de varanda e vista para o mar, piscina, quiosque e café da manhã feito na hora. Reservas pelo WhatsApp.',
  ogTitle: 'Pousada Grandmar · Maragogi, Alagoas',
  jsonld: JSONLD,
  solidHeader: true,
  preload: '<link rel="preload" as="image" href="img/praia-natureza-05.webp" fetchpriority="high">\n',
  body: `
<section class="hero">
  <div class="hero__inner">
    <div class="hero__head">
      <p class="eyebrow"><span class="rule"></span> Praia de Maragogi · Alagoas</p>
      <h1>Da varanda até o mar, <span class="accent-i">nenhuma rua</span></h1>
      <p class="hero__lead">Nove quartos <strong>pé na areia</strong>, todos com varanda e vista para o mar, piscina no gramado e café feito na casa.</p>
    </div>
    <div class="hero__media">
      <div class="collage">
        <figure class="collage__main">
          <img src="img/praia-natureza-05.webp" alt="A praia de Maragogi vista da varanda coberta da Pousada Grandmar" fetchpriority="high" width="1400" height="933">
          <figcaption class="collage__tag">${ico('waves')} A areia começa depois do jardim</figcaption>
        </figure>
        <figure class="collage__inset">
          <img src="img/t/piscina-03.webp" alt="Piscina ao ar livre no gramado da pousada" width="720" height="540" loading="lazy" decoding="async">
        </figure>
      </div>
    </div>
    <div class="hero__cta">
      <div class="hero__actions">
        <a class="btn btn--whats" href="${WA(WA_DISP)}">${ico('whatsapp-logo-fill')} Consultar disponibilidade</a>
        <a class="btn btn--outline" href="/acomodacoes">${ico('bed')} Ver as acomodações</a>
      </div>
      <a class="trust" href="https://www.booking.com/hotel/br/grandmarsuitesmaragogi.pt-br.html" target="_blank" rel="noopener">
        <span class="trust__score">9,1</span>
        <span class="trust__stars">${ico('star') + ico('star') + ico('star') + ico('star') + ico('star')}</span>
        <span class="trust__txt">Nota no Booking, em 693 avaliações<small>Localização 9,5 · Atendimento 9,4</small></span>
      </a>
    </div>
  </div>
</section>

<section class="strip" aria-label="A pousada em resumo">
  <div class="shell">
    <ul class="strip__list">
      <li>${ico('waves')}<span><b>Pé na areia</b><small>Sem rua até o mar</small></span></li>
      <li>${ico('bed')}<span><b>9 quartos</b><small>Todos com varanda</small></span></li>
      <li>${ico('coffee')}<span><b>Café da casa</b><small>Bolo quente de manhã</small></span></li>
      <li>${ico('sailboat')}<span><b>Galés a 4,7 km</b><small>Piscinas naturais</small></span></li>
    </ul>
  </div>
</section>

<section class="sec sec--tight">
  <div class="shell split split--wide-media">
    <div class="split__body">
      <p class="eyebrow"><span class="rule"></span> A pousada</p>
      <h2>Uma casa pequena, tocada por quem mora aqui</h2>
      <p>Nove quartos e um jardim que termina na areia. O café é servido pela mesma equipe que recebe você na chegada — e o dono costuma estar por perto para indicar o passeio do dia.</p>
      <div class="split__actions">
        <a class="tlink" href="/a-pousada">Conhecer a pousada ${ico('arrow-right')}</a>
      </div>
    </div>
    <div class="split__media split__media--stack">
      <img src="img/praia-natureza-01.webp" alt="A Pousada Grandmar vista do jardim, com coqueiros e o mar ao fundo" width="1400" height="933" loading="lazy" decoding="async">
      <img class="stack-b" src="img/t/cafe-manha-05.webp" alt="Prato do café da manhã servido na pousada" width="720" height="480" loading="lazy" decoding="async">
    </div>
  </div>
</section>

<section class="sec sec--tight sec--shore">
  <div class="shell">
    <div class="sechead">
      <div>
        <p class="eyebrow"><span class="rule"></span> Acomodações</p>
        <h2>Seis categorias, do casal à família</h2>
      </div>
      <a class="tlink" href="/acomodacoes">Ver todas ${ico('arrow-right')}</a>
    </div>
    <div class="rooms rooms--compact" data-compact data-limit="3"></div>
  </div>
</section>

<section class="sec sec--tight">
  <div class="shell">
    <div class="sechead">
      <div>
        <p class="eyebrow"><span class="rule"></span> Estrutura</p>
        <h2>O que a pousada oferece</h2>
      </div>
      <a class="tlink" href="/estrutura">Ver em detalhe ${ico('arrow-right')}</a>
    </div>
    <div class="feats feats--tight" id="feats" data-limit="6" data-short></div>
  </div>
</section>

<section class="sec sec--tight sec--surface" aria-label="Fotos da pousada">
  <div class="shell sechead">
    <div>
      <p class="eyebrow"><span class="rule"></span> Por dentro</p>
      <h2>Áreas comuns e café da manhã</h2>
    </div>
    <a class="tlink" href="/galeria">Ver a galeria ${ico('arrow-right')}</a>
  </div>
  <div class="carousel" id="photoCar"></div>
</section>

<section class="sec sec--tight">
  <div class="shell split split--flip split--wide-media">
    <div class="split__body">
      <p class="eyebrow"><span class="rule"></span> Maragogi</p>
      <h2>O ponto de partida para as <span class="accent-i">Galés</span></h2>
      <p>As piscinas naturais ficam a 4,7 km e os barcos saem conforme a maré. A pousada ajuda a encaixar o passeio no dia certo.</p>
      <div class="split__actions">
        <a class="tlink" href="/maragogi">O que fazer em Maragogi ${ico('arrow-right')}</a>
      </div>
    </div>
    <div class="split__media">
      <img src="img/vista-mar-02.webp" alt="A faixa de areia e o mar de Maragogi" width="1400" height="933" loading="lazy" decoding="async">
    </div>
  </div>
</section>
`,
};

/* ------------------------------------------------------------- a pousada */
const aPousada = {
  slug: 'a-pousada',
  path: '/a-pousada',
  title: 'A pousada — Pousada Grandmar, Maragogi (AL)',
  desc: 'Conheça a Pousada Grandmar: nove acomodações pé na areia na praia de Maragogi, atendimento da própria família, café da manhã feito na hora e nota 9,1 no Booking.com.',
  og: 'img/praia-natureza-01.webp',
  prefooterImg: 'img/t/piscina-04.webp',
  body: pageHead({
    crumb: 'A pousada',
    eyebrow: 'Quem somos',
    title: 'Uma pousada de nove quartos na beira do mar',
    lead: 'Sem lobby, sem pulseira e sem fila no café. A Grandmar é do tamanho de uma casa grande — e funciona como uma.',
    img: 'img/praia-natureza-04.webp',
  }) + `

<section class="sec">
  <div class="shell split">
    <div class="split__body">
      <p class="eyebrow">A proposta</p>
      <h2>Perto de tudo, longe do barulho</h2>
      <p>A pousada fica em Carotes, na orla de Maragogi, com a faixa de areia começando logo depois do jardim. É perto o bastante do centro para ir a pé aos restaurantes da orla e distante o bastante para dormir ouvindo a maré.</p>
      <p>O prédio tem dois pavimentos e nove acomodações. Todas abrem para varanda com vista do mar — de frente ou de lado — e algumas do térreo dão direto no gramado.</p>
      <ul class="ticks">
        <li>Ar-condicionado, TV de tela plana, frigobar e guarda-roupa em todos os quartos</li>
        <li>Banheiro privativo com chuveiro e produtos de banho de cortesia</li>
        <li>Wi-Fi gratuito nas acomodações e nas áreas comuns</li>
        <li>Estacionamento gratuito na própria pousada</li>
      </ul>
    </div>
    <div class="split__media">
      <img src="img/jardim-01.webp" alt="Fachada da Pousada Grandmar vista do jardim" width="1400" height="933" loading="lazy" decoding="async">
    </div>
  </div>
</section>

<section class="sec sec--shore">
  <div class="shell split split--flip">
    <div class="split__body">
      <p class="eyebrow">Café da manhã</p>
      <h2>Bolo saindo do forno, todos os dias</h2>
      <p>O café da manhã é continental e feito na cozinha da casa: bolo quente, pães, frutas, frios e café. É o item que mais aparece nos comentários dos hóspedes — quase sempre junto do elogio a quem serve.</p>
      <p>Se a sua tarifa inclui ou não o café, vale confirmar com a pousada antes de fechar a reserva.</p>
      <blockquote class="pull">Café simples, mas feito de coração, bolo quentinho na hora.<cite>Raquel · avaliação no Booking.com</cite></blockquote>
    </div>
    <div class="split__media">
      <img src="img/cafe-manha-03.webp" alt="Mesa do café da manhã montada na sala da pousada" width="1400" height="933" loading="lazy" decoding="async">
    </div>
  </div>
</section>

<section class="sec">
  <div class="shell">
    <div class="sechead">
      <div>
        <p class="eyebrow">Avaliações</p>
        <h2>O que dizem quem já ficou</h2>
        <p class="lead">Notas públicas das plataformas de reserva, com o link para conferir na fonte.</p>
      </div>
    </div>
    <div class="ratings" id="ratings" style="margin-bottom:var(--s7)"></div>
    <div class="quotes" id="quotes"></div>
  </div>
</section>

<section class="sec sec--tight sec--surface">
  <div class="shell">
    <div class="sechead">
      <div>
        <p class="eyebrow">Estrutura</p>
        <h2>O que a pousada oferece</h2>
      </div>
      <a class="tlink" href="/estrutura">Ver em detalhe ${ico('arrow-right')}</a>
    </div>
    <div class="feats" id="feats" data-limit="6"></div>
  </div>
</section>
`,
};

/* ----------------------------------------------------------- acomodações */
const acomodacoes = {
  slug: 'acomodacoes',
  path: '/acomodacoes',
  title: 'Acomodações — Pousada Grandmar, Maragogi (AL)',
  desc: 'Seis categorias de quarto na Pousada Grandmar, de duplo com vista do mar a quarto família para quatro pessoas. Todos com varanda, ar-condicionado e frigobar.',
  og: 'img/quarto-11.webp',
  prefooterImg: 'img/t/vista-mar-02.webp',
  body: pageHead({
    crumb: 'Acomodações',
    eyebrow: 'Onde você fica',
    title: 'Seis categorias, nove quartos',
    lead: 'O que muda entre elas é a composição de camas e o ângulo do mar a partir da varanda. O resto é igual em todas.',
    img: 'img/quarto-14.webp',
  }) + `

<section class="sec">
  <div class="shell">
    <div class="rooms"></div>
    <p class="note" style="margin-top:var(--s7);max-width:60ch">As fotos mostram acomodações da pousada e servem de referência do padrão de cada categoria. A unidade exata é confirmada na reserva — fale com a gente e a pousada indica qual está disponível para as suas datas.</p>
  </div>
</section>

<section class="sec sec--tight sec--shore">
  <div class="shell">
    <div class="sechead">
      <div>
        <p class="eyebrow">Em todos os quartos</p>
        <h2>O básico bem resolvido</h2>
      </div>
    </div>
    <div class="feats">
      <article class="feat">${ico('wind')}<h3>Varanda</h3><p>Todas as acomodações têm varanda voltada para o mar, de frente ou de lado.</p></article>
      <article class="feat">${ico('thermometer-simple')}<h3>Ar-condicionado</h3><p>Além de TV de tela plana e frigobar em todos os quartos.</p></article>
      <article class="feat">${ico('bathtub')}<h3>Banheiro privativo</h3><p>Com chuveiro, guarda-roupa e produtos de banho de cortesia.</p></article>
    </div>
  </div>
</section>
`,
};

/* -------------------------------------------------------------- estrutura */
const estrutura = {
  slug: 'estrutura',
  path: '/estrutura',
  title: 'Estrutura — Pousada Grandmar, Maragogi (AL)',
  desc: 'Piscina ao ar livre, quiosque e churrasqueira à beira-mar, jardim, terraço, estacionamento gratuito e café da manhã continental na Pousada Grandmar, em Maragogi.',
  og: 'img/piscina-03.webp',
  prefooterImg: 'img/t/jardim-03.webp',
  body: pageHead({
    crumb: 'Estrutura',
    eyebrow: 'Áreas comuns',
    title: 'Piscina, quiosque e o mar logo ali',
    lead: 'A área externa é a maior parte da pousada: jardim, piscina e quiosque entre os quartos e a faixa de areia.',
    img: 'img/piscina-03.webp',
  }) + `

<section class="sec">
  <div class="shell">
    <div class="feats" id="feats"></div>
  </div>
</section>

<section class="sec sec--shore">
  <div class="shell split split--wide-media">
    <div class="split__body">
      <p class="eyebrow">Área externa</p>
      <h2>O dia costuma acontecer aqui fora</h2>
      <p>A piscina fica no gramado, com mesas e espreguiçadeiras espalhadas à sombra dos coqueiros. Mais à frente, o quiosque coberto e a churrasqueira, já de frente para a praia.</p>
      <p>Não há rua entre o jardim e a areia: dá para sair do quarto de chinelo e entrar no mar.</p>
    </div>
    <div class="split__media split__media--stack">
      <img src="img/piscina-04.webp" alt="A pousada e a piscina no fim da tarde" width="1400" height="933" loading="lazy" decoding="async">
      <img class="stack-b" src="img/t/praia-natureza-07.webp" alt="Quiosque de palha no gramado à beira-mar" width="720" height="480" loading="lazy" decoding="async">
    </div>
  </div>
</section>

<section class="sec sec--tight" aria-label="Fotos das áreas comuns">
  <div class="shell">
    <p class="eyebrow">Fotos</p>
    <h2>Áreas comuns e café da manhã</h2>
  </div>
  <div class="carousel" id="photoCar"></div>
  <div class="shell" style="margin-top:var(--s4)">
    <a class="tlink" href="/galeria">Ver a galeria completa ${ico('arrow-right')}</a>
  </div>
</section>

<section class="sec sec--surface">
  <div class="shell split split--flip">
    <div class="split__body">
      <p class="eyebrow">Chegada e estadia</p>
      <h2>O que combinar antes de vir</h2>
      <ul class="ticks">
        <li>Check-in das 14h às 22h; check-out das 12h às 12h30</li>
        <li>Estacionamento gratuito, sem necessidade de reserva</li>
        <li>Não há berço nem cama extra disponíveis</li>
        <li>Crianças de qualquer idade são bem-vindas; a partir de 7 anos contam como adultos</li>
        <li>Não são aceitos animais de estimação</li>
        <li>Não é permitido fumar; horário de silêncio das 21h às 8h</li>
      </ul>
      <div class="split__actions">
        <a class="btn btn--primary" href="${WA('Olá! Vim pelo site da Pousada Grandmar e queria tirar uma dúvida sobre a estadia.')}">${ico('whatsapp-logo-fill')} Solicitar informações</a>
      </div>
    </div>
    <div class="split__media">
      <img src="img/area-estar-06.webp" alt="Mesas do café da manhã na área coberta da pousada" width="1400" height="933" loading="lazy" decoding="async">
    </div>
  </div>
</section>
`,
};

/* --------------------------------------------------------------- galeria */
const galeria = {
  slug: 'galeria',
  path: '/galeria',
  title: 'Galeria de fotos — Pousada Grandmar, Maragogi (AL)',
  desc: 'Fotos da Pousada Grandmar em Maragogi: acomodações, piscina, quiosque, café da manhã e a praia em frente à pousada.',
  og: 'img/varanda-03.webp',
  prefooterImg: 'img/t/praia-natureza-02.webp',
  body: pageHead({
    crumb: 'Galeria',
    eyebrow: 'Fotos',
    title: 'A pousada por dentro e por fora',
    lead: 'Imagens das acomodações, das áreas comuns, do café da manhã e da praia em frente. Toque em qualquer foto para ampliar.',
    img: 'img/varanda-03.webp',
  }) + `

<section class="sec">
  <div class="shell">
    <div class="filters" id="filters" role="group" aria-label="Filtrar fotos"></div>
    <div class="gallery" id="gallery"></div>
  </div>
</section>
`,
};

/* -------------------------------------------------------------- Maragogi */
const maragogi = {
  slug: 'maragogi',
  path: '/maragogi',
  title: 'Maragogi e região — Pousada Grandmar (AL)',
  desc: 'O que fazer em Maragogi: piscinas naturais das Galés a 4,7 km da pousada, praias de São Bento e Barra Grande, restaurantes da orla a 100 metros e como chegar de Maceió.',
  og: 'img/praia-natureza-06.webp',
  prefooterImg: 'img/t/praia-natureza-08.webp',
  body: pageHead({
    crumb: 'Maragogi',
    eyebrow: 'O destino',
    title: 'Maragogi a partir da porta da pousada',
    lead: 'Distâncias conferidas a partir do endereço da Grandmar, para você montar os dias sem depender de achismo.',
    img: 'img/praia-natureza-02.webp',
  }) + `

<section class="sec">
  <div class="shell split split--wide-media">
    <div class="split__body">
      <p class="eyebrow">As Galés</p>
      <h2>As piscinas naturais, a 4,7 km</h2>
      <p>O passeio mais procurado de Maragogi sai de catamarã até os recifes das Galés, onde a maré baixa forma piscinas de água transparente sobre o coral. Os horários mudam todo dia, porque dependem da tábua das marés.</p>
      <p>A recepção da pousada acompanha esses horários e ajuda a encaixar o passeio no dia certo da sua estadia, além de indicar quem contratar.</p>
      <div class="split__actions">
        <a class="btn btn--primary" href="${WA('Olá! Vim pelo site da Pousada Grandmar e queria informações sobre os passeios às Galés.')}">${ico('sailboat')} Falar sobre os passeios</a>
      </div>
    </div>
    <div class="split__media">
      <img src="img/praia-natureza-08.webp" alt="Coqueiros e mesas entre a pousada e a praia de Maragogi" width="1400" height="933" loading="lazy" decoding="async">
    </div>
  </div>
</section>

<section class="sec sec--shore">
  <div class="shell">
    <div class="sechead">
      <div>
        <p class="eyebrow">Distâncias</p>
        <h2>Perto da pousada</h2>
        <p class="lead">Medidas em linha de estrada a partir do endereço da Grandmar, conforme a ficha oficial da pousada.</p>
      </div>
    </div>
    <div class="feats">
      <article class="feat">${ico('waves')}<h3>A praia</h3><p>Na frente da pousada. Não há rua entre o jardim e a faixa de areia.</p></article>
      <article class="feat">${ico('martini')}<h3>Restaurantes da orla</h3><p>Cerca de 100 metros a pé, entre eles a Burgueria Águas Belas e o Tuyn.</p></article>
      <article class="feat">${ico('sailboat')}<h3>Galés de Maragogi</h3><p>4,7 km — as piscinas naturais, principal passeio do destino.</p></article>
      <article class="feat">${ico('umbrella')}<h3>Praia de São Bento</h3><p>2,5 km, com piscinas naturais mais próximas da costa.</p></article>
      <article class="feat">${ico('sun')}<h3>Barra Grande e Bitingui</h3><p>5 km, praias mais tranquilas ao norte de Maragogi.</p></article>
      <article class="feat">${ico('tree')}<h3>Reserva do Saltinho</h3><p>39 km, remanescente de Mata Atlântica com trilhas e cachoeira.</p></article>
    </div>
  </div>
</section>

<section class="sec">
  <div class="shell split split--flip">
    <div class="split__body">
      <p class="eyebrow">Como chegar</p>
      <h2>De Maceió, de Recife ou de carro</h2>
      <p>O aeroporto mais próximo é o Zumbi dos Palmares, em Maceió, a 121 km da pousada — cerca de duas horas pela AL-101 Norte, pela Rota Ecológica. Maragogi também é destino comum para quem chega por Recife e desce pelo litoral sul de Pernambuco.</p>
      <p>Quem vem de carro estaciona na própria pousada, sem custo. Avise o horário previsto de chegada pelo WhatsApp: o check-in vai das 14h às 22h.</p>
      <div class="split__actions">
        <a class="btn btn--outline" href="${MAPA_LINK}" target="_blank" rel="noopener">${ico('map-pin')} Abrir no mapa</a>
        <a class="btn btn--primary" href="${WA('Olá! Vim pelo site da Pousada Grandmar e queria orientação para chegar até a pousada.')}">${ico('whatsapp-logo-fill')} Como chegar</a>
      </div>
    </div>
    <div class="split__media">
      <iframe class="map" src="${MAPA}" title="Mapa com a localização da Pousada Grandmar em Maragogi" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
    </div>
  </div>
</section>
`,
};

/* --------------------------------------------------------------- contato */
const contato = {
  slug: 'contato',
  path: '/contato',
  title: 'Contato e reservas — Pousada Grandmar, Maragogi (AL)',
  desc: 'Fale com a Pousada Grandmar em Maragogi pelo WhatsApp (81) 99829-2985, consulte disponibilidade e veja o endereço, o mapa e as regras da casa.',
  og: 'img/praia-natureza-05.webp',
  prefooterImg: 'img/t/piscina-01.webp',
  body: pageHead({
    crumb: 'Contato',
    eyebrow: 'Reservas',
    title: 'Fale direto com a pousada',
    lead: 'Quem responde é a equipe da Grandmar, não um call center. Conte as datas e quantas pessoas — a gente confirma o que está disponível.',
  }) + `

<section class="sec">
  <div class="shell contact">
    <div>
      <h2>Consultar disponibilidade</h2>
      <p class="lead" style="margin-bottom:var(--s5)">Preencha o que souber e a mensagem abre pronta no WhatsApp da pousada. Nada é enviado sem você conferir.</p>
      <form class="form-card" id="waForm" novalidate>
        <p class="form-err" id="formErr" role="alert"></p>
        <div class="field">
          <label for="f-nome">Seu nome</label>
          <input id="f-nome" name="nome" type="text" autocomplete="name" required>
        </div>
        <div class="field-row">
          <div class="field">
            <label for="f-entrada">Entrada</label>
            <input id="f-entrada" name="entrada" type="date">
          </div>
          <div class="field">
            <label for="f-saida">Saída</label>
            <input id="f-saida" name="saida" type="date">
          </div>
        </div>
        <div class="field-row">
          <div class="field">
            <label for="f-pessoas">Pessoas</label>
            <select id="f-pessoas" name="pessoas">
              <option value="">Escolher</option>
              <option>1</option><option>2</option><option>3</option><option>4</option>
            </select>
          </div>
          <div class="field">
            <label for="f-suite">Acomodação de interesse</label>
            <select id="f-suite" name="suite"><option value="">Ainda não sei</option></select>
          </div>
        </div>
        <div class="field">
          <label for="f-msg">Quer contar mais alguma coisa?</label>
          <textarea id="f-msg" name="msg" rows="3"></textarea>
        </div>
        <button class="btn btn--whats btn--block" type="submit">${ico('whatsapp-logo-fill')} Enviar pelo WhatsApp</button>
      </form>
    </div>

    <div>
      <h2>Canais oficiais</h2>
      <div class="cinfo" style="margin-top:var(--s5)">
        <p class="cinfo__row">${ico('whatsapp-logo-fill')}<span><b>WhatsApp · central de reservas</b><a href="https://wa.me/5581998292985" target="_blank" rel="noopener">(81) 99829-2985</a></span></p>
        <p class="cinfo__row">${ico('instagram-logo-fill')}<span><b>Instagram</b><a href="https://www.instagram.com/pousadagrandmarmaragogi/" target="_blank" rel="noopener">@pousadagrandmarmaragogi</a></span></p>
        <p class="cinfo__row">${ico('map-pin')}<span><b>Endereço</b><a href="${MAPA_LINK}" target="_blank" rel="noopener">${ENDERECO}</a></span></p>
        <p class="cinfo__row">${ico('clock')}<span><b>Check-in e check-out</b><span>Entrada das 14h às 22h · saída das 12h às 12h30</span></span></p>
      </div>
      <iframe class="map" style="margin-top:var(--s6)" src="${MAPA}" title="Mapa com a localização da Pousada Grandmar em Maragogi" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
    </div>
  </div>
</section>

<section class="sec sec--shore">
  <div class="shell">
    <div class="sechead">
      <div>
        <p class="eyebrow">Dúvidas frequentes</p>
        <h2>Antes de reservar</h2>
      </div>
    </div>
    <div class="faq" id="faq"></div>
  </div>
</section>
`,
};

module.exports = [home, aPousada, acomodacoes, estrutura, galeria, maragogi, contato];
