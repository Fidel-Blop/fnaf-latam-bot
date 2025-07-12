import gtts from 'node-gtts';
import {readFileSync, unlinkSync} from 'fs';
import {join} from 'path';

const defaultLang = 'es';

const handler = async (m, {conn, args, usedPrefix, command}) => {
  const firma = '🎭 Respaldado por FNAF LATAM 🎭';

  let lang = args[0];
  let text = args.slice(1).join(' ');

  if ((args[0] || '').length !== 2) {
    lang = defaultLang;
    text = args.join(' ');
  }

  if (!text && m.quoted?.text) text = m.quoted.text;

  if (!text) {
    return conn.reply(m.chat, `👾 Por favor, escribe una frase para convertir a voz.\n\n${firma}`, m);
  }

  try {
    const res = await tts(text, lang);
    if (res) {
      await conn.sendFile(m.chat, res, 'voz.opus', null, m, true);
      await conn.reply(m.chat, `${firma}`, m);
    }
  } catch (e) {
    await conn.reply(m.chat, `❌ Ocurrió un error: ${e}\n\nIntentando con idioma por defecto...`, m);
    try {
      const res = await tts(text, defaultLang);
      if (res) await conn.sendFile(m.chat, res, 'voz.opus', null, m, true);
      await conn.reply(m.chat, `${firma}`, m);
    } catch (e2) {
      await conn.reply(m.chat, `❌ No se pudo generar la voz.\n\n${firma}`, m);
    }
  }
};

handler.help = ['tts <idioma> <texto>'];
handler.tags = ['transformador'];
handler.group = true;
handler.register = true;
handler.command = ['tts'];

export default handler;

function tts(text, lang = 'es') {
  return new Promise((resolve, reject) => {
    try {
      const tts = gtts(lang);
      const filePath = join(global.__dirname(import.meta.url), '../tmp', `${Date.now()}.wav`);
      tts.save(filePath, text, () => {
        const buffer = readFileSync(filePath);
        unlinkSync(filePath);
        resolve(buffer);
      });
    } catch (error) {
      reject(error);
    }
  });
}
