let cooldowns = {};

let handler = async (m, { conn }) => {
  let users = global.db.data.users;
  let senderId = m.sender;

  let tiempoEspera = 10 * 60;

  if (cooldowns[senderId] && Date.now() - cooldowns[senderId] < tiempoEspera * 1000) {
    let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[senderId] + tiempoEspera * 1000 - Date.now()) / 1000));
    return conn.reply(m.chat, `📡 *Control de Seguridad Freddy Fazbear's*\n\n🚷 Ya realizaste una misión del gremio hace poco.\n⏳ Esperá *${tiempoRestante}* antes de volver a arriesgarte en el sistema nocturno.`, m);
  }

  cooldowns[senderId] = Date.now();

  if (!users[senderId]) {
    users[senderId] = { health: 100, coin: 0, exp: 0 };
  }

  const eventos = [
    { nombre: '⚙️ Circuitos de Bonnie Roto', tipo: 'victoria', coin: randomNumber(20, 40), exp: randomNumber(10, 20), health: 0, mensaje: `💡 Lograste reparar parte del sistema de sonido. Se te paga en *${moneda}* por el riesgo.` },
    { nombre: '⚠️ Enfrentamiento con Foxy Corrupto', tipo: 'derrota', coin: randomNumber(-30, -10), exp: randomNumber(5, 10), health: randomNumber(-15, -5), mensaje: `🦊 Foxy te emboscó en el pasillo oeste. Escapaste, pero perdiste salud y *${moneda}*.` },
    { nombre: '🔥 Ataque del Dragón de Chatarra', tipo: 'victoria', coin: randomNumber(100, 150), exp: randomNumber(50, 80), health: 0, mensaje: `🛠️ En los túneles encontraste un montón de chatarra valiosa... ¡y *${moneda}* escondidos!` },
    { nombre: '🧟 Sombra de Springtrap', tipo: 'derrota', coin: randomNumber(-20, -10), exp: randomNumber(5, 10), health: randomNumber(-10, -5), mensaje: `👁️ Fuiste sorprendido por Springtrap. Perdiste algo de salud y *${moneda}*.` },
    { nombre: '💥 Ruinas del Animatrónico Alfa', tipo: 'victoria', coin: randomNumber(80, 120), exp: randomNumber(40, 60), health: 0, mensaje: `🦾 Excavaste las ruinas de un prototipo abandonado. ¡Encontraste *${moneda}*!` },
    { nombre: '🧌 Invasión de Glitchtraps', tipo: 'derrota', coin: randomNumber(-50, -20), exp: randomNumber(10, 20), health: randomNumber(-20, -10), mensaje: `💻 Varios Glitchtraps te rodearon. El sistema colapsó. Tu salud cayó.` },
    { nombre: '🛡️ Defensa contra Licántropos Nocturnos', tipo: 'victoria', coin: randomNumber(60, 100), exp: randomNumber(30, 50), health: 0, mensaje: `🌕 Los ahuyentaste con luces ultravioleta. Recompensado con *${moneda}* por tu valentía.` },
    { nombre: '🧲 Falla en el Sector 9', tipo: 'derrota', coin: randomNumber(-40, -15), exp: randomNumber(10, 20), health: randomNumber(-15, -5), mensaje: `📉 La energía colapsó. Tu traje sufrió daños y perdiste salud y *${moneda}*.` },
    { nombre: '👻 Entidad del Monitor 3', tipo: 'victoria', coin: randomNumber(30, 50), exp: randomNumber(20, 40), health: 0, mensaje: `📺 Lograste expulsar una entidad de las cámaras. Recompensa entregada en *${moneda}*.` },
    { nombre: '🧊 Anomalía Fría - Sector Congelado', tipo: 'derrota', coin: randomNumber(-60, -20), exp: randomNumber(15, 30), health: randomNumber(-25, -10), mensaje: `❄️ Fuiste atrapado por el sistema criogénico. Tu cuerpo sufre daños.` },
    { nombre: '🐍 Restos de Ennard', tipo: 'victoria', coin: randomNumber(90, 130), exp: randomNumber(50, 80), health: 0, mensaje: `🧩 Recolectaste piezas de Ennard. Eran valiosas. ¡+${moneda}!` },
    { nombre: '⚔️ Duelo con el Vigilante Corrupto', tipo: 'derrota', coin: randomNumber(-30, -10), exp: randomNumber(5, 10), health: randomNumber(-15, -5), mensaje: `🧍 El vigilante nocturno perdió el control. Tuviste que huir herido.` },
    { nombre: '🔮 Sala del Ritual Incompleto', tipo: 'troll', coin: 0, exp: randomNumber(20, 40), health: randomNumber(-10, -5), mensaje: `🧙 Una presencia oscura te dio experiencia... pero también dolor de cabeza.` },
    { nombre: '🚨 Sirenas del Sistema', tipo: 'troll', coin: 0, exp: randomNumber(15, 30), health: randomNumber(-5, -3), mensaje: `🔊 La alarma se activó por error. Te dio un buen susto y estrés.` },
    { nombre: '🐊 Caza del Monty Salvaje', tipo: 'victoria', coin: randomNumber(50, 80), exp: randomNumber(30, 50), health: 0, mensaje: `🎸 Derrotaste a Monty en su zona. Recibes recompensa en *${moneda}*.` },
  ];

  let evento = eventos[Math.floor(Math.random() * eventos.length)];

  if (evento.tipo === 'victoria') {
    users[senderId].coin += evento.coin;
    users[senderId].exp += evento.exp;
    users[senderId].health += evento.health;
  } else if (evento.tipo === 'derrota') {
    users[senderId].coin += evento.coin;
    users[senderId].exp += evento.exp;
    users[senderId].health -= evento.health;
  } else if (evento.tipo === 'troll') {
    users[senderId].exp += evento.exp;
    users[senderId].health -= evento.health;
  }

  let img = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745557967796.jpeg';
  let info = `
╭─🎮 〔 *Misión FNaF LATAM - Gremio Técnico* 〕
│📌 Evento: *${evento.nombre}*
│📖 Resultado: ${evento.mensaje}
│📦 Recompensas:
│   ┣ 💸 ${evento.coin > 0 ? '+' : '-'}${Math.abs(evento.coin)} *${moneda}*
│   ┣ ✨ +${evento.exp} *XP*
│   ┗ ❤️ ${evento.health < 0 ? '-'+Math.abs(evento.health)+' Salud' : 'Sin cambios'}
╰───────────────────────

🛑 *Recuerda mantener el sistema estable o Freddy se despertará...*
`;

  await conn.sendFile(m.chat, img, 'gremio_fnaf.jpg', info, fkontak);
  await global.db.write();
};

handler.tags = ['rpg'];
handler.help = ['gremio'];
handler.command = ['gremio', 'mision'];
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
