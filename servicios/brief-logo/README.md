# Brief de logo

Formulario corto (5 pasos, unos 5 minutos) para entender qué quiere un cliente antes de diseñar su logo. Es la primera etapa del servicio de logos: ver [`PROCESO.md`](PROCESO.md).

- HTML estático, sin dependencias ni servidor. Funciona en el teléfono, en español e inglés, y en tema claro u oscuro.
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
| `brief.css` | Estilos, con los colores de apalmo.com. |
| `fuentes/` | Geist (la de apalmo.com) y las 6 tipografías de las muestras de estilo (todas con licencia OFL). |

## Cómo se comparte

```
https://apalmo.com/brief/logo/?c=rr-pro-hauling          ← R&R Pro Hauling (español)
https://apalmo.com/brief/logo/?c=rr-pro-hauling&lang=en  ← en inglés
https://apalmo.com/brief/logo/                           ← genérico (el cliente escribe su nombre)
```

Con `?c=` el formulario saluda con el nombre de la marca, dibuja las muestras de estilo con ese nombre y precarga lo que ya sabemos.

**Cliente nuevo:** copia la entrada `rr-pro-hauling` en `clientes.js`, cambia el id y los datos, y comparte `?c=<id>`. Puedes reemplazar cualquier pregunta para ese cliente (por ejemplo, la lista de servicios de su rubro).

## Cómo llegan las respuestas

1. Al final, el cliente toca **Enviar por WhatsApp**. Se abre un chat con tu número y un mensaje listo, que incluye un link `https://apalmo.com/brief/logo/#r=…`. Las respuestas van comprimidas dentro del link (~1 KB), así que no se necesita servidor ni base de datos.
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
  "formulario": "apalmo-brief-logo",
  "version": 1,
  "cliente": "rr-pro-hauling",
  "marca": "R&R Pro Hauling",
  "idioma": "es",
  "enviado": "2026-10-29T16:15:08.474Z",
  "contacto": { "nombre": "…", "medio": "…" },
  "formato": "Escalas de 1 a 5: 1 = primera palabra del id, 5 = la segunda…",
  "respuestas": {
    "negocio":      { "nombre", "eslogan", "historia_nombre", "servicios", "servicios_otro", "clientes", "zona", "diferencia", "usos" },
    "personalidad": { "clasico_moderno": 1-5, "serio_cercano", "rudo_prolijo", "local_grande", "sobrio_llamativo", "simple_detallado" },
    "estilo":       { "estilos": { "me_gusta": [], "no_me_gusta": [] }, "simbolo": [] },
    "color":        { "paletas": [], "colores_existentes", "colores_evitar" },
    "cierre":       { "referencias", "competencia", "evitar", "plazo", "notas", "contacto_nombre", "contacto_medio" }
  }
}
```

Siempre salen todas las claves (vacías si no hubo respuesta), así los briefs de distintos clientes se pueden comparar. Los ids de opciones están en `preguntas.js` y `clientes.js`.

Si cambias preguntas de forma que el JSON ya no sea comparable, sube `version` en `preguntas.js`.

## Probarlo en local

```
cd servicios/brief-logo
python3 -m http.server 8000
# http://localhost:8000/?c=rr-pro-hauling
```
