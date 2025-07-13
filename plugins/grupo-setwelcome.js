let handler = async (m, { conn, text, isRowner }) => {
  if (!text) return m.reply(`🎉 *Configuración de Bienvenida | FNaF LATAM*\n\n📌 Por favor, escribe el mensaje que se mostrará cuando alguien entre al grupo.\n\n🎭 *Ejemplo:* #setwelcome Bienvenido {user}... La oscuridad te esperaba.`);

  global.welcom1 = text.trim();

  m.reply(`✅ *Mensaje de bienvenida actualizado*\n\n📥 El nuevo mensaje de entrada es:\n\n🗂️ *${global.welcom1}*`);
};

handler.help = ['setwelcome'];
handler.tags = ['tools'];
handler.command = ['setwelcome'];
handler.owner = false;
handler.admin = true;

export default handler;
