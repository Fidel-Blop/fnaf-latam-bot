import db from '../lib/database.js';

let handler = async (m, { conn, usedPrefix }) => {
  try {
    let who =
      m.mentionedJid && m.mentionedJid[0]
        ? m.mentionedJid[0]
        : m.quoted
        ? m.quoted.sender
        : m.sender;

    // Verifica si se intenta consultar al propio bot
    if (who === conn.user.jid || who === undefined) {
      await m.react('✖️');
      return;
    }

    if (!(who in global.db.data.users)) {
      return m.reply(
        `📂 *[ERROR]*: Usuario no localizado en la base de datos interna.`
      );
    }

    let user = global.db.data.users[who];
    let nombre = await conn.getName(who).catch(() => 'Desconocido');
    let moneda = 'FazTokens';
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
    await m.reply(
      '❌ Hubo un error al consultar el balance.\nPor favor intentá de nuevo o avisá a un administrador.'
    );
  }
};

handler.help = ['bal'];
handler.tags = ['rpg'];
handler.command = ['bal', 'balance', 'bank'];
handler.register = true;
handler.group = true;

export default handler;
