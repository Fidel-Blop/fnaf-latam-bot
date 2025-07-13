/* 
- tagall versión FNaF LATAM 
- Etiqueta a todos los miembros del grupo
*/
const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command, usedPrefix }) => {
  if (usedPrefix == 'a' || usedPrefix == 'A') return;

  const customEmoji = global.db.data.chats[m.chat]?.customEmoji || '🔧'; // o podés poner un emoji FNaF-temático
  m.react(customEmoji);

  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  const mensaje = args.join` `;
  const aviso = mensaje ? `🎤 *Mensaje del staff:* ${mensaje}` : '📣 *Llamado general a todos los miembros del grupo*';
  let encabezado = `╭━━━〔 *📢 MODO ANUNCIO | FNaF LATAM* 〕━━━⬣\n┃🎭 *Miembros invocados:* ${participants.length}\n┃\n┃${aviso}\n┃\n┃🔔 *Atención requerida...*`;
  let lista = ``;

  for (const mem of participants) {
    lista += `┃${customEmoji} @${mem.id.split('@')[0]}\n`;
  }

  let cierre = `╰━━━━━〔 🔧 *${botname}* | ${vs} 〕━━━━⬣`;

  conn.sendMessage(m.chat, { text: `${encabezado}\n${lista}${cierre}`, mentions: participants.map((a) => a.id) });
};

handler.help = ['todos *<mensaje opcional>*'];
handler.tags = ['group'];
handler.command = ['todos', 'invocar', 'tagall'];
handler.admin = true;
handler.group = true;

export default handler;
