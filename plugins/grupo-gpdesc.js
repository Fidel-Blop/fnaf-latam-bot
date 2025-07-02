const handler = async (m, { conn, args }) => {
  const nuevaDescripcion = args.join(' ');

  if (!nuevaDescripcion)
    return m.reply(
      `📝 *DESCRIPCIÓN NO DETECTADA*\n\n📌 Debes escribir el nuevo contenido para la terminal del grupo.\n\nEjemplo:\n✦ #gpdesc Bienvenidos al turno nocturno...\n\n— Sistema respaldado por FNaF LATAM™`
    );

  try {
    await conn.groupUpdateDescription(m.chat, nuevaDescripcion);
    m.reply(
      `📡 *ACTUALIZACIÓN DE TERMINAL DE SECTOR COMPLETA*\n\n✅ La descripción ha sido modificada exitosamente y registrada en el panel de control.\n\n— Sistema respaldado por FNaF LATAM™`
    );
  } catch (e) {
    m.reply(
      `⚠️ *ERROR EN LA ACTUALIZACIÓN DEL SECTOR*\n\n📌 No se pudo modificar la descripción.\n🧨 Detalles técnicos: ${e.message}\n\n— Sistema respaldado por FNaF LATAM™`
    );
  }
};

handler.help = ['groupdesc <texto>'];
handler.tags = ['grupo'];
handler.command = ['gpdesc', 'groupdesc'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
