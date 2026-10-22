# PORTA — documentación, checklists y dashcam a bordo, sin señal

Propuesta de innovación para Prevención de Riesgos. PORTA es un equipo de 7 × 4 × 3 cm (Raspberry Pi Zero 2 W + 4G con SIM y GPS + dos cámaras) que va abrazado al pie del espejo retrovisor:

- **Hacia la cabina:** zona NFC “Acerca tu teléfono”, cámara interior infrarroja y LED de estado.
- **Hacia el parabrisas:** código QR, que se escanea desde afuera del vehículo, y cámara frontal.
- **Sin señal:** crea su propia red Wi-Fi con un menú web de documentos y checklists (vehículo, fatiga y somnolencia, generador).
- **Con señal (4G):** recibe los documentos publicados en **PORTA Central** y envía checklists, alertas y videos marcados. Nunca hay que sacarlo del vehículo.

## Entregables

| Archivo | Qué es |
|---|---|
| `PORTA-propuesta.pdf` | Documento de 14 páginas, no técnico: problema, solución, funcionamiento, equipo, menú, checklists, PORTA Central, dashcam, lista de materiales, carcasa 3D, stack, beneficios y anexos. |
| `videos/porta-como-funciona.mp4` | Motion graphics explicativo (~1 min). |
| `videos/porta-el-producto.mp4` | Spot del producto (~35 s). |
| `videos/porta-3d-giro.mp4` | Modelo 3D: giro 360° y vista explosionada. |
| `imagenes/ia/` | Fotos IA del modelo aprobado (referenciales, sin marcas reales). |
| `imagenes/renders-3d/` | Renders del modelo 3D (armado y explosionado). |
| `imagenes/mockups/` | App en teléfono y PORTA Central en notebook, sueltos (PNG transparente) y en composiciones 16:9. |
| `imagenes/concepto/` | Modelo de concepto aprobado y referencias usadas para generar las fotos IA. |
| `imagenes/dashcam/` | Cuadro de la cámara interior con los datos de la dashcam. |

## Demo para la presentación

`demo/INICIAR-DEMO.html` se abre con doble clic, sin internet ni instalación. Muestra en una pantalla el equipo PORTA (interruptor de señal 4G, conexión por NFC/QR), el teléfono del trabajador y PORTA Central conectados entre sí, con una guía de 7 pasos. El guion está en `demo/LEEME - como usar la demo.txt` y hay PDFs para arrastrar en `demo/documentos-ejemplo/`.

## Demo en línea (Google Apps Script)

`demo-online/` trae `Code.gs`, `App.html` y `Central.html` para publicarla como aplicación web gratuita (pasos en `demo-online/INSTRUCCIONES.txt`). El proyector abre PORTA Central con un QR; los celulares que lo escanean usan la app del trabajador y todo se sincroniza en vivo.

## Fuentes

- `fuente/app/index.html`: prototipo navegable de la app del teléfono (`#/bienvenida` es la pantalla que aparece al tocar NFC o escanear el QR).
- `fuente/central/index.html`: prototipo navegable de PORTA Central.
- `fuente/3d/`: escenas three.js (`concepto.html` es el modelo aprobado) y sus scripts de render.
- `fuente/motion/`: animaciones HTML de los videos y su render.
- `fuente/pdf/propuesta.html`: fuente del PDF.
- `fuente/tools/`: capturas, mockups, PDF y overlay de la dashcam.

Regenerar desde `fuente/`: `node tools/capturas.js && node tools/capturas-central.js && node tools/mockups.js && node tools/mockups-central.js && node tools/pdf.js`

## Reel para redes (apalmo studio)

`videos/porta-reel-apalmo-studio-sfx.mp4`: video vertical 1080×1920 de 40 s, solo con efectos de sonido (la música se agrega en la app), presentado como concepto en desarrollo, con tomas 3D verticales, datos animados y firma "Design by apalmo". Fuente en `reel/reel2.html` + `reel/musica2.py` (la versión anterior es `reel.html`).
Para volver a generarlo:
1. Tomas 3D (desde `fuente/3d/`): `node tomas-reel.js ../../reel/tomas3d` (incluye la toma `medida` de la escena del tamaño)
2. Desde `reel/`: `python3 sfx.py sfx.wav && node render.js reel2.html full silent.mp4 && ffmpeg -i silent.mp4 -i sfx.wav -c:v copy -c:a aac -shortest ../videos/porta-reel-apalmo-studio-sfx.mp4`

Prompts para los clips de inicio y cierre generados con IA: `reel/PROMPTS-VIDEO-IA.md` (referencias en `reel/referencias-ia/`).

## Reel v3 con clips IA (en curso)

`reel/reel3.html` reorganiza el reel: **clip IA de inicio → "Sin señal. Sin problema." → escenas actuales (equipo … la alerta llega sola) → clip IA de cierre → firma**. Se genera desde `reel2.html` (que no se toca) con `python reel/hacer_reel3.py`.

- Clips: dejar los MP4 en `reel/clips/fuente/` y, si vienen en partes, copiar `clips/montaje.ejemplo.json` como `clips/montaje.json`. Luego `python reel/clips/preparar.py` los convierte en cuadros y escribe `clips/clips.js`. Sin videos, genera marcadores con la lista de tomas.
- Pantallas de celular: insertos gráficos propios (sin servicio / documentos al día), con tiempos en `clips/insertos.json`.
- Sonido: `python reel/sfx3.py sfx3.wav` (sin música; ambiente de desierto, ripio, ventana, escaneo, motor y polvo).
- Render (desde `reel/`): `python sfx3.py sfx3.wav && node render.js reel3.html full silent.mp4 && ffmpeg -i silent.mp4 -i sfx3.wav -c:v copy -c:a aac -shortest ../videos/porta-reel-apalmo-studio-sfx.mp4`
- Cómo generar los clips en Firefly (imagen clave + video por toma): `reel/PROMPTS-FIREFLY.md`.

En un computador local: `cd fuente/3d && npm install` (instala three, qrcode y Playwright). `fuente/3d/pw.js` carga Playwright en la nube o en local y usa el Google Chrome instalado si Playwright no tiene su propio navegador. Las fuentes Inter y JetBrains Mono se cargan desde `demo/comun/fuentes/`.
