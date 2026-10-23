# Convierte los clips IA en secuencias de cuadros para reel3.html y escribe clips/clips.js.
#
#   python clips/preparar.py            (desde reel/)
#
# Fuentes en clips/fuente/. Si un clip viene en varias partes (Firefly genera ~5-8 s), se listan en clips/montaje.json:
#   { "inicio": [["inicio-1.mp4", 0.0, 5.0], ["inicio-2.mp4", 0.3, 5.0]], "cierre": [["cierre-1.mp4", 0, 4.5], ...] }
# (archivo, segundo inicial, segundo final). Si no hay montaje.json se usa clips/fuente/<nombre>.mp4 completo.
# Si todavía no existe ningún video de ese clip, se generan cuadros de marcador con la lista de tomas del guion.
# Pantallas reales del teléfono: por defecto van como inserto a pantalla completa (clips/insertos.json: segundos dentro de cada clip).
# También se pueden pegar sobre el teléfono del clip con esquinas por segundo en clips/pantallas.json (ver reel3.html).
import json, pathlib, subprocess, shutil, sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance

AQUI = pathlib.Path(__file__).parent
FUENTE = AQUI / 'fuente'
FONT = AQUI.parent.parent / 'demo' / 'comun' / 'fuentes'
W, H, FPS = 1080, 1920, 30
TOMAS = {
    'inicio': (10.0, AQUI.parent / 'referencias-ia' / 'ref-2-conductor.png', [
        (0.0, 'Botas en el ripio'), (1.5, 'Golpea la ventana'), (3.0, 'Conductor nervioso'), (4.5, 'Pantalla: sin señal'),
        (6.0, '«Es que… no tengo señal»'), (7.5, 'Ella, decepcionada'), (9.0, 'Toma aérea: camioneta sola')]),
    'cierre': (8.0, AQUI.parent / 'referencias-ia' / 'ref-4-montaje-retrovisor.png', [
        (0.0, 'Escanea el QR por el parabrisas'), (1.5, 'Check verde en su teléfono'), (3.0, 'Pulgar arriba / alivio'),
        (4.5, 'Encendido, LED verde de PORTA'), (6.0, 'Se va dejando polvo')]),
}


def ff(args):
    subprocess.run(['ffmpeg', '-v', 'error', '-y', *args], check=True)


def marcador(nombre):
    dur, ref, tomas = TOMAS[nombre]
    out = AQUI / nombre; shutil.rmtree(out, ignore_errors=True); out.mkdir()
    fondo = Image.open(ref).convert('RGB')
    s = max(W / fondo.width, H / fondo.height); fondo = fondo.resize((int(fondo.width * s) + 1, int(fondo.height * s) + 1))
    fondo = fondo.crop(((fondo.width - W) // 2, (fondo.height - H) // 2, (fondo.width - W) // 2 + W, (fondo.height - H) // 2 + H))
    fondo = ImageEnhance.Brightness(fondo.filter(ImageFilter.GaussianBlur(18))).enhance(.45)
    f1 = ImageFont.truetype(str(FONT / 'Inter-ExtraBold.otf'), 64); f2 = ImageFont.truetype(str(FONT / 'JetBrainsMono-Bold.ttf'), 34)
    n = round(dur * FPS)
    for i in range(n):
        t = i / FPS; k = max(j for j, (t0, _) in enumerate(tomas) if t >= t0)
        im = fondo.copy(); d = ImageDraw.Draw(im)
        d.text((W / 2, 860), f'CLIP IA · {nombre.upper()} · PENDIENTE', font=f2, fill=(255, 122, 46), anchor='mm')
        d.text((W / 2, 960), f'Toma {k + 1}: {tomas[k][1]}', font=f1, fill=(255, 255, 255), anchor='mm')
        d.text((W / 2, 1050), f'{t:4.1f} s / {dur:.0f} s', font=f2, fill=(170, 180, 190), anchor='mm')
        im.save(out / f'{i:04d}.jpg', quality=82)
    return n


RETOQUES = json.loads((AQUI / 'retoques.json').read_text(encoding='utf-8')) if (AQUI / 'retoques.json').exists() else {}


def retocado(arch):
    """aplica los difuminados de clips/retoques.json ({archivo: [[t0, t1, x, y, w, h], ...]} en px del video original)"""
    cajas = [c for c in RETOQUES.get(arch, []) if not isinstance(c, str)]
    if not cajas: return FUENTE / arch
    out = FUENTE / f'_ret_{arch}'
    fc, prev = [], '0:v'
    for k, (t0, t1, x, y, w, h) in enumerate(cajas):
        fc.append(f"[{prev}]split[b{k}][c{k}];[c{k}]crop={w}:{h}:{x}:{y},boxblur=12:3,format=rgba,geq=r='r(X,Y)':g='g(X,Y)':b='b(X,Y)':a='255*clip(min(min(X,W-1-X),min(Y,H-1-Y))/12,0,1)'[d{k}];[b{k}][d{k}]overlay={x}:{y}:enable='between(t,{t0},{t1})'[o{k}]")
        prev = f'o{k}'
    ff(['-i', str(FUENTE / arch), '-filter_complex', ';'.join(fc), '-map', f'[{prev}]', '-map', '0:a?', '-c:v', 'libx264', '-crf', '12', '-pix_fmt', 'yuv420p', '-c:a', 'copy', str(out)])
    return out


def desde_videos(nombre, partes):
    out = AQUI / nombre; shutil.rmtree(out, ignore_errors=True); out.mkdir()
    tmp = AQUI / f'_{nombre}.mp4'
    ins, fc = [], []
    for k, (arch, a, b) in enumerate(partes):
        ins += ['-i', str(retocado(arch))]
        fc.append(f'[{k}:v]trim=start={a}:end={b},setpts=PTS-STARTPTS,fps={FPS},scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},setsar=1[v{k}]')
    fc.append(''.join(f'[v{k}]' for k in range(len(partes))) + f'concat=n={len(partes)}:v=1:a=0[v]')
    ff([*ins, '-filter_complex', ';'.join(fc), '-map', '[v]', '-c:v', 'libx264', '-crf', '12', '-pix_fmt', 'yuv420p', str(tmp)])
    ff(['-i', str(tmp), '-start_number', '0', '-q:v', '3', str(out / '%04d.jpg')])
    tmp.unlink()
    return len(list(out.glob('*.jpg')))


montaje = json.loads((AQUI / 'montaje.json').read_text(encoding='utf-8')) if (AQUI / 'montaje.json').exists() else {}
cuadros = {}
for nombre in ('inicio', 'cierre'):
    partes = montaje.get(nombre) or ([[f'{nombre}.mp4', 0, 999]] if (FUENTE / f'{nombre}.mp4').exists() else None)
    cuadros[nombre] = desde_videos(nombre, partes) if partes else marcador(nombre)
    print(nombre, cuadros[nombre], 'cuadros', '(video)' if partes else '(marcador)')
pant = json.loads((AQUI / 'pantallas.json').read_text(encoding='utf-8')) if (AQUI / 'pantallas.json').exists() else {}
ins = json.loads((AQUI / 'insertos.json').read_text(encoding='utf-8')) if (AQUI / 'insertos.json').exists() else {'pantA': [4.5, 6.0], 'pantB': [1.5, 3.0]}
(AQUI / 'clips.js').write_text(f'window.CLIPS = {json.dumps(cuadros)};\nwindow.PANTALLAS = {json.dumps(pant)};\nwindow.INSERTOS = {json.dumps(ins)};\n', encoding='utf-8')
print('ok clips.js')
