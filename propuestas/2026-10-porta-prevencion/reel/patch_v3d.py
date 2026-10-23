# Narración con voz (23-oct): escenas de checklists y PORTA Central más largas, luces del semáforo y envío por 4G
# calzados con la voz, y mezcla de la narración en sfx3.py (con los efectos bajados bajo la voz).
import pathlib
AQUI = pathlib.Path(__file__).parent


def patch(fn, pares):
    p = AQUI / fn; s = p.read_text(encoding='utf-8')
    for a, b in pares:
        assert s.count(a) == 1, (fn, s.count(a), a[:80])
        s = s.replace(a, b)
    p.write_text(s, encoding='utf-8'); print('ok', fn)


LUCES_OLD = "[['lv', .95], ['la', 1.65], ['lr', 2.35]]"
LUCES_NEW = "[['lv', 2.16], ['la', 2.76], ['lr', 4.11]]"
patch('hacer_reel3.py', [
    ("const CHK = 3.4;", "const CHK = 5.0;   // largo de la narración de los checklists"),
    ("const CEN = 5.6;", "const CEN = 7.1;   // largo de la narración de PORTA Central"),
    (f"{LUCES_OLD}.forEach(([id, d]) => {{ tw('#' + id + ' i'", f"{LUCES_NEW}.forEach(([id, d]) => {{ tw('#' + id + ' i'"),
    ("flash(K0 + 2.35, .22);", "flash(K0 + 4.11, .22);"),
    (f"tick(t => {{ {LUCES_OLD}.forEach", f"tick(t => {{ {LUCES_NEW}.forEach"),
    # PORTA Central: el envío por 4G ocurre cuando la voz dice "con cuatro G, llegan solos al equipo"
    ("tw('#pieA', C0 + 2.95, C0 + 3.1, { o: [0, 1] }, 'lin'); tw('#pieA', C0 + 3.95, C0 + 4.05, { o: [1, 0] }, 'lin');",
     "tw('#pieA', C0 + 4.4, C0 + 4.55, { o: [0, 1] }, 'lin'); tw('#pieA', C0 + 5.45, C0 + 5.55, { o: [1, 0] }, 'lin');"),
    ("tw('#pieB', C0 + 4.05, C0 + 4.25, { o: [0, 1], y: [16, 0] }, 'out');", "tw('#pieB', C0 + 5.55, C0 + 5.75, { o: [0, 1], y: [16, 0] }, 'out');"),
    ("tw('#dev', C0 + 2.9, C0 + 3.2, { o: [0, 1], y: [80, 0] }, 'out');", "tw('#dev', C0 + 4.2, C0 + 4.5, { o: [0, 1], y: [80, 0] }, 'out');"),
    ("const t = C0 + 3.1 + i * .22;", "const t = C0 + 4.6 + i * .22;"),
    ("tw('#dev', C0 + 3.9, C0 + 4.0, { s: [1, 1.08] }, 'out'); tw('#dev', C0 + 4.0, C0 + 4.25, { s: [1.08, 1] }, 'back');",
     "tw('#dev', C0 + 5.45, C0 + 5.55, { s: [1, 1.08] }, 'out'); tw('#dev', C0 + 5.55, C0 + 5.8, { s: [1.08, 1] }, 'back');"),
    ("const ok = t >= C0 + 4.0;", "const ok = t >= C0 + 5.55;"),
    ("(t >= C0 + 3.0 ? 'recibiendo por 4G…' : 'esperando datos…')", "(t >= C0 + 4.45 ? 'recibiendo por 4G…' : 'esperando datos…')"),
    ("$('g4').style.background = t >= C0 + 2.95 ? '#1f3a2b' : '#2a3138'; $('g4').style.color = t >= C0 + 2.95 ? '#3ce07f' : '#9aa4ad';",
     "$('g4').style.background = t >= C0 + 4.4 ? '#1f3a2b' : '#2a3138'; $('g4').style.color = t >= C0 + 4.4 ? '#3ce07f' : '#9aa4ad';"),
])
patch('sfx3.py', [
    ("CHK = 3.4   # checklists con semáforo (tiempos virtuales 500+)", "CHK = 5.0   # checklists con semáforo (tiempos virtuales 500+), largo de la narración"),
    ("CEN = 5.6   # escena de PORTA Central (tiempos virtuales 400+)", "CEN = 7.1   # escena de PORTA Central (tiempos virtuales 400+), largo de la narración"),
    ("""chime(S9 + .95, (1047, 1568), .22)
blip(S9 + 1.65, 880, .12, .22); blip(S9 + 1.8, 880, .12, .22)
sello(S9 + 2.35, .6); buzz(S9 + 2.37, .35, .15)""",
     """chime(S9 + 2.16, (1047, 1568), .22)
blip(S9 + 2.76, 880, .12, .22); blip(S9 + 2.91, 880, .12, .22)
sello(S9 + 4.11, .6); buzz(S9 + 4.13, .35, .15)"""),
    ("""for i in range(6): blip(W + 3.0 + i * .16, 900 + i * 160, .05, .14)
chime(W + 4.0, (1568, 2093), .3)""",
     """for i in range(6): blip(W + 4.45 + i * .16, 900 + i * 160, .05, .14)
chime(W + 5.55, (1568, 2093), .3)"""),
    ("""y = np.tanh(out[:int(SR * TOTAL)] * 1.2)
y = y / np.max(np.abs(y)) * .75""",
     """y = np.tanh(out[:int(SR * TOTAL)] * 1.2)
y = y / np.max(np.abs(y)) * .75
# narración (narracion/lineas.json): voz encima y efectos bajados mientras habla
LJ = AQUI / 'narracion' / 'lineas.json'
if LJ.exists():
    voz = np.zeros(len(y))
    for arch, t0, tempo, _ in json.loads(LJ.read_text(encoding='utf-8'))['lineas']:
        raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(AQUI / 'narracion' / 'lineas' / arch), '-af', f'atempo={tempo}', '-ac', '1',
                              '-ar', str(SR), '-f', 's16le', '-'], capture_output=True).stdout
        v = np.frombuffer(raw, np.int16).astype(float) / 32768
        v = v / (np.abs(v).max() + 1e-9) * .92
        i = int(t0 * SR); e = min(len(voz), i + len(v)); voz[i:e] += v[:e - i]
    env = np.convolve(np.abs(voz), np.ones(int(.12 * SR)) / int(.12 * SR), 'same')
    env = np.clip(env / (env.max() + 1e-9) * 4, 0, 1)
    duck = 1 - .62 * np.convolve(env, np.ones(int(.08 * SR)) / int(.08 * SR), 'same')
    y = y * duck * .85 + voz
    y = y / np.max(np.abs(y)) * .89"""),
    ("import numpy as np, wave, sys, json, re, pathlib", "import numpy as np, wave, sys, json, re, pathlib, subprocess"),
])
