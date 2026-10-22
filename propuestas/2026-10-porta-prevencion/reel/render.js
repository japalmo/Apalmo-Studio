// Renderiza el reel vertical (1080x1920) cuadro a cuadro (Playwright) y la codifica con ffmpeg.
// Uso: node render.js <archivo.html> preview 3,10,17   |   node render.js <archivo.html> frames <dir> 4,20   |   node render.js <archivo.html> full <salida_sin_audio.mp4>
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const { spawn } = require('child_process');
const path = require('path');
(async () => {
  const [file, mode = 'preview', a3, a4] = process.argv.slice(2);
  const browser = await chromium.launch({ args: ['--allow-file-access-from-files'] });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  page.on('pageerror', e => console.error('PAGEERROR', e.message));
  page.on('console', m => { if (m.type() === 'error') console.error('CONSOLE', m.text()); });
  await page.goto('file://' + path.resolve(__dirname, file));
  await page.evaluate(() => window.ready);
  await page.waitForTimeout(300);
  const base = path.basename(file, '.html');
  if (mode === 'preview') {
    for (const t of a3.split(',').map(Number)) { await page.evaluate(t => window.seek(t), t); await page.waitForTimeout(30); await page.screenshot({ path: `prev_${base}_${String(t).replace('.', '_')}.jpg`, type: 'jpeg', quality: 80 }); }
  } else if (mode === 'frames') {
    for (const t of a4.split(',').map(Number)) { await page.evaluate(t => window.seek(t), t); await page.waitForTimeout(30); await page.screenshot({ path: `${a3}/${base}-${String(t).replace('.', '_')}s.png` }); }
  } else {
    const fps = 30; const total = await page.evaluate(() => window.TOTAL); const n = Math.round(total * fps);
    const ff = spawn('ffmpeg', ['-y', '-f', 'image2pipe', '-vcodec', 'mjpeg', '-r', String(fps), '-i', '-', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'fast', '-movflags', '+faststart', a3], { stdio: ['pipe', 'ignore', 'inherit'] });
    const t0 = Date.now();
    for (let i = 0; i < n; i++) {
      await page.evaluate(t => window.seek(t), i / fps);
      const buf = await page.screenshot({ type: 'jpeg', quality: 93 });
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      if (i % 300 === 0) console.log(`${base}: frame ${i}/${n} ${((Date.now() - t0) / 1000).toFixed(0)}s`);
    }
    ff.stdin.end(); await new Promise(r => ff.on('close', r)); console.log('done', a3);
  }
  await browser.close();
})();
