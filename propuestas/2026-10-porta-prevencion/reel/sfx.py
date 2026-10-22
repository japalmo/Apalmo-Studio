# Efectos de sonido sincronizados con reel2.html (sin música, para agregar una canción en la app).
# Uso: python3 sfx.py <salida.wav>
import numpy as np, wave, sys
SR = 44100; TOTAL = 40.4
OUT = sys.argv[1] if len(sys.argv) > 1 else 'sfx.wav'
out = np.zeros(int(SR * TOTAL)); rng = np.random.default_rng(11)
def T(d): return np.arange(int(SR * d)) / SR
OFF = 0.0   # desplazamiento para las escenas que vienen después de los datos
def add(sig, t, v=1.0):
    i = int(SR * (t + OFF))
    if i >= len(out): return
    e = min(len(out), i + len(sig)); out[i:e] += sig[:e - i] * v
def suave(x, n): return np.convolve(x, np.ones(n) / n, 'same')
def ruido(d): return rng.standard_normal(int(SR * d))

def whoosh(t, d=.45, v=.5, sube=True):
    # ruido que pasa de grave a agudo (o al revés) con una envolvente en campana
    x = T(d); k = x / d; n = ruido(d)
    grave, agudo = suave(n, 40), n - suave(n, 6)
    mezcla = (k if sube else 1 - k)
    env = np.sin(np.pi * np.clip(k, 0, 1)) ** 1.5
    add((grave * (1 - mezcla) * 2.2 + agudo * mezcla * .8) * env, t - d * .6, v)
def golpe(t, v=.8):
    x = T(.9); fr = 40 + 90 * np.exp(-x * 20)
    sub = np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-x * 5)
    add(sub + suave(ruido(.9), 3) * np.exp(-x * 25) * .5, t, v)
def thump(t, v=.5):
    x = T(.25); add(np.sin(2 * np.pi * (70 + 120 * np.exp(-x * 40)) * x) * np.exp(-x * 18), t, v)
def click(t, v=.35):
    x = T(.03); add(ruido(.03) * np.exp(-x * 300), t, v)
def blip(t, f=1200, d=.07, v=.22):
    x = T(d); add(np.sin(2 * np.pi * f * x) * np.exp(-x * 40) * np.minimum(1, x / .002), t, v)
def chime(t, notas=(1047, 1568), v=.28):
    for i, f in enumerate(notas):
        x = T(1.2); add((np.sin(2 * np.pi * f * x) + .3 * np.sin(2 * np.pi * 2 * f * x)) * np.exp(-x * 4), t + i * .11, v)
def buzz(t, d=.35, v=.18):
    x = T(d); add(np.sign(np.sin(2 * np.pi * 110 * x)) * (.6 + .4 * np.sign(np.sin(2 * np.pi * 18 * x))) * np.exp(-x * 3), t, v)
def obturador(t, v=.4):
    click(t, v); x = T(.12); add(suave(ruido(.12), 2) * np.exp(-x * 40), t + .05, v * .7)
def sello(t, v=.7):
    thump(t, v); x = T(.2); add(suave(ruido(.2), 4) * np.exp(-x * 30), t, v * .5)
def barrido_tono(t0, t1, f0, f1, v=.12):
    x = T(t1 - t0); f = np.linspace(f0, f1, len(x)); add(np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * x / x[-1]), t0, v)
def riser(t0, t1, v=.3):
    x = T(t1 - t0); k = x / x[-1]; n = ruido(t1 - t0)
    add((suave(n, 8) * k ** 2 + np.sin(2 * np.pi * (150 + 600 * k ** 2) * x) * k ** 2 * .3), t0, v)
def ticks(t0, t1, cada=.05, v=.18):
    t = t0
    while t < t1: click(t, v); t += cada

