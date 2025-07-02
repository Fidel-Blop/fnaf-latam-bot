const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command, usedPrefix }) => {
  if (usedPrefix.toLowerCase() === 'a') return; // Excluir prefijo 'a' por seguridad

  const customEmoji = global.db.data.chats[m.chat]?.customEmoji || '🍫';
  await m.react(customEmoji);

  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  const mensaje = args.join(' ');
  const aviso = `*» ALERTA GENERAL :* ${mensaje}`;
  let texto = `⚠️ *¡ATENCIÓN A TODAS LAS UNIDADES!* ⚠️\n*SECTOR: ${participants.length} OPERADORES ACTIVOS* 🕹️\n\n${aviso}\n\n╭─ 𝅄 ۪꒰ \`⡞᪲=͟͟͞${botname} ≼᳞ׄ\` ꒱ ۟ 𝅄 ──╮\n`;
  
  for (const mem of participants) {
    texto += `┊${customEmoji} @${mem.id.split('@')[0]}\n`;
  }

  texto += `╰⸼ ── ┄ ── ꒰ ׅ୭ *${vs}* ୧ ׅ ꒱ ── ┄ ── ⸼\n\n— Sistema respaldado por FNaF LATAM™`;

  await conn.sendMessage(m.chat, { text: texto, mentions: participants.map((a) => a.id) });
};

handler.help = ['todos *<mensaje opcional>*'];
handler.tags = ['group'];
handler.command = ['todos', 'invocar', 'tagall'];
handler.admin = true;
handler.group = true;

export default handler;
