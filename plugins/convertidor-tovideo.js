import {webp2mp4} from '../lib/webp2mp4.js';
import {ffmpeg} from '../lib/converter.js'; 

const handler = async (m, {conn, usedPrefix, command}) => {
  const firma = '🎭 Respaldado por FNAF LATAM 🎭';

  if (!m.quoted) {
    return conn.reply(m.chat, `👾 Por favor, responde a un *Sticker* que quieras convertir en *Video*.\n\n${firma}`, m);
  }
  
  const mime = m.quoted.mimetype || '';
  if (!/webp/.test(mime)) {
    return conn.reply(m.chat, `👾 Solo puedes convertir *Stickers* en formato WebP a *Video*.\n\n${firma}`, m);
  }
  
  const media = await m.quoted.download();
  let out = Buffer.alloc(0);
  
  await conn.reply(m.chat, `⏳ Procesando tu pedido, espera un momento...`, m);

  if (/webp/.test(mime)) {
    out = await webp2mp4(media);
  } else if (/audio/.test(mime)) {
    out = await ffmpeg(media, [
      '-filter_complex', 'color',
      '-pix_fmt', 'yuv420p',
      '-crf', '51',
      '-c:a', 'copy',
      '-shortest',
    ], 'mp3', 'mp4');
  }
  
  await conn.sendFile(m.chat, out, 'video.mp4', `✨ Aquí tienes tu *Video* convertido con éxito ฅ^•ﻌ•^ฅ\n\n${firma}`, m, 0, {thumbnail: out});
};

handler.help = ['tovideo'];
handler.tags = ['transformador'];
handler.group = true;
handler.register = true;
handler.command = ['tovideo', 'tomp4', 'mp4', 'togif'];

export default handler;
