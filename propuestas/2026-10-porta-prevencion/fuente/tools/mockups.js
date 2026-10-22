// Monta las capturas en marcos de teléfono: PNG individuales (fondo transparente) y composiciones 16:9.
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const path = require('path'), fs = require('fs');
const CAP = path.resolve(__dirname, '../capturas');
const OUT = path.resolve(__dirname, '../../imagenes/mockups');
fs.mkdirSync(OUT, { recursive: true });
const img = f => 'data:image/png;base64,' + fs.readFileSync(`${CAP}/${f}.png`).toString('base64');
const WIFI = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"><path d="M3 9a13 13 0 0 1 18 0"/><path d="M6.5 12.5a8 8 0 0 1 11 0"/><circle cx="12" cy="17" r="1.8" fill="#fff" stroke="none"/></svg>';
const phone = (f, w = 390) => `<div class="ph" style="--w:${w}px"><div class="scr"><div class="sb"><b>07:41</b><span>Sin servicio ${WIFI}</span></div><img src="${img(f)}"><div class="isl"></div></div></div>`;
const CSS = `*{margin:0;box-sizing:border-box}body{font-family:Inter,sans-serif}
.ph{width:calc(var(--w) + 28px);padding:14px;border-radius:calc(var(--w)*.16);background:linear-gradient(145deg,#3a4048,#15181c);box-shadow:0 0 0 2px #50565e inset,0 40px 80px -20px rgba(0,0,0,.45),0 18px 30px -12px rgba(0,0,0,.35)}
.scr{position:relative;border-radius:calc(var(--w)*.13);overflow:hidden;background:#1C2126;aspect-ratio:390/894;display:flex;flex-direction:column}
.scr img{width:100%;display:block}
.sb{height:calc(var(--w)*50/390);flex:none;display:flex;align-items:center;justify-content:space-between;padding:calc(var(--w)*8/390) calc(var(--w)*30/390) 0;color:#fff;font-size:calc(var(--w)*14/390)}
.sb span{display:flex;align-items:center;gap:5px;font-size:calc(var(--w)*11.5/390);color:#cfd5db}.sb svg{width:calc(var(--w)*16/390)}
.isl{position:absolute;top:calc(var(--w)*11/390);left:50%;transform:translateX(-50%);width:28%;height:calc(var(--w)*30/390);background:#000;border-radius:99px}`;
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ deviceScaleFactor: 2 });
  // individuales
  for (const f of fs.readdirSync(CAP).filter(x => x.endsWith('.png')).map(x => x.slice(0, -4))) {
    await p.setViewportSize({ width: 470, height: 950 });
    await p.setContent(`<style>${CSS}body{background:transparent;padding:22px 16px 40px}</style>${phone(f)}`);
    await p.locator('.ph').screenshot({ path: `${OUT}/telefono-${f}.png`, omitBackground: true });
  }
  // composiciones 16:9
  const comp = (titulo, sub, fs3) => `<style>${CSS}
    body{width:1920px;height:1080px;overflow:hidden;background:radial-gradient(1200px 700px at 75% 55%,#2c333b 0%,#1C2126 60%);color:#fff;display:flex;align-items:center;padding:0 110px;gap:70px}
    .t{width:560px;flex:none}.k{font-size:22px;font-weight:800;letter-spacing:.2em;color:#F26B1D}
    h1{font-size:64px;line-height:1.05;letter-spacing:-.02em;margin:18px 0 22px}p{font-size:24px;line-height:1.5;color:#b3bcc5}
    .row{display:flex;gap:34px;align-items:center}.row .ph:nth-child(2){transform:translateY(-26px)}</style>
    <div class="t"><div class="k">PORTA</div><h1>${titulo}</h1><p>${sub}</p></div><div class="row">${fs3.map(f => phone(f, 330)).join('')}</div>`;
  await p.setViewportSize({ width: 1920, height: 1080 }); 
  const C = [
    ['composicion-menu', 'Un menú simple, desde el navegador', 'Sin instalar apps. Te conectas a la red Wi-Fi de PORTA y se abre el menú con documentos y checklists.', ['01-bienvenida', '02-menu', '03-biblioteca']],
    ['composicion-checklists', 'Checklists que avisan a tiempo', 'Vehículo, fatiga y somnolencia, y generador. Cada respuesta queda guardada con nombre, fecha y hora.', ['05-checklist-vehiculo', '06-checklist-fatiga', '08-resultado-fatiga']],
    ['composicion-documentos', 'La documentación siempre a bordo', 'Procedimientos, contratos, IRL, hojas de seguridad y plan de emergencia, aunque no haya señal.', ['03-biblioteca', '04-documento', '10-registros']],
  ];
  for (const [n, t, s, f] of C) { await p.setContent(comp(t, s, f)); await p.waitForTimeout(100); await p.screenshot({ path: `${OUT}/${n}.png` }); console.log(n); }
  await b.close();
})();
