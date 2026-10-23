# Prompt para la sesión de la web de apalmo

> Copia todo lo que está bajo la línea y pégalo como primer mensaje en una sesión nueva de Claude Code abierta en `C:\Users\juana\OneDrive - INACAP\Escritorio\Apalmo Studio\WEB`.

---

Hola. Vamos a terminar y publicar la web de **apalmo studio** en apalmo.com, y su primer artículo será sobre **PORTA**, un concepto propio en desarrollo. El artículo lleva una **lista de espera para un piloto**: quien deje sus datos es un posible cliente.

## 1. Por qué hay apuro

Mañana **24-oct-2026** publico en Instagram el reel de PORTA. El caption invita a dejar los datos y quiero poner el link al artículo en la bio y en las historias. **Lo primero es que el artículo y el formulario estén en línea y funcionando.** El resto del sitio (landing, tienda, ajustes finos) va después y lo vemos juntos.

## 2. Lee esto antes de tocar nada

**Sitio nuevo (donde trabajas):** `Apalmo Studio\WEB`, rama `feat/apalmo-site-redesign`, git local sin remoto.
- Monorepo pnpm: `apps/web` (Astro + TS + Three.js, contenido en `src/content/`) y `apps/api` (Hono + Drizzle; leads en Postgres, SQLite en desarrollo; avisos por Brevo).
- Lee `README.md` y `docs/`: `2026-09-21-plan-correctivo.md`, `COMO_PUBLICAR_BITACORA.md`, `COMO_PUBLICAR_PRODUCTO.md`, `TIENDA_CHECKOUT_PRODUCCION.md`, `INTRANET_COMERCIO_ARQUITECTURA.md`, `ASSETS_VISUALES.md`.
- La bitácora (blog) son archivos `.md`/`.mdx` en `apps/web/src/content/posts/` con estados `draft`/`coming-soon`/`published`.

**Sitio que está en línea hoy:** apalmo.com lo sirve otro proyecto, `Apalmo Studio\LANDING` (React + Vite + Express en Railway, dos servicios: web público y api privada que envía el formulario de contacto por Brevo, **sin base de datos**). Lee `LANDING\README.md` y `LANDING\docs\AUDITORIA.md`.
- **Railway tuvo un incidente de seguridad el 21-oct:** hay que rotar todos los secretos (Brevo, sesión, tokens) antes de volver a desplegar. Yo hago el `railway login`; tú no manejes claves ni las pegues en el chat.
- DNS en Cloudflare (Email Routing de contacto@apalmo.com, DMARC p=reject, DKIM de Brevo). **No cambies DNS ni despliegues sin mi OK explícito.**

