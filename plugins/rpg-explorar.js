let cooldowns = {};

let handler = async (m, { conn, text, command }) => {
  let users = global.db.data.users;
  let senderId = m.sender;

  let tiempoEspera = 5 * 60;

  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
    let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000));
    return m.reply(`🟨 Sistema de Patrullaje:\n\n⚠️ Área forestal aún en estado de enfriamiento.\n⏳ Tiempo restante: *${tiempoRestante}*\n\n— Protocolo FazWatch™`);
  }

  cooldowns[m.sender] = Date.now();

  if (!users[senderId]) {
    users[senderId] = { health: 100, coin: 0, exp: 0 };
  }

  const eventos = [
    { nombre: '📦 Tesoro Abandonado', coin: 100, exp: 50, health: 0, mensaje: `📡 Caja sellada localizada... contenido: *${moneda}* asegurado.` },
    { nombre: '🧸 Ataque de Fredbear Salvaje', coin: -50, exp: 20, health: -10, mensaje: `⚠️ Te emboscó una figura animatrónica descontrolada. Monedas perdidas durante el escape.` },
    { nombre: '🕸️ Trampa del Sistema', coin: 0, exp: 10, health: 0, mensaje: '⚙️ Caíste en un bucle de seguridad abandonado. Lograste salir... por ahora.' },
    { nombre: '🔮 Núcleo de Energía Fazbear', coin: 200, exp: 100, health: 0, mensaje: `✨ Anomalía detectada: Energía remanente absorbida. ${moneda} incrementados.` },
    { nombre: '📚 Registro de un Técnico', coin: 50, exp: 30, health: 0, mensaje: '📖 Hallaste los diarios de un ex técnico... información valiosa intercambiada por recursos.' },
    { nombre: '⚔️ Marioneta Hostil', coin: -30, exp: 15, health: -10, mensaje: `🟥 La Marioneta te atacó desde las sombras. ${moneda} fueron absorbidos.` },
    { nombre: '🍄 Fungis Glitcheados', coin: 0, exp: 5, health: 0, mensaje: '🧪 Comiste hongos con código corrupto... No pasó nada visible (aún).' }
  ];

  let evento = eventos[Math.floor(Math.random() * eventos.length)];

  users[senderId].coin += evento.coin;
  users[senderId].exp += evento.exp;
  users[senderId].health += evento.health;

  let img = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745557951898.jpeg';

  let info = `
🟣 ⧼ Exploración en el Bosque ⧽
🔍 Unidad de Patrullaje activa...

🗂️ Evento: *${evento.nombre}*
📝 Informe: ${evento.mensaje}

🎖️ Recompensas:
${evento.coin >= 0 ? '✅' : '❌'} ${evento.coin >= 0 ? '+' : '-'}${Math.abs(evento.coin)} ${moneda}
📈 +${evento.exp} XP
❤️ ${evento.health < 0 ? `Salud reducida en ${Math.abs(evento.health)} puntos` : 'Sin daño registrado'}

📡 Freddy Fazbear Field Monitoring v1.9.3 activo
— Sistema respaldado por FNaF LATAM™`;

  await conn.sendFile(m.chat, img, 'exploracion.jpg', info.trim(), fkontak);

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
