const handler = async (m, { conn, text, command, usedPrefix }) => {
  const pp = './src/catalogo.jpg';
  let number, ownerNumber, aa, who;

  // Determinar quién es el usuario advertido
  if (m.isGroup) {
    who = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : text);
  } else who = m.chat;

  const user = global.db.data.users[who];
  const usuario = conn.user.jid.split`@`[0] + '@s.whatsapp.net';
  const bot = global.db.data.settings[conn.user.jid] || {};

  const dReason = 'Sin motivo registrado';
  const msgtext = text || dReason;
  const sdms = msgtext.replace(/@\d+-?\d* /g, '');
  const warntext = `⚠️ Protocolo de advertencia activo.\n\n📡 Es necesario mencionar a un sujeto o responder su mensaje para ejecutar una advertencia.\n\n— Sistema respaldado por FNaF LATAM™`;

  if (!who) {
    return m.reply(warntext, m.chat, { mentions: conn.parseMention(warntext) });
  }

  // Proteger a los dueños
  for (let i = 0; i < global.owner.length; i++) {
    ownerNumber = global.owner[i][0];
    if (usuario.replace(/@s\.whatsapp\.net$/, '') === ownerNumber) {
      aa = ownerNumber + '@s.whatsapp.net';
      await conn.reply(m.chat, `⛔ Operación denegada.\nUnidad superior detectada... cancelando ejecución.`, m, { mentions: [aa] });
      return;
    }
  }

  // Aumentar advertencia
  user.warn += 1;

  // Mensaje de advertencia
  await m.reply(
    `🔔 *ALERTA DE COMPORTAMIENTO INAPROPIADO*\n\n📍 Unidad: @${who.split`@`[0]}\n📄 Motivo registrado: ${sdms}\n📊 Nivel de advertencia: ${user.warn}/3\n\n⚠️ Este incidente ha sido registrado por el sistema de vigilancia.\n\n— Sistema respaldado por FNaF LATAM™`,
    null,
    { mentions: [who] }
  );

  // Si supera el límite, expulsar
  if (user.warn >= 3) {
    user.warn = 0;
    await m.reply(
      `🚨 *PROTOCOLO DISCIPLINARIO FNaF LATAM™ ACTIVADO*\n\n📍 Unidad: @${who.split`@`[0]}\n📊 Límite de advertencias superado (3/3).\n⛓️ Ejecutando expulsión del perímetro...\n\n— Sistema respaldado por FNaF LATAM™`,
      null,
      { mentions: [who] }
    );
    await conn.groupParticipantsUpdate(m.chat, [who], 'remove');
  }

  return !1;
};

handler.command = ['advertir', 'advertencia', 'warn', 'warning'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
