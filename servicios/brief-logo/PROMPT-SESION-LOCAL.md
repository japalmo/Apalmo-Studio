# Prompt para la sesión local: brief de marca en apalmo.com

> Abre una sesión nueva de Claude Code en `C:\Users\juana\OneDrive - INACAP\Escritorio\Apalmo Studio\WEB` (el proyecto que sirve apalmo.com), copia todo lo que está bajo la línea y pégalo como primer mensaje.

---

Hola. Vamos a publicar en apalmo.com un **brief de marca**: un formulario que le mando a un cliente antes de diseñar su logo. Las respuestas deben **quedar guardadas en la base de datos**, a mí me debe **llegar una alerta**, y el cliente **solo debe ver un mensaje de gracias**. Después, desde el computador, uso esas respuestas para armar las propuestas de logo.

El primer cliente es **R&R Pro Hauling**, el servicio de transporte de mi prima en Orlando, Florida. Pero esto es la base de un servicio de diseño de logos, así que tiene que servir para otros clientes sin tocar código, solo configuración.

## 1. Lee esto antes de tocar nada

**El formulario ya existe y está probado** en otro repositorio. Úsalo como referencia y fuente de verdad del contenido:

- Repo: `Apalmo Studio\apalmo-studio` (GitHub `japalmo/apalmo-studio`), rama **`claude/logo-preferences-form-6t5sdc`**.
  ```
  cd "..\apalmo-studio"
  git fetch origin claude/logo-preferences-form-6t5sdc
  git checkout claude/logo-preferences-form-6t5sdc
  ```
- Carpeta: `servicios/brief-logo/`. Lee primero `README.md` y `PROCESO.md`.

| Archivo | Qué es |
|---|---|
| `preguntas.js` | **El cuestionario completo** (8 pasos, textos en español e inglés). Los `id` son los que salen en el JSON. |
| `clientes.js` | `endpoint` (`/api/brief`) y la configuración de cada cliente (`?c=rr-pro-hauling`): marca, ciudad, idioma, respuestas precargadas y preguntas reemplazadas. |
| `brief.js` | La lógica: arma el formulario, guarda un borrador en `localStorage`, valida, hace el POST y muestra el agradecimiento. |
| `brief.css` | Estilos y animaciones, copiados de los tokens de apalmo.com (bosque, crema, cobre, Geist, dock flotante, curvas con resorte). |
| `img/logos/` | 36 logos de marcas conocidas (Wikimedia Commons) que se usan solo como referencia de estilo. |
| `fuentes/geist.woff2` | Geist, la misma de apalmo.com. |

Para verlo funcionando: `cd servicios/brief-logo` → `python -m http.server 8000` → `http://localhost:8000/?c=rr-pro-hauling`. En local el POST a `/api/brief` falla (no hay API): es normal, y sirve para ver el mensaje de error y el reintento.

**Ya está resuelto en el formulario (no lo rehagas):**
- 8 pasos: nombre y escritura · lo que ofrecen · quiénes son · hacia dónde van · tono y personalidad · estilo gráfico · colores · para terminar.
- Funciona con la CSP actual de apalmo.com: sin scripts ni estilos en línea, fuentes e imágenes locales y `connect-src 'self'`.
- Funciona en el teléfono y en español e inglés (`&lang=en`), y respeta `prefers-reduced-motion`.
- Botón final **Enviar** → `POST /api/brief` con el JSON → pantalla "¡Muchas gracias por llenar el formulario! Pronto nos estaremos contactando contigo." Si falla, muestra un error, deja reintentar y no pierde nada. Si sale bien, borra el borrador.
- Campo trampa para bots (`trampa` en el JSON, debe venir vacío).
- Aviso de uso de datos junto al botón Enviar.

