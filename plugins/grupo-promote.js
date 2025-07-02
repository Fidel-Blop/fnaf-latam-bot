var handler = async (m, { conn, usedPrefix, command, text }) => {
  let number;

  if (isNaN(text) && !text.match(/@/g)) {
    // texto inválido, no se asigna número
  } else if (isNaN(text)) {
    number = text.split`@`[1];
  } else if (!isNaN(text)) {
    number = text;
  }

  if (!text && !m.quoted) {
    return conn.reply(
      m.chat,
      `⚠️ *ACCESO DENEGADO*\n\n📌 Debes mencionar o responder a una unidad para otorgarle privilegios administrativos.\n\n— Sistema respaldado por FNaF LATAM™`,
      m
    );
  }

  if (number && (number.length > 13 || (number.length < 11 && number.length > 0))) {
    return conn.reply(
      m.chat,
      `⚠️ *IDENTIFICADOR INVÁLIDO*\n\n📌 Responde o menciona a un usuario válido para este comando.\n\n— Sistema respaldado por FNaF LATAM™`,
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

    await conn.groupParticipantsUpdate(m.chat, [user], 'promote');
    conn.reply(
      m.chat,
      `✔️ *PERFIL ELEVADO*\n\n👤 Unidad @${user.split('@')[0]} ahora tiene privilegios administrativos en este sector.\n\n— Sistema respaldado por FNaF LATAM™`,
      m
    );
  } catch (e) {
    conn.reply(
      m.chat,
      `⚠️ *ERROR EN PROTOCOLO*\n\n🧨 Detalle técnico: ${e.message}\n\n— Sistema respaldado por FNaF LATAM™`,
      m
    );
  }
};

handler.help = ['promote'];
handler.tags = ['grupo'];
handler.command = ['promote', 'darpija', 'promover'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
handler.fail = null;

export default handler;
