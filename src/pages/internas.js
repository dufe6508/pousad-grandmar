/* Páginas internas da Pousada Grandmar.
   Ficam separadas da home (src/pages/all.js) de propósito: são editadas por
   outra frente de trabalho e não devem disputar o mesmo arquivo.

   O visual comum (header, rodapé, chamada de reserva) continua no build.js.
   O que é específico das internas mora aqui + assets/pages.css + assets/pages.js.

   Regra de conteúdo do projeto, mantida: só entra o que a pousada publica
   (Booking, Tripadvisor, Instagram). Onde não há dado confirmado, o site
   convida a perguntar no WhatsApp em vez de arriscar um número. */
const { ico, SITE } = require('../../build.js');

const WA = (msg) => `#" data-wa="${msg}`;   /* o app.js troca por wa.me */
const WA_DISP = 'Olá! Vim pelo site da Pousada Grandmar e gostaria de consultar disponibilidade.';

const ENDERECO = 'Rua Arlindo Lins de Melo, 327 — Carotes, Maragogi/AL, 57955-000';
const MAPA = 'https://www.google.com/maps?q=-9.01990964,-35.22438614&z=16&output=embed';
const MAPA_LINK = 'https://www.google.com/maps/search/?api=1&query=-9.01990964,-35.22438614';
const ROTA_LINK = 'https://www.google.com/maps/dir/?api=1&destination=-9.01990964,-35.22438614';

/* ---------------------------------------------------------------- helpers */

/* Cabeçalho das internas: a foto vem primeiro e ocupa a tela de entrada, com
   o texto apoiado embaixo. Altura controlada por clamp — o hóspede vê a
   pousada antes de qualquer parágrafo, mas a página não vira um hero de home. */
function phx(o) {
  return `<header class="phx${o.tall ? ' phx--tall' : ''}">
  <img class="phx__bg" src="${o.img}" alt="" fetchpriority="high" width="1400" height="933">
  <div class="phx__veil" aria-hidden="true"></div>
  <div class="shell phx__inner">
    <nav class="phx__crumb" aria-label="Você está aqui">
      <a href="/">Início</a>${ico('caret-right')}<span>${o.crumb}</span>
    </nav>
    <p class="phx__eyebrow">${o.eyebrow}</p>
    <h1 class="phx__title">${o.title}</h1>
    ${o.lead ? '<p class="phx__lead">' + o.lead + '</p>' : ''}
    ${o.actions ? '<div class="phx__actions">' + o.actions + '</div>' : ''}
  </div>
  ${o.marks ? '<ul class="phx__marks">' + o.marks.map(function (m) {
    return '<li>' + ico(m[0]) + '<span>' + m[1] + '</span></li>';
  }).join('') + '</ul>' : ''}
</header>`;
}

/* bloco editorial: texto curto de um lado, foto do outro, alternando o lado */
function ebloco(o) {
  return `<article class="ebloco${o.flip ? ' ebloco--flip' : ''} reveal">
  <div class="ebloco__media">
    <img src="${o.img}" alt="${o.alt}" width="1400" height="933" loading="lazy" decoding="async">
    ${o.tag ? '<span class="ebloco__tag">' + ico(o.tagIco || 'waves') + o.tag + '</span>' : ''}
  </div>
  <div class="ebloco__body">
    <p class="kicker">${o.kicker}</p>
    <h2>${o.title}</h2>
    <p>${o.text}</p>
    ${o.list ? '<ul class="minilist">' + o.list.map(function (l) {
      return '<li>' + ico(l[0]) + '<span>' + l[1] + '</span></li>';
    }).join('') + '</ul>' : ''}
    ${o.action || ''}
  </div>
</article>`;
}

/* cartão pequeno de informação: ícone, título e uma ou duas linhas */
function icard(i, t, d) {
  return `<article class="icard reveal">${ico(i)}<h3>${t}</h3><p>${d}</p></article>`;
}

/* etapa numerada — usada em "chegada e estadia" e em "como chegar" */
function step(n, t, d) {
  return `<li class="step reveal"><span class="step__n">${n}</span>
    <div><h3>${t}</h3><p>${d}</p></div></li>`;
}

