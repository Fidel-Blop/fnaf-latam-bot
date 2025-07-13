const ro = 30;
const handler = async (m, {conn, usedPrefix, command}) => {
  const time = global.db.data.users[m.sender].lastrob2 + 7200000;
  if (new Date - global.db.data.users[m.sender].lastrob2 < 7200000) {
    conn.reply(m.chat, `${emoji3} ⏳ El reloj de la noche te dice que debes esperar *${msToTime(time - new Date())}* antes de intentar robar de nuevo.`, m);
    return;
  }
  let who;
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
  else who = m.chat;
  if (!who) {
    conn.reply(m.chat, `👻 Debes mencionar a un desafortunado para intentar robarle en esta oscura noche.`, m);
    return;
  };
  if (!(who in global.db.data.users)) { 
    conn.reply(m.chat, `💀 Ese usuario no existe en mi base de datos, como un fantasma invisible.`, m);
    return;
  }
  const users = global.db.data.users[who];
  const rob = Math.floor(Math.random() * ro);
  if (users.coin < rob) return conn.reply(m.chat, `👹 @${who.split`@`[0]} no tiene suficientes *${moneda}* fuera del banco. Mejor busca otro objetivo...`, m, {mentions: [who]});
  
  global.db.data.users[m.sender].coin += rob;
  global.db.data.users[who].coin -= rob;
  
  conn.reply(m.chat, `🎭 Has robado *${rob} ${moneda}* a @${who.split`@`[0]}. ¡Cuidado que Freddy está vigilando!`, m, {mentions: [who]});
  
  global.db.data.users[m.sender].lastrob2 = new Date * 1;
};

handler.help = ['rob'];
handler.tags = ['rpg'];
handler.command = ['robar', 'steal', 'rob'];
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
