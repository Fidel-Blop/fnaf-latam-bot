var handler = async (m, { conn, participants, usedPrefix, command }) => {
  if (!m.mentionedJid[0] && !m.quoted) {
    return conn.reply(
      m.chat,
      `⚠️ *PROTOCOLO DE EXPULSIÓN DETENIDO*\n\n📌 Debes mencionar o responder al usuario que deseas expulsar del sector.\n\n— Sistema respaldado por FNaF LATAM™`,
      m
    );
  }

  let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;

  const groupInfo = await conn.groupMetadata(m.chat);
  const ownerGroup = groupInfo.owner || m.chat.split`-`[0] + '@s.whatsapp.net';
  const ownerBot = global.owner[0][0] + '@s.whatsapp.net';

  if (user === conn.user.jid) {
    return conn.reply(
      m.chat,
      `❌ *ERROR: ACCIÓN DENEGADA*\n\n🛑 No puedo expulsar la unidad central del sistema (bot).\n\n— Sistema respaldado por FNaF LATAM™`,
      m
    );
  }

  if (user === ownerGroup) {
    return conn.reply(
      m.chat,
      `❌ *ERROR: ACCIÓN DENEGADA*\n\n🛑 No puedes expulsar al operador principal del sector.\n\n— Sistema respaldado por FNaF LATAM™`,
      m
    );
  }

  if (user === ownerBot) {
    return conn.reply(
      m.chat,
      `❌ *ERROR: ACCIÓN DENEGADA*\n\n🛑 No puedes expulsar al controlador maestro del sistema.\n\n— Sistema respaldado por FNaF LATAM™`,
      m
    );
  }

  await conn.groupParticipantsUpdate(m.chat, [user], 'remove');

   await conn.reply(
     m.chat,
     `🔴 *EXPULSIÓN EJECUTADA*\n\n👤 Unidad @${user.split('@')[0]} removida del sector.\n\n— Sistema respaldado por FNaF LATAM™`,
     m,
     { mentions: [user] }
   );
};

handler.help = ['kick'];
handler.tags = ['grupo'];
handler.command = ['kick', 'echar', 'hechar', 'sacar', 'ban'];
handler.admin = true;
handler.group = true;
handler.register = true;
handler.botAdmin = true;

export default handler;
