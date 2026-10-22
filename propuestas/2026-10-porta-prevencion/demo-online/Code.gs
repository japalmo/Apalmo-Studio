/**
 * PORTA · demo en línea (Google Apps Script)
 * Sirve dos pantallas:
 *   ?v=central  → PORTA Central para el proyector (con QR para abrir la app en los celulares)
 *   ?v=app      → app del trabajador (celular)
 * El estado se comparte entre todos los que abren el link (se guarda en CacheService por 6 horas).
 */

var ZONA = 'America/Santiago';
var CLAVE = 'porta-estado-v1';
var DURACION = 21600; // 6 h (máximo de CacheService)

function doGet(e) {
  var v = (e && e.parameter && e.parameter.v) || '';
  var url = ScriptApp.getService().getUrl();
  if (v === 'app' || v === 'central') {
    var t = HtmlService.createTemplateFromFile(v === 'app' ? 'App' : 'Central');
    t.url = url;
    return t.evaluate()
      .setTitle(v === 'app' ? 'PORTA · trabajador' : 'PORTA Central')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1, viewport-fit=cover')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
  return HtmlService.createHtmlOutput(inicio_(url))
    .setTitle('PORTA · demo')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function inicio_(url) {
  return '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">' +
    '<style>body{margin:0;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;background:#1C2126;color:#fff;font-family:Inter,sans-serif;padding:24px;box-sizing:border-box;text-align:center}' +
    'h1{font-size:30px;margin:0;letter-spacing:.14em}h1 span{color:#FF8A3D}p{color:#aab3bc;margin:0 0 10px;max-width:420px;line-height:1.5}' +
    'a{display:block;width:100%;max-width:360px;padding:18px;border-radius:16px;background:#F26B1D;color:#fff;text-decoration:none;font-weight:800;font-size:17px}a.s{background:#2A3138}a small{display:block;font-weight:400;font-size:13px;opacity:.85;margin-top:4px}</style>' +
    '<h1>PORTA <span>DEMO</span></h1><p>Documentación, checklists y dashcam a bordo, aunque no haya señal.</p>' +
    '<a href="' + url + '?v=app" target="_top">📱 Abrir la app del trabajador<small>Para usar en el celular</small></a>' +
    '<a class="s" href="' + url + '?v=central" target="_top">🖥️ Abrir PORTA Central<small>Para el proyector o el computador</small></a>';
}

/* ===================== estado compartido ===================== */

function hora_() { return Utilities.formatDate(new Date(), ZONA, 'HH:mm'); }

function estadoInicial_() {
  var docs = [
    ['pts-conduccion', 'pts', 'PTS-012 Conducción en faena', 'v4 · mar 2026', 6],
    ['pts-generador', 'pts', 'PTS-027 Uso de generador portátil', 'v3 · oct 2026', 4],
    ['pts-altura', 'pts', 'PTS-031 Trabajo en altura', 'v3 · ene 2026', 9],
    ['contrato', 'contratos', 'Contrato de trabajo – J. Pérez', 'Firmado 03-2025', 8],
    ['riohs', 'contratos', 'Reglamento Interno (RIOHS)', 'Ed. 2026', 54],
    ['irl-conductor', 'irl', 'IRL – Conductor camioneta', '2026', 3],
    ['hds-diesel', 'hds', 'HDS Petróleo diésel', 'Rev. 2025', 12],
    ['plan-emergencia', 'emergencia', 'Plan de emergencia faena', 'v5 · 2026', 14]
  ].map(function (d) { return { id: d[0], cat: d[1], nombre: d[2], ver: d[3], pags: d[4], enEquipo: true, publicado: 'Antes', nuevo: false }; });
  return {
    ver: 1, senal4g: true, transfiriendo: false, tx: 0, ultimaSync: '07:12', conectados: 0,
    docs: docs,
    registros: [
      { id: 'r1', tipo: 'fatiga', titulo: 'Fatiga y somnolencia', quien: 'M. Rojas', hora: '06:48', res: 'Apto', estado: 'ok', obs: [], enviado: true },
      { id: 'r2', tipo: 'vehiculo', titulo: 'Checklist de vehículo', quien: 'M. Rojas', hora: '06:55', res: 'Apto para operar', estado: 'ok', obs: [], enviado: true }
    ],
    eventos: [
      { hora: '06:21', texto: 'Documentos actualizados por 4G', color: 'az' },
      { hora: '06:05', texto: 'Equipo encendido con el vehículo', color: 'gr' }
    ],
    pasos: {}
  };
}

function cargar_() {
  var s = CacheService.getScriptCache().get(CLAVE);
  return s ? JSON.parse(s) : estadoInicial_();
}
function guardar_(e) { e.ver++; CacheService.getScriptCache().put(CLAVE, JSON.stringify(e), DURACION); }

function pendientes_(e) {
  return e.docs.some(function (d) { return !d.enEquipo; }) || e.registros.some(function (r) { return !r.enviado; });
}

function sincronizar_(e) {
  e.transfiriendo = false; e.tx = 0;
  if (!e.senal4g) return;
  var nuevos = e.docs.filter(function (d) { return !d.enEquipo; });
  nuevos.forEach(function (d) { d.enEquipo = true; });
  if (nuevos.length) e.eventos.unshift({ hora: hora_(), texto: (nuevos.length === 1 ? 'Documento recibido' : nuevos.length + ' documentos recibidos') + ' por 4G: ' + nuevos.map(function (d) { return d.nombre; }).join(', '), color: 'az' });
  var regs = e.registros.filter(function (r) { return !r.enviado; });
  regs.forEach(function (r) {
    r.enviado = true; r.recibido = hora_();
    e.eventos.unshift({ hora: r.hora, texto: r.titulo + ' · ' + r.quien, color: r.estado === 'ok' ? 'ok' : r.estado === 'alerta' ? 'al' : 'pe', res: r.res, estado: r.estado });
    if (r.estado === 'mal' && e.pasos.fatiga) e.pasos.alertaRecibida = true;
  });
  if (nuevos.length || regs.length) e.ultimaSync = hora_();
  e.eventos = e.eventos.slice(0, 40);
}

// Avanza la "transferencia por 4G": si hay algo pendiente y hay señal, se entrega a los ~2 segundos.
function avanzar_(e) {
  var cambio = false;
  if (e.tx && Date.now() - e.tx > 1800) { sincronizar_(e); cambio = true; }
  if (e.senal4g && pendientes_(e) && !e.tx) { e.tx = Date.now(); e.transfiriendo = true; cambio = true; }
  return cambio;
}

function reducir_(e, a) {
  switch (a.t) {
    case 'senal':
      e.senal4g = !!a.valor;
      if (!a.valor) { e.pasos.sinSenal = true; e.tx = 0; e.transfiriendo = false; }
      e.eventos.unshift({ hora: hora_(), texto: a.valor ? 'Vehículo vuelve a tener señal 4G' : 'Vehículo entra a zona sin señal', color: a.valor ? 'ok' : 'gr' });
      break;
    case 'conectar':
      e.conectados = (e.conectados || 0) + 1; e.pasos.conectado = true; break;
    case 'publicar':
      e.docs.unshift({ id: 'pub-' + Date.now(), cat: a.doc.cat || 'pts', nombre: String(a.doc.nombre).slice(0, 120), ver: 'Nuevo · ' + hora_(), pags: a.doc.pags || 1,
        pdfId: a.doc.pdfId || null, html: a.doc.html || null, enEquipo: false, publicado: hora_(), nuevo: true });
      e.pasos.publicado = true;
      break;
    case 'visto':
      if (String(a.id).indexOf('pub-') === 0) e.pasos.leido = true;
      break;
    case 'registro':
      var r = a.reg;
      e.registros.push({ id: 'r' + Date.now() + Math.floor(Math.random() * 1000), tipo: r.tipo, titulo: r.titulo, quien: String(r.quien || 'Sin nombre').slice(0, 40),
        res: r.res, estado: r.estado, obs: (r.obs || []).slice(0, 8), hora: hora_(), enviado: false });
      if (r.tipo === 'fatiga' && r.estado !== 'ok') e.pasos.fatiga = true;
      if (r.tipo === 'incidente') e.pasos.incidente = true;
      if (e.registros.length > 80) e.registros = e.registros.slice(-80);
      break;
    case 'gestionar':
      e.registros.forEach(function (x) { if (x.id === a.id) { x.gestionada = true; e.eventos.unshift({ hora: hora_(), texto: 'Alerta gestionada: ' + x.titulo + ' · ' + x.quien, color: 'ok' }); } });
      break;
    case 'reiniciar':
      var v = e.ver; e = estadoInicial_(); e.ver = v; break;
  }
  return e;
}

/* ===================== funciones llamadas desde las páginas ===================== */

// Devuelve el estado solo si cambió respecto de la versión que ya tiene el cliente.
function leer(verCliente) {
  var e = cargar_();
  if (e.tx && Date.now() - e.tx > 1800) {
    var lock = LockService.getScriptLock();
    if (lock.tryLock(3000)) {
      try { e = cargar_(); if (avanzar_(e)) guardar_(e); } finally { lock.releaseLock(); }
    }
  }
  return e.ver === verCliente ? null : e;
}

function accion(a) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var e = reducir_(cargar_(), a);
    avanzar_(e);
    guardar_(e);
    return e;
  } finally { lock.releaseLock(); }
}

// PDFs publicados desde la central: se guardan por partes en la caché (máx. ~3 MB).
function subirPdf(nombre, cat, base64) {
  if (!base64 || base64.length > 4200000) throw new Error('El PDF es muy grande para la demo (máximo 3 MB).');
  var id = 'pdf-' + Date.now(), partes = {}, n = 0;
  for (var i = 0; i < base64.length; i += 90000) partes[id + '-' + (n++)] = base64.substr(i, 90000);
  partes[id] = String(n);
  CacheService.getScriptCache().putAll(partes, DURACION);
  return accion({ t: 'publicar', doc: { nombre: nombre, cat: cat, pdfId: id } });
}

function leerPdf(id) {
  var c = CacheService.getScriptCache(), n = Number(c.get(id) || 0);
  if (!n) return null;
  var claves = []; for (var i = 0; i < n; i++) claves.push(id + '-' + i);
  var p = c.getAll(claves), s = '';
  for (var j = 0; j < n; j++) { if (!p[claves[j]]) return null; s += p[claves[j]]; }
  return s;
}
