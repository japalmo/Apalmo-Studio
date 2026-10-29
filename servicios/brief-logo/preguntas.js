/*
 * Preguntas del brief de logo (apalmo studio).
 * Todo el cuestionario vive aquí: para cambiar una pregunta, edita este archivo.
 * Los textos van en español (es) e inglés (en). Los "id" son los que salen en el JSON.
 * Un cliente puede reemplazar cualquier pregunta desde clientes.js (campo "preguntas").
 */
(function () {
  "use strict";

  // Muestras de estilo. Cada una dibuja un logo de ejemplo con el nombre del cliente,
  // en un solo color, para que se elija el estilo sin que influya el color.
  // m = { mono: "R&R", resto: "PRO HAULING", lugar: "ORLANDO, FL" } (ya escapados)
  var vibras = [
    {
      id: "fuerte-industrial",
      nombre: { es: "Fuerte e industrial", en: "Bold & industrial" },
      desc: { es: "Letras gruesas y pesadas. Transmite fuerza y trabajo duro.", en: "Heavy, thick letters. Says strength and hard work." },
      svg: function (m) {
        return (
          '<text x="160" y="104" text-anchor="middle" class="f-anton" font-size="88" data-max="250">' + m.mono + "</text>" +
          '<rect x="40" y="116" width="240" height="36" class="tinta"/>' +
          '<text x="160" y="142" text-anchor="middle" class="f-anton inv" font-size="22" letter-spacing="5" data-max="220">' + m.resto + "</text>"
        );
      }
    },
    {
      id: "retro-insignia",
      nombre: { es: "Retro / insignia americana", en: "Retro American badge" },
      desc: { es: "Sello circular clásico, como de taller o marca de antes.", en: "Classic round seal, like an old-school shop." },
      svg: function (m) {
        return (
          '<defs><path id="vb-arriba" d="M96 90 A64 64 0 0 1 224 90"/><path id="vb-abajo" d="M87 90 A73 73 0 0 0 233 90"/></defs>' +
          '<circle cx="160" cy="90" r="80" class="trazo" stroke-width="3"/>' +
          '<circle cx="160" cy="90" r="57" class="trazo" stroke-width="1.5"/>' +
          '<text class="f-alfa" font-size="14" letter-spacing="2"><textPath href="#vb-arriba" startOffset="50%" text-anchor="middle">' + m.resto + "</textPath></text>" +
          '<text class="f-alfa" font-size="11" letter-spacing="3"><textPath href="#vb-abajo" startOffset="50%" text-anchor="middle">' + m.lugar + "</textPath></text>" +
          '<text x="160" y="102" text-anchor="middle" class="f-alfa" font-size="34" data-max="96">' + m.mono + "</text>" +
          '<path d="M85 94 l3 -7 l3 7 l-6 -4.5 h6 z M229 94 l3 -7 l3 7 l-6 -4.5 h6 z" class="tinta"/>'
        );
      }
    },
    {
      id: "moderno-minimal",
      nombre: { es: "Moderno y simple", en: "Modern & minimal" },
      desc: { es: "Limpio, con mucho aire. Se ve actual y ordenado.", en: "Clean with lots of space. Looks current and tidy." },
      svg: function (m) {
        return (
          '<rect x="44" y="60" width="60" height="60" rx="14" class="tinta"/>' +
          '<path d="M64 76 l16 14 l-16 14" class="trazo inv-trazo" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>' +
          '<text x="122" y="100" class="f-outfit" font-size="40" data-max="160">' + m.mono.toLowerCase() + "</text>" +
          '<text x="124" y="122" class="f-outfit" font-size="12" letter-spacing="3" data-max="160">' + m.resto.toLowerCase() + "</text>"
        );
      }
    },
    {
      id: "amigable-redondeado",
      nombre: { es: "Amigable y cercano", en: "Friendly & approachable" },
      desc: { es: "Formas redondas y simpáticas. Da confianza a las familias.", en: "Round, cheerful shapes. Families feel at ease." },
      svg: function (m) {
        return (
          '<rect x="116" y="22" width="62" height="40" rx="9" class="tinta"/>' +
          '<rect x="176" y="34" width="28" height="28" rx="8" class="tinta"/>' +
          '<rect x="184" y="40" width="13" height="9" rx="3" class="inv"/>' +
          '<circle cx="134" cy="66" r="11" class="inv"/><circle cx="134" cy="66" r="8" class="tinta"/>' +
          '<circle cx="190" cy="66" r="11" class="inv"/><circle cx="190" cy="66" r="8" class="tinta"/>' +
          '<text x="160" y="126" text-anchor="middle" class="f-fredoka" font-size="44" data-max="240">' + m.mono + "</text>" +
          '<text x="160" y="154" text-anchor="middle" class="f-fredoka" font-size="18" data-max="240">' + m.restoTitulo + "</text>"
        );
      }
    },
    {
      id: "premium-elegante",
      nombre: { es: "Premium y elegante", en: "Premium & refined" },
      desc: { es: "Letras finas y clásicas. Se siente serio y de calidad.", en: "Fine classic letters. Feels serious and high-end." },
      svg: function (m) {
        return (
          '<text x="160" y="96" text-anchor="middle" class="f-cinzel" font-size="56" data-max="240">' + m.mono + "</text>" +
          '<rect x="70" y="117" width="74" height="1.5" class="tinta"/><rect x="176" y="117" width="74" height="1.5" class="tinta"/>' +
          '<rect x="155" y="113" width="10" height="10" transform="rotate(45 160 118)" class="tinta"/>' +
          '<text x="160" y="148" text-anchor="middle" class="f-cinzel" font-size="13" letter-spacing="6" data-max="230">' + m.resto + "</text>"
        );
      }
    },
    {
      id: "deportivo-velocidad",
      nombre: { es: "Rápido y deportivo", en: "Fast & sporty" },
      desc: { es: "Inclinado, con líneas de movimiento. Habla de rapidez.", en: "Slanted with speed lines. Says fast service." },
      svg: function (m) {
        return (
          '<g transform="translate(22 0) skewX(-12)">' +
          '<rect x="28" y="62" width="62" height="7" class="tinta"/><rect x="42" y="78" width="48" height="7" class="tinta"/><rect x="56" y="94" width="34" height="7" class="tinta"/>' +
          '<text x="186" y="104" text-anchor="middle" class="f-russo" font-size="58" data-max="180">' + m.mono + "</text>" +
          '<rect x="96" y="114" width="180" height="4" class="tinta"/>' +
          '<text x="186" y="142" text-anchor="middle" class="f-russo" font-size="17" letter-spacing="2" data-max="180">' + m.resto + "</text>" +
          "</g>"
        );
      }
    }
  ];

  var simbolos = [
    { id: "vehiculo", es: "Un camión o vehículo", en: "A truck or vehicle",
      svg: '<rect x="6" y="18" width="32" height="22" rx="3" class="trazo" stroke-width="3"/><path d="M38 26 h10 l8 8 v6 h-18 z" class="trazo" stroke-width="3" stroke-linejoin="round"/><circle cx="16" cy="44" r="5" class="tinta"/><circle cx="46" cy="44" r="5" class="tinta"/>' },
    { id: "iniciales", es: "Las iniciales (monograma)", en: "The initials (monogram)",
      svg: '<text x="32" y="42" text-anchor="middle" class="f-cinzel" font-size="26">{mono2}</text><circle cx="32" cy="32" r="27" class="trazo" stroke-width="2"/>' },
    { id: "solo-nombre", es: "Solo el nombre, sin dibujo", en: "Just the name, no icon",
      svg: '<text x="32" y="40" text-anchor="middle" class="f-anton" font-size="26">Aa</text><rect x="10" y="46" width="44" height="2.5" class="tinta"/>' },
    { id: "emblema", es: "Un escudo o emblema", en: "A shield or emblem",
      svg: '<path d="M32 6 L54 14 V30 C54 44 44 53 32 58 C20 53 10 44 10 30 V14 Z" class="trazo" stroke-width="3" stroke-linejoin="round"/><path d="M24 31 l6 6 l11 -12" class="trazo" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>' },
    { id: "abstracto", es: "Una forma o flecha (movimiento)", en: "A shape or arrow (motion)",
      svg: '<path d="M10 18 l14 14 l-14 14 M26 18 l14 14 l-14 14 M42 18 l14 14 l-14 14" class="trazo" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>' },
    { id: "personaje", es: "Un personaje o mascota", en: "A character or mascot",
      svg: '<rect x="12" y="16" width="40" height="36" rx="6" class="trazo" stroke-width="3"/><path d="M12 26 h40" class="trazo" stroke-width="3"/><circle cx="25" cy="37" r="3" class="tinta"/><circle cx="39" cy="37" r="3" class="tinta"/><path d="M26 44 q6 5 12 0" class="trazo" stroke-width="2.5" stroke-linecap="round"/>' }
  ];

  var paletas = [
    { id: "azul-marino-rojo", es: "Azul marino y rojo", en: "Navy & red", colores: ["#1F2A44", "#C8102E", "#F5F5F2"] },
    { id: "negro-amarillo", es: "Negro y amarillo", en: "Black & yellow", colores: ["#1A1A1A", "#F2B705", "#8A8D91"] },
    { id: "grafito-naranja", es: "Gris oscuro y naranja", en: "Charcoal & orange", colores: ["#2B2B2B", "#F26B1D", "#E9E6E1"] },
    { id: "verdes", es: "Verdes", en: "Greens", colores: ["#1E5631", "#7CB342", "#F1F3EE"] },
    { id: "azules", es: "Azules", en: "Blues", colores: ["#0D47A1", "#42A5F5", "#FFFFFF"] },
    { id: "negro-dorado", es: "Negro y dorado", en: "Black & gold", colores: ["#111111", "#C9A227", "#F7F3E8"] },
    { id: "rojo-negro", es: "Rojo y negro", en: "Red & black", colores: ["#B71C1C", "#111111", "#EDEDED"] },
    { id: "turquesa-coral", es: "Turquesa y coral", en: "Teal & coral", colores: ["#00796B", "#FF7F50", "#FFF4E0"] }
  ];

  window.BRIEF_PREGUNTAS = {
    version: 1,
    pasos: [
      {
        id: "negocio",
        titulo: { es: "Tu negocio", en: "Your business" },
        intro: { es: "Lo básico para entender qué hacen y para quién.", en: "The basics: what you do and who it's for." },
        preguntas: [
          { id: "nombre", tipo: "texto", req: true,
            label: { es: "Nombre tal como debe aparecer en el logo", en: "Name exactly as it should appear in the logo" } },
          { id: "eslogan", tipo: "texto",
            label: { es: "¿Una frase o eslogan que acompañe al nombre?", en: "A tagline to go with the name?" },
            ayuda: { es: "Opcional. Por ejemplo: «Mudanzas y retiros»", en: "Optional. For example: “Moving & junk removal”" } },
          { id: "historia_nombre", tipo: "texto",
            label: { es: "¿Hay una historia detrás del nombre?", en: "Is there a story behind the name?" } },
          { id: "servicios", tipo: "area",
            label: { es: "¿Qué servicios ofrecen?", en: "What services do you offer?" } },
          { id: "clientes", tipo: "chips", multiple: true,
            label: { es: "¿Quiénes son sus clientes principales?", en: "Who are your main customers?" },
            opciones: [
              { id: "familias", es: "Familias y casas", en: "Homeowners & families" },
              { id: "empresas", es: "Empresas y oficinas", en: "Businesses & offices" },
              { id: "constructoras", es: "Constructoras y contratistas", en: "Builders & contractors" },
              { id: "inmobiliarias", es: "Inmobiliarias y administradores", en: "Realtors & property managers" },
              { id: "comercios", es: "Tiendas y comercios", en: "Stores & retailers" }
            ] },
          { id: "zona", tipo: "texto",
            label: { es: "¿En qué zona trabajan?", en: "What area do you serve?" } },
          { id: "diferencia", tipo: "area",
            label: { es: "En una frase, ¿por qué los eligen a ustedes y no a otros?", en: "In one sentence, why do customers pick you over others?" },
            ayuda: { es: "Puntualidad, precio, trato, rapidez… lo que más les dicen.", en: "On time, price, friendly, fast… what people tell you most." } },
          { id: "usos", tipo: "chips", multiple: true,
            label: { es: "¿Dónde van a usar el logo?", en: "Where will you use the logo?" },
            opciones: [
              { id: "vehiculo", es: "Camión o remolque", en: "Truck or trailer" },
              { id: "ropa", es: "Camisetas, gorras, uniformes", en: "Shirts, hats, uniforms" },
              { id: "redes", es: "Redes sociales", en: "Social media" },
              { id: "web", es: "Página web / Google", en: "Website / Google" },
              { id: "tarjetas", es: "Tarjetas de presentación", en: "Business cards" },
              { id: "letreros", es: "Letreros y carteles", en: "Signs & yard signs" },
              { id: "documentos", es: "Facturas y cotizaciones", en: "Invoices & quotes" }
            ] }
        ]
      },
      {
        id: "personalidad",
        titulo: { es: "Personalidad", en: "Personality" },
        intro: { es: "Si la marca fuera una persona, ¿cómo sería? Toca el punto que más se acerque. El centro es «ni lo uno ni lo otro».", en: "If the brand were a person, what would it be like? Tap the closest dot. The middle means “neither”." },
        preguntas: [
          { id: "clasico_moderno", tipo: "escala", izq: { es: "Clásico", en: "Classic" }, der: { es: "Moderno", en: "Modern" } },
          { id: "serio_cercano", tipo: "escala", izq: { es: "Serio", en: "Serious" }, der: { es: "Cercano", en: "Friendly" } },
          { id: "rudo_prolijo", tipo: "escala", izq: { es: "Rudo y fuerte", en: "Rugged & tough" }, der: { es: "Limpio y prolijo", en: "Clean & polished" } },
          { id: "local_grande", tipo: "escala", izq: { es: "Negocio familiar", en: "Family business" }, der: { es: "Gran empresa", en: "Big company" } },
          { id: "sobrio_llamativo", tipo: "escala", izq: { es: "Sobrio", en: "Low-key" }, der: { es: "Llamativo", en: "Eye-catching" } },
          { id: "simple_detallado", tipo: "escala", izq: { es: "Muy simple", en: "Very simple" }, der: { es: "Con detalle", en: "Detailed" } }
        ]
      },
      {
        id: "estilo",
        titulo: { es: "Estilo", en: "Style" },
        intro: { es: "Son ejemplos con su nombre, no propuestas. Fíjate solo en el estilo: los colores vienen después.", en: "These are samples with your name, not proposals. Look only at the style: colors come next." },
        preguntas: [
          { id: "estilos", tipo: "vibras", opciones: vibras,
            label: { es: "Marca los que te gustan y los que no", en: "Mark the ones you like and the ones you don't" } },
          { id: "simbolo", tipo: "simbolos", max: 2, opciones: simbolos,
            label: { es: "¿Qué debería llevar el logo? Elige hasta 2", en: "What should the logo include? Pick up to 2" } }
        ]
      },
      {
        id: "color",
        titulo: { es: "Colores", en: "Colors" },
        intro: { es: "Elige hasta 2 combinaciones que te gusten para la marca.", en: "Pick up to 2 combinations you like for the brand." },
        preguntas: [
          { id: "paletas", tipo: "paletas", max: 2, opciones: paletas,
            label: { es: "Combinaciones", en: "Combinations" },
            libre: { id: "sin-preferencia", es: "No tengo preferencia, que el diseñador proponga", en: "No preference, let the designer suggest" } },
          { id: "colores_existentes", tipo: "texto",
            label: { es: "¿Ya tienen colores que haya que respetar?", en: "Any colors you already use and want to keep?" },
            ayuda: { es: "Por ejemplo, el color del camión o de los uniformes.", en: "For example, the truck or uniform color." } },
          { id: "colores_evitar", tipo: "texto",
            label: { es: "¿Algún color que NO quieran?", en: "Any color you do NOT want?" } }
        ]
      },
      {
        id: "cierre",
        titulo: { es: "Referencias y contacto", en: "References & contact" },
        intro: { es: "Lo último. Si tienes fotos o capturas de logos que te gusten, mándalas por WhatsApp junto con tus respuestas.", en: "Last step. If you have photos or screenshots of logos you like, send them on WhatsApp with your answers." },
        preguntas: [
          { id: "referencias", tipo: "area",
            label: { es: "Logos o marcas que te gusten (de cualquier rubro) y por qué", en: "Logos or brands you like (any industry) and why" } },
          { id: "competencia", tipo: "area",
            label: { es: "¿Competidores o logos a los que NO quieren parecerse?", en: "Competitors or logos you do NOT want to look like?" } },
          { id: "evitar", tipo: "texto",
            label: { es: "¿Algo que no debería llevar el logo?", en: "Anything the logo should NOT have?" } },
          { id: "plazo", tipo: "chips", multiple: false,
            label: { es: "¿Para cuándo lo necesitan?", en: "When do you need it?" },
            opciones: [
              { id: "urgente", es: "Lo antes posible", en: "As soon as possible" },
              { id: "2-3-semanas", es: "En 2 o 3 semanas", en: "In 2–3 weeks" },
              { id: "sin-apuro", es: "Sin apuro", en: "No rush" }
            ] },
          { id: "notas", tipo: "area",
            label: { es: "¿Algo más que debamos saber?", en: "Anything else we should know?" } },
          { id: "contacto_nombre", tipo: "texto", req: true, autocompletar: "name",
            label: { es: "Tu nombre", en: "Your name" } },
          { id: "contacto_medio", tipo: "texto", autocompletar: "tel",
            label: { es: "Tu WhatsApp o correo", en: "Your WhatsApp or email" } }
        ]
      }
    ]
  };
})();
