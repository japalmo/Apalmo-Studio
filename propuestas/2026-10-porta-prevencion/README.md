# PORTA — documentación de faena a bordo, sin señal

Propuesta de innovación para Prevención de Riesgos: un mini computador (Raspberry Pi + carcasa impresa en 3D) que viaja en el vehículo, sincroniza una carpeta de Google Drive cuando tiene internet y, en terreno, crea su propia red Wi-Fi con un menú web de documentación y checklists (vehículo, fatiga y somnolencia, generador). Conexión rápida por etiqueta NFC o código QR.

## Entregables

| Archivo | Qué es |
|---|---|
| `PORTA-propuesta.pdf` | Documento de 11 páginas, no técnico: problema, solución, funcionamiento, menú, checklists, lista de compras con precios, carcasa 3D, stack explicado en simple, beneficios y anexos. |
| `videos/porta-como-funciona.mp4` | Motion graphics explicativo (1920×1080). |
| `videos/porta-3d-giro.mp4` | Animación 3D: giro 360° y vista explosionada. |
| `imagenes/renders-3d/` | Renders del equipo armado y explosionado. |
| `imagenes/mockups/` | Pantallas del menú en marco de teléfono (PNG transparente) y composiciones 16:9 para diapositivas. |
| `imagenes/ia/` | Escenas de uso en terreno generadas con IA (referenciales, sin marcas reales). |
| `imagenes/motion-fotogramas/` | Fotogramas del video explicativo. |

## Fuentes

- `fuente/app/index.html` — prototipo funcional de la interfaz (abrir en cualquier navegador; `#/bienvenida` es la pantalla que aparece al tocar NFC). Base para la demo local.
- `fuente/capturas/` — capturas 390×844 @3x de la app.
- `fuente/tools/capturas.js` → capturas · `fuente/tools/mockups.js` → mockups · `fuente/tools/pdf.js` → PDF.
- `fuente/pdf/propuesta.html` — fuente del PDF.
- `fuente/3d/` — escena three.js y render de imágenes/video 3D.
- `fuente/motion/` — animación HTML del video explicativo y su render.
- Imágenes IA: archivo Figma «PORTA – imágenes IA presentación» (https://www.figma.com/design/DD44XnA5PNoMebLEiwrHP9).

Regenerar (desde `fuente/`): `node tools/capturas.js && node tools/mockups.js && node tools/pdf.js`
