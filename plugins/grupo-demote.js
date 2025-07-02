var handler = async (m, { conn, usedPrefix, command, text }) => {
  let number;

  if (isNaN(text) && !text.match(/@/g)) {
    // Si el texto no es número ni mención, ignorar
  } else if (isNaN(text)) {
    number = text.split`@`[1];
  } else if (!isNaN(text)) {
    number = text;
  }

  if (!text && !m.quoted) {
    return conn.reply(
      m.chat,
      `⚠️ *Protocolo de degradación fallido*\n\n📌 Debes mencionar o responder al usuario que deseas remover de los controles administrativos.\n\n— Sistema respaldado por FNaF LATAM™`,
      m
    );
  }

  if (number && (number.length > 13 || number.length < 11)) {
    return conn.reply(
      m.chat,
      `⚠️ Identificador inválido.\n\n📌 Verifica que el número mencionado esté completo.\n\n— Sistema respaldado por FNaF LATAM™`,
      m
    );
  }

  try {
    let user;
    if (text) {
      user = number + '@s.whatsapp.net';
    } else if (m.quoted?.sender) {
      user = m.quoted.sender;
    } else if (m.mentionedJid) {
      user = number + '@s.whatsapp.net';
    }

    await conn.groupParticipantsUpdate(m.chat, [user], 'demote');

    await conn.reply(
      m.chat,
      `🔻 *ACCESO ADMINISTRATIVO REVOCADO*\n\n📍 Unidad: @${user.split('@')[0]}\n📉 Permisos retirados exitosamente.\n\n— Sistema respaldado por FNaF LATAM™`,
      m,
      { mentions: [user] }
    );
  } catch (e) {
    conn.reply(
      m.chat,
      `❌ Error al procesar la solicitud.\nVerifica la mención o intenta nuevamente.\n\n— Sistema respaldado por FNaF LATAM™`,
      m
    );
  }
};

handler.help = ['demote'];
handler.tags = ['grupo'];
handler.command = ['demote', 'quitarpija', 'degradar'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
handler.fail = null;

export default handler;
