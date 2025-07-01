let handler = async (m, { conn }) => {
  const iqScan = pickRandom(global.iq);
  const mensaje = `📡 *Monitoreo FNaF LATAM™ - Unidad Cognitiva* ⚙️\n\n🧠 Iniciando escaneo neural...\n⛓️ Analizando impulsos cerebrales...\n🔍 Procesando...\n\n🧠 *Resultado del escaneo de IQ:*\n${iqScan}\n\n📁 *Observación:* Lectura obtenida por el sistema deteriorado de Freddy Fazbear Entertainment™. Sujeto puede presentar anomalías.\n\n👁 *Sistema de vigilancia firmado por FNaF LATAM™*`;

  conn.reply(m.chat, mensaje, m);
};

handler.help = ['iqtest'];
handler.tags = ['fun'];
handler.command = ['iqtest', 'iq'];
handler.group = true;
handler.register = true;
handler.fail = null;

export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

global.iq = [
  '📊 Tu IQ es de: *1* 🧱',
  '📊 Tu IQ es de: *14* 🐢',
  '📊 Tu IQ es de: *23* 💡',
  '📊 Tu IQ es de: *35* 🕸',
  '📊 Tu IQ es de: *41* 📎',
  '📊 Tu IQ es de: *50* 🔋',
  '📊 Tu IQ es de: *67* 🧃',
  '📊 Tu IQ es de: *72* ⚙️',
  '📊 Tu IQ es de: *86* 🔍',
  '📊 Tu IQ es de: *99* 🧠',
  '📊 Tu IQ es de: *150* 🦾',
  '📊 Tu IQ es de: *340* 🧬',
  '📊 Tu IQ es de: *423* ⚡',
  '📊 Tu IQ es de: *500* 🧪',
  '📊 Tu IQ es de: *676* 🛰️',
  '📊 Tu IQ es de: *780* 👁‍🗨',
  '📊 Tu IQ es de: *812* 📡',
  '📊 Tu IQ es de: *945* 🧩',
  '📊 Tu IQ es de: *1000* 💎',
  '📊 Tu IQ es de: *¡Ilimitado!* 🔓',
  '📊 Tu IQ es de: *5000* 🚀',
  '📊 Tu IQ es de: *7500* 🧿',
  '📊 Tu IQ es de: *10000* 🌌'
];