**Formato del JSON que llega al POST** (versión 3). Lee el README para el detalle de cada clave:
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
  "formato": "Escalas de 1 a 5: …",
  "respuestas": {
    "nombre":    { "nombre", "escritura", "version_corta", "detalle_escritura", "eslogan", "historia_nombre" },
    "negocio":   { "servicios", "servicios_otro", "servicio_estrella", "clientes", "zona", "diferencia" },
    "identidad": { "como_se_identifican", "adjetivos", "adjetivos_otro", "no_quieren_parecer", "como_persona" },
    "futuro":    { "vision", "nuevos_servicios", "frase_cliente" },
    "tono":      { "serio_jugueton", "juvenil_senorial", "convencional_original", "clasico_moderno", "rudo_refinado", "sobrio_llamativo", "sensaciones" },
    "estilo":    { "tipo", "esteticas": { "me_gusta": [], "no_me_gusta": [] }, "detalle" },
    "color":     { "paletas", "colores_existentes", "colores_evitar" },
    "cierre":    { "usos", "referencias", "evitar", "plazo", "contacto_nombre", "contacto_telefono", "contacto_correo" }
  },
  "referencias_visuales": { "<id de opción>": { "ejemplos": ["Caterpillar", "Jeep"], "colores": ["#…"] } },
  "trampa": ""
}
```

**Del sitio (WEB), revisa cómo está hoy** antes de proponer: el `README.md` y `docs/`, cómo se enruta `/api/*` desde `apps/web` hacia `apps/api`, cómo funciona hoy la API de leads (Hono + Drizzle, Postgres en producción y SQLite en desarrollo, avisos por Brevo), cómo está protegida la intranet y dónde se define la CSP. Si algo de esto cambió desde el lanzamiento de PORTA, avísame.

## 2. Primera decisión (proponla y espera mi OK)

Cómo meter el formulario en el sitio. Evalúa y recomiéndame una:

- **A. Archivos estáticos:** copiar `servicios/brief-logo/` tal cual a `apps/web/public/brief/logo/`. Es lo más rápido y ya respeta la CSP. Hay que revisar que el layout del sitio, el dock global o los scripts no se metan en esa página, y que el CSP del servidor la deje pasar.
- **B. Página de Astro:** `apps/web/src/pages/brief/logo.astro` (o `/brief/[cliente]`) con el layout y los tokens del sitio, pasando `preguntas.js` y `clientes.js` a datos en TypeScript y la lógica a un script del sitio. Queda más integrada y usa los componentes y estilos reales, pero es más trabajo.

En cualquiera de las dos: la URL que le voy a mandar a mi prima es `https://apalmo.com/brief/logo/?c=rr-pro-hauling`, con `noindex`, sin el dock ni la navegación del sitio (es una página para el cliente, no del portafolio) y con el mismo aspecto que la referencia.

## 3. Qué hay que construir

### 3.1 Endpoint `POST /api/brief` (apps/api)
- Recibe el JSON de arriba. Valida con el esquema que ya use la API (zod o el que haya): `formulario === "apalmo-brief-marca"`, `version` entero, `respuestas` objeto, `contacto.nombre` obligatorio y cuerpo de **máximo 64 KB**.
- **Anti-spam:** si `trampa` no viene vacío, responde `200 { ok: true }` y no guardes nada. Agrega límite por IP (por ejemplo, 5 envíos por hora) y revisa que el `Origin` sea apalmo.com (y localhost en desarrollo).
- Guarda y responde `200 { ok: true }`. Si falla, responde un error JSON (4xx o 5xx). El formulario ya muestra su propio mensaje de error.
- Si el aviso por correo falla, **el brief igual se guarda** y el cliente igual ve el gracias. Registra el error en el log.

### 3.2 Base de datos: tabla `brief_respuestas`
Con migración de Drizzle, igual que las demás tablas:
- `id` (uuid), `creado_en`.
- `formulario`, `version`, `cliente` (id del preset o null), `marca`, `idioma`.
- `contacto_nombre`, `contacto_telefono`, `contacto_correo`.
- `respuestas` (json/jsonb) y `referencias_visuales` (json).
- `iniciado`, `enviado`: con esto se calcula cuánto se demoró.
- `ip_hash` (nunca la IP en claro), `user_agent`.
- `estado`: `nuevo` / `revisado` / `archivado`.
- Guarda el JSON **completo y sin transformar** en `respuestas`, para no perder nada si después cambian las preguntas.

### 3.3 Alerta para mí
- Un correo por Brevo a **contacto@apalmo.com** con asunto `Nuevo brief de marca: {marca}`.
- En el cuerpo: contacto (nombre, WhatsApp, correo), cliente, tiempo que tomó y lo principal (escritura del nombre, adjetivos, tono, tipo de logo, estilos que le gustan y que no, colores, plazo). Al final, el link al detalle en la intranet.
- Al cliente **no** se le manda nada: solo ve la pantalla de gracias.
- Si es fácil, además una notificación que me llegue al teléfono. Si no, con el correo basta.

### 3.4 Vista en la intranet
Detrás del login que ya existe:
- **Lista** de briefs: fecha, marca, cliente, contacto y estado (lo nuevo primero).
- **Detalle legible**, agrupado por paso y con las etiquetas en español, no los id:
  - Las escalas se ven como un punto entre las dos palabras.
  - Los estilos muestran sus logos de ejemplo.
  - Las paletas muestran sus colores.
  - Las etiquetas salen de las mismas definiciones de `preguntas.js` y `clientes.js`, para no duplicarlas.
- Botones **Copiar JSON para Claude** y **Descargar JSON** (este es el archivo que después pongo en `apalmo-studio/propuestas/<carpeta>/brief.json`), y **Marcar como revisado**.

### 3.5 Privacidad
- El formulario ya muestra: "Al enviar, aceptas que apalmo studio use tus respuestas solo para preparar la propuesta de tu marca y contactarte." Agrégale el link a la política de privacidad del sitio.
- Suma a la política esta finalidad (brief de diseño), el plazo de conservación que me propongas y cómo pedir que se borren los datos. Debe quedar alineada con la Ley 19.628 y lista para la 21.719 (vigente desde el 1-dic-2026), igual que la lista de espera de PORTA.

## 4. Reglas

- **No cambies DNS ni despliegues sin mi OK explícito.** Antes de volver a desplegar en Railway hay que rotar los secretos por el incidente del 21-oct (si no se hizo ya): yo hago `railway login`, tú no manejas claves ni las pegas en el chat.
- **No cambies el contenido del cuestionario** (preguntas, opciones, textos ni ids) sin preguntarme. Los ids tienen que quedar estables, porque el JSON se compara entre clientes.
- Español neutro y cercano (el cliente está en Estados Unidos), sin lenguaje de agencia.
- Si portas el formulario (opción B), conserva todo lo que ya funciona: borrador, validación, reintento, campo trampa, animaciones, reducir movimiento, inglés y presets por `?c=`.

## 5. Cómo verificarlo

En local y, después del despliegue, en producción:

1. Abrir `/brief/logo/?c=rr-pro-hauling` en el teléfono, completar los 8 pasos y enviar: aparece el gracias.
2. El registro queda en `brief_respuestas` con el JSON completo.
3. Me llega el correo con el resumen y el link.
4. En la intranet el detalle se lee bien y "Copiar JSON" entrega el mismo JSON que se envió.
5. Mandarlo con `trampa` lleno: responde 200 y no guarda nada.
6. Pasarse del límite por IP: se rechaza.
7. Un cuerpo de más de 64 KB: se rechaza.
8. Cortar la red al enviar: el formulario muestra el error y, al reintentar, funciona.
9. Probar `&lang=en` y el modo genérico (sin `?c=`).
10. La consola no muestra errores de CSP.

Al terminar, dame:
- el **link final** para mandarle a mi prima;
- dónde veo las respuestas;
- cómo agrego un cliente nuevo (una entrada en la configuración y su `?c=`).
