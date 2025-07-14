let handler = async (m, { conn, isAdmin, isROwner }) => {
  if (!isAdmin && !isROwner) return;

  global.db.data.chats[m.chat] = global.db.data.chats[m.chat] || {};
  global.db.data.chats[m.chat].botBaneado = false;

  m.reply('✅ Bot activado.');
};

handler.command = ['boton', 'bot on'];
handler.group = true;
handler.admin = true;

export default handler;
