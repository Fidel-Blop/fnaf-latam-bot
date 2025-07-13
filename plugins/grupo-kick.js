var handler = async (m, { conn, participants, usedPrefix, command }) => {
  if (!m.mentionedJid[0] && !m.quoted) {
    return conn.reply(m.chat, `${emoji} ⚠️ *Se requiere marcar a un sujeto para proceder con la expulsión del recinto.*\n\n✦ Usa: *${usedPrefix + command} @usuario*`, m);
  }

  let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;

  const groupInfo = await conn.groupMetadata(m.chat);
  const ownerGroup = groupInfo.owner || m.chat.split`-`[0] + '@s.whatsapp.net';
  const ownerBot = global.owner[0][0] + '@s.whatsapp.net';

  if (user === conn.user.jid) {
    return conn.reply(m.chat, `${emoji2} ⚠️ *No puedo autoeliminarme del sector.*`, m);
  }

  if (user === ownerGroup) {
    return conn.reply(m.chat, `${emoji2} 👑 *No se puede eliminar al propietario de este lugar. Su presencia es fundamental.*`, m);
  }

  if (user === ownerBot) {
    return conn.reply(m.chat, `${emoji2} 🔒 *Ese usuario tiene acceso maestro al sistema. No se permite su expulsión.*`, m);
  }

  await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
};

handler.help = ['kick'];
handler.tags = ['grupo'];
handler.command = ['kick','echar','hechar','sacar','ban'];
handler.admin = true;
handler.group = true;
handler.register = true;
handler.botAdmin = true;

export default handler;
