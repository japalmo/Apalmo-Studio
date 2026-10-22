// Agrega overlay tipo dashcam (REC, fecha/hora, GPS) a la imagen de la cámara interior.
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const path = require('path'), fs = require('fs');
const IMG = path.resolve(__dirname, '../../imagenes/ia/08-dashcam-cabina-ir.png');
const OUT = path.resolve(__dirname, '../../imagenes/dashcam/cabina-ir-con-datos.png');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1672, height: 941 } });
  const src = 'data:image/png;base64,' + fs.readFileSync(IMG).toString('base64');
  await p.setContent(`<style>*{margin:0}body{width:1672px;height:941px;position:relative;font-family:"JetBrains Mono",monospace;color:#fff}
  img{position:absolute;inset:0;width:100%;height:100%}.t{position:absolute;font-size:30px;text-shadow:0 2px 4px #000;font-weight:700}
  .rec{display:flex;align-items:center;gap:12px}.rec i{width:20px;height:20px;border-radius:50%;background:#ff3b3b}
  .ev{position:absolute;right:36px;bottom:36px;background:rgba(242,107,29,.92);padding:14px 22px;border-radius:12px;font:700 28px Inter,sans-serif}</style>
  <img src="${src}"><div class="t rec" style="left:36px;top:30px"><i></i>REC · CABINA IR</div>
  <div class="t" style="right:36px;top:30px">PORTA · CH-04</div>
  <div class="t" style="left:36px;bottom:36px">22-10-2026 05:48:12 · 63 km/h · GPS ✓</div>
  <div class="ev">⚑ Incidente marcado</div>`);
  await p.waitForTimeout(200); await p.screenshot({ path: OUT }); await b.close(); console.log(OUT);
})();
