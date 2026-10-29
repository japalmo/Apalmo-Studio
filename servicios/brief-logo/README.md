# Brief de marca

Formulario para entender a un cliente antes de diseñar su logo: cómo se escribe su nombre, qué ofrece, quiénes son, hacia dónde van, qué tono y personalidad quieren y qué estilo gráfico y colores les gustan. No muestra propuestas: usa logos muy conocidos como referencia de estilo. Es la primera etapa del servicio de logos (ver [`PROCESO.md`](PROCESO.md)).

**Los 8 pasos (unos 8 minutos):**
1. **Su nombre:** nombre, cómo se ve escrito (mayúsculas, minúsculas…), versión corta, detalles de escritura, eslogan e historia.
2. **Lo que ofrecen:** servicios, servicio estrella, clientes, zona y qué los diferencia.
3. **Quiénes son:** cómo se identifican, hasta 5 adjetivos, cómo NO quieren que los vean y cómo sería la marca si fuera una persona.
4. **Hacia dónde van:** cómo se ven en 5 años, qué quieren sumar y qué les gustaría que dijera un cliente.
5. **Tono y personalidad:** escalas serio ↔ juguetón, juvenil ↔ señorial, convencional ↔ original y atrevido, clásico ↔ moderno, rudo ↔ refinado y sobrio ↔ llamativo, más hasta 3 sensaciones.
6. **Estilo gráfico:** tipo de logo, estilos que les gustan y que no, y nivel de detalle, todo con logos conocidos.
7. **Colores:** combinaciones con su sensación y marcas de ejemplo, colores que hay que respetar y colores que no.
8. **Para terminar:** dónde se usará, referencias, qué evitar, plazo y contacto.

**Al enviar**, las respuestas van por `POST` a la API de apalmo.com y el cliente solo ve "¡Muchas gracias por llenar el formulario! Pronto nos estaremos contactando contigo." La API las guarda en la base de datos y te avisa. Esa parte se construye en el proyecto WEB con [`PROMPT-SESION-LOCAL.md`](PROMPT-SESION-LOCAL.md).

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | La página. |
| `preguntas.js` | **El cuestionario.** Para cambiar o agregar preguntas, edita aquí. También define los logos de referencia (`LOGOS`). |
| `clientes.js` | `endpoint` del envío y datos precargados de cada cliente. |
| `brief.js` | La lógica: arma el formulario, guarda el borrador, valida, envía y muestra el agradecimiento. |
| `brief.css` | Estilos y animaciones, con los tokens de apalmo.com. |
| `fuentes/` | Geist, la tipografía de apalmo.com (licencia OFL). |
| `img/logos/` | Logos de marcas conocidas descargados de Wikimedia Commons, solo como ejemplo de estilo (la página lo aclara al pie). |
| `PROMPT-SESION-LOCAL.md` | Prompt para la sesión del proyecto WEB: base de datos, alerta, intranet y publicación. |

## Detalles técnicos

- HTML estático, sin dependencias. Cumple la CSP de apalmo.com: no tiene scripts ni estilos en línea, las fuentes e imágenes son locales y el envío va al mismo dominio.
- Funciona en el teléfono y en español e inglés (`&lang=en`). Las animaciones se apagan si el teléfono pide menos movimiento.
- Guarda un borrador en el teléfono mientras responden y lo borra al enviar.
- Si el envío falla, muestra un error y deja reintentar sin perder nada.
- Tiene un campo trampa para bots (`trampa`, debe llegar vacío).
- Con `endpoint` vacío funciona como vista previa: muestra el agradecimiento sin enviar nada y deja el JSON en la consola.

## Cómo se comparte

```
https://apalmo.com/brief/logo/?c=rr-pro-hauling          ← R&R Pro Hauling (español)
https://apalmo.com/brief/logo/?c=rr-pro-hauling&lang=en  ← en inglés
https://apalmo.com/brief/logo/                           ← genérico
```

**Cliente nuevo:** copia la entrada `rr-pro-hauling` en `clientes.js`, cambia el id y los datos, y comparte `?c=<id>`. Puedes precargar respuestas y reemplazar cualquier pregunta (por ejemplo, la lista de servicios de su rubro).

**Cambiar las referencias:** deja el logo en `img/logos/`, agrégalo a `LOGOS` en `preguntas.js` y úsalo en la opción que quieras (`logos: ["id"]`).

## Formato del JSON

```json
{
  "formulario": "apalmo-brief-marca",
  "version": 3,
  "cliente": "rr-pro-hauling",
  "marca": "R&R Pro Hauling",
  "idioma": "es",
  "iniciado": "2026-10-29T16:41:57.318Z",
  "enviado": "2026-10-29T16:49:11.927Z",
  "contacto": { "nombre": "…", "telefono": "…", "correo": "…" },
  "formato": "Escalas de 1 a 5: 1 = primera palabra del id, 5 = la segunda…",
  "respuestas": {
    "nombre":    { "nombre", "escritura", "version_corta", "detalle_escritura", "eslogan", "historia_nombre" },
    "negocio":   { "servicios", "servicios_otro", "servicio_estrella", "clientes", "zona", "diferencia" },
    "identidad": { "como_se_identifican": [], "adjetivos": [], "adjetivos_otro", "no_quieren_parecer": [], "como_persona" },
    "futuro":    { "vision", "nuevos_servicios", "frase_cliente" },
    "tono":      { "serio_jugueton": 1-5, "juvenil_senorial", "convencional_original", "clasico_moderno", "rudo_refinado", "sobrio_llamativo", "sensaciones": [] },
    "estilo":    { "tipo": [], "esteticas": { "me_gusta": [], "no_me_gusta": [] }, "detalle" },
    "color":     { "paletas": [], "colores_existentes", "colores_evitar" },
    "cierre":    { "usos": [], "referencias", "evitar", "plazo", "contacto_nombre", "contacto_telefono", "contacto_correo" }
  },
  "referencias_visuales": {
    "industrial": { "ejemplos": ["Caterpillar", "Jeep", "DeWalt"] },
    "azul-rojo":  { "ejemplos": ["Pepsi", "Domino's"], "colores": ["#14254A", "#D0202E", "#F5F5F2"] }
  },
  "trampa": ""
}
```

- Siempre salen todas las claves (vacías si no hubo respuesta), así los briefs de distintos clientes se pueden comparar.
- `referencias_visuales` repite qué logos y colores vio el cliente en cada opción que marcó, para que el JSON se entienda solo.
- Si cambias preguntas de forma que el JSON ya no sea comparable, sube `version` en `preguntas.js`.

## Probarlo en local

```
cd servicios/brief-logo
python3 -m http.server 8000
# http://localhost:8000/?c=rr-pro-hauling  (sin API, el envío muestra el error de conexión)
```
