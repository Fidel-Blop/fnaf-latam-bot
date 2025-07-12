// - OfcKing >> https://github.com/OfcKing

import axios from 'axios';

const emoji = '👁️‍🗨️✨'; // ojo inquietante con brillo
const emoji2 = '⚙️🔮';   // engranaje con bola de cristal para "procesando"
const msm = '🛠️🔥';      // herramientas con fuego para error

const handler = async (m, { conn, args }) => {
    if (!args[0]) {
        await conn.reply(m.chat, `${emoji} *¡Atención!* Debes escribir una descripción para que las sombras cobren vida en una imagen 🎨👻`, m);
        return;
    }

    const prompt = args.join(' ');
    const apiUrl = `https://eliasar-yt-api.vercel.app/api/ai/text2img?prompt=${encodeURIComponent(prompt)}`;

    try {
        await conn.reply(m.chat, `${emoji2} Procesando tu invocación... 🕹️⚡️`, m);

        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });

        await conn.sendMessage(m.chat, { image: Buffer.from(response.data) }, { quoted: m });

        await conn.reply(m.chat, `✨ Imagen generada con éxito ✨\n\n🌙 *Respaldado por FNAF LATAM* 🌙`, m);
    } catch (error) {
        console.error('Error al generar la imagen:', error);
        await conn.reply(m.chat, `${msm} No pude conjurar la imagen esta vez. Intenta de nuevo cuando las sombras sean menos densas 🌫️👾`, m);
    }
};

handler.command = ['dalle'];
handler.help = ['dalle'];
handler.tags = ['tools'];

export default handler;
