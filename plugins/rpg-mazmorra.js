let cooldowns = {};

let handler = async (m, { conn, usedPrefix, command }) => {
  let users = global.db.data.users;
  let senderId = m.sender;

  let tiempoEspera = 8 * 60; // 8 minutos de cooldown

  if (cooldowns[senderId] && Date.now() - cooldowns[senderId] < tiempoEspera * 1000) {
    let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[senderId] + tiempoEspera * 1000 - Date.now()) / 1000));
    return conn.reply(m.chat, `⏳ *¡Alerta de Freddy!* Ya exploraste las mazmorras hace poco.\n⏲️ Espera *${tiempoRestante}* antes de aventurarte otra vez.`, m);
  }

  cooldowns[senderId] = Date.now();

  if (!users[senderId]) {
    users[senderId] = { health: 100, coin: 0, exp: 0 };
  }

  const eventos = [
    { nombre: 'Mazmorras de los Caídos', tipo: 'victoria', coin: randomNumber(150, 300), exp: randomNumber(50, 100), health: 0, mensaje: `🏆 ¡Guardia derrotado! Al abrir su cofre, encontraste un botín de ${moneda}.` },
    { nombre: 'Cámara de los Espectros', tipo: 'derrota', coin: randomNumber(-70, -40), exp: randomNumber(10, 20), health: randomNumber(-15, -5), mensaje: `👻 Un espectro te atrapó en sus sombras. Perdiste algunas ${moneda} intentando escapar.` },
    { nombre: 'Cripta del Olvido', tipo: 'victoria', coin: randomNumber(250, 400), exp: randomNumber(100, 150), health: 0, mensaje: `💎 Tesoro ancestral descubierto, lleno de gemas y ${moneda}.` },
    { nombre: 'Trampa del Laberinto', tipo: 'trampa', coin: 0, exp: randomNumber(5, 10), health: 0, mensaje: `🚧 Activaste una trampa, pero escapaste ileso sin ganancias.` },
    { nombre: 'Cámara de los Demonios', tipo: 'derrota', coin: randomNumber(-150, -80), exp: randomNumber(20, 40), health: randomNumber(-30, -20), mensaje: `🐉 Un demonio feroz te emboscó. Lograste escapar, pero con heridas y pérdidas.` },
    { nombre: 'Santuario de la Luz', tipo: 'victoria', coin: randomNumber(100, 200), exp: randomNumber(30, 60), health: 0, mensaje: `✨ Encontraste un cofre radiante con riquezas brillantes.` },
    { nombre: 'Laberinto de los Perdidos', tipo: 'trampa', coin: 0, exp: randomNumber(5, 15), health: 0, mensaje: `🌀 Perdiste tiempo en un laberinto confuso, sin recompensa.` },
    { nombre: 'Ruinas de los Caídos', tipo: 'victoria', coin: randomNumber(150, 300), exp: randomNumber(70, 120), health: 0, mensaje: `🏺 Artefactos antiguos brillan y te recompensan.` },
    { nombre: 'Guarida del Dragón', tipo: 'derrota', coin: randomNumber(-200, -100), exp: randomNumber(20, 40), health: randomNumber(-30, -20), mensaje: `🔥 Llamarada de dragón te golpeó. Escapaste con heridas y pérdidas.` },
    { nombre: 'Sabio de la Mazmora', tipo: 'victoria', coin: randomNumber(50, 100), exp: randomNumber(30, 50), health: 0, mensaje: `🧙‍♂️ Un sabio comparte sus historias y te recompensa.` },
  ];

  let evento = eventos[Math.floor(Math.random() * eventos.length)];

  if (evento.tipo === 'victoria') {
    users[senderId].coin += evento.coin;
    users[senderId].exp += evento.exp;
    users[senderId].health += evento.health;
  } else if (evento.tipo === 'derrota') {
    users[senderId].coin += evento.coin;
    users[senderId].exp += evento.exp;
    users[senderId].health += evento.health;
  } else if (evento.tipo === 'trampa') {
    users[senderId].exp += evento.exp;
  }

  let img = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745558209798.jpeg';
  let info = `╭━〔 🕹️ Mazmorras de FNaF LATAM 〕\n` +
             `┃🔎 Misión: *${evento.nombre}*\n` +
             `┃💬 Evento: ${evento.mensaje}\n` +
             `┃🎁 Recompensa: ${evento.coin > 0 ? '+' : '-'}${Math.abs(evento.coin)} *${moneda}* y +${evento.exp} *XP*\n` +
             `┃❤️ Salud: ${evento.health < 0 ? 'perdiste ' + Math.abs(evento.health) : 'sin cambios'}\n` +
             `╰━━━━━━━━━━━━⬣`;

  await conn.sendFile(m.chat, img, 'mazmorras-fnaf.jpg', info, fkontak);

  global.db.write();
};

handler.tags = ['rpg'];
handler.help = ['explorar'];
handler.command = ['dungeon', 'mazmorra', 'cueva'];
handler.register = true;
handler.group = true;

export default handler;

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function segundosAHMS(segundos) {
  let minutos = Math.floor(segundos / 60);
  let segundosRestantes = segundos % 60;
  return `${minutos} minutos y ${segundosRestantes} segundos`;
}
