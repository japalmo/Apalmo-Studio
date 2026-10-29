/*
 * Brief de logo · apalmo studio
 * Arma el formulario desde preguntas.js + clientes.js, guarda un borrador en el navegador
 * y entrega las respuestas como JSON (WhatsApp con link, archivo, copiar o POST opcional).
 * Sin dependencias y sin scripts en línea, para respetar la CSP de apalmo.com.
 */
(function () {
  "use strict";

  var BASE = window.BRIEF_PREGUNTAS;
  var CONFIG = window.BRIEF_CONFIG || { clientes: {} };
  var FORMULARIO = "apalmo-brief-logo";

  var UI = {
    es: {
      eyebrow: "Brief de logo",
      hola: "Hola",
      introTitulo: "Diseñemos el logo de {marca}",
      introTituloGenerico: "Diseñemos tu logo",
      introTexto: "Son 5 pasos cortos, unos 5 minutos. No hay respuestas correctas: marca lo que te nace y lo que no sepas, déjalo en blanco.",
      introLista: ["Tu negocio", "Personalidad", "Estilo", "Colores", "Referencias"],
      empezar: "Empezar",
      continuar: "Continuar donde quedé",
      reiniciar: "Borrar respuestas y empezar de nuevo",
      paso: "Paso {n} de {t}",
      atras: "Atrás",
      siguiente: "Siguiente",
      revisar: "Revisar",
      requerido: "Falta este dato.",
      otro: "Otro",
      otroPh: "Escribe aquí",
      meGusta: "Me gusta",
      noMeGusta: "No es lo mío",
      elegidos: "{n} de {m}",
      revisionTitulo: "Revisa y envía",
      revisionIntro: "Así quedaron tus respuestas. Puedes volver atrás para cambiar algo.",
      sinRespuesta: "Sin respuesta",
      leGusta: "Le gusta",
      noLeGusta: "No le gusta",
      enviarWa: "Enviar por WhatsApp",
      enviarServidor: "Enviar respuestas",
      enviando: "Enviando…",
      enviado: "Listo, recibimos tus respuestas. ¡Gracias!",
      errorEnvio: "No se pudo enviar. Usa WhatsApp o descarga el archivo.",
      descargar: "Descargar archivo",
      copiar: "Copiar respuestas",
      copiado: "Copiado",
      copiaManual: "Selecciona el texto y cópialo.",
      waNota: "Se abre WhatsApp con un mensaje listo; solo toca enviar. Si no se abre, descarga el archivo y mándalo al +{numero}.",
      waMensaje: "Hola, te mando las respuestas del brief de logo de {marca}.",
      waFirma: "Responde: {nombre}",
      resultadoEyebrow: "Respuestas del brief",
      resultadoMeta: "Enviado el {fecha} · {contacto}",
      resultadoError: "Este link está incompleto o dañado. Pide que te reenvíen las respuestas.",
      verJson: "JSON para el análisis",
      copiarJson: "Copiar JSON",
      descargarJson: "Descargar JSON",
      nuevo: "Abrir formulario vacío",
      pie: "Formulario de apalmo studio. Tus respuestas se guardan solo en este teléfono hasta que las envíes.",
      idioma: "English"
    },
    en: {
      eyebrow: "Logo brief",
      hola: "Hi",
      introTitulo: "Let's design the {marca} logo",
      introTituloGenerico: "Let's design your logo",
      introTexto: "5 short steps, about 5 minutes. There are no wrong answers: go with your gut and leave blank anything you're not sure about.",
      introLista: ["Your business", "Personality", "Style", "Colors", "References"],
      empezar: "Start",
      continuar: "Continue where I left off",
      reiniciar: "Clear answers and start over",
      paso: "Step {n} of {t}",
      atras: "Back",
      siguiente: "Next",
      revisar: "Review",
      requerido: "This one is needed.",
      otro: "Other",
      otroPh: "Type here",
      meGusta: "I like it",
      noMeGusta: "Not for me",
      elegidos: "{n} of {m}",
      revisionTitulo: "Review and send",
      revisionIntro: "Here are your answers. Go back if you want to change anything.",
      sinRespuesta: "No answer",
      leGusta: "Likes",
      noLeGusta: "Dislikes",
      enviarWa: "Send on WhatsApp",
      enviarServidor: "Send answers",
      enviando: "Sending…",
      enviado: "Done, we got your answers. Thank you!",
      errorEnvio: "It didn't go through. Use WhatsApp or download the file.",
      descargar: "Download file",
      copiar: "Copy answers",
      copiado: "Copied",
      copiaManual: "Select the text and copy it.",
      waNota: "WhatsApp opens with a ready message; just tap send. If it doesn't open, download the file and send it to +{numero}.",
      waMensaje: "Hi, here are the logo brief answers for {marca}.",
      waFirma: "From: {nombre}",
      resultadoEyebrow: "Brief answers",
      resultadoMeta: "Sent {fecha} · {contacto}",
      resultadoError: "This link is incomplete or broken. Ask for the answers to be sent again.",
      verJson: "JSON for analysis",
      copiarJson: "Copy JSON",
      descargarJson: "Download JSON",
      nuevo: "Open a blank form",
      pie: "A form by apalmo studio. Your answers stay on this phone until you send them.",
      idioma: "Español"
    }
  };

  // ---------- utilidades ----------

  function el(tag, attrs, hijos) {
    var n = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v === null || v === undefined || v === false) return;
        if (k === "text") n.textContent = v;
        else if (k === "class") n.className = v;
        else if (k.slice(0, 2) === "on") n.addEventListener(k.slice(2), v);
        else n.setAttribute(k, v === true ? "" : v);
      });
    }
    (hijos || []).forEach(function (h) {
      if (h === null || h === undefined || h === false) return;
      n.appendChild(typeof h === "string" ? document.createTextNode(h) : h);
    });
    return n;
  }

  function svg(viewBox, contenido, clase) {
    var s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("viewBox", viewBox);
    s.setAttribute("aria-hidden", "true");
    s.setAttribute("class", clase || "");
    s.innerHTML = contenido;
    return s;
  }

  function escXml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function fmt(s, datos) {
    return String(s).replace(/\{(\w+)\}/g, function (_, k) { return datos[k] != null ? datos[k] : ""; });
  }

  function tx(obj) {
    if (obj == null) return "";
    if (typeof obj === "string") return obj;
    return obj[estado.idioma] || obj.es || "";
  }

  function clonar(o) { return JSON.parse(JSON.stringify(o)); }

  function slug(s) {
    return String(s || "cliente").normalize("NFD").replace(/[̀-ͯ]/g, "")
      .toLowerCase().replace(/&/g, "y").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "cliente";
  }

  function leerLocal(clave) {
    try { var v = window.localStorage.getItem(clave); return v ? JSON.parse(v) : null; } catch (e) { return null; }
  }
  function guardarLocal(clave, valor) {
    try { window.localStorage.setItem(clave, JSON.stringify(valor)); } catch (e) { /* sin almacenamiento: seguimos igual */ }
  }
  function borrarLocal(clave) {
    try { window.localStorage.removeItem(clave); } catch (e) { /* nada */ }
  }

  // ---------- definición efectiva (base + cliente) ----------

  function parametro(nombre) {
    try { return new URLSearchParams(window.location.search).get(nombre); } catch (e) { return null; }
  }

  function idCliente() {
    var c = parametro("c");
    if (!c) {
      var meta = document.querySelector('meta[name="brief:cliente"]');
      c = meta && meta.getAttribute("content");
    }
    return c && CONFIG.clientes && CONFIG.clientes[c] ? c : null;
  }

  function definicion(clienteId) {
    var def = clonar(BASE);
    var cli = clienteId ? CONFIG.clientes[clienteId] : null;
    // Las funciones svg de las vibras no sobreviven a clonar(): se recuperan del original.
    def.pasos.forEach(function (paso, i) {
      paso.preguntas.forEach(function (p, j) {
        var orig = BASE.pasos[i].preguntas[j];
        if (orig.tipo === "vibras") p.opciones = orig.opciones;
        if (cli && cli.preguntas && cli.preguntas[p.id]) {
          var cambio = cli.preguntas[p.id];
          Object.keys(cambio).forEach(function (k) { p[k] = cambio[k]; });
        }
      });
    });
    return def;
  }

  function valorVacio(p) {
    switch (p.tipo) {
      case "chips": return p.multiple ? [] : null;
      case "escala": return null;
      case "vibras": return { me_gusta: [], no_me_gusta: [] };
      case "simbolos":
      case "paletas": return [];
      default: return "";
    }
  }

  function respuestasVacias(def, cli) {
    var r = {};
    def.pasos.forEach(function (paso) {
      r[paso.id] = {};
      paso.preguntas.forEach(function (p) {
        r[paso.id][p.id] = valorVacio(p);
        if (p.otro) r[paso.id][p.id + "_otro"] = "";
        if (cli && cli.respuestas && cli.respuestas[p.id] !== undefined) r[paso.id][p.id] = clonar(cli.respuestas[p.id]);
      });
    });
    return r;
  }

  // ---------- estado ----------

  var estado = {
    idioma: "es",
    cliente: null,
    def: null,
    respuestas: null,
    paso: 0,
    errores: {}
  };
  var claveBorrador = "";
  var raiz;

  function guardar() {
    guardarLocal(claveBorrador, { idioma: estado.idioma, paso: estado.paso, respuestas: estado.respuestas, v: BASE.version });
  }

  function marcaActual() {
    var cli = estado.cliente ? CONFIG.clientes[estado.cliente] : null;
    var nombre = (estado.respuestas.negocio.nombre || "").trim() || (cli && cli.marca) || "";
    return nombre;
  }

  function partesMarca() {
    var cli = estado.cliente ? CONFIG.clientes[estado.cliente] : null;
    var nombre = marcaActual() || (estado.idioma === "en" ? "Your Brand" : "Tu Marca");
    var palabras = nombre.split(/\s+/).filter(Boolean);
    var mono = cli && cli.monograma && nombre === cli.marca ? cli.monograma : null;
    if (!mono) {
      var conY = palabras.filter(function (w) { return w.indexOf("&") > 0; })[0];
      mono = conY || palabras.slice(0, 3).map(function (w) { return w.charAt(0); }).join("").toUpperCase();
    }
    var resto = palabras.filter(function (w) { return w !== mono; }).join(" ") || nombre;
    var lugar = (cli && cli.lugar) || (estado.respuestas.negocio.zona || "").toUpperCase();
    return {
      monoRaw: mono,
      mono: escXml(mono),
      resto: escXml(resto.toUpperCase()),
      restoTitulo: escXml(resto),
      lugar: escXml(lugar || "EST. " + new Date().getFullYear())
    };
  }

  // ---------- render: formulario ----------

  function t(clave) { return UI[estado.idioma][clave]; }

  function render() {
    document.documentElement.lang = estado.idioma;
    raiz.textContent = "";
    raiz.appendChild(cabecera());
    var cuerpo = el("main", { class: "cuerpo", id: "contenido", tabindex: "-1" });
    raiz.appendChild(cuerpo);
    var total = estado.def.pasos.length;
    if (estado.paso === 0) cuerpo.appendChild(vistaIntro());
    else if (estado.paso <= total) cuerpo.appendChild(vistaPaso(estado.def.pasos[estado.paso - 1]));
    else cuerpo.appendChild(vistaRevision());
    raiz.appendChild(el("footer", { class: "pie" }, [el("p", { text: t("pie") })]));
    if (estado.paso > 0 && estado.paso <= total) raiz.appendChild(navegacion());
    ajustarTextos();
  }

  function cabecera() {
    var total = estado.def.pasos.length;
    var dentro = estado.paso > 0 && estado.paso <= total;
    var barra = null;
    if (dentro) {
      var avance = Math.round((estado.paso / total) * 100);
      barra = el("div", { class: "progreso", role: "progressbar", "aria-valuemin": "0", "aria-valuemax": String(total), "aria-valuenow": String(estado.paso), "aria-label": fmt(t("paso"), { n: estado.paso, t: total }) }, [
        el("span", { class: "progreso__barra", style: "width:" + avance + "%" })
      ]);
    }
    return el("header", { class: "cabecera" }, [
      el("div", { class: "cabecera__fila" }, [
        el("a", { class: "firma", href: "https://apalmo.com/", target: "_blank", rel: "noopener" }, ["apalmo", el("span", { text: " studio" })]),
        el("button", { type: "button", class: "idioma", id: "btn-idioma", onclick: cambiarIdioma, lang: estado.idioma === "es" ? "en" : "es" }, [t("idioma")])
      ]),
      barra
    ]);
  }

  function cambiarIdioma() {
    estado.idioma = estado.idioma === "es" ? "en" : "es";
    guardar();
    render();
  }

  function vistaIntro() {
    var cli = estado.cliente ? CONFIG.clientes[estado.cliente] : null;
    var marca = cli ? cli.marca : "";
    var borrador = leerLocal(claveBorrador);
    var hayAvance = borrador && borrador.paso > 0;
    var titulo = marca ? fmt(t("introTitulo"), { marca: marca }) : t("introTituloGenerico");
    return el("section", { class: "intro" }, [
      el("p", { class: "eyebrow", text: t("eyebrow") + (marca ? " · " + marca : "") }),
      el("h1", { class: "titulo", text: titulo }),
      el("p", { class: "lead", text: t("introTexto") }),
      el("ol", { class: "intro__pasos" }, t("introLista").map(function (x) { return el("li", { text: x }); })),
      el("div", { class: "acciones" }, [
        el("button", { type: "button", class: "btn btn--primario", id: "btn-empezar", onclick: function () { irA(hayAvance ? borrador.paso : 1); } }, [hayAvance ? t("continuar") : t("empezar")]),
        hayAvance ? el("button", { type: "button", class: "btn btn--texto", id: "btn-reiniciar", onclick: reiniciar }, [t("reiniciar")]) : null
      ])
    ]);
  }

  function reiniciar() {
    borrarLocal(claveBorrador);
    estado.respuestas = respuestasVacias(estado.def, estado.cliente ? CONFIG.clientes[estado.cliente] : null);
    estado.paso = 0;
    render();
  }

  function vistaPaso(paso) {
    var nodos = [
      el("p", { class: "eyebrow", text: fmt(t("paso"), { n: estado.paso, t: estado.def.pasos.length }) }),
      el("h1", { class: "titulo", text: tx(paso.titulo) }),
      paso.intro ? el("p", { class: "lead", text: tx(paso.intro) }) : null
    ];
    var lista = el("div", { class: "preguntas" });
    paso.preguntas.forEach(function (p) { lista.appendChild(campo(paso, p)); });
    nodos.push(lista);
    return el("section", { class: "paso paso--" + paso.id }, nodos);
  }

  function campo(paso, p) {
    var r = estado.respuestas[paso.id];
    var idc = "q-" + p.id;
    var error = estado.errores[p.id];
    var etiqueta = p.label ? tx(p.label) + (p.req ? " *" : "") : "";
    var ayudaId = p.ayuda ? idc + "-ayuda" : null;
    var errId = error ? idc + "-error" : null;
    var describe = [ayudaId, errId].filter(Boolean).join(" ") || null;
    var control;

    function setVal(v) { r[p.id] = v; if (estado.errores[p.id]) { delete estado.errores[p.id]; } guardar(); }

    if (p.tipo === "texto" || p.tipo === "area") {
      var attrs = { id: idc, class: "entrada", "aria-describedby": describe, "aria-invalid": error ? "true" : null, autocomplete: p.autocompletar || "off",
        oninput: function (e) { setVal(e.target.value); } };
      if (p.tipo === "texto") { attrs.type = "text"; control = el("input", attrs); }
      else { attrs.rows = "3"; control = el("textarea", attrs); }
      control.value = r[p.id] || "";
      return grupo(el("label", { class: "pregunta__label", for: idc, text: etiqueta }), p, control, ayudaId, errId);
    }

    if (p.tipo === "chips") {
      control = el("div", { class: "chips", role: "group", "aria-labelledby": idc + "-l" });
      p.opciones.forEach(function (o) {
        var activo = p.multiple ? r[p.id].indexOf(o.id) >= 0 : r[p.id] === o.id;
        control.appendChild(el("button", { type: "button", class: "chip", id: idc + "-" + o.id, "aria-pressed": activo ? "true" : "false",
          onclick: function (e) {
            if (p.multiple) {
              var arr = r[p.id], i = arr.indexOf(o.id);
              if (i >= 0) arr.splice(i, 1); else arr.push(o.id);
              setVal(arr);
              e.currentTarget.setAttribute("aria-pressed", i >= 0 ? "false" : "true");
            } else {
              var nuevo = r[p.id] === o.id ? null : o.id;
              setVal(nuevo);
              Array.prototype.forEach.call(control.querySelectorAll(".chip"), function (b) { b.setAttribute("aria-pressed", "false"); });
              if (nuevo) e.currentTarget.setAttribute("aria-pressed", "true");
            }
          } }, [tx(o)]));
      });
      var extra = null;
      if (p.otro) {
        var otroId = idc + "-otro";
        var otro = el("input", { type: "text", id: otroId, class: "entrada entrada--otro", placeholder: t("otroPh"), autocomplete: "off",
          oninput: function (e) { r[p.id + "_otro"] = e.target.value; guardar(); } });
        otro.value = r[p.id + "_otro"] || "";
        extra = el("div", { class: "otro" }, [el("label", { for: otroId, class: "otro__label", text: t("otro") }), otro]);
      }
      return grupo(el("p", { class: "pregunta__label", id: idc + "-l", text: etiqueta }), p, el("div", {}, [control, extra]), ayudaId, errId);
    }

    if (p.tipo === "escala") {
      var nombre = idc;
      var fila = el("div", { class: "escala__puntos", role: "radiogroup", "aria-label": tx(p.izq) + " / " + tx(p.der) });
      for (var i = 1; i <= 5; i++) {
        (function (v) {
          var rid = nombre + "-" + v;
          var input = el("input", { type: "radio", name: nombre, id: rid, value: String(v), class: "escala__radio",
            onchange: function () { setVal(v); } });
          if (r[p.id] === v) input.checked = true;
          var desc = v === 3 ? "·" : (v < 3 ? tx(p.izq) : tx(p.der));
          fila.appendChild(el("label", { class: "escala__punto", for: rid, title: desc }, [input, el("span", { class: "escala__marca", "aria-hidden": "true" }), el("span", { class: "sr", text: String(v) + " (" + desc + ")" })]));
        })(i);
      }
      return el("div", { class: "pregunta pregunta--escala" }, [
        el("div", { class: "escala" }, [
          el("span", { class: "escala__extremo", text: tx(p.izq) }),
          fila,
          el("span", { class: "escala__extremo escala__extremo--der", text: tx(p.der) })
        ])
      ]);
    }

    if (p.tipo === "vibras") {
      var m = partesMarca();
      var rejilla = el("div", { class: "vibras" });
      p.opciones.forEach(function (o) {
        var val = r[p.id];
        var estadoV = val.me_gusta.indexOf(o.id) >= 0 ? "si" : val.no_me_gusta.indexOf(o.id) >= 0 ? "no" : "";
        var tarjeta = el("article", { class: "vibra", "data-estado": estadoV, id: idc + "-" + o.id });
        function marcar(cual) {
          var si = val.me_gusta, no = val.no_me_gusta;
          [si, no].forEach(function (a) { var k = a.indexOf(o.id); if (k >= 0) a.splice(k, 1); });
          var nuevo = tarjeta.getAttribute("data-estado") === cual ? "" : cual;
          if (nuevo === "si") si.push(o.id);
          if (nuevo === "no") no.push(o.id);
          tarjeta.setAttribute("data-estado", nuevo);
          bSi.setAttribute("aria-pressed", nuevo === "si" ? "true" : "false");
          bNo.setAttribute("aria-pressed", nuevo === "no" ? "true" : "false");
          setVal(val);
        }
        var bSi = el("button", { type: "button", class: "vibra__btn vibra__btn--si", "aria-pressed": estadoV === "si" ? "true" : "false", onclick: function () { marcar("si"); } }, [t("meGusta")]);
        var bNo = el("button", { type: "button", class: "vibra__btn vibra__btn--no", "aria-pressed": estadoV === "no" ? "true" : "false", onclick: function () { marcar("no"); } }, [t("noMeGusta")]);
        tarjeta.appendChild(el("div", { class: "vibra__lienzo" }, [svg("0 0 320 180", o.svg(m), "vibra__svg")]));
        tarjeta.appendChild(el("div", { class: "vibra__texto" }, [el("h3", { class: "vibra__nombre", text: tx(o.nombre) }), el("p", { class: "vibra__desc", text: tx(o.desc) })]));
        tarjeta.appendChild(el("div", { class: "vibra__btns", role: "group", "aria-label": tx(o.nombre) }, [bSi, bNo]));
        rejilla.appendChild(tarjeta);
      });
      return grupo(el("p", { class: "pregunta__label", id: idc + "-l", text: etiqueta }), p, rejilla, ayudaId, errId);
    }

    if (p.tipo === "simbolos" || p.tipo === "paletas") {
      var mono2 = escXml(partesMarca().monoRaw.slice(0, 3));
      var cont = el("span", { class: "contador", "aria-live": "polite" });
      var grid = el("div", { class: p.tipo === "simbolos" ? "simbolos" : "paletas", role: "group", "aria-labelledby": idc + "-l" });
      var botones = [];
      function pintar() {
        botones.forEach(function (b) { b.btn.setAttribute("aria-pressed", r[p.id].indexOf(b.id) >= 0 ? "true" : "false"); });
        var n = r[p.id].filter(function (x) { return !p.libre || x !== p.libre.id; }).length;
        cont.textContent = fmt(t("elegidos"), { n: n, m: p.max });
      }
      function alternar(id) {
        var arr = r[p.id];
        var libre = p.libre && p.libre.id;
        var k = arr.indexOf(id);
        if (k >= 0) arr.splice(k, 1);
        else if (id === libre) arr.splice(0, arr.length, id);
        else {
          if (libre && arr.indexOf(libre) >= 0) arr.splice(arr.indexOf(libre), 1);
          arr.push(id);
          if (arr.length > p.max) arr.shift();
        }
        setVal(arr);
        pintar();
      }
      p.opciones.forEach(function (o) {
        var contenido;
        if (p.tipo === "simbolos") {
          contenido = [svg("0 0 64 64", o.svg.replace("{mono2}", mono2), "simbolo__svg"), el("span", { class: "simbolo__nombre", text: tx(o) })];
        } else {
          contenido = [
            el("span", { class: "paleta__muestras", "aria-hidden": "true" }, o.colores.map(function (c, i) {
              return el("span", { class: "paleta__color paleta__color--" + i, style: "background:" + c });
            })),
            el("span", { class: "paleta__nombre", text: tx(o) })
          ];
        }
        var b = el("button", { type: "button", class: p.tipo === "simbolos" ? "simbolo" : "paleta", id: idc + "-" + o.id, "aria-pressed": "false", onclick: function () { alternar(o.id); } }, contenido);
        botones.push({ id: o.id, btn: b });
        grid.appendChild(b);
      });
      var libreBtn = null;
      if (p.libre) {
        libreBtn = el("button", { type: "button", class: "chip chip--ancho", id: idc + "-" + p.libre.id, "aria-pressed": "false", onclick: function () { alternar(p.libre.id); } }, [tx(p.libre)]);
        botones.push({ id: p.libre.id, btn: libreBtn });
      }
      pintar();
      var cab = el("div", { class: "pregunta__cab" }, [el("p", { class: "pregunta__label", id: idc + "-l", text: etiqueta }), cont]);
      return grupo(cab, p, el("div", { class: "pila" }, [grid, libreBtn]), ayudaId, errId);
    }

    return el("div");
  }

  function grupo(etiqueta, p, control, ayudaId, errId) {
    return el("div", { class: "pregunta pregunta--" + p.tipo }, [
      etiqueta,
      p.ayuda ? el("p", { class: "pregunta__ayuda", id: ayudaId, text: tx(p.ayuda) }) : null,
      control,
      errId ? el("p", { class: "pregunta__error", id: errId, text: t("requerido") }) : null
    ]);
  }

  function navegacion() {
    var total = estado.def.pasos.length;
    var ultimo = estado.paso === total;
    return el("nav", { class: "nav", "aria-label": estado.idioma === "en" ? "Steps" : "Pasos" }, [
      el("div", { class: "nav__fila" }, [
        el("button", { type: "button", class: "btn btn--secundario", id: "btn-atras", onclick: function () { irA(estado.paso - 1); } }, [t("atras")]),
        el("button", { type: "button", class: "btn btn--primario", id: "btn-siguiente", onclick: avanzar }, [ultimo ? t("revisar") : t("siguiente")])
      ])
    ]);
  }

  function avanzar() {
    var paso = estado.def.pasos[estado.paso - 1];
    var r = estado.respuestas[paso.id];
    estado.errores = {};
    var primero = null;
    paso.preguntas.forEach(function (p) {
      if (p.req && !String(r[p.id] || "").trim()) {
        estado.errores[p.id] = true;
        if (!primero) primero = p.id;
      }
    });
    if (primero) {
      render();
      var f = document.getElementById("q-" + primero);
      if (f) { f.focus(); f.scrollIntoView({ block: "center" }); }
      return;
    }
    irA(estado.paso + 1);
  }

  function irA(n) {
    estado.paso = Math.max(0, Math.min(n, estado.def.pasos.length + 1));
    estado.errores = {};
    guardar();
    render();
    window.scrollTo(0, 0);
    var c = document.getElementById("contenido");
    if (c) c.focus({ preventScroll: true });
  }

  // Ajusta los textos de las muestras que no caben (nombres largos).
  function ajustarTextos() {
    var hacer = function () {
      Array.prototype.forEach.call(document.querySelectorAll("svg text[data-max]"), function (n) {
        var max = parseFloat(n.getAttribute("data-max"));
        n.removeAttribute("textLength");
        try {
          if (n.getComputedTextLength() > max) {
            n.setAttribute("textLength", String(max));
            n.setAttribute("lengthAdjust", "spacingAndGlyphs");
          }
        } catch (e) { /* sin medición disponible */ }
      });
    };
    hacer();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(hacer);
  }

  // ---------- revisión, salida y envío ----------

  function construirSalida() {
    var r = clonar(estado.respuestas);
    var cierre = r.cierre || {};
    return {
      formulario: FORMULARIO,
      version: BASE.version,
      cliente: estado.cliente,
      marca: marcaActual(),
      idioma: estado.idioma,
      enviado: new Date().toISOString(),
      contacto: { nombre: cierre.contacto_nombre || "", medio: cierre.contacto_medio || "" },
      formato: "Escalas de 1 a 5: 1 = primera palabra del id, 5 = la segunda, 3 = neutro, null = sin responder. Las listas usan los id de preguntas.js.",
      respuestas: r
    };
  }

  function vistaRevision() {
    var datos = construirSalida();
    var nodos = [
      el("p", { class: "eyebrow", text: t("eyebrow") + " · " + (datos.marca || "") }),
      el("h1", { class: "titulo", text: t("revisionTitulo") }),
      el("p", { class: "lead", text: t("revisionIntro") }),
      resumen(estado.def, datos.respuestas, true)
    ];
    nodos.push(panelEnvio(datos));
    return el("section", { class: "revision" }, nodos);
  }

  function resumen(def, respuestas, conEditar) {
    var cont = el("div", { class: "resumen" });
    def.pasos.forEach(function (paso, i) {
      var r = respuestas[paso.id] || {};
      var filas = el("dl", { class: "resumen__lista" });
      paso.preguntas.forEach(function (p) {
        var etiqueta = p.tipo === "escala" ? tx(p.izq) + " ↔ " + tx(p.der) : tx(p.label);
        filas.appendChild(el("div", { class: "resumen__fila" }, [el("dt", { text: etiqueta.replace(/ \*$/, "") }), el("dd", {}, [valorLegible(p, r)])]));
      });
      var cab = [el("h2", { class: "resumen__titulo", text: tx(paso.titulo) })];
      if (conEditar) cab.push(el("button", { type: "button", class: "btn btn--texto btn--chico", id: "editar-" + paso.id, onclick: function () { irA(i + 1); } }, [estado.idioma === "en" ? "Edit" : "Editar"]));
      cont.appendChild(el("section", { class: "resumen__bloque" }, [el("div", { class: "resumen__cab" }, cab), filas]));
    });
    return cont;
  }

  function nombreOpcion(p, id) {
    var o = (p.opciones || []).filter(function (x) { return x.id === id; })[0];
    if (!o && p.libre && p.libre.id === id) o = p.libre;
    if (!o) return id;
    return tx(o.nombre || o);
  }

  function valorLegible(p, r) {
    var v = r[p.id];
    var vacio = el("span", { class: "vacio", text: t("sinRespuesta") });
    if (p.tipo === "escala") {
      if (!v) return vacio;
      var puntos = el("span", { class: "mini-escala", "aria-label": v + " / 5" });
      for (var i = 1; i <= 5; i++) puntos.appendChild(el("span", { class: "mini-escala__p" + (i === v ? " es-activo" : "") }));
      return puntos;
    }
    if (p.tipo === "vibras") {
      if (!v || (!v.me_gusta.length && !v.no_me_gusta.length)) return vacio;
      return el("span", {}, [
        v.me_gusta.length ? el("span", { class: "linea" }, [el("strong", { text: t("leGusta") + ": " }), v.me_gusta.map(function (id) { return nombreOpcion(p, id); }).join(", ")]) : null,
        v.no_me_gusta.length ? el("span", { class: "linea" }, [el("strong", { text: t("noLeGusta") + ": " }), v.no_me_gusta.map(function (id) { return nombreOpcion(p, id); }).join(", ")]) : null
      ]);
    }
    if (Array.isArray(v)) {
      var lista = v.map(function (id) { return nombreOpcion(p, id); });
      if (p.otro && r[p.id + "_otro"]) lista.push(r[p.id + "_otro"]);
      if (!lista.length) return vacio;
      if (p.tipo === "paletas") {
        return el("span", { class: "linea-paletas" }, v.map(function (id) {
          var o = p.opciones.filter(function (x) { return x.id === id; })[0];
          return el("span", { class: "paleta-mini" }, [
            o ? el("span", { class: "paleta-mini__muestras", "aria-hidden": "true" }, o.colores.map(function (c) { return el("span", { style: "background:" + c }); })) : null,
            nombreOpcion(p, id)
          ]);
        }));
      }
      return document.createTextNode(lista.join(", "));
    }
    if (p.tipo === "chips") return v ? document.createTextNode(nombreOpcion(p, v)) : vacio;
    return v && String(v).trim() ? el("span", { class: "texto-libre", text: v }) : vacio;
  }

  function panelEnvio(datos) {
    var numero = CONFIG.whatsapp || "";
    var nota = el("p", { class: "nota", id: "nota-envio", "aria-live": "polite" });
    var waBtn = el("a", { class: "btn " + (CONFIG.endpoint ? "btn--secundario" : "btn--primario"), id: "btn-whatsapp", href: "https://wa.me/" + numero, target: "_blank", rel: "noopener" }, [t("enviarWa")]);
    // El link lleva las respuestas comprimidas; se arma apenas está listo.
    codificar(JSON.stringify(datos)).then(function (codigo) {
      var link = (CONFIG.urlPublica || (location.origin + location.pathname)) + "#r=" + codigo;
      var msg = fmt(t("waMensaje"), { marca: datos.marca }) + "\n" + link;
      if (datos.contacto.nombre) msg += "\n" + fmt(t("waFirma"), { nombre: datos.contacto.nombre });
      waBtn.setAttribute("href", "https://wa.me/" + numero + "?text=" + encodeURIComponent(msg));
    });
    waBtn.addEventListener("click", function () { guardar(); });

    var botones = [];
    if (CONFIG.endpoint) {
      var envBtn = el("button", { type: "button", class: "btn btn--primario", id: "btn-enviar" }, [t("enviarServidor")]);
      envBtn.addEventListener("click", function () {
        envBtn.disabled = true;
        envBtn.textContent = t("enviando");
        fetch(CONFIG.endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(construirSalida()) })
          .then(function (res) {
            if (!res.ok) throw new Error(res.status);
            nota.textContent = t("enviado");
            envBtn.textContent = t("enviado");
          })
          .catch(function () {
            nota.textContent = t("errorEnvio");
            envBtn.disabled = false;
            envBtn.textContent = t("enviarServidor");
          });
      });
      botones.push(envBtn);
    }
    botones.push(waBtn);

    var texto = JSON.stringify(datos, null, 2);
    return el("div", { class: "envio" }, [
      el("div", { class: "envio__principal" }, botones),
      el("p", { class: "nota", text: fmt(t("waNota"), { numero: numero }) }),
      el("div", { class: "envio__secundario" }, [
        el("button", { type: "button", class: "btn btn--texto", id: "btn-descargar", onclick: function () { descargar(construirSalida()); } }, [t("descargar")]),
        el("button", { type: "button", class: "btn btn--texto", id: "btn-copiar", onclick: function (e) { copiar(JSON.stringify(construirSalida(), null, 2), e.currentTarget, t("copiar")); } }, [t("copiar")])
      ]),
      nota,
      el("textarea", { class: "respaldo", id: "respaldo-json", readonly: true, "aria-label": "JSON", hidden: true }, [texto])
    ]);
  }

  function nombreArchivo(datos) {
    return "brief-logo-" + slug(datos.marca) + "-" + String(datos.enviado || new Date().toISOString()).slice(0, 10) + ".json";
  }

  function descargar(datos) {
    var blob = new Blob([JSON.stringify(datos, null, 2)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = el("a", { href: url, download: nombreArchivo(datos) });
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 1000);
  }

  function copiar(texto, boton, etiqueta) {
    function ok() { boton.textContent = t("copiado"); setTimeout(function () { boton.textContent = etiqueta; }, 1800); }
    function manual() {
      var area = document.getElementById("respaldo-json");
      if (!area) return;
      area.value = texto;
      area.hidden = false;
      area.focus();
      area.select();
      var nota = document.getElementById("nota-envio");
      if (nota) nota.textContent = t("copiaManual");
    }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(texto).then(ok, manual);
      else manual();
    } catch (e) { manual(); }
  }

  // ---------- codificación para el link (#r=...) ----------

  function aBase64Url(bytes) {
    var bin = "";
    for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  function deBase64Url(s) {
    var b = atob(s.replace(/-/g, "+").replace(/_/g, "/"));
    var out = new Uint8Array(b.length);
    for (var i = 0; i < b.length; i++) out[i] = b.charCodeAt(i);
    return out;
  }
  function transformar(bytes, Stream, modo) {
    var s = new Blob([bytes]).stream().pipeThrough(new Stream(modo));
    return new Response(s).arrayBuffer().then(function (b) { return new Uint8Array(b); });
  }
  function codificar(texto) {
    var bytes = new TextEncoder().encode(texto);
    if (typeof CompressionStream === "function") {
      return transformar(bytes, CompressionStream, "deflate-raw")
        .then(function (c) { return "z" + aBase64Url(c); })
        .catch(function () { return "j" + aBase64Url(bytes); });
    }
    return Promise.resolve("j" + aBase64Url(bytes));
  }
  function decodificar(codigo) {
    var tipo = codigo.charAt(0), bytes = deBase64Url(codigo.slice(1));
    var p = tipo === "z" ? transformar(bytes, DecompressionStream, "deflate-raw") : Promise.resolve(bytes);
    return p.then(function (b) { return JSON.parse(new TextDecoder().decode(b)); });
  }

  // ---------- vista de resultados (para quien recibe el link) ----------

  function vistaResultado(codigo) {
    raiz.textContent = "";
    raiz.appendChild(cabeceraSimple());
    var cuerpo = el("main", { class: "cuerpo resultado", id: "contenido" });
    raiz.appendChild(cuerpo);
    decodificar(codigo).then(function (datos) {
      if (!datos || datos.formulario !== FORMULARIO) throw new Error("formato");
      if (datos.idioma && UI[datos.idioma]) estado.idioma = datos.idioma;
      document.documentElement.lang = estado.idioma;
      estado.cliente = datos.cliente && CONFIG.clientes[datos.cliente] ? datos.cliente : null;
      var def = definicion(estado.cliente);
      var fecha = new Date(datos.enviado);
      var texto = JSON.stringify(datos, null, 2);
      var pre = el("pre", { class: "json" }, [el("code", { text: texto })]);
      cuerpo.appendChild(el("p", { class: "eyebrow", text: t("resultadoEyebrow") }));
      cuerpo.appendChild(el("h1", { class: "titulo", text: datos.marca || "—" }));
      cuerpo.appendChild(el("p", { class: "lead", text: fmt(t("resultadoMeta"), {
        fecha: isNaN(fecha) ? "—" : fecha.toLocaleString(estado.idioma === "en" ? "en-US" : "es-CL", { dateStyle: "medium", timeStyle: "short" }),
        contacto: [datos.contacto && datos.contacto.nombre, datos.contacto && datos.contacto.medio].filter(Boolean).join(" · ") || "—"
      }) }));
      cuerpo.appendChild(el("div", { class: "envio__secundario" }, [
        el("button", { type: "button", class: "btn btn--primario", id: "btn-copiar-json", onclick: function (e) { copiar(texto, e.currentTarget, t("copiarJson")); } }, [t("copiarJson")]),
        el("button", { type: "button", class: "btn btn--secundario", id: "btn-descargar-json", onclick: function () { descargar(datos); } }, [t("descargarJson")])
      ]));
      cuerpo.appendChild(el("p", { class: "nota", id: "nota-envio", "aria-live": "polite" }));
      cuerpo.appendChild(el("textarea", { class: "respaldo", id: "respaldo-json", readonly: true, "aria-label": "JSON", hidden: true }));
      cuerpo.appendChild(resumen(def, datos.respuestas || {}, false));
      cuerpo.appendChild(el("details", { class: "detalle-json" }, [el("summary", { text: t("verJson") }), pre]));
    }).catch(function () {
      cuerpo.appendChild(el("h1", { class: "titulo", text: t("resultadoEyebrow") }));
      cuerpo.appendChild(el("p", { class: "lead", text: t("resultadoError") }));
    }).then(function () {
      cuerpo.appendChild(el("p", {}, [el("a", { class: "btn btn--texto", href: location.pathname + location.search, id: "btn-nuevo" }, [t("nuevo")])]));
    });
  }

  function cabeceraSimple() {
    return el("header", { class: "cabecera" }, [
      el("div", { class: "cabecera__fila" }, [el("a", { class: "firma", href: "https://apalmo.com/", target: "_blank", rel: "noopener" }, ["apalmo", el("span", { text: " studio" })])])
    ]);
  }

  // ---------- inicio ----------

  function iniciar() {
    raiz = document.getElementById("brief");
    if (!raiz || !BASE) return;
    var hash = location.hash || "";
    estado.idioma = UI[parametro("lang")] ? parametro("lang") : "es";
    if (hash.indexOf("#r=") === 0) { vistaResultado(hash.slice(3)); return; }

    estado.cliente = idCliente();
    var cli = estado.cliente ? CONFIG.clientes[estado.cliente] : null;
    if (cli && cli.idioma && !parametro("lang")) estado.idioma = cli.idioma;
    estado.def = definicion(estado.cliente);
    estado.respuestas = respuestasVacias(estado.def, cli);
    claveBorrador = FORMULARIO + ":" + (estado.cliente || "generico");

    var borrador = leerLocal(claveBorrador);
    if (borrador && borrador.v === BASE.version && borrador.respuestas) {
      // Mezcla el borrador sobre la estructura actual, por si cambiaron preguntas.
      Object.keys(estado.respuestas).forEach(function (pid) {
        var b = borrador.respuestas[pid] || {};
        Object.keys(estado.respuestas[pid]).forEach(function (qid) {
          if (b[qid] !== undefined) estado.respuestas[pid][qid] = b[qid];
        });
      });
      if (!parametro("lang") && UI[borrador.idioma]) estado.idioma = borrador.idioma;
    }
    var cliMarca = cli && cli.marca;
    if (cliMarca) document.title = (estado.idioma === "en" ? "Logo brief · " : "Brief de logo · ") + cliMarca;
    render();
  }

  window.addEventListener("hashchange", function () { if ((location.hash || "").indexOf("#r=") === 0) iniciar(); });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
