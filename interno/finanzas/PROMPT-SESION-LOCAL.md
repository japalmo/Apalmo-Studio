# Prompt para la sesión local: módulo de Finanzas en la intranet de apalmo.com

> Abre una sesión nueva de Claude Code en `C:\Users\juana\OneDrive - INACAP\Escritorio\Apalmo Studio\WEB` (el proyecto que sirve apalmo.com), copia todo lo que está bajo la línea y pégalo como primer mensaje.

---

Hola. Necesito un **módulo de Finanzas** dentro de la intranet de apalmo.com. Hoy opero sin ningún control: invertí cerca de 2 millones en máquinas, pago varias suscripciones de IA todos los meses y no sé si estoy cubriendo los gastos. Soy malo con los números, así que el módulo tiene que **decirme las cosas claras**, no solo guardar datos. Lo voy a usar sobre todo **desde el teléfono**.

## 1. El negocio (léelo para entender los datos)

apalmo studio es un estudio de una persona (yo, Juan) que mezcla:

- **Productos físicos:** impresión 3D, grabado láser, tarjetas NFC + QR, llaveros, soportes.
- **Servicios:** diseño de marca y logos, desarrollo web y apps, videos y contenido para redes, propuestas de innovación.

Cómo entra y sale la plata:

| Tipo | Qué es | Ejemplos |
|---|---|---|
| **Inversión** (una vez) | Hay que recuperarla | 2 impresoras 3D, grabador láser, rack hecho a medida |
| **Costos fijos** (todos los meses) | Se pagan aunque no haya trabajos; muchos en dólares | Claude Max, ChatGPT, Higgsfield, Adobe (Photoshop), Railway, dominio |
| **Costos por trabajo** | Se gastan para un trabajo concreto | Filamento, NFC, MDF, acrílico, envíos |
| **Ingresos en cuotas** | Casi nunca se cobra todo de una vez | Mis cotizaciones son 50 % al confirmar y 50 % contra entrega. Humanitas se cobra **por fases** y todavía no he cobrado nada |

Otros datos que importan:

- **Tributario:** tengo inicio de actividades como **persona natural** y voy a **crear una empresa** pronto (aún no existe). Cada ingreso y gasto tiene que poder marcarse como `persona_natural` o `empresa`, para que el cambio quede limpio. Hay trabajos con factura, con boleta, con boleta de honorarios y **sin documento**.
- **Cotizaciones:** tienen código (`AP-2026-005`). Ese es el código del trabajo.
- **Sueldo:** mi meta es llegar a **un sueldo mensual fijo** (la cifra la cargo yo en la configuración). Al principio quizás no llegue: la prioridad es **cubrir los costos** y después subir hasta la meta.
- **Etapa actual:** estoy armando procesos y skills de Claude para trabajar más rápido y gastar menos créditos por proyecto. Ese gasto es una **inversión en procesos**, y quiero verla separada de los trabajos de clientes (un trabajo interno `INTERNO-ARMADO`).

## 2. Lee esto antes de tocar nada

- **Formato de importación:** está en el repo `Apalmo Studio\apalmo-studio` (GitHub `japalmo/apalmo-studio`), rama **`finanzas-intranet`**, archivo `interno/finanzas/FORMATO-IMPORTACION.md`. Define los campos, categorías y valores permitidos. **Usa esos mismos nombres en la base de datos**, porque una skill de Claude genera archivos con ese formato a partir de mis boletas.
  ```
  cd "..\apalmo-studio"
  git fetch origin finanzas-intranet
  git checkout finanzas-intranet
  ```
- **Del sitio (WEB), revisa cómo está hoy** antes de proponer: `README.md` y `docs/`, cómo se enruta `/api/*` desde `apps/web` hacia `apps/api` (Hono + Drizzle, Postgres en producción y SQLite en desarrollo), cómo está protegida la intranet (el login), cómo se mandan los correos (Brevo), dónde se define la CSP y si ya existe la vista de briefs de la intranet, para seguir el mismo estilo. Si algo cambió, avísame.

## 3. Primeras decisiones (propónmelas y espera mi OK)

