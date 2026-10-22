# PORTA · clips IA con Adobe Firefly (paso a paso)

Complementa `PROMPTS-VIDEO-IA.md`. Está pensado para cómo funciona Firefly hoy: el generador de video acepta **primer y último fotograma**, no varias imágenes de referencia. Por eso se hace en dos pasos:

1. **Imagen clave por toma** (Firefly › Generar imagen, 9:16), usando las referencias de `referencias-ia/`. Aquí se fijan las caras, la camioneta y el equipo PORTA.
2. **Video desde esa imagen** (Firefly › Generar video, 9:16, 8 s, imagen clave como **Primer** fotograma).

Las dos pantallas de celular (sin señal / documentos al día) **no se generan con IA**: el reel ya las tiene como insertos gráficos con el texto correcto. Eso ahorra dos tomas.

## Ajustes

- **Imagen:** relación 9:16. Elige un modelo que permita subir **varias imágenes de referencia** (si el que eliges acepta solo una, sube la de la persona que más se ve en la toma).
- **Video:** modelo Veo 3.1 (o el mejor disponible en tu plan), 9:16, 8 s. Audio **apagado**, salvo en V2, donde el conductor dice la frase.
- Revisa cada imagen clave antes de animarla: sin logos, chalecos y cascos lisos, misma cara en todas las tomas y, en el cierre, el equipo igual a `ref-3` y `ref-4`.
- Descarga cada video y déjalo en `reel/clips/fuente/` con el nombre indicado (`inicio-1.mp4`, …). Yo los corto y los uno.

## Estilo común (pégalo al final de cada prompt)

```
Realistic documentary film still, vertical 9:16, warm golden-hour light, dust in the air, Atacama desert mining road in northern Chile, shallow depth of field. No text, no logos or brand names anywhere (helmets, vests, truck, steering wheel).
```

Personajes (igual en todas): **ella** = prevencionista latinoamericana de unos 30 años, casco blanco liso, lentes de sol, chaleco naranjo liso, con una tablet (`ref-1`). **Él** = conductor latinoamericano de unos 30 años, barba corta, casco blanco liso, lentes de sol subidos, chaleco naranjo reflectante liso (`ref-2`). Camioneta = pickup blanca lisa y polvorienta.

---

## Clip de inicio (≈10 s) · "no tengo señal"

| Toma | Imagen clave (refs) | Video (8 s) | Archivo | Se usa |
|---|---|---|---|---|
| 1–2 | K1 (`ref-1`) | V1 | `inicio-1.mp4` | ~3 s |
| 3 y 5 | K2 (`ref-2`) | V2 (con audio) | `inicio-2.mp4` | ~3 s (el inserto del teléfono va entremedio) |
| 6 | K3 (`ref-1`) | V3 | `inicio-3.mp4` | ~1.5 s |
| 7 | K4 (sin refs) | V4 | `inicio-4.mp4` | ~1 s |

**K1** (`ref-1`)
```
Low ground-level shot of the dusty safety boots of a female occupational safety inspector walking on gravel toward a parked plain white pickup truck at a remote desert checkpoint, her orange vest and tablet partly visible, truck in the background.
```
**V1** (primer fotograma K1)
```
The camera tracks low behind her boots crunching on the gravel, then rises as she reaches the driver window of the white pickup and knocks on the glass with her knuckles, leaning in to ask for the vehicle documents. Handheld, natural motion, dust kicking up.
```

**K2** (`ref-2`)
```
Close-up of a Latin American male driver sitting in the driver seat of a dusty white pickup, plain white hard hat, sunglasses pushed up, orange reflective vest, holding a smartphone, nervous forced smile, desert light through the side window.
```
**V2** (primer fotograma K2, audio encendido)
```
The driver anxiously checks his phone, frowns at the screen, then looks up apologetically toward the window and says in Chilean Spanish: "Es que… no tengo señal." Subtle handheld camera. Only ambient desert sound and his voice, no music.
```

**K3** (`ref-1`)
```
Close-up of the female safety inspector standing outside the pickup's driver window, disappointed expression, holding a tablet, desert behind her.
```
**V3** (primer fotograma K3)
```
She sighs, slowly shakes her head and writes a note on her tablet. Handheld, shallow depth of field.
```

**K4** (sin referencias)
```
High aerial view of a lone dusty white pickup truck parked on an empty gravel road in the vast Atacama desert, no antennas, no towns, long shadows.
```
**V4** (primer fotograma K4)
```
Fast drone pull-back rising away from the lone pickup, revealing the immense empty desert.
```

---

## Clip de cierre (≈8 s) · "todo en orden"

Para que salgan iguales, sube también **un cuadro del clip de inicio** donde se vea bien a los dos y la camioneta.

| Toma | Imagen clave (refs) | Video (8 s) | Archivo | Se usa |
|---|---|---|---|---|
| 1 y 3a | K5 (`ref-1`, `ref-3`, `ref-4`) | V5 | `cierre-1.mp4` | ~3 s (el inserto "Documentos al día" va entremedio) |
| 3b y 4 | K6 (`ref-2`, `ref-3`, `ref-4`) | V6 | `cierre-2.mp4` | ~2.5 s |
| 5 | K7 (`ref-1`) | V7 | `cierre-3.mp4` | ~2 s |

El equipo PORTA en el prompt: *a small dark graphite box (smaller than a smartphone) clamped to the stem of the rear-view mirror with an orange ring, hanging right below the mirror; windshield side with a small camera lens and a white QR code label; cabin side with an orange NFC panel and a tiny green LED.*

**K5** (`ref-1`, `ref-3`, `ref-4`)
```
From outside the white pickup, the female safety inspector raises her smartphone toward the windshield to scan the QR code of a small dark graphite device clamped below the rear-view mirror with an orange ring, seen through the glass.
```
**V5** (primer fotograma K5)
```
She holds the phone steady toward the device behind the windshield for a moment, the scan completes, she lowers the phone, looks at the driver, smiles and gives a clear thumbs up.
```

**K6** (`ref-2`, `ref-3`, `ref-4`)
```
Inside the pickup cab, the relieved male driver smiles, his hand on the ignition key; the small graphite device with orange ring and a glowing green LED hangs below the rear-view mirror, clearly visible in frame.
```
**V6** (primer fotograma K6)
```
He smiles with relief, turns the ignition key and puts the truck in gear; the small device's green LED blinks under the mirror.
```

**K7** (`ref-1`)
```
Wide shot: the dusty white pickup drives away down a gravel desert road toward the sunset, leaving a trail of dust, the female safety inspector in the foreground raising her hand to wave goodbye.
```
**V7** (primer fotograma K7)
```
The pickup accelerates away into the golden haze, dust rising behind it, while she waves goodbye. Slow, steady camera.
```

---

## Si Firefly no da buen resultado

Avísame y cargas créditos en Higgsfield: Seedance 2.0 acepta las cuatro referencias juntas y mantiene mejor caras y producto (con plan Starter, modo `fast` a 720p). Los prompts completos están en `PROMPTS-VIDEO-IA.md`.
