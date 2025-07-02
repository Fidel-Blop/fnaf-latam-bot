var handler = async (m, { conn, args }) => {
  let group = m.chat;
  let link = 'https://chat.whatsapp.com/' + (await conn.groupInviteCode(group));
  
  const mensaje = `
⛓️──────「 FREDDY FNAF LATAM ™ 」──────⛓️
📡 *CÓDIGO DE ACCESO AL SECTOR*

✦ Enlace de invitación generado:
${link}

⚠️ Compartir con precaución.

— Sistema respaldado por FNaF LATAM™
  `.trim();

  conn.reply(m.chat, mensaje, m, { detectLink: true });
};

handler.help = ['link'];
handler.tags = ['grupo'];
handler.command = ['link', 'enlace'];
handler.group = true;
handler.botAdmin = true;

export default handler;
