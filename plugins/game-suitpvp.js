const timeout = 60000;
const poin = 500;
const poin_lose = -100;
const poin_bot = 200;

const handler = async (m, { conn, usedPrefix, text }) => {
  conn.suit = conn.suit || {};

  const userToChallenge = m.mentionedJid?.[0] || (m.replyMessage && m.replyMessage.sender);

  if (Object.values(conn.suit).find(room => room.id.startsWith('suit') && [room.p, room.p2].includes(m.sender)))
    throw `⛔ Unidad ya registrada en una secuencia de combate.\nFinaliza el protocolo activo antes de iniciar uno nuevo.`;

  const textquien = `🎮 Monitoreo de Retos FNaF LATAM™ 🎮\n\n👁️ Operador ${m.sender.split`@`[0]}, necesitas **seleccionar un objetivo** para el protocolo de combate.\n\n📌 *Usa el formato:*\n${usedPrefix}suit @usuario\n\n⚠️ Recuerda: el sistema detecta solo usuarios válidos del canal actual.`;

  if (!userToChallenge)
    return m.reply(textquien, m.chat, { mentions: conn.parseMention(textquien) });

  if (Object.values(conn.suit).find(room => room.id.startsWith('suit') && [room.p, room.p2].includes(userToChallenge)))
    throw `⚠️ El sujeto objetivo está actualmente comprometido en otro enfrentamiento.\nEspera a que el ciclo de batalla finalice.`;

  const id = 'suit_' + new Date() * 1;
  const caption = `🎮 🔒 PROTOCOLO DE COMBATE: FNaF LATAM 🔒 🎮\n\n📡 Unidad @${m.sender.split`@`[0]} ha activado un desafío contra la unidad @${userToChallenge.split`@`[0]}\n\n⚙️ Protocolo FazWatch™ - Fase de autorización iniciada.\n\n📤 Responde con:\n> *aceptar* ✅ para entrar al sistema\n> *rechazar* ❌ para abortar misión\n\n🕒 Tiempo límite: 60 segundos\n\n— Sistema respaldado por FNaF LATAM™`;

  conn.suit[id] = {
    chat: await conn.sendMessage(m.chat, {
      text: caption,
      mentions: [m.sender, userToChallenge]
    }),
    id,
    p: m.sender,
    p2: userToChallenge,
    status: 'wait',
    waktu: setTimeout(() => {
      if (conn.suit[id]) {
        conn.reply(
          m.chat,
          `⛓️ ##ERROR## Tiempo de respuesta excedido...\nDesactivando módulo de combate por inactividad. — Sistema respaldado por FNaF LATAM™`,
          m
        );
        delete conn.suit[id];
      }
    }, timeout),
    poin,
    poin_lose,
    poin_bot,
    timeout,
  };
};

handler.command = ['suitpvp', 'pvp', 'suit'];
handler.group = true;
handler.register = true;
handler.game = true;

export default handler;
