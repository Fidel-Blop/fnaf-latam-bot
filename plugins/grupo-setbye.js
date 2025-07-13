let handler = async (m, { conn, text, isRowner }) => {
  if (!text) return m.reply(`👋 *Configuración de Despedida | FNaF LATAM*\n\n📌 Por favor, escribe el mensaje de salida que el bot debe usar cuando un usuario se va del grupo.\n\n🎭 *Ejemplo:* #setbye Hasta luego, {user}... Te estaremos vigilando.`);

  global.welcom2 = text.trim();

  m.reply(`✅ *Mensaje de despedida actualizado*\n\n📤 El nuevo mensaje de salida es:\n\n🗂️ *${global.welcom2}*`);
};

handler.help = ['setdespedida'];
handler.tags = ['tools'];
handler.command = ['setbye'];
handler.owner = false;
handler.admin = true;

export default handler;
