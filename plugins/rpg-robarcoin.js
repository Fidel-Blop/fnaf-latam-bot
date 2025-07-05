const ro = 30;

// Escenarios narrativos FNaF LATAM™
const textosExito = [
  `🎭 Unidad infiltrada con éxito. Se sustrajeron *{{cantidad}}* {{moneda}} de @{{user}}. — Sistema respaldado por FNaF LATAM™`,
  `💀 Hackeo exitoso del inventario de @{{user}}. Recursos obtenidos: *{{cantidad}}* {{moneda}}.`,
  `🛠️ Conducto de ventilación forzado... objeto robado: *{{cantidad}}* {{moneda}}. Objetivo: @{{user}}`,
  `🔓 Se vulneró el protocolo de seguridad de @{{user}}. Se extrajeron *{{cantidad}}* {{moneda}}.`,
  `📡 Monitoreo alterado. El bot no detectó la intrusión... pero tú sí lo lograste. +*{{cantidad}}* {{moneda}}`,
  `⚠️ Transmisión interceptada... Extracción completada: *{{cantidad}}* {{moneda}} robados de @{{user}}`,
  `⛓️ Revisión de casillero completada. Objetivo: @{{user}}. Botín: *{{cantidad}}* {{moneda}}.`,
  `🔧 Animatrónico en mantenimiento... ¡aprovechaste el descuido! +*{{cantidad}}* {{moneda}}`,
  `🧤 Base de datos desprotegida brevemente. Acceso explotado. Se robó: *{{cantidad}}* {{moneda}}.`,
  `🔓 Cerradura física comprometida. @{{user}} ha sido víctima de un robo: *{{cantidad}}* {{moneda}}.`
];

const textosFallo = [
  `❌ Misión abortada: el objetivo @{{user}} no posee suficientes {{moneda}}. — Sistema respaldado por FNaF LATAM™`,
  `⚠️ Alarma activada... pero no había nada que robar. Objetivo seco: @{{user}}`,
  `🧼 Revisión completada. Resultados: inventario vacío. Sin botín.`,
  `📉 El objetivo @{{user}} apenas sobrevive. Robo cancelado.`,
  `🪫 Energía malgastada en una incursión fallida. @{{user}} está en quiebra.`,
  `📛 Escaneo completo. Resultado: sin activos robables.`,
  `🪙 Error de transferencia: fondos insuficientes para ejecutar la sustracción.`,
  `⚰️ El animatrónico objetivo @{{user}} ya había sido saqueado.`,
  `👁️ Unidad objetivo no contiene elementos valiosos. Evita riesgos innecesarios.`,
  `🧾 Registro contable indica saldo: 0. Robo innecesario.`,
  `⏱️ Fallaste el reto 50/20 por 5 segundos... El daño emocional fue devastador. Perdiste *{{cantidad}}* {{moneda}}.`,
  `🔪 Fred te eliminó sin piedad tras fallar. Has perdido *{{cantidad}}* {{moneda}}.`,
  `⚙️ El traje Springlock falló y pagaste el precio... *{{cantidad}}* {{moneda}} deducidos.`
];

const textosSinObjetivo = [
  `🔍 *Falta de objetivo identificado*

Debes mencionar a un usuario para intentar ejecutar el robo.

📌 Ejemplo: *#robar @usuario*

— Sistema respaldado por FNaF LATAM™`
];

// Función pickRandom
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

const handler = async (m, { conn, usedPrefix, command }) => {
  const userData = global.db.data.users[m.sender];
  const tiempoEspera = 2 * 60 * 60 * 1000; // 2 horas
  const tiempoRestante = userData.lastrob2 + tiempoEspera - Date.now();

  if (Date.now() < userData.lastrob2 + tiempoEspera) {
    return conn.reply(m.chat, `🚨 *Acceso Denegado*

⚠️ Protocolo de seguridad activado.

⏱️ Espera *${msToTime(tiempoRestante)}* para volver a ejecutar el comando *#robar*.

— Sistema respaldado por FNaF LATAM™`, m);
  }

  let objetivo;
  if (m.isGroup) {
    objetivo = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
  } else {
    objetivo = m.chat;
  }

  if (!objetivo) {
    return conn.reply(m.chat, textosSinObjetivo[0], m);
  }

  if (!(objetivo in global.db.data.users)) {
    return conn.reply(m.chat, `📉 El objetivo seleccionado no está registrado en la base de datos FazbearNet™.`, m);
  }

  const objetivoData = global.db.data.users[objetivo];
  const cantidadRobada = Math.floor(Math.random() * ro);
  const moneda = global.moneda || '¥enes';
  const objetivoTag = objetivo.split('@')[0];

  if (objetivoData.coin < cantidadRobada) {
    const mensajeFallo = pickRandom(textosFallo)
      .replace(/{{cantidad}}/g, cantidadRobada)
      .replace(/{{moneda}}/g, moneda)
      .replace(/{{user}}/g, objetivoTag);

    return conn.reply(m.chat, mensajeFallo, m, { mentions: [objetivo] });
  }

  userData.coin += cantidadRobada;
  objetivoData.coin -= cantidadRobada;
  userData.lastrob2 = Date.now();

  const mensajeExito = pickRandom(textosExito)
    .replace(/{{cantidad}}/g, cantidadRobada)
    .replace(/{{moneda}}/g, moneda)
    .replace(/{{user}}/g, objetivoTag);

  conn.reply(m.chat, mensajeExito, m, { mentions: [objetivo, m.sender] });
};

handler.help = ['robar'];
handler.tags = ['rpg'];
handler.command = ['robar', 'steal', 'rob'];
handler.group = true;
handler.register = true;

export default handler;

function msToTime(duration) {
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;
  return `${hours} hora(s) ${minutes} minuto(s)`;
}
