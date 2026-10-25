# Tarjetas de bienvenida, promoción y llavero casita · AP-2026-005 Rev. 1

Revisión de la cotización AP-2026-005 (tarjeta de bienvenida) con precios unitarios:

| Ítem | Precio |
|---|---|
| Tarjeta de bienvenida NFC + QR con soporte de pared | $10.000 c/u |
| Tarjeta de promoción NFC + QR con stand de mesa | $10.000 c/u |
| Llavero casita (NFC al frente, QR por detrás) | $5.000 c/u |
| Ficha digital del departamento (pago único) | $15.000 |
| Vitrina de promoción, 2 deptos + autos (pago único, solo con tarjetas de promoción) | $8.000 |

Pedido base (2 bienvenida + ficha) = $35.000, igual que la versión anterior.

## Archivos

- `cotizacion.html` → fuente de la cotización; `Cotizacion-...-AP-2026-005-R1.pdf` es el PDF para enviar.
- `imagenes/` → renders 3D (fondo transparente), maqueta de la vitrina y logo/íconos tomados del PDF original.
- `fuente/3d/` → escena three.js de las piezas. `npm install` y luego `node render.js` (o `node render.js llavero-frente,promo`).
- `fuente/vitrina-telefono.html` → maqueta del celular con la vitrina (datos de ejemplo).
- `fuente/captura.js` → `node captura.js` captura la vitrina; `node captura.js pdf` genera el PDF.

## Pendiente para producción

- Los QR de los renders apuntan a URLs de ejemplo (`fuente/3d/qr.js`); cambiarlas por las URLs reales de la ficha y la vitrina.
- Nombres, fotos y precios de la vitrina son de ejemplo.
