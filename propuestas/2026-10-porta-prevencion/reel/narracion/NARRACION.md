# Narración del reel PORTA (ElevenLabs vía Higgsfield)

Voz elegida por Juan: **Andre** (muestra 3; las otras "daban sueño"). Motor: Higgsfield `text2speech_v2`, variante `elevenlabs`.

## Cómo está armada

- Frases 1–8: **cortes de `muestras/muestra-3-andre.mp3`** (la lectura que Juan eligió), en `cortes/S1.wav` … `S8.wav`.
- Frase 9: generada aparte (`lineas/L9.mp3`) para decir "apalmo **studio**".
- `lineas.json` dice dónde entra cada frase en el reel y su velocidad. `sfx3.py` la mezcla y baja los efectos mientras habla.
- `lineas/L1`–`L8.mp3` son una generación línea por línea que quedó sin usar (se hizo antes de que Juan pidiera usar los cortes).

| # | Entra (s) | Velocidad | Texto | Calce con la imagen |
|---|---|---|---|---|
| 1 | 8,50 | 1,00 | ¿En faena no hay señal? | toma aérea |
| 2 | 10,06 | 1,00 | Sin señal… sin problema. | golpe |
| 3 | 11,93 | 1,12 | Te presento PORTA: un pequeño computador que va bajo el retrovisor, con memoria propia y cuatro G. | entra el equipo / por dentro |
| 4 | 18,20 | 1,00 | Es más chico que un celular, y funciona sin señal: guarda todo a bordo. | tamaño / 0 señal |
| 5 | 22,50 | 1,10 | Se conecta en un toque: código QR por fuera, NFC por dentro, y sin aplicaciones. | "NFC" cae en el corte a la escena NFC |
| 6 | 27,98 | 1,00 | Checklists sin señal: apto, con observaciones o no apto. | cada luz del semáforo se enciende cuando la voz la nombra |
| 7 | 32,83 | 1,00 | Y desde PORTA Central cargas los documentos del vehículo. Con cuatro G, llegan solos al equipo. | el archivo cae al decir "cargas"; el envío por 4G al decir "con cuatro G" |
| 8 | 39,33 | 1,00 | Así, en terreno, basta escanear: todo al día. | escaneo y "Documentos al día" |
| 9 | 47,56 | 1,00 | PORTA. Un concepto en desarrollo de apalmo studio. | firma |

Créditos: muestras 5,4 + líneas 2,1 (quedan 531,5). Reel con narración: ~51 s.

Acento: las voces predefinidas no son chilenas. Para acento chileno real: clonar la voz de Juan (grabación de 1–2 min) o cuenta propia de ElevenLabs.
