let handler = async (m, { conn, text, isRowner }) => {
  if (!text)
    return m.reply(
      `⚠️ *AVISO DEL SISTEMA*\n\n📡 Es necesario ingresar el mensaje de bienvenida para activar el protocolo de recepción.\n\n— Ejemplo: ${usedPrefix}setwelcome Bienvenido operador\n\n— Sistema respaldado por FNaF LATAM™`,
      m
    );

  global.welcom1 = text.trim();

  m.reply(
    `🔒 *CONFIGURACIÓN ACTUALIZADA*\n\n📥 Mensaje de bienvenida configurado a:\n\n"${global.welcom1}"\n\n— Sistema respaldado por FNaF LATAM™`,
    m
  );
};

handler.help = ['setwelcome'];
handler.tags = ['tools'];
handler.command = ['setwelcome'];
handler.owner = false;
handler.admin = true;

export default handler;
