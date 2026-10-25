// Renderiza las piezas: `node render.js` (todas) · `node render.js promo,pared` (algunas). PNG con fondo transparente en ../../imagenes
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = __dirname, OUT = path.resolve(ROOT, '../../imagenes');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json' };
const server = http.createServer((req, res) => {
  const f = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  fs.readFile(f, (err, data) => { if (err) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' }); res.end(data); });
});
const VISTAS = { promo: [1100, 1200], pared: [1100, 1200], 'bienvenida-mesa': [1100, 1200], llaveros: [1500, 1000], 'llavero-frente': [900, 1100], 'llavero-reverso': [900, 1100] };
(async () => {
  await new Promise(r => server.listen(0, r));
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const solo = process.argv[2] ? process.argv[2].split(',') : Object.keys(VISTAS);
  for (const v of solo) {
    const [w, h] = VISTAS[v];
    const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1.5 });
    page.on('pageerror', e => console.error('PAGEERROR', e.message));
    page.on('console', m => { if (m.type() === 'error') console.error('CONSOLE', m.text()); });
    await page.goto(`http://localhost:${server.address().port}/index.html?vista=${v}`);
    await page.waitForFunction(() => window.ready, null, { timeout: 180000 });
    await page.screenshot({ path: `${OUT}/${v}.png`, omitBackground: true });
    await page.close(); console.log(v);
  }
  await browser.close(); server.close();
})();
