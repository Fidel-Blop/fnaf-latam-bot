const handler = async (m, { conn }) => {
  const user = global.db.data.users[m.sender];
  const rnd = () => Math.floor(Math.random() * 5);
  const r = Array.from({ length: 12 }, rnd);
  const ar = () => ['🪚','⛏️','🧨','💣','🔫','🔪','🗡️','🏹','🦾','🥊','🧹','🔨','🛻'].getRandom();

  const animales = [
    ['🐂', r[0], ar()],
    ['🐅', r[1], ar()],
    ['🐘', r[2], ar()],
    ['🐐', r[3], ar()],
    ['🐼', r[4], ar()],
    ['🐊', r[5], ar()],
    ['🐃', r[6], ar()],
    ['🐮', r[7], ar()],
    ['🐒', r[8], ar()],
    ['🐗', r[9], ar()],
    ['🐖', r[10], ar()],
    ['🐓', r[11], ar()]
  ];

  const resultado = `
╭───〔🎯 Caza Finalizada - FNaF LATAM 〕───⬣
│
│ 🎮 Animatrónico: *${conn.getName(m.sender)}*
│
${animales.map(([ani, qty, icon], i) =>
`│ ${ani} ${icon} ×${qty} ${i % 2 ? '\n│' : '\t'}`).join('')}
╰──────────────────────────⬣`.trim();

  // Guardar en DB
  user.banteng += r[0]; user.harimau += r[1]; user.gajah += r[2]; user.kambing += r[3];
  user.panda += r[4]; user.buaya += r[5]; user.kerbau += r[6]; user.sapi += r[7];
  user.monyet += r[8]; user.babihutan += r[9]; user.babi += r[10]; user.ayam += r[11];

  const cooldown = 2700000;
  const time = user.lastberburu + cooldown;
  if (new Date - user.lastberburu < cooldown)
    return conn.reply(m.chat, `⏳ Esperá un rato antes de volver a cazar.\n\n🕒 Tiempo restante: *${clockString(time - new Date())}*`, m);

  // Etapas de la animación de caza
  setTimeout(() => conn.reply(m.chat, resultado, m), 20000);

  setTimeout(() => {
    conn.reply(m.chat, `@${m.sender.split('@')[0]} 📡 *Movimiento detectado entre los árboles...*`, null, { mentions: [m.sender] });
  }, 18000);

  setTimeout(() => {
    conn.reply(m.chat, `@${m.sender.split('@')[0]} ⚙️ *Sistemas activados. Armas listas...*`, null, { mentions: [m.sender] });
  }, 15000);

  setTimeout(() => {
    conn.reply(m.chat, `@${m.sender.split('@')[0]} 🔧 *Sincronizando sensores... Buscando objetivos...*`, m);
  }, 0);

  user.lastberburu = new Date * 1;
};

handler.help = ['cazar'];
handler.tags = ['rpg'];
handler.command = ['cazar', 'hunt', 'berburu'];
handler.group = true;
handler.register = true;

export default handler;

function clockString(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor(ms / 60000) % 60;
  const s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(':');
}
