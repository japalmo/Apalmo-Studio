/* PORTA · estado compartido de la demo.
   La página principal (INICIAR-DEMO.html) guarda el estado y se lo envía a la app del teléfono y a PORTA Central.
   Si una de esas páginas se abre sola, crea su propio estado local para que igual funcione. */
(function () {
  const hora = () => new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });

  const CATEGORIAS = [
    { id: 'pts', nombre: 'Procedimientos de trabajo', desc: 'PTS y estándares', ico: 'doc', c: 'c-doc' },
    { id: 'contratos', nombre: 'Contrato y reglamento', desc: 'Contrato, anexos, RIOHS', ico: 'user', c: 'c-fat' },
    { id: 'irl', nombre: 'Información de riesgos (IRL)', desc: 'Riesgos por cargo', ico: 'shield', c: 'c-veh' },
    { id: 'hds', nombre: 'Hojas de datos de seguridad', desc: 'Sustancias a bordo', ico: 'sos', c: 'c-gen' },
    { id: 'emergencia', nombre: 'Plan de emergencia', desc: 'Contactos y rutas', ico: 'sos', c: 'c-emg' },
  ];

  const DOCS_BASE = [
    { id: 'pts-conduccion', cat: 'pts', nombre: 'PTS-012 Conducción en faena', ver: 'v4 · mar 2026', pags: 6 },
    { id: 'pts-generador', cat: 'pts', nombre: 'PTS-027 Uso de generador portátil', ver: 'v3 · oct 2026', pags: 4 },
    { id: 'pts-altura', cat: 'pts', nombre: 'PTS-031 Trabajo en altura', ver: 'v3 · ene 2026', pags: 9 },
    { id: 'contrato', cat: 'contratos', nombre: 'Contrato de trabajo – J. Pérez', ver: 'Firmado 03-2025', pags: 8 },
    { id: 'riohs', cat: 'contratos', nombre: 'Reglamento Interno (RIOHS)', ver: 'Ed. 2026', pags: 54 },
    { id: 'irl-conductor', cat: 'irl', nombre: 'IRL – Conductor camioneta', ver: '2026', pags: 3 },
    { id: 'hds-diesel', cat: 'hds', nombre: 'HDS Petróleo diésel', ver: 'Rev. 2025', pags: 12 },
    { id: 'plan-emergencia', cat: 'emergencia', nombre: 'Plan de emergencia faena', ver: 'v5 · 2026', pags: 14 },
  ].map(d => ({ ...d, enEquipo: true, publicado: 'Antes', nuevo: false }));

  function estadoInicial() {
    return {
      senal4g: true,            // el vehículo tiene cobertura 4G
      conectado: false,         // el teléfono está conectado a la red Wi-Fi de PORTA
      transfiriendo: false,     // hay datos viajando por 4G (para la animación)
      ultimaSync: '07:12',
      docs: DOCS_BASE.map(d => ({ ...d })),
      registros: [
        { id: 'r1', tipo: 'fatiga', titulo: 'Fatiga y somnolencia', quien: 'M. Rojas', hora: '06:48', res: 'Apto', estado: 'ok', obs: [], enviado: true },
        { id: 'r2', tipo: 'vehiculo', titulo: 'Checklist de vehículo', quien: 'M. Rojas', hora: '06:55', res: 'Apto para operar', estado: 'ok', obs: [], enviado: true },
      ],
      eventos: [
        { hora: '06:21', texto: 'Documentos actualizados por 4G', color: 'az' },
        { hora: '06:05', texto: 'Equipo encendido con el vehículo', color: 'gr' },
      ],
      pasos: {},                // avance de la guía de la demo
    };
  }

  function pendientes(e) {
    return e.docs.some(d => !d.enEquipo) || e.registros.some(r => !r.enviado);
  }

  function reducir(e, a) {
    e = structuredClone(e);
    switch (a.t) {
      case 'senal':
        e.senal4g = a.valor;
        if (!a.valor) e.pasos.sinSenal = true;
        e.eventos.unshift({ hora: hora(), texto: a.valor ? 'Vehículo vuelve a tener señal 4G' : 'Vehículo entra a zona sin señal', color: a.valor ? 'ok' : 'gr' });
        break;
      case 'conectar':
        e.conectado = true; e.pasos.conectado = true; break;
      case 'desconectar':
        e.conectado = false; break;
      case 'publicar': {
        const d = { id: 'pub-' + Date.now(), cat: a.doc.cat || 'pts', nombre: a.doc.nombre, ver: 'Nuevo · ' + hora(), pags: a.doc.pags || 1,
          pdf: a.doc.pdf || null, html: a.doc.html || null, enEquipo: false, publicado: hora(), nuevo: true };
        e.docs.unshift(d); e.pasos.publicado = true;
        break;
      }
      case 'visto': {
        const d = e.docs.find(x => x.id === a.id);
        if (d && d.nuevo && d.enEquipo) { d.nuevo = false; if (d.id.startsWith('pub-')) e.pasos.leido = true; }
        break;
      }
      case 'registro':
        e.registros.push({ ...a.reg, id: 'r' + Date.now(), hora: hora(), enviado: false });
        if (a.reg.tipo === 'fatiga' && a.reg.estado !== 'ok') e.pasos.fatiga = true;
        if (a.reg.tipo === 'incidente') e.pasos.incidente = true;
        break;
      case 'gestionar': {
        const r = e.registros.find(x => x.id === a.id);
        if (r) { r.gestionada = true; e.eventos.unshift({ hora: hora(), texto: `Alerta gestionada: ${r.titulo} · ${r.quien}`, color: 'ok' }); }
        break;
      }
      case 'transfiriendo':
        e.transfiriendo = a.valor; break;
      case 'sync': {
        e.transfiriendo = false;
        if (!e.senal4g) break;
        const docsNuevos = e.docs.filter(d => !d.enEquipo);
        docsNuevos.forEach(d => { d.enEquipo = true; });
        if (docsNuevos.length) e.eventos.unshift({ hora: hora(), texto: `${docsNuevos.length === 1 ? 'Documento recibido' : docsNuevos.length + ' documentos recibidos'} por 4G: ${docsNuevos.map(d => d.nombre).join(', ')}`, color: 'az' });
        const regs = e.registros.filter(r => !r.enviado);
        regs.forEach(r => {
          r.enviado = true; r.recibido = hora();
          e.eventos.unshift({ hora: r.hora, texto: `${r.titulo} · ${r.quien}`, color: r.estado === 'ok' ? 'ok' : r.estado === 'alerta' ? 'al' : 'pe', res: r.res, estado: r.estado });
          if (r.estado === 'mal' && e.pasos.fatiga) e.pasos.alertaRecibida = true;
        });
        if (docsNuevos.length || regs.length) e.ultimaSync = hora();
        break;
      }
      case 'reiniciar':
        return estadoInicial();
    }
    return e;
  }

  // Store con sincronización automática: si hay algo pendiente y hay señal, se "envía" por 4G tras una breve animación.
  function crear() {
    let estado = estadoInicial(), timer = null;
    const subs = [];
    const emitir = () => subs.forEach(f => f(estado));
    function despachar(a) {
      estado = reducir(estado, a);
      if (estado.senal4g && pendientes(estado) && !timer) {
        estado = reducir(estado, { t: 'transfiriendo', valor: true });
        timer = setTimeout(() => { timer = null; despachar({ t: 'sync' }); }, 1600);
      }
      emitir();
    }
    return { despachar, on: f => { subs.push(f); f(estado); }, get estado() { return estado; } };
  }

  // Enlace para la app y la central: hablan con la página principal o usan un estado local.
  function enlace() {
    const subs = []; let estado = null;
    const avisar = () => subs.forEach(f => f(estado));
    if (window.parent === window) {
      const st = crear();
      st.on(e => { estado = e; avisar(); });
      return { enviar: a => st.despachar(a), on: f => { subs.push(f); if (estado) f(estado); }, local: true };
    }
    addEventListener('message', ev => {
      if (ev.data && ev.data.porta === 'estado') { estado = ev.data.estado; avisar(); }
    });
    parent.postMessage({ porta: 'hola' }, '*');
    return { enviar: a => parent.postMessage({ porta: 'accion', accion: a }, '*'), on: f => { subs.push(f); if (estado) f(estado); }, local: false };
  }

  window.PORTA = { crear, enlace, CATEGORIAS, hora };
})();
