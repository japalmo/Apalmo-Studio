# Proceso de diseño de logo · apalmo studio

Primera versión del procedimiento, armada con R&R Pro Hauling (oct-2026). Ajústalo con cada cliente.

## 1. Brief (cliente, ~5 min)

- Agrega al cliente en `servicios/brief-logo/clientes.js` (nombre, iniciales, ciudad y servicios de su rubro).
- Mándale el link `https://apalmo.com/brief/logo/?c=<id>` por WhatsApp, con un mensaje corto:
  > Hola, para partir con el logo necesito que respondas este formulario. Son 5 minutos y es todo de tocar opciones. Si tienes fotos de logos que te gusten, mándamelas por aquí.
- Recibes el link con las respuestas. Ábrelo, copia el JSON y guárdalo como `propuestas/<aaaa-mm>-<cliente>/brief.json`, junto con las imágenes de referencia que mande.

## 2. Análisis (apalmo + Claude)

Abre una sesión en este repo y pega:

> Lee `propuestas/<carpeta>/brief.json` y las imágenes de referencia de esa carpeta. Arma una ficha de análisis en `propuestas/<carpeta>/analisis.md` con:
> 1. **La marca en 3 frases:** qué hace, para quién y por qué la eligen.
> 2. **Personalidad:** lectura de las escalas (lo marcado en los extremos pesa más que el centro).
> 3. **Lo que sí y lo que no:** estilos, símbolo, colores y restricciones explícitas.
> 4. **Requisitos de uso:** dónde va el logo y qué exige (por ejemplo, en el camión debe leerse a 30 m; en la gorra, bordado y sin detalles finos; en Instagram, el ícono se ve en un círculo).
> 5. **Contradicciones o dudas** para preguntarle al cliente antes de diseñar.
> 6. **Tres direcciones de logo** distintas entre sí: concepto, tipografía, símbolo y paleta para cada una, con lo que la justifica en el brief.

Revisa la ficha. Si hay dudas en el punto 5, pregúntale al cliente antes de seguir.

## 3. Propuestas (primera ronda)

- Tres direcciones, no tres variaciones de la misma idea.
- Cada una se presenta aplicada donde el cliente la va a usar (según `usos`): costado del camión, gorra o camiseta, foto de perfil y tarjeta.
- Una página o PDF por dirección, con una frase que explique la idea.
- El cliente elige una, o una mezcla, y comenta.

## 4. Ajustes

- Hasta 2 rondas sobre la dirección elegida. Más rondas se cotizan aparte.
- Pide los comentarios por escrito (WhatsApp sirve) y guárdalos en la carpeta.

## 5. Entrega

- Versiones: principal, horizontal, ícono o monograma solo.
- Variantes: a color, una tinta negra y una tinta blanca (para fondos oscuros).
- Formatos: SVG y PDF (vector, para imprenta y rotulado), PNG transparente en 3 tamaños, y foto de perfil 1080 × 1080.
- Una hoja de marca: colores (HEX, RGB y CMYK), tipografías, espacio de respeto y tamaño mínimo.
- Todo en `propuestas/<carpeta>/entrega/` y en un zip para el cliente.

## Para mejorar con cada cliente

- Si una pregunta del brief siempre queda en blanco, sácala. Si siempre falta algo, agrégalo en `preguntas.js`.
- Las muestras de estilo están pensadas para transporte y servicios. Para otros rubros, revisa que sigan teniendo sentido (la muestra amigable lleva un camión).
- Anota cuánto tiempo tomó cada etapa para poder cotizar el servicio.
