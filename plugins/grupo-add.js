let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  // Validaciones del número ingresado
  if (!text)
    return conn.reply(
      m.chat,
      `📡 Unidad de transmisión inactiva...\n\n⚠️ Se requiere número de acceso para iniciar el protocolo de invitación.\n\n📌 *Ejemplo:* ${usedPrefix + command} 1134567890\n\n— Sistema respaldado por FNaF LATAM™`,
      m
    );

  if (text.includes('+'))
    return conn.reply(
      m.chat,
      `⚠️ Anomalía de formato detectada.\nPor favor, ingresa el número **sin el símbolo +** ni espacios.\n\n— Sistema respaldado por FNaF LATAM™`,
      m
    );

  if (isNaN(text))
    return conn.reply(
      m.chat,
      `🚫 El identificador de operador es inválido.\nSe aceptan únicamente dígitos numéricos.\n\n— Sistema respaldado por FNaF LATAM™`,
      m
    );

  // Proceder a generar enlace de grupo
  const group = m.chat;
  const link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group);

  // Enviar invitación
  await conn.reply(
    `${text}@s.whatsapp.net`,
    `📨 *PROTOCOLO DE ACCESO RESTRINGIDO*\n\nUna unidad ha solicitado tu incorporación al canal de vigilancia.\n\n🔗 Link de acceso: ${link}\n\n⚠️ Este mensaje fue generado por el sistema de seguridad Fazbear.\n\n— Sistema respaldado por FNaF LATAM™`,
    m,
    { mentions: [m.sender] }
  );

  // Confirmación local
  m.reply(
    `✅ Transmisión enviada con éxito.\nEl protocolo de incorporación fue activado para el operador destino.\n\n— Sistema respaldado por FNaF LATAM™`
  );
};

handler.help = ['invite *<1134567890>*'];
handler.tags = ['group'];
handler.command = ['add', 'agregar', 'añadir'];
handler.group = true;
handler.admin = false;
handler.botAdmin = true;

export default handler;
