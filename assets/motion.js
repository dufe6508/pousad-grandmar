/* Movimento do site — GSAP 3.15 + ScrollTrigger (arquivos em assets/vendor).
   Roda depois do app.js porque as listas de acomodações, estrutura e
   depoimentos são montadas lá: quando este arquivo executa, os elementos
   .reveal já existem no DOM.

   Critério: animação discreta e com função. Entrada suave do que aparece na
   rolagem, abertura do hero e um deslocamento mínimo da foto de fundo. Nada
   de parallax pesado, texto voando ou efeito que atrase a leitura.

   Quem prefere menos movimento (prefers-reduced-motion) e quem cair num
   navegador sem GSAP recebem a página inteira já visível, sem transição. */
(function () {
  'use strict';

  var els = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };
  var mostraTudo = function () {
    els('.reveal').forEach(function (el) { el.classList.add('is-in'); });
  };

  var reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduzir || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    mostraTudo();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: 'power2.out', duration: 0.6 });

  /* O CSS mantém .reveal invisível para não haver piscada antes do script.
     A partir daqui quem controla é o GSAP, então a classe volta a ficar neutra. */
  var reveals = els('.reveal');
  reveals.forEach(function (el) { el.classList.add('is-in'); });
  gsap.set(reveals, { opacity: 0, y: 16 });

  /* entra em lotes: elementos vizinhos sobem juntos, em cascata curta */
  ScrollTrigger.batch(reveals, {
    start: 'top 88%',
    once: true,
    onEnter: function (lote) {
      gsap.to(lote, { opacity: 1, y: 0, stagger: 0.07, overwrite: true });
    },
  });

  /* ------------------------------------------------- assinatura: linha de maré
     A faixa turquesa do topo enche conforme a página rola. É a barra de
     progresso do site — e o único elemento puramente gráfico do projeto. */
  var tide = document.getElementById('tide');
  if (tide) {
    gsap.to(tide, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
    });
  }

  /* ------------------------------------------------------------------ hero */
  var hero = document.querySelector('.hero');
  if (hero) {
    var linha = hero.querySelectorAll('.eyebrow, h1, .hero__lead, .hero__actions, .trust');
    gsap.from(linha, { opacity: 0, y: 22, duration: 0.8, stagger: 0.08, delay: 0.05 });

    /* a colagem entra logo depois do texto, com a foto sobreposta atrasada */
    gsap.from(hero.querySelector('.collage__main'), { opacity: 0, y: 26, duration: 0.9, delay: 0.15 });
    gsap.from(hero.querySelector('.collage__inset'), { opacity: 0, y: 26, scale: 0.96, duration: 0.8, delay: 0.4 });

    /* a foto principal sobe um pouco mais devagar que a página */
    gsap.to(hero.querySelector('.collage__main img'), {
      yPercent: -6,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
  }

  /* faixa de destaques logo abaixo do hero */
  var itensStrip = els('.strip__list li');
  if (itensStrip.length) {
    gsap.from(itensStrip, {
      opacity: 0, y: 14, stagger: 0.07,
      scrollTrigger: { trigger: '.strip', start: 'top 92%', once: true },
    });
  }

  /* cabeçalho das páginas internas */
  var phead = document.querySelector('.phead');
  if (phead) {
    gsap.from(phead.querySelectorAll('.crumb, .eyebrow, h1, .phead__lead'), {
      opacity: 0, y: 18, duration: 0.7, stagger: 0.08,
    });
  }

  /* a galeria é remontada a cada filtro: o ScrollTrigger precisa remedir */
  var filtros = document.getElementById('filters');
  if (filtros) filtros.addEventListener('click', function () { ScrollTrigger.refresh(); });

  /* as fotos entram com atraso; sem isso os gatilhos ficam na posição errada */
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
