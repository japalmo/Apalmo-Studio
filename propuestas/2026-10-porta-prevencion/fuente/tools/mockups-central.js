// Monta las capturas de PORTA Central en un notebook (PNG transparente) y en composiciones 16:9.
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const path = require('path'), fs = require('fs');
const CAP = path.resolve(__dirname, '../capturas-central');
const OUT = path.resolve(__dirname, '../../imagenes/mockups');
const img = f => 'data:image/png;base64,' + fs.readFileSync(`${CAP}/${f}.png`).toString('base64');
const laptop = (f, w = 1200) => `<div class="lp" style="--w:${w}px"><div class="lid"><div class="cam"></div><img src="${img(f)}"></div><div class="base"><i></i></div></div>`;
const CSS = `*{margin:0;box-sizing:border-box}body{font-family:Inter,sans-serif}
.lp{width:calc(var(--w)*1.12);display:flex;flex-direction:column;align-items:center;filter:drop-shadow(0 40px 50px rgba(0,0,0,.35))}
.lid{width:var(--w);padding:calc(var(--w)*.022) calc(var(--w)*.018) calc(var(--w)*.03);background:#0f1215;border-radius:calc(var(--w)*.022) calc(var(--w)*.022) 6px 6px;box-shadow:0 0 0 2px #3b4148 inset;position:relative}
.lid img{width:100%;display:block;border-radius:3px}
.lid .cam{position:absolute;top:calc(var(--w)*.009);left:50%;width:7px;height:7px;border-radius:50%;background:#2a2f35;transform:translateX(-50%)}
.base{width:100%;height:calc(var(--w)*.03);background:linear-gradient(#cfd3d8,#9aa0a7);border-radius:0 0 calc(var(--w)*.03) calc(var(--w)*.03);position:relative}
.base i{position:absolute;left:50%;top:0;transform:translateX(-50%);width:16%;height:40%;background:#b4b9bf;border-radius:0 0 10px 10px}`;
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ deviceScaleFactor: 2 });
  for (const f of fs.readdirSync(CAP).filter(x => x.endsWith('.png')).map(x => x.slice(0, -4))) {
    await p.setViewportSize({ width: 1500, height: 1000 });
    await p.setContent(`<style>${CSS}body{background:transparent;padding:30px 40px 60px}</style>${laptop(f, 1200)}`);
    await p.locator('.lp').screenshot({ path: `${OUT}/notebook-central-${f}.png`, omitBackground: true });
    console.log(f);
  }
  await p.setViewportSize({ width: 1920, height: 1080 });
  const comp = (t, s, f) => `<style>${CSS}
    body{width:1920px;height:1080px;overflow:hidden;background:radial-gradient(1200px 700px at 72% 55%,#2c333b 0%,#1C2126 62%);color:#fff;display:flex;align-items:center;padding:0 0 0 100px;gap:40px}
    .t{width:470px;flex:none}.k{font-size:22px;font-weight:800;letter-spacing:.2em;color:#F26B1D}
    h1{font-size:58px;line-height:1.05;letter-spacing:-.02em;margin:18px 0 22px}p{font-size:23px;line-height:1.5;color:#b3bcc5}</style>
    <div class="t"><div class="k">PORTA CENTRAL</div><h1>${t}</h1><p>${s}</p></div>${laptop(f, 1100)}`;
  const C = [
    ['composicion-central-flota', 'Toda la flota en una pantalla', 'Qué equipo está en línea, cuál está en terreno sin señal, si tiene los documentos al día y qué alertas hay.', '01-flota'],
    ['composicion-central-documentos', 'Subes un PDF y llega a cada vehículo', 'Se publica desde la oficina y PORTA lo descarga por 4G. Nunca hay que sacar el equipo del vehículo.', '02-documentos'],
    ['composicion-central-vehiculo', 'Dashcam, recorrido y checklists', 'Cámara frontal y de cabina, posición GPS y la actividad del día de cada vehículo.', '03-vehiculo'],
    ['composicion-central-alertas', 'Alertas que llegan solas', 'Un “no apto” por fatiga o un “no operar” llegan a la central apenas el vehículo tiene señal.', '04-alertas'],
  ];
  for (const [n, t, s, f] of C) { await p.setContent(comp(t, s, f)); await p.waitForTimeout(100); await p.screenshot({ path: `${OUT}/${n}.png` }); console.log(n); }
  await b.close();
})();
