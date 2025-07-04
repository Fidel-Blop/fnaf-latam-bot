const xppercoin = 350;

const handler = async (m, { conn, command, args }) => {
  const user = global.db.data.users[m.sender];
  let countRaw = command.replace(/^buy/i, '');
  let count = countRaw
    ? /all/i.test(countRaw)
      ? Math.floor(user.exp / xppercoin)
      : parseInt(countRaw)
    : args[0]
      ? parseInt(args[0])
      : 1;
  count = Math.max(1, count);

  if (user.exp >= xppercoin * count) {
    user.exp -= xppercoin * count;
    user.coin += count;

    const resp = `
🛠️ Freddy Fazbear Security Protocol v1.3.7 activado ⛓️
📡 Monitoreo FNaF LATAM: compra autorizada

╔═══════⩽✰⩾═══════╗
║    🔐 TRANSACCIÓN REGISTRADA
╠═══════⩽✰⩾═══════╝
║╭──────────────┄
║│ ▶ Compra nominal: + ${count} 💸
║│ ▶ XP debitada: -${xppercoin * count} puntos
║╰──────────────┄

...Guardando logs de auditoría... ##ERROR## no hubo fallos detectados.

— Sistema respaldado por FNaF LATAM™
`;

    return conn.reply(m.chat, resp.trim(), m);
  } else {
    const failMsg = `
⚠️ Unidad de observación conectada 🎥
🔊 Base de datos auditiva sincronizada

⛔ ERROR: Fondos insuficientes para completar la compra.
Requerido: ${xppercoin * count} XP
Disponible: ${user.exp} XP

— Sistema respaldado por FNaF LATAM™
`;
    return conn.reply(m.chat, failMsg.trim(), m);
  }
};

handler.help = ['buy', 'buyall'];
handler.tags = ['economy'];
handler.command = ['buy', 'buyall'];
handler.group = true;
handler.register = true;

export default handler;
