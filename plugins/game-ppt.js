const handler = async (m, { conn, text, command, usedPrefix, args }) => {
  const tiempoDeEspera = 10000;
  const tiempoRestante = global.db.data.users[m.sender].wait + tiempoDeEspera;

  if (new Date - global.db.data.users[m.sender].wait < tiempoDeEspera) {
    throw `⚠️ *SIMULACIÓN BLOQUEADA*\n\n⏱️ Tiempo restante: ${Math.floor((tiempoRestante - new Date()) / 1000)} segundos\n\n🎮 Reinicio en curso...`;
  }

  if (!args[0]) {
    return conn.reply(
      m.chat,
      `🎮 *SISTEMA DE COMBATE: REACCIÓN INSTANTÁNEA*\n\n🔘 Opciones disponibles:\n— ${usedPrefix + command} piedra 🪨\n— ${usedPrefix + command} papel 📄\n— ${usedPrefix + command} tijera ✂️\n\n⚙️ *Selección requerida para continuar...*`,
      m
    );
  }

  const opciones = ['piedra', 'papel', 'tijera'];
  let astro = opciones[Math.floor(Math.random() * opciones.length)];
  const jugador = text.toLowerCase();
  const userData = global.db.data.users[m.sender];

  const respuesta = (estado, emoji, ganancia) => `
📡 *SISTEMA DE RESPUESTA FNaF LATAM™*

🧠 *Resultado:* ${estado}
👁 *Tu selección:* ${jugador}
👁 *IA seleccionó:* ${astro}
🎁 *Experiencia:* ${ganancia} XP

🪪 Archivo registrado — FNaF LATAM™`.trim();

  let resultado = '';
  let ganancia = 0;

  if (jugador === astro) {
    resultado = 'EMPATE ⚠️';
    ganancia = 500;
  } else if (
    (jugador === 'piedra' && astro === 'tijera') ||
    (jugador === 'papel' && astro === 'piedra') ||
    (jugador === 'tijera' && astro === 'papel')
  ) {
    resultado = '¡VICTORIA ALCANZADA! ✅';
    ganancia = 1000;
  } else if (opciones.includes(jugador)) {
    resultado = '¡DERROTA CONFIRMADA! ❌';
    ganancia = -300;
  } else {
    return conn.reply(m.chat, `❗ *ERROR DE ENTRADA*\n🔒 Solo se permiten: piedra, papel o tijera.`, m);
  }

  userData.exp += ganancia;
  userData.wait = new Date() * 1;

  return conn.reply(m.chat, respuesta(resultado, '', ganancia), m);
};

handler.help = ['ppt'];
handler.tags = ['games'];
handler.command = ['ppt'];
handler.group = true;
handler.register = true;

export default handler;
