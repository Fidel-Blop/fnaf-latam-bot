const toM = (a) => '@' + a.split('@')[0];

function handler(m, { groupMetadata }) {
  const ps = groupMetadata.participants.map((v) => v.id);
  const a = ps.getRandom();
  let b;
  do b = ps.getRandom();
  while (b === a);

  const mensaje = `🎥 *Monitoreo de compatibilidad activado...*\n\n📡 Emparejamiento detectado por la Unidad Sentimental Fazbear™\n\n💍 ${toM(a)}, deberías vincularte emocionalmente con ${toM(b)}.\n\n📈 *Nivel de sincronización afectiva:* ${pickRandom([
    '82%',
    '94%',
    '69%',
    '100%',
    '47%',
    '76%',
    '91%',
    '88%',
    '50%',
    '99%'
  ])}\n\n💓 *Observación:* “Combinación validada por el sistema de emociones supervisadas de FNaF LATAM™.”\n\n⛓ *Monitoreo en curso...*`;

  m.reply(mensaje, null, {
    mentions: [a, b],
  });
}

handler.help = ['formarpareja'];
handler.tags = ['fun'];
handler.command = ['formarpareja', 'formarparejas'];
handler.group = true;
handler.register = true;

export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}
