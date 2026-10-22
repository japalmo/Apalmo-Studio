// Logo PORTA en vector: la "P" del isotipo y la del logotipo son exactamente la misma geometría.
// Uso: node logo.js  → genera SVG y PNG transparentes en esta carpeta.
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs');

const C = { tinta: '#13212A', naranjo: '#FF6B00', blanco: '#FFFFFF' };
const H = 760;            // altura de las mayúsculas (sistema de coordenadas de la P)
const S = 175;            // grosor de trazo

// ---- P (coordenadas trazadas del isotipo original; caja 35..790 × 45..805) ----
// parte superior (barra + panza), pasa por debajo del brazo naranjo
const pArriba = 'M60,45 H563 A227.5,227.5 0 0 1 563,500 H262 C285,400 430,322 560,320 H575 A50,50 0 0 0 575,220 H60 Q35,220 35,195 V70 Q35,45 60,45 Z';
// asta + brazo diagonal (naranjo)
const pAsta = 'M320,320 H570 C450,330 300,420 268,500 Q262,506 262,525 V785 Q262,805 242,805 H65 Q45,805 45,785 V470 Q45,432 82,417 L300,325 Q310,320 320,320 Z';
const P = (arriba, asta, dx = 0) => `<g transform="translate(${dx - 35},${-45})"><path d="${pArriba}" fill="${arriba}"/><path d="${pAsta}" fill="${asta}"/></g>`;
const ANCHO_P = 755;

// ---- O R T A, con el mismo grosor y radios de la P ----
const r = 20;
function O(dx) { const w = 900; return `<path fill-rule="evenodd" d="M${dx + H / 2},0 H${dx + w - H / 2} A${H / 2},${H / 2} 0 0 1 ${dx + w - H / 2},${H} H${dx + H / 2} A${H / 2},${H / 2} 0 0 1 ${dx + H / 2},0 Z
  M${dx + H / 2},${S} A${H / 2 - S},${H / 2 - S} 0 0 0 ${dx + H / 2},${H - S} H${dx + w - H / 2} A${H / 2 - S},${H / 2 - S} 0 0 0 ${dx + w - H / 2},${S} Z"/>`; }
