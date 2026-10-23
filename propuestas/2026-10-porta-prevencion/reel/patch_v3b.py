# Cambios pedidos por Juan (23-oct): se entienda el problema, fuera la dashcam, reforzar cómputo y memoria sin señal,
# y mostrar el flujo de datos: PORTA Central -> ficha del vehículo -> carga -> 4G -> escaneo en terreno con datos al día.
import pathlib
p = pathlib.Path(__file__).parent / 'hacer_reel3.py'
s = p.read_text(encoding='utf-8')


def rep(a, b):
    global s
    assert s.count(a) == 1, (s.count(a), a[:80])
    s = s.replace(a, b)


# ---------- textos de reel2 que cambian (se aplican sobre el HTML generado)
rep("(AQUI / 'reel3.html').write_text(s, encoding='utf-8')", """# --- v3b: sin dashcam, cómputo y memoria a bordo
rep('computador <span class="n">+</span> dashcam', 'computador <span class="n">+</span> memoria a bordo')
rep('<div>2 cámaras<small>ruta + cabina (IR)</small></div>', '<div>128 GB a bordo<small>documentos y registros</small></div>')
rep('acerca el celular y listo', 'se abre en el navegador, sin apps')
rep('PORTA crea su propia red Wi-Fi</span>', 'procesa y guarda todo a bordo, con su propia red Wi-Fi</span>')
(AQUI / 'reel3.html').write_text(s, encoding='utf-8')""")

