/* Captura de tela e checagem de layout, sem dependências.
   Fala CDP direto com o Chrome (Node 22+ já traz WebSocket nativo), então não
   precisa de Puppeteer nem de MCP de browser.

   uso:  node shot.js /             → captura index em mobile e desktop
         node shot.js /acomodacoes  → outra rota
   saída: shots/<rota>-mobile.png, shots/<rota>-desktop.png + relatório de
          elementos que estouram a largura da tela. */
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const CHROME = process.env.CHROME ||
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE = process.env.BASE || 'http://127.0.0.1:8099';
const PORT = 9333;
const rota = process.argv[2] || '/';
const OUT = path.join(__dirname, 'shots');

const VIEWS = [
  { nome: 'mobile', width: 390, height: 844, scale: 2 },
  { nome: 'desktop', width: 1440, height: 900, scale: 1 },
];

const espera = (ms) => new Promise((r) => setTimeout(r, ms));

async function chromeJson(caminho) {
  const r = await fetch(`http://127.0.0.1:${PORT}${caminho}`);
  return r.json();
}

/* cliente CDP mínimo: envia comando, resolve pela id da resposta */
function conectar(wsUrl) {
  const ws = new WebSocket(wsUrl);
  const pendentes = new Map();
  let id = 0;
  ws.addEventListener('message', (ev) => {
    const msg = JSON.parse(ev.data);
    const p = pendentes.get(msg.id);
    if (!p) return;
    pendentes.delete(msg.id);
    msg.error ? p.reject(new Error(msg.error.message)) : p.resolve(msg.result);
  });
  const pronto = new Promise((res, rej) => {
    ws.addEventListener('open', res, { once: true });
    ws.addEventListener('error', rej, { once: true });
  });
  const cmd = (method, params) =>
    new Promise((resolve, reject) => {
      const n = ++id;
      pendentes.set(n, { resolve, reject });
      ws.send(JSON.stringify({ id: n, method, params: params || {} }));
    });
  return { pronto, cmd, fechar: () => ws.close() };
}

/* roda no navegador: lista quem é mais largo que a tela */
const SCRIPT_OVERFLOW = `(() => {
  const limite = document.documentElement.clientWidth;
  const fora = [];
  document.querySelectorAll('body *').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width === 0) return;
    if (r.right > limite + 1 || r.left < -1) {
      fora.push({
        tag: el.tagName.toLowerCase(),
        cls: (el.getAttribute('class') || '').slice(0, 60),
        left: Math.round(r.left),
        right: Math.round(r.right),
      });
    }
  });
  return JSON.stringify({
    limite,
    scrollWidth: document.documentElement.scrollWidth,
    fora: fora.slice(0, 12),
  });
})()`;

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const perfil = fs.mkdtempSync(path.join(require('os').tmpdir(), 'shot-'));
  const chrome = spawn(CHROME, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars',
    '--blink-settings=preferredColorScheme=1',
    `--remote-debugging-port=${PORT}`, `--user-data-dir=${perfil}`,
    'about:blank',
  ], { stdio: 'ignore' });

  try {
    let alvo = null;
    for (let i = 0; i < 40 && !alvo; i++) {
      await espera(150);
      try {
        const abas = await chromeJson('/json/list');
        alvo = abas.find((t) => t.type === 'page');
      } catch { /* ainda subindo */ }
    }
    if (!alvo) throw new Error('Chrome não respondeu na porta de depuração');

    const { pronto, cmd, fechar } = conectar(alvo.webSocketDebuggerUrl);
    await pronto;
    await cmd('Page.enable');

    const nome = rota === '/' ? 'index' : rota.replace(/\//g, '');
    for (const v of VIEWS) {
      await cmd('Emulation.setDeviceMetricsOverride', {
        width: v.width, height: v.height, deviceScaleFactor: v.scale, mobile: v.nome === 'mobile',
      });
      await cmd('Page.navigate', { url: BASE + rota });
      await espera(2500);                       // fontes, imagens e a animação de entrada
      await cmd('Runtime.evaluate', { expression: 'window.scrollTo(0, document.body.scrollHeight)' });
      await espera(1200);                       // dispara os reveals que faltam
      await cmd('Runtime.evaluate', { expression: 'window.scrollTo(0, 0)' });
      await espera(400);

      const r = await cmd('Runtime.evaluate', { expression: SCRIPT_OVERFLOW, returnByValue: true });
      const info = JSON.parse(r.result.value);
      console.log(`\n[${v.nome}] tela ${info.limite}px · página ${info.scrollWidth}px`);
      if (info.fora.length) {
        console.log('  estouram a largura:');
        info.fora.forEach((f) => console.log(`   ${f.tag}.${f.cls}  ${f.left}→${f.right}`));
      } else {
        console.log('  nenhum elemento estoura a largura');
      }

      const shot = await cmd('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
      const arq = path.join(OUT, `${nome}-${v.nome}.png`);
      fs.writeFileSync(arq, Buffer.from(shot.data, 'base64'));
      console.log('  ->', path.relative(__dirname, arq));
    }
    fechar();
  } finally {
    chrome.kill();
  }
})();
