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
.spin{width:150px;height:150px;border-radius:50%;border:16px solid rgba(255,255,255,.15);border-top-color:#fff;margin:0 auto}
/* v3c: semáforo de los checklists */
.sema{position:absolute;left:492px;top:640px;width:556px;padding:22px 24px;border-radius:46px;background:#15181c;border:2px solid rgba(255,255,255,.1);box-shadow:0 50px 90px -20px rgba(0,0,0,.8)}
.luz{display:flex;align-items:center;gap:24px;height:282px}
.luz+.luz{border-top:1.5px solid rgba(255,255,255,.07)}
.luz i{width:150px;height:150px;border-radius:50%;flex:none;background:var(--dim);box-shadow:inset 0 8px 18px rgba(0,0,0,.55)}
.luz.on i{background:radial-gradient(circle at 38% 34%,#fff8 0,var(--c) 38%,var(--c) 100%);box-shadow:0 0 70px 14px var(--gl),inset 0 -10px 18px rgba(0,0,0,.25)}
.luz b{display:block;font-size:42px;font-weight:800;line-height:1.02;letter-spacing:-.01em;color:#4a525b}
.luz.on b{color:var(--c)}
.luz small{display:block;font-size:24px;font-weight:600;color:#4a525b;margin-top:10px}
.luz.on small{color:#c3cbd2}
/* v3b: subtítulos del inicio y escena de PORTA Central */
#s5c{text-align:center}
.subi{position:absolute;left:70px;right:70px;top:1330px;text-align:center;font-size:54px;font-weight:700;line-height:1.15;letter-spacing:-.01em;color:#fff;text-shadow:0 3px 18px rgba(0,0,0,.85),0 0 4px rgba(0,0,0,.9);opacity:0}
.chipi{position:absolute;top:150px;left:0;right:0;margin:0 auto;width:fit-content;padding:14px 26px;border-radius:99px;background:rgba(13,15,17,.72);border:1.5px solid rgba(255,122,46,.6);font-size:30px;font-weight:700;opacity:0}
.win{position:absolute;left:50px;top:520px;width:980px;height:930px;border-radius:30px;overflow:hidden;background:#F5F3EE;color:#1C2126;box-shadow:0 60px 110px -20px rgba(0,0,0,.8)}
.wbar{display:flex;align-items:center;gap:14px;height:92px;padding:0 30px;background:#1C2126;color:#fff;font-size:30px}
.fila{position:relative;display:flex;align-items:center;gap:20px;height:104px;padding:0 22px;margin-bottom:12px;border-radius:18px;background:#fff;border:1.5px solid #E4E1DA;font-size:30px}
.fila b{font-weight:700}.fila .st{margin-left:auto;padding:8px 18px;border-radius:99px;font-size:23px;font-weight:700;white-space:nowrap}
.fila .st.ok{background:#E3F4EA;color:#2E9E5B}.fila .st.al{background:#FFF4D6;color:#C98F00}
#rtB{position:absolute;right:22px}
.pdf{display:grid;place-items:center;width:58px;height:66px;border-radius:10px;background:#FDE9DC;color:#F26B1D;font-style:normal;font-size:17px;font-weight:800;flex:none}
.barra{position:absolute;left:100px;right:22px;bottom:12px;height:8px;border-radius:8px;background:#E4E1DA;overflow:hidden;opacity:0}.barra i{display:block;height:100%;width:0;background:#F26B1D}
.wpie{position:absolute;left:40px;right:40px;bottom:36px;display:flex;align-items:center;gap:16px;font-size:28px;font-weight:700;color:#5b6570;opacity:0}
.spin2{width:34px;height:34px;border-radius:50%;border:5px solid #E4E1DA;border-top-color:#F26B1D}
.arch{position:absolute;left:0;top:0;display:flex;align-items:center;gap:16px;padding:16px 26px 16px 16px;border-radius:18px;background:#fff;color:#1C2126;font-size:28px;font-weight:700;box-shadow:0 30px 60px rgba(0,0,0,.5);opacity:0}
.dev{position:absolute;left:250px;top:1560px;width:580px;display:flex;align-items:center;gap:20px;padding:20px 26px;border-radius:24px;background:#1f2429;border:1.5px solid rgba(255,255,255,.12);font-size:32px;opacity:0}
.dev small{display:block;font-size:24px;color:#9aa4ad;font-weight:500;margin-top:4px}.dev .g4{margin-left:auto;padding:6px 14px;border-radius:10px;background:#2a3138;color:#9aa4ad;font-weight:800;font-size:24px}
.pk2{position:absolute;left:527px;top:1440px;width:24px;height:24px;border-radius:50%;background:#FF7A2E;box-shadow:0 0 20px 4px rgba(255,122,46,.6);opacity:0}''')
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
  <div class="chipi" id="ctx">Control vehicular · camino minero</div>
  <div class="subi" id="s1">—Los documentos del vehículo, por favor.</div>
  <div class="subi" id="s2">—Es que… no tengo señal.</div>
  <div class="subi" id="s3">Sin señal, no hay cómo mostrar los documentos.</div>
  <div class="t sombra" style="top:1180px;font-size:118px" id="aer"><span class="w" id="aer1">¿En faena</span><br><span class="w n" id="aer2">no hay señal?</span></div>
</div>
<!-- v3c · checklists con semáforo formal -->
<div class="esc" id="e9s" style="background:radial-gradient(900px 900px at 50% 60%,#2b323a,#0d0f11)">
  <div class="t" style="top:190px;font-size:112px"><span class="w" id="k1">Checklists</span><br><span class="w n" id="k2">sin señal.</span></div>
  <div class="t" style="top:445px;font-size:42px;font-weight:600;letter-spacing:-.01em;color:#c3cbd2" id="k3">con resultado al instante</div>
  <img class="tel" id="kt" src="../imagenes/mockups/telefono-05-checklist-vehiculo.png" style="width:430px;left:38px;top:600px">
  <div class="sema" id="sema">
    <div class="luz" id="lv" style="--c:#3ce07f;--dim:#1b3024;--gl:rgba(60,224,127,.5)"><i></i><div><b>APTO</b><small>Pre-uso · Camioneta CH-04</small></div></div>
    <div class="luz" id="la" style="--c:#F5B83D;--dim:#362d17;--gl:rgba(245,184,61,.5)"><i></i><div><b style="font-size:33px">APTO CON<br>OBSERVACIONES</b><small>Generador GEN-07 · 1 observación</small></div></div>
    <div class="luz" id="lr" style="--c:#ff5a4f;--dim:#3a1f1e;--gl:rgba(255,90,79,.5)"><i></i><div><b>NO APTO</b><small>Fatiga y somnolencia</small></div></div>
  </div>
</div>
<!-- v3b · PORTA Central: ficha del vehículo, carga de datos y envío por 4G -->
<div class="esc" id="ecen" style="background:#14181c">
  <div class="grid"></div>
  <div class="t" style="top:200px;font-size:96px"><span class="w" id="c1">Desde PORTA Central</span><br><span class="w n" id="c2">cargas los datos.</span></div>
  <div class="win" id="win">
    <div class="wbar"><img src="../marca/porta-isotipo.png" style="height:44px;border-radius:11px"><b>PORTA</b><span style="color:#8b949c">Central</span>
      <span style="margin-left:auto;color:#8b949c;font-size:24px">Flota / <b style="color:#fff">CH-04</b></span></div>
    <div style="padding:36px 40px 0">
      <div style="font-size:50px;font-weight:800;letter-spacing:-.02em">CH-04 · Camioneta 4x4</div>
      <div style="font-size:25px;color:#6B7580;margin-top:6px">KT-KD-41 · Quebrada Alta · Conductor Juan Pérez</div>
      <div style="font-size:21px;font-weight:700;letter-spacing:.16em;color:#6B7580;margin:36px 0 10px">DOCUMENTOS DEL VEHÍCULO</div>
      <div class="fila"><i class="pdf">PDF</i><b>Permiso de circulación</b><span class="st ok">Vigente · mar 2027</span></div>
      <div class="fila"><i class="pdf">PDF</i><b>SOAP</b><span class="st ok">Vigente · mar 2027</span></div>
      <div class="fila" id="frt"><i class="pdf">PDF</i><b>Revisión técnica</b><span class="st al" id="rtA">Vence en 3 días</span><span class="st ok" id="rtB">Vigente · oct 2027 · hoy</span>
        <div class="barra"><i id="rtBar"></i></div></div>
      <div class="fila"><i class="pdf">PDF</i><b>Mantención 20.000 km</b><span class="st ok">Al día</span></div>
    </div>
    <div class="wpie" id="pieA"><span class="spin2" id="spin2"></span>Enviando a PORTA CH-04 por 4G…</div>
    <div class="wpie" id="pieB" style="color:#2E9E5B"><b style="font-size:30px">✓</b>Sincronizado con el equipo · hace un momento</div>
  </div>
  <div class="arch" id="arch"><i class="pdf" style="background:#D64541">PDF</i>revision-tecnica-2027.pdf</div>
  <svg id="cursor2" width="54" height="54" viewBox="0 0 24 24" style="position:absolute;left:0;top:0;filter:drop-shadow(0 4px 8px rgba(0,0,0,.6))"><path d="M4 2l14 9-6.5 1.5L9 19z" fill="#fff" stroke="#1C2126" stroke-width="1.3"/></svg>
  <div class="dev" id="dev"><img src="../marca/porta-isotipo.png" style="height:56px;border-radius:14px"><div><b>PORTA · CH-04</b><small id="devs">esperando datos…</small></div><span class="g4" id="g4">4G</span></div>
  <div class="pk2" id="q1"></div><div class="pk2" id="q2"></div><div class="pk2" id="q3"></div>
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
    <div style="text-align:center;margin-top:24px;font-size:40px;font-weight:700">CH-04 · Camioneta 4x4</div>
    <div style="text-align:center;margin-top:6px;font-size:30px;font-weight:500;color:#5b6570">conectado sin señal</div>
    <div id="okB" style="width:230px;height:230px;border-radius:50%;background:#2fbf6a;margin:70px auto 0;display:grid;place-items:center;box-shadow:0 30px 60px rgba(47,191,106,.35)">
      <svg width="150" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.2 4.2L19 7"/></svg></div>
    <div style="text-align:center;margin-top:50px;font-size:58px;font-weight:800">Documentos al día</div>
    <div style="margin:40px 50px 0;padding:22px 26px;border-radius:24px;background:#E3F4EA;color:#2E9E5B;font-size:30px;font-weight:700;line-height:1.3">Revisión técnica<br><span style="font-weight:500;color:#1C2126">vigente · actualizada hoy</span></div>
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
const QUITAR = ['e1', 'e2', 'e5b', 'e5d', 'e6', 'e9', 'e10', 'e11', 'e12'];   // e9 (checklists de reel2) lo reemplaza la escena con semáforo
const CHK = 4.8;   // largo de la narración de los checklists   // fuera: gancho y procedimientos (los cuenta el clip), 0 apps (va en NFC), 38 h y dashcam, retrovisor (lo muestra el cierre), alerta (la reemplaza PORTA Central)
const CEN = 6.7;   // largo de la narración de PORTA Central
QUITAR.forEach(id => $(id).style.display = 'none');
// tramos: [inicio, fin] en el tiempo de reel2 (los clips y el golpe usan tiempos virtuales 100+, 200+, 300+)
const TRAMOS = [[100, 100 + A], [200, 200 + P], [3.2, 12.6], [14.6, 16.6], [20.8, 25.6], [500, 500 + CHK], [400, 400 + CEN], [300, 300 + C], [37.0, 40.4]];
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
// subtítulos del inicio: que se entienda el problema (también sin audio)
const subi = (id, a, b) => { tw('#' + id, 100 + a, 100 + a + .18, { o: [0, 1], y: [24, 0] }, 'out'); tw('#' + id, 100 + b - .15, 100 + b, { o: [1, 0] }, 'io'); };
subi('ctx', .2, 1.25); subi('s1', 1.35, 2.35); subi('s2', 5.45, 6.68); subi('s3', 6.8, 8.38);
tw('#aer1', 108.5, 108.8, { o: [0, 1], s: [1.5, 1], y: [30, 0] }, 'back'); tw('#aer2', 108.85, 109.15, { o: [0, 1], s: [1.5, 1], y: [30, 0] }, 'back');
tw('#aer', 100 + A - .12, 100 + A, { o: [1, 0] }, 'io');
// checklists con semáforo: Apto / Apto con observaciones / No apto (entra con latigazo, como en reel2)
const K0 = 500;
scene('#e9s', K0, K0 + CHK, .01, .04); tw('#e9s', K0, K0 + .28, { x: [1080, 0], b: [18, 0] }, 'out');
pop('k1', K0 + .1); pop('k2', K0 + .3); sube('k3', K0 + .5);
tw('#kt', K0 + .15, K0 + .55, { o: [0, 1], y: [900, 0], r: [-12, -4] }, 'out');
tw('#sema', K0 + .35, K0 + .75, { o: [0, 1], x: [320, 0] }, 'out');
[['lv', 2.09], ['la', 2.69], ['lr', 3.95]].forEach(([id, d]) => { tw('#' + id + ' i', K0, K0, { s: [1, 1] }); tw('#' + id + ' i', K0 + d, K0 + d + .3, { s: [1.3, 1] }, 'back'); });
flash(K0 + 3.95, .22);
tick(t => { [['lv', 2.09], ['la', 2.69], ['lr', 3.95]].forEach(([id, d]) => $(id).classList.toggle('on', t >= K0 + d)); });
// PORTA Central: entra a la ficha del vehículo, sube la revisión técnica y la envía al equipo por 4G
const C0 = 400;
scene('#ecen', C0, C0 + CEN, .01, .01); flash(C0, .45);
tw('#c1', C0 + .05, C0 + .35, { o: [0, 1], s: [1.4, 1], y: [30, 0] }, 'back'); tw('#c2', C0 + .3, C0 + .6, { o: [0, 1], s: [1.4, 1], y: [30, 0] }, 'back');
tw('#win', C0 + .2, C0 + .65, { o: [0, 1], y: [600, 0], r: [4, 0] }, 'out');
tw('#arch', C0 + 1.0, C0 + 1.25, { o: [0, 1], x: [700, 700], y: [1500, 1500] }, 'out');
tw('#arch', C0 + 1.3, C0 + 1.85, { x: [700, 420], y: [1500, 1055] }, 'io'); tw('#arch', C0 + 1.85, C0 + 2.0, { o: [1, 0], s: [1, .7] }, 'in');
tw('#cursor2', C0 + 1.0, C0 + 1.2, { o: [0, 1], x: [930, 930], y: [1540, 1540] }, 'out');
tw('#cursor2', C0 + 1.3, C0 + 1.85, { x: [930, 650], y: [1540, 1095] }, 'io'); tw('#cursor2', C0 + 2.1, C0 + 2.3, { o: [1, 0] }, 'io');
tw('#frt', C0 + 1.75, C0 + 1.85, { s: [1, 1.04] }, 'out'); tw('#frt', C0 + 1.85, C0 + 2.05, { s: [1.04, 1] }, 'back');
tw('.barra', C0 + 1.9, C0 + 2.0, { o: [0, 1] }, 'lin'); tw('.barra', C0 + 2.6, C0 + 2.75, { o: [1, 0] }, 'lin');
tw('#rtA', C0 + 2.6, C0 + 2.7, { o: [1, 0] }, 'lin'); tw('#rtB', C0 + 2.65, C0 + 2.95, { o: [0, 1], s: [1.4, 1] }, 'back');
tw('#pieA', C0 + 3.9, C0 + 4.05, { o: [0, 1] }, 'lin'); tw('#pieA', C0 + 4.95, C0 + 5.05, { o: [1, 0] }, 'lin');
tw('#pieB', C0 + 5.05, C0 + 5.25, { o: [0, 1], y: [16, 0] }, 'out');
tw('#dev', C0 + 3.7, C0 + 4.0, { o: [0, 1], y: [80, 0] }, 'out');
['q1', 'q2', 'q3'].forEach((id, i) => { const t = C0 + 4.1 + i * .22; tw('#' + id, C0, C0, { o: [0, 0] }); tw('#' + id, t, t + .5, { o: [1, 1], y: [0, 150] }, 'in'); tw('#' + id, t + .5, t + .55, { o: [1, 0] }, 'lin'); });
tw('#dev', C0 + 4.95, C0 + 5.05, { s: [1, 1.08] }, 'out'); tw('#dev', C0 + 5.05, C0 + 5.3, { s: [1.08, 1] }, 'back');
tick(t => { const k = Math.min(1, Math.max(0, (t - C0 - 1.95) / .65)); $('rtBar').style.width = (k * 100) + '%';
  $('spin2').style.transform = `rotate(${t * 500}deg)`; const ok = t >= C0 + 5.05;
  $('devs').textContent = ok ? 'datos al día ✓' : (t >= C0 + 3.95 ? 'recibiendo por 4G…' : 'esperando datos…'); $('devs').style.color = ok ? '#3ce07f' : '#9aa4ad';
  $('g4').style.background = t >= C0 + 3.9 ? '#1f3a2b' : '#2a3138'; $('g4').style.color = t >= C0 + 3.9 ? '#3ce07f' : '#9aa4ad'; });
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
const INS = window.INSERTOS || { pantA: [4.04, 5.375], pantB: [1.25, 2.6] };
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
  const ok = aVirtual(t) - 300 - (INS.pantB ? INS.pantB[0] : 0) - .15; $('okB').style.transform = `scale(${ok < 0 ? 0 : Math.min(1, ok * 4)})`;
  $('prog').style.width = (t / NUEVO_TOTAL * 100) + '%';
  const tg = t < .5 ? 0 : t < .8 ? (t - .5) / .3 : t < T0[T0.length - 1] - .2 ? 1 : 0; $('tag').style.opacity = tg; $('tag').style.visibility = tg > 0 ? 'visible' : 'hidden'; $('tag').style.transform = '';
  let wy = 2400; for (const u of UNIONES) { const k = (t - (u - .22)) / .44; if (k >= 0 && k <= 1) wy = 2300 - 4800 * (k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2); }
  $('wipe2').style.transform = `translate(0px,${wy}px) rotate(-12deg)`;
}
'''
rep("// seek que espera a que las imágenes 3D estén listas", NUEVO + "\n// seek que espera a que las imágenes 3D estén listas")
rep("window.seek = t => { pend = []; seek0(t); return Promise.all(pend); };",
    "window.seek = t => { pend = []; seek0(aVirtual(t)); post(t); return Promise.all(pend); };")
rep('<script src="engine.js"></script>', '<script src="clips/clips.js"></script>\n<script src="engine.js"></script>')
# --- v3b: sin dashcam, cómputo y memoria a bordo
rep('computador <span class="n">+</span> dashcam', 'computador <span class="n">+</span> memoria a bordo')
rep('<div>2 cámaras<small>ruta + cabina (IR)</small></div>', '<div>128 GB a bordo<small>documentos y registros</small></div>')
rep('acerca el celular y listo', 'se abre en el navegador, sin apps')
rep('PORTA crea su propia red Wi-Fi</span>', 'procesa y guarda todo a bordo,<br>con su propia red Wi-Fi</span>')
(AQUI / 'reel3.html').write_text(s, encoding='utf-8')
print('ok reel3.html')
