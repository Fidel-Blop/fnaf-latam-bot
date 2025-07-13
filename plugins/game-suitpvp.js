const timeout = 60000;
const poin = 500;
const poin_lose = -100;
const poin_bot = 200;
const handler = async (m, {conn, usedPrefix, text}) => {
  conn.suit = conn.suit ? conn.suit : {};

  const userToChallenge = m.mentionedJid[0] || (m.replyMessage && m.replyMessage.sender);

  if (Object.values(conn.suit).find((room) => room.id.startsWith('suit') && [room.p, room.p2].includes(m.sender))) 
    throw `⚠️ *¡Atención!* Termina tu partida actual antes de comenzar otra.`;

  const textquien = `🤖 *FNaF LATAM* 🕹️\n\n¿A quién quieres desafiar? Etiqueta a un jugador con @\n\n*Ejemplo:*\n${usedPrefix}suit @usuario\n\n` +
  `👻 ¡Prepárate para un duelo de Piedra, Papel o Tijera... pero al estilo FNaF! 👁️‍🗨️`;

  if (!userToChallenge) return m.reply(textquien, m.chat, {mentions: conn.parseMention(textquien)});

  if (Object.values(conn.suit).find((room) => room.id.startsWith('suit') && [room.p, room.p2].includes(userToChallenge))) 
    throw `⚠️ El jugador @${userToChallenge.split('@')[0]} ya está en medio de una partida, espera que termine.`;

  const id = 'suit_' + new Date() * 1;

  // Mensaje temático con estilo oscuro y emojis FNaF
  const caption = `🎲 *FNaF LATAM - Desafío PVP* 🎲\n\n` +
  `*¡ALERTA!* @${m.sender.split`@`[0]} ha desafiado a @${userToChallenge.split`@`[0]} a una partida mortal de *Piedra, Papel o Tijera*.\n\n` +
  `🟢 Para aceptar, escribe: *aceptar*\n` +
  `🔴 Para rechazar, escribe: *rechazar*\n\n` +
  `⏳ *Responde rápido... o el miedo te atrapará.*`;

  const imgplaygame = `https://i.imgur.com/FNaFTheme.jpg`; // Imagen FNaF LATAM (reemplaza si tienes una mejor)

  conn.suit[id] = {
    chat: await conn.sendMessage(m.chat, {
      image: { url: imgplaygame }, 
      caption,
      mentions: [m.sender, userToChallenge]
    }),
    id: id,
    p: m.sender,
    p2: userToChallenge,
    status: 'wait',
    waktu: setTimeout(() => {
      if (conn.suit[id]) conn.reply(m.chat, `⏰ *Tiempo agotado.* El desafío de PVP se canceló por falta de respuesta.`, m);
      delete conn.suit[id];
    }, timeout),
    poin, poin_lose, poin_bot, timeout,
  };
};

handler.command = ['suitpvp', 'pvp', 'suit'];
handler.group = true;
handler.register = true;
handler.game = true;

export default handler;
