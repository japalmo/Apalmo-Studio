// Captura las pantallas de PORTA Central (1440x900 @2x).
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const path = require('path');
const APP = 'file://' + path.resolve(__dirname, '../central/index.html');
const OUT = path.resolve(__dirname, '../capturas-central');
require('fs').mkdirSync(OUT, { recursive: true });
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  p.on('pageerror', e => console.error('PAGEERROR', e.message));
  for (const [h, n] of [['#/', '01-flota'], ['#/documentos', '02-documentos'], ['#/vehiculo/CH-04', '03-vehiculo'], ['#/alertas', '04-alertas']]) {
    await p.goto(APP + h); await p.waitForTimeout(250);
    await p.screenshot({ path: `${OUT}/${n}.png` }); console.log(n);
  }
  await b.close();
})();
