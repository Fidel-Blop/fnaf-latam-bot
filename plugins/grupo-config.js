let handler = async (m, { conn, args, usedPrefix, command }) => {
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => './src/catalogo.jpg');

  // Mapeo de comandos a estados de grupo
  let isClose = {
    'open': 'not_announcement',
    'close': 'announcement',
    'abierto': 'not_announcement',
    'cerrado': 'announcement',
    'abrir': 'not_announcement',
    'cerrar': 'announcement',
  }[(args[0] || '').toLowerCase()];

  if (isClose === undefined) {
    return conn.reply(
      m.chat,
      `🔒 *PROTOCOLO DE ACCESO GRUPAL*\n\n⚠️ Opción inválida.\n\n📌 *Ejemplos válidos:*\n✦ ${usedPrefix + command} abrir\n✦ ${usedPrefix + command} cerrar\n✦ ${usedPrefix + command} open\n✦ ${usedPrefix + command} close\n\n— Sistema respaldado por FNaF LATAM™`,
      m
    );
  }

  await conn.groupSettingUpdate(m.chat, isClose);

  if (isClose === 'not_announcement') {
    m.reply(`🔓 *Acceso de transmisión habilitado*\n\n📡 Los operadores ahora pueden interactuar libremente en el canal.\n\n— Sistema respaldado por FNaF LATAM™`);
  }

  if (isClose === 'announcement') {
    m.reply(`🔐 *Zona restringida activada*\n\n📢 Solo supervisores (admins) tienen permiso de transmisión en esta zona.\n\n🛑 El resto de las unidades ha sido silenciado temporalmente.\n\n— Sistema respaldado por FNaF LATAM™`);
  }
};

handler.help = ['group open / close', 'grupo abrir / cerrar'];
handler.tags = ['grupo'];
handler.command = ['group', 'grupo'];
handler.admin = true;
handler.botAdmin = true;

export default handler;
