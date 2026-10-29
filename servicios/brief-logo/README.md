# Brief de marca

Formulario corto (6 pasos, unos 6 minutos) para entender qué ofrece un cliente, hacia dónde va, cómo quiere que se sienta su marca y qué estilo gráfico le gusta, antes de diseñar su logo. No muestra propuestas: muestra logos muy conocidos como referencia de estilo. Es la primera etapa del servicio de logos: ver [`PROCESO.md`](PROCESO.md).

**Los pasos:** 1) Lo que ofrecen · 2) Hacia dónde van · 3) Cómo se debe sentir · 4) Estilo gráfico (tipo de logo, estilos que gustan y no gustan, nivel de detalle) · 5) Colores · 6) Para terminar (usos, referencias, plazo y contacto).

- HTML estático, sin dependencias ni servidor. Funciona en el teléfono y en español e inglés.
- Mismo estilo que apalmo.com: bosque oscuro, crema y cobre, Geist, botones píldora, dock flotante y animaciones con resorte (se apagan si el teléfono pide menos movimiento).
- Cumple la CSP de apalmo.com: no tiene scripts ni estilos en línea, y las fuentes son locales.
- Guarda un borrador en el teléfono del cliente mientras responde.
- Entrega las respuestas como JSON.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | La página. |
| `preguntas.js` | **El cuestionario.** Para cambiar o agregar preguntas, edita aquí. |
| `clientes.js` | Configuración (WhatsApp, URL pública, endpoint) y datos precargados de cada cliente. |
| `brief.js` | La lógica: arma el formulario, guarda el borrador y genera el JSON. |
| `brief.css` | Estilos y animaciones, con los tokens de apalmo.com. |
| `fuentes/` | Geist, la tipografía de apalmo.com (licencia OFL). |
| `img/logos/` | Logos de marcas conocidas para las referencias, descargados de Wikimedia Commons. Solo se usan como ejemplo de estilo; la página lo aclara al pie. |

## Cómo se comparte

```
https://apalmo.com/brief/logo/?c=rr-pro-hauling          ← R&R Pro Hauling (español)
https://apalmo.com/brief/logo/?c=rr-pro-hauling&lang=en  ← en inglés
https://apalmo.com/brief/logo/                           ← genérico (el cliente escribe su nombre)
```

Con `?c=` la portada saluda con el nombre de la marca y se precarga lo que ya sabemos (por ejemplo, la lista de servicios de su rubro).

**Cliente nuevo:** copia la entrada `rr-pro-hauling` en `clientes.js`, cambia el id y los datos, y comparte `?c=<id>`. Puedes reemplazar cualquier pregunta para ese cliente.

**Cambiar las referencias:** las tarjetas de estilo usan los ids de `LOGOS` en `preguntas.js`. Para sumar un logo, deja el archivo en `img/logos/`, agrégalo a `LOGOS` y úsalo en la opción que quieras (`logos: ["id"]`).

## Cómo llegan las respuestas

1. Al final, el cliente toca **Enviar por WhatsApp**. Se abre un chat con tu número y un mensaje listo, que incluye un link `https://apalmo.com/brief/logo/#r=…`. Las respuestas van comprimidas dentro del link (~1,5 KB), así que no se necesita servidor ni base de datos.
2. Abres el link y ves las respuestas ordenadas, con **Copiar JSON** y **Descargar JSON**.
3. Guardas el JSON en la carpeta del cliente (`propuestas/<fecha>-<cliente>/brief.json`) y lo analizas según `PROCESO.md`.

Si WhatsApp no abre, el cliente puede **Descargar archivo** o **Copiar respuestas** y mandarlo por cualquier lado.

**Opcional, más adelante:** si la API de apalmo.com recibe un POST en una ruta del mismo dominio (por ejemplo `/api/brief`), pon esa ruta en `endpoint` dentro de `clientes.js` y aparece el botón **Enviar respuestas**. El JSON llega tal cual (ver formato abajo). WhatsApp queda como respaldo.

## Publicarlo en apalmo.com

El sitio en línea es el proyecto `Apalmo Studio\WEB`, que está en el computador de Juan (Astro en `apps/web`, desplegado en Railway). Este repo no tiene acceso a él.

1. Copia la carpeta `servicios/brief-logo/` completa a `apps/web/public/brief/logo/`, en el proyecto WEB.
   - Puedes dejar fuera `README.md` y `PROCESO.md`: no hacen falta en el sitio.
2. Levanta el sitio en local como siempre y abre `/brief/logo/?c=rr-pro-hauling` (en Astro suele ser `http://localhost:4321`).
3. Despliega como siempre. Ojo: según el traspaso de PORTA, antes de volver a desplegar en Railway hay que rotar los secretos por el incidente del 21-oct.
4. Prueba en el teléfono: `https://apalmo.com/brief/logo/?c=rr-pro-hauling`.

Astro copia `public/` sin tocarlo y el formulario ya respeta la CSP del sitio (`script-src 'self'`, `style-src 'self'`, `font-src 'self'`). La página lleva `noindex` para que no aparezca en Google.

Para retirarlo, borra la carpeta `public/brief/logo/` y vuelve a desplegar.

## Formato del JSON

```json
{
  "formulario": "apalmo-brief-marca",
  "version": 2,
  "cliente": "rr-pro-hauling",
  "marca": "R&R Pro Hauling",
  "idioma": "es",
  "enviado": "2026-10-29T16:15:08.474Z",
  "contacto": { "nombre": "…", "medio": "…" },
  "formato": "Escalas de 1 a 5: 1 = primera palabra del id, 5 = la segunda…",
  "respuestas": {
    "negocio":   { "nombre", "servicios", "servicios_otro", "clientes", "diferencia", "historia_nombre" },
    "futuro":    { "vision", "nuevos_servicios", "frase_cliente" },
    "sensacion": { "sensaciones": [], "clasico_moderno": 1-5, "serio_cercano", "rudo_prolijo", "sobrio_llamativo" },
    "estilo":    { "tipo": [], "esteticas": { "me_gusta": [], "no_me_gusta": [] }, "detalle" },
    "color":     { "paletas": [], "colores_existentes", "colores_evitar" },
    "cierre":    { "usos": [], "referencias", "evitar", "plazo", "contacto_nombre", "contacto_medio" }
  },
  "referencias_visuales": {
    "industrial": { "ejemplos": ["Caterpillar", "Jeep", "DeWalt"] },
    "azul-rojo":  { "ejemplos": ["Pepsi", "Domino's"], "colores": ["#14254A", "#D0202E", "#F5F5F2"] }
  }
}
```

Siempre salen todas las claves (vacías si no hubo respuesta), así los briefs de distintos clientes se pueden comparar. Los ids de opciones están en `preguntas.js` y `clientes.js`, y `referencias_visuales` repite qué logos y colores vio el cliente en cada opción que marcó, para que el JSON se entienda solo.

Si cambias preguntas de forma que el JSON ya no sea comparable, sube `version` en `preguntas.js`.

## Probarlo en local

```
cd servicios/brief-logo
python3 -m http.server 8000
# http://localhost:8000/?c=rr-pro-hauling
```