function R(dx) {
  // misma panza que la P (altura 455) con asta completa y pierna diagonal
  const bowl = `M${dx + r},0 H${dx + 528} A227.5,227.5 0 0 1 ${dx + 528},455 H${dx + S} V${H - r} Q${dx + S},${H} ${dx + S - r},${H} H${dx + r} Q${dx},${H} ${dx},${H - r} V${r} Q${dx},0 ${dx + r},0 Z
    M${dx + S},${S} V${455 - S} H${dx + 528} A52.5,52.5 0 0 0 ${dx + 528},${S} Z`;
  const pierna = `M${dx + 400},430 H${dx + 600} L${dx + 845},${H - 14} Q${dx + 852},${H} ${dx + 836},${H} H${dx + 652} Q${dx + 640},${H} ${dx + 634},${H - 10} Z`;
  return `<path fill-rule="evenodd" d="${bowl}"/><path d="${pierna}"/>`;
}
function T(dx) { const w = 760; return `<path d="M${dx + r},0 H${dx + w - r} Q${dx + w},0 ${dx + w},${r} V${S - r} Q${dx + w},${S} ${dx + w - r},${S} H${dx + w / 2 + S / 2} V${H - r} Q${dx + w / 2 + S / 2},${H} ${dx + w / 2 + S / 2 - r},${H} H${dx + w / 2 - S / 2 + r} Q${dx + w / 2 - S / 2},${H} ${dx + w / 2 - S / 2},${H - r} V${S} H${dx + r} Q${dx},${S} ${dx},${S - r} V${r} Q${dx},0 ${dx + r},0 Z"/>`; }
function A(dx) {
  // Λ sin barra (como el original), vértice redondeado
  const w = 980, b = 200;
  return `<path d="M${dx + w / 2 - 70},0 H${dx + w / 2 + 70} Q${dx + w / 2 + 100},0 ${dx + w / 2 + 112},22 L${dx + w - 4},${H - 26} Q${dx + w + 6},${H} ${dx + w - 24},${H} H${dx + w - b + 10} Q${dx + w - b - 8},${H} ${dx + w - b - 16},${H - 18} L${dx + w / 2},${235} L${dx + b + 16},${H - 18} Q${dx + b + 8},${H} ${dx + b - 10},${H} H${dx + 24} Q${dx - 6},${H} ${dx + 4},${H - 26} L${dx + w / 2 - 112},22 Q${dx + w / 2 - 100},0 ${dx + w / 2 - 70},0 Z"/>`;
}
const GAP = 95;
function palabra(tinta, naranjo) {
  let x = 0; const parts = [];
  parts.push(P(tinta, naranjo, x)); x += ANCHO_P + GAP;
  parts.push(`<g fill="${tinta}">${O(x)}`); x += 900 + GAP;
  parts.push(R(x)); x += 852 + GAP;
  parts.push(T(x)); x += 760 + GAP - 40;
  parts.push(A(x) + '</g>'); x += 980;
  return { svg: parts.join(''), w: x };
}
function isotipo(fondo, arriba, asta) {
  const L = 1100, pad = (L - ANCHO_P) / 2, top = (L - H) / 2;
  return `<rect width="${L}" height="${L}" rx="250" fill="${fondo}"/><g transform="translate(${pad},${top})">${P(arriba, asta)}</g>`;
}
const svg = (w, h, body, m = 0) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-m} ${-m} ${w + 2 * m} ${h + 2 * m}" width="${w + 2 * m}" height="${h + 2 * m}">${body}</svg>`;

const piezas = {};
const pal = palabra(C.tinta, C.naranjo), palB = palabra(C.blanco, C.naranjo);
piezas['porta-logotipo'] = svg(pal.w, H, pal.svg, 40);
piezas['porta-logotipo-blanco'] = svg(pal.w, H, palB.svg, 40);
piezas['porta-isotipo'] = svg(1100, 1100, isotipo(C.tinta, C.blanco, C.naranjo));
piezas['porta-isotipo-naranjo'] = svg(1100, 1100, isotipo(C.naranjo, C.blanco, C.tinta));
piezas['porta-p-sola'] = svg(ANCHO_P, H, P(C.tinta, C.naranjo), 20);
// horizontal: isotipo + logotipo
const esc = H / 1100 * 1.25, iso = 1100 * esc;
piezas['porta-horizontal'] = svg(iso + 160 + pal.w, iso, `<g transform="scale(${esc})">${isotipo(C.tinta, C.blanco, C.naranjo)}</g><g transform="translate(${iso + 160},${(iso - H) / 2})">${pal.svg}</g>`, 40);
piezas['porta-horizontal-blanco'] = svg(iso + 160 + pal.w, iso, `<g transform="scale(${esc})">${isotipo(C.naranjo, C.blanco, C.tinta)}</g><g transform="translate(${iso + 160},${(iso - H) / 2})">${palB.svg}</g>`, 40);

(async () => {
  for (const [n, s] of Object.entries(piezas)) fs.writeFileSync(`${n}.svg`, s);
  const b = await chromium.launch(); const p = await b.newPage();
  for (const n of Object.keys(piezas)) {
    await p.setContent(`<style>*{margin:0}body{background:transparent}</style><img id="i" src="data:image/svg+xml;base64,${Buffer.from(piezas[n]).toString('base64')}" style="height:${n.includes('isotipo') ? 1024 : 600}px">`);
    await p.waitForTimeout(80);
    await p.locator('#i').screenshot({ path: `${n}.png`, omitBackground: true });
    console.log(n);
  }
  await b.close();
})();
