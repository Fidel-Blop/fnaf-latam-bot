import axios from 'axios';
let enviando = false;

const handler = async (m, { conn, text, usedPrefix, command, args }) => {
    if (!args || !args[0]) return conn.reply(m.chat, `🦊 *¡Error de protocolo!* Ingresa el enlace de una imagen o video de Twitter.`, m);
    if (enviando) return; 
    enviando = true;

    try {
        const apiResponse = await axios.get(`https://delirius-apiofc.vercel.app/download/twitterdl?url=${args[0]}`);
        const res = apiResponse.data;

        const caption = res.caption ? res.caption : `📦 *Contenido extraído directamente de Twitter.*`;

        if (res?.type === 'video') {
            await conn.sendMessage(m.chat, { video: { url: res.media[0].url }, caption: caption }, { quoted: m });
        } else if (res?.type === 'image') {
            await conn.sendMessage(m.chat, { image: { url: res.media[0].url }, caption: caption }, { quoted: m });
        }

        enviando = false;
        return;

    } catch (error) {
        enviando = false;
        console.error(error);         
        conn.reply(m.chat, `⚠️ *No se pudo obtener el archivo.* Intenta nuevamente o revisa el enlace.`, m);
    }
};

handler.help = ['twitter <url>'];
handler.tags = ['dl'];
handler.command = ['x', 'xdl', 'dlx', 'twdl', 'tw', 'twt', 'twitter'];
handler.group = true;
handler.register = true;
handler.coin = 2;

export default handler;
