const ro = 3000;
const handler = async (m, {conn, usedPrefix, command}) => {
  const time = global.db.data.users[m.sender].lastrob + 7200000;
  if (new Date - global.db.data.users[m.sender].lastrob < 7200000) {
    conn.reply(m.chat, `${emoji3} ⏳ El tiempo no ha llegado aún. Debes esperar *${msToTime(time - new Date())}* antes de intentar robar XP nuevamente.`, m);
    return;
  }
  let who;
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
  else who = m.chat;
  if (!who) {
    conn.reply(m.chat, `👻 Debes mencionar a un objetivo para intentar robarle XP en esta noche oscura.`, m);
    return;
  };
  if (!(who in global.db.data.users)) { 
    conn.reply(m.chat, `💀 Ese usuario no existe en la base de datos, es como un espectro invisible.`, m);
    return;
  }
  const users = global.db.data.users[who];
  const rob = Math.floor(Math.random() * ro);
  if (users.exp < rob) return conn.reply(m.chat, `👹 @${who.split`@`[0]} no tiene suficiente *${ro} XP* para que valga la pena robar. Busca otro objetivo...`, m, {mentions: [who]});
  
  global.db.data.users[m.sender].exp += rob;
  global.db.data.users[who].exp -= rob;
  
  conn.reply(m.chat, `🎭 Has robado *${rob} XP* a @${who.split`@`[0]}. Ten cuidado, Freddy observa cada movimiento.`, m, {mentions: [who]});
  
  global.db.data.users[m.sender].lastrob = new Date * 1;
};

handler.help = ['rob'];
handler.tags = ['economy'];
handler.command = ['robxp', 'robarxp'];
handler.group = true;
handler.register = true;

export default handler;

function msToTime(duration) {
  const milliseconds = parseInt((duration % 1000) / 100);
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;
  return hours + ' Hora(s) ' + minutes + ' Minuto(s)';
}
