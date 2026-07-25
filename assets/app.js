/* Pousada Grandmar — comportamento da página.
   Sem dependências externas: tudo o que o site precisa cabe aqui. */
(function () {
  'use strict';

  var WA = 'https://wa.me/5581998292985?text=';
  var MARCA = 'Pousada Grandmar';

  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var icon = function (name, cls) {
    return '<svg class="' + (cls || 'ico') + '" aria-hidden="true"><use href="#i-' + name + '"></use></svg>';
  };
  var waLink = function (msg) { return WA + encodeURIComponent(msg); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------ WhatsApp */
  $$('[data-wa]').forEach(function (el) {
    el.href = waLink(el.dataset.wa);
    el.target = '_blank';
    el.rel = 'noopener';
  });

  /* enquanto um diálogo (drawer/lightbox) está aberto, o resto da página fica
     inerte — o Tab não escapa para o conteúdo atrás */
  var setPageInert = function (on) {
    ['#main', '#header', 'footer', '#fab', '#totop', '.prefooter'].forEach(function (s) {
      var el = $(s);
      if (el) { if (on) el.setAttribute('inert', ''); else el.removeAttribute('inert'); }
    });
  };

  var ano = $('#ano');
  if (ano) ano.textContent = new Date().getFullYear();

  /* ------------------------------------------------------------ header */
  var header = $('#header');
  var fab = $('#fab');
  var onScroll = function () {
    var y = window.scrollY;
    header.classList.toggle('is-stuck', y > 40);
    if (fab) fab.classList.toggle('is-on', y > window.innerHeight * 0.6);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ------------------------------------------------------------ drawer */
  var drawer = $('#drawer'), burger = $('#burger');
  var setDrawer = function (open) {
    drawer.dataset.open = open ? 'true' : 'false';
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.classList.toggle('is-locked', open);
    setPageInert(open);
    if (fab) fab.style.visibility = open ? 'hidden' : '';
    if (open) { var f = drawer.querySelector('a, button'); if (f) f.focus(); }
    else burger.focus();
  };
  burger.addEventListener('click', function () { setDrawer(drawer.dataset.open !== 'true'); });
  $('#drawerClose').addEventListener('click', function () { setDrawer(false); });
  $$('#drawer a').forEach(function (a) { a.addEventListener('click', function () { setDrawer(false); }); });

  // aplica o data-limit das prévias da Home sem afetar as páginas internas
  var limited = function (el, arr) {
    var n = el && parseInt(el.dataset.limit, 10);
    return n > 0 ? arr.slice(0, n) : arr;
  };

  /* --------------------------------------------------- notas das plataformas */
  var ratings = $('#ratings');
  if (ratings && typeof AVALIACOES !== 'undefined') {
    ratings.innerHTML = AVALIACOES.map(function (r) {
      return '<a class="rating" href="' + r[4] + '"' + (/^https?:/.test(r[4]) ? ' target="_blank" rel="noopener"' : '') + '>' +
        '<b>' + esc(r[0]) + '</b>' + (r[1] ? '<i>' + esc(r[1]) + '</i>' : '') +
        '<span>' + esc(r[2]) + '</span><small>' + esc(r[3]) + '</small></a>';
    }).join('');
  }

  /* ------------------------------------------------------------ depoimentos */
  var quotes = $('#quotes');
  if (quotes && typeof DEPOIMENTOS !== 'undefined') {
    quotes.innerHTML = limited(quotes, DEPOIMENTOS).map(function (q) {
      return '<blockquote class="quote reveal"><p>“' + esc(q[0]) + '”</p>' +
        '<footer>' + esc(q[1]) + ' · ' + esc(q[2]) + '</footer></blockquote>';
    }).join('');
  }

  /* ------------------------------------------------------------ estrutura */
  var feats = $('#feats');
  if (feats && typeof ESTRUTURA !== 'undefined') {
    // na Home a lista vem curta: só ícone e rótulo, sem o parágrafo de apoio
    var curto = feats.dataset.short != null;
    feats.innerHTML = limited(feats, ESTRUTURA).map(function (f) {
      return '<article class="feat reveal">' + icon(f[0]) +
        '<h3>' + esc(f[1]) + '</h3>' +
        (curto ? '' : '<p>' + esc(f[2]) + '</p>') + '</article>';
    }).join('');
  }

  /* ------------------------------------------------------------ acomodações */
  var byId = {};
  if (typeof ACOMODACOES !== 'undefined') ACOMODACOES.forEach(function (r) { byId[r.id] = r; });

  var shortMeta = function (r) {
    return r.itens.slice(0, 2).map(function (it) {
      return icon(it[0], 'ico') + esc(it[1]);
    }).join('<span class="dot">·</span>');
  };

  /* etiqueta curta da prévia: a capacidade dita como a categoria é chamada */
  var badge = function (r) {
    var cap = (r.meta && r.meta[0] && r.meta[0][1]) || '';
    if (/casal/i.test(cap)) return 'Casal';
    if (/4/.test(cap)) return 'Família';
    if (/3/.test(cap)) return 'Até 3';
    return '';
  };

  /* nome curto para o cartão da Home: a categoria completa é longa demais */
  var nomeCurto = function (r) {
    return r.nome.replace(/^Quarto\s+/i, '').replace(/\s+com Varanda e/i, ' ·');
  };

  var roomCompact = function (r) {
    var b = badge(r);
    return '<a class="mroom reveal" href="/acomodacoes#suite-' + r.id + '">' +
      '<span class="mroom__media">' +
        '<img src="img/t/' + r.cover + '.webp" alt="' + esc(r.nome) + '"' +
        ' width="720" height="450" loading="lazy" decoding="async">' +
        (b ? '<span class="mroom__badge">' + esc(b) + '</span>' : '') +
      '</span>' +
      '<span class="mroom__body">' +
        '<span class="mroom__name">' + esc(nomeCurto(r)) + '</span>' +
        '<span class="mroom__meta">' + shortMeta(r) + '</span>' +
      '</span></a>';
  };

  /* cartão completo: foto que abre a galeria, capacidade, comodidades em
     pílulas, o diferencial da acomodação e as duas ações de sempre */
  var roomCard = function (r) {
    var MAX = 4;
    var chips = r.itens.slice(0, MAX).map(function (it) {
      return '<li class="chip">' + icon(it[0]) + esc(it[1]) + '</li>';
    }).join('') +
      (r.itens.length > MAX
        ? '<li class="chip chip--more">+' + (r.itens.length - MAX) + '</li>'
        : '');
    var meta = (r.meta || []).map(function (m) {
      return '<li>' + icon(m[0]) + esc(m[1]) + '</li>';
    }).join('');
    return '<article class="suite reveal" id="suite-' + r.id + '">' +
      '<button class="suite__media" type="button" data-room="' + r.id + '" aria-label="Ver fotos: ' + esc(r.nome) + '">' +
        '<img src="img/' + r.cover + '.webp" alt="' + esc(r.nome) + ', na ' + MARCA + '"' +
        ' width="1400" height="933" loading="lazy" decoding="async">' +
        '<span class="suite__zoom">' + icon('plus') + ' Ver fotos</span>' +
      '</button>' +
      '<div class="suite__body">' +
        '<span class="suite__kind">' + esc(r.kind) + '</span>' +
        '<h3>' + esc(r.nome) + '</h3>' +
        '<p class="suite__desc">' + esc(r.resumo) + '</p>' +
        '<ul class="suite__meta">' + meta + '</ul>' +
        '<ul class="chips">' + chips + '</ul>' +
        (r.destaque ? '<p class="suite__hl">' + icon('sparkle') + '<span>' + esc(r.destaque) + '</span></p>' : '') +
        '<div class="suite__actions">' +
          '<a class="btn btn--primary btn--sm" href="' +
            waLink('Olá! Vim pelo site da ' + MARCA + ' e queria consultar disponibilidade para a ' + r.nome + '.') +
            '" target="_blank" rel="noopener">' + icon('calendar-blank') + 'Consultar datas</a>' +
          '<button class="btn btn--ghost btn--sm" type="button" data-room="' + r.id + '">' + icon('plus') + 'Ver fotos</button>' +
        '</div>' +
      '</div>' +
    '</article>';
  };

  $$('.rooms').forEach(function (el) {
    if (typeof ACOMODACOES === 'undefined') return;
    if (el.dataset.compact != null) {
      el.innerHTML = limited(el, ACOMODACOES).map(roomCompact).join('');
    } else {
      el.innerHTML = ACOMODACOES.map(roomCard).join('');
    }
  });

  /* ------------------------------------------------------------- galeria */
  var galleryEl = $('#gallery'), filtersEl = $('#filters');
  var atual = 'todas';

  var GAL = typeof GALERIA !== 'undefined' ? GALERIA : [];
  var galleryItems = function () {
    return GAL.filter(function (g) { return atual === 'todas' || g[1] === atual; });
  };

  var renderGallery = function () {
    var items = galleryItems();
    galleryEl.innerHTML = items.map(function (g, i) {
      return '<button type="button" data-gal="' + i + '">' +
        '<img src="img/t/' + g[0] + '.webp" alt="' + esc(g[2]) + '"' +
        ' width="720" height="720" loading="lazy" decoding="async"></button>';
    }).join('');
  };

  if (galleryEl && typeof GALERIA !== 'undefined') {
    filtersEl.innerHTML = GALERIA_FILTROS.map(function (f) {
      return '<button class="filter" type="button" data-filter="' + f[0] + '" aria-pressed="' +
        (f[0] === 'todas') + '">' + esc(f[1]) + '</button>';
    }).join('');

    filtersEl.addEventListener('click', function (e) {
      var b = e.target.closest('[data-filter]');
      if (!b) return;
      atual = b.dataset.filter;
      $$('.filter', filtersEl).forEach(function (x) {
        x.setAttribute('aria-pressed', String(x === b));
      });
      renderGallery();
    });

    renderGallery();
  }

  /* -------------------------------------------- fotos da pousada (carrossel) */
  var photoCar = $('#photoCar');
  var photoSet = [];
  if (photoCar && typeof GALERIA !== 'undefined') {
    // fotos já usadas em outro ponto da página não voltam no carrossel
    var jaNaPagina = {};
    $$('img').forEach(function (im) {
      var m = (im.getAttribute('src') || '').match(/([^/]+)\.webp$/);
      if (m) jaNaPagina[m[1]] = true;
    });
    photoSet = GALERIA.filter(function (g) {
      return (g[1] === 'areas' || g[1] === 'cafe') && !jaNaPagina[g[0]];
    });
    photoCar.innerHTML = photoSet.map(function (g, i) {
      return '<button class="pcard" type="button" data-pc="' + i + '">' +
        '<img src="img/t/' + g[0] + '.webp" alt="' + esc(g[2]) + '"' +
        ' width="720" height="900" loading="lazy" decoding="async" draggable="false"></button>';
    }).join('');
  }

  /* --------------------------------------------------- carrossel contínuo
     Duplica os itens para os dois lados e reposiciona o scroll perto da borda:
     dá a sensação de loop sem fim. Arrastar com o mouse também rola. */
  $$('.carousel').forEach(function (el) {
    var items = Array.prototype.slice.call(el.children);
    if (items.length < 3) return;
    var clone = function (n) {
      var c = n.cloneNode(true);
      c.setAttribute('aria-hidden', 'true');
      c.setAttribute('tabindex', '-1');
      return c;
    };
    items.forEach(function (n) { el.appendChild(clone(n)); });
    items.forEach(function (n) { el.insertBefore(clone(n), el.firstChild); });
    var third = function () { return el.scrollWidth / 3; };
    el.scrollLeft = third();
    el.addEventListener('scroll', function () {
      var w = third();
      if (el.scrollLeft < w * 0.4) el.scrollLeft += w;
      else if (el.scrollLeft > w * 1.6) el.scrollLeft -= w;
    }, { passive: true });

    var down = false, moved = false, sx = 0, sl = 0;
    el.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse') return;
      down = true; moved = false; sx = e.clientX; sl = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
      el.classList.add('is-drag');
    });
    el.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - sx;
      if (Math.abs(dx) > 5) moved = true;
      el.scrollLeft = sl - dx;
    });
    var up = function () { down = false; el.classList.remove('is-drag'); };
    el.addEventListener('pointerup', up);
    el.addEventListener('pointerleave', up);
    el.addEventListener('click', function (e) {
      if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
    }, true);
  });

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-pc]');
    if (!b || !photoSet.length) return;
    var items = photoSet.map(function (g) {
      return { src: 'img/' + g[0] + '.webp', alt: g[2] };
    });
    openLb(items, MARCA, +b.dataset.pc);
  });

  /* ---------------------------------------------------------------- faq */
  var faq = $('#faq');
  if (faq && typeof FAQ !== 'undefined') {
    faq.innerHTML = FAQ.map(function (f) {
      return '<details><summary>' + esc(f[0]) + icon('plus') + '</summary><p>' + esc(f[1]) + '</p></details>';
    }).join('');
  }

  /* ------------------------------------------------------------ lightbox */
  var lb = $('#lightbox'), lbImg = $('#lbImg'), lbCap = $('#lbCap'),
      lbCount = $('#lbCount'), lbTitle = $('#lbTitle');
  var set = [], idx = 0, lastFocus = null;

  var show = function (i) {
    idx = (i + set.length) % set.length;
    var it = set[idx];
    lbImg.hidden = false;
    lbImg.src = it.src;
    lbImg.alt = it.alt;
    lbCap.textContent = it.alt;
    lbCount.textContent = (idx + 1) + ' / ' + set.length;
  };

  var openLb = function (items, title, start) {
    if (!items.length) return;
    lastFocus = document.activeElement;
    set = items;
    lbTitle.textContent = title || '';
    lb.dataset.open = 'true';
    document.body.classList.add('is-locked');
    setPageInert(true);
    if (fab) fab.style.visibility = 'hidden';
    show(start || 0);
    $('#lbClose').focus();
  };

  var closeLb = function () {
    lb.dataset.open = 'false';
    setPageInert(false);
    if (fab) fab.style.visibility = '';
    lbImg.hidden = true;
    lbImg.removeAttribute('src');
    document.body.classList.remove('is-locked');
    if (lastFocus) lastFocus.focus();
  };

  $('#lbClose').addEventListener('click', closeLb);
  $('#lbPrev').addEventListener('click', function () { show(idx - 1); });
  $('#lbNext').addEventListener('click', function () { show(idx + 1); });
  lb.addEventListener('click', function (e) {
    if (e.target === lb || e.target.id === 'lbStage') closeLb();
  });

  // arrastar no mobile: lateral troca a foto, para baixo fecha
  var tx = 0, ty = 0;
  var stage = $('#lbStage');
  stage.addEventListener('touchstart', function (e) {
    tx = e.changedTouches[0].clientX; ty = e.changedTouches[0].clientY;
  }, { passive: true });
  stage.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) show(idx + (dx < 0 ? 1 : -1));
    else if (dy > 80 && Math.abs(dy) > Math.abs(dx)) closeLb();
  }, { passive: true });

  document.addEventListener('keydown', function (e) {
    if (drawer.dataset.open === 'true' && e.key === 'Escape') return setDrawer(false);
    if (lb.dataset.open !== 'true') return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });

  // fotos de uma acomodação
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-room]');
    if (!b) return;
    var r = byId[b.dataset.room];
    if (!r) return;
    var total = r.fotos.length;
    var items = r.fotos.map(function (f, n) {
      return { src: 'img/' + f + '.webp', alt: r.nome + ', foto ' + (n + 1) + ' de ' + total };
    });
    openLb(items, r.nome);
  });

  // fotos da galeria
  if (galleryEl) {
    galleryEl.addEventListener('click', function (e) {
      var b = e.target.closest('[data-gal]');
      if (!b) return;
      var items = galleryItems().map(function (g) {
        return { src: 'img/' + g[0] + '.webp', alt: g[2] };
      });
      openLb(items, MARCA, +b.dataset.gal);
    });
  }

  /* --------------------------------------------------------- formulário WA */
  var form = $('#waForm');
  if (form) {
    var err = $('#formErr');
    var fmt = function (v) {
      if (!v) return '';
      var p = v.split('-');
      return p[2] + '/' + p[1] + '/' + p[0];
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var nome = (d.get('nome') || '').toString().trim();

      if (!nome) {
        err.textContent = 'Escreva seu nome para a gente saber com quem está falando.';
        err.style.display = 'block';
        $('#f-nome').setAttribute('aria-invalid', 'true');
        $('#f-nome').focus();
        return;
      }
      $('#f-nome').removeAttribute('aria-invalid');
      err.style.display = 'none';

      var linhas = ['Olá! Meu nome é ' + nome + '. Vim pelo site da ' + MARCA + '.'];
      var ent = fmt(d.get('entrada')), sai = fmt(d.get('saida'));
      if (ent && sai) linhas.push('Gostaria de consultar disponibilidade de ' + ent + ' a ' + sai + '.');
      else if (ent) linhas.push('Gostaria de consultar disponibilidade a partir de ' + ent + '.');
      else linhas.push('Gostaria de consultar disponibilidade.');

      var pessoas = d.get('pessoas');
      if (pessoas) linhas.push('Seríamos ' + pessoas + (pessoas === '1' ? ' pessoa.' : ' pessoas.'));

      var suite = (d.get('suite') || '').toString();
      if (suite) linhas.push('Tenho interesse na ' + suite + '.');

      var msg = (d.get('msg') || '').toString().trim();
      if (msg) linhas.push(msg);

      window.open(waLink(linhas.join('\n')), '_blank', 'noopener');
    });

    // datas coerentes: entrada a partir de hoje, saída depois da entrada
    var entrada = $('#f-entrada'), saida = $('#f-saida');
    if (entrada && saida) {
      var hoje = new Date().toISOString().slice(0, 10);
      entrada.min = hoje;
      saida.min = hoje;
      entrada.addEventListener('change', function () {
        if (entrada.value) {
          saida.min = entrada.value;
          if (saida.value && saida.value < entrada.value) saida.value = '';
        }
      });
    }

    var sel = $('#f-suite');
    if (sel && typeof ACOMODACOES !== 'undefined') {
      ACOMODACOES.forEach(function (r) {
        var o = document.createElement('option');
        o.value = r.nome; o.textContent = r.nome;
        sel.appendChild(o);
      });
    }
  }

  /* A entrada dos elementos .reveal é feita pelo motion.js, com GSAP. */

  /* ---------------------------------------------------------- voltar ao topo */
  var toTop = $('#totop');
  if (toTop) {
    var onTop = function () { toTop.classList.toggle('is-on', window.scrollY > window.innerHeight * 1.2); };
    window.addEventListener('scroll', onTop, { passive: true });
    onTop();
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
  }
})();
