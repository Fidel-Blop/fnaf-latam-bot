const palabras = [
  "gato", "perro", "pájaro", "elefante", "tigre", "ballena", "mariposa", "tortuga",
  "conejo", "rana", "pulpo", "ardilla", "jirafa", "cocodrilo", "pingüino", "delfín",
  "serpiente", "hámster", "mosquito", "abeja", "television", "computadora", "botsito",
  "reggaeton", "economía", "electrónica", "facebook", "WhatsApp", "Instagram", "tiktok",
  "milanesa", "presidente", "bot", "películas", "HFOX", "Criss", "Fideos", "Charisk"
];

const intentosMaximos = 6;
const gam = new Map();

function elegirPalabraAleatoria() {
  return palabras[Math.floor(Math.random() * palabras.length)].toLowerCase();
}

function ocultarPalabra(palabra, letrasAdivinadas) {
  let palabraOculta = "";
  for (const letra of palabra) {
    palabraOculta += letrasAdivinadas.includes(letra) ? letra + " " : "_ ";
  }
  return palabraOculta.trim();
}

function mostrarAhorcado(intentos) {
  const dibujo = [
    " ____",
    " |  |",
    intentos < 6 ? " |  O" : " |",
    intentos < 5 ? " | /" : intentos < 4 ? " | / " : intentos < 3 ? " | / \\" : " |",
    intentos < 2 ? "_|_" : " |"
  ];
  return dibujo.slice(0, intentosMaximos - intentos).join("\n");
}

function juegoTerminado(sender, mensaje, palabra, letrasAdivinadas, intentos) {
  if (intentos === 0) {
    gam.delete(sender);
    return `❌ *¡Perdiste!* La palabra correcta era: *${palabra}*\n\n${mostrarAhorcado(intentos)}`;
  } else if (!mensaje.includes("_")) {
    let expGanada = palabra.length >= 8 ? Math.floor(Math.random() * 3500) : Math.floor(Math.random() * 300);
    global.db.data.users[sender].exp += expGanada;
    gam.delete(sender);
    return `🎉 *¡Que pro Ganaste 🥳!* Adivinaste la palabra: *"${palabra}"*.\n\nHas ganado: *${expGanada} XP*.`;
  } else {
    return `${mostrarAhorcado(intentos)}\n\n${mensaje}`;
  }
}

let handler = async (m, { conn }) => {
  if (gam.has(m.sender)) return conn.reply(m.chat, "❗ Ya tienes un juego en curso. ¡Termínalo o ríndete primero!", m);

  const palabra = elegirPalabraAleatoria();
  const letrasAdivinadas = [];
  const intentos = intentosMaximos;
  const mensaje = ocultarPalabra(palabra, letrasAdivinadas);
  gam.set(m.sender, { palabra, letrasAdivinadas, intentos });

  let texto = `🎮 *AHORCADO - FNaF LATAM Edition* 🎮\n\n🔤 Adivina la palabra:\n\n${mensaje}\n\n📉 Intentos restantes: *${intentos}*\n\n🟡 Escribe una letra por turno (A-Z).`;

  await conn.sendMessage(m.chat, {
    text: texto,
    buttons: [
      { buttonId: '.rendirse', buttonText: { displayText: '😵 Rendirse' }, type: 1 }
    ],
    headerType: 1
  }, { quoted: m });
};

handler.before = async (m, { conn }) => {
  const juego = gam.get(m.sender);
  if (!juego) return;

  let { palabra, letrasAdivinadas, intentos } = juego;
  const textoEntrada = m.text?.toLowerCase().trim();

  // Si el jugador se rinde
  if (/^(\.rendirse|me rindo|rendirse)$/i.test(textoEntrada)) {
    gam.delete(m.sender);
    return conn.reply(m.chat, `💀 *Te rendiste...* La palabra era: *${palabra}*\n¿Será que el miedo te ganó? 🐻`, m);
  }

  // Validación de letra
  if (textoEntrada.length === 1 && /[a-zñ]/i.test(textoEntrada)) {
    if (!letrasAdivinadas.includes(textoEntrada)) {
      letrasAdivinadas.push(textoEntrada);
      if (!palabra.includes(textoEntrada)) intentos--;
    }

    const mensaje = ocultarPalabra(palabra, letrasAdivinadas);
    const resultado = juegoTerminado(m.sender, mensaje, palabra, letrasAdivinadas, intentos);

    if (resultado.includes("¡Perdiste!") || resultado.includes("Ganaste 🥳")) {
      return conn.reply(m.chat, resultado, m);
    } else {
      gam.set(m.sender, { palabra, letrasAdivinadas, intentos });
      return conn.reply(m.chat, `${resultado}\n\n📉 Intentos restantes: *${intentos}*`, m);
    }
  } else {
    return conn.reply(m.chat, `⚠️ Escribe *una sola letra* del abecedario para continuar o usa el botón *Rendirse*.`, m);
  }
};

handler.help = ['ahorcado'];
handler.tags = ['game'];
handler.command = ['ahorcado'];
handler.group = true;
handler.register = true;

export default handler;
