const handler = async (m, { isPrems, conn }) => {
  if (!global.db.data.users[m.sender]) {
    throw `${emoji4} Usuario desconocido en la base de datos de FNaF LATAM.`;
  }

  const lastCofreTime = global.db.data.users[m.sender].lastcofre;
  const timeToNextCofre = lastCofreTime + 86400000;

  if (Date.now() < timeToNextCofre) {
    const tiempoRestante = timeToNextCofre - Date.now();
    const mensajeEspera = `${emoji3} Ya has reclamado tu cofre diario.\n⏰ Regresa en: *${msToTime(tiempoRestante)}* para desafiar a los animatrónicos otra vez.`;
    await conn.sendMessage(m.chat, { text: mensajeEspera }, { quoted: m });
    return;
  }

  const img = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745557947304.jpeg';
  const monedas = Math.floor(Math.random() * 100);
  const tokens = Math.floor(Math.random() * 10);
  const diamantes = Math.floor(Math.random() * 40);
  const exp = Math.floor(Math.random() * 5000);

  global.db.data.users[m.sender].coin += monedas;
  global.db.data.users[m.sender].diamonds += diamantes;
  global.db.data.users[m.sender].joincount += tokens;
  global.db.data.users[m.sender].exp += exp;
  global.db.data.users[m.sender].lastcofre = Date.now();

  const texto = `
╭━━━〔 🎁 Cofre Misterioso FNaF LATAM 〕━━⬣
┃ 📦 ¡Has abierto un cofre... ¿qué secretos esconde?
┃ 🔥 ¡Felicidades, sobreviviente!
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⬣

╭━━━〔 Recompensas obtenidas 〕━━━━━━━━⬣
┃ 💸 Monedas: *${monedas} ${moneda}*
┃ ⚜️ Tokens: *${tokens}*
┃ 💎 Diamantes: *${diamantes}*
┃ ✨ Experiencia: *${exp}*
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⬣

⚠️ Recuerda, cada día te espera un nuevo desafío en la oscuridad...`;

  try {
    await conn.sendFile(m.chat, img, 'cofre_fnaf.jpg', texto, fkontak);
  } catch (error) {
    throw `⚠️ Ocurrió un error al enviar tu cofre misterioso. Intenta nuevamente.`;
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
  const milliseconds = parseInt((duration % 1000) / 100);
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;

  return `${hours} Horas ${minutes} Minutos`;
}