1. **Rutas y navegación:** propón cómo queda `Intranet → Finanzas` y sus pantallas (sección 6) usando el layout y los componentes reales de la intranet. Tiene que funcionar muy bien en el teléfono: registrar un gasto debe tomar menos de 30 segundos.
2. **Comprobantes (fotos y PDF de boletas):** dónde guardarlos. Evalúa un volumen de Railway, un bucket compatible con S3 (por ejemplo Cloudflare R2) o la base de datos, con costo, respaldo y complejidad. Recomiéndame uno.
3. **Seguridad:** son mis datos financieros. Dime cómo está protegido hoy el login de la intranet y si conviene sumar algo (sesión que expira, segundo factor o volver a pedir la clave para exportar).

## 4. Base de datos (Drizzle, con migraciones como el resto)

Tablas con prefijo `fin_`. **Dinero en pesos como entero** (`integer`/`bigint`, sin decimales); dólares en centavos (entero). Todas con `id` uuid, `creado_en` y `actualizado_en`.

- **`fin_config`** (una fila): meta de sueldo mensual, porcentajes del reparto (sección 5), reserva de impuestos por tipo de documento, vida útil por defecto de los activos (36 meses), meses objetivo para recuperar la inversión, fecha desde la que opera la empresa.
- **`fin_activos`**: fecha, nombre, categoría, proveedor, monto_clp, documento, n_documento, titular, vida_util_meses, estado (`activo`, `vendido`, `dado_de_baja`), notas, comprobante.
- **`fin_suscripciones`**: nombre, proveedor, plan, monto, moneda, ciclo, día de cobro, fecha de inicio y de término, uso, activa.
- **`fin_gastos`**: fecha, descripción, categoría, proveedor, monto, moneda, tipo_cambio, monto_clp, documento, n_documento, titular, trabajo_id (opcional), suscripcion_id (opcional), notas, comprobante.
- **`fin_clientes`**: nombre, RUT (opcional), contacto, WhatsApp, correo.
- **`fin_trabajos`**: código, cliente_id, nombre, tipo, estado, monto_total_clp, documento previsto, fechas de cotización, aceptación y entrega, probabilidad (0–100, solo cotizados), horas (opcional), carpeta de la propuesta en `apalmo-studio/propuestas/…` (texto), notas.
- **`fin_cobros`**: trabajo_id, concepto (`Anticipo 50%`, `Fase 1`…), monto_clp, fecha_esperada, estado, fecha_cobro, medio, documento, n_documento, titular, retenido_por_cliente (sí/no), notas.
- **`fin_retiros`**: lo que de verdad saco de cada bolsa (sueldo, marketing, recuperación/reinversión, colchón, impuestos pagados), con fecha, monto y nota. Sirve para comparar lo asignado con lo que realmente usé.

## 5. Reglas de cálculo (lo más importante)

Pon estas reglas en **un solo módulo de funciones puras** con **tests**, para que las pantallas, las alertas y el resumen usen exactamente la misma cuenta.

### 5.1 Dólar
- Las suscripciones en USD se convierten con el **dólar observado** del día. Tómalo **desde la API (servidor)**, no desde el navegador, para no tocar la CSP: `https://mindicador.cl/api/dolar` (y `/api/dolar/DD-MM-AAAA` para una fecha). Guarda el valor en caché un día y deja editarlo a mano.
- **Guarda el tipo de cambio usado en cada gasto.** Nunca recalcules gastos pasados.

### 5.2 La cascada del mes
Cada mes se calcula así, en este orden:

1. **Ingresos:** lo cobrado en el mes (cobros con estado `cobrado` y `fecha_cobro` en el mes).
2. **Reserva de impuestos**, según el documento de cada cobro, con porcentajes de `fin_config`:
   - `boleta_honorarios`: 15,25 % del bruto (retención 2026; sube a 16 % en 2027). Si `retenido_por_cliente`, no se reserva, pero el ingreso real es el líquido.
   - `factura` o `boleta` afecta: el IVA incluido (19/119 del monto) va a la reserva, más un % de provisión de renta configurable.
   - `sin_documento`: 0 %, pero se muestra aparte como **ingreso sin respaldo**.
   - Deja todos los % editables y una nota visible: "Valores para revisar con el contador".
