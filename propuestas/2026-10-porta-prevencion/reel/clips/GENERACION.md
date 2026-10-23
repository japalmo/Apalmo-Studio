# Clips IA del reel v3 · cómo se generaron (22-oct-2026)

Higgsfield, plan Pro. Total gastado: **61 créditos** (600 → 539). La cuenta no tenía generaciones ilimitadas disponibles en ese momento.

| Archivo | Modelo | Ajustes | Créditos | Entradas |
|---|---|---|---|---|
| `inicio.mp4` (10 s) | Seedance 2.0 | std, 720p, 9:16, con audio | 45 | `ref-1`, `ref-2` como referencias |
| `cierre-clave.jpg` | Nano Banana Pro | 9:16, 2k | 2 | `ref-1` a `ref-4` |
| `cierre.mp4` (8 s) | Seedance 2.0 Mini | 720p, 9:16, sin audio | 8 | primer cuadro `cierre-clave`; refs `ref-3`, `ref-4`, `ref-inicio-conductor.jpg`, `ref-inicio-fiscalizadora.jpg` |
| (descartada) | Nano Banana Pro | 9:16 | 2 | salió con dos cabinas superpuestas |
| `cierre4.mp4` (4 s) | Seedance 2.0 Mini | 720p, 9:16, sin audio | 4 | primer cuadro `cierre4-ref4.jpg` (recorte vertical de `ref-4`) |

Prompts: los del clip de inicio y cierre de `PROMPTS-VIDEO-IA.md`, con estos agregados:

- **Inicio:** "IMPORTANT: in this video there is NOTHING mounted under the rear-view mirror (ignore the small box visible in the reference images)" y audio solo con viento, pasos, golpe en el vidrio y la frase del conductor.
- **Cierre:** "Starts exactly from the first frame… plain vests with no printed words" y la descripción del equipo de `ref-3`/`ref-4`.
- **cierre4:** "the small dark graphite device clamped below the rear-view mirror stays in sharp focus… green LED blinks twice… the truck begins to roll forward".

Arreglos en edición (no se regeneró):

- **Texto en el chaleco:** la IA dibujó "PARTTAL" y otro texto en el chaleco del conductor. Se difuminan con `retoques.json`.
- **Equipo mal ubicado:** en `cierre.mp4`, la toma del encendido (4,75–5,88 s) mostraba el equipo junto a la chapa del contacto, no bajo el retrovisor. Se reemplazó por `cierre4.mp4` (ver `montaje.json`).
- **Pantallas de teléfono:** las tomas del teléfono se cubren con los insertos propios (`insertos.json`), en los cortes reales del clip.
- **Frase del conductor:** "Es que… no tengo señal" se toma del audio del propio clip de inicio (5,3–6,75 s) en `sfx3.py`. Se apaga con `USAR_VOZ_CLIP = False`.

Pendiente de criterio: en el clip de inicio, al decir la frase (5,4–6,7 s), el conductor sale con las mejillas muy rojas (vergüenza exagerada).
