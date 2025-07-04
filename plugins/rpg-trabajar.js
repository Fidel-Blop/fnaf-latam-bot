let cooldowns = {}

function segundosAHMS(segundos) {
  let minutos = Math.floor(segundos / 60);
  let segundosRestantes = segundos % 60;
  return `${minutos} minutos y ${segundosRestantes} segundos`;
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

let handler = async (m, { conn, isPrems }) => {
  const users = global.db.data.users;
  const senderId = m.sender;
  const senderName = await conn.getName(senderId);
  const cooldownTime = 1 * 60 * 1000; // 1 minuto

  if (cooldowns[senderId] && Date.now() - cooldowns[senderId] < cooldownTime) {
    const timeLeft = segundosAHMS(Math.ceil((cooldowns[senderId] + cooldownTime - Date.now()) / 1000));
    return conn.reply(
      m.chat,
      `⏳ Freddy Fazbear Security Protocol v1.3.7

🚨 ALERTA: Protocolo de trabajo bloqueado.

Debe esperar *${timeLeft}* antes de reactivar *#w*.

...Monitoreo activo... --::SEQUENCE_BREAK::--`,
      m
    );
  }

  cooldowns[senderId] = Date.now();

  const ganancia = Math.floor(Math.random() * 500) + 1;
  users[senderId].coin = (users[senderId].coin || 0) + ganancia;

  const escenario = pickRandom(trabajo);
  await conn.reply(
    m.chat,
    `🎭 Freddy Fazbear Work Unit 🧑‍💼

👤 Operador: ${senderName}
🕒 Tiempo registrado: ${new Date().toLocaleTimeString()}

🚧 *${escenario}* *${toNum(ganancia)}* ( *${ganancia}* ) ${global.moneda || '¥enes'} 💸.

— Sistema respaldado por FNaF LATAM™`,
    m
  );
};

// Función para abreviar números grandes
function toNum(number) {
  if (number >= 1000 && number < 1000000) {
    return (number / 1000).toFixed(1) + 'k';
  } else if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  } else if (number <= -1000 && number > -1000000) {
    return (number / 1000).toFixed(1) + 'k';
  } else if (number <= -1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  } else {
    return number.toString();
  }
}

const trabajo = [
  "Trabajas como cortador de galletas y ganas",
  "Trabaja para una empresa militar privada, ganando",
  "Organiza un evento de cata de vinos y obtienes",
  "Limpias la chimenea y encuentras",
  "Desarrollas juegos para ganarte la vida y ganas",
  "Trabajaste en la oficina horas extras por",
  "Trabajas como secuestrador de novias y ganas",
  "Alguien vino y representó una obra de teatro. Por mirar te dieron",
  "Compraste y vendiste artículos y ganaste",
  "Trabajas en el restaurante de la abuela como cocinera y ganas",
  "Trabajas 10 minutos en un Pizza Hut local. Ganaste",
  "Trabajas como escritor(a) de galletas de la fortuna y ganas",
  "Revisas tu bolso y decides vender algunos artículos inútiles que no necesitas. Resulta que toda esa basura valía",
  "Trabajas todo el día en la empresa por",
  "Diseñaste un logo para una empresa por",
  "¡Trabó lo mejor que pudo en una imprenta que estaba contratando y ganó su bien merecido!",
  "Trabajas como podador de arbustos y ganas",
  "Trabajas como actor de voz para Bob Esponja y te las arreglaste para ganar",
  "Estabas cultivando y Ganaste",
  "Trabajas como constructor de castillos de arena y ganas",
  "Trabajas como artista callejera y ganas",
  "¡Hiciste trabajo social por una buena causa! por tu buena causa Recibiste",
  "Reparaste un tanque T-60 averiado en Afganistán. La tripulación te pagó",
  "Trabajas como ecologista de anguilas y ganas",
  "Trabajas en Disneyland como un panda disfrazado y ganas",
  "Reparas las máquinas recreativas y recibes",
  "Hiciste algunos trabajos ocasionales en la ciudad y ganaste",
  "Limpias un poco de moho tóxico de la ventilación y ganas",
  "Resolviste el misterio del brote de cólera y el gobierno te recompensó con una suma de",
  "Trabajas como zoólogo y ganas",
  "Vendiste sándwiches de pescado y obtuviste",
  "Reparas las máquinas recreativas y recibes",
  // Nuevos escenarios FNaF LATAM™
  "Monitoreaste cámaras de seguridad en Freddy Fazbear’s y recibiste",
  "Reiniciaste el sistema de vigilancia corrupto y te pagaron",
  "Realizaste mantenimiento en las animatrónicas defectuosas y ganaste",
  "Capturaste movimientos sospechosos y te recompensaron con",
  "Registraste fallas en los sensores de movimiento y te dieron",
  "Interrumpiste un intento de sabotaje y te abonaron",
  "Desactivaste alarmas falsas y ganaste",
  "Revisaste grabaciones en bucle y obtuviste",
  "Rescataste datos corruptos del servidor central y recibiste",
  "Entrenaste a una nueva unidad FazWatch y ganaste",
  "Completaste Hopeless Pursuit en vivo y tus seguidores te premiaron y ganaste",
  "Alcanzaste el puntaje máximo en Fruity Maze. Dominaste el juego y fuiste recompensado con"

handler.command = ['w', 'work', 'chambear', 'chamba', 'trabajar'
handler.help = ['w'];
handler.tags = ['economy'];
handler.group = true;
handler.register = true;
];
export default handler;
