const handler = async (m, { conn, participants, groupMetadata, args }) => {
  // Imagen del grupo o fallback
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch(() => null) || './src/catalogo.jpg';

  // Obtener administradores
  const groupAdmins = participants.filter(p => p.admin);
  const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n');

  // Detectar dueño
  const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net';

  // Mensaje enviado por el usuario (si hay)
  const mensajeUsuario = args.join` `;
  const contenido = mensajeUsuario ? `📝 Mensaje registrado:\n» ${mensajeUsuario}\n\n` : '';

  // Mensaje final
  const text = `
🔒 MONITOREO INTERNO - ADMINISTRADORES DEL SECTOR 🔒

📡 Zona: ${groupMetadata.subject}
🧩 Registro de supervisores activos:

${listAdmin}

${contenido}⚠️ Este comando está limitado al uso organizativo.
Abuso del protocolo puede resultar en sanción.

— Sistema respaldado por FNaF LATAM™
`.trim();

  // Enviar mensaje con imagen de grupo
  conn.sendFile(
    m.chat,
    pp,
    'admins.jpg',
    text,
    m,
    false,
    {
      mentions: [...groupAdmins.map(v => v.id), owner]
    }
  );
};

handler.help = ['admins <texto>'];
handler.tags = ['grupo'];
handler.customPrefix = /a|@/i;
handler.command = /^(admins|@admins|dmins)$/i;
handler.group = true;

export default handler;
