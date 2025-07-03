let cooldowns = {};

let handler = async (m, { conn }) => {
  let users = global.db.data.users;
  let senderId = m.sender;

  let tiempoEspera = 10 * 60;

  if (cooldowns[senderId] && Date.now() - cooldowns[senderId] < tiempoEspera * 1000) {
    let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[senderId] + tiempoEspera * 1000 - Date.now()) / 1000));
    return conn.reply(m.chat, `📡 Sistema de Misiones – Gremio FNaF LATAM™\n\n⚠️ Ya ejecutaste una incursión recientemente.\n🕐 Tiempo estimado para reactivar protocolo: *${tiempoRestante}*\n\n— Monitoreo en curso...`, m);
  }

  cooldowns[senderId] = Date.now();

  if (!users[senderId]) {
    users[senderId] = { health: 100, coin: 0, exp: 0 };
  }

  const eventos = [
    { nombre: '☠️ Incidente con Endoesqueleto Glitcheado', tipo: 'derrota', coin: randomNumber(-30, -10), exp: randomNumber(5, 10), health: randomNumber(-15, -5), mensaje: `⚠️ El endoesqueleto falló... te atacó inesperadamente. Recursos perdidos.` },
    { nombre: '🟦 Eliminación de Marioneta Hostil', tipo: 'victoria', coin: randomNumber(100, 150), exp: randomNumber(50, 80), health: 0, mensaje: `✅ Marioneta neutralizada. Recompensa enviada al operador.` },
    { nombre: '🔧 Reparación de conducto de ventilación', tipo: 'victoria', coin: randomNumber(20, 40), exp: randomNumber(10, 20), health: 0, mensaje: `🔩 Conducto restaurado con éxito. Créditos asignados por mantenimiento.` },
    { nombre: '🔥 Falla de seguridad en zona oeste', tipo: 'derrota', coin: randomNumber(-50, -20), exp: randomNumber(10, 20), health: randomNumber(-20, -10), mensaje: `🚨 Fuiste atrapado en una explosión de energía. Múltiples daños recibidos.` },
    { nombre: '🧠 Contacto con unidad AI deteriorada', tipo: 'troll', coin: 0, exp: randomNumber(20, 40), health: randomNumber(-10, -5), mensaje: `📀 La IA comenzó a hablar en bucle. Sufriste daños mentales... pero ganaste sabiduría.` },
    { nombre: '📦 Recuperación de Núcleo de Energía Fazbear', tipo: 'victoria', coin: randomNumber(80, 120), exp: randomNumber(40, 60), health: 0, mensaje: `🔋 Núcleo rescatado con éxito. Transferencia directa de ${moneda} iniciada.` },
    { nombre: '🧃 Incursión a cocina abandonada', tipo: 'troll', coin: 0, exp: randomNumber(15, 30), health: randomNumber(-5, -3), mensaje: `🥫 Comiste comida en descomposición. No era la mejor idea.` },
    { nombre: '❄️ Dragón criogénico liberado', tipo: 'derrota', coin: randomNumber(-60, -20), exp: randomNumber(15, 30), health: randomNumber(-25, -10), mensaje: `❄️ El dragón congeló tus sistemas. Recursos comprometidos.` },
    { nombre: '🎯 Caza del Animatrónico Errante', tipo: 'victoria', coin: randomNumber(90, 130), exp: randomNumber(50, 80), health: 0, mensaje: `🎯 Objetivo localizado y eliminado. Premios transferidos al inventario.` }
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
🟥 PROTOCOLO DE MISIÓN ACTIVADO
Unidad: *Operador Reconocido*

📂 Misión: *${evento.nombre}*
📡 Registro: ${evento.mensaje}

📈 Informe de resultados:
💸 ${evento.coin >= 0 ? '+' : '-'}${Math.abs(evento.coin)} ${moneda}
🔧 +${evento.exp} XP
❤️ ${evento.health < 0 ? `Daño recibido: ${Math.abs(evento.health)} puntos` : 'Sin daños reportados'}

🔐 Archivo auditado por FazWatch™
— Sistema respaldado por FNaF LATAM™`;

  await conn.sendFile(m.chat, img, 'gremio.jpg', info.trim(), fkontak);

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
