/*
 * Configuración general y clientes del brief de marca.
 *
 * Para un cliente nuevo, agrega una entrada en "clientes" y comparte:
 *   https://apalmo.com/brief/logo/?c=<id-del-cliente>
 * Sin ?c= el formulario funciona igual, en modo genérico (el cliente escribe su nombre).
 * Agrega &lang=en para abrirlo en inglés.
 *
 * Campos de un cliente:
 *   marca       Nombre de la marca (se muestra en la portada).
 *   lugar       Ciudad (se muestra en la portada).
 *   idioma      "es" o "en": idioma con que abre.
 *   respuestas  Valores precargados, por id de pregunta.
 *   preguntas   Reemplazos de preguntas, por id (se mezclan con la pregunta base).
 */
(function () {
  "use strict";

  window.BRIEF_CONFIG = {
    // Ruta del mismo dominio que recibe las respuestas en JSON por POST (la API de apalmo.com).
    // Vacío = vista previa: muestra el agradecimiento sin enviar nada.
    endpoint: "/api/brief",

    clientes: {
      "rr-pro-hauling": {
        marca: "R&R Pro Hauling",
        lugar: "Orlando, Florida",
        idioma: "es",
        respuestas: {
          nombre: "R&R Pro Hauling"
        },
        preguntas: {
          detalle_escritura: {
            ayuda: { es: "Por ejemplo, si el «&» va como símbolo o se escribe «and».", en: "For example, whether the “&” stays a symbol or is spelled “and”." }
          },
          historia_nombre: {
            label: { es: "¿Qué significan las dos R?", en: "What do the two R's stand for?" },
            ayuda: { es: "Nombres, apellidos, una idea… Nos puede dar pistas para el logo.", en: "Names, a family name, an idea… It can inspire the logo." }
          },
          servicios: {
            tipo: "chips",
            multiple: true,
            otro: true,
            label: { es: "¿Qué servicios ofrecen o van a ofrecer?", en: "What services do you offer, or plan to offer?" },
            ayuda: { es: "Marca todos. Si falta alguno, escríbelo en «Otro».", en: "Tap all that apply. If something's missing, add it under “Other”." },
            opciones: [
              { id: "retiro-basura", es: "Retiro de basura y cachivaches", en: "Junk removal" },
              { id: "mudanzas", es: "Mudanzas", en: "Moving" },
              { id: "entregas", es: "Entregas de muebles y electrodomésticos", en: "Furniture & appliance delivery" },
              { id: "escombros", es: "Escombros de construcción", en: "Construction debris" },
              { id: "vaciado", es: "Vaciado de casas, garajes y bodegas", en: "House, garage & storage cleanouts" },
              { id: "jardin", es: "Restos de jardín y árboles", en: "Yard waste" },
              { id: "carga", es: "Transporte de carga", en: "Freight hauling" }
            ]
          }
        }
      }
    }
  };
})();
