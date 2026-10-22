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

## Fuentes

- `fuente/app/index.html`: prototipo navegable de la app del teléfono (`#/bienvenida` es la pantalla que aparece al tocar NFC o escanear el QR).
- `fuente/central/index.html`: prototipo navegable de PORTA Central.
- `fuente/3d/`: escenas three.js (`concepto.html` es el modelo aprobado) y sus scripts de render.
- `fuente/motion/`: animaciones HTML de los videos y su render.
- `fuente/pdf/propuesta.html`: fuente del PDF.
- `fuente/tools/`: capturas, mockups, PDF y overlay de la dashcam.

Regenerar desde `fuente/`: `node tools/capturas.js && node tools/capturas-central.js && node tools/mockups.js && node tools/mockups-central.js && node tools/pdf.js`
