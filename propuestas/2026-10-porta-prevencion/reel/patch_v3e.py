# Narración desde la muestra 3 (Andre) ya generada, cortada por frase; solo la firma ("apalmo studio") es nueva (L9).
# Se recalzan las escenas a esa lectura: checklists 4,8 s, PORTA Central 6,7 s.
import json, pathlib
AQUI = pathlib.Path(__file__).parent


def patch(fn, pares):
    p = AQUI / fn; s = p.read_text(encoding='utf-8')
    for a, b in pares:
        assert s.count(a) == 1, (fn, s.count(a), a[:80])
        s = s.replace(a, b)
    p.write_text(s, encoding='utf-8'); print('ok', fn)


patch('hacer_reel3.py', [
    ("const CHK = 5.0;", "const CHK = 4.8;"),
    ("const CEN = 7.1;", "const CEN = 6.7;"),
    ("[['lv', 2.16], ['la', 2.76], ['lr', 4.11]].forEach(([id, d]) => { tw('#' + id + ' i'", "[['lv', 2.09], ['la', 2.69], ['lr', 3.95]].forEach(([id, d]) => { tw('#' + id + ' i'"),
    ("flash(K0 + 4.11, .22);", "flash(K0 + 3.95, .22);"),
    ("tick(t => { [['lv', 2.16], ['la', 2.76], ['lr', 4.11]].forEach", "tick(t => { [['lv', 2.09], ['la', 2.69], ['lr', 3.95]].forEach"),
    ("tw('#pieA', C0 + 4.4, C0 + 4.55, { o: [0, 1] }, 'lin'); tw('#pieA', C0 + 5.45, C0 + 5.55, { o: [1, 0] }, 'lin');",
     "tw('#pieA', C0 + 3.9, C0 + 4.05, { o: [0, 1] }, 'lin'); tw('#pieA', C0 + 4.95, C0 + 5.05, { o: [1, 0] }, 'lin');"),
    ("tw('#pieB', C0 + 5.55, C0 + 5.75, { o: [0, 1], y: [16, 0] }, 'out');", "tw('#pieB', C0 + 5.05, C0 + 5.25, { o: [0, 1], y: [16, 0] }, 'out');"),
    ("tw('#dev', C0 + 4.2, C0 + 4.5, { o: [0, 1], y: [80, 0] }, 'out');", "tw('#dev', C0 + 3.7, C0 + 4.0, { o: [0, 1], y: [80, 0] }, 'out');"),
    ("const t = C0 + 4.6 + i * .22;", "const t = C0 + 4.1 + i * .22;"),
    ("tw('#dev', C0 + 5.45, C0 + 5.55, { s: [1, 1.08] }, 'out'); tw('#dev', C0 + 5.55, C0 + 5.8, { s: [1.08, 1] }, 'back');",
     "tw('#dev', C0 + 4.95, C0 + 5.05, { s: [1, 1.08] }, 'out'); tw('#dev', C0 + 5.05, C0 + 5.3, { s: [1.08, 1] }, 'back');"),
    ("const ok = t >= C0 + 5.55;", "const ok = t >= C0 + 5.05;"),
    ("(t >= C0 + 4.45 ? 'recibiendo por 4G…' : 'esperando datos…')", "(t >= C0 + 3.95 ? 'recibiendo por 4G…' : 'esperando datos…')"),
    ("$('g4').style.background = t >= C0 + 4.4 ? '#1f3a2b' : '#2a3138'; $('g4').style.color = t >= C0 + 4.4 ? '#3ce07f' : '#9aa4ad';",
     "$('g4').style.background = t >= C0 + 3.9 ? '#1f3a2b' : '#2a3138'; $('g4').style.color = t >= C0 + 3.9 ? '#3ce07f' : '#9aa4ad';"),
])
patch('sfx3.py', [
    ("CHK = 5.0   #", "CHK = 4.8   #"),
    ("CEN = 7.1   #", "CEN = 6.7   #"),
    ("""chime(S9 + 2.16, (1047, 1568), .22)
blip(S9 + 2.76, 880, .12, .22); blip(S9 + 2.91, 880, .12, .22)
sello(S9 + 4.11, .6); buzz(S9 + 4.13, .35, .15)""",
     """chime(S9 + 2.09, (1047, 1568), .22)
blip(S9 + 2.69, 880, .12, .22); blip(S9 + 2.84, 880, .12, .22)
sello(S9 + 3.95, .6); buzz(S9 + 3.97, .35, .15)"""),
    ("""for i in range(6): blip(W + 4.45 + i * .16, 900 + i * 160, .05, .14)
chime(W + 5.55, (1568, 2093), .3)""",
     """for i in range(6): blip(W + 3.95 + i * .16, 900 + i * 160, .05, .14)
chime(W + 5.05, (1568, 2093), .3)"""),
    ("""raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(AQUI / 'narracion' / 'lineas' / arch),""",
     """raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(AQUI / 'narracion' / arch),"""),
])
L = {
    "_como_usar": "Narración: archivo (relativo a narracion/), inicio en segundos del reel final, velocidad (atempo), texto. S1-S8 son cortes de muestras/muestra-3-andre.mp3 (la lectura elegida); solo L9 se generó aparte para decir 'apalmo studio'. sfx3.py la mezcla y baja los efectos bajo la voz.",
    "voz": "Andre (preset Higgsfield f1e8226e-2248-4d5f-b43c-0a79e9949dbf, motor elevenlabs)",
    "lineas": [
        ["cortes/S1.wav", 8.5, 1.0, "¿En faena no hay señal?"],
        ["cortes/S2.wav", 10.06, 1.0, "Sin señal… sin problema."],
        ["cortes/S3.wav", 11.93, 1.12, "Te presento PORTA: un pequeño computador que va bajo el retrovisor, con memoria propia y cuatro G."],
        ["cortes/S4.wav", 18.2, 1.0, "Es más chico que un celular, y funciona sin señal: guarda todo a bordo."],
        ["cortes/S5.wav", 22.5, 1.1, "Se conecta en un toque: código QR por fuera, NFC por dentro, y sin aplicaciones."],
        ["cortes/S6.wav", 27.98, 1.0, "Checklists sin señal: apto, con observaciones o no apto."],
        ["cortes/S7.wav", 32.83, 1.0, "Y desde PORTA Central cargas los documentos del vehículo. Con cuatro G, llegan solos al equipo."],
        ["cortes/S8.wav", 39.33, 1.0, "Así, en terreno, basta escanear: todo al día."],
        ["lineas/L9.mp3", 47.56, 1.0, "PORTA. Un concepto en desarrollo de apalmo studio."],
    ],
}
(AQUI / 'narracion' / 'lineas.json').write_text(json.dumps(L, ensure_ascii=False, indent=2), encoding='utf-8'); print('ok lineas.json')
