# apalmo studio

Repositorio de trabajo de apalmo studio: propuestas para clientes (`propuestas/`), servicios repetibles (`servicios/`) y documentos internos (`interno/`).

## Reglas

- **Este repositorio es público.** No subas datos financieros, boletas, montos personales, claves ni datos privados de clientes. Lo privado va en `privado/` (está en `.gitignore`).
- **Lo que se aprende se guarda como skill.** Cuando un proceso se repite (cotizar, ordenar boletas, armar una propuesta, un brief), déjalo como skill en `.claude/skills/<nombre>/SKILL.md`, o mejora la que ya existe, para hacerlo más rápido y con menos créditos la próxima vez. Al terminar un trabajo, propón qué agregar a una skill.

## Skills

| Skill | Para qué |
|---|---|
| `ordenar-boletas` | Ordena boletas y comprobantes en los CSV de Finanzas de la intranet (`interno/finanzas/FORMATO-IMPORTACION.md`). |

## Finanzas

El módulo de Finanzas vive en la intranet de apalmo.com (proyecto WEB, local). Su especificación está en `interno/finanzas/PROMPT-SESION-LOCAL.md`.