/* ------------------------------------------------------------- a pousada */
const aPousada = {
  slug: 'a-pousada',
  path: '/a-pousada',
  title: 'A pousada — Pousada Grandmar, Maragogi (AL)',
  desc: 'Nove quartos pé na areia na praia de Maragogi, atendimento da própria família, café da manhã feito na hora e nota 9,1 no Booking.com.',
  og: 'img/praia-natureza-01.webp',
  prefooterImg: 'img/t/piscina-04.webp',
  body: phx({
    crumb: 'A pousada',
    eyebrow: 'Quem somos',
    title: 'Nove quartos na beira do mar',
    lead: 'Sem lobby, sem pulseira, sem fila no café. A Grandmar tem o tamanho de uma casa grande e funciona como uma.',
    img: 'img/praia-natureza-04.webp',
    marks: [['waves', 'Pé na areia'], ['bed', '9 quartos'], ['star', '9,1 no Booking']],
    actions: `<a class="btn btn--onmedia btn--sm" href="${WA(WA_DISP)}">${ico('whatsapp-logo-fill')} Consultar datas</a>
      <a class="btn btn--onmedia btn--sm" href="/acomodacoes">${ico('bed')} Ver os quartos</a>`,
  }) + `

<section class="sec sec--tight">
  <div class="shell eblocos">
    ${ebloco({
      kicker: 'A proposta',
      title: 'Perto de tudo, longe do barulho',
      text: 'A pousada fica em Carotes, na orla. O jardim termina na areia, e os restaurantes da orla ficam a uns cem metros a pé. Dá para jantar fora e voltar ouvindo a maré.',
      img: 'img/jardim-01.webp',
      alt: 'Fachada da Pousada Grandmar vista do jardim',
      tag: 'Sem rua até o mar',
      list: [['wind', 'Varanda com vista do mar em todos os quartos'], ['users', 'Dois pavimentos, nove acomodações']],
    })}
    ${ebloco({
      flip: true,
      kicker: 'No quarto',
      title: 'O básico, bem resolvido',
      text: 'Nada de supérfluo, e nada faltando: o que você precisa para dormir bem depois de um dia de praia.',
      img: 'img/quarto-11.webp',
      alt: 'Quarto de casal com a janela voltada para o mar',
      tagIco: 'bed',
      list: [
        ['thermometer-simple', 'Ar-condicionado, TV e frigobar'],
        ['bathtub', 'Banheiro privativo com chuveiro'],
        ['wifi-high', 'Wi-Fi nos quartos e nas áreas comuns'],
        ['car', 'Estacionamento gratuito na pousada'],
      ],
      action: `<a class="tlink" href="/acomodacoes">Ver as seis categorias ${ico('arrow-right')}</a>`,
    })}
  </div>
</section>

<section class="sec sec--tight sec--shore" aria-labelledby="cafe-h">
  <div class="shell">
    <div class="sechead sechead--center">
      <div>
        <p class="kicker">Café da manhã</p>
        <h2 id="cafe-h">Bolo saindo do forno, todo dia</h2>
        <p class="lead">Continental, feito na cozinha da casa. É o que mais aparece nos comentários dos hóspedes, quase sempre junto de um elogio a quem serve.</p>
      </div>
    </div>
    <div class="cafe">
      <figure class="cafe__big">
        <img src="img/cafe-manha-03.webp" alt="Mesa do café da manhã montada na sala da pousada" width="1400" height="933" loading="lazy" decoding="async">
      </figure>
      <figure><img src="img/t/cafe-manha-05.webp" alt="Prato do café da manhã servido na pousada" width="720" height="720" loading="lazy" decoding="async"></figure>
      <figure><img src="img/t/cafe-manha-02.webp" alt="Pães e bolos na mesa do café da manhã" width="720" height="720" loading="lazy" decoding="async"></figure>
      <ul class="cafe__items">
        <li>${ico('coffee')}Bolo quente</li>
        <li>${ico('book-open')}Pães</li>
        <li>${ico('sun')}Frutas</li>
        <li>${ico('drop')}Frios e café</li>
      </ul>
    </div>
    <p class="note note--center">Se o café está incluído na sua tarifa, vale confirmar com a pousada antes de fechar a reserva.</p>
  </div>
</section>

<section class="sec sec--tight" aria-labelledby="espacos-h">
  <div class="shell sechead">
    <div>
      <p class="kicker">Os espaços</p>
      <h2 id="espacos-h">Onde o dia acontece</h2>
    </div>
    <a class="tlink" href="/galeria">Ver a galeria ${ico('arrow-right')}</a>
  </div>
  <div class="carousel carousel--flow" id="photoCar" data-auto aria-label="Fotos dos espaços da pousada"></div>
  <p class="note note--center shell">Toque em uma foto para ampliar.</p>
</section>

<section class="sec sec--tight sec--surface" aria-labelledby="aval-h">
  <div class="shell">
    <div class="sechead">
      <div>
        <p class="kicker">Avaliações</p>
        <h2 id="aval-h">O que dizem quem já ficou</h2>
      </div>
      <a class="tlink" href="https://www.booking.com/hotel/br/grandmarsuitesmaragogi.pt-br.html" target="_blank" rel="noopener">Ler no Booking ${ico('arrow-right')}</a>
    </div>
    <div class="ratings ratings--slim" id="ratings"></div>
    <div class="revrail" id="revrail" aria-label="Comentários de hóspedes"></div>
  </div>
</section>

<section class="sec sec--tight">
  <div class="shell">
    <div class="sechead">
      <div>
        <p class="kicker">O que a pousada oferece</p>
        <h2>Já incluso na diária</h2>
      </div>
      <a class="tlink" href="/estrutura">Ver a estrutura ${ico('arrow-right')}</a>
    </div>
    <div class="icards icards--dense" id="ofertas"></div>
  </div>
</section>
`,
};

