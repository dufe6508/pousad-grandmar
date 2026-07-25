/* Servidor estático só para preview local. Reproduz o cleanUrls da Vercel:
   /a-pousada -> a-pousada.html. Em produção quem faz isso é o vercel.json. */
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = process.env.PORT || 8099;
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.xml': 'application/xml', '.txt': 'text/plain', '.json': 'application/json',
};

const send = (res, file) => {
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
};

http.createServer(function (req, res) {
  var url = decodeURIComponent(req.url.split('?')[0]);
  if (url.endsWith('/')) url += 'index';
  var candidates = [url, url + '.html', url + '/index.html'].map(function (p) {
    return path.join(ROOT, p);
  });
  var hit = candidates.find(function (p) {
    return p.startsWith(ROOT) && fs.existsSync(p) && fs.statSync(p).isFile();
  });
  if (hit) return send(res, hit);
  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end('<h1>404</h1>');
}).listen(PORT, function () {
  console.log('preview: http://127.0.0.1:' + PORT);
});
