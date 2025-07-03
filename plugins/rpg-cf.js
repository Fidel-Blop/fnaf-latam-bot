let handler = async (m, { conn, text, usedPrefix, command }) => {
  let [eleccion, cantidad] = text.trim().split(/\s+/);
  let user = global.db.data.users[m.sender];

  if (!eleccion || !cantidad) {
    return m.reply(`${emoji} Usa bien el comando:\n*${usedPrefix + command} cara 50*`);
  }

  eleccion = eleccion.toLowerCase();
  cantidad = parseInt(cantidad);

  if (!['cara', 'cruz'].includes(eleccion)) {
    return m.reply(`${emoji2} Solo *cara* o *cruz*, no inventes 🤡`);
  }

  if (isNaN(cantidad) || cantidad <= 0) {
    return m.reply(`${emoji2} Pon una cantidad real, bro. Ejemplo:\n*${usedPrefix + command} cruz 100*`);
  }

  if (user.coin < cantidad) {
    return m.reply(`${emoji2} No tienes suficiente dinero, te queda *${user.coin} ${moneda}* para apostar.`);
  }

  let resultado = Math.random() < 0.5 ? 'cara' : 'cruz';

  await conn.reply(m.chat, `🪙 Tirando la moneda... ¡suerte! 🍀`, m);
  await new Promise(r => setTimeout(r, 1800));

  if (resultado === eleccion) {
    user.coin += cantidad;
    return conn.reply(m.chat, `🎉 ¡Ganaste!\nLa moneda cayó en *${resultado.toUpperCase()}*.\nGanaste *${cantidad} ${moneda}*.\nSaldo: *${user.coin} ${moneda}*`, m);
  } else {
    user.coin -= cantidad;
    return conn.reply(m.chat, `💀 Mala suerte...\nLa moneda cayó en *${resultado.toUpperCase()}*.\nPerdiste *${cantidad} ${moneda}*.\nSaldo: *${user.coin} ${moneda}*`, m);
  }
};

handler.help = ['cf <cara|cruz> <cantidad>'];
handler.tags = ['economy'];
handler.command = ['cf', 'suerte', 'caracruz'];
handler.group = true;
handler.register = true;

export default handler;
