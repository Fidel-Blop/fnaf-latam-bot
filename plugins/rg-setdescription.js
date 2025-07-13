import { createHash } from 'crypto';  
import fetch from 'node-fetch';

const handler = async (m, { conn, command, usedPrefix, text }) => {

  let user = global.db.data.users[m.sender];

  if (user.description) {
    return conn.reply(m.chat, `👹 Ya tienes una descripción establecida.\nSi quieres eliminarla usa:\n> » ${usedPrefix}deldescription`, m);
  }

  if (!text) return conn.reply(m.chat, `⚠️ Debes escribir una descripción válida para tu perfil.\n\n> ✐ Ejemplo » *${usedPrefix + command} Fanático de FNaF LATAM*`, m);

  user.description = text;

  return conn.reply(m.chat, `🦾 Tu descripción ha sido establecida correctamente.\n\n> *${user.description}*`, m);
};

handler.help = ['setdescription'];
handler.tags = ['rg'];
handler.command = ['setdescription', 'setdesc'];
export default handler;
