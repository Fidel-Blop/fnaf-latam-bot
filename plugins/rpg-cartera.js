// Comando wallet (solo efectivo)
let handlerWallet = async (m, { conn, usedPrefix }) => {
  let who = m.mentionedJid?.[0] || m.quoted?.sender || m.sender;

  if (who === conn.user.jid) {
    await m.react('❌');
    return;
  }
  if (!(who in global.db.data.users)) {
    return conn.reply(m.chat, `⚠️ El usuario no está registrado en la base de datos.`, m);
  }

  let user = global.db.data.users[who];
  let moneda = global.moneda || 'FazTokens';

  let texto = who === m.sender
    ? `💸 Tienes *${user.coin || 0} ${moneda}* en tu cartera.`
    : `💸 El usuario @${who.split('@')[0]} tiene *${user.coin || 0} ${moneda}* en su cartera.`;

  await m.reply(texto, null, { mentions: [who] });
};

handlerWallet.help = ['wallet', 'cartera'];
handlerWallet.tags = ['economy'];
handlerWallet.command = ['wallet', 'cartera'];
handlerWallet.group = true;
handlerWallet.register = true;


// Comando bal (banco + efectivo + total)
import db from '../lib/database.js';

let handlerBal = async (m, { conn, usedPrefix }) => {
  let who = m.mentionedJid?.[0] || m.quoted?.sender || m.sender;

  if (who === conn.user.jid) {
    await m.react('❌');
    return;
  }
  if (!(who in global.db.data.users)) {
    return m.reply(`⚠️ El usuario no está registrado en la base de datos.`);
  }

  let user = global.db.data.users[who];
  let moneda = global.moneda || 'FazTokens';
  let coin = user.coin || 0;
  let bank = user.bank || 0;
  let total = coin + bank;

  const texto = `
📊 Información Económica

👤 Usuario: *${await conn.getName(who)}*

⛀ Efectivo: *${coin} ${moneda}*
⚿ Banco: *${bank} ${moneda}*
⛁ Total: *${total} ${moneda}*

💡 Para proteger tu dinero, usa el comando *${usedPrefix}deposit <monto>* y resguarda tus fondos en el banco.
`;

  await conn.reply(m.chat, texto.trim(), m);
};

handlerBal.help = ['bal', 'balance'];
handlerBal.tags = ['economy'];
handlerBal.command = ['bal', 'balance', 'bank'];
handlerBal.group = true;
handlerBal.register = true;

export { handlerWallet, handlerBal };
