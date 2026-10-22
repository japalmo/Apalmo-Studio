# Genera reel3.html a partir de reel2.html (que no se toca) con la estructura nueva:
#   clip IA de inicio -> golpe "Sin señal. Sin problema." -> escenas actuales (equipo ... la alerta llega sola) -> clip IA de cierre -> firma.
# Uso: python hacer_reel3.py
import pathlib, re
AQUI = pathlib.Path(__file__).parent
s = (AQUI / 'reel2.html').read_text(encoding='utf-8')


def rep(a, b, n=1):
    global s
    assert s.count(a) == n, (s.count(a), a[:70])
    s = s.replace(a, b)


rep('<title>PORTA · reel v2</title>', '<title>PORTA · reel v3</title>')
# fuentes locales (no dependen de que estén instaladas en el sistema)
F = '../demo/comun/fuentes/'
rep('*{margin:0;padding:0;box-sizing:border-box}', f"""@font-face{{font-family:Inter;src:url('{F}Inter-Regular.otf');font-weight:400}}
@font-face{{font-family:Inter;src:url('{F}Inter-Medium.otf');font-weight:500}}
@font-face{{font-family:Inter;src:url('{F}Inter-SemiBold.otf');font-weight:600}}
@font-face{{font-family:Inter;src:url('{F}Inter-Bold.otf');font-weight:700}}
@font-face{{font-family:Inter;src:url('{F}Inter-ExtraBold.otf');font-weight:800 900}}
@font-face{{font-family:"JetBrains Mono";src:url('{F}JetBrainsMono-Regular.ttf');font-weight:400}}
@font-face{{font-family:"JetBrains Mono";src:url('{F}JetBrainsMono-Bold.ttf');font-weight:700}}
*{{margin:0;padding:0;box-sizing:border-box}}""")
rep('.firma{font-family:"JetBrains Mono",monospace;font-size:28px;letter-spacing:.06em;color:#9aa4ad;font-weight:400}',
    '''.firma{font-family:"JetBrains Mono",monospace;font-size:28px;letter-spacing:.06em;color:#9aa4ad;font-weight:400}
/* pantallas reales sobre los teléfonos de los clips IA (se ajustan con esquinas por cuadro) */
.pant{position:absolute;left:0;top:0;width:600px;height:1300px;border-radius:70px;overflow:hidden;transform-origin:0 0;opacity:0;font-family:Inter,sans-serif;border:16px solid #0b0c0e;box-shadow:0 0 0 3px #2a2e33}
.fondo{position:absolute;inset:0;opacity:0;background:radial-gradient(900px 1100px at 50% 52%,#2b323a,#0b0d0f)}
.pant .sb{display:flex;justify-content:space-between;align-items:center;padding:44px 60px 0;font-size:40px;font-weight:700}
.pant .sb .bb{display:flex;align-items:flex-end;gap:7px;height:34px}.pant .sb .bb i{width:10px;border-radius:3px}
.spin{width:150px;height:150px;border-radius:50%;border:16px solid rgba(255,255,255,.15);border-top-color:#fff;margin:0 auto}''')
rep('const $ = id => document.getElementById(id);', 'const $ = id => document.getElementById(id);\nconst V = (t => t);   // (los tiempos de abajo son los de reel2; la estructura nueva los remapea al final)')
# las secuencias pueden venir de tomas3d/ (3D) o de clips/ (videos IA convertidos en cuadros)
rep("s.el.src = `tomas3d/${s.carpeta}/${String(f).padStart(4, '0')}.jpg`;",
    "s.el.src = `${s.carpeta.startsWith('clips/') ? '' : 'tomas3d/'}${s.carpeta}/${String(f).padStart(4, '0')}.jpg`;")
