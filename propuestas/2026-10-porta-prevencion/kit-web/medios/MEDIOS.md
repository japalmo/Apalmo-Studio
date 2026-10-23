# PORTA · medios para la web (optimizados)

Todo en `kit-web/medios/`. Imágenes en WebP (≤1600 px), videos H.264 con `faststart` y póster. Los originales en alta resolución están en `../../imagenes/` y `../../videos/`.

**Crédito obligatorio cerca de los medios:** "Prototipo conceptual: imágenes y videos referenciales (3D + IA)." Ninguna imagen es una foto real del equipo.

## Video

| Archivo | Qué es | Uso sugerido |
|---|---|---|
| `video/porta-reel-720.mp4` (+ `porta-reel-poster.jpg`) | Reel de Instagram, vertical 9:16, 51 s, con narración | Cabecera o cuerpo del artículo. `controls`, `playsinline`, `preload="none"`, sin autoplay con sonido |
| `video/porta-3d-giro-720.mp4` (+ `porta-3d-giro-poster.jpg`) | Giro 360° del modelo 3D y vista explosionada, 14 s, sin audio | "Por dentro"; puede ir en `autoplay muted loop playsinline` |

**No usar:** `../../videos/porta-como-funciona.mp4` y `porta-el-producto.mp4` (muestran la dashcam, fuera del alcance actual).

## Cuadros del reel (vertical 1080×1920, `cuadros-reel/`)

| Archivo | Muestra | Texto alternativo sugerido |
|---|---|---|
| `golpe-sin-senal.webp` | "Sin señal. Sin problema." | Texto "Sin señal. Sin problema." sobre fondo oscuro |
| `por-dentro.webp` | Vista explosionada con Raspberry Pi, 4G + GPS, 128 GB, NFC + QR | Vista explosionada de PORTA con sus componentes rotulados |
| `tamano.webp` | Regla: 7 × 4 × 3 cm | PORTA junto a una regla: mide 7 × 4 × 3 cm |
| `qr-afuera.webp` | Cara con el QR | Cara de PORTA hacia el parabrisas con el código QR |
| `nfc-adentro.webp` | Teléfono en la zona NFC | Teléfono acercándose a la zona NFC de PORTA |
| `checklists-semaforo.webp` | Semáforo Apto / Con observaciones / No apto | Checklist en el teléfono y semáforo con los tres resultados |
| `porta-central-sincronizado.webp` | Ficha CH-04 en PORTA Central, sincronizada por 4G | Ficha del vehículo CH-04 en PORTA Central con documentos al día |
| `escaneo-documentos-al-dia.webp` | Teléfono: "Documentos al día" | Teléfono conectado a PORTA mostrando "Documentos al día" |
| `firma.webp` | Firma "Design by apalmo" | (decorativa; alt vacío si se usa) |

## Imágenes referenciales generadas con IA (`imagenes/`)

| Archivo | Muestra | Usar |
|---|---|---|
| `00-problema-generador.webp` | Trabajador revisando un generador en faena, sin señal | Sí: sección del problema |
| `01-porta-bajo-retrovisor.webp` | PORTA bajo el espejo, camino de desierto | Sí: imagen principal / OG |
| `02-escaneo-qr-exterior.webp` | Prevencionista escanea el QR desde afuera | Sí |
| `03-toque-nfc.webp` | Conductor acerca el teléfono al NFC | Sí |
| `04-fatiga-amanecer.webp` | Conductor responde el checklist de fatiga al amanecer | Sí (es el checklist, no detección automática) |
| `05-oficina-porta-central.webp` | Prevencionista en PORTA Central desde la oficina | Sí |
| `06-charla-seguridad.webp` | Charla de seguridad junto a la camioneta, todos conectados | Sí |
| `07-producto-estudio.webp` | Las dos caras del equipo junto a un teléfono | Sí: tamaño y diseño |

**No usar:** `../../imagenes/ia/08-dashcam-cabina-ir.png` y `../../imagenes/dashcam/` (dashcam).

## Renders 3D (`renders/`)

`02-armado-3-4.webp` y `03-armado-transparente.webp` (fondo oscuro) sirven para hero o tarjetas. `01-explosionado.webp` rotula cámaras: usar solo si se recortan o se acepta que se vean (el mensaje no menciona dashcam).

## Interfaz (`mockups/`)

Composiciones 16:9 de PORTA Central (`composicion-central-documentos`, `-flota`) y de la app (`composicion-checklists`, `-documentos`), y pantallas sueltas de teléfono (`telefono-*`).
Ojo con la dashcam: `composicion-central-flota` tiene una columna "Dashcam" y `composicion-central-documentos` muestra "Dashcam" en el menú lateral (pequeño); preferir los cuadros del reel o recortar.
No se incluyeron `composicion-menu`, `composicion-central-vehiculo` ni `-alertas` (muestran el bloque de grabación, video y alertas de dashcam).

## Marca (`marca/`)

Logos PORTA en SVG (logotipo, isotipo, horizontal; versión normal y blanca). Logo de apalmo: el de la web (`WEB/packages/brand`), no repetir el isotipo junto al wordmark.
