# Efectos de sonido de reel3.html (sin música: la canción se agrega en la app).
# Reutiliza los sonidos de reel2 (sfx.py) remapeados a la estructura nueva y suma los de los clips IA.
# Uso: python sfx3.py <salida.wav>      (lee la duración de los clips en clips/clips.js)
import numpy as np, wave, sys, json, re, pathlib
AQUI = pathlib.Path(__file__).parent
SR = 44100
CL = json.loads(re.search(r'window\.CLIPS = (\{.*?\});', (AQUI / 'clips' / 'clips.js').read_text(encoding='utf-8')).group(1))
A, C, P = CL['inicio'] / 30, CL['cierre'] / 30, 1.5
# mismos tramos que reel3.html: [inicio, fin] en tiempo de reel2 (clips y golpe en tiempos virtuales 100+, 200+, 300+)
CEN = 5.6   # escena de PORTA Central (tiempos virtuales 400+)
TRAMOS = [(100, 100 + A), (200, 200 + P), (3.2, 12.6), (14.6, 16.6), (20.8, 28.0), (400, 400 + CEN), (300, 300 + C), (37.0, 40.4)]
T0 = np.cumsum([0] + [b - a for a, b in TRAMOS])[:-1]
TOTAL = sum(b - a for a, b in TRAMOS)
OUT = sys.argv[1] if len(sys.argv) > 1 else 'sfx3.wav'
out = np.zeros(int(SR * TOTAL) + SR); rng = np.random.default_rng(11)


def nuevo(v):
    """tiempo de reel2 (o virtual) -> tiempo del reel nuevo; None si ese tramo no entra"""
    for (a, b), t0 in zip(TRAMOS, T0):
        if a - .7 <= v < b + .05: return t0 + (v - a)   # un poco de margen para los sonidos que anticipan el corte
    return None


def T(d): return np.arange(int(SR * d)) / SR
def add(sig, t, v=1.0):
    i = int(SR * t)
    if i < 0 or i >= len(out): return
    e = min(len(out), i + len(sig)); out[i:e] += sig[:e - i] * v
def suave(x, n): return np.convolve(x, np.ones(n) / n, 'same')
def ruido(d): return rng.standard_normal(int(SR * d))


def evento(f):
    """los eventos se escriben en tiempo de reel2/virtual y se ubican en el reel nuevo"""
    def g(t, *a, **k):
        n = nuevo(t)
        if n is not None: f(n, *a, **k)
    return g


def evento2(f):
    def g(t0, t1, *a, **k):
        n = nuevo(t0)
        if n is not None: f(n, n + (t1 - t0), *a, **k)
    return g


# ---------- sonidos de reel2 (idénticos a sfx.py)
@evento
def whoosh(t, d=.45, v=.5, sube=True):
    x = T(d); k = x / d; n = ruido(d)
    grave, agudo = suave(n, 40), n - suave(n, 6)
    mezcla = (k if sube else 1 - k)
    env = np.sin(np.pi * np.clip(k, 0, 1)) ** 1.5
    add((grave * (1 - mezcla) * 2.2 + agudo * mezcla * .8) * env, t - d * .6, v)
def _golpe(t, v=.8):
    x = T(.9); fr = 40 + 90 * np.exp(-x * 20)
    sub = np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-x * 5)
    add(sub + suave(ruido(.9), 3) * np.exp(-x * 25) * .5, t, v)
def _thump(t, v=.5):
    x = T(.25); add(np.sin(2 * np.pi * (70 + 120 * np.exp(-x * 40)) * x) * np.exp(-x * 18), t, v)
def _click(t, v=.35):
    x = T(.03); add(ruido(.03) * np.exp(-x * 300), t, v)
def _blip(t, f=1200, d=.07, v=.22):
    x = T(d); add(np.sin(2 * np.pi * f * x) * np.exp(-x * 40) * np.minimum(1, x / .002), t, v)
def _chime(t, notas=(1047, 1568), v=.28):
    for i, f in enumerate(notas):
        x = T(1.2); add((np.sin(2 * np.pi * f * x) + .3 * np.sin(2 * np.pi * 2 * f * x)) * np.exp(-x * 4), t + i * .11, v)
def _buzz(t, d=.35, v=.18):
    x = T(d); add(np.sign(np.sin(2 * np.pi * 110 * x)) * (.6 + .4 * np.sign(np.sin(2 * np.pi * 18 * x))) * np.exp(-x * 3), t, v)
golpe, thump, click, blip, chime, buzz = map(evento, (_golpe, _thump, _click, _blip, _chime, _buzz))
@evento
def obturador(t, v=.4):
    _click(t, v); x = T(.12); add(suave(ruido(.12), 2) * np.exp(-x * 40), t + .05, v * .7)
@evento
def sello(t, v=.7):
    _thump(t, v); x = T(.2); add(suave(ruido(.2), 4) * np.exp(-x * 30), t, v * .5)
