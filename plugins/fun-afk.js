const handler = async (m, { text, conn }) => {
  const user = global.db.data.users[m.sender];
  user.afk = +new Date();
  user.afkReason = text;
  conn.reply(m.chat, `⚠️ *El animatrónico ${conn.getName(m.sender)} ha entrado en modo inactivo.*\n\n*Motivo:* ${text ? text : 'Sin especificar.'}`, m);
};
handler.help = ['afk [motivo]'];
handler.tags = ['main'];
handler.command = ['afk'];
handler.group = true;
handler.register = true;

export default handler;
