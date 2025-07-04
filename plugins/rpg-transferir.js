// Código adaptado por Freddy AI Response 🧠 — Sistema FazWatch v1.3.7

async function handler(m, { conn, args, usedPrefix, command }) {
  const user = global.db.data.users[m.sender];
  const type = 'coin';
  const bankType = 'bank';

  if (!args[0] || !args[1]) {
    const helpMessage = `📡 Freddy Fazbear Interbank Protocol v2.1.4

⚠️ Parámetros insuficientes detectados.

📌 Formato correcto: *${usedPrefix + command} 25000 @usuario*

🎯 Objetivo: Transferir fondos desde tu banco hacia otra unidad autorizada.

— Sistema respaldado por FNaF LATAM™`;
    return conn.sendMessage(m.chat, { text: helpMessage, mentions: [m.sender] }, { quoted: m });
  }

  const count = Math.min(Number.MAX_SAFE_INTEGER, Math.max(100, isNumber(args[0]) ? parseInt(args[0]) : 100));
  const who = m.mentionedJid && m.mentionedJid[0]
    ? m.mentionedJid[0]
    : args[1]
    ? (args[1].replace(/[@ .+-]/g, '') + '@s.whatsapp.net')
    : '';

  if (!who)
    return conn.sendMessage(
      m.chat,
      {
        text: `🚫 Error de destino:

Debes regalar al menos *100 ${global.moneda || '¥enes'}* a un usuario identificado.

— Sistema respaldado por FNaF LATAM™`,
        mentions: [m.sender],
      },
      { quoted: m }
    );

  if (!(who in global.db.data.users))
    return conn.sendMessage(
      m.chat,
      {
        text: `📉 Usuario desconocido:

⚠️ El objetivo *${who}* no está registrado en la base de datos FazbearNet™.`,
        mentions: [m.sender],
      },
      { quoted: m }
    );

  if (user[bankType] < count)
    return conn.sendMessage(
      m.chat,
      {
        text: `💳 Transferencia rechazada:

Fondos insuficientes en la cuenta bancaria registrada.

❌ Necesarios: *${count} ${global.moneda || '¥enes'}*
🏦 Saldo actual: *${user[bankType]} ${global.moneda || '¥enes'}*`,
        mentions: [m.sender],
      },
      { quoted: m }
    );

  user[bankType] -= count;
  global.db.data.users[who][type] += count;

  const mentionText = `@${who.split('@')[0]}`;
  const totalInBank = user[bankType];

  conn.sendMessage(
    m.chat,
    {
      text: `✅ Transferencia autorizada 🏦

📤 Monto enviado: *${count} ${global.moneda || '¥enes'}*
🎯 Destinatario: ${mentionText}
📥 Saldo restante en banco: *${totalInBank} ${global.moneda || '¥enes'}*

🔐 Transferencia registrada en la red de seguridad FazNet.

— Sistema respaldado por FNaF LATAM™`,
      mentions: [who],
    },
    { quoted: m }
  );
}

handler.help = ['pay'];
handler.tags = ['rpg'];
handler.command = ['pay', 'transfer'];
handler.group = true;
handler.register = true;

export default handler;

function isNumber(x) {
  return !isNaN(x);
}
