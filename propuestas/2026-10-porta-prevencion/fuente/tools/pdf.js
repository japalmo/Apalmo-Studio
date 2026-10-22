// Genera el PDF de la propuesta y miniaturas de cada página para revisión.
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto('file://' + path.resolve(__dirname, '../pdf/propuesta.html'), { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.pdf({ path: path.resolve(__dirname, '../../PORTA-propuesta.pdf'), format: 'A4', printBackground: true, preferCSSPageSize: true });
  if (process.argv[2] === 'prev') {
    await p.setViewportSize({ width: 794, height: 1123 });
    const n = await p.locator('.pg').count();
    for (let i = 0; i < n; i++) await p.locator('.pg').nth(i).screenshot({ path: `/tmp/claude-0/-home-user-Apalmo-Studio/47611e4c-8ff3-5f73-85aa-b76bc7b75285/scratchpad/pg${i + 1}.png` });
  }
  await b.close();
})();
