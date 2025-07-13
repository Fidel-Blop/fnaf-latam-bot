const handler = async (m, { conn, text, command, usedPrefix, args }) => {
  const pp = 'https://telegra.ph/file/c7924bf0e0d839290cc51.jpg';
  const waitTime = 10000;
  const user = global.db.data.users[m.sender];

  if (new Date - user.wait < waitTime)
    throw `${emoji} *¡Estás sobrecalentado!* Esperá ${Math.floor((user.wait + waitTime - new Date()) / 1000)}s antes de volver a jugar.`;

  const opciones = ['piedra', 'papel', 'tijera'];
  const player = text.toLowerCase();

  // Si no puso ninguna opción, mandamos los botones
  if (!args[0] || !opciones.includes(player)) {
    return await conn.sendMessage(m.chat, {
      image: { url: pp },
      caption: `*💀 SISTEMA DE DECISIÓN: PPT LATAM 💀*\n\nSeleccioná tu jugada... pero recordá:\n*Una mala elección y... el destino se encarga...* 🕷️\n\n🗿 piedra\n📄 papel\n✂️ tijera`,
      buttons: [
        { buttonId: usedPrefix + command + ' piedra', buttonText: { displayText: '🗿 Piedra' }, type: 1 },
        { buttonId: usedPrefix + command + ' papel', buttonText: { displayText: '📄 Papel' }, type: 1 },
        { buttonId: usedPrefix + command + ' tijera', buttonText: { displayText: '✂️ Tijera' }, type: 1 },
      ],
      footer: '🕹️ FNaF LATAM - Sistema de juego',
      headerType: 4,
    }, { quoted: m });
  }

  // BOT juega aleatoriamente
  let bot = pickRandom(opciones);
  let result = '';
  let xp = 0;

  if (player === bot) {
    result = `🤖 *Empate técnico...*`;
    xp = 500;
  } else if (
    (player === 'piedra' && bot === 'tijera') ||
    (player === 'papel' && bot === 'piedra') ||
    (player === 'tijera' && bot === 'papel')
  ) {
    result = `🎉 *¡Victoria fulminante! El guardia sobrevive otra noche...*`;
    xp = 1000;
  } else {
    result = `☠️ *Derrota... El animatrónico ha ganado esta ronda.*`;
    xp = -300;
  }

  user.exp += xp;
  user.wait = new Date * 1;

  await conn.reply(m.chat, `
🎮 *PIEDRA, PAPEL O TIJERA - LATAM MODE*

👤 Tú elegiste: *${player}*
🤖 Bot eligió: *${bot}*

${result}
🎁 *XP ganada:* ${xp >= 0 ? '+' + xp : xp}
`.trim(), m);
};

handler.help = ['ppt'];
handler.tags = ['game'];
handler.command = ['ppt'];
handler.group = true;
handler.register = true;

export default handler;

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
