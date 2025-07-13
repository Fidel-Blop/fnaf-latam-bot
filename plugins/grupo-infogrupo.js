const handler = async (m, { conn, participants, groupMetadata }) => {
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch((_) => global.icono);
  const { antiLink, detect, welcome, modoadmin, autoRechazar, nsfw, autoAceptar, reaction, isBanned, antifake } = global.db.data.chats[m.chat];
  const groupAdmins = participants.filter((p) => p.admin);
  const listAdmin = groupAdmins.map((v, i) => `🔸 ${i + 1}. @${v.id.split('@')[0]}`).join('\n');
  const owner = groupMetadata.owner || groupAdmins.find((p) => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net';

  const text = `
╭─── ⛧ 𝙎𝙄𝙎𝙏𝙀𝙈𝘼 𝙁𝙉𝘼𝙁 𝙇𝘼𝙏𝘼𝙈 ⛧ ───╮
│ 🎭  *ID del Sector:*  
│     ${groupMetadata.id}
│ 📛  *Nombre del Lugar:*  
│     ${groupMetadata.subject}
│ 👥  *Almas Registradas:*  
│     ${participants.length} Usuarios
│ 👑  *Fundador:*  
│     @${owner.split('@')[0]}
│ 🛡️  *Guardianes del lugar:*
│ ${listAdmin}
╰─────────────────────────────╯


📜 *Registro del lugar:*
${groupMetadata.desc?.toString() || '🕸️ Sin descripción aún...'}
`.trim();

  conn.sendFile(m.chat, pp, 'img.jpg', text, m, false, {
    mentions: [...groupAdmins.map((v) => v.id), owner],
  });
};

handler.help = ['infogrupo'];
handler.tags = ['grupo'];
handler.command = ['infogrupo', 'gp'];
handler.register = true;
handler.group = true;

export default handler;
