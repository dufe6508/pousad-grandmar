/* Comportamento das páginas internas da Pousada Grandmar.
   Roda depois do app.js e do data.js, e só toca em elementos que existem nas
   internas — nada aqui interfere na home.

   Nada de biblioteca nova: o que já existe (lightbox e carrossel do app.js,
   reveal do motion.js) é reaproveitado. */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var icon = function (n, cls) {
    return '<svg class="' + (cls || 'ico') + '" aria-hidden="true"><use href="#i-' + n + '"></use></svg>';
  };
  var wa = function (msg) { return 'https://wa.me/5581998292985?text=' + encodeURIComponent(msg); };
  var reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------- o que a pousada oferece */
  /* mesma fonte de dados da home (ESTRUTURA), em cartão pequeno */
  var ofertas = $('#ofertas');
  if (ofertas && typeof ESTRUTURA !== 'undefined') {
    var denso = ofertas.classList.contains('icards--dense');
    ofertas.innerHTML = ESTRUTURA.map(function (f) {
      return '<article class="icard reveal">' + icon(f[0]) +
        '<h3>' + esc(f[1]) + '</h3>' +
        (denso ? '' : '<p>' + esc(f[2]) + '</p>') + '</article>';
    }).join('');
  }

  /* --------------------------------------------------- acomodações */
  /* Cartão compacto: foto 4:3, etiqueta de capacidade, nome, uma linha de
     camas, três comodidades e as duas ações. A foto abre a galeria pelo
     mesmo data-room que o app.js já escuta. */
  var rcards = $('#rcards');
  if (rcards && typeof ACOMODACOES !== 'undefined') {
    rcards.innerHTML = ACOMODACOES.map(function (r) {
      var cap = (r.meta && r.meta[0] && r.meta[0][1]) || '';
      var camas = (r.meta && r.meta[1] && r.meta[1][1]) || '';
      var MAX = 3;
      var chips = r.itens.slice(0, MAX).map(function (it) {
        return '<li class="chip">' + icon(it[0]) + esc(it[1]) + '</li>';
      }).join('') + (r.itens.length > MAX
        ? '<li class="chip chip--more">+' + (r.itens.length - MAX) + '</li>' : '');

      return '<article class="rcard reveal" id="suite-' + r.id + '">' +
        '<button class="rcard__media" type="button" data-room="' + r.id + '"' +
          ' aria-label="Ver fotos da acomodação ' + esc(r.nome) + '">' +
          '<img src="img/t/' + r.cover + '.webp" alt="' + esc(r.nome) + '"' +
          ' width="720" height="540" loading="lazy" decoding="async">' +
          '<span class="rcard__badge">' + esc(cap) + '</span>' +
          '<span class="rcard__zoom">' + icon('plus') + 'Ver fotos</span>' +
        '</button>' +
        '<div class="rcard__body">' +
          '<h3>' + esc(r.nome) + '</h3>' +
          (camas ? '<p class="rcard__beds">' + icon('bed') + esc(camas) + '</p>' : '') +
          '<ul class="chips">' + chips + '</ul>' +
          '<div class="rcard__actions">' +
            '<a class="btn btn--whats-soft btn--sm" href="' +
              wa('Olá! Vim pelo site da Pousada Grandmar e queria consultar disponibilidade para a ' + r.nome + '.') +
              '" target="_blank" rel="noopener">' + icon('calendar-blank') + 'Consultar datas</a>' +
            '<button class="btn btn--ghost btn--sm" type="button" data-room="' + r.id + '">' +
              icon('plus') + 'Fotos</button>' +
          '</div>' +
        '</div>' +
      '</article>';
    }).join('');
  }

  /* ------------------------------------------------------ avaliações */
  /* trecho curto do comentário, nome e plataforma — em trilho horizontal */
  var revrail = $('#revrail');
  if (revrail && typeof DEPOIMENTOS !== 'undefined') {
    var corta = function (t) {
      if (t.length <= 150) return t;
      var p = t.slice(0, 150);
      return p.slice(0, p.lastIndexOf(' ')) + '…';
    };
    revrail.innerHTML = DEPOIMENTOS.map(function (q) {
      return '<blockquote class="rev reveal">' +
        '<p class="rev__stars">' + icon('star') + icon('star') + icon('star') + icon('star') + icon('star') + '</p>' +
        '<p class="rev__txt">' + esc(corta(q[0])) + '</p>' +
        '<footer><b>' + esc(q[1]) + '</b><span>' + esc(q[2]) + '</span></footer>' +
        '</blockquote>';
    }).join('');
  }

  /* --------------------------------------------------- perto da pousada
     Distâncias da ficha oficial da pousada; os tempos são estimativas de
     trajeto e a página diz isso ao lado. */
  var PERTO = [
    ['waves', 'A praia', 'Em frente', 'a pé, sem rua', 'A faixa de areia começa depois do jardim.'],
    ['martini', 'Restaurantes da orla', '100 m', '~2 min a pé', 'Entre eles a Burgueria Águas Belas e o Tuyn.'],
    ['umbrella', 'Praia de São Bento', '2,5 km', '~7 min de carro', 'Piscinas naturais mais próximas da costa.'],
    ['sailboat', 'Galés de Maragogi', '4,7 km', 'saída de catamarã', 'As piscinas naturais, principal passeio do destino.'],
    ['sun', 'Barra Grande e Bitingui', '5 km', '~10 min de carro', 'Praias mais tranquilas ao norte de Maragogi.'],
    ['tree', 'Reserva do Saltinho', '39 km', '~50 min de carro', 'Mata Atlântica com trilhas e cachoeira.'],
  ];
  var nearrail = $('#nearrail');
  if (nearrail) {
    nearrail.innerHTML = PERTO.map(function (p) {
      return '<article class="near reveal">' +
        '<span class="near__ico">' + icon(p[0]) + '</span>' +
        '<p class="near__dist">' + esc(p[2]) + '</p>' +
        '<h3>' + esc(p[1]) + '</h3>' +
        '<p class="near__time">' + icon('clock') + esc(p[3]) + '</p>' +
        '<p class="near__txt">' + esc(p[4]) + '</p>' +
        '</article>';
    }).join('');
  }

  /* ------------------------------------------------ carrossel contínuo
     O app.js já duplica os itens e faz o loop no scroll. Aqui só damos a
     deriva lenta, que pausa ao interagir e não roda para quem prefere
     menos movimento. */
  $$('.carousel[data-auto]').forEach(function (el) {
    if (reduzir || !el.children.length) return;
    var parado = false, ultimo = 0;
    var pausa = function () { parado = true; };
    var segue = function () { parado = false; };

    ['pointerenter', 'pointerdown', 'focusin', 'touchstart'].forEach(function (ev) {
      el.addEventListener(ev, pausa, { passive: true });
    });
    ['pointerleave', 'pointerup', 'focusout', 'touchend'].forEach(function (ev) {
      el.addEventListener(ev, segue, { passive: true });
    });
    document.addEventListener('visibilitychange', function () {
      parado = document.hidden;
    });

    var passo = function (t) {
      if (ultimo && !parado) {
        var dt = Math.min(t - ultimo, 50);      // aba em segundo plano não acumula salto
        el.scrollLeft += (18 * dt) / 1000;      // ~18 px/s: percebe-se, mas não incomoda
      }
      ultimo = t;
      requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  });
})();
