import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender];
  let img = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745557963353.jpeg';

  if (!user) {
    return conn.reply(m.chat, `⚠️ [ERROR 404] - Usuario no identificado por el sistema de registros Fazbear.`, m);
  }

  if (user.health < 80) {
    return conn.reply(m.chat, `💔 Salud insuficiente para ejecutar protocolo de incursión.\n📍 Usa *.heal* para estabilizar integridad biológica.`, m);
  }

  if (user.lastAdventure && new Date() - user.lastAdventure <= 1500000) {
    let timeLeft = 1500000 - (new Date() - user.lastAdventure);
    return conn.reply(m.chat, `🔁 *Reintento denegado.* Sistema de enfriamiento activo.\n⌛ Tiempo restante: ${msToTime(timeLeft)}`, m);
  }

  let kingdoms = [
    'Sector E | Eldoria',
    'Sector D | Drakonia',
    'Zona A12 | Arkenland',
    'Área 47 | Valoria',
    'Bosque Prohibido | Mystara',
    'Dominios de Ferelith',
    'Zona C3 | Thaloria',
    'Nimboria Inactiva',
    'Ruinas de Galadorn',
    'Elenaria — Red de túneles'
  ];
  let randomKingdom = pickRandom(kingdoms);
  let coin = pickRandom([20, 5, 7, 8, 88, 40, 50, 70, 90, 999, 300]);
  let emerald = pickRandom([1, 5, 7, 8]);
  let iron = pickRandom([5, 6, 7, 9, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80]);
  let gold = pickRandom([20, 5, 7, 8, 88, 40, 50]);
  let coal = pickRandom([20, 5, 7, 8, 88, 40, 50, 80, 70, 60, 100, 120, 600, 700, 64]);
  let stone = pickRandom([200, 500, 700, 800, 900, 4000, 300]);
  let diamonds = pickRandom([1, 2, 3, 4, 5]);
  let exp = pickRandom([10, 20, 30, 40, 50]);

  // Recompensas aplicadas
  user.coin += coin;
  user.emerald += emerald;
  user.iron += iron;
  user.gold += gold;
  user.coal += coal;
  user.stone += stone;
  user.diamonds += diamonds;
  user.exp += exp;
  user.health -= 50;
  user.lastAdventure = new Date();

  if (user.health < 0) user.health = 0;

  let reporte = `
🎮 *FAZBEAR PROTOCOL - EXPEDIENTE DE INCURSIÓN*

🎯 *Zona Explorada:* ${randomKingdom}
📡 *Estado de la Misión:* ✔️ Finalizada con éxito

💰 *Ganancias Obtenidas:*
• ${coin} ${moneda}
♦️ Esmeralda: ${emerald}
🔩 Hierro: ${iron}
🏅 Oro: ${gold}
🕋 Carbón: ${coal}
🪨 Piedra: ${stone}
💎 Diamantes: ${diamonds}
✨ Experiencia: ${exp} XP

❤️ *Salud Residual:* ${user.health}/100

📁 *Nota del Sistema:* Integridad del usuario reducida. Se recomienda aplicar comando *.heal*

— Sistema respaldado por FNaF LATAM™
`.trim();

  await conn.sendFile(m.chat, img, 'fazwatch-aventura.jpg', reporte, fkontak);
};

handler.help = ['aventura', 'adventure'];
handler.tags = ['rpg'];
handler.command = ['aventura', 'adventure'];
handler.group = true;
handler.register = true;
handler.cooldown = 1500000;

export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function msToTime(duration) {
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let seconds = Math.floor((duration / 1000) % 60);
  return `${minutes}m ${seconds}s`;
}
