const palabras = [
  "gato", "perro", "pájaro", "elefante", "tigre", "ballena", "mariposa", "tortuga", 
  "conejo", "rana", "pulpo", "ardilla", "jirafa", "cocodrilo", "pingüino", "delfín", 
  "serpiente", "hámster", "mosquito", "fideos", "television", "computadora", "reggaeton", 
  "Daniel", "electrónica", "facebook", "whatsapp", "instagram", "tiktok", "milanesa", 
  "presidente", "películas", "fantasma", "tecnología", "yandy"
]

const intentosMaximos = 6;
const gam = new Map();

function elegirPalabraAleatoria() {
  return palabras[Math.floor(Math.random() * palabras.length)];
}

function ocultarPalabra(palabra, letrasAdivinadas) {
  return palabra.split("").map(l => letrasAdivinadas.includes(l) ? l : "_").join(" ");
}

function mostrarAhorcado(intentos) {
  const dibujo = [
    " ⛓️  ____",
    " ⛓️  |  |",
    intentos < 6 ? " ⛓️  |  🐻" : " ⛓️  |",
    intentos < 5 ? " ⛓️  |  /" : intentos < 4 ? " ⛓️  |  / 🔧" : intentos < 3 ? " ⛓️  |  / 🔧 \\" : " ⛓️  |",
    intentos < 2 ? " ⛓️ _|_" : " ⛓️  |"
  ];
  return dibujo.slice(0, intentosMaximos - intentos).join("\n");
}

function juegoTerminado(sender, mensaje, palabra, letrasAdivinadas, intentos) {
  if (intentos === 0) {
    gam.delete(sender);
    return `🔴 *PROCESO FALLIDO*\nLa palabra era: "${palabra}".\n\n${mostrarAhorcado(intentos)}\n\n— Vigilancia finalizada por *FNaF LATAM™*`;
  } else if (!mensaje.includes("_")) {
    let expGanada = palabra.length >= 8 
      ? Math.floor(Math.random() * 3500) 
      : Math.floor(Math.random() * 300);
    global.db.data.users[sender].exp += expGanada;
    gam.delete(sender);
    return `✅ *PROCESO EXITOSO*\nPalabra decodificada: "${palabra}".\n\n📡 Recompensa entregada: ${expGanada} XP\n\n— Registro autenticado por *FNaF LATAM™*`;
  } else {
    return `🎥 *SISTEMA DE AHORCADO — MÓDULO DE MONITOREO*\n\n${mostrarAhorcado(intentos)}\n\n🔠 Estado actual: ${mensaje}`;
  }
}

let handler = async (m, { conn }) => {
  if (gam.has(m.sender)) {
    return conn.reply(m.chat, `⚠️ Ya tienes una simulación en proceso.\nFinaliza antes de iniciar una nueva.`, m);
  }
  let palabra = elegirPalabraAleatoria();
  let letrasAdivinadas = [];
  let intentos = intentosMaximos;
  let mensaje = ocultarPalabra(palabra, letrasAdivinadas);
  gam.set(m.sender, { palabra, letrasAdivinadas, intentos });
  let text = `👁 *INICIANDO SIMULACIÓN AHORCADO - FNaF LATAM™*\n\n🔐 Palabra: ${mensaje}\n📍 Intentos disponibles: ${intentos}`;
  conn.reply(m.chat, text, m);
};

handler.before = async (m, { conn }) => {
  const juego = gam.get(m.sender);
  if (!juego) return;

  const { palabra, letrasAdivinadas } = juego;
  let intentos = juego.intentos;

  if (m.text.length === 1 && /^[a-zA-Z]$/.test(m.text)) {
    let letra = m.text.toLowerCase();
    if (!letrasAdivinadas.includes(letra)) {
      letrasAdivinadas.push(letra);
      if (!palabra.includes(letra)) {
        intentos--;
      }
    }

    let mensaje = ocultarPalabra(palabra, letrasAdivinadas);
    let respuesta = juegoTerminado(m.sender, mensaje, palabra, letrasAdivinadas, intentos);

    if (/PROCESO (FALLIDO|EXITOSO)/.test(respuesta)) {
      conn.reply(m.chat, respuesta, m);
    } else {
      gam.set(m.sender, { palabra, letrasAdivinadas, intentos });
      conn.reply(m.chat, `${respuesta}\n\n📍 Intentos restantes: ${intentos}`, m);
    }

    if (intentos === 0 || !mensaje.includes("_")) gam.delete(m.sender);
  } else {
    let mensaje = ocultarPalabra(palabra, letrasAdivinadas);
    let respuesta = juegoTerminado(m.sender, mensaje, palabra, letrasAdivinadas, intentos);
    conn.reply(m.chat, respuesta, m);
    gam.delete(m.sender);
  }
};

handler.help = ['ahorcado'];
handler.tags = ['game'];
handler.command = ['ahorcado'];
handler.group = true;
handler.register = true;

export default handler;
