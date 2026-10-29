/*
 * Preguntas del brief de marca (apalmo studio).
 * Todo el cuestionario vive aquí: para cambiar una pregunta, edita este archivo.
 * Los textos van en español (es) e inglés (en). Los "id" son los que salen en el JSON.
 * Un cliente puede reemplazar cualquier pregunta desde clientes.js (campo "preguntas").
 */
(function () {
  "use strict";

  // Logos de marcas conocidas, usados solo como referencia de estilo (img/logos/).
  var LOGOS = {
    "coca-cola": { archivo: "coca-cola.svg", nombre: "Coca-Cola" },
    fedex: { archivo: "fedex.svg", nombre: "FedEx" },
    google: { archivo: "google.svg", nombre: "Google" },
    mcdonalds: { archivo: "mcdonalds.svg", nombre: "McDonald's" },
    hp: { archivo: "hp.svg", nombre: "HP" },
    volkswagen: { archivo: "volkswagen.svg", nombre: "Volkswagen" },
    adidas: { archivo: "adidas.svg", nombre: "Adidas" },
    "under-armour": { archivo: "under-armour.svg", nombre: "Under Armour" },
    "mercedes-benz": { archivo: "mercedes-benz.png", nombre: "Mercedes-Benz" },
    apple: { archivo: "apple.svg", nombre: "Apple" },
    nike: { archivo: "nike.svg", nombre: "Nike" },
    shell: { archivo: "shell.svg", nombre: "Shell" },
    "harley-davidson": { archivo: "harley-davidson.svg", nombre: "Harley-Davidson" },
    ups: { archivo: "ups.svg", nombre: "UPS" },
    ford: { archivo: "ford.svg", nombre: "Ford" },
    wendys: { archivo: "wendys.svg", nombre: "Wendy's" },
    mack: { archivo: "mack.svg", nombre: "Mack Trucks" },
    starbucks: { archivo: "starbucks.svg", nombre: "Starbucks" },
    target: { archivo: "target.svg", nombre: "Target" },
    spotify: { archivo: "spotify.svg", nombre: "Spotify" },
    mastercard: { archivo: "mastercard.svg", nombre: "Mastercard" },
    "jack-daniels": { archivo: "jack-daniels.svg", nombre: "Jack Daniel's" },
    texaco: { archivo: "texaco.svg", nombre: "Texaco" },
    caterpillar: { archivo: "caterpillar.svg", nombre: "Caterpillar" },
    jeep: { archivo: "jeep.svg", nombre: "Jeep" },
    dewalt: { archivo: "dewalt.svg", nombre: "DeWalt" },
    amazon: { archivo: "amazon.svg", nombre: "Amazon" },
    lego: { archivo: "lego.svg", nombre: "LEGO" },
    duolingo: { archivo: "duolingo.svg", nombre: "Duolingo" },
    rolex: { archivo: "rolex.png", nombre: "Rolex" },
    chanel: { archivo: "chanel.svg", nombre: "Chanel" },
    gatorade: { archivo: "gatorade.svg", nombre: "Gatorade" },
    dominos: { archivo: "dominos.svg", nombre: "Domino's" },
    "burger-king": { archivo: "burger-king.svg", nombre: "Burger King" },
    "ben-jerrys": { archivo: "ben-jerrys.svg", nombre: "Ben & Jerry's" },
    pepsi: { archivo: "pepsi.svg", nombre: "Pepsi" }
  };

  // Íconos de trazo para las opciones sin logos (viewBox 0 0 48 48).
  var ICONOS = {
    casa: '<path d="M8 22 24 9l16 13"/><path d="M12 19v19h24V19"/><path d="M24 33c-4-3-6-5-6-7.5a3 3 0 0 1 6-1 3 3 0 0 1 6 1c0 2.5-2 4.5-6 7.5Z"/>',
    crecer: '<path d="M8 38h32"/><path d="M12 38V28M20 38V22M28 38V16M36 38V10"/><path d="m30 9 6-2 2 6"/>',
    mapa: '<path d="M24 41s11-10 11-19a11 11 0 0 0-22 0c0 9 11 19 11 19Z"/><circle cx="24" cy="22" r="4"/><path d="M6 42h8M34 42h8"/>',
    marca: '<path d="m24 7 4.9 10 11.1 1.6-8 7.8 1.9 11L24 32.2l-9.9 5.2 1.9-11-8-7.8L19.1 17Z"/>'
  };

  window.BRIEF_LOGOS = LOGOS;
  window.BRIEF_ICONOS = ICONOS;

  window.BRIEF_PREGUNTAS = {
    version: 2,
    pasos: [
      {
        id: "negocio",
        titulo: { es: "Lo que ofrecen", en: "What you offer" },
        intro: { es: "Empecemos por lo concreto: qué hacen, para quién y por qué los prefieren.", en: "Let's start with the basics: what you do, who for, and why people pick you." },
        preguntas: [
          { id: "nombre", tipo: "texto", req: true,
            label: { es: "Nombre de la marca", en: "Brand name" },
            ayuda: { es: "Tal como debería leerse en el logo.", en: "Exactly as it should read in the logo." } },
          { id: "servicios", tipo: "area",
            label: { es: "¿Qué servicios ofrecen o van a ofrecer?", en: "What services do you offer, or plan to offer?" } },
          { id: "clientes", tipo: "chips", multiple: true,
            label: { es: "¿Para quién trabajan?", en: "Who do you work for?" },
            opciones: [
              { id: "familias", es: "Familias y casas", en: "Homeowners & families" },
              { id: "empresas", es: "Empresas y oficinas", en: "Businesses & offices" },
              { id: "constructoras", es: "Constructoras y contratistas", en: "Builders & contractors" },
              { id: "inmobiliarias", es: "Inmobiliarias y administradores", en: "Realtors & property managers" },
              { id: "comercios", es: "Tiendas y comercios", en: "Stores & retailers" }
            ] },
          { id: "diferencia", tipo: "area",
            label: { es: "¿Por qué los eligen a ustedes y no a otros?", en: "Why do customers pick you over others?" },
            ayuda: { es: "Lo que más les dicen sus clientes: puntualidad, trato, precio, cuidado…", en: "What customers tell you most: on time, friendly, fair price, careful…" } },
          { id: "historia_nombre", tipo: "texto",
            label: { es: "¿Hay una historia detrás del nombre?", en: "Is there a story behind the name?" } }
        ]
      },
      {
        id: "futuro",
        titulo: { es: "Hacia dónde van", en: "Where you're headed" },
        intro: { es: "El logo tiene que acompañarlos varios años. Piensen en la marca que quieren ser, no solo en la de hoy.", en: "The logo should last for years. Think about the brand you want to become, not just today's." },
        preguntas: [
          { id: "vision", tipo: "tarjetas", max: 1,
            label: { es: "¿Cómo se imaginan en 5 años?", en: "Where do you see yourselves in 5 years?" },
            opciones: [
              { id: "familiar", icono: "casa", es: "Un negocio familiar, con clientes fieles", en: "A family business with loyal customers" },
              { id: "crecer", icono: "crecer", es: "Crecer: más equipo y más clientes", en: "Grow: bigger team, more customers" },
              { id: "expandir", icono: "mapa", es: "Presentes en otras ciudades", en: "Operating in other cities" },
              { id: "gran-marca", icono: "marca", es: "Una marca grande y reconocida", en: "A big, well-known brand" }
            ] },
          { id: "nuevos_servicios", tipo: "texto",
            label: { es: "¿Algo que quieran sumar más adelante?", en: "Anything you'd like to add later on?" },
            ayuda: { es: "Servicios, zonas, tipos de cliente…", en: "Services, areas, kinds of customers…" } },
          { id: "frase_cliente", tipo: "area",
            label: { es: "¿Qué les gustaría que dijera un cliente después de contratarlos?", en: "What would you love a customer to say after hiring you?" },
            ayuda: { es: "Por ejemplo: «Llegaron a la hora y dejaron todo impecable».", en: "For example: “They showed up on time and left everything spotless.”" } }
        ]
      },
      {
        id: "sensacion",
        titulo: { es: "Cómo se debe sentir", en: "How it should feel" },
        intro: { es: "La primera impresión que debería dejar la marca, antes de que alguien lea una palabra.", en: "The first impression the brand should leave, before anyone reads a word." },
        preguntas: [
          { id: "sensaciones", tipo: "chips", multiple: true, max: 3,
            label: { es: "Al ver la marca, el cliente debería sentir… (elige hasta 3)", en: "When customers see the brand they should feel… (pick up to 3)" },
            opciones: [
              { id: "confianza", es: "Confianza", en: "Trust" },
              { id: "rapidez", es: "Rapidez", en: "Speed" },
              { id: "fuerza", es: "Fuerza", en: "Strength" },
              { id: "cercania", es: "Cercanía", en: "Warmth" },
              { id: "profesionalismo", es: "Profesionalismo", en: "Professionalism" },
              { id: "tranquilidad", es: "Tranquilidad", en: "Peace of mind" },
              { id: "orden", es: "Orden y limpieza", en: "Clean & tidy" },
              { id: "precio-justo", es: "Precio justo", en: "Fair price" },
              { id: "energia", es: "Energía", en: "Energy" },
              { id: "orgullo-local", es: "Orgullo local", en: "Local pride" },
              { id: "premium", es: "Calidad premium", en: "Premium quality" },
              { id: "diversion", es: "Buena onda", en: "Fun" }
            ] },
          { id: "clasico_moderno", tipo: "escala", izq: { es: "Clásico", en: "Classic" }, der: { es: "Moderno", en: "Modern" } },
          { id: "serio_cercano", tipo: "escala", izq: { es: "Serio", en: "Serious" }, der: { es: "Cercano", en: "Friendly" } },
          { id: "rudo_prolijo", tipo: "escala", izq: { es: "Rudo y fuerte", en: "Rugged & tough" }, der: { es: "Limpio y prolijo", en: "Clean & polished" } },
          { id: "sobrio_llamativo", tipo: "escala", izq: { es: "Sobrio", en: "Low-key" }, der: { es: "Llamativo", en: "Eye-catching" } }
        ]
      },
      {
        id: "estilo",
        titulo: { es: "Estilo gráfico", en: "Graphic style" },
        intro: { es: "Usamos logos muy conocidos como ejemplo. No se fijen en la marca ni en el rubro: fíjense en el estilo.", en: "We use famous logos as examples. Ignore the brand and the industry: look at the style." },
        preguntas: [
          { id: "tipo", tipo: "tarjetas", max: 2,
            label: { es: "¿Qué tipo de logo les atrae? Elige hasta 2", en: "What kind of logo appeals to you? Pick up to 2" },
            opciones: [
              { id: "solo-nombre", logos: ["coca-cola", "fedex", "google"], es: "Solo el nombre", en: "Just the name",
                desc: { es: "La tipografía es el logo.", en: "The lettering is the logo." } },
              { id: "iniciales", logos: ["mcdonalds", "hp", "volkswagen"], es: "Iniciales", en: "Initials",
                desc: { es: "Una o dos letras que se recuerdan.", en: "One or two memorable letters." } },
              { id: "simbolo-y-nombre", logos: ["adidas", "under-armour", "mercedes-benz"], es: "Símbolo + nombre", en: "Symbol + name",
                desc: { es: "Un dibujo simple junto al nombre.", en: "A simple mark next to the name." } },
              { id: "simbolo", logos: ["apple", "nike", "shell"], es: "Solo un símbolo", en: "Just a symbol",
                desc: { es: "Un ícono que funciona sin palabras.", en: "An icon that works without words." } },
              { id: "emblema", logos: ["harley-davidson", "ups", "ford"], es: "Emblema o escudo", en: "Badge or shield",
                desc: { es: "Todo dentro de una forma, como un sello.", en: "Everything inside a shape, like a seal." } },
              { id: "personaje", logos: ["mack", "wendys", "starbucks"], es: "Personaje o ilustración", en: "Character or illustration",
                desc: { es: "Una figura con personalidad propia.", en: "A figure with its own personality." } }
            ] },
          { id: "esteticas", tipo: "tarjetas", valorar: true,
            label: { es: "¿Qué estilos les gustan y cuáles no?", en: "Which styles do you like, and which not?" },
            ayuda: { es: "Marca todos los que quieras. Si alguno no te dice nada, déjalo sin marcar.", en: "Mark as many as you want. Leave unmarked any that feel neutral." },
            opciones: [
              { id: "minimal", logos: ["target", "spotify", "mastercard"], es: "Minimal y moderno", en: "Minimal & modern" },
              { id: "clasico-americano", logos: ["jack-daniels", "texaco", "ford"], es: "Clásico americano", en: "Classic American" },
              { id: "industrial", logos: ["caterpillar", "jeep", "dewalt"], es: "Fuerte e industrial", en: "Bold & industrial" },
              { id: "amigable", logos: ["amazon", "lego", "duolingo"], es: "Amigable y divertido", en: "Friendly & fun" },
              { id: "premium", logos: ["rolex", "chanel", "mercedes-benz"], es: "Elegante y premium", en: "Elegant & premium" },
              { id: "dinamico", logos: ["nike", "gatorade", "under-armour"], es: "Dinámico y deportivo", en: "Dynamic & sporty" }
            ] },
          { id: "detalle", tipo: "tarjetas", max: 1,
            label: { es: "¿Qué tan simple o elaborado?", en: "How simple or detailed?" },
            opciones: [
              { id: "simple", logos: ["apple", "target"], es: "Muy simple", en: "Very simple",
                desc: { es: "Pocas formas, se reconoce al instante.", en: "Few shapes, instantly recognizable." } },
              { id: "equilibrado", logos: ["dominos", "burger-king"], es: "Equilibrado", en: "Balanced",
                desc: { es: "Algo de detalle, sin recargar.", en: "Some detail, not busy." } },
              { id: "ilustrado", logos: ["jack-daniels", "starbucks"], es: "Con ilustración y detalle", en: "Illustrated & detailed",
                desc: { es: "Más dibujo, más historia.", en: "More drawing, more story." } }
            ] }
        ]
      },
      {
        id: "color",
        titulo: { es: "Colores", en: "Colors" },
        intro: { es: "Cada color comunica algo distinto. Elijan los que sientan más suyos.", en: "Each color says something different. Pick the ones that feel most like you." },
        preguntas: [
          { id: "paletas", tipo: "paletas", max: 2,
            label: { es: "Elige hasta 2 combinaciones", en: "Pick up to 2 combinations" },
            libre: { id: "sin-preferencia", es: "No tengo preferencia, que el diseñador proponga", en: "No preference, let the designer suggest" },
            opciones: [
              { id: "azul-confianza", colores: ["#0B2A5B", "#1F6FD1", "#E9F0FA"], logos: ["ford", "volkswagen"],
                es: "Azul confianza", en: "Trust blue", desc: { es: "Serio, seguro, estable", en: "Serious, safe, steady" } },
              { id: "rojo-energia", colores: ["#C8102E", "#1A1A1A", "#F6F3EE"], logos: ["coca-cola", "target"],
                es: "Rojo energía", en: "Energy red", desc: { es: "Activo, directo, se nota", en: "Active, direct, stands out" } },
              { id: "amarillo-fuerza", colores: ["#F2B705", "#161616", "#8A8D91"], logos: ["caterpillar", "dewalt"],
                es: "Amarillo y negro", en: "Yellow & black", desc: { es: "Fuerza, maquinaria, trabajo", en: "Strength, machinery, work" } },
              { id: "naranja-cercano", colores: ["#F26B1D", "#2B2B2B", "#F1ECE4"], logos: [],
                es: "Naranja y grafito", en: "Orange & charcoal", desc: { es: "Cercano, enérgico, visible", en: "Warm, energetic, visible" } },
              { id: "verde-natural", colores: ["#1E5631", "#6FA83A", "#EEF2E8"], logos: ["starbucks", "spotify"],
                es: "Verde natural", en: "Natural green", desc: { es: "Limpio, responsable, eco", en: "Clean, responsible, eco" } },
              { id: "cafe-tradicion", colores: ["#4A2A12", "#F2B21B", "#F4EDE1"], logos: ["ups"],
                es: "Café y dorado", en: "Brown & gold", desc: { es: "Tradición, solidez, oficio", en: "Tradition, solid, craft" } },
              { id: "negro-premium", colores: ["#111111", "#C9A227", "#F7F3E8"], logos: ["chanel", "rolex"],
                es: "Negro y dorado", en: "Black & gold", desc: { es: "Exclusivo, elegante", en: "Exclusive, elegant" } },
              { id: "azul-rojo", colores: ["#14254A", "#D0202E", "#F5F5F2"], logos: ["pepsi", "dominos"],
                es: "Azul marino y rojo", en: "Navy & red", desc: { es: "Americano, clásico, firme", en: "American, classic, firm" } },
              { id: "turquesa-coral", colores: ["#00796B", "#FF7F50", "#FFF4E0"], logos: [],
                es: "Turquesa y coral", en: "Teal & coral", desc: { es: "Fresco, costero, alegre", en: "Fresh, coastal, upbeat" } }
            ] },
          { id: "colores_existentes", tipo: "texto",
            label: { es: "¿Ya usan colores que haya que respetar?", en: "Any colors you already use and want to keep?" },
            ayuda: { es: "El color del camión, los uniformes, la fachada…", en: "Truck color, uniforms, storefront…" } },
          { id: "colores_evitar", tipo: "texto",
            label: { es: "¿Algún color que NO quieran?", en: "Any color you do NOT want?" } }
        ]
      },
      {
        id: "cierre",
        titulo: { es: "Para terminar", en: "Last few" },
        intro: { es: "Si tienen fotos o capturas de marcas que les gusten, mándenlas por WhatsApp junto con las respuestas.", en: "If you have photos or screenshots of brands you like, send them on WhatsApp with your answers." },
        preguntas: [
          { id: "usos", tipo: "chips", multiple: true,
            label: { es: "¿Dónde se va a ver más el logo?", en: "Where will the logo be seen most?" },
            opciones: [
              { id: "vehiculo", es: "Camión o vehículo", en: "Truck or vehicle" },
              { id: "ropa", es: "Uniformes y gorras", en: "Uniforms & hats" },
              { id: "redes", es: "Redes sociales", en: "Social media" },
              { id: "web", es: "Página web y Google", en: "Website & Google" },
              { id: "tarjetas", es: "Tarjetas y volantes", en: "Cards & flyers" },
              { id: "letreros", es: "Letreros", en: "Signs" },
              { id: "local", es: "Local u oficina", en: "Shop or office" }
            ] },
          { id: "referencias", tipo: "area",
            label: { es: "¿Alguna marca, de cualquier rubro, cuya imagen les encante? ¿Por qué?", en: "Any brand, from any industry, whose look you love? Why?" } },
          { id: "evitar", tipo: "area",
            label: { es: "¿Competidores o estilos a los que NO quieren parecerse?", en: "Competitors or styles you do NOT want to look like?" } },
          { id: "plazo", tipo: "chips", multiple: false,
            label: { es: "¿Para cuándo lo necesitan?", en: "When do you need it?" },
            opciones: [
              { id: "urgente", es: "Lo antes posible", en: "As soon as possible" },
              { id: "2-3-semanas", es: "En 2 o 3 semanas", en: "In 2–3 weeks" },
              { id: "sin-apuro", es: "Sin apuro", en: "No rush" }
            ] },
          { id: "contacto_nombre", tipo: "texto", req: true, autocompletar: "name",
            label: { es: "Tu nombre", en: "Your name" } },
          { id: "contacto_medio", tipo: "texto", autocompletar: "tel",
            label: { es: "Tu WhatsApp o correo", en: "Your WhatsApp or email" } }
        ]
      }
    ]
  };
})();
