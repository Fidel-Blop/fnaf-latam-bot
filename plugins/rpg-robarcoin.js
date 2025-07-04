const ro = 30;

// Escenarios narrativos FNaF LATAM™
const textosExito = [
  `🎭 Unidad infiltrada con éxito. Se sustrajeron *${'${cantidadRobada}'}* ${global.moneda || '¥enes'} de @${'${objetivo.split`@`[0]}'}. — Sistema respaldado por FNaF LATAM™`,
  `💀 Hackeo exitoso del inventario de @${'${objetivo.split`@`[0]}'}. Recursos obtenidos: *${'${cantidadRobada}'}* ${global.moneda || '¥enes'}.`,
  `🛠️ Conducto de ventilación forzado... objeto robado: *${'${cantidadRobada}'}* ${global.moneda || '¥enes'}. Objetivo: @${'${objetivo.split`@`[0]}'}`,
  `🔓 Se vulneró el protocolo de seguridad de @${'${objetivo.split`@`[0]}'}. Se extrajeron *${'${cantidadRobada}'}* ${global.moneda || '¥enes'}.`,
  `📡 Monitoreo alterado. El bot no detectó la intrusión... pero tú sí lo lograste. +*${'${cantidadRobada}'}* ${global.moneda || '¥enes'}`,
  `⚠️ Transmisión interceptada... Extracción completada: *${'${cantidadRobada}'}* ${global.moneda || '¥enes'} robados de @${'${objetivo.split`@`[0]}'}`,
  `⛓️ Revisión de casillero completada. Objetivo: @${'${objetivo.split`@`[0]}'}. Botín: *${'${cantidadRobada}'}* ${global.moneda || '¥enes'}.`,
  `🔧 Animatrónico en mantenimiento... ¡aprovechaste el descuido! +*${'${cantidadRobada}'}* ${global.moneda || '¥enes'}`,
  `🧤 Base de datos desprotegida brevemente. Acceso explotado. Se robó: *${'${cantidadRobada}'}* ${global.moneda || '¥enes'}.`,
  `🔓 Cerradura física comprometida. @${'${objetivo.split`@`[0]}' } ha sido víctima de un robo: *${'${cantidadRobada}'}* ${global.moneda || '¥enes'}.`
];

const textosFallo = [
  `❌ Misión abortada: el objetivo @${'${objetivo.split`@`[0]}' } no posee suficientes ${global.moneda || '¥enes'}. — Sistema respaldado por FNaF LATAM™`,
  `⚠️ Alarma activada... pero no había nada que robar. Objetivo seco: @${'${objetivo.split`@`[0]}'}`,
  `🧼 Revisión completada. Resultados: inventario vacío. Sin botín.`,
  `📉 El objetivo @${'${objetivo.split`@`[0]}' } apenas sobrevive. Robo cancelado.`,
  `🪫 Energía malgastada en una incursión fallida. @${'${objetivo.split`@`[0]}' } está en quiebra.`,
  `📛 Escaneo completo. Resultado: sin activos robables.`,
  `🪙 Error de transferencia: fondos insuficientes para ejecutar la sustracción.`,
  `⚰️ El animatrónico objetivo @${'${objetivo.split`@`[0]}' } ya había sido saqueado.`,
  `👁️ Unidad objetivo no contiene elementos valiosos. Evita riesgos innecesarios.`,
  `🧾 Registro contable indica saldo: 0. Robo innecesario.`
  `⏱️ Fallaste el reto 50/20 por 5 segundos... El daño emocional fue devastador. Perdiste *${'${cantidadRobada}'}* ${global.moneda || '¥enes'}.`,
  `🔪 Fred te eliminó sin piedad tras fallar. Has perdido *${'${cantidadRobada}'}* ${global.moneda || '¥enes'}.`,
  `⚙️ El traje Springlock falló y pagaste el precio... *${'${cantidadRobada}'}* ${global.moneda || '¥enes'} deducidos.`
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

  if (objetivoData.coin < cantidadRobada) {
    return conn.reply(
      m.chat,
      textosFallo[Math.floor(Math.random() * textosFallo.length)],
      m,
      { mentions: [objetivo] }
    );
  }

  userData.coin += cantidadRobada;
  objetivoData.coin -= cantidadRobada;
  userData.lastrob2 = Date.now();

  // Reemplazo mensaje éxito
  const mensajeExito = textosExito[Math.floor(Math.random() * textosExito.length)]
    .replace('${cantidadRobada}', cantidadRobada)
    .replace(/\${objetivo\.split`@\`\[0\]}/g, objetivo.split`@`[0]);

  conn.reply(
    m.chat,
    mensajeExito,
    m,
    { mentions: [objetivo, m.sender] }
  );
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