# 1 · gancho
thump(.05, .6)
for i, f in enumerate([880, 740, 620, 520]): blip(.3 + i * .12, f, .09, .25)
thump(.7, .55); buzz(.95, .4, .2); thump(.95, .5)
whoosh(1.8, .5, .5)
# 2 · procedimientos
thump(1.85, .45); thump(2.05, .45); whoosh(2.0, .35, .35); sello(2.5, .6); buzz(2.52, .25, .16)
# 3 · equipo entra
whoosh(3.2, .6, .7); riser(3.2, 4.1, .35); golpe(4.1, .9); chime(4.15, (784, 1175), .12)
# 4 · por dentro
click(5.8, .3); whoosh(6.2, .9, .35, sube=False)
for t in (6.6, 6.9, 7.2, 7.5): blip(t, 1500, .06, .2); click(t, .15)
# 5 · datos (más lentos: tamaño con regla y cotas, luego 3 datos de 2 s)
whoosh(9.2, .5, .6); thump(9.35, .4); thump(9.6, .4)
whoosh(9.75, .35, .3)                                   # entra la regla
for i in range(8): click(9.9 + i * .6 / 7, .3); blip(9.9 + i * .6 / 7, 700 + i * 90, .03, .08)
blip(10.5, 1568, .14, .3)                               # 7,0 cm
click(10.3, .3); barrido_tono(10.3, 10.55, 500, 900, .06)   # cota de alto
whoosh(11.2, .7, .3, sube=False)                        # gira a 3/4
click(11.75, .35); thump(11.95, .55)                    # grosor + total
golpe(12.6, .55); thump(12.75, .4); whoosh(13.15, .25, .35); buzz(13.1, .25, .14)   # 0 apps
golpe(14.6, .55)
for i, f in enumerate([880, 740, 620, 520]): blip(14.7 + i * .1, f, .08, .22)        # barras que caen
chime(15.2, (1319, 1760), .3)                                                          # wifi propio
golpe(16.6, .55); thump(16.75, .4); ticks(16.8, 17.5, .035, .16)                      # 38 h
for t in (16.9, 17.57, 18.24): blip(t, 2000, .04, .1)

OFF = 7.4
# 6 · retrovisor
obturador(11.2, .45); thump(11.3, .4); thump(11.5, .4); blip(11.85, 990, .1, .2)
# 7 · QR
whoosh(13.4, .55, .6); thump(13.5, .4); thump(13.7, .4)
click(14.5, .35); barrido_tono(14.8, 15.6, 600, 1400, .08); blip(15.6, 1760, .12, .3); blip(15.72, 2350, .14, .25)
# 8 · NFC
obturador(15.8, .3); thump(15.9, .4); thump(16.1, .4); whoosh(16.6, .45, .35)
chime(16.65, (1319, 1760), .3); chime(17.55, (1319, 1760), .18)
# 9 · checklists
whoosh(18.2, .4, .55); whoosh(18.6, .3, .3); whoosh(18.95, .3, .3); sello(19.5, .8); buzz(19.52, .3, .14)
# 10 · dashcam
obturador(20.6, .5); thump(20.7, .4); thump(20.95, .4)
for t in np.arange(20.7, 22.9, .67): blip(t, 2000, .04, .1)
blip(21.3, 1400, .06, .25); blip(21.42, 1400, .06, .25); buzz(21.8, .5, .18)
# 11 · vuelve la señal
whoosh(23.0, .55, .6); thump(23.1, .4); click(23.6, .45); blip(23.7, 880, .08, .2); blip(23.8, 1320, .1, .25)
for i in range(6): blip(23.9 + i * .08, 900 + i * 180, .05, .15)
chime(24.5, (1568, 2093), .32)
# 12 · logo
golpe(26.2, .85); riser(28.6, 29.6, .25)
# 13 · firma
whoosh(29.6, .6, .55); thump(29.75, .5); chime(30.45, (784, 1175, 1568), .2)

y = np.tanh(out * 1.2)
y = y / np.max(np.abs(y)) * .85
st = np.stack([y, np.roll(y, int(SR * .0005))], axis=1)
w = wave.open(OUT, 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((st * 32767).astype(np.int16).tobytes()); w.close(); print('ok', OUT)
