let handler = async (m, { conn, isAdmin, isROwner }) => {
  if (!isAdmin && !isROwner) return;

  global.db.data.chats[m.chat] = global.db.data.chats[m.chat] || {};
  global.db.data.chats[m.chat].botBaneado = true;

  m.reply('.'); // Solo responde con un punto
};

handler.command = ['botoff', 'bot off'];
handler.group = true;
handler.admin = true;

export default handler;
