let handler = async (m, { conn, args, usedPrefix, command }) => {
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => icono);
  let isClose = { // Comportamiento tipo Switch
    'open': 'not_announcement',
    'close': 'announcement',
    'abierto': 'not_announcement',
    'cerrado': 'announcement',
    'abrir': 'not_announcement',
    'cerrar': 'announcement',
  }[(args[0] || '')];

  if (isClose === undefined)
    return conn.reply(m.chat, `👁️‍🗨️ *Configura el grupo a tu voluntad... pero elige bien.*\n\n📌 Ejemplos:\n*✰ #${command} abrir*\n*✰ #${command} cerrar*\n*✰ #${command} open*\n*✰ #${command} close*`, m);

  await conn.groupSettingUpdate(m.chat, isClose);

  if (isClose === 'not_announcement') {
    m.reply(`👻 *Las voces vuelven a escucharse... Todos pueden escribir en este grupo.*`);
  }

  if (isClose === 'announcement') {
    m.reply(`🛑 *Solo los guardianes de la noche (admins) pueden hablar aquí.*`);
  }
};
handler.help = ['group open / close', 'grupo abrir / cerrar'];
handler.tags = ['grupo'];
handler.command = ['group', 'grupo'];
handler.admin = true;
handler.botAdmin = true;

export default handler;
