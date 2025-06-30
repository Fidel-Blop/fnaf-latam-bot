const handler = async (m, { text, conn }) => {
  const user = global.db.data.users[m.sender];
  user.afk = +new Date;
  user.afkReason = text;

  const nombreUsuario = await conn.getName(m.sender);
  const emoji = '📡';

  conn.reply(
    m.chat,
    `${emoji} *Registro de ausencia activado*\n\n🎥 Operador: *${nombreUsuario}*\n🔒 Estado: *Modo inactivo activado*\n🧠 Motivo asignado: *${text ? text : 'No especificado'}*\n\n⚙️ El monitoreo automático se ajustará hasta nuevo aviso.\n\n— Sistema respaldado por FNaF LATAM™`,
    m
  );
};

handler.help = ['afk [motivo]'];
handler.tags = ['main'];
handler.command = ['afk'];
handler.group = true;
handler.register = true;

export default handler;
