# Formato de importación · Finanzas de apalmo studio

Este es el formato común entre:

- la skill **`ordenar-boletas`** (`.claude/skills/ordenar-boletas/`), que ordena boletas y facturas y genera estos archivos, y
- la pantalla **Finanzas → Importar** de la intranet de apalmo.com, que los lee, muestra una vista previa y los carga cuando Juan los confirma.

Si cambias algo aquí, cámbialo en los dos lados.

## Reglas generales

- Archivos **CSV en UTF-8**, separados por **punto y coma** (`;`), con la primera fila de encabezados. Excel en Chile los abre bien así.
- **Fechas** en `AAAA-MM-DD`.
- **Montos en pesos** como entero, sin puntos ni signo: `1250000`, no `$1.250.000`.
- **Montos en dólares** con punto decimal: `200.00`.
- Columna vacía = dato desconocido. No inventar valores.
- `archivo` es el nombre del comprobante (foto o PDF) que va junto al CSV, en la carpeta `comprobantes/`.
- Los archivos con datos reales **nunca se suben a este repositorio** (es público). Van en `privado/`, que está en `.gitignore`.

## Valores permitidos

| Campo | Valores |
|---|---|
| `titular` | `persona_natural` · `empresa` |
| `documento` (ingresos) | `factura` · `boleta` · `boleta_honorarios` · `sin_documento` |
| `documento` (gastos y activos) | `factura` · `boleta` · `comprobante_extranjero` (invoice de Anthropic, OpenAI, Adobe…) · `sin_documento` |
| `moneda` | `CLP` · `USD` |
| `ciclo` | `mensual` · `anual` |
| `categoria` (activos) | `impresora_3d` · `grabador_laser` · `mobiliario` · `computacion` · `herramientas` · `otro` |
| `categoria` (gastos) | `filamento` · `insumos` (NFC, MDF, acrílico, argollas, pintura…) · `suscripcion` · `software_servicios` (Railway, dominio, Brevo…) · `marketing` · `envios` · `repuestos_mantencion` · `comisiones_bancarias` · `impuestos` · `contador_tramites` · `otros` |
| `tipo` (trabajos) | `impresion_3d` · `grabado_laser` · `diseno` · `desarrollo` · `video_contenido` · `mixto` · `interno` |
| `estado` (trabajos) | `cotizado` · `aceptado` · `en_curso` · `entregado` · `cerrado` · `perdido` |
| `estado` (cobros) | `pendiente` · `cobrado` · `anulado` (lo vencido se calcula solo) |
| `medio` | `transferencia` · `efectivo` · `tarjeta` · `otro` |

## Archivos

### `activos.csv`: la inversión (máquinas, rack, computador)
```
fecha;nombre;categoria;proveedor;monto_clp;documento;n_documento;titular;vida_util_meses;notas;archivo
```
`vida_util_meses`: si no se sabe, dejar vacío (la intranet usa 36).

### `gastos.csv`: todo lo que no es inversión
```
fecha;descripcion;categoria;proveedor;monto;moneda;tipo_cambio;monto_clp;documento;n_documento;titular;trabajo;notas;archivo
```
- Si `moneda` es `USD`: `monto` en dólares, `tipo_cambio` = dólar observado del día del cargo y `monto_clp` = lo que se cobró en la tarjeta si aparece en la cartola; si no, `monto × tipo_cambio`.
- `trabajo`: código del trabajo (por ejemplo `AP-2026-005`) si el gasto es de un trabajo concreto, o `INTERNO-ARMADO` si es del armado de procesos del estudio. Vacío si es gasto general.
- Los cargos mensuales de suscripciones ya pagados también van aquí (una fila por cargo), con `categoria` = `suscripcion`.

### `suscripciones.csv`: las que siguen activas (para proyectar)
```
nombre;proveedor;plan;monto;moneda;ciclo;dia_cobro;fecha_inicio;uso;activa
```
`uso`: para qué se usa (por ejemplo, "Photoshop" o "videos para redes"). `activa`: `si` · `no`.

### `trabajos.csv`
```
codigo;cliente;nombre;tipo;estado;monto_total_clp;documento_previsto;fecha_cotizacion;fecha_aceptacion;fecha_entrega;probabilidad;notas
```
- `codigo`: el de la cotización (`AP-2026-005`). Si no tiene, `AP-<año>-X<nn>`.
- `probabilidad`: 0 a 100, solo para `cotizado`.

### `cobros.csv`: cuotas, anticipos y fases de cada trabajo
```
trabajo;concepto;monto_clp;fecha_esperada;estado;fecha_cobro;medio;documento;n_documento;titular;notas
```
- Una fila por cuota: `Anticipo 50%`, `Saldo contra entrega`, `Fase 1`, `Fase 2`…
- `monto_clp`: lo que paga el cliente (con IVA si es factura o boleta afecta). Si es boleta de honorarios y el cliente retuvo, anota el bruto y en `notas` escribe `retenido por cliente`.
