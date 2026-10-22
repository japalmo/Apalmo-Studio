# PORTA · traspaso a una sesión local

> Pega este archivo completo como primer mensaje en una sesión nueva de Claude Code, abierta en tu computador dentro del repositorio `Apalmo-Studio`.

---

## Para ti, Claude (sesión local)

Retomas un proyecto ya muy avanzado. Lee este archivo completo antes de hacer nada.

### 1. Repositorio, rama e historial

- Repositorio: `japalmo/apalmo-studio` (GitHub).
- **Rama de trabajo: `propuesta-porta-prevencion`**. Todo lo hecho está ahí, con un commit por paso. Empieza con:
  ```
  git fetch origin propuesta-porta-prevencion
  git checkout propuesta-porta-prevencion
  git pull
  ```
- Carpeta del proyecto: `propuestas/2026-10-porta-prevencion/`. Lee su `README.md`: lista todos los entregables y cómo regenerarlos.
- Historial completo de decisiones: `git log --oneline propuesta-porta-prevencion` y los mensajes de cada commit.
- La conversación original fue en la sesión web `https://claude.ai/code/session_01GmVQYSsr4keTbuhSVcRCzV`. Probablemente no puedas abrirla tú; Juan sí puede, si necesitas confirmar algo. Este archivo resume todo lo que importa.

### 2. Qué es PORTA (contexto)

- Juan (apalmo studio) le regaló a un amigo, estudiante de Prevención de Riesgos, una idea completa para presentar en la universidad.
- Además, Juan lo publicará en redes como **un concepto propio en desarrollo**: "PORTA by apalmo".

**El producto:** una caja grafito de **7 × 4 × 3 cm**, más chica que un celular, **abrazada al pie del espejo retrovisor** con un anillo naranjo.
- **Cara hacia la cabina:** zona NFC naranja "Acerca tu teléfono", cámara interior infrarroja y LED verde.
- **Cara hacia el parabrisas:** código QR, que se escanea desde afuera, y cámara frontal.
- **Adentro:** Raspberry Pi Zero 2 W, 4G LTE con SIM y GPS, y microSD.

**Funciones:**
- Guarda la documentación de la faena y crea su propia red Wi-Fi, para consultarla desde el celular sin señal.
- Checklists: vehículo, fatiga y somnolencia, generador.
- Dashcam doble.
- Se actualiza por 4G desde un portal web llamado **PORTA Central**, sin sacar nunca el equipo del vehículo.

### 3. Decisiones ya tomadas (no las cambies sin preguntar)

- **Diseño del equipo aprobado:** el de `imagenes/ia/07-producto-estudio.png` y `imagenes/ia/01-porta-bajo-retrovisor.png`. Las imágenes en `imagenes/ia-v1-descartadas/` y `imagenes/concepto/concepto-v1.png` son diseños viejos: no las uses.
- **Logo PORTA aprobado:** está en `marca/` (SVG y PNG transparentes, generados por `marca/logo.js`). La P del isotipo y la del logotipo son la misma forma.
- **Logo de apalmo:** `marca/apalmo/`. Firma del reel: "PORTA by apalmo · concepto en desarrollo" (arriba) y "Design by apalmo" (cierre).
- **El reel no lleva música, solo efectos de sonido.** Juan agrega una canción de moda en la app.
- **El PDF para el amigo no lleva precios de venta,** porque es una idea regalada y no una oferta. Solo lleva la lista de materiales (≈ $230.000).
- **Fotos con personas:** siempre referenciales, sin logos ni marcas reales (ni Codelco, ni CAT, etc.).
- **Legal:** Juan evalúa registrar la marca en INAPI y un diseño industrial. **No publicar el reel ni los renders** hasta que él lo confirme.

### 4. Dónde está cada cosa (dentro de `propuestas/2026-10-porta-prevencion/`)

| Qué | Dónde |
|---|---|
| PDF para la presentación (15 págs.) | `PORTA-propuesta.pdf` · fuente `fuente/pdf/propuesta.html` · `node fuente/tools/pdf.js` |
| Videos | `videos/` (cómo funciona, el producto, giro 3D, reel sin música `porta-reel-apalmo-studio-sfx.mp4`) |
| Reel actual (33 s, vertical) | `reel/reel2.html` + `reel/engine.js` + `reel/render.js` + `reel/sfx.py` |
| Tomas 3D verticales del reel | se generan con `fuente/3d/tomas-reel.js` → `reel/tomas3d/` (ignorado en git) |
| Modelo 3D (three.js) | `fuente/3d/producto.html` (modos `video`, `explosionado`, `armado`, `reel`) |
| Prompts de los clips IA | **`reel/PROMPTS-VIDEO-IA.md`** · referencias en **`reel/referencias-ia/`** |
| Fotos IA aprobadas | `imagenes/ia/00…08` |
| Mockups (teléfono, notebook) | `imagenes/mockups/` |
| App del trabajador y PORTA Central | `fuente/app/`, `fuente/central/` |
| Demo local para la presentación | `demo/INICIAR-DEMO.html` + `demo/LEEME - como usar la demo.txt` |
| Demo en línea (Apps Script) | `demo-online/` + `INSTRUCCIONES.txt` (aún sin publicar ni probar en Apps Script real) |

### 5. Tu tarea ahora

**Objetivo:** generar los dos clips cinematográficos con IA (inicio y cierre) e integrarlos al reel.

**Paso A · Generar los clips. Primero prueba con Adobe Firefly.**
1. Lee `reel/PROMPTS-VIDEO-IA.md`. Tiene los dos prompts completos con sus tomas:
   - **Inicio (10 s):** la prevencionista le pide los documentos al conductor, él no tiene señal, ella queda decepcionada.
   - **Cierre (8 s):** ella escanea el QR de PORTA, pulgar arriba y el conductor sigue su camino.
