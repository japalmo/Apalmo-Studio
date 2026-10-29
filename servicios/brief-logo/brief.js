/*
 * Brief de marca · apalmo studio
 * Arma el formulario desde preguntas.js + clientes.js, guarda un borrador en el navegador
 * y envía las respuestas como JSON por POST a la API (CONFIG.endpoint). El cliente solo ve el agradecimiento.
 * Sin dependencias y sin scripts en línea, para respetar la CSP de apalmo.com.
 */
(function () {
  "use strict";

  var BASE = window.BRIEF_PREGUNTAS;
  var LOGOS = window.BRIEF_LOGOS || {};
  var ICONOS = window.BRIEF_ICONOS || {};
  var CONFIG = window.BRIEF_CONFIG || { clientes: {} };
  var FORMULARIO = "apalmo-brief-marca";
  var RUTA_LOGOS = "img/logos/";
  var MOVIMIENTO = !(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  var UI = {
    es: {
      marcaForm: "Brief de marca",
      introTitulo: "Hablemos de cómo quieren que se vea {marca}.",
      introTituloGenerico: "Hablemos de cómo quieren que se vea su marca.",
      introTexto: "Antes de dibujar nada, queremos entender quiénes son, qué ofrecen, hacia dónde van y qué estilo los representa. No hay respuestas correctas: marquen lo que les nace y lo que no sepan, déjenlo en blanco.",
      introDatos: ["8 pasos cortos", "Unos 8 minutos", "Se guarda mientras respondes"],
      empezar: "Empezar",
      continuar: "Seguir donde quedé",
      reiniciar: "Empezar de nuevo",
      paso: "Paso {n} de {t}",
      atras: "Atrás",
      siguiente: "Siguiente",
      enviar: "Enviar",
      enviando: "Enviando…",
      requerido: "Falta este dato.",
      otro: "Otra",
      otroPh: "Escribe aquí",
      meGusta: "Me gusta",
      noMeGusta: "No va",
      elegidos: "{n} de {m}",
      ejemplos: "Ejemplos: {lista}",
      muestraVacia: "Tu Marca",
      libreMuestra: "Aa?",
      aviso: "Al enviar, aceptas que apalmo studio use tus respuestas solo para preparar la propuesta de tu marca y contactarte.",
      errorEnvio: "No pudimos enviar tus respuestas. Revisa tu conexión e inténtalo de nuevo; no se perdió nada.",
      graciasTitulo: "¡Muchas gracias por llenar el formulario!",
      graciasTexto: "Pronto nos estaremos contactando contigo.",
      graciasFirma: "El equipo de apalmo studio",
      demo: "Vista previa: las respuestas no se enviaron a ningún lado.",
      creditos: "Los logos de marcas conocidas se muestran solo como referencia de estilo y pertenecen a sus dueños.",
      idioma: "EN",
      idiomaLargo: "Switch to English",
      pasos: "Pasos",
      trampa: "No completes este campo"
    },
    en: {
      marcaForm: "Brand brief",
      introTitulo: "Let's talk about how {marca} should look.",
      introTituloGenerico: "Let's talk about how your brand should look.",
      introTexto: "Before drawing anything, we want to understand who you are, what you offer, where you're headed and which style feels like you. There are no wrong answers: go with your gut and leave blank anything you're not sure about.",
      introDatos: ["8 short steps", "About 8 minutes", "Saved as you go"],
      empezar: "Start",
      continuar: "Continue where I left off",
      reiniciar: "Start over",
      paso: "Step {n} of {t}",
      atras: "Back",
      siguiente: "Next",
      enviar: "Send",
      enviando: "Sending…",
      requerido: "This one is needed.",
      otro: "Other",
      otroPh: "Type here",
      meGusta: "Like",
      noMeGusta: "Not for us",
      elegidos: "{n} of {m}",
      ejemplos: "Examples: {lista}",
      muestraVacia: "Your Brand",
      libreMuestra: "Aa?",
      aviso: "By sending, you agree that apalmo studio may use your answers only to prepare your brand proposal and contact you.",
      errorEnvio: "We couldn't send your answers. Check your connection and try again; nothing was lost.",
      graciasTitulo: "Thank you so much for filling out the form!",
      graciasTexto: "We'll be in touch with you soon.",
      graciasFirma: "The apalmo studio team",
      demo: "Preview: the answers were not sent anywhere.",
      creditos: "Logos of well-known brands are shown only as style references and belong to their owners.",
      idioma: "ES",
      idiomaLargo: "Cambiar a español",
      pasos: "Steps",
      trampa: "Leave this field empty"
    }
  };

  var MARCA_APALMO = '<path d="M606.74,958.87l501.44-501.44c25.18-25.18,25.18-66,0-91.17l0,0c-25.18-25.18-66-25.18-91.17,0L706.79,676.48c-0.56-5.4-1.25-10.79-2.06-16.17l357.86-357.86c25.18-25.18,25.18-66,0-91.17l0,0c-25.18-25.18-66-25.18-91.17,0l-316.1,316.1c-2.33-3.7-4.75-7.37-7.24-11L989.66,174.8c25.18-25.18,25.18-66,0-91.17l0,0c-25.18-25.18-66-25.18-91.17,0L556.92,425.2c-3.63-2.49-7.29-4.9-11-7.24l288.74-288.74c25.18-25.18,25.18-66,0-91.17l0,0c-25.18-25.18-66-25.18-91.17,0L412.98,368.55c-5.38-0.81-10.77-1.5-16.17-2.06l164.34-164.34c25.18-25.18,25.18-66,0-91.17l0,0c-25.18-25.18-66-25.18-91.17,0L114.4,466.55c-135.95,135.95-135.95,356.38,0,492.33c135.61,135.61,355.27,135.94,491.3,1l0.01,0.01l1-1C606.73,958.89,606.73,958.89,606.74,958.87C606.74,958.88,606.74,958.88,606.74,958.87z M223.81,849.48c-75.41-75.41-75.41-198.11,0-273.52s198.11-75.41,273.52,0s75.41,198.11,0,273.52S299.22,924.88,223.81,849.48z"/>';
  var ICONO_FLECHA = '<path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"/>';
  var ICONO_ATRAS = '<path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"/>';
  var ICONO_CHECK = '<path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"/>';
  var ICONO_CORAZON = '<path d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40Z"/>';
  var ICONO_X = '<path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"/>';
  var ICONO_PINCEL = '<path d="M232,32a8,8,0,0,0-8-8c-44.08,0-89.31,49.71-114.43,82.63A60,60,0,0,0,32,164c0,30.88-19.54,44.73-20.47,45.37A8,8,0,0,0,16,224H92a60,60,0,0,0,57.37-77.57C182.3,121.31,232,76.08,232,32ZM92,208H34.63C41.38,198.41,48,183.92,48,164a44,44,0,1,1,44,44Zm32.42-94.45q5.14-6.66,10.09-12.55A76.23,76.23,0,0,1,155,121.49q-5.9,4.94-12.55,10.09A60.54,60.54,0,0,0,124.42,113.55Zm42.7-2.68a92.57,92.57,0,0,0-22-22c31.78-34.53,55.75-45,69.9-47.91C212.17,55.12,201.65,79.09,167.12,110.87Z"/>';
  var ICONO_ENVIAR = '<path d="M227.32,28.68a16,16,0,0,0-15.66-4.08l-.15,0L19.57,82.84a16,16,0,0,0-2.49,29.8L102,154l41.3,84.87A15.86,15.86,0,0,0,157.74,248q.69,0,1.38-.06a15.88,15.88,0,0,0,14-11.51l58.2-191.94c0-.05,0-.1,0-.15A16,16,0,0,0,227.32,28.68ZM157.83,231.85l-.05.14,0-.07-40.06-82.3,48-48a8,8,0,0,0-11.31-11.31l-48,48L24.08,98.25l-.07,0,.14,0L216,40Z"/>';

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
    s.setAttribute("focusable", "false");
    if (clase) s.setAttribute("class", clase);
    s.innerHTML = contenido;
    return s;
  }
  function icono(path, clase) { return svg("0 0 256 256", path, "ico " + (clase || "")); }

  function fmt(s, datos) {
    return String(s).replace(/\{(\w+)\}/g, function (_, k) { return datos[k] != null ? datos[k] : ""; });
  }

  function tx(obj) {
    if (obj == null) return "";
    if (typeof obj === "string") return obj;
    return obj[estado.idioma] || obj.es || "";
  }

  function clonar(o) { return JSON.parse(JSON.stringify(o)); }

  function leerLocal(clave) {
    try { var v = window.localStorage.getItem(clave); return v ? JSON.parse(v) : null; } catch (e) { return null; }
  }
  function guardarLocal(clave, valor) {
    try { window.localStorage.setItem(clave, JSON.stringify(valor)); } catch (e) { /* sin almacenamiento: seguimos igual */ }
  }
  function borrarLocal(clave) {
    try { window.localStorage.removeItem(clave); } catch (e) { /* nada */ }
  }

  // Título con palabras que entran una a una (como el hero de apalmo.com).
  function titulo(tag, texto, clase) {
    var h = el(tag, { class: clase });
    String(texto).split(" ").forEach(function (palabra, i) {
      if (i) h.appendChild(document.createTextNode(" "));
      h.appendChild(el("span", { class: "palabra", style: "--i:" + i, text: palabra }));
    });
    return h;
  }

  function imgLogo(id, clase) {
    var l = LOGOS[id];
    if (!l) return null;
    return el("span", { class: "logo " + (clase || "") }, [
      el("img", { src: RUTA_LOGOS + l.archivo, alt: l.nombre, loading: "lazy", decoding: "async", draggable: "false" })
    ]);
  }

  function nombresLogos(ids) {
    return (ids || []).map(function (id) { return LOGOS[id] ? LOGOS[id].nombre : id; });
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
    if (cli && cli.preguntas) {
      def.pasos.forEach(function (paso) {
        paso.preguntas.forEach(function (p) {
          var cambio = cli.preguntas[p.id];
          if (cambio) Object.keys(cambio).forEach(function (k) { p[k] = clonar(cambio[k]); });
        });
      });
    }
    return def;
  }

  function valorVacio(p) {
    switch (p.tipo) {
      case "chips": return p.multiple ? [] : null;
      case "escala": return null;
      case "escritura": return null;
      case "tarjetas":
        if (p.valorar) return { me_gusta: [], no_me_gusta: [] };
        return p.max === 1 ? null : [];
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

  var estado = { idioma: "es", cliente: null, def: null, respuestas: null, paso: 0, errores: {}, iniciado: null, trampa: "", demo: false };
  var claveBorrador = "";
  var raiz;

  function t(clave) { return UI[estado.idioma][clave]; }

  function guardar() {
    if (estado.paso > estado.def.pasos.length) return;
    guardarLocal(claveBorrador, { idioma: estado.idioma, paso: estado.paso, iniciado: estado.iniciado, respuestas: estado.respuestas, v: BASE.version });
  }

  function cliente() { return estado.cliente ? CONFIG.clientes[estado.cliente] : null; }

  function marcaActual() {
    var cli = cliente();
    return (estado.respuestas.negocio.nombre || "").trim() || (cli && cli.marca) || "";
  }

  // ---------- render ----------

  function render() {
    document.documentElement.lang = estado.idioma;
    raiz.textContent = "";
    var total = estado.def.pasos.length;
    raiz.appendChild(cabecera());
    var cuerpo = el("main", { class: "cuerpo", id: "contenido", tabindex: "-1" });
    raiz.appendChild(cuerpo);
    if (estado.paso === 0) cuerpo.appendChild(vistaIntro());
    else if (estado.paso <= total) cuerpo.appendChild(vistaPaso(estado.def.pasos[estado.paso - 1]));
    else cuerpo.appendChild(vistaGracias());
    raiz.appendChild(el("footer", { class: "pie" }, [el("p", { text: t("creditos") })]));
    if (estado.paso > 0 && estado.paso <= total) raiz.appendChild(dock());
    raiz.setAttribute("data-previa", raiz.getAttribute("data-vista") || "");
    raiz.setAttribute("data-vista", estado.paso === 0 ? "intro" : estado.paso > total ? "gracias" : "paso");
  }

  function cabecera() {
    var total = estado.def.pasos.length;
    var avance = estado.paso === 0 ? 0 : Math.min(100, Math.round(((estado.paso - 1) / total) * 100));
    if (estado.paso > total) avance = 100;
    return el("header", { class: "cabecera" }, [
      el("div", { class: "cabecera__fila" }, [
        el("a", { class: "firma", href: "https://apalmo.com/", target: "_blank", rel: "noopener", "aria-label": "apalmo studio" }, [
          svg("-35 -70 1200 1200", MARCA_APALMO, "firma__mano"),
          el("span", { class: "firma__texto", text: "apalmo" })
        ]),
        el("span", { class: "cabecera__titulo", text: t("marcaForm") }),
        el("button", { type: "button", class: "idioma", id: "btn-idioma", onclick: cambiarIdioma, "aria-label": t("idiomaLargo") }, [t("idioma")])
      ]),
      el("div", { class: "progreso", "aria-hidden": "true" }, [el("span", { class: "progreso__barra", style: "transform:scaleX(" + avance / 100 + ")" })])
    ]);
  }

  function cambiarIdioma() {
    estado.idioma = estado.idioma === "es" ? "en" : "es";
    guardar();
    render();
  }

  function vistaIntro() {
    var cli = cliente();
    var marca = cli ? cli.marca : "";
    var borrador = leerLocal(claveBorrador);
    var hayAvance = borrador && borrador.paso > 0;
    var texto = marca ? fmt(t("introTitulo"), { marca: marca }) : t("introTituloGenerico");

    var ids = Object.keys(LOGOS);
    var mitad = Math.ceil(ids.length / 2);
    function fila(lista, clase) {
      var pista = el("div", { class: "carrusel__pista" });
      lista.concat(lista).forEach(function (id) { pista.appendChild(imgLogo(id, "logo--carrusel")); });
      return el("div", { class: "carrusel__fila " + clase }, [pista]);
    }

    return el("section", { class: "intro" }, [
      el("p", { class: "eyebrow aparece", style: "--i:0" }, [el("span", { class: "eyebrow__punto" }), (cli && cli.lugar ? cli.lugar + " · " : "") + t("marcaForm")]),
      titulo("h1", texto, "display"),
      el("p", { class: "lead aparece", style: "--i:2", text: t("introTexto") }),
      el("ul", { class: "intro__datos aparece", style: "--i:3" }, t("introDatos").map(function (d) { return el("li", { text: d }); })),
      el("div", { class: "acciones aparece", style: "--i:4" }, [
        el("button", { type: "button", class: "btn", id: "btn-empezar", onclick: function () {
          if (!estado.iniciado) estado.iniciado = new Date().toISOString();
          irA(hayAvance ? Math.min(borrador.paso, estado.def.pasos.length) : 1);
        } }, [
          el("span", { text: hayAvance ? t("continuar") : t("empezar") }), icono(ICONO_FLECHA, "ico--fin")
        ]),
        hayAvance ? el("button", { type: "button", class: "btn btn--fantasma", id: "btn-reiniciar", onclick: reiniciar }, [t("reiniciar")]) : null
      ]),
      el("div", { class: "carrusel aparece", style: "--i:5", "aria-hidden": "true" }, [fila(ids.slice(0, mitad), ""), fila(ids.slice(mitad), "carrusel__fila--inversa")])
    ]);
  }

  function reiniciar() {
    borrarLocal(claveBorrador);
    estado.respuestas = respuestasVacias(estado.def, cliente());
    estado.paso = 0;
    render();
  }

  function vistaPaso(paso) {
    var lista = el("div", { class: "preguntas" });
    paso.preguntas.forEach(function (p, i) {
      var nodo = campo(paso, p);
      nodo.classList.add("aparece");
      nodo.style.setProperty("--i", String(i + 2));
      lista.appendChild(nodo);
    });
    var ultimo = estado.paso === estado.def.pasos.length;
    if (ultimo) {
      // Campo trampa para bots: invisible para las personas.
      var trampa = el("input", { type: "text", id: "q-sitio-web", name: "sitio_web", tabindex: "-1", autocomplete: "off",
        oninput: function (e) { estado.trampa = e.target.value; } });
      lista.appendChild(el("div", { class: "trampa", "aria-hidden": "true" }, [el("label", { for: "q-sitio-web", text: t("trampa") }), trampa]));
      lista.appendChild(el("p", { class: "aviso aparece", style: "--i:" + (paso.preguntas.length + 2), text: t("aviso") }));
      lista.appendChild(el("p", { class: "nota nota--error", id: "nota-envio", role: "alert" }));
    }
    return el("section", { class: "paso paso--" + paso.id }, [
      el("p", { class: "eyebrow aparece", style: "--i:0" }, [el("span", { class: "eyebrow__num", text: String(estado.paso).padStart(2, "0") }), fmt(t("paso"), { n: estado.paso, t: estado.def.pasos.length })]),
      titulo("h1", tx(paso.titulo), "titulo"),
      paso.intro ? el("p", { class: "lead aparece", style: "--i:1", text: tx(paso.intro) }) : null,
      lista
    ]);
  }

  function campo(paso, p) {
    var r = estado.respuestas[paso.id];
    var idc = "q-" + p.id;
    var error = estado.errores[p.id];
    var etiqueta = p.label ? tx(p.label) : "";
    var ayudaId = p.ayuda ? idc + "-ayuda" : null;
    var errId = error ? idc + "-error" : null;
    var describe = [ayudaId, errId].filter(Boolean).join(" ") || null;

    function setVal(v) {
      r[p.id] = v;
      if (estado.errores[p.id]) delete estado.errores[p.id];
      guardar();
    }

    if (p.tipo === "texto" || p.tipo === "area") {
      var attrs = { id: idc, class: "entrada", "aria-describedby": describe, "aria-invalid": error ? "true" : null, autocomplete: p.autocompletar || "off",
        oninput: function (e) { setVal(e.target.value); if (p.id === "nombre") actualizarMuestras(); } };
      var control;
      if (p.tipo === "texto") { attrs.type = p.teclado || "text"; control = el("input", attrs); }
      else { attrs.rows = "3"; control = el("textarea", attrs); }
      control.value = r[p.id] || "";
      return grupo(el("label", { class: "pregunta__label", for: idc }, [etiqueta, p.req ? el("span", { class: "req", "aria-hidden": "true", text: " *" }) : null]), p, control, ayudaId, errId);
    }

    if (p.tipo === "chips") {
      var cont = p.max ? el("span", { class: "contador", "aria-live": "polite" }) : null;
      var chips = el("div", { class: "chips", role: "group", "aria-labelledby": idc + "-l" });
      var botones = [];
      function pintar() {
        botones.forEach(function (b) {
          var on = p.multiple ? r[p.id].indexOf(b.id) >= 0 : r[p.id] === b.id;
          b.btn.setAttribute("aria-pressed", on ? "true" : "false");
        });
        if (cont) cont.textContent = fmt(t("elegidos"), { n: r[p.id].length, m: p.max });
      }
      p.opciones.forEach(function (o) {
        var b = el("button", { type: "button", class: "chip", id: idc + "-" + o.id, "aria-pressed": "false",
          onclick: function () {
            if (p.multiple) {
              var arr = r[p.id], i = arr.indexOf(o.id);
              if (i >= 0) arr.splice(i, 1);
              else if (p.max && arr.length >= p.max) { avisarLleno(cont); return; }
              else arr.push(o.id);
              setVal(arr);
            } else {
              setVal(r[p.id] === o.id ? null : o.id);
            }
            pintar();
          } }, [icono(ICONO_CHECK, "chip__check"), el("span", { text: tx(o) })]);
        botones.push({ id: o.id, btn: b });
        chips.appendChild(b);
      });
      pintar();
      var extra = null;
      if (p.otro) {
        var otroId = idc + "-otro";
        var otro = el("input", { type: "text", id: otroId, class: "entrada entrada--otro", placeholder: t("otroPh"), autocomplete: "off",
          oninput: function (e) { r[p.id + "_otro"] = e.target.value; guardar(); } });
        otro.value = r[p.id + "_otro"] || "";
        extra = el("div", { class: "otro" }, [el("label", { for: otroId, class: "otro__label", text: t("otro") }), otro]);
      }
      return grupo(cabPregunta(idc, etiqueta, cont), p, el("div", { class: "pila" }, [chips, extra]), ayudaId, errId);
    }

    if (p.tipo === "escala") {
      var marcador = el("span", { class: "escala__marcador", "aria-hidden": "true" });
      function moverMarcador(v) {
        marcador.hidden = !v;
        if (v) marcador.style.setProperty("--pos", String(v - 1));
      }
      var fila = el("div", { class: "escala__pista", role: "radiogroup", "aria-label": tx(p.izq) + " — " + tx(p.der) }, [marcador]);
      for (var i = 1; i <= 5; i++) {
        (function (v) {
          var rid = idc + "-" + v;
          var desc = v === 3 ? (estado.idioma === "en" ? "Neither" : "Ni lo uno ni lo otro") : (v < 3 ? tx(p.izq) : tx(p.der)) + (v === 1 || v === 5 ? "" : (estado.idioma === "en" ? " (a bit)" : " (algo)"));
          var input = el("input", { type: "radio", name: idc, id: rid, value: String(v), class: "escala__radio",
            onchange: function () { setVal(v); moverMarcador(v); } });
          if (r[p.id] === v) input.checked = true;
          fila.appendChild(el("label", { class: "escala__punto", for: rid }, [input, el("span", { class: "escala__marca", "aria-hidden": "true" }), el("span", { class: "sr", text: desc })]));
        })(i);
      }
      moverMarcador(r[p.id]);
      return el("div", { class: "pregunta pregunta--escala" }, [
        el("span", { class: "escala__extremo", "aria-hidden": "true", text: tx(p.izq) }),
        fila,
        el("span", { class: "escala__extremo escala__extremo--der", "aria-hidden": "true", text: tx(p.der) })
      ]);
    }

    if (p.tipo === "escritura") return campoEscritura(p, r, idc, etiqueta, ayudaId, errId, setVal);
    if (p.tipo === "tarjetas") return campoTarjetas(p, r, idc, etiqueta, ayudaId, errId, setVal);
    if (p.tipo === "paletas") return campoPaletas(p, r, idc, etiqueta, ayudaId, errId, setVal);
    return el("div");
  }

  // Muestra el nombre escrito de cada forma, y se actualiza mientras lo escriben.
  function muestraEscritura(caso) {
    var nombre = marcaActual() || t("muestraVacia");
    if (caso === "mayusculas") return nombre.toLocaleUpperCase(estado.idioma);
    if (caso === "minusculas") return nombre.toLocaleLowerCase(estado.idioma);
    if (caso === "libre") return t("libreMuestra");
    return nombre;
  }
  function actualizarMuestras() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-caso]"), function (n) {
      n.textContent = muestraEscritura(n.getAttribute("data-caso"));
    });
  }

  function campoEscritura(p, r, idc, etiqueta, ayudaId, errId, setVal) {
    var rejilla = el("div", { class: "escrituras", role: "group", "aria-labelledby": idc + "-l" });
    var botones = [];
    function pintar() { botones.forEach(function (b) { b.btn.setAttribute("aria-pressed", r[p.id] === b.id ? "true" : "false"); }); }
    p.opciones.forEach(function (o) {
      var b = el("button", { type: "button", class: "escritura", id: idc + "-" + o.id, "aria-pressed": "false",
        onclick: function () { setVal(r[p.id] === o.id ? null : o.id); pintar(); } }, [
        el("span", { class: "escritura__muestra" + (o.caso === "libre" ? " escritura__muestra--libre" : ""), "data-caso": o.caso, "aria-hidden": "true", text: muestraEscritura(o.caso) }),
        el("span", { class: "escritura__nombre", text: tx(o) }),
        el("span", { class: "tarjeta__check", "aria-hidden": "true" }, [icono(ICONO_CHECK)])
      ]);
      botones.push({ id: o.id, btn: b });
      rejilla.appendChild(b);
    });
    pintar();
    return grupo(cabPregunta(idc, etiqueta, null), p, rejilla, ayudaId, errId);
  }

  // Al llegar al máximo no se marca nada más: el contador parpadea para avisar.
  function avisarLleno(contador) {
    if (!contador) return;
    contador.classList.remove("contador--lleno");
    void contador.offsetWidth;
    contador.classList.add("contador--lleno");
  }

  function cabPregunta(idc, etiqueta, contador) {
    return el("div", { class: "pregunta__cab" }, [el("p", { class: "pregunta__label", id: idc + "-l", text: etiqueta }), contador]);
  }

  function mediaTarjeta(o) {
    if (o.logos && o.logos.length) {
      return el("span", { class: "tarjeta__logos tarjeta__logos--" + o.logos.length, "aria-hidden": "true" }, o.logos.map(function (id, i) {
        var n = imgLogo(id, "logo--tarjeta");
        if (n) n.style.setProperty("--j", String(i));
        return n;
      }));
    }
    if (o.icono && ICONOS[o.icono]) {
      return el("span", { class: "tarjeta__icono", "aria-hidden": "true" }, [svg("0 0 48 48", ICONOS[o.icono], "tarjeta__svg")]);
    }
    return null;
  }

  function textoTarjeta(o) {
    return el("span", { class: "tarjeta__texto" }, [
      el("span", { class: "tarjeta__nombre", text: tx(o) }),
      o.desc ? el("span", { class: "tarjeta__desc", text: tx(o.desc) }) : null,
      o.logos && o.logos.length ? el("span", { class: "sr", text: fmt(t("ejemplos"), { lista: nombresLogos(o.logos).join(", ") }) }) : null
    ]);
  }

  function campoTarjetas(p, r, idc, etiqueta, ayudaId, errId, setVal) {
    var conLogos = p.opciones.some(function (o) { return o.logos; });
    var rejilla = el("div", { class: "tarjetas" + (conLogos ? " tarjetas--logos" : " tarjetas--iconos"), role: "group", "aria-labelledby": idc + "-l" });

    if (p.valorar) {
      var val = r[p.id];
      p.opciones.forEach(function (o) {
        var estadoV = val.me_gusta.indexOf(o.id) >= 0 ? "si" : val.no_me_gusta.indexOf(o.id) >= 0 ? "no" : "";
        var tarjeta = el("article", { class: "tarjeta tarjeta--valorar", "data-estado": estadoV, id: idc + "-" + o.id });
        var bSi, bNo;
        function marcar(cual) {
          [val.me_gusta, val.no_me_gusta].forEach(function (a) { var k = a.indexOf(o.id); if (k >= 0) a.splice(k, 1); });
          var nuevo = tarjeta.getAttribute("data-estado") === cual ? "" : cual;
          if (nuevo === "si") val.me_gusta.push(o.id);
          if (nuevo === "no") val.no_me_gusta.push(o.id);
          tarjeta.setAttribute("data-estado", nuevo);
          bSi.setAttribute("aria-pressed", nuevo === "si" ? "true" : "false");
          bNo.setAttribute("aria-pressed", nuevo === "no" ? "true" : "false");
          setVal(val);
        }
        bSi = el("button", { type: "button", class: "valorar valorar--si", "aria-pressed": estadoV === "si" ? "true" : "false", onclick: function () { marcar("si"); } }, [icono(ICONO_CORAZON), el("span", { text: t("meGusta") })]);
        bNo = el("button", { type: "button", class: "valorar valorar--no", "aria-pressed": estadoV === "no" ? "true" : "false", onclick: function () { marcar("no"); } }, [icono(ICONO_X), el("span", { text: t("noMeGusta") })]);
        tarjeta.appendChild(mediaTarjeta(o));
        tarjeta.appendChild(textoTarjeta(o));
        tarjeta.appendChild(el("div", { class: "tarjeta__acciones", role: "group", "aria-label": tx(o) }, [bSi, bNo]));
        rejilla.appendChild(tarjeta);
      });
      return grupo(cabPregunta(idc, etiqueta, null), p, rejilla, ayudaId, errId);
    }

    var unica = p.max === 1;
    var cont = unica ? null : el("span", { class: "contador", "aria-live": "polite" });
    var botones = [];
    function elegidos() { return unica ? (r[p.id] ? [r[p.id]] : []) : r[p.id]; }
    function pintar() {
      var sel = elegidos();
      botones.forEach(function (b) { b.btn.setAttribute("aria-pressed", sel.indexOf(b.id) >= 0 ? "true" : "false"); });
      if (cont) cont.textContent = fmt(t("elegidos"), { n: sel.length, m: p.max });
    }
    p.opciones.forEach(function (o) {
      var b = el("button", { type: "button", class: "tarjeta", id: idc + "-" + o.id, "aria-pressed": "false",
        onclick: function () {
          if (unica) setVal(r[p.id] === o.id ? null : o.id);
          else {
            var arr = r[p.id], k = arr.indexOf(o.id);
            if (k >= 0) arr.splice(k, 1);
            else if (arr.length >= p.max) { avisarLleno(cont); return; }
            else arr.push(o.id);
            setVal(arr);
          }
          pintar();
        } }, [mediaTarjeta(o), textoTarjeta(o), el("span", { class: "tarjeta__check", "aria-hidden": "true" }, [icono(ICONO_CHECK)])]);
      botones.push({ id: o.id, btn: b });
      rejilla.appendChild(b);
    });
    pintar();
    return grupo(cabPregunta(idc, etiqueta, cont), p, rejilla, ayudaId, errId);
  }

  function campoPaletas(p, r, idc, etiqueta, ayudaId, errId, setVal) {
    var cont = el("span", { class: "contador", "aria-live": "polite" });
    var grid = el("div", { class: "paletas", role: "group", "aria-labelledby": idc + "-l" });
    var botones = [];
    var libre = p.libre && p.libre.id;
    function pintar() {
      botones.forEach(function (b) { b.btn.setAttribute("aria-pressed", r[p.id].indexOf(b.id) >= 0 ? "true" : "false"); });
      cont.textContent = fmt(t("elegidos"), { n: r[p.id].filter(function (x) { return x !== libre; }).length, m: p.max });
    }
    function alternar(id) {
      var arr = r[p.id], k = arr.indexOf(id);
      if (k >= 0) arr.splice(k, 1);
      else if (id === libre) arr.splice(0, arr.length, id);
      else {
        if (libre && arr.indexOf(libre) >= 0) arr.splice(arr.indexOf(libre), 1);
        if (arr.length >= p.max) { avisarLleno(cont); return; }
        arr.push(id);
      }
      setVal(arr);
      pintar();
    }
    p.opciones.forEach(function (o) {
      var b = el("button", { type: "button", class: "paleta", id: idc + "-" + o.id, "aria-pressed": "false", onclick: function () { alternar(o.id); } }, [
        el("span", { class: "paleta__muestras", "aria-hidden": "true" }, o.colores.map(function (c, i) {
          return el("span", { class: "paleta__color", style: "background:" + c + ";--k:" + i });
        })),
        el("span", { class: "paleta__texto" }, [
          el("span", { class: "paleta__nombre", text: tx(o) }),
          o.desc ? el("span", { class: "paleta__desc", text: tx(o.desc) }) : null
        ]),
        o.logos && o.logos.length ? el("span", { class: "paleta__logos" }, o.logos.map(function (id) { return imgLogo(id, "logo--mini"); })) : null,
        el("span", { class: "tarjeta__check", "aria-hidden": "true" }, [icono(ICONO_CHECK)])
      ]);
      botones.push({ id: o.id, btn: b });
      grid.appendChild(b);
    });
    if (p.libre) {
      var libreBtn = el("button", { type: "button", class: "paleta paleta--libre", id: idc + "-" + libre, "aria-pressed": "false", onclick: function () { alternar(libre); } }, [
        el("span", { class: "paleta__muestras paleta__muestras--libre", "aria-hidden": "true" }, [icono(ICONO_PINCEL)]),
        el("span", { class: "paleta__texto" }, [el("span", { class: "paleta__nombre", text: tx(p.libre) })]),
        el("span", { class: "tarjeta__check", "aria-hidden": "true" }, [icono(ICONO_CHECK)])
      ]);
      botones.push({ id: libre, btn: libreBtn });
      grid.appendChild(libreBtn);
    }
    pintar();
    return grupo(cabPregunta(idc, etiqueta, cont), p, grid, ayudaId, errId);
  }

  function grupo(etiqueta, p, control, ayudaId, errId) {
    return el("div", { class: "pregunta pregunta--" + p.tipo }, [
      etiqueta,
      p.ayuda ? el("p", { class: "pregunta__ayuda", id: ayudaId, text: tx(p.ayuda) }) : null,
      control,
      errId ? el("p", { class: "pregunta__error", id: errId, role: "alert", text: t("requerido") }) : null
    ]);
  }

  // Barra flotante inferior, como el dock de apalmo.com.
  function dock() {
    var total = estado.def.pasos.length;
    var ultimo = estado.paso === total;
    var puntos = el("ol", { class: "dock__puntos", "aria-label": t("pasos") });
    for (var i = 1; i <= total; i++) {
      var estadoP = i < estado.paso ? "hecho" : i === estado.paso ? "actual" : "";
      puntos.appendChild(el("li", { class: "dock__punto", "data-estado": estadoP, "aria-current": i === estado.paso ? "step" : null }, [
        el("span", { class: "sr", text: tx(estado.def.pasos[i - 1].titulo) })
      ]));
    }
    var hijos = [
      el("button", { type: "button", class: "dock__btn", id: "btn-atras", "aria-label": t("atras"), onclick: function () { irA(estado.paso - 1); } }, [icono(ICONO_ATRAS)]),
      puntos
    ];
    hijos.push(el("button", { type: "button", class: "btn btn--dock", id: ultimo ? "btn-enviar" : "btn-siguiente", onclick: function (e) { avanzar(e.currentTarget); } }, [
      el("span", { text: ultimo ? t("enviar") : t("siguiente") }), icono(ultimo ? ICONO_ENVIAR : ICONO_FLECHA, "ico--fin")
    ]));
    return el("nav", { class: "dock", "aria-label": t("pasos") }, [el("div", { class: "dock__pastilla" }, hijos)]);
  }

  function avanzar(boton) {
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
      if (f) { f.focus(); f.scrollIntoView({ block: "center", behavior: MOVIMIENTO ? "smooth" : "auto" }); }
      return;
    }
    if (estado.paso === estado.def.pasos.length) enviar(boton);
    else irA(estado.paso + 1);
  }

  var cambiando = false;
  function irA(n) {
    if (cambiando) return;
    var destino = Math.max(0, Math.min(n, estado.def.pasos.length + 1));
    var main = document.getElementById("contenido");
    var hacia = destino >= estado.paso ? "adelante" : "atras";
    function mostrar() {
      estado.paso = destino;
      estado.errores = {};
      guardar();
      render();
      raiz.setAttribute("data-dir", hacia);
      window.scrollTo(0, 0);
      var c = document.getElementById("contenido");
      if (c) c.focus({ preventScroll: true });
      cambiando = false;
    }
    if (MOVIMIENTO && main) {
      cambiando = true;
      raiz.setAttribute("data-dir", hacia);
      main.classList.add("saliendo");
      setTimeout(mostrar, 220);
    } else mostrar();
  }

  // ---------- salida y envío ----------

  function referenciasVisuales(def, respuestas) {
    var refs = {};
    def.pasos.forEach(function (paso) {
      paso.preguntas.forEach(function (p) {
        if (p.tipo !== "tarjetas" && p.tipo !== "paletas") return;
        var v = (respuestas[paso.id] || {})[p.id];
        var ids = !v ? [] : Array.isArray(v) ? v : typeof v === "string" ? [v] : v.me_gusta.concat(v.no_me_gusta);
        ids.forEach(function (id) {
          var o = (p.opciones || []).filter(function (x) { return x.id === id; })[0];
          if (!o) return;
          var info = {};
          if (o.logos && o.logos.length) info.ejemplos = nombresLogos(o.logos);
          if (o.colores) info.colores = o.colores;
          if (Object.keys(info).length) refs[id] = info;
        });
      });
    });
    return refs;
  }

  function construirSalida() {
    var r = clonar(estado.respuestas);
    var cierre = r.cierre || {};
    return {
      formulario: FORMULARIO,
      version: BASE.version,
      cliente: estado.cliente,
      marca: marcaActual(),
      idioma: estado.idioma,
      iniciado: estado.iniciado,
      enviado: new Date().toISOString(),
      contacto: { nombre: cierre.contacto_nombre || "", telefono: cierre.contacto_telefono || "", correo: cierre.contacto_correo || "" },
      formato: "Escalas de 1 a 5: 1 = primera palabra del id, 5 = la segunda, 3 = neutro, null = sin responder. Las opciones usan los id de preguntas.js; referencias_visuales trae los logos de ejemplo y los colores de cada opción elegida.",
      respuestas: r,
      referencias_visuales: referenciasVisuales(estado.def, r),
      trampa: estado.trampa || ""
    };
  }

  var enviandoAhora = false;
  function enviar(boton) {
    if (enviandoAhora) return;
    var nota = document.getElementById("nota-envio");
    var datos = construirSalida();
    enviandoAhora = true;
    if (boton) { boton.disabled = true; boton.firstChild.textContent = t("enviando"); }
    if (nota) nota.textContent = "";

    var envio;
    if (CONFIG.endpoint) {
      var control = typeof AbortController === "function" ? new AbortController() : null;
      var reloj = setTimeout(function () { if (control) control.abort(); }, 20000);
      envio = fetch(CONFIG.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
        credentials: "same-origin",
        signal: control ? control.signal : undefined
      }).then(function (res) {
        clearTimeout(reloj);
        if (!res.ok) throw new Error("HTTP " + res.status);
      });
    } else {
      // Sin servidor configurado (vista previa): se muestra el agradecimiento sin enviar nada.
      if (window.console) console.info("[brief] Vista previa, sin envío:", datos);
      estado.demo = true;
      envio = new Promise(function (ok) { setTimeout(ok, 700); });
    }

    envio.then(function () {
      enviandoAhora = false;
      borrarLocal(claveBorrador);
      irA(estado.def.pasos.length + 1);
    }).catch(function () {
      enviandoAhora = false;
      if (boton) { boton.disabled = false; boton.firstChild.textContent = t("enviar"); }
      if (nota) nota.textContent = t("errorEnvio");
    });
  }

  function vistaGracias() {
    return el("section", { class: "gracias" }, [
      el("div", { class: "gracias__sello aparece", style: "--i:0", "aria-hidden": "true" }, [
        svg("0 0 64 64", '<circle class="gracias__circulo" cx="32" cy="32" r="29"/><path class="gracias__check" d="M20 33.5 28 41 44 24"/>', "gracias__svg")
      ]),
      titulo("h1", t("graciasTitulo"), "display gracias__titulo"),
      el("p", { class: "lead aparece", style: "--i:3", text: t("graciasTexto") }),
      el("p", { class: "gracias__firma aparece", style: "--i:4" }, [svg("-35 -70 1200 1200", MARCA_APALMO, "firma__mano"), el("span", { text: t("graciasFirma") })]),
      estado.demo ? el("p", { class: "nota aparece", style: "--i:5", text: t("demo") }) : null
    ]);
  }

  // ---------- inicio ----------

  function iniciar() {
    raiz = document.getElementById("brief");
    if (!raiz || !BASE) return;
    estado.idioma = UI[parametro("lang")] ? parametro("lang") : "es";

    estado.cliente = idCliente();
    var cli = cliente();
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
      estado.iniciado = borrador.iniciado || null;
    }
    if (cli && cli.marca) document.title = (estado.idioma === "en" ? "Brand brief · " : "Brief de marca · ") + cli.marca;
    render();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
