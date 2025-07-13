let cooldowns = {};

let handler = async (m, { conn, text, command }) => {
  let users = global.db.data.users;
  let senderId = m.sender;

  let tiempoEspera = 5 * 60; // 5 minutos de espera

  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
    let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000));
    m.reply(`🕯️ *Exploración fallida*\n\n🔒 El sistema de seguridad aún está en revisión...\n\n⏳ Regresa en *${tiempoRestante}* para volver a ingresar a los pasillos del bosque encantado.`);
    return;
  }

  cooldowns[m.sender] = Date.now();

  if (!users[senderId]) {
    users[senderId] = { health: 100, coin: 0, exp: 0 };
  }

  const eventos = [
    { nombre: '🎁 Cofre del Marionetista', coin: 100, exp: 50, health: 0, mensaje: `🔓 Abriste un cofre entre telarañas y encontraste *${moneda}*.` },
    { nombre: '👹 Sombra de Withered Freddy', coin: -50, exp: 20, health: -10, mensaje: `👁️ Una sombra antigua te golpeó en la oscuridad. Perdiste algunas *${moneda}* al escapar.` },
    { nombre: '🕸️ Trampa en el Backstage', coin: 0, exp: 10, health: 0, mensaje: '💥 Piso falso activado. Te atrapó por un momento, pero lograste salir a tiempo.' },
    { nombre: '🔮 Roca Energética', coin: 200, exp: 100, health: 0, mensaje: `✨ Una roca luminosa te otorgó *${moneda}* al tocarla... parece que estaba encantada.` },
    { nombre: '🎩 Viejo Vigilante', coin: 50, exp: 30, health: 0, mensaje: '📼 Un antiguo guardia nocturno te compartió secretos del local. Le agradeces con atención y recibes una recompensa.' },
    { nombre: '⚠️ Animatrónico Corrupto', coin: -30, exp: 15, health: -10, mensaje: `⚡ Uno de los modelos antiguos intentó atacarte. Escapaste, pero perdiste algunas *${moneda}* en el proceso.` },
    { nombre: '🍄 Pastillas Experimentales', coin: 0, exp: 5, health: 0, mensaje: '💊 Encontraste unas cápsulas extrañas. No hicieron efecto aparente... por ahora.' }
  ];

  let evento = eventos[Math.floor(Math.random() * eventos.length)];

  users[senderId].coin += evento.coin;
  users[senderId].exp += evento.exp;
  users[senderId].health += evento.health;

  let img = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745557951898.jpeg';
  let info = `
╭─🎮 〔 *ZONA DE EXPLORACIÓN - FAZBEAR'S FOREST* 〕
│🕯️ Evento: *${evento.nombre}*
│📜 Detalles: ${evento.mensaje}
│📦 Recompensas:
│   ┣ 💸 ${evento.coin > 0 ? '+' : '-'}${Math.abs(evento.coin)} *${moneda}*
│   ┣ ✨ +${evento.exp} *XP*
│   ┗ ❤️ ${evento.health < 0 ? '-'+Math.abs(evento.health)+' Salud' : 'Sin cambios'}
╰───────────────────────

👁️ *Ten cuidado donde pisas... el bosque respira.*`;

  await conn.sendFile(m.chat, img, 'exploracion_fnaf.jpg', info, fkontak);

  global.db.write();
};

handler.tags = ['rpg'];
handler.help = ['explorar'];
handler.command = ['explorar', 'bosque'];
handler.register = true;
handler.group = true;

export default handler;

function segundosAHMS(segundos) {
  let minutos = Math.floor(segundos / 60);
  let segundosRestantes = segundos % 60;
  return `${minutos} minutos y ${segundosRestantes} segundos`;
}
