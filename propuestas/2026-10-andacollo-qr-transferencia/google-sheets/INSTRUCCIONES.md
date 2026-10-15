# Andacollo · Datos de pago con Google Sheets + Apps Script

1. Sube `andacollo-datos-pago.xlsx` a Google Drive y ábrelo con Google Sheets (Archivo → Guardar como Hojas de cálculo de Google).
2. En la hoja **Datos**, reemplaza la columna *Valor* con los datos reales. No cambies los nombres de las hojas ("Datos" y "Config").
3. Extensiones → Apps Script. Borra el contenido de `Código.gs` y pega `Code.gs`.
4. Archivo nuevo (+) → HTML → nómbralo exactamente `index` y pega `index.html`.
5. Implementar → Nueva implementación → tipo **Aplicación web**:
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier usuario** (sin login)
   Autoriza los permisos y copia la URL que termina en `/exec`.
6. Genera el QR con esa URL `/exec` y pégalo en el recuadro de 50 × 50 mm de la tarjeta. Graba la misma URL en el chip NFC y bloquéalo.

Los cambios en la planilla se ven al instante en la página. Si cambias el código (Code.gs o index), usa Implementar → Gestionar implementaciones → editar → Versión nueva, así la URL `/exec` no cambia y el QR impreso sigue sirviendo.
