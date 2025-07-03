import db from '../lib/database.js'

let handler = async (m, { conn, usedPrefix }) => {
    let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
    
    if (who == conn.user.jid) return m.react('✖️');
    if (!(who in global.db.data.users)) return m.reply(`📂 *[ERROR]*: Usuario no localizado en la base de datos interna.`);

    let user = global.db.data.users[who];
    let total = (user.coin || 0) + (user.bank || 0);

    let response = `
📡 Freddy Fazbear Financial Node v4.7

🔎 Escaneo Económico en curso...
🧾 Usuario: *${conn.getName(who)}*
🪙 Moneda: ¥${moneda}

═══════════════════════
⛀ Cartera: ${user.coin.toLocaleString()} ${moneda}
⚿ Banco: ${user.bank.toLocaleString()} ${moneda}
⛁ Total: ${total.toLocaleString()} ${moneda}
═══════════════════════

💾 Estado: Base de datos sincronizada.
💡 Sugerencia recomendada por Rockstar Freddy: Usa *${usedPrefix}deposit <monto>* para resguardar tus fondos.

— Sistema respaldado por FNaF LATAM™
    `.trim();

    await conn.reply(m.chat, response, m);
};

handler.help = ['bal'];
handler.tags = ['rpg'];
handler.command = ['bal', 'balance', 'bank'];
handler.register = true;
handler.group = true;

export default handler;