# capas nuevas antes de la etiqueta fija
CAPAS = '''<!-- v3 · clip IA de inicio -->
<div class="esc" id="eci" style="background:#000">
  <img class="full" id="sci" alt="">
  <div class="fondo" id="fondoA"></div>
  <div class="pant" id="pantA" style="background:#0f1114;color:#fff">
    <div class="sb"><span>9:41</span><span style="display:flex;align-items:center;gap:14px"><span style="font-size:30px;font-weight:600;color:#9aa4ad">Sin servicio</span>
      <span class="bb"><i style="height:9px;background:#555"></i><i style="height:16px;background:#555"></i><i style="height:23px;background:#555"></i><i style="height:30px;background:#555"></i></span></span></div>
    <div style="margin-top:330px"><div class="spin" id="spinA"></div></div>
    <div style="text-align:center;margin-top:70px;font-size:52px;font-weight:700">Cargando documentos…</div>
    <div style="text-align:center;margin-top:20px;font-size:36px;color:#ff5a4f;font-weight:600">Sin conexión a internet</div>
  </div>
</div>
<!-- v3 · golpe -->
<div class="esc" id="eg" style="background:#0d0f11">
  <div class="grid"></div>
  <div class="glow" style="width:760px;height:760px;left:160px;top:560px;opacity:.22"></div>
  <div class="t" style="top:640px;font-size:150px"><span class="w" id="g1">Sin señal.</span></div>
  <div class="t" style="top:810px;font-size:150px"><span class="w n" id="g2">Sin problema.</span></div>
  <div class="t" style="top:1070px;font-size:46px;font-weight:600;letter-spacing:-.01em;color:#c3cbd2" id="g3">PORTA crea su propia red Wi-Fi a bordo</div>
</div>
<!-- v3 · clip IA de cierre -->
<div class="esc" id="ecc" style="background:#000">
  <img class="full" id="scc" alt="">
  <div class="fondo" id="fondoB"></div>
  <div class="pant" id="pantB" style="background:#F5F3EE;color:#1C2126">
    <div class="sb"><span>9:41</span><span style="display:flex;align-items:center;gap:12px"><span style="font-size:30px;font-weight:700;color:#F26B1D">PORTA</span>
      <svg width="40" viewBox="0 0 24 24" fill="none" stroke="#1C2126" stroke-width="2.6" stroke-linecap="round"><path d="M5 9a10 10 0 0 1 14 0"/><path d="M8 12.5a5.5 5.5 0 0 1 8 0"/><circle cx="12" cy="17" r="1.7" fill="#1C2126" stroke="none"/></svg></span></div>
    <div style="display:flex;justify-content:center;margin-top:120px"><img src="../marca/porta-isotipo.png" style="height:150px;border-radius:36px"></div>
    <div style="text-align:center;margin-top:28px;font-size:40px;font-weight:600;color:#5b6570">Conectado a PORTA · CH-04</div>
    <div id="okB" style="width:260px;height:260px;border-radius:50%;background:#2fbf6a;margin:110px auto 0;display:grid;place-items:center;box-shadow:0 30px 60px rgba(47,191,106,.35)">
      <svg width="150" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.2 4.2L19 7"/></svg></div>
    <div style="text-align:center;margin-top:60px;font-size:58px;font-weight:800">Documentos al día</div>
  </div>
</div>
<div class="wipe" id="wipe2"></div>
'''
rep('<div class="tag" id="tag">', CAPAS + '<div class="tag" id="tag">')
# estructura nueva: va antes del seek que espera las imágenes
NUEVO = r'''
// ================= v3 · estructura nueva =================
// Los clips IA viven como cuadros JPG en clips/inicio y clips/cierre (los crea clips/preparar.py, que también escribe clips/clips.js).
const CL = window.CLIPS || { inicio: 300, cierre: 240 };
const A = CL.inicio / 30, C = CL.cierre / 30, P = 1.5;
const QUITAR = ['e1', 'e2', 'e5c', 'e5d', 'e6', 'e12'];   // de reel2: el clip y el golpe ya cuentan "sin señal"; el cierre muestra el retrovisor
QUITAR.forEach(id => $(id).style.display = 'none');
// tramos: [inicio, fin] en el tiempo de reel2 (los clips y el golpe usan tiempos virtuales 100+, 200+, 300+)
const TRAMOS = [[100, 100 + A], [200, 200 + P], [3.2, 14.6], [20.8, 33.4], [300, 300 + C], [37.0, 40.4]];
let acc = 0; const T0 = TRAMOS.map(([a, b]) => { const s0 = acc; acc += b - a; return s0; });
const NUEVO_TOTAL = acc; window.TOTAL = NUEVO_TOTAL;
const aVirtual = t => { for (let i = TRAMOS.length - 1; i >= 0; i--) if (t >= T0[i] || i === 0) return TRAMOS[i][0] + (t - T0[i]); };
window.TRAMOS = TRAMOS; window.T0 = T0; window.aVirtual = aVirtual;
// clip de inicio
scene('#eci', 100, 100 + A, .01, .01); seq('sci', 'clips/inicio', 100, CL.inicio);
// golpe (entra con un flash, sale con el barrido naranja de la escena 3)
scene('#eg', 200, 200 + P, .01, .01); flash(200, .6);
tw('#eg', 200, 200 + P, { s: [1.06, 1] }, 'out');
tw('#g1', 200.05, 200.3, { o: [0, 1], s: [1.6, 1], y: [30, 0] }, 'back');
tw('#g2', 200.4, 200.7, { o: [0, 1], s: [1.6, 1], y: [30, 0] }, 'back');
tw('#g3', 200.75, 201.1, { o: [0, 1], y: [50, 0] }, 'out');
// clip de cierre (entra con flash)
scene('#ecc', 300, 300 + C, .01, .01); seq('scc', 'clips/cierre', 300, CL.cierre); flash(300, .5);
// pantallas reales sobre los teléfonos: esquinas [sup-izq, sup-der, inf-der, inf-izq] en px del cuadro 1080x1920, por segundo del clip
const PANT = window.PANTALLAS || { pantA: [], pantB: [] };   // se completan al tener los clips (clips/clips.js)
function homografia(w, h, q) {   // matriz CSS matrix3d que lleva el rectángulo (0,0)-(w,h) a las 4 esquinas q
  const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = q;
  const dx1 = x1 - x2, dx2 = x3 - x2, dx3 = x0 - x1 + x2 - x3, dy1 = y1 - y2, dy2 = y3 - y2, dy3 = y0 - y1 + y2 - y3;
  const den = dx1 * dy2 - dx2 * dy1, g = (dx3 * dy2 - dx2 * dy3) / den, hh = (dx1 * dy3 - dx3 * dy1) / den;
  const a = x1 - x0 + g * x1, b = x3 - x0 + hh * x3, d = y1 - y0 + g * y1, e = y3 - y0 + hh * y3;
  return `matrix3d(${a / w},${d / w},0,${g / w},${b / h},${e / h},0,${hh / h},0,0,1,0,${x0},${y0},0,1)`;
}
// insertos: el teléfono con la pantalla real a pantalla completa (por defecto, en vez de pegarla sobre el clip)
const INS = window.INSERTOS || { pantA: [4.5, 6.0], pantB: [1.5, 3.0] };
function pantallas(id, t) {   // t = segundos dentro del clip
  const el = $(id), fondo = $(id === 'pantA' ? 'fondoA' : 'fondoB'), K = PANT[id] || [], I = INS[id];
  if (I && t >= I[0] && t < I[1]) {
    const k = (t - I[0]) / (I[1] - I[0]), e = Math.min(1, (t - I[0]) / .12), z = 1 + .06 * k, cx = 540, cy = 980;
    const q = [[250, 330], [830, 300], [850, 1630], [230, 1650]].map(([x, y]) => [cx + (x - cx) * z, cy + (y - cy) * z]);
    fondo.style.opacity = 1; el.style.opacity = e; el.style.transform = homografia(600, 1300, q); return;
  }
  fondo.style.opacity = 0;
  if (!K.length || t < K[0][0] || t > K[K.length - 1][0]) { el.style.opacity = 0; return; }
  let i = 0; while (i < K.length - 2 && t > K[i + 1][0]) i++;
  const [ta, qa, oa = 1] = K[i], [tb, qb, ob = 1] = K[Math.min(i + 1, K.length - 1)], k = tb > ta ? (t - ta) / (tb - ta) : 0;
  const q = qa.map((p, j) => [p[0] + (qb[j][0] - p[0]) * k, p[1] + (qb[j][1] - p[1]) * k]);
  el.style.opacity = oa + (ob - oa) * k; el.style.transform = homografia(600, 1300, q);
}
// barrido propio para las uniones de la estructura nueva (en tiempo real del reel)
const UNIONES = [];
function post(t) {
  pantallas('pantA', aVirtual(t) - 100); pantallas('pantB', aVirtual(t) - 300);
  $('spinA').style.transform = `rotate(${t * 400}deg)`;
  const ok = aVirtual(t) - 300; $('okB').style.transform = `scale(${ok < 0 ? 0 : Math.min(1, ok * 3)})`;
  $('prog').style.width = (t / NUEVO_TOTAL * 100) + '%';
  const tg = t < .5 ? 0 : t < .8 ? (t - .5) / .3 : t < T0[5] - .2 ? 1 : 0; $('tag').style.opacity = tg; $('tag').style.visibility = tg > 0 ? 'visible' : 'hidden'; $('tag').style.transform = '';
  let wy = 2400; for (const u of UNIONES) { const k = (t - (u - .22)) / .44; if (k >= 0 && k <= 1) wy = 2300 - 4800 * (k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2); }
  $('wipe2').style.transform = `translate(0px,${wy}px) rotate(-12deg)`;
}
'''
rep("// seek que espera a que las imágenes 3D estén listas", NUEVO + "\n// seek que espera a que las imágenes 3D estén listas")
rep("window.seek = t => { pend = []; seek0(t); return Promise.all(pend); };",
    "window.seek = t => { pend = []; seek0(aVirtual(t)); post(t); return Promise.all(pend); };")
rep('<script src="engine.js"></script>', '<script src="clips/clips.js"></script>\n<script src="engine.js"></script>')
(AQUI / 'reel3.html').write_text(s, encoding='utf-8')
print('ok reel3.html')
