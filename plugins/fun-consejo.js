const { generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default;

var handler = async (m, { conn, text }) => {

  const bootMsg = `⚙️🔧 *[ Módulo de Sabiduría FNaF LATAM™ ]*\n📡 Sincronizando base de datos reflexiva...\n👁 Unidad conectada. Procesando recomendación...`;

  const consejo = `🧠 *Análisis completo: Consejo aleatorio recuperado del sistema.*\n\n📍 「 ${pickRandom(global.consejo)} 」\n\n🔐 — Sistema respaldado por FNaF LATAM™`;

  await conn.reply(m.chat, bootMsg, m);
  await conn.reply(m.chat, consejo, m);
};

handler.help = ['consejo'];
handler.tags = ['fun'];
handler.command = ['consejo'];
handler.fail = null;
handler.exp = 0;
handler.group = true;
handler.register = true;

export default handler;

// ─── FUNCIONES INTERNAS ───

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}

// ─── LISTA DE CONSEJOS (BASE DE DATOS LOCAL DEL MÓDULO) ───

global.consejo = [
  "Recuerda que no puedes fallar en ser tú mismo. — Wayne Dyer",
  "Siempre es temprano para rendirse. — Jorge Álvarez Camacho",
  "Sólo una cosa convierte en imposible un sueño: el miedo a fracasar. — Paulo Coelho",
  "Lo que haces hoy puede mejorar todos tus mañanas. — Ralph Marston",
  "Las pequeñas acciones de cada día hacen o deshacen el carácter. — Oscar Wilde",
  "Cáete siete veces y levántate ocho. — Proverbio japonés",
  "Nada sucede hasta que algo se mueve. — Albert Einstein",
  "Tu tiempo es limitado, así que no lo malgastes viviendo la vida de alguien más. — Steve Jobs",
  "No es que tengamos poco tiempo, es que perdemos mucho. — Séneca",
  "Para poder triunfar, tu deseo de tener éxito debe ser mayor que tu miedo a fracasar. — Bill Cosby",
  "Si la oportunidad no llama a tu puerta, construye una puerta. — Milton Berle",
  "Siempre parece imposible… hasta que se hace. — Nelson Mandela",
  "El problema es que piensas que tienes tiempo. — Buda",
  "Confiar en ti mismo no garantiza el éxito, pero no hacerlo garantiza el fracaso. — Albert Bandura",
  "Un buen plan imperfecto ejecutado hoy es mejor que uno perfecto mañana. — General Patton",
  "Hazlo, o no lo hagas. Pero no lo intentes. — Yoda",
  "La única manera de encontrar los límites de lo posible es ir más allá de lo imposible. — Arthur C. Clarke",
  "No cuentes los días, haz que los días cuenten. — Muhammad Ali",
  "Sé tú mismo. Todos los demás ya están ocupados. — Oscar Wilde",
  "La vida comienza al final de la zona de confort. — Neale Donald Walsch",
  "Nunca es demasiado tarde para ser la persona que podrías haber sido. — George Eliot",
  "El momento que da más miedo es siempre justo antes de empezar. — Anónimo",
  "No esperes. Nunca va a ser el momento adecuado. — Napoleon Hill",
  "Tu mejor profesor es tu mayor error. — HacheJota",
  "El éxito es conseguir lo que quieres. La felicidad, es querer lo que ya has conseguido. — Lair Ribeiro",
  "Puedo aceptar el fracaso. Todos fracasan en algo. Pero no puedo aceptar no intentarlo. — Michael Jordan"
];
