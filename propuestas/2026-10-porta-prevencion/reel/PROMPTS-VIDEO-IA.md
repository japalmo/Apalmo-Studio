# PORTA · prompts para los clips de inicio y cierre del reel

Formato de ambos clips: **vertical 9:16**, **sin música** (si la herramienta genera audio, solo ambiente y la frase del conductor). Personajes, vehículo y lugar deben ser los mismos en los dos clips.

## Imágenes de referencia (carpeta `referencias-ia/`)

| Archivo | Para qué | Clip |
|---|---|---|
| `ref-1-fiscalizadora.png` | Cara y ropa de la prevencionista (mujer con casco blanco y chaleco naranjo) | Inicio y cierre |
| `ref-2-conductor.png` | Cara y ropa del conductor (casco blanco, lentes de sol, chaleco naranjo) | Inicio y cierre |
| `ref-3-producto.png` | Cómo es PORTA: caja grafito, abrazadera con anillo naranjo, QR afuera y NFC adentro | Solo cierre |
| `ref-4-montaje-retrovisor.png` | Dónde va PORTA: bajo el espejo retrovisor | Solo cierre |

**Truco para que salgan iguales:** genera primero el clip de inicio. Del resultado, toma un cuadro donde se vean bien los dos personajes y la camioneta, y súbelo también como referencia del cierre.

**Pantallas de celular:** las IA escriben mal los textos. En el prompt pido que la pantalla se vea pero sin texto legible. Yo después pongo encima la pantalla real (sin señal, menú de PORTA, "documentos al día").

---

## Clip 1 · Inicio, "no tengo señal" (10 s)

```
Vertical 9:16 cinematic short film sequence, 10 seconds, fast editing with 6 quick cuts, handheld documentary camera, shallow depth of field, warm golden-hour light, dust in the air, Atacama desert mining road in northern Chile. Realistic, no text overlays, no logos or brand names anywhere (helmets, vests, truck, steering wheel).

Characters (keep identical in every shot): a Latin American female occupational safety inspector in her 30s, plain white hard hat, sunglasses, plain orange high-visibility vest, holding a tablet (same woman as reference image 1). A Latin American male driver in his 30s with short beard, plain white hard hat, sunglasses pushed up, plain orange reflective vest, sitting in the driver seat of a dusty plain white pickup truck (same man as reference image 2). There is NO device under the rear-view mirror in this video.

Shot 1 (0–1.5 s): low tracking shot at ground level, dusty safety boots of the inspector walking on gravel toward the parked white pickup at a remote checkpoint, truck in the background, dust kicking up.
Shot 2 (1.5–3 s): over-the-shoulder from inside the cab, the inspector knocks on the driver window and leans in, asking for the vehicle documents.
Shot 3 (3–4.5 s): close-up of the driver, suddenly nervous, forced smile, grabbing his smartphone from the dashboard.
Shot 4 (4.5–6 s): extreme close-up over his shoulder of the phone screen: a loading spinner that never finishes and an empty signal indicator, screen content blurred and not legible.
Shot 5 (6–7.5 s): the driver looks up at her, embarrassed, and says in Chilean Spanish: "Es que… no tengo señal."
Shot 6 (7.5–9 s): close-up of the inspector, disappointed, slowly shaking her head and writing a note on her tablet.
Shot 7 (9–10 s): fast pull-back aerial shot: the lone white pickup in the vast empty desert, no antennas, no towns.
```

---

## Clip 2 · Cierre, "todo en orden" (8 s)

```
Vertical 9:16 cinematic short film sequence, 8 seconds, fast editing with 5 quick cuts, handheld documentary camera, warm golden-hour light, dust in the air, same Atacama desert checkpoint, same dusty plain white pickup truck and same two characters as the previous video (female safety inspector from reference image 1, male driver from reference image 2). Realistic, no text overlays, no logos or brand names.

The product: a small dark graphite box (7 x 4 x 3 cm, smaller than a smartphone) clamped to the stem of the rear-view mirror with an orange ring, hanging right below the mirror. Its windshield-facing side has a small camera lens and a white QR code label; its cabin-facing side has an orange NFC panel and a tiny green LED. It must look exactly like reference images 3 and 4.

Shot 1 (0–1.5 s): from outside the truck, the inspector raises her smartphone toward the windshield and scans the QR code of the small graphite device under the rear-view mirror, through the glass.
Shot 2 (1.5–3 s): close-up of her phone screen glowing as it connects, a green check mark appears, the rest of the screen blurred and not legible.
Shot 3 (3–4.5 s): she looks at the driver, smiles and gives a clear thumbs up; reverse shot: the driver smiles back, relieved.
Shot 4 (4.5–6 s): close-up of the driver's hand turning the ignition and putting the truck in gear, the small device with its green LED visible under the mirror.
Shot 5 (6–8 s): wide shot, the white pickup drives away down the dusty desert road toward the sunset leaving a trail of dust, the inspector waves goodbye in the foreground.
```

---

## Dónde generarlo

- **Higgsfield, Seedance 2.0** (recomendado): acepta varias imágenes de referencia y mantiene las caras y el producto. Duración 10 s y 8 s, 9:16, `generate_audio` apagado (o encendido si quieres la frase hablada). El modo `std` necesita plan Plus; con Starter usa el modo `fast` a 720p.
- **Higgsfield, Cinema Studio Video (v2)**: tiene la opción `multi_shots`. Puedes pegar cada "Shot" como una toma separada, con hasta 12 s.
- **Gemini (Veo)**: los clips son de 8 s. Si el inicio queda corto, genera los shots 1–4 en un clip y los shots 5–7 en otro.
- **Adobe Firefly Video**: clips más cortos (~5 s). Conviene generar 2 o 3 clips por escena y yo los uno.

Cuando los tengas, pásame los MP4 y los integro al reel: inicio → "Sin señal. Sin problema." → producto → cierre → firma de apalmo.