**Contenido de PORTA (fuente de verdad):** `Apalmo Studio\apalmo-studio\propuestas\2026-10-porta-prevencion\kit-web\`
- `FICHA.md`: qué es, cómo funciona, qué comunicar y qué **no** (sin dashcam, sin precios, datos ficticios).
- `HISTORIA.md`: motivación y la entrevista que me hicieron estudiantes de Prevención de Riesgos de AIEP. Lo marcado `[COMPLETAR · Juan]` me lo preguntas; **no inventes** nombres, fechas ni citas.
- `medios/` + `medios/MEDIOS.md`: imágenes WebP, renders 3D, cuadros del reel, el reel a 720p y el giro 3D, con texto alternativo sugerido y lo que no se usa.
- Más material en la carpeta padre (`README.md`, PDF de la propuesta, `fuente/app` y `fuente/central` con el prototipo navegable, `reel/CAPTION.md`).
- **Ojo:** `WEB/docs/porta-descripcion-producto.md` y `apps/web/src/content/cases/porta.md` describen la versión vieja (equipo portátil con batería y botón). Actualízalos al concepto actual de `FICHA.md`.

## 3. Primera decisión (proponla y espera mi OK)

Cómo tener el artículo y la lista de espera en apalmo.com a tiempo. Evalúa y recomiéndame una:
- **A.** Publicar ya el sitio nuevo (`WEB`) en apalmo.com con lo mínimo listo: home, bitácora con el artículo de PORTA y la lista de espera funcionando. Incluye dónde corre la API, la base Postgres, las variables y los pasos de DNS.
- **B.** Si A no alcanza para mañana: una página puente de PORTA en `LANDING` (ya en línea), con el mismo artículo y formulario usando su api de contacto. Después se migra al sitio nuevo sin perder los inscritos.

Dime qué necesitas de mí (logins, claves rotadas, decisiones) y en qué orden.

## 4. El artículo de PORTA (primer post de la bitácora)

- Archivo MDX en `apps/web/src/content/posts/` (o el equivalente en el plan B), `publishState: "published"`, `featured: true`. Slug corto, por ejemplo `/bitacora/porta/`.
- Contenido que debe cubrir:
  - El problema: en faena la cobertura no siempre llega y piden los documentos del vehículo.
  - Qué es PORTA y cómo funciona (`FICHA.md`): bajo el retrovisor, memoria propia, 4G, QR por fuera y NFC por dentro, sin apps, checklists con semáforo y PORTA Central.
  - De dónde viene: motivación y entrevista de AIEP (`HISTORIA.md`).
  - Estado: concepto en desarrollo con prototipo navegable.
  - Cierre: la invitación al piloto con el formulario.
- **Voz:** este artículo sí va en primera persona, con mi historia (pedido mío; es una excepción a la regla general de la marca de no hablar de nosotros). Español de Chile, cercano y sobrio. Nada de lenguaje de agencia ni promesas que el prototipo no cumple.
- **Vocabulario:** el concepto "señal" está vetado como lenguaje de marca de apalmo (nada de telecomunicaciones en el copy del estudio). En PORTA es literal (cobertura celular) y se usa solo dentro del artículo y la página de PORTA.
- **Medios:** el reel embebido (vertical, con póster, `controls playsinline preload="none"`), el giro 3D y 4 a 6 imágenes o cuadros. Crédito visible: "Prototipo conceptual: imágenes y videos referenciales (3D + IA)." Usa la optimización de imágenes de Astro y el texto alternativo de `MEDIOS.md`.
- **SEO y redes:** título, descripción, Open Graph con `01-porta-bajo-retrovisor` o un render, JSON-LD de artículo. Dame el link final con UTM para Instagram (`?utm_source=instagram&utm_medium=bio&utm_campaign=porta-reel`).
- Actualiza el caso `cases/porta.md` y cualquier mención de PORTA en el sitio al concepto actual.

## 5. Lista de espera del piloto

- **Campos:** nombre, empresa, cargo, correo, teléfono o WhatsApp (opcional), región o faena, tamaño aproximado de flota (rango), comentario (opcional). Pide solo lo necesario.
- **Consentimiento:** casilla obligatoria, sin marcar por defecto, con la finalidad clara: "contactarte para el piloto de PORTA". Link a la política de privacidad, que hay que actualizar: responsable, finalidad, plazo de conservación, derechos y cómo pedir la eliminación. Debe cumplir la Ley 19.628 y quedar lista para la Ley 21.719, vigente desde el 1-dic-2026.
- **Backend:** reutiliza la API de leads con un origen propio (por ejemplo `source: "porta-piloto"`) o crea una tabla `waitlist`. Guarda la fecha y versión del consentimiento y los UTM. Agrega anti-spam (honeypot y límite por IP) y deduplicación por correo.
- **Avisos:** un correo a contacto@apalmo.com por cada inscrito (Brevo) y, si es simple, una confirmación al inscrito.
- **Para mí:** una vista en la intranet o admin con la lista y exportación CSV.
- **Pruebas:** e2e del formulario (éxito, validaciones, honeypot) y prueba de la API.

## 6. Después del artículo (segunda etapa)

Terminar el sitio real según `docs/2026-09-21-plan-correctivo.md`:
- **Landing** y servicios.
- **Tienda:** visible, pero cada producto solo como disponible con stock real y checkout válido. Pendientes legales: boleta, retracto, garantía y despacho.
- **Bitácora:** los artículos de demo quedan en `draft` salvo que yo diga otra cosa.
- **Portafolio:** solo lo que yo publique.
- **Intro:** se mantiene la intro de constelación.

Esto lo vamos viendo paso a paso.

## 7. Reglas

- **Marca:** paleta verde bosque `#1A2E20`, cobre `#B87333`, crema `#FDFBF0` y azul `#094D92`; celeste `#669BBC` solo como decoración. Tipografías Space Grotesk e Inter. Wordmark "apalmo" en minúscula; su "o" ya es el isotipo, así que nunca van juntos. La firma de PORTA es "PORTA by apalmo".
- **Nada genérico:** si se ve como la web de cualquier agencia, está mal.
- **Calidad:** antes de decir que algo está listo, corre `pnpm typecheck`, `pnpm build`, `pnpm test:api` y `pnpm test:e2e`, y revisa en el navegador, también en tamaño móvil.
- **Commits:** en español, uno por avance. Nada de push, deploy ni DNS sin mi OK. Ningún secreto en el repo ni en el chat.
- **Preguntas:** si algo no está en las carpetas, pregúntame antes de inventarlo.
