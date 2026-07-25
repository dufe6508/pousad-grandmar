# Pousada Grandmar — site

Site da Pousada Grandmar, pousada pé na areia na praia de Maragogi (AL).
Sete páginas estáticas, sem framework: HTML gerado por um script Node, um CSS,
dois JS próprios e GSAP para o movimento.

## Rodar

```bash
node build.js     # gera os .html na raiz + sitemap.xml
node serve.js     # preview em http://127.0.0.1:8099
```

Não há `npm install`: o projeto não tem dependências de runtime. O GSAP já está
vendorizado em `assets/vendor/`.

## Estrutura

```
build.js              layout comum (head, header, drawer, rodapé, lightbox) + build
serve.js              servidor de preview com URLs limpas
src/pages/all.js      o miolo de cada página
src/icons.svg         sprite de ícones (um pacote só)
assets/styles.css     design system inteiro — ver DESIGN_SYSTEM.md
assets/data.js        conteúdo: acomodações, estrutura, galeria, avaliações, FAQ
assets/app.js         comportamento: menu, galeria, lightbox, formulário
assets/motion.js      animações (GSAP + ScrollTrigger)
assets/vendor/        gsap.min.js, ScrollTrigger.min.js (3.15.0)
img/                  webp 1400px  ·  img/t/ thumbs 720px  ·  og.jpg
fotos/                originais em jpg (não vão para o deploy)
```

Editar conteúdo é mexer em `assets/data.js` e `src/pages/all.js`, depois rodar
`node build.js`. Os `.html` da raiz são gerados — não edite à mão.

## Páginas

`/` · `/a-pousada` · `/acomodacoes` · `/estrutura` · `/galeria` · `/maragogi` · `/contato`

## Deploy (Vercel)

Projeto estático, sem build step obrigatório na Vercel — basta subir a pasta com
os `.html` já gerados. `vercel.json` cuida das URLs limpas e do cache longo de
`/assets` e `/img`; `.vercelignore` mantém `fotos/`, `src/` e os scripts fora do
deploy.

Antes de publicar, trocar `SITE` no topo do `build.js` pelo domínio definitivo
(hoje `https://pousadagrandmar.vercel.app`) e rodar o build de novo — canonical,
Open Graph e sitemap saem de lá.

## Conteúdo: o que é verificado

Todo dado do site veio da página oficial da pousada na Booking.com, da ficha do
Tripadvisor e da bio do Instagram [@pousadagrandmarmaragogi](https://www.instagram.com/pousadagrandmarmaragogi/).
As fotos são da galeria oficial da pousada na Booking.

Confirmado e publicado: endereço, coordenadas, WhatsApp, seis categorias de
quarto com composição de camas, comodidades, regras da casa, horários de
check-in/out, notas (9,1 no Booking em 693 avaliações; 4,3 no Tripadvisor),
comentários reais de hóspedes e distâncias (Galés 4,7 km, São Bento 2,5 km,
Barra Grande 5 km, aeroporto de Maceió 121 km).

**Não publicado por falta de confirmação:** preços, horário do café da manhã,
e-mail da pousada, telefone fixo, distância exata até o centro e até Recife.
Nesses pontos o site convida a falar pelo WhatsApp.

## Pendências para a pousada

1. **Fotos do Instagram.** O perfil exige login para leitura automatizada; as
   imagens do site vieram da Booking. Se a pousada enviar os originais (e os
   vídeos), dá para melhorar a galeria e o hero.
2. **Confirmar** se o café da manhã está incluso nas tarifas e o horário em que
   é servido, para deixar isso explícito no FAQ.

## Marca

Símbolo de sol sobre o mar, em SVG. Vai inline pela constante `MARK` no
`build.js` para herdar a cor do contexto (branco sobre foto, azul no header
sólido, turquesa no rodapé); as versões em arquivo são `img/logo.svg`,
`img/favicon.svg` e `img/apple-touch-icon.png`. Se a pousada adotar uma logo
oficial depois, é nesses quatro pontos que ela entra.
