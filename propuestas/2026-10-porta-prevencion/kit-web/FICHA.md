# PORTA · ficha para la web (alcance vigente al 23-oct-2026)

Fuente de verdad para el artículo y el caso en la web. Reemplaza la descripción de julio (`WEB/docs/porta-descripcion-producto.md`, equipo portátil con batería y botón), que **quedó obsoleta**.

## Qué es

Un pequeño computador de **7 × 4 × 3 cm** (más chico que un celular) que va **abrazado al pie del espejo retrovisor** de un vehículo de faena. Se sujeta con una abrazadera, sin adhesivo ni perforaciones, y queda justo bajo el espejo sin tapar la visión. Se alimenta con la batería del vehículo.

Promesa: **"Sin señal. Sin problema."** La documentación y los checklists viajan a bordo y se pueden usar aunque no haya cobertura celular.

## Cómo funciona

1. **Desde la oficina (con señal):** en **PORTA Central** (portal web) el área de prevención carga documentos en la ficha del vehículo o los publica a toda la flota, a una faena o a un solo equipo.
2. **Por 4G:** cada PORTA tiene un chip con datos. Apenas tiene cobertura, descarga lo nuevo. Nunca hay que sacarlo del vehículo.
3. **En terreno (sin señal):** PORTA procesa y guarda todo a bordo (memoria de 128 GB) y crea su propia red Wi-Fi (por ejemplo `PORTA-CH04`).
4. **Se entra en un toque:** desde afuera, escaneando el **código QR** a través del parabrisas; desde adentro, acercando el teléfono a la **zona NFC** "Acerca tu teléfono". El menú se abre en el navegador, **sin instalar apps**.
5. **Se consulta y se registra:** documentos y checklists con resultado al instante.
6. **Cuando vuelve la señal:** los registros suben solos a PORTA Central.

## Qué lleva a bordo

- **Documentos de la faena:** procedimientos de trabajo seguro (PTS), contrato y reglamento interno (RIOHS), información de riesgos (IRL), hojas de datos de seguridad (HDS), plan de emergencia.
- **Documentos del vehículo:** permiso de circulación, revisión técnica, SOAP, mantenciones.
- **Checklists:** vehículo (pre-uso), fatiga y somnolencia, generador. Se pueden sumar otros (trabajo en altura, herramientas eléctricas…).
- **Resultado tipo semáforo:** **Apto** (todo conforme, se guarda el registro) · **Apto con observaciones** (fallas no críticas: operar con precaución y reportar) · **No apto** (ítem crítico o fatiga alta: se avisa al supervisor). Los criterios los define el área de prevención de cada empresa.

## Por dentro

Mini computador Raspberry Pi Zero 2 W · módulo 4G LTE con GPS y SIM · memoria microSD 128 GB · NFC · reloj de tiempo real · carcasa impresa en 3D. Cara hacia la cabina: zona NFC naranja y LED de estado. Cara hacia el parabrisas: código QR.

## Estado

**Concepto en desarrollo.** Ya existe: diseño y modelo 3D, prototipo navegable de la app del trabajador y de PORTA Central (`../fuente/app/`, `../fuente/central/`), demo local para presentaciones (`../demo/`). El hardware no está fabricado. Lo que viene: **piloto** con empresas interesadas (de ahí la lista de espera).

## Qué NO comunicar (decisiones de Juan)

- **Dashcam / grabación de video** y la detección automática de somnolencia: fuera del mensaje por ahora (el diseño físico conserva las cámaras, pero no se mencionan).
- **Precios.** La lista de materiales (≈ $230.000 por equipo) es interna.
- Marcas reales de empresas, faenas o personas. Los datos de la interfaz son ficticios (CH-04, KT-KD-41, "Juan Pérez", GEN-07).

## Frases aprobadas (del reel y el caption)

- "Sin señal. Sin problema."
- "¿En faena no hay señal?" (como pregunta: hay puntos con cobertura).
- "Te presento PORTA: un pequeño computador que va bajo el retrovisor, con memoria propia y 4G."
- "Se conecta en un toque: código QR por fuera, NFC por dentro, y sin aplicaciones."
- "Desde PORTA Central cargas los documentos del vehículo. Con 4G, llegan solos al equipo."
- "Así, en terreno, basta escanear: todo al día."
- Firma: "PORTA. Un concepto en desarrollo de apalmo studio."
