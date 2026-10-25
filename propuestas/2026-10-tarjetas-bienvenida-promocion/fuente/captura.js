// Captura la maqueta de la vitrina (`node captura.js`) y genera el PDF de la cotización (`node captura.js pdf`).
const { chromium } = require('playwright'); const path = require('path');
(async () => {
  const b = await chromium.launch();
  if (process.argv[2] === 'pdf') {
    const p = await b.newPage();
    await p.goto('file://' + path.resolve(__dirname, '../cotizacion.html')); await p.waitForLoadState('networkidle');
    await p.evaluate(() => document.fonts.ready);
    await p.pdf({ path: path.resolve(__dirname, '../Cotizacion-Tarjetas-bienvenida-promocion-y-llaveros-AP-2026-005-R1.pdf'), format: 'Letter', printBackground: true, preferCSSPageSize: true });
  } else {
    const p = await b.newPage({ viewport: { width: 308, height: 600 }, deviceScaleFactor: 2 });
    await p.goto('file://' + path.resolve(__dirname, 'vitrina-telefono.html')); await p.waitForLoadState('networkidle');
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.resolve(__dirname, '../imagenes/vitrina-telefono.png'), omitBackground: true });
  }
  await b.close();
})();
