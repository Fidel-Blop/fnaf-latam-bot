const handler = async (m, { conn, participants, groupMetadata }) => {
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch(() => global.icono);
  const {
    antiLink,
    detect,
    welcome,
    modoadmin,
    autoRechazar,
    nsfw,
    autoAceptar,
    reaction,
    isBanned,
    antifake,
  } = global.db.data.chats[m.chat];

  const groupAdmins = participants.filter((p) => p.admin);
  const listAdmin = groupAdmins
    .map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`)
    .join('\n');

  const owner =
    groupMetadata.owner ||
    groupAdmins.find((p) => p.admin === 'superadmin')?.id ||
    m.chat.split`-`[0] + '@s.whatsapp.net';

  const text = `
⛓️────── 「 FREDDY FNAF LATAM ™ 」──────⛓️
🔍 *SECTOR MONITOREADO:* ${groupMetadata.subject}
🆔 *ID de sector:* ${groupMetadata.id}
👥 *Unidades registradas:* ${participants.length}
🛡️ *Operador Principal:* @${owner.split('@')[0]}

⚙️ *ADMINISTRADORES DEL SECTOR:*
${listAdmin}


📝 *Descripción actual:*
${groupMetadata.desc?.toString() || '⚠ Sin descripción registrada'}

⛓️────────────────────────────────────⛓️

— Sistema respaldado por FNaF LATAM™
  `.trim();

  await conn.sendFile(m.chat, pp, 'img.jpg', text, m, false, {
    mentions: [...groupAdmins.map((v) => v.id), owner],
  });
};

handler.help = ['infogrupo'];
handler.tags = ['grupo'];
handler.command = ['infogrupo', 'gp'];
handler.register = true;
handler.group = true;

export default handler;
