let toM = a => '@' + a.split('@')[0];

function handler(m, { groupMetadata }) {
  let ps = groupMetadata.participants.map(v => v.id);
  let a = ps.getRandom();
  let b;
  do b = ps.getRandom();
  while (b === a);
  m.reply(`${emoji} ¡Es hora de que dos animatrónicos se conozcan! 🤖\n\n*Oye ${toM(a)}, envíale un mensaje privado a ${toM(b)} para que empiecen a jugar y forjen una alianza oscura... o una amistad.*\n\n*En FNaF LATAM, las mejores alianzas nacen en la oscuridad... y en el juego.* 🔥`, null, {
    mentions: [a, b]
  });
}

handler.help = ['amistad'];
handler.tags = ['fun'];
handler.command = ['amigorandom', 'amistad'];
handler.group = true;
handler.register = true;

export default handler;
