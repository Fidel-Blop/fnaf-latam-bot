const handler = async (m, { conn }) => {
  if (!global.db.data.users[m.sender]) {
    throw `⚠️ ##ERROR## Usuario no registrado en la base de datos. Contacte al operador.`;
  }

  const user = global.db.data.users[m.sender];
  const lastCofre = user.lastcofre || 0;
  const nextCofre = lastCofre + 86400000; // 24h cooldown

  if (Date.now() < nextCofre) {
    const tiempoRestante = nextCofre - Date.now();
    const espera = msToTime(tiempoRestante);
    const aviso = `⏳ Sistema de vigilancia activado 👁️\n` +
      `--::SEQUENCE_BREAK::--\n` +
      `Monitoreo FNaF LATAM: Cofre ya reclamado\n` +
      `📡 Tiempo para siguiente acceso: *${espera}*\n` +
      `— Sistema respaldado por FNaF LATAM™`;
    return await conn.sendMessage(m.chat, { text: aviso }, { quoted: m });
  }

  // Generación de recursos aleatorios con fluctuaciones de sistema
  const img = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745557947304.jpeg';
  const recursos = {
    coin: Math.floor(Math.random() * 100),
    tokens: Math.floor(Math.random() * 10),
    diamonds: Math.floor(Math.random() * 40),
    exp: Math.floor(Math.random() * 5000),
  };

  user.coin += recursos.coin;
  user.joincount += recursos.tokens;
  user.diamonds += recursos.diamonds;
  user.exp += recursos.exp;
  user.lastcofre = Date.now();

  const texto = `
╭━〔 Freddy Fazbear Security Protocol v1.3.7 activado ⛓️ 〕⬣
┃ 📦 Cofre Aleatorio - Unidad de Observación Conectada 🎥
┃
┃ • 💸 Créditos: *${recursos.coin} ${moneda}*
┃ • ⚜️ Tokens: *${recursos.tokens}*
┃ • 💎 Diamantes: *${recursos.diamonds}*
┃ • ✨ Experiencia: *${recursos.exp}*
┃
┃ -- Sistema FazWatch asegura la integridad de recursos --
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━⬣

— Sistema respaldado por FNaF LATAM™`;

  try {
    await conn.sendFile(m.chat, img, 'cofre.jpg', texto, m);
  } catch {
    throw `⚠️ ##ERROR## Fallo en la transferencia de datos. Intentelo más tarde.`;
  }
};

handler.help = ['cofre'];
handler.tags = ['rpg'];
handler.command = ['cofre'];
handler.level = 5;
handler.group = true;
handler.register = true;

export default handler;

function msToTime(duration) {
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  return `${hours} Horas ${minutes} Minutos`;
}
