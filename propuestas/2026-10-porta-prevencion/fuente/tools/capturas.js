// Captura las pantallas de la app PORTA (390x844 @3x) para mockups y video.
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const path = require('path');
const APP = 'file://' + path.resolve(__dirname, '../app/index.html');
const OUT = path.resolve(__dirname, '../capturas');
require('fs').mkdirSync(OUT, { recursive: true });
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3 });
  await p.clock.setFixedTime(new Date('2026-10-22T07:41:00'));
  p.on('pageerror', e => console.error('PAGEERROR', e.message));
  const shot = async (hash, name, prep) => {
    await p.goto(APP + hash); await p.waitForTimeout(150);
    if (prep) { await p.evaluate(prep); await p.waitForTimeout(150); }
    await p.screenshot({ path: `${OUT}/${name}.png` });
    console.log(name);
  };
  await shot('#/bienvenida', '01-bienvenida');
  await shot('#/', '02-menu');
  await shot('#/docs', '03-biblioteca');
  await shot('#/doc/pts-conduccion', '04-documento');
  await shot('#/check/vehiculo', '05-checklist-vehiculo', () => {
    PORTA.S.nombre = 'Juan Pérez'; PORTA.S.resp.vehiculo = { 0: 'si', 1: 'si', 2: 'si', 3: 'si', 4: 'si' }; PORTA.render();
  });
  await shot('#/check/fatiga', '06-checklist-fatiga', () => {
    PORTA.S.nombre = 'Juan Pérez'; PORTA.S.resp.fatiga = { horas: '5', escala: 3, alcohol: 'no' }; PORTA.render();
  });
  await shot('#/check/generador', '07-checklist-generador', () => {
    PORTA.S.nombre = 'Juan Pérez'; PORTA.S.resp.generador = { 0: 'si', 1: 'si', 2: 'si' }; PORTA.render();
  });
  // resultados
  await p.goto(APP + '#/'); await p.waitForTimeout(100);
  await p.evaluate(() => { PORTA.S.nombre = 'Juan Pérez'; PORTA.S.resp.fatiga = { horas: '<5', escala: 4, alcohol: 'no', jornada: 'si', sintomas: 'si' }; enviar('fatiga'); });
  await p.waitForTimeout(150); await p.screenshot({ path: `${OUT}/08-resultado-fatiga.png` }); console.log('08');
  await p.evaluate(() => { PORTA.S.resp.vehiculo = Object.fromEntries([...Array(10)].map((_, i) => [i, 'si'])); enviar('vehiculo'); });
  await p.waitForTimeout(150); await p.screenshot({ path: `${OUT}/09-resultado-vehiculo.png` }); console.log('09');
  await p.goto(APP + '#/registros'); await p.waitForTimeout(100);
  await p.evaluate(() => { PORTA.S.registros.push({ id: 'generador', quien: 'Juan Pérez', hora: 'Hoy 08:20', res: 'Observado', estado: 'alerta' }); PORTA.render(); });
  await p.waitForTimeout(100); await p.screenshot({ path: `${OUT}/10-registros.png` }); console.log('10');
  await b.close();
})();