3. **Costos de los trabajos:** gastos del mes ligados a un trabajo.
4. **Costos fijos:** suscripciones y gastos sin trabajo (incluido `INTERNO-ARMADO`, que se muestra aparte como "inversión en procesos").
5. **Excedente** = 1 − 2 − 3 − 4.
   - **Si es positivo**, se reparte con los % de `fin_config`: **sueldo 60 %, recuperación de la inversión 30 %, marketing 10 %**. El sueldo tiene **tope en la meta**: lo que pase de la meta se va a recuperación.
   - **Si es negativo**, es **déficit**: no hay sueldo ni marketing ese mes y el déficit se **resta** de lo recuperado. Así la cuenta es honesta.
6. Cuando la inversión está recuperada, la bolsa de recuperación pasa a llamarse **reinversión**.

### 5.3 Recuperación de la inversión
- **Recuperado** = suma de la bolsa de recuperación de todos los meses (con los déficits restados).
- **% recuperado** = recuperado / total de `fin_activos` (sin los vendidos ni dados de baja).
- **Fecha estimada** = inversión pendiente / promedio de la bolsa de recuperación de los **últimos 3 meses**. Si ese promedio es 0 o negativo, el módulo no inventa fecha: dice "Con el ritmo actual no se recupera" y muestra cuánto habría que cobrar para lograrlo en los meses objetivo.
- **Desgaste:** muestra cuánto cuestan las máquinas al mes (monto / vida útil). Es un costo que mis precios deberían cubrir.

### 5.4 Los tres niveles del mes (cuánto necesito cobrar)
Calcúlalos con el promedio de costos fijos de los últimos 3 meses (las suscripciones activas convertidas a pesos), la tasa promedio de impuestos y el margen promedio de los trabajos (1 − costos del trabajo / ingreso; si no hay datos, 80 %):

| Nivel | Qué significa | Excedente necesario |
|---|---|---|
| **1. Cubrir costos** | No pierdo plata | 0 |
| **2. Sueldo meta** | Me pago la meta completa | meta / % sueldo |
| **3. Recuperar a tiempo** | Además recupero la inversión en los meses objetivo | máximo entre el nivel 2 y (pendiente / meses objetivo) / % recuperación |

**Cobro necesario** = (costos fijos + excedente necesario) / ((1 − tasa de impuestos) × margen). Muestra los tres montos y en qué nivel voy este mes.

### 5.5 Proyección: ¿necesito buscar más trabajo?
- Para los **próximos 6 meses**, suma por mes:
  - los cobros pendientes de trabajos `aceptado`, `en_curso` o `entregado`, según su fecha esperada (seguros);
  - los cobros de trabajos `cotizado`, multiplicados por su probabilidad (posibles).
- Compara cada mes con los niveles 1 y 2. Los meses bajo el nivel 1 salen marcados: **"Mes con hoyo: busca trabajo"**, con cuánto falta.
- **Simulador:** un control de "si cobro $X al mes" que muestra en cuántos meses recupero, cuánto sueldo me queda y en qué nivel quedo.

## 6. Pantallas

1. **Resumen** (lo primero que veo, en el teléfono):
   - Barra de inversión recuperada (% y monto) y fecha estimada.
   - Este mes: cobrado vs. los tres niveles, en semáforo (rojo bajo el 1, amarillo entre el 1 y el 2, verde sobre el 2).
   - Lo que me toca este mes: sueldo, marketing y recuperación, y cuánto ya saqué de cada uno (`fin_retiros`).
   - Por cobrar en los próximos 30 días y lo vencido, en rojo.
   - Costo fijo mensual actual, desglosado por suscripción.
   - Ingresos sin documento del año, como aviso.
   - Una frase en lenguaje simple, por ejemplo: "Este mes cubriste tus costos y te quedan $X para tu sueldo. Te faltan $Y para llegar a la meta."
