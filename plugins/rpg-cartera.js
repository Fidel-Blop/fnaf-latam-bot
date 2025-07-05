let handler = async (m, { conn }) => {
  try {
    let who = m.mentionedJid?.[0] || m.quoted?.sender || m.sender;

    if (!who || who === conn.user.jid) {
      await m.react('❌');
      return;
    }

    if (!(who in global.db.data.users)) {
      return conn.reply(m.chat, `🚫 Usuario no encontrado en la base de datos.`, m);
    }

    let user = global.db.data.users[who];
    let nombre = await conn.getName(who).catch(() => 'Desconocido');
    let moneda = global.moneda || 'FazTokens';

    let coin = user.coin || 0;
    let bank = user.bank || 0;

    let text = who === m.sender
      ? `📂 *Tu Balance Actual*\n\n` +
        `⛀ *Efectivo:* ${coin.toLocaleString()} ${moneda}\n` +
        `⚿ *Banco:* ${bank.toLocaleString()} ${moneda}`
      : `📂 *Balance de @${who.split('@')[0]}*\n\n` +
        `⛀ *Efectivo:* ${coin.toLocaleString()} ${moneda}\n` +
        `⚿ *Banco:* ${bank.toLocaleString()} ${moneda}`;

    return conn.reply(m.chat, text, m, { mentions: [who] });
  } catch (e) {
    console.error('[ERROR EN BAL]:', e);
    return m.reply('❌ Error al consultar el balance.');
  }
};

handler.help = ['bal', 'balance'];
handler.tags = ['economy'];
handler.command = ['bal', 'balance'];
handler.group = true;
handler.register = true;

export default handler;