@evento2
def barrido_tono(t0, t1, f0, f1, v=.12):
    x = T(t1 - t0); f = np.linspace(f0, f1, len(x)); add(np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * x / x[-1]), t0, v)
@evento2
def riser(t0, t1, v=.3):
    x = T(t1 - t0); k = x / x[-1]; n = ruido(t1 - t0)
    add((suave(n, 8) * k ** 2 + np.sin(2 * np.pi * (150 + 600 * k ** 2) * x) * k ** 2 * .3), t0, v)
@evento2
def ticks(t0, t1, cada=.05, v=.18):
    t = t0
    while t < t1: _click(t, v); t += cada


# ---------- sonidos nuevos de los clips (desierto, ripio, ventana, escaneo, motor, polvo)
@evento2
def viento(t0, t1, v=.10):
    d = t1 - t0; x = T(d); n = suave(ruido(d), 60) * 6
    lfo = .6 + .4 * np.sin(2 * np.pi * .23 * x + 1) * np.sin(2 * np.pi * .07 * x)
    env = np.minimum(1, x / .4) * np.minimum(1, (d - x) / .4)
    add(n * lfo * env, t0, v)
@evento
def paso_ripio(t, v=.35):
    d = .16; x = T(d); n = ruido(d)
    add((suave(n, 3) * .7 + (n - suave(n, 12)) * .5) * np.exp(-x * 28) * (1 + .5 * np.sin(2 * np.pi * 37 * x)), t, v)
@evento
def golpe_vidrio(t, v=.5):
    x = T(.18); add((np.sin(2 * np.pi * 220 * x) * .6 + np.sin(2 * np.pi * 540 * x) * .3 + suave(ruido(.18), 2) * .4) * np.exp(-x * 45), t, v)
@evento2
def cargando(t0, t1, v=.06):
    t = t0
    while t < t1: _blip(t, 1700, .025, v); t += .18
@evento
def sin_senal(t, v=.22):
    for i, f in enumerate((660, 520)): x = T(.22); add(np.sin(2 * np.pi * f * x) * np.exp(-x * 9) * np.minimum(1, x / .004), t + i * .16, v)
@evento
def escaneo(t, v=.25):
    x = T(.5); f = np.linspace(900, 1900, len(x)); add(np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * x / x[-1]) * .4, t, v)
    _blip(t + .55, 2350, .07, v * 1.2); _blip(t + .66, 2350, .07, v * 1.2)
@evento
def motor(t, d=3.5, v=.4, se_va=True):
    # arranque (burro de partida), ralentí y luego acelera alejándose
    x = T(.55); arr = suave(ruido(.55), 30) * 3 * (.5 + .5 * np.sign(np.sin(2 * np.pi * 13 * x))) * np.minimum(1, x / .05)
    add(arr, t, v * .6)
    x = T(d); f = 32 + 6 * np.minimum(1, x / .3) + (np.clip(x - 1.4, 0, None) ** 1.3) * 14
    ph = 2 * np.pi * np.cumsum(f) / SR
    tono = np.sin(ph) + .5 * np.sin(2 * ph) + .3 * np.sin(3 * ph) + .2 * suave(ruido(d), 20) * 4
    env = np.minimum(1, x / .25) * (np.exp(-np.clip(x - 2.2, 0, None) * 1.4) if se_va else 1)
    add(tono * env, t + .5, v)
@evento2
def polvo(t0, t1, v=.25):
    d = t1 - t0; x = T(d); n = ruido(d)
    add((suave(n, 25) * 3 + (n - suave(n, 4)) * .25) * np.sin(np.pi * x / d) ** 1.2, t0, v)


