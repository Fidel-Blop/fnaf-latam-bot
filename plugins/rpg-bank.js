let handler = async (m, { conn, usedPrefix }) => {
  try {
    let who =
      m.mentionedJid && m.mentionedJid[0]
        ? m.mentionedJid[0]
        : m.quoted
        ? m.quoted.sender
        : m.sender;

    // Evitar consultar al propio bot o si no se puede identificar a nadie
    if (!who || who === conn.user.jid) {
      return conn.reply(m.chat, '❌ No podés consultar la cartera del bot.', m);
    }

    // Verificar si el usuario existe en la base de datos
    if (!(who in global.db.data.users)) {
      return conn.reply(m.chat, `📂 *[ERROR]*: Usuario no localizado en la base de datos interna.`, m);
    }

    let user = global.db.data.users[who];
    let nombre = await conn.getName(who).catch(() => 'Desconocido');

    // Usar moneda global si existe, sino definirla localmente
    const moneda = global.moneda || 'FazTokens';

    let coin = user.coin || 0;
    let bank = user.bank || 0;
    let total = coin + bank;

    let response = `
📡 Freddy Fazbear Financial Node v4.7

🔎 Escaneo Económico en curso...
🧾 Usuario: *${nombre}*
🪙 Moneda: ¥${moneda}

═══════════════════════
⛀ Cartera: ${coin.toLocaleString()} ${moneda}
⚿ Banco: ${bank.toLocaleString()} ${moneda}
⛁ Total: ${total.toLocaleString()} ${moneda}
═══════════════════════

💾 Estado: Base de datos sincronizada.
💡 Sugerencia de Rockstar Freddy: Usa *${usedPrefix}deposit <monto>* para resguardar tus fondos.

— Sistema respaldado por FNaF LATAM™
    `.trim();

    await conn.reply(m.chat, response, m);

  } catch (err) {
    console.error('[ERROR EN BALANCE]:', err);
    await conn.reply(m.chat, '❌ Hubo un error al consultar el balance. Por favor intentá de nuevo o avisá a un admin.', m);
  }
};

handler.help = ['bal', 'balance', 'bank'];
handler.tags = ['rpg'];
handler.command = ['bal', 'balance', 'bank'];
handler.register = true;
handler.group = true;

export default handler;
