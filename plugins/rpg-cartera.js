let handler = async (m, { conn, usedPrefix }) => {
  let who = m.mentionedJid && m.mentionedJid[0]
    ? m.mentionedJid[0]
    : m.quoted
    ? m.quoted.sender
    : m.sender;

  if (who == conn.user.jid) return m.react('❌');
  if (!(who in global.db.data.users)) {
    return conn.reply(m.chat, `🚫 El usuario no se encuentra en la base de datos.`, m);
  }

  let user = global.db.data.users[who];
  let text = who === m.sender
    ? `💼 *Tu Cartera*\n\n💸 Tienes: *${user.coin} ${moneda}*`
    : `💼 *Cartera de @${who.split('@')[0]}*\n\n💸 Tiene: *${user.coin} ${moneda}*`;

  return conn.reply(m.chat, text, m, { mentions: [who] });
};

handler.help = ['wallet', 'cartera'];
handler.tags = ['economy'];
handler.command = ['wallet', 'cartera'];
handler.group = true;
handler.register = true;

export default handler;
