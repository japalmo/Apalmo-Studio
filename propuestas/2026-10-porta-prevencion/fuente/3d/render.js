// Renderiza el modelo 3D de PORTA (v2, tipo dashcam): `node render.js stills` (PNG) · `node render.js video` (MP4) · `node render.js preview 2,8,11`
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const { spawn } = require('child_process');
const http = require('http'), fs = require('fs'), path = require('path');

const ROOT = __dirname;
const IMG = path.resolve(ROOT, '../../imagenes/renders-3d');
const VID = path.resolve(ROOT, '../../videos');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json' };
const server = http.createServer((req, res) => {
  const f = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  fs.readFile(f, (err, data) => {
    if (err) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' }); res.end(data);
  });
});

(async () => {
  await new Promise(r => server.listen(0, r));
  const base = `http://localhost:${server.address().port}/index.html`;
  const mode = process.argv[2] || 'preview';
  const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const open = async (bg, dsf = 1) => {
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: dsf });
    page.on('pageerror', e => console.error('PAGEERROR', e.message));
    page.on('console', m => { if (m.type() === 'error') console.error('CONSOLE', m.text()); });
    await page.goto(`${base}?bg=${bg}`);
    await page.waitForFunction(() => window.ready, null, { timeout: 120000 });
    return page;
  };

  if (mode === 'stills') {
    fs.mkdirSync(IMG, { recursive: true });
    const shots = [
      ['light', 'cabina', '01-porta-cara-cabina-nfc'],
      ['light', 'frente', '02-porta-cara-frontal-qr'],
      ['light', 'ctxIn', '03-porta-bajo-retrovisor-desde-cabina'],
      ['light', 'ctxOut', '04-porta-qr-desde-afuera'],
      ['light', 'exploded', '05-porta-explosionado'],
      ['light', 'size', '06-porta-vs-telefono'],
      ['dark', 'cabina', '07-porta-cara-cabina-oscuro'],
      ['transparent', 'cabina', 'porta-cabina-transparente'],
      ['transparent', 'frente', 'porta-frontal-transparente'],
    ];
    const only = process.argv[3] ? process.argv[3].split(',') : null;
    for (const [bg, view, name] of shots.filter(s => !only || only.some(o => s[2].startsWith(o)))) {
      const page = await open(bg, 1.25);
      await page.evaluate(v => window.setView(v), view);
      await page.waitForTimeout(200);
      await page.screenshot({ path: `${IMG}/${name}.png`, omitBackground: bg === 'transparent' });
      await page.close();
      console.log(name);
    }
  } else if (mode === 'video') {
    fs.mkdirSync(VID, { recursive: true });
    const page = await open('light');
    const fps = 30, total = await page.evaluate(() => window.TOTAL), n = Math.round(total * fps);
    const ff = spawn('ffmpeg', ['-y', '-f', 'image2pipe', '-vcodec', 'mjpeg', '-r', String(fps), '-i', '-', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'medium', '-movflags', '+faststart', `${VID}/porta-3d-giro.mp4`], { stdio: ['pipe', 'ignore', 'inherit'] });
    const t0 = Date.now();
    for (let i = 0; i < n; i++) {
      await page.evaluate(t => window.seek(t), i / fps);
      const buf = await page.screenshot({ type: 'jpeg', quality: 94 });
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      if (i % 60 === 0) console.log(`frame ${i}/${n} ${((Date.now() - t0) / 1000).toFixed(0)}s`);
    }
    ff.stdin.end(); await new Promise(r => ff.on('close', r));
    console.log('video listo');
  } else {
    const page = await open(process.argv[4] || 'light');
    for (const t of (process.argv[3] || '0,3,5,9.5,14,16.8').split(',').map(Number)) {
      await page.evaluate(t => window.seek(t), t);
      await page.screenshot({ path: path.join(require('os').tmpdir(), `porta3d_${t}.jpg`), type: 'jpeg', quality: 85 });
      console.log('preview', t);
    }
  }
  await browser.close(); server.close();
})();
