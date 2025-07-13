async function handler(m, { conn, args, usedPrefix, command }) {
  const user = global.db.data.users[m.sender];
  const type = 'coin';
  const bankType = 'bank';

  if (!args[0] || !args[1]) {
    const helpMessage = `${emoji} 👻 *Atención guardia nocturno*\n\nDebes mencionar a quien quieras regalar *${moneda}*.\n\n> Ejemplo » *${usedPrefix + command} 25000 @mencion*\n\nRecuerda, en Freddy's nada es lo que parece...`;
    return conn.sendMessage(m.chat, {text: helpMessage, mentions: [m.sender]}, {quoted: m});
  }

  const count = Math.min(Number.MAX_SAFE_INTEGER, Math.max(100, (isNumber(args[0]) ? parseInt(args[0]) : 100))) * 1;
  const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[1] ? (args[1].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : '';
  
  if (!who) {
    return conn.sendMessage(m.chat, {text: `${emoji2} ⚠️ Necesitas regalar al menos *100 ${moneda}* para que la transferencia sea válida.`, mentions: [m.sender]}, {quoted: m});
  }
  if (!(who in global.db.data.users)) {
    return conn.sendMessage(m.chat, {text: `${emoji2} ❌ El usuario @${who.split('@')[0]} no aparece en la base de datos oscura...`, mentions: [m.sender]}, {quoted: m});
  }
  if (user[bankType] * 1 < count) {
    return conn.sendMessage(m.chat, {text: `${emoji2} 💀 No tienes suficientes ${moneda} en el banco para realizar esta transferencia.`, mentions: [m.sender]}, {quoted: m});
  }
  
  user[bankType] -= count * 1;
  global.db.data.users[who][type] += count * 1;

  const mentionText = `@${who.split('@')[0]}`;
  const totalInBank = user[bankType];

  const response = `
🎁 *Transferencia nocturna realizada*

Has transferido *${count} ${moneda}* a ${mentionText}
> 💰 *Saldo actual en banco:* ${totalInBank} ${moneda}

⚠️ Recuerda, en Freddy's la seguridad nunca duerme...
`;

  conn.sendMessage(m.chat, {text: response.trim(), mentions: [who]}, {quoted: m});
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
