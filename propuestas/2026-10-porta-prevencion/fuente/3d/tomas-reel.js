// Renderiza las tomas verticales del reel como secuencias JPG: node tomas-reel.js <salida> [preview]
const { chromium } = require('./pw');
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = __dirname, OUT = process.argv[2], PREVIEW = process.argv[3] === 'preview';
const TOMAS = Object.fromEntries(Object.entries({ entrada: 2.6, explota: 3.4, qr: 2.4, nfc: 2.4, giro: 3.6, medida: 3.2 }).filter(([n]) => !process.argv[4] || process.argv[4].split(',').includes(n)));   // duración en segundos
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json' };
const server = http.createServer((q, r) => { const f = path.join(ROOT, decodeURIComponent(q.url.split('?')[0]));
  fs.readFile(f, (e, d) => { if (e) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' }); r.end(d); }); });
(async () => {
  await new Promise(r => server.listen(0, r));
  const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  p.on('pageerror', e => console.error('PAGEERROR', e.message));
  await p.goto(`http://localhost:${server.address().port}/producto.html?modo=reel`);
  await p.waitForFunction(() => window.ready, null, { timeout: 120000 });
  for (const [n, d] of Object.entries(TOMAS)) {
    const dir = path.join(OUT, n); fs.mkdirSync(dir, { recursive: true });
    const frames = PREVIEW ? [0, .5, 1].map(k => Math.round(k * (d * 30 - 1))) : [...Array(Math.round(d * 30)).keys()];
    for (const i of frames) {
      const k = i / (d * 30 - 1);
      await p.evaluate(([n, k, t]) => window.toma(n, k, t), [n, k, i / 30]);
      await p.screenshot({ path: path.join(dir, String(i).padStart(4, '0') + '.jpg'), type: 'jpeg', quality: 90 });
    }
    if (n === 'medida') { await p.evaluate(() => window.toma('medida', 0, 0));
      console.log('cotas frente', JSON.stringify(await p.evaluate(() => { const { W, H } = window.MEDIDAS;
        return window.proyectar([[-W / 2, -H / 2, 1.45], [W / 2, -H / 2, 1.45], [W / 2, H / 2, 1.45], [-W / 2, H / 2, 1.45]]); }))); }
    console.log(n, frames.length);
  }
  await b.close(); server.close();
})();
