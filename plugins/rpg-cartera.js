let handler = async (m, { conn, usedPrefix }) => {
  try {
    let who =
      m.mentionedJid?.[0] ||
      (m.quoted ? m.quoted.sender : m.sender);

    // Verificación básica
    if (!who || who === conn.user.jid) {
      return conn.reply(m.chat, '❌ No podés consultar la cartera del bot.', m);
    }

    // Verifica si existe en la base de datos
    if (!(who in global.db.data.users)) {
      return conn.reply(m.chat, `🚫 El usuario no se encuentra en la base de datos.`, m);
    }

    const user = global.db.data.users[who];
    const nombre = await conn.getName(who).catch(() => 'Desconocido');
    const moneda = global.moneda || 'FazTokens';
    const coin = user.coin || 0;

    const texto = who === m.sender
      ? `💼 *Tu Cartera*\n\n💸 Tienes: *${coin.toLocaleString()} ${moneda}*`
      : `💼 *Cartera de @${who.split('@')[0]}*\n\n💸 Tiene: *${coin.toLocaleString()} ${moneda}*`;

    return conn.reply(m.chat, texto, m, {
      mentions: [who]
    });

  } catch (err) {
    console.error('[ERROR EN WALLET]:', err);
    return conn.reply(m.chat, '❌ Ocurrió un error al consultar la cartera. Intentá de nuevo más tarde.', m);
  }
};

handler.help = ['wallet', 'cartera'];
handler.tags = ['economy'];
handler.command = ['wallet', 'cartera'];
handler.group = true;
handler.register = true;

export default handler;
