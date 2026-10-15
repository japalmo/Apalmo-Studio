/**
 * Andacollo · Datos de pago
 * Web app de Apps Script que lee la planilla y sirve index.html.
 * Hojas: "Datos" (Campo | Valor | Mostrar | Orden) y "Config" (Clave | Valor).
 */

const CACHE_KEY = 'datos-pago';
const CACHE_SEGUNDOS = 600; // la edición en la planilla limpia el caché al instante (onEdit)

function doGet() {
  const t = HtmlService.createTemplateFromFile('index');
  t.payload = JSON.stringify(leerDatos_()).replace(/</g, '\\u003c');
  return t.evaluate()
    .setTitle('Datos de pago · Andacollo')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, viewport-fit=cover')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function leerDatos_() {
  const cache = CacheService.getScriptCache();
  const enCache = cache.get(CACHE_KEY);
  if (enCache) return JSON.parse(enCache);

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const filas = ss.getSheetByName('Datos').getDataRange().getDisplayValues().slice(1);
  const cuenta = filas
    .filter(([campo, valor, mostrar]) => campo && valor && String(mostrar).trim().toLowerCase() !== 'no')
    .map(([campo, valor, , orden], i) => ({ campo: campo.trim(), valor: valor.trim(), orden: Number(orden) || 100 + i }))
    .sort((a, b) => a.orden - b.orden)
    .map(({ campo, valor }) => [campo, valor]);

  const config = {};
  const hojaConfig = ss.getSheetByName('Config');
  if (hojaConfig) {
    hojaConfig.getDataRange().getDisplayValues().slice(1)
      .forEach(([clave, valor]) => { if (clave) config[clave.trim()] = valor; });
  }

  const datos = { cuenta, config };
  cache.put(CACHE_KEY, JSON.stringify(datos), CACHE_SEGUNDOS);
  return datos;
}

/** Trigger simple: al editar la planilla, la página muestra el cambio en la próxima visita. */
function onEdit() {
  CacheService.getScriptCache().remove(CACHE_KEY);
}