/* ----------------------------------------------------------- acomodações */
const acomodacoes = {
  slug: 'acomodacoes',
  path: '/acomodacoes',
  title: 'Acomodações — Pousada Grandmar, Maragogi (AL)',
  desc: 'Seis categorias de quarto na Pousada Grandmar: de duplo com vista do mar a quarto família para quatro. Todos com varanda, ar-condicionado e frigobar.',
  og: 'img/quarto-11.webp',
  prefooterImg: 'img/t/vista-mar-02.webp',
  body: phx({
    crumb: 'Acomodações',
    eyebrow: 'Onde você fica',
    title: 'Seis categorias, nove quartos',
    lead: 'O que muda de uma para outra é a composição de camas e o ângulo do mar a partir da varanda.',
    img: 'img/quarto-14.webp',
    marks: [['wind', 'Todos com varanda'], ['waves', 'Vista do mar'], ['users', 'De casal a família']],
  }) + `

<section class="sec sec--tight">
  <div class="shell">
    <div class="rcards" id="rcards"></div>
    <p class="note" style="margin-top:var(--s6);max-width:62ch">As fotos mostram acomodações da pousada e servem de referência do padrão de cada categoria. A unidade exata é confirmada na reserva.</p>
  </div>
</section>

<section class="sec sec--tight sec--shore">
  <div class="shell">
    <div class="sechead sechead--center">
      <div>
        <p class="kicker">Em todos os quartos</p>
        <h2>Igual em qualquer categoria</h2>
      </div>
    </div>
    <div class="icards">
      ${icard('wind', 'Varanda', 'Voltada para o mar, de frente ou de lado.')}
      ${icard('thermometer-simple', 'Ar-condicionado', 'Com TV de tela plana e frigobar.')}
      ${icard('bathtub', 'Banheiro privativo', 'Chuveiro e produtos de banho de cortesia.')}
      ${icard('wifi-high', 'Wi-Fi gratuito', 'No quarto e nas áreas comuns.')}
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
  desc: 'Piscina ao ar livre, quiosque e churrasqueira à beira-mar, jardim, terraço, estacionamento gratuito e café da manhã continental na Pousada Grandmar.',
  og: 'img/piscina-03.webp',
  prefooterImg: 'img/t/jardim-03.webp',
  body: phx({
    crumb: 'Estrutura',
    eyebrow: 'Áreas comuns',
    title: 'Piscina, quiosque e o mar logo ali',
    lead: 'A área externa é a maior parte da pousada: jardim, piscina e quiosque entre os quartos e a areia.',
    img: 'img/piscina-03.webp',
    marks: [['swimming-pool', 'Piscina no gramado'], ['umbrella', 'Quiosque coberto'], ['car', 'Estacionamento'],],
  }) + `

<section class="sec sec--tight">
  <div class="shell">
    <div class="icards" id="ofertas"></div>
  </div>
</section>

<section class="sec sec--tight" aria-labelledby="areas-h">
  <div class="shell sechead">
    <div>
      <p class="kicker">Fotos</p>
      <h2 id="areas-h">Áreas comuns e café da manhã</h2>
    </div>
    <a class="tlink" href="/galeria">Ver a galeria completa ${ico('arrow-right')}</a>
  </div>
  <div class="carousel carousel--flow" id="photoCar" data-auto aria-label="Fotos das áreas comuns"></div>
</section>

<section class="sec sec--tight sec--shore">
  <div class="shell eblocos">
    ${ebloco({
      kicker: 'Área externa',
      title: 'O dia costuma acontecer aqui fora',
      text: 'A piscina fica no gramado, com mesas e espreguiçadeiras à sombra dos coqueiros. Mais à frente, o quiosque coberto e a churrasqueira, de frente para a praia.',
      img: 'img/piscina-04.webp',
      alt: 'A pousada e a piscina no fim da tarde',
      tag: 'Do quarto ao mar, de chinelo',
      list: [
        ['swimming-pool', 'Piscina ao ar livre entre o jardim e a praia'],
        ['umbrella', 'Quiosque e churrasqueira à beira-mar'],
        ['tree', 'Jardim e terraço com mesas'],
      ],
    })}
  </div>
</section>

<section class="sec sec--tight" aria-labelledby="chegada-h">
  <div class="shell">
    <div class="sechead">
      <div>
        <p class="kicker">Chegada e estadia</p>
        <h2 id="chegada-h">O que combinar antes de vir</h2>
      </div>
      <a class="tlink" href="/como-chegar">Como chegar até aqui ${ico('arrow-right')}</a>
    </div>
    <div class="duo">
      <ol class="steps">
        ${step(1, 'Chegada', 'Check-in das 14h às 22h. Chegando fora desse intervalo, avise pelo WhatsApp para combinarmos.')}
        ${step(2, 'Durante a estadia', 'A equipe está na pousada o dia todo e ajuda a encaixar os passeios conforme a maré.')}
        ${step(3, 'Saída', 'Check-out das 12h às 12h30. Dá tempo de tomar o café e ainda dar um mergulho.')}
      </ol>
      <div class="rulecards reveal">
        <p class="rulecards__h">Regras da casa</p>
        <ul>
          <li>${ico('car')}<span>Estacionamento gratuito, sem reserva</span></li>
          <li>${ico('bed')}<span>Não há berço nem cama extra</span></li>
          <li>${ico('users')}<span>Crianças de qualquer idade; a partir de 7 anos contam como adultos</span></li>
          <li>${ico('x')}<span>Não aceitamos animais de estimação</span></li>
          <li>${ico('moon-stars')}<span>Silêncio das 21h às 8h; não é permitido fumar</span></li>
        </ul>
        <a class="btn btn--whats-soft btn--sm btn--block" href="${WA('Olá! Vim pelo site da Pousada Grandmar e queria tirar uma dúvida sobre a estadia.')}">${ico('whatsapp-logo-fill')} Tirar uma dúvida</a>
      </div>
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
  body: phx({
    crumb: 'Galeria',
    eyebrow: 'Fotos',
    title: 'A pousada por dentro e por fora',
    lead: 'Toque em qualquer foto para ampliar. Use os filtros para ir direto ao que quer ver.',
    img: 'img/varanda-03.webp',
  }) + `

<section class="sec sec--tight">
  <div class="shell">
    <div class="filters filters--rail" id="filters" role="group" aria-label="Filtrar fotos"></div>
    <div class="gallery gallery--editorial" id="gallery"></div>
  </div>
</section>
`,
};

