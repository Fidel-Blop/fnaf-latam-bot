let handler = async (m, { conn, text, isRowner }) => {
  if (!text)
    return m.reply(
      `⚠️ *AVISO DEL SISTEMA*\n\n📡 Necesitas ingresar el mensaje de despedida para el protocolo de salida del bot.\n\n— Ejemplo: ${usedPrefix}setbye adiós operador\n\n— Sistema respaldado por FNaF LATAM™`,
      m
    );

  global.welcom2 = text.trim();

  m.reply(
    `🔒 *CONFIGURACIÓN ACTUALIZADA*\n\n📤 Mensaje de despedida actualizado a:\n\n"${global.welcom2}"\n\n— Sistema respaldado por FNaF LATAM™`,
    m
  );
};

handler.help = ['setdespedida'];
handler.tags = ['tools'];
handler.command = ['setbye'];
handler.owner = false;
handler.admin = true;

export default handler;
