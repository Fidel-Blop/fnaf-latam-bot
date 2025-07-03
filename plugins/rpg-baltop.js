let handler = async (m, { conn, args, participants }) => {
  // Escaneo de miembros del grupo actual
  let localUsers = participants.map(p => {
    const data = global.db.data.users[p.jid] || {};
    return {
      jid: p.jid,
      coin: data.coin || 0,
      bank: data.bank || 0
    };
  });

  // Ordenar por suma de coin + banco
  let sorted = localUsers.sort((a, b) => (b.coin + b.bank) - (a.coin + a.bank));
  let len = args[0] && !isNaN(args[0]) ? Math.min(10, Math.max(parseInt(args[0]), 1)) : Math.min(10, sorted.length);

  // Composición del mensaje
  let rankingText = `📡 *Freddy Fazbear Monitoring Unit v2.3*\n`;
  rankingText += `🗂️ Escaneo financiero en curso...\n`;
  rankingText += `⛓️ Grupo escaneado: ${await conn.getName(m.chat)}\n\n`;
  rankingText += `📁 *Top ${len} acumuladores de ¥${moneda} (grupo local):*\n\n`;

  rankingText += sorted.slice(0, len).map((user, i) => {
    const total = user.coin + user.bank;
    const name = conn.getName(user.jid) || 'Usuario';
    return `📌 ${i + 1}. *${name}*\n↳ 🧾 Total: ¥${total} ${moneda}`;
  }).join('\n\n');

  rankingText += `\n\n🔒 Protocolo financiero local completado.\n— Sistema respaldado por FNaF LATAM™`;

  await conn.reply(m.chat, rankingText.trim(), m);
};

handler.help = ['baltop'];
handler.tags = ['rpg'];
handler.command = ['baltop', 'eboard'];
handler.group = true;
handler.register = true;
handler.fail = null;
handler.exp = 0;

export default handler;
