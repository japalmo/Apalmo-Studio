# Pedido de Juan (23-oct): en los checklists, mostrar el semáforo formal Apto / Apto con observaciones / No apto.
import pathlib
AQUI = pathlib.Path(__file__).parent


def patch(fn, pares):
    p = AQUI / fn; s = p.read_text(encoding='utf-8')
    for a, b in pares:
        assert s.count(a) == 1, (fn, s.count(a), a[:80])
        s = s.replace(a, b)
    p.write_text(s, encoding='utf-8'); print('ok', fn)


patch('hacer_reel3.py', [
    ('''<!-- v3b · PORTA Central: ficha del vehículo, carga de datos y envío por 4G -->''',
     '''<!-- v3c · checklists con semáforo formal -->
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
<!-- v3b · PORTA Central: ficha del vehículo, carga de datos y envío por 4G -->'''),
    ('''/* v3b: subtítulos del inicio y escena de PORTA Central */''',
     '''/* v3c: semáforo de los checklists */
.sema{position:absolute;left:492px;top:640px;width:556px;padding:22px 24px;border-radius:46px;background:#15181c;border:2px solid rgba(255,255,255,.1);box-shadow:0 50px 90px -20px rgba(0,0,0,.8)}
.luz{display:flex;align-items:center;gap:24px;height:282px}
.luz+.luz{border-top:1.5px solid rgba(255,255,255,.07)}
.luz i{width:150px;height:150px;border-radius:50%;flex:none;background:var(--dim);box-shadow:inset 0 8px 18px rgba(0,0,0,.55)}
.luz.on i{background:radial-gradient(circle at 38% 34%,#fff8 0,var(--c) 38%,var(--c) 100%);box-shadow:0 0 70px 14px var(--gl),inset 0 -10px 18px rgba(0,0,0,.25)}
.luz b{display:block;font-size:42px;font-weight:800;line-height:1.02;letter-spacing:-.01em;color:#4a525b}
.luz.on b{color:var(--c)}
.luz small{display:block;font-size:24px;font-weight:600;color:#4a525b;margin-top:10px}
.luz.on small{color:#c3cbd2}
/* v3b: subtítulos del inicio y escena de PORTA Central */'''),
    ("""const QUITAR = ['e1', 'e2', 'e5b', 'e5d', 'e6', 'e10', 'e11', 'e12'];""",
     """const QUITAR = ['e1', 'e2', 'e5b', 'e5d', 'e6', 'e9', 'e10', 'e11', 'e12'];   // e9 (checklists de reel2) lo reemplaza la escena con semáforo
const CHK = 3.4;"""),
    ("""[20.8, 28.0], [400, 400 + CEN]""", """[20.8, 25.6], [500, 500 + CHK], [400, 400 + CEN]"""),
    ("""// PORTA Central: entra a la ficha del vehículo""", """// checklists con semáforo: Apto / Apto con observaciones / No apto (entra con latigazo, como en reel2)
const K0 = 500;
scene('#e9s', K0, K0 + CHK, .01, .04); tw('#e9s', K0, K0 + .28, { x: [1080, 0], b: [18, 0] }, 'out');
pop('k1', K0 + .1); pop('k2', K0 + .3); sube('k3', K0 + .5);
tw('#kt', K0 + .15, K0 + .55, { o: [0, 1], y: [900, 0], r: [-12, -4] }, 'out');
tw('#sema', K0 + .35, K0 + .75, { o: [0, 1], x: [320, 0] }, 'out');
[['lv', .95], ['la', 1.65], ['lr', 2.35]].forEach(([id, d]) => { tw('#' + id + ' i', K0, K0, { s: [1, 1] }); tw('#' + id + ' i', K0 + d, K0 + d + .3, { s: [1.3, 1] }, 'back'); });
flash(K0 + 2.35, .22);
tick(t => { [['lv', .95], ['la', 1.65], ['lr', 2.35]].forEach(([id, d]) => $(id).classList.toggle('on', t >= K0 + d)); });
// PORTA Central: entra a la ficha del vehículo"""),
])
patch('sfx3.py', [
    ("""TRAMOS = [(100, 100 + A), (200, 200 + P), (3.2, 12.6), (14.6, 16.6), (20.8, 28.0), (400, 400 + CEN), (300, 300 + C), (37.0, 40.4)]""",
     """CHK = 3.4   # checklists con semáforo (tiempos virtuales 500+)
TRAMOS = [(100, 100 + A), (200, 200 + P), (3.2, 12.6), (14.6, 16.6), (20.8, 25.6), (500, 500 + CHK), (400, 400 + CEN), (300, 300 + C), (37.0, 40.4)]"""),
    ("""# ================= PORTA Central: ficha del vehículo, carga y envío por 4G""",
     """# ================= checklists con semáforo: verde (apto), ámbar (con observaciones), rojo (no apto)
S9 = 500
thump(S9 + .1, .45); thump(S9 + .3, .45); whoosh(S9 + .2, .4, .35); whoosh(S9 + .4, .35, .25)
chime(S9 + .95, (1047, 1568), .22)
blip(S9 + 1.65, 880, .12, .22); blip(S9 + 1.8, 880, .12, .22)
sello(S9 + 2.35, .6); buzz(S9 + 2.37, .35, .15)
# ================= PORTA Central: ficha del vehículo, carga y envío por 4G"""),
])
