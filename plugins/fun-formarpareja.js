const toM = (a) => '@' + a.split('@')[0];

function handler(m, { groupMetadata }) {
  const ps = groupMetadata.participants.map((v) => v.id);
  const a = ps.getRandom();
  let b;
  do b = ps.getRandom();
  while (b === a);

  m.reply(
    `*👻 ${toM(a)}, has sido marcado por Freddy para casarte 💍 con ${toM(b)}.*\n` +
    `*¡Una pareja tan oscura como la noche, perfecta para sobrevivir al terror juntos! 💀❤️*`,
    null,
    { mentions: [a, b] }
  );
}

handler.help = ['formarpareja'];
handler.tags = ['fun'];
handler.command = ['formarpareja', 'formarparejas'];
handler.group = true;
handler.register = true;

export default handler;
