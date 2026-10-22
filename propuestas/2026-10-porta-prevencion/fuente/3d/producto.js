// Renderiza producto.html: `node producto.js stills` (PNG) · `node producto.js video` (MP4) · `node producto.js preview 3,9,13.5`
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const { spawn } = require('child_process');
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = __dirname, IMG = path.resolve(ROOT, '../../imagenes/renders-3d'), VID = path.resolve(ROOT, '../../videos');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json' };
const server = http.createServer((q, r) => { const f = path.join(ROOT, decodeURIComponent(q.url.split('?')[0]));
  fs.readFile(f, (e, d) => { if (e) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' }); r.end(d); }); });
(async () => {
  await new Promise(r => server.listen(0, r));
  const base = `http://localhost:${server.address().port}/producto.html`;
  const mode = process.argv[2] || 'preview';
  const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const open = async modo => { const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
    p.on('pageerror', e => console.error('PAGEERROR', e.message)); p.on('console', m => m.type() === 'error' && console.error(m.text()));
    await p.goto(`${base}?modo=${modo}`); await p.waitForFunction(() => window.ready, null, { timeout: 120000 }); await p.waitForTimeout(200); return p; };
  if (mode === 'stills') {
    fs.mkdirSync(IMG, { recursive: true });
    for (const [modo, f, omit] of [['explosionado', '01-explosionado', false], ['armado', '02-armado-3-4', false], ['transparente', '03-armado-transparente', true]]) {
      const p = await open(modo); await p.screenshot({ path: `${IMG}/${f}.png`, omitBackground: omit }); await p.close(); console.log(f); }
  } else if (mode === 'preview') {
    const p = await open('video');
    for (const t of (process.argv[3] || '2,7.5,10,12.4,13.9').split(',').map(Number)) { await p.evaluate(t => window.seek(t), t); await p.screenshot({ path: `/tmp/claude-0/-home-user-Apalmo-Studio/47611e4c-8ff3-5f73-85aa-b76bc7b75285/scratchpad/p3d_${t}.jpg`, type: 'jpeg', quality: 80 }); console.log(t); }
  } else {
    fs.mkdirSync(VID, { recursive: true });
    const p = await open('video'); const fps = 30, n = Math.round(await p.evaluate(() => window.TOTAL) * fps);
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-vcodec', 'mjpeg', '-r', String(fps), '-i', '-', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'medium', '-movflags', '+faststart', `${VID}/porta-3d-giro.mp4`], { stdio: ['pipe', 'ignore', 'inherit'] });
    const t0 = Date.now();
    for (let i = 0; i < n; i++) { await p.evaluate(t => window.seek(t), i / fps); const buf = await p.screenshot({ type: 'jpeg', quality: 93 });
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r)); if (i % 60 === 0) console.log(`cuadro ${i}/${n} ${((Date.now() - t0) / 1000).toFixed(0)}s`); }
    ff.stdin.end(); await new Promise(r => ff.on('close', r)); console.log('video listo');
  }
  await b.close(); server.close();
})();