/* -------------------------------------------------------------- Maragogi */
const maragogi = {
  slug: 'maragogi',
  path: '/maragogi',
  title: 'Maragogi e região — Pousada Grandmar (AL)',
  desc: 'O que fazer em Maragogi: as Galés a 4,7 km da pousada, praias de São Bento e Barra Grande, restaurantes da orla a 100 metros e as distâncias da região.',
  og: 'img/praia-natureza-06.webp',
  prefooterImg: 'img/t/praia-natureza-08.webp',
  body: phx({
    crumb: 'Maragogi',
    eyebrow: 'O destino',
    title: 'Maragogi a partir da nossa porta',
    lead: 'Distâncias medidas do endereço da pousada, para montar os dias sem depender de achismo.',
    img: 'img/praia-natureza-02.webp',
    marks: [['sailboat', 'Galés a 4,7 km'], ['martini', 'Orla a 100 m'], ['umbrella', 'São Bento a 2,5 km']],
  }) + `

<section class="sec sec--tight">
  <div class="shell">
    <div class="sechead">
      <div>
        <p class="kicker">Perto da pousada</p>
        <h2>O que dá para fazer sem pegar estrada</h2>
      </div>
    </div>
    <div class="nearrail" id="nearrail"></div>
    <p class="note">Distâncias conforme a ficha da pousada. Os tempos são estimativas de trajeto.</p>
  </div>
</section>

<section class="sec sec--tight sec--shore" aria-labelledby="gales-h">
  <div class="shell">
    <div class="gales">
      <div class="gales__body">
        <p class="kicker">As Galés</p>
        <h2 id="gales-h">As piscinas naturais, a 4,7 km</h2>
        <p>O passeio sai de catamarã até os recifes, onde a maré baixa forma piscinas de água transparente sobre o coral. O horário muda todo dia, porque depende da tábua das marés.</p>
        <p>A recepção acompanha a tábua e ajuda a encaixar o passeio no melhor dia da sua estadia.</p>
        <div class="gales__actions">
          <a class="btn btn--whats btn--sm" href="${WA('Olá! Vim pelo site da Pousada Grandmar e queria informações sobre o passeio às Galés.')}">${ico('sailboat')} Falar sobre o passeio</a>
          <a class="btn btn--outline btn--sm" href="/contato">${ico('calendar-blank')} Consultar datas</a>
        </div>
      </div>
      <div class="gales__media">
        <figure>
          <img src="img/praia-natureza-06.webp" alt="Mesas do quiosque com o mar de Maragogi ao fundo" width="1400" height="933" loading="lazy" decoding="async">
          <figcaption>O mar em frente à pousada, de onde saem os barcos para os recifes</figcaption>
        </figure>
        <figure>
          <img src="img/t/vista-mar-02.webp" alt="A faixa de areia em frente à pousada, em Maragogi" width="720" height="720" loading="lazy" decoding="async">
        </figure>
      </div>
    </div>
  </div>
</section>

<section class="sec sec--tight">
  <div class="shell">
    <div class="sechead">
      <div>
        <p class="kicker">Como chegar</p>
        <h2>De Maceió, de Recife ou de carro</h2>
      </div>
      <a class="tlink" href="/como-chegar">Ver o passo a passo ${ico('arrow-right')}</a>
    </div>
    <div class="duo duo--map">
      <div>
        <div class="icards icards--dense">
          ${icard('path', 'Aeroporto de Maceió', '121 km, cerca de 2h pela AL-101 Norte, a Rota Ecológica.')}
          ${icard('car', 'De carro', 'Estacionamento gratuito na própria pousada, sem reserva.')}
          ${icard('map-pin', 'Chegando por Recife', 'Muita gente desce pelo litoral sul de Pernambuco. Pergunte a rota no WhatsApp.')}
          ${icard('clock', 'Horário de chegada', 'Check-in das 14h às 22h. Avise se for chegar depois.')}
        </div>
        <div class="split__actions">
          <a class="btn btn--outline btn--sm" href="${ROTA_LINK}" target="_blank" rel="noopener">${ico('map-pin')} Traçar rota</a>
          <a class="btn btn--whats-soft btn--sm" href="${WA('Olá! Vim pelo site da Pousada Grandmar e queria orientação para chegar até a pousada.')}">${ico('whatsapp-logo-fill')} Pedir orientação</a>
        </div>
      </div>
      <iframe class="map" src="${MAPA}" title="Mapa com a localização da Pousada Grandmar em Maragogi" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
    </div>
  </div>
</section>
`,
};

