const xppercoin = 350;

const handler = async (m, {conn, command, args}) => {
  let count = command.replace(/^buy/i, '');
  count = count 
    ? /all/i.test(count) 
      ? Math.floor(global.db.data.users[m.sender].exp / xppercoin) 
      : parseInt(count) 
    : args[0] 
      ? parseInt(args[0]) 
      : 1;
  count = Math.max(1, count);

  if (global.db.data.users[m.sender].exp >= xppercoin * count) {
    global.db.data.users[m.sender].exp -= xppercoin * count;
    global.db.data.users[m.sender].coin += count;
    conn.reply(m.chat, `
╔═══════════════⩽✰⩾═══════════════╗
║          🎟 𝙉𝙤𝙩𝙖 𝙙𝙚 𝙋𝙖𝙜𝙤 🎟
╠═══════════════⩽✰⩾═══════════════╣
║ ┏━━━━━━━━━━━━━━━━━━━━━┓
║ ┃ 𝘾𝙤𝙢𝙥𝙧𝙖 𝙍𝙚𝙖𝙡𝙞𝙯𝙖𝙙𝙖: +${count} 💸
║ ┃ 𝙀𝙭𝙥 𝙀𝙭𝙥𝙚𝙣𝙙𝙞𝙙𝙖: -${xppercoin * count} XP
║ ┗━━━━━━━━━━━━━━━━━━━━━┛
╚═══════════════⩽✰⩾═══════════════╝
𝙍𝙚𝙘𝙪𝙚𝙧𝙙𝙖, 𝙦𝙪𝙚 𝙡𝙖 𝙣𝙤𝙘𝙝𝙚 𝙚𝙨 𝙡𝙤𝙨𝙖 𝙙𝙤𝙣𝙙𝙚 𝙨𝙚 𝙧𝙚𝙖𝙡𝙞𝙯𝙖𝙣 𝙡𝙖𝙨 𝙧𝙚𝙙𝙚𝙨.
`, m);
  } else {
    conn.reply(m.chat, `${emoji2} ⚠️ No tienes suficiente *XP* para comprar *${count}* ${moneda} 💸. Regresa cuando tus recursos se hayan regenerado en la oscuridad...`, m);
  }
};

handler.help = ['buy', 'buyall'];
handler.tags = ['economy'];
handler.command = ['buy', 'buyall'];
handler.group = true;
handler.register = true;

export default handler;
