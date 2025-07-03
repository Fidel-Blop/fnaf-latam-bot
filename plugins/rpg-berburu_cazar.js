const handler = async (m, { conn }) => {
  const user = global.db.data.users[m.sender];

  // Tiempo de espera: 45 minutos
  const tiempoRestante = user.lastberburu + 2700000;
  if (new Date - user.lastberburu < 2700000) {
    const tiempo = clockString(tiempoRestante - new Date());
    return conn.reply(m.chat, `⚠️ *[PROTOCOLO DE DESCANSO]*\n\n⛔ Unidad cazadora en enfriamiento.\n🕒 Tiempo restante: *${tiempo}*\n\n— Sistema respaldado por FNaF LATAM™`, m);
  }

  const resultados = generarResultados();

  // 🕒 Secuencia de mensajes simulando proceso
  setTimeout(() => conn.reply(m.chat, `🎯 Fazbear Wildlife Surveillance — Objetivo fijado\n\nIniciando escaneo de terreno...`, m), 0);
  setTimeout(() => conn.reply(m.chat, `🔧 Armas sincronizadas. Ajustando parámetros de ataque...`, m), 15000);
  setTimeout(() => conn.reply(m.chat, `📍 Se detectaron signos térmicos de fauna animatrónica.\nIniciando captura digital...`, null, { mentions: [m.sender] }), 18000);
  setTimeout(() => conn.reply(m.chat, resultados.texto, m), 20000);

  // 🧠 Registro en base de datos
  user.banteng += resultados.datos[0];
  user.harimau += resultados.datos[1];
  user.gajah += resultados.datos[2];
  user.kambing += resultados.datos[3];
  user.panda += resultados.datos[4];
  user.buaya += resultados.datos[5];
  user.kerbau += resultados.datos[6];
  user.sapi += resultados.datos[7];
  user.monyet += resultados.datos[8];
  user.babihutan += resultados.datos[9];
  user.babi += resultados.datos[10];
  user.ayam += resultados.datos[11];

  user.lastberburu = new Date * 1;
};

handler.help = ['cazar'];
handler.tags = ['rpg'];
handler.command = ['cazar', 'hunt', 'berburu'];
handler.group = true;
handler.register = true;

export default handler;

// Función de resultados
function generarResultados() {
  let especies = [
    '🐂', '🐅', '🐘', '🐐', '🐼', '🐊', '🐃', '🐮', '🐒', '🐗', '🐖', '🐓'
  ];
  let armas = ['🪚', '⛏️', '🧨', '💣', '🔫', '🔪', '🗡️', '🏹', '🦾', '🥊', '🧹', '🔨', '🛻'];

  let texto = `📡 *Fazbear Caza Monitoreada v1.9.8* 📡\n\n`;
  texto += `🎖️ Unidad: @${global.db.data?.users?.[m.sender]?.name || m.sender.split('@')[0]}\n`;
  texto += `🎯 Resultados obtenidos:\n\n`;

  let datos = [];
  for (let i = 0; i < especies.length; i++) {
    let cantidad = Math.floor(Math.random() * 5);
    let arma = armas[Math.floor(Math.random() * armas.length)];
    datos.push(cantidad);
    texto += `🦴 ${especies[i]} ${arma} × ${cantidad}\n`;
  }

  texto += `\n💾 Información registrada correctamente.\n— Sistema respaldado por FNaF LATAM™`;

  return { texto: texto.trim(), datos };
}

// Conversión de milisegundos a HH:mm:ss
function clockString(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor(ms / 60000) % 60;
  const s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}
