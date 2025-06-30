let toM = a => '@' + a.split('@')[0];

function handler(m, { groupMetadata }) {
  let ps = groupMetadata.participants.map(v => v.id);
  let a = ps.getRandom();
  let b;
  do b = ps.getRandom();
  while (b === a);

  const emoji = '👁';

  m.reply(
    `${emoji} *Sistema de vinculación social activado*\n\n📡 Asignación en curso...\n🦴 *Unidad ${toM(a)}* ha sido seleccionada para iniciar contacto con *Unidad ${toM(b)}*.\n\n🔊 *Instrucción*: Establecer comunicación directa en el canal privado y comenzar proceso de interacción amistosa.\n\n🎮 *Nota*: "Las mejores conexiones surgen jugando... incluso si alguien observa desde las cámaras."\n\n— Protocolo generado por el subsistema de relaciones de FNaF LATAM™`,
    null,
    {
      mentions: [a, b]
    }
  );
}

handler.help = ['amistad'];
handler.tags = ['fun'];
handler.command = ['amigorandom', 'amistad'];
handler.group = true;
handler.register = true;

export default handler;
