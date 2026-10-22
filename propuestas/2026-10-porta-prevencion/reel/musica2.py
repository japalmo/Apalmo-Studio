# Pista sintetizada para el reel de PORTA: intro tensa, "drop" en la presentación del producto,
# golpes en los cortes y cierre limpio. Uso: python3 musica.py <salida.wav>
import numpy as np, wave, sys
SR = 44100; TOTAL = 33.0; BPM = 124; B = 60 / BPM
OUT = sys.argv[1] if len(sys.argv) > 1 else 'musica.wav'
out = np.zeros(int(SR * TOTAL))
rng = np.random.default_rng(7)
def f(m): return 440 * 2 ** ((m - 69) / 12)
def add(sig, t):
    i = int(SR * t)
    if i >= len(out): return
    e = min(len(out), i + len(sig)); out[i:e] += sig[:e - i]
def T(d): return np.arange(int(SR * d)) / SR
def kick(t, v=.9):
    x = T(.45); fr = 45 + 110 * np.exp(-x * 28)
    add(np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-x * 7) * v, t)
def hat(t, v=.12):
    x = T(.06); add(rng.standard_normal(len(x)) * np.exp(-x * 70) * v, t)
def clap(t, v=.35):
    x = T(.25); n = rng.standard_normal(len(x))
    env = np.exp(-x * 18) + .6 * np.exp(-((x - .012) ** 2) / 1e-5)
    add(np.convolve(n, [1, -1], 'same') * env * v, t)
def bass(m, t, d, v=.32):
    x = T(d); s = np.sign(np.sin(2 * np.pi * f(m) * x)) * .35 + np.sin(2 * np.pi * f(m) * x)
    add(np.convolve(s, np.ones(12) / 12, 'same') * np.minimum(1, x / .01) * np.exp(-x * 2.2) * v, t)
def pluck(m, t, v=.14):
    x = T(.5); s = np.sin(2 * np.pi * f(m) * x) + .3 * np.sin(2 * np.pi * 2 * f(m) * x)
    add(s * np.exp(-x * 7) * (1 - np.exp(-x * 400)) * v, t)
def pad(ms, t, d, v=.05):
    x = T(d); env = np.minimum(1, x / .6) * np.minimum(1, (d - x) / .6)
    add(sum(np.sin(2 * np.pi * f(m) * x) + .5 * np.sin(2 * np.pi * f(m) * 1.004 * x) for m in ms) * env * v, t)
def impacto(t, v=.7):
    x = T(1.6); add((np.sin(2 * np.pi * 38 * x) * .9 + rng.standard_normal(len(x)) * .25 * np.exp(-x * 9)) * np.exp(-x * 2.6) * v, t)
def riser(t0, t1, v=.18):
    x = T(t1 - t0); n = rng.standard_normal(len(x)); k = x / x[-1]
    n = np.convolve(n, np.ones(6) / 6, 'same')
    add(n * k ** 2 * v + np.sin(2 * np.pi * (200 + 900 * k ** 2) * x) * k ** 2 * v * .4, t0)
def tick(t, v=.25):
    x = T(.03); add(np.sin(2 * np.pi * 2400 * x) * np.exp(-x * 160) * v, t)

# acordes (La menor): Am - F - C - G
prog = [(45, [57, 60, 64]), (41, [57, 60, 65]), (48, [55, 60, 64]), (43, [55, 59, 62])]
# 0 – 3.2: gancho tenso (tic de reloj, golpes secos)
for k in range(int(3.1 / (B / 2))): tick(k * B / 2, .16 if k % 2 else .28)
pad([57, 60, 64], 0, 3.3, .04)
kick(.05, .8); kick(.95, .7); impacto(1.8, .45); kick(2.5, .6)
riser(2.2, 3.2, .24)
# 3.2 – 29.6: groove
impacto(3.2, .95)
t = 3.2; i = 0
while t < 29.5:
    root, ch = prog[i % 4]
    pad(ch, t, 4 * B + .4, .035)
    for k in range(4):
        kick(t + k * B)
        if k in (1, 3): clap(t + k * B)
        hat(t + k * B + B / 2, .14); hat(t + k * B + B / 4, .05); hat(t + k * B + 3 * B / 4, .05)
        bass(root, t + k * B, B * .9); bass(root + 12 if k == 3 else root, t + k * B + B / 2, B * .45, .22)
    if t > 5.5:
        for k, n in enumerate([0, 2, 1, 2, 0, 2, 1, 2]): pluck(ch[n] + 12, t + k * B / 2, .12 if k % 2 else .16)
    t += 4 * B; i += 1
for c in (9.2, 13.4, 18.2, 23.0): impacto(c, .55)
for c in (9.2, 9.7, 10.2, 10.7): tick(c, .4)
riser(28.4, 29.6, .2)
# 29.6 – 33: cierre
impacto(29.6, .8); pad([57, 60, 64, 69], 29.6, 3.4, .05); pluck(69, 29.7, .2); pluck(76, 30.2, .14)

y = out.copy()
for d, g in [(.031, .25), (.057, .2), (.089, .15), (.13, .1)]:
    n = int(SR * d); z = np.zeros_like(out); z[n:] = out[:-n] * g; y += z
y = np.tanh(y * 1.4)
fade = np.ones_like(y); n = int(SR * 2.5); fade[-n:] = np.linspace(1, 0, n); y *= fade
y = y / np.max(np.abs(y)) * .8
st = np.stack([y, np.roll(y, int(SR * .0006))], axis=1)
w = wave.open(OUT, 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((st * 32767).astype(np.int16).tobytes()); w.close(); print('ok', OUT)
