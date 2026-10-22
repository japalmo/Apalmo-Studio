// Renderiza concepto.html (imagen de validación del montaje) → imagenes/concepto/
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = __dirname, OUT = path.resolve(ROOT, '../../imagenes/concepto');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json' };
const server = http.createServer((q, r) => fs.readFile(path.join(ROOT, decodeURIComponent(q.url.split('?')[0])), (e, d) => {
  if (e) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'Content-Type': MIME[path.extname(q.url.split('?')[0])] || 'application/octet-stream' }); r.end(d); }));
(async () => {
  await new Promise(r => server.listen(0, r)); fs.mkdirSync(OUT, { recursive: true });
  const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  p.on('pageerror', e => console.error('PAGEERROR', e.message)); p.on('console', m => m.type() === 'error' && console.error(m.text()));
  await p.goto(`http://localhost:${server.address().port}/concepto.html`);
  await p.waitForFunction(() => window.ready, null, { timeout: 120000 }); await p.waitForTimeout(300);
  await p.screenshot({ path: `${OUT}/${process.argv[2] || 'concepto-v1'}.png` });
  await b.close(); server.close(); console.log('ok');
})();