# ================= clip de inicio (tiempos dentro del clip: 100 + s; cortes reales: 1.25 ventana, 2.38 conductor,
# 4.04 teléfono (inserto), 5.38 "es que… no tengo señal", 6.71 fiscalizadora, 8.42 toma aérea)
I = 100
USAR_VOZ_CLIP = True        # la frase del conductor sale del audio del propio clip IA (poner False para dejar solo efectos)
viento(I, I + A, .11)
for k in range(4): paso_ripio(I + .12 + k * .3, .3 + .03 * k)
for k in range(3): golpe_vidrio(I + 1.45 + k * .14, .5)
click(I + 3.3, .3)                                # toma el teléfono
cargando(I + 4.15, I + 5.2); sin_senal(I + 5.05, .22)
thump(I + 7.6, .25)                               # ella baja la mirada
whoosh(I + 8.5, .9, .4); polvo(I + 8.4, I + A, .15)
# ================= golpe "Sin señal. Sin problema."
G = 200
golpe(G, .9); thump(G + .05, .55); thump(G + .4, .6); chime(G + .75, (1319, 1760), .3)
# ================= escenas de reel2 (mismos tiempos que sfx.py; las que no entran se descartan solas)
# 3 · equipo entra
whoosh(3.2, .6, .7); riser(3.2, 4.1, .35); golpe(4.1, .9); chime(4.15, (784, 1175), .12)
# 4 · por dentro
click(5.8, .3); whoosh(6.2, .9, .35, sube=False)
for t in (6.6, 6.9, 7.2, 7.5): blip(t, 1500, .06, .2); click(t, .15)
# 5 · tamaño y 0 apps
whoosh(9.2, .5, .6); thump(9.35, .4); thump(9.6, .4)
whoosh(9.75, .35, .3)
for i in range(8): click(9.9 + i * .6 / 7, .3); blip(9.9 + i * .6 / 7, 700 + i * 90, .03, .08)
blip(10.5, 1568, .14, .3)
click(10.3, .3); barrido_tono(10.3, 10.55, 500, 900, .06)
whoosh(11.2, .7, .3, sube=False)
click(11.75, .35); thump(11.95, .55)
# 0 señal necesaria: cómputo y memoria a bordo, red Wi-Fi propia
golpe(14.6, .55)
for i, f in enumerate([880, 740, 620, 520]): blip(14.7 + i * .1, f, .08, .22)
chime(15.2, (1319, 1760), .3)
# 7 · QR (en sfx.py: 13.4 + 7.4 de desfase)
O = 7.4
whoosh(13.4 + O, .55, .6); thump(13.5 + O, .4); thump(13.7 + O, .4)
click(14.5 + O, .35); barrido_tono(14.8 + O, 15.6 + O, 600, 1400, .08); blip(15.6 + O, 1760, .12, .3); blip(15.72 + O, 2350, .14, .25)
# 8 · NFC
obturador(15.8 + O, .3); thump(15.9 + O, .4); thump(16.1 + O, .4); whoosh(16.6 + O, .45, .35)
chime(16.65 + O, (1319, 1760), .3); chime(17.55 + O, (1319, 1760), .18)
# 9 · checklists
whoosh(18.2 + O, .4, .55); whoosh(18.6 + O, .3, .3); whoosh(18.95 + O, .3, .3); sello(19.5 + O, .8); buzz(19.52 + O, .3, .14)
# ================= PORTA Central: ficha del vehículo, carga y envío por 4G
W = 400
whoosh(W, .5, .5); thump(W + .05, .45); thump(W + .3, .45); whoosh(W + .3, .45, .35)
click(W + 1.0, .3); whoosh(W + 1.6, .45, .22); thump(W + 1.85, .45); click(W + 1.86, .3)
ticks(W + 1.95, W + 2.6, .06, .1); chime(W + 2.65, (1319, 1760), .26)
for i in range(6): blip(W + 3.0 + i * .16, 900 + i * 160, .05, .14)
chime(W + 4.0, (1568, 2093), .3)
# ================= clip de cierre (cortes: 1.42 check en el teléfono (inserto), 2.38 pulgar arriba, 3.42 conductor aliviado,
# 4.75 equipo bajo el retrovisor (LED verde, arranca), 5.95 la camioneta se va)
K = 300
viento(K, K + C, .10); obturador(K, .3)
escaneo(K + .5, .28); chime(K + 1.45, (1568, 2093), .26)      # QR leído -> check verde
thump(K + 2.6, .3)                                             # pulgar arriba
blip(K + 4.85, 1800, .05, .14); blip(K + 5.05, 1800, .05, .14) # LED verde
motor(K + 4.7, 3.4, .38)
polvo(K + 5.95, K + C, .28)
for k in range(3): paso_ripio(K + 6.1 + k * .5, .12)
# ================= firma
whoosh(29.6 + O, .6, .55); thump(29.75 + O, .5); chime(30.45 + O, (784, 1175, 1568), .2)

# frase del conductor desde el audio del clip de inicio
if USAR_VOZ_CLIP and (AQUI / 'clips' / 'fuente' / 'inicio.mp4').exists():
    import subprocess
    a0, a1 = 5.3, 6.75
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-ss', str(a0), '-t', str(a1 - a0), '-i', str(AQUI / 'clips' / 'fuente' / 'inicio.mp4'),
                          '-vn', '-ac', '1', '-ar', str(SR), '-f', 's16le', '-'], capture_output=True).stdout
    voz = np.frombuffer(raw, np.int16).astype(float) / 32768
    if len(voz):
        f = int(.04 * SR); env = np.ones(len(voz)); env[:f] = np.linspace(0, 1, f); env[-f:] = np.linspace(1, 0, f)
        n = nuevo(I + a0)
        if n is not None: add(voz * env / (np.abs(voz).max() + 1e-9), n, .55)
y = np.tanh(out[:int(SR * TOTAL)] * 1.2)
y = y / np.max(np.abs(y)) * .75
st = np.stack([y, np.roll(y, int(SR * .0005))], axis=1)
w = wave.open(OUT, 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((st * 32767).astype(np.int16).tobytes()); w.close(); print('ok', OUT, f'{TOTAL:.2f} s')
