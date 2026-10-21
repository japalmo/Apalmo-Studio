# Video de cumpleaños — "Feliz cumpleaños, mi amor"

Collage animado vertical (1080x1920, 44 s) que narra la conexión Antofagasta ↔ Mallorca.

- `feliz_cumpleanos_mi_amor.mp4` — entrega final con música.
- `fuente/index.html` — animación HTML/CSS (Web Animations API, escenas con tiempos absolutos).
- `fuente/render.js` — renderiza cuadro a cuadro con Playwright/Chromium y codifica con ffmpeg (`node render.js full`).
- `fuente/music.py` — pista de piano sintetizada (`python3 music.py` genera `music.wav`).
- `fuente/tools/map.js` — proyección del mapa (d3-geo + world-atlas) → `fuente/data/map.js`.
- `fuente/stickers/` — iconografía (jet, Mano del Desierto, La Portada, Catedral de Palma, gorra, torta, globos).

Re-render: `cd fuente && python3 music.py && node render.js full && ffmpeg -i video_silent.mp4 -i music.wav -c:v copy -c:a aac -shortest salida.mp4`
