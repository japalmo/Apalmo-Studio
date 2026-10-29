# Proceso de diseño de logo · apalmo studio

Primera versión del procedimiento, armada con R&R Pro Hauling (oct-2026). Ajústalo con cada cliente.

## 1. Brief (cliente, ~8 min)

- Agrega al cliente en `servicios/brief-logo/clientes.js` (nombre, ciudad y servicios de su rubro).
- Mándale el link `https://apalmo.com/brief/logo/?c=<id>` por WhatsApp, con un mensaje corto:
  > Hola, para partir con el logo necesito que respondas este formulario. Son unos 8 minutos y casi todo es tocar opciones. Si tienes fotos de marcas que te gusten, mándamelas por aquí.
- Cuando lo envía, te llega la alerta y el brief queda en la intranet de apalmo.com. Desde ahí descarga el JSON y guárdalo como `propuestas/<aaaa-mm>-<cliente>/brief.json`, junto con las imágenes de referencia que mande.

## 2. Análisis (apalmo + Claude)

Abre una sesión en este repo y pega:

> Lee `propuestas/<carpeta>/brief.json` y las imágenes de referencia de esa carpeta. Arma una ficha de análisis en `propuestas/<carpeta>/analisis.md` con:
> 1. **La marca en 3 frases:** cómo se llama y se escribe, qué hace, para quién, cómo se identifica y hacia dónde quiere ir.
> 2. **Personalidad:** adjetivos, cómo no quieren que los vean, sensaciones y la lectura de las escalas de tono (lo marcado en los extremos pesa más que el centro).
> 3. **Lo que sí y lo que no:** tipo de logo, estilos, nivel de detalle, colores y restricciones explícitas. Usa `referencias_visuales` para saber qué logos de ejemplo vio en cada opción.
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
- Las referencias de estilo son logos conocidos de muchos rubros. Si un cliente es de un rubro muy distinto, puedes sumar ejemplos de su mundo en `preguntas.js`.
- Anota cuánto tiempo tomó cada etapa para poder cotizar el servicio.