2. **Por cobrar:** todas las cuotas pendientes, primero las vencidas y después por fecha. Botón **Marcar como cobrado** (fecha, medio, documento y número) y botón **Copiar recordatorio para WhatsApp**, con un texto amable con el concepto, el monto y los datos de transferencia de la configuración.
3. **Trabajos:** lista por estado, con lo cobrado y lo pendiente de cada uno. En el detalle: sus cuotas (agregar, editar, generar "50 % / 50 %" o "N fases" con un botón), sus gastos y su margen.
4. **Gastos:** registro rápido (monto, categoría, fecha de hoy por defecto, foto del comprobante) y lista filtrable por mes, categoría y titular.
5. **Suscripciones:** las activas, con su costo en pesos al dólar de hoy, el próximo cobro y el total mensual y anual. Al llegar el día de cobro se **crea sola** la fila en `fin_gastos` (tarea diaria). Tiene que poder ajustarse el monto real que salió en la cartola.
6. **Inversión:** los activos, su desgaste mensual y la recuperación.
7. **Proyección:** los 6 meses y el simulador (sección 5.5).
8. **Importar:** subir los CSV de `FORMATO-IMPORTACION.md` junto con sus comprobantes. Antes de guardar nada muestra una **vista previa** con errores (categoría inválida, trabajo inexistente, posible duplicado: misma fecha, monto y proveedor). Nada se guarda sin mi confirmación.
9. **Configuración:** meta de sueldo, % del reparto, % de impuestos, meses objetivo, datos de transferencia para los recordatorios y titular por defecto.
10. **Exportar:** CSV de todo (mismo formato de importación) para el contador y como respaldo.

## 7. Alertas (Brevo, a contacto@apalmo.com)

- Una cuota vence en 3 días, o vence hoy sin estar cobrada.
- Una suscripción se renueva en 3 días, con el monto estimado en pesos.
- **Resumen semanal, los lunes:** cómo va el mes frente a los niveles, lo que vence en la semana y el próximo mes con hoyo.
- Si falla el correo, se registra en el log y no se rompe nada.

## 8. Por etapas (muéstrame cada una funcionando antes de seguir)

1. **Etapa 1:** tablas, configuración, activos, gastos, suscripciones, trabajos y cobros (con generar 50/50 y fases), importar con vista previa y el Resumen con recuperación, niveles y por cobrar. Con esto ya sé dónde estoy parado.
2. **Etapa 2:** cascada y reparto completos, retiros, proyección y simulador, gastos automáticos de suscripciones, dólar automático, alertas y exportar.
3. **Etapa 3:** rentabilidad por tipo de trabajo (qué me deja más plata: 3D, láser, diseño, desarrollo o video), costo por hora y, si vale la pena, inventario de rollos de filamento con costo por gramo.

## 9. Reglas

- **No despliegues ni cambies DNS sin mi OK explícito.** Si no se hizo, antes de volver a desplegar en Railway hay que rotar los secretos por el incidente del 21-oct: yo hago `railway login`; tú no manejas claves ni las pegas en el chat.
- **No cargues datos de ejemplo en producción.** En desarrollo, sí, con un seed que se pueda borrar.
- **No subas datos financieros reales a ningún repositorio,** y menos a `apalmo-studio`, que es público.
- Textos en español de Chile, simples y directos, sin jerga contable. Si un término es inevitable (IVA, retención), agrega una explicación corta al lado.
- Formato chileno en pantalla: `$1.250.000`, fechas `31-10-2026`.

## 10. Cómo verificarlo

1. Tests de la sección 5: un mes con déficit, uno sobre la meta (el excedente pasa a recuperación), honorarios retenidos y no retenidos, una factura con IVA, una suscripción en USD con el tipo de cambio guardado y la fecha estimada con un promedio de 0.
2. Cargar desde el teléfono un gasto con foto en menos de 30 segundos.
3. Crear un trabajo de $35.000 con "50 % / 50 %", marcar el anticipo como cobrado y ver que el Resumen cambia.
4. Crear un trabajo por fases (como Humanitas) con 3 cuotas futuras y ver que aparecen en Por cobrar y en la Proyección.
5. Importar un CSV con un error y un duplicado: la vista previa los muestra y no se guarda nada hasta confirmar.
6. Que llegue el correo de una cuota por vencer (en desarrollo, con la fecha forzada).
7. Sin errores de CSP en la consola.

Al terminar cada etapa, dime: dónde lo veo, qué cargo primero y qué quedó pendiente.