# ---------- capas nuevas: subtítulos del inicio, escena de PORTA Central, pantalla del cierre con la ficha al día
rep('''  </div>
</div>
<!-- v3 · golpe -->''', '''  </div>
  <div class="chipi" id="ctx">Control vehicular · camino minero</div>
  <div class="subi" id="s1">—Los documentos del vehículo, por favor.</div>
  <div class="subi" id="s2">—Es que… no tengo señal.</div>
  <div class="subi" id="s3">Sin señal, no hay cómo mostrar los documentos.</div>
  <div class="t sombra" style="top:1180px;font-size:118px" id="aer"><span class="w" id="aer1">En faena,</span><br><span class="w n" id="aer2">no hay señal.</span></div>
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
<!-- v3 · golpe -->''')
rep('''.spin{width:150px;height:150px;border-radius:50%;border:16px solid rgba(255,255,255,.15);border-top-color:#fff;margin:0 auto}''',
    '''.spin{width:150px;height:150px;border-radius:50%;border:16px solid rgba(255,255,255,.15);border-top-color:#fff;margin:0 auto}
/* v3b: subtítulos del inicio y escena de PORTA Central */
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
# pantalla del cierre: la ficha del vehículo, ya actualizada
rep('''    <div style="text-align:center;margin-top:28px;font-size:40px;font-weight:600;color:#5b6570">Conectado a PORTA · CH-04</div>
    <div id="okB" style="width:260px;height:260px;border-radius:50%;background:#2fbf6a;margin:110px auto 0;display:grid;place-items:center;box-shadow:0 30px 60px rgba(47,191,106,.35)">''',
    '''    <div style="text-align:center;margin-top:24px;font-size:40px;font-weight:700">CH-04 · Camioneta 4x4</div>
    <div style="text-align:center;margin-top:6px;font-size:30px;font-weight:500;color:#5b6570">conectado sin señal</div>
    <div id="okB" style="width:230px;height:230px;border-radius:50%;background:#2fbf6a;margin:70px auto 0;display:grid;place-items:center;box-shadow:0 30px 60px rgba(47,191,106,.35)">''')
rep('''    <div style="text-align:center;margin-top:60px;font-size:58px;font-weight:800">Documentos al día</div>''',
    '''    <div style="text-align:center;margin-top:50px;font-size:58px;font-weight:800">Documentos al día</div>
    <div style="margin:40px 50px 0;padding:22px 26px;border-radius:24px;background:#E3F4EA;color:#2E9E5B;font-size:30px;font-weight:700;line-height:1.3">Revisión técnica<br><span style="font-weight:500;color:#1C2126">vigente · actualizada hoy</span></div>''')
# ---------- estructura
rep("""const QUITAR = ['e1', 'e2', 'e5c', 'e5d', 'e6', 'e12'];   // de reel2: el clip y el golpe ya cuentan "sin señal"; el cierre muestra el retrovisor""",
    """const QUITAR = ['e1', 'e2', 'e5b', 'e5d', 'e6', 'e10', 'e11', 'e12'];   // fuera: gancho y procedimientos (los cuenta el clip), 0 apps (va en NFC), 38 h y dashcam, retrovisor (lo muestra el cierre), alerta (la reemplaza PORTA Central)
const CEN = 5.6;""")
rep("""const TRAMOS = [[100, 100 + A], [200, 200 + P], [3.2, 14.6], [20.8, 33.4], [300, 300 + C], [37.0, 40.4]];""",
    """const TRAMOS = [[100, 100 + A], [200, 200 + P], [3.2, 12.6], [14.6, 16.6], [20.8, 28.0], [400, 400 + CEN], [300, 300 + C], [37.0, 40.4]];""")
rep("""// clip de cierre (entra con flash)""", """// subtítulos del inicio: que se entienda el problema (también sin audio)
const subi = (id, a, b) => { tw('#' + id, 100 + a, 100 + a + .18, { o: [0, 1], y: [24, 0] }, 'out'); tw('#' + id, 100 + b - .15, 100 + b, { o: [1, 0] }, 'io'); };
subi('ctx', .2, 1.25); subi('s1', 1.35, 2.35); subi('s2', 5.45, 6.68); subi('s3', 6.8, 8.38);
tw('#aer1', 108.5, 108.8, { o: [0, 1], s: [1.5, 1], y: [30, 0] }, 'back'); tw('#aer2', 108.85, 109.15, { o: [0, 1], s: [1.5, 1], y: [30, 0] }, 'back');
tw('#aer', 100 + A - .12, 100 + A, { o: [1, 0] }, 'io');
// PORTA Central: entra a la ficha del vehículo, sube la revisión técnica y la envía al equipo por 4G
const C0 = 400;
scene('#ecen', C0, C0 + CEN, .01, .01); flash(C0, .45);
tw('#c1', C0 + .05, C0 + .35, { o: [0, 1], s: [1.4, 1], y: [30, 0] }, 'back'); tw('#c2', C0 + .3, C0 + .6, { o: [0, 1], s: [1.4, 1], y: [30, 0] }, 'back');
tw('#win', C0 + .2, C0 + .65, { o: [0, 1], y: [600, 0], r: [4, 0] }, 'out');
tw('#arch', C0 + 1.0, C0 + 1.25, { o: [0, 1], x: [700, 700], y: [1500, 1500] }, 'out');
tw('#arch', C0 + 1.3, C0 + 1.85, { x: [700, 420], y: [1500, 1000] }, 'io'); tw('#arch', C0 + 1.85, C0 + 2.0, { o: [1, 0], s: [1, .7] }, 'in');
tw('#cursor2', C0 + 1.0, C0 + 1.2, { o: [0, 1], x: [930, 930], y: [1540, 1540] }, 'out');
tw('#cursor2', C0 + 1.3, C0 + 1.85, { x: [930, 650], y: [1540, 1040] }, 'io'); tw('#cursor2', C0 + 2.1, C0 + 2.3, { o: [1, 0] }, 'io');
tw('#frt', C0 + 1.75, C0 + 1.85, { s: [1, 1.04] }, 'out'); tw('#frt', C0 + 1.85, C0 + 2.05, { s: [1.04, 1] }, 'back');
tw('.barra', C0 + 1.9, C0 + 2.0, { o: [0, 1] }, 'lin'); tw('.barra', C0 + 2.6, C0 + 2.75, { o: [1, 0] }, 'lin');
tw('#rtA', C0 + 2.6, C0 + 2.7, { o: [1, 0] }, 'lin'); tw('#rtB', C0 + 2.65, C0 + 2.95, { o: [0, 1], s: [1.4, 1] }, 'back');
tw('#pieA', C0 + 2.95, C0 + 3.1, { o: [0, 1] }, 'lin'); tw('#pieA', C0 + 3.95, C0 + 4.05, { o: [1, 0] }, 'lin');
tw('#pieB', C0 + 4.05, C0 + 4.25, { o: [0, 1], y: [16, 0] }, 'out');
tw('#dev', C0 + 2.9, C0 + 3.2, { o: [0, 1], y: [80, 0] }, 'out');
['q1', 'q2', 'q3'].forEach((id, i) => { const t = C0 + 3.1 + i * .22; tw('#' + id, C0, C0, { o: [0, 0] }); tw('#' + id, t, t + .5, { o: [1, 1], y: [0, 150] }, 'in'); tw('#' + id, t + .5, t + .55, { o: [1, 0] }, 'lin'); });
tw('#dev', C0 + 3.9, C0 + 4.0, { s: [1, 1.08] }, 'out'); tw('#dev', C0 + 4.0, C0 + 4.25, { s: [1.08, 1] }, 'back');
tick(t => { const k = Math.min(1, Math.max(0, (t - C0 - 1.95) / .65)); $('rtBar').style.width = (k * 100) + '%';
  $('spin2').style.transform = `rotate(${t * 500}deg)`; const ok = t >= C0 + 4.0;
  $('devs').textContent = ok ? 'datos al día ✓' : (t >= C0 + 3.0 ? 'recibiendo por 4G…' : 'esperando datos…'); $('devs').style.color = ok ? '#3ce07f' : '#9aa4ad';
  $('g4').style.background = t >= C0 + 2.95 ? '#1f3a2b' : '#2a3138'; $('g4').style.color = t >= C0 + 2.95 ? '#3ce07f' : '#9aa4ad'; });
// clip de cierre (entra con flash)""")
rep("""const INS = window.INSERTOS || { pantA: [4.5, 6.0], pantB: [1.5, 3.0] };""", """const INS = window.INSERTOS || { pantA: [4.04, 5.375], pantB: [1.25, 2.6] };""")
rep("""const ok = aVirtual(t) - 300; $('okB').style.transform = `scale(${ok < 0 ? 0 : Math.min(1, ok * 3)})`;""",
    """const ok = aVirtual(t) - 300 - (INS.pantB ? INS.pantB[0] : 0) - .15; $('okB').style.transform = `scale(${ok < 0 ? 0 : Math.min(1, ok * 4)})`;""")
rep("""t < T0[5] - .2 ? 1 : 0;""", """t < T0[T0.length - 1] - .2 ? 1 : 0;""")
p.write_text(s, encoding='utf-8'); print('ok hacer_reel3 (v3b)')
