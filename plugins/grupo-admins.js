const handler = async (m, {conn, participants, groupMetadata, args}) => {
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch((_) => null) || './src/catalogo.jpg';
  const groupAdmins = participants.filter((p) => p.admin);
  const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n');
  const owner = groupMetadata.owner || groupAdmins.find((p) => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net';
  const mensaje = args.join` `;
  const texto = `
⭐ 『 FNaF LATAM - Administradores del grupo 』⚙️

⚠️ Aquí están los guardianes de esta noche:

${listAdmin}

📢 Mensaje enviado:
» ${mensaje || '*Ningún mensaje proporcionado*'}

🛑 Recuerda: Usa este comando con responsabilidad o enfrentarás la *oscuridad eterna* de un WARN o BANEO.
`.trim();

  conn.sendFile(m.chat, pp, 'fnaflatam_admins.jpg', texto, m, false, {mentions: [...groupAdmins.map((v) => v.id), owner]});
};
handler.help = ['admins <mensaje>'];
handler.tags = ['grupo'];
handler.customPrefix = /a|@/i;
handler.command = /^(admins|@admins|dmins)$/i;
handler.group = true;

export default handler;