/* ----------------------------------------------------------- como chegar */
const comoChegar = {
  slug: 'como-chegar',
  path: '/como-chegar',
  title: 'Como chegar — Pousada Grandmar, Maragogi (AL)',
  desc: 'O caminho até a Pousada Grandmar, em Carotes (Maragogi/AL): 121 km do aeroporto de Maceió pela Rota Ecológica, mapa, endereço e rota direta no Google Maps.',
  og: 'img/praia-natureza-05.webp',
  prefooterImg: 'img/t/praia-natureza-04.webp',
  body: phx({
    crumb: 'Como chegar',
    eyebrow: 'Localização',
    title: 'Carotes, na orla de Maragogi',
    lead: 'A pousada fica na beira da praia, na Rua Arlindo Lins de Melo, 327. Guarde esta página para consultar na viagem.',
    img: 'img/praia-natureza-05.webp',
    actions: `<a class="btn btn--onmedia btn--sm" href="${ROTA_LINK}" target="_blank" rel="noopener">${ico('map-pin')} Abrir rota no mapa</a>
      <a class="btn btn--onmedia btn--sm" href="${WA('Olá! Estou a caminho da Pousada Grandmar e queria uma orientação para chegar.')}">${ico('whatsapp-logo-fill')} Falar no WhatsApp</a>`,
  }) + `

<section class="sec sec--tight">
  <div class="shell">
    <div class="duo duo--map">
      <div>
        <p class="kicker">Endereço</p>
        <h2>Onde a pousada fica</h2>
        <address class="addr">${ENDERECO}</address>
        <ul class="minilist minilist--lg">
          <li>${ico('waves')}<span>De frente para a praia, sem rua entre o jardim e a areia</span></li>
          <li>${ico('martini')}<span>Restaurantes da orla a cerca de 100 metros a pé</span></li>
          <li>${ico('car')}<span>Estacionamento gratuito dentro da pousada</span></li>
        </ul>
        <div class="split__actions">
          <a class="btn btn--outline btn--sm" href="${ROTA_LINK}" target="_blank" rel="noopener">${ico('map-pin')} Traçar rota</a>
          <a class="btn btn--outline btn--sm" href="${MAPA_LINK}" target="_blank" rel="noopener">${ico('path')} Ver no Google Maps</a>
        </div>
      </div>
      <iframe class="map" src="${MAPA}" title="Mapa com a localização da Pousada Grandmar em Maragogi" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
    </div>
  </div>
</section>

<section class="sec sec--tight sec--shore" aria-labelledby="rotas-h">
  <div class="shell">
    <div class="sechead">
      <div>
        <p class="kicker">De onde você vem</p>
        <h2 id="rotas-h">As rotas mais comuns</h2>
      </div>
    </div>
    <div class="routes">
      <article class="route reveal">
        <p class="route__from">${ico('path')} Aeroporto de Maceió</p>
        <p class="route__num">121 km</p>
        <p class="route__time">${ico('clock')} cerca de 2 horas</p>
        <p>Zumbi dos Palmares é o aeroporto mais próximo. O caminho é pela AL-101 Norte, a Rota Ecológica, com o mar aparecendo quase o trajeto todo.</p>
      </article>
      <article class="route reveal">
        <p class="route__from">${ico('car')} Por Recife</p>
        <p class="route__num">Litoral sul</p>
        <p class="route__time">${ico('map-pin')} descendo a costa de PE</p>
        <p>Também é uma chegada comum: quem vem de Pernambuco desce pelo litoral sul até Maragogi. Pergunte a rota no WhatsApp antes de sair.</p>
      </article>
      <article class="route reveal">
        <p class="route__from">${ico('users')} Transfer ou táxi</p>
        <p class="route__num">Combinado</p>
        <p class="route__time">${ico('whatsapp-logo-fill')} peça indicação</p>
        <p>Não operamos transfer próprio. Fale com a pousada e a gente indica quem costuma fazer o trajeto do aeroporto.</p>
      </article>
    </div>
  </div>
</section>

<section class="sec sec--tight" aria-labelledby="passos-h">
  <div class="shell">
    <div class="sechead">
      <div>
        <p class="kicker">Passo a passo</p>
        <h2 id="passos-h">Do aeroporto até o portão</h2>
      </div>
    </div>
    <div class="duo">
      <ol class="steps">
        ${step(1, 'Saia de Maceió pela AL-101 Norte', 'É a Rota Ecológica. Siga sentido norte, passando por Barra de Santo Antônio, Porto de Pedras e São Miguel dos Milagres.')}
        ${step(2, 'Siga até Maragogi', 'São cerca de 121 km e duas horas de viagem, com trechos de estrada beirando o mar.')}
        ${step(3, 'Entre em Carotes, na orla', 'Ao chegar, procure a Rua Arlindo Lins de Melo. A pousada fica no número 327, de frente para a praia.')}
        ${step(4, 'Estacione e faça o check-in', 'O estacionamento é dentro da pousada e gratuito. Entrada das 14h às 22h.')}
      </ol>
      <aside class="tipcard reveal">
        <p class="tipcard__h">${ico('sparkle')} Antes de pegar a estrada</p>
        <ul>
          <li>Avise pelo WhatsApp o horário previsto de chegada</li>
          <li>Salve a rota offline: o trecho final tem sinal irregular</li>
          <li>Chegando cedo, dá para deixar a mala e já ir para a praia</li>
        </ul>
        <a class="btn btn--whats btn--sm btn--block" href="${WA('Olá! Vim pelo site da Pousada Grandmar. Estou indo para a pousada e queria avisar meu horário de chegada.')}">${ico('whatsapp-logo-fill')} Avisar a chegada</a>
      </aside>
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
  desc: 'Fale com a Pousada Grandmar em Maragogi pelo WhatsApp (81) 99829-2985, consulte disponibilidade e veja endereço, mapa e regras da casa.',
  og: 'img/praia-natureza-05.webp',
  prefooterImg: 'img/t/piscina-01.webp',
  body: phx({
    crumb: 'Contato',
    eyebrow: 'Reservas',
    title: 'Fale direto com a pousada',
    lead: 'Quem responde é a equipe da Grandmar. Conte as datas e quantas pessoas, e a gente confirma o que está livre.',
    img: 'img/t/piscina-01.webp',
    marks: [['clock', 'Resposta pelo WhatsApp'], ['calendar-blank', 'Check-in 14h'], ['map-pin', 'Carotes, Maragogi']],
  }) + `

<section class="sec sec--tight">
  <div class="shell contactx">
    <div>
      <p class="kicker">Consultar disponibilidade</p>
      <h2>Preencha o que já souber</h2>
      <p class="lead" style="margin-bottom:var(--s5)">A mensagem abre pronta no WhatsApp da pousada. Nada é enviado sem você conferir antes.</p>
      <form class="form-card form-card--slim" id="waForm" novalidate>
        <p class="form-err" id="formErr" role="alert"></p>
        <div class="field">
          <label for="f-nome">Seu nome</label>
          <input id="f-nome" name="nome" type="text" autocomplete="name" placeholder="Como podemos te chamar?" required>
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
        <div class="field">
          <label for="f-msg">Quer contar mais alguma coisa?</label>
          <textarea id="f-msg" name="msg" rows="3" placeholder="Chegada à noite, viagem com criança, dúvida sobre o café…"></textarea>
        </div>
        <button class="btn btn--whats btn--block" type="submit">${ico('whatsapp-logo-fill')} Abrir no WhatsApp</button>
        <p class="form-foot">Revise a mensagem antes de enviar. Ela abre no seu aplicativo.</p>
      </form>
    </div>

    <div>
      <p class="kicker">Canais oficiais</p>
      <h2>Onde a gente atende</h2>
      <div class="cinfo cinfo--cards">
        <a class="cinfo__row" href="https://wa.me/5581998292985" target="_blank" rel="noopener">${ico('whatsapp-logo-fill')}<span><b>WhatsApp · reservas</b>(81) 99829-2985</span></a>
        <a class="cinfo__row" href="https://www.instagram.com/pousadagrandmarmaragogi/" target="_blank" rel="noopener">${ico('instagram-logo-fill')}<span><b>Instagram</b>@pousadagrandmarmaragogi</span></a>
        <a class="cinfo__row" href="${MAPA_LINK}" target="_blank" rel="noopener">${ico('map-pin')}<span><b>Endereço</b>${ENDERECO}</span></a>
        <p class="cinfo__row">${ico('clock')}<span><b>Check-in e check-out</b>Entrada das 14h às 22h · saída das 12h às 12h30</span></p>
      </div>
      <div class="split__actions">
        <a class="btn btn--outline btn--sm" href="/como-chegar">${ico('path')} Como chegar</a>
        <a class="btn btn--outline btn--sm" href="${ROTA_LINK}" target="_blank" rel="noopener">${ico('map-pin')} Traçar rota</a>
      </div>
      <iframe class="map" style="margin-top:var(--s5)" src="${MAPA}" title="Mapa com a localização da Pousada Grandmar em Maragogi" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
    </div>
  </div>
</section>

<section class="sec sec--tight sec--shore">
  <div class="shell">
    <div class="sechead sechead--center">
      <div>
        <p class="kicker">Dúvidas frequentes</p>
        <h2>Antes de reservar</h2>
      </div>
    </div>
    <div class="faq faq--center" id="faq"></div>
  </div>
</section>
`,
};

module.exports = [aPousada, acomodacoes, estrutura, galeria, maragogi, comoChegar, contato];
