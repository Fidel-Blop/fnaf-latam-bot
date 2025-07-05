let handler = async (m, { conn, usedPrefix }) => {
  try {
    let who = m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.quoted
      ? m.quoted.sender
      : m.sender;

    if (!who) {
      await m.react('❌');
      return;
    }

    // Evitar consultar el bot
    if (who === conn.user.jid) {
      await m.react('❌');
      return;
    }

    if (!(who in global.db.data.users)) {
      return conn.reply(m.chat, `🚫 El usuario no se encuentra en la base de datos.`, m);
    }

    let user = global.db.data.users[who];

    // Definí la moneda si no está global
    let moneda = typeof global.moneda !== 'undefined' ? global.moneda : 'FazTokens';

    // Si user.coin no existe, asumimos 0
    let coin = user.coin || 0;

    let text = who === m.sender
      ? `💼 *Tu Cartera*\n\n💸 Tienes: *${coin.toLocaleString()} ${moneda}*`
      : `💼 *Cartera de @${who.split('@')[0]}*\n\n💸 Tiene: *${coin.toLocaleString()} ${moneda}*`;

    return conn.reply(m.chat, text, m, { mentions: [who] });

  } catch (error) {
    console.error('Error en comando wallet:', error);
    await m.reply('❌ Ocurrió un error al consultar la cartera. Intentá de nuevo más tarde.', m);
  }
};

handler.help = ['wallet', 'cartera'];
handler.tags = ['economy'];
handler.command = ['wallet', 'cartera'];
handler.group = true;
handler.register = true;

export default handler;