2. Revisa qué herramientas de Adobe Firefly tienes en esta sesión. Si hay un conector o MCP de Adobe que **genere video**, úsalo directamente. Si no, guía a Juan para que lo haga en firefly.adobe.com, o usa el navegador si tienes acceso a él.
3. Formato: vertical 9:16, sin música, referencias en `reel/referencias-ia/`:
   - **Inicio:** `ref-1` (fiscalizadora) y `ref-2` (conductor).
   - **Cierre:** las cuatro: `ref-1` y `ref-2`, más `ref-3` (producto) y `ref-4` (montaje en el retrovisor).
   - Genera primero el inicio y usa un cuadro de ese resultado como referencia extra del cierre, para que los personajes y la camioneta salgan iguales.
4. Firefly genera clips cortos (~5 s). Divide cada prompt en 2 o 3 partes con las mismas tomas y únelas después.
5. **Revisa cada resultado antes de seguir:** que el equipo se parezca al aprobado, que no haya logos y que las caras se mantengan. Muéstraselo a Juan y espera su visto bueno.
6. **Si Firefly no da un buen resultado, avísale a Juan:** él le carga créditos a **Higgsfield**. Ahí usa **Seedance 2.0** (varias referencias, buena consistencia) o **Cinema Studio Video v2** (opción `multi_shots`). Hoy la cuenta tiene 0 créditos y plan Starter: Seedance solo funciona en modo `fast` a 720p.

**Paso B · Integrar los clips al reel.**
1. Convierte cada clip en una secuencia de cuadros, igual que las tomas 3D:
   ```
   ffmpeg -i inicio.mp4 -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30" -start_number 0 -q:v 3 reel/clips/inicio/%04d.jpg
   ```
   `reel2.html` ya tiene la función `seq(id, carpeta, t0, n)`, que muestra secuencias desde `tomas3d/`. Ajústala para que también lea `clips/`.
2. **Nueva estructura del reel:**
   1. clip de inicio (~10 s);
   2. golpe de texto **"Sin señal. Sin problema."**;
   3. las escenas actuales desde "entra el equipo" (3D) hasta "la alerta llega sola";
   4. clip de cierre (~8 s);
   5. firma "Design by apalmo".

   Saca las escenas actuales 1 y 2 ("En faena no hay señal" / "¿Y los procedimientos?"), porque el clip ya cuenta eso. Mantén el reel por debajo de ~45 s, idealmente 40.
3. **Sobre las pantallas de celular de los clips,** pon las pantallas reales (las IA no escriben bien):
   - **En el inicio:** "Sin servicio" con las barras vacías.
   - **En el cierre:** la conexión a PORTA y un check verde de "documentos al día".
   - Hay mockups en `imagenes/mockups/` y capturas en `fuente/capturas/`.
4. Ajusta `reel/sfx.py` a los nuevos tiempos. Suma ambiente de desierto, pasos en el ripio y golpe en la ventana para el inicio, y bip del escaneo, motor arrancando y polvo para el cierre. **Sin música.**
5. Renderiza y entrega:
   ```
   cd reel && python3 sfx.py sfx.wav && node render.js reel2.html full silent.mp4 && ffmpeg -i silent.mp4 -i sfx.wav -c:v copy -c:a aac -shortest ../videos/porta-reel-apalmo-studio-sfx.mp4
   ```
   Revisa fotogramas antes del render final (`node render.js reel2.html preview 1,5,12,…`).

### 6. Detalles técnicos para tu computador

- Los scripts usan `require('/opt/node-tools/node_modules/playwright')`, una ruta del entorno en la nube. En tu equipo, instala Playwright (`npm i -D playwright` y `npx playwright install chromium`) y cambia ese `require` por `require('playwright')` en los scripts que uses (`reel/render.js`, `fuente/3d/tomas-reel.js`, `fuente/tools/*.js`, `marca/logo.js`).
- El modelo 3D necesita `npm install` dentro de `fuente/3d/` (three y qrcode).
- Las tomas 3D se regeneran con `cd fuente/3d && node tomas-reel.js ../../reel/tomas3d`. WebGL corre con `--use-angle=swiftshader`; en tu equipo puede andar más rápido con la GPU.
- Necesitas `ffmpeg`, Python 3 con `numpy` y `Pillow`, y las fuentes **Inter** y **JetBrains Mono** instaladas en el sistema, porque el reel y el PDF las usan. Están en `demo/comun/fuentes/` si hay que instalarlas.
- Trabaja siempre en la rama `propuesta-porta-prevencion`. Haz commit y push después de cada avance, con mensajes en español como los anteriores.

### 7. Pendientes que quedaron abiertos (pregúntale a Juan antes de tocarlos)

- **Logo nuevo:** todavía no está en el PDF, la app, PORTA Central ni las demos, que siguen con el ícono provisorio.
- **"⚠ posible somnolencia":** el reel muestra ese aviso en la escena de la dashcam, como si el equipo lo detectara solo. Hoy esa función es una idea a futuro y podría cambiarse por "⚑ incidente marcado".
- **Demo en línea (Apps Script):** falta publicarla y probarla de verdad (instrucciones en `demo-online/INSTRUCCIONES.txt`).
- **Legal:** borrador del acuerdo de uso para el amigo, vistas técnicas para un diseño industrial (desde el modelo 3D) y búsqueda de "PORTA" en INAPI (clases 9, 42 y 38).
- **Drive:** subir todo a la carpeta de Drive "Garvanzo" (`https://drive.google.com/drive/folders/1EmEzq3MQAZFmMfBogGFanrpJ2kAoBW12`). El conector de la nube no podía subir archivos binarios; en local quizás sí.
