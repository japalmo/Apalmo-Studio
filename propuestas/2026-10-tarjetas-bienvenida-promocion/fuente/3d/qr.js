// Genera qr.json con las matrices de los QR de referencia (URLs de ejemplo; se cambian por las reales al producir).
const QR = require('qrcode'), fs = require('fs');
const urls = { ficha: 'https://apalmo.com/d/ficha', vitrina: 'https://apalmo.com/d/arrienda', llavero: 'https://apalmo.com/d/llave' };
const out = {};
for (const [k, u] of Object.entries(urls)) {
  const q = QR.create(u, { errorCorrectionLevel: 'M' });
  out[k] = { size: q.modules.size, data: Array.from(q.modules.data) };
}
fs.writeFileSync(__dirname + '/qr.json', JSON.stringify(out));
console.log(Object.fromEntries(Object.entries(out).map(([k, v]) => [k, v.size])));
