// - Adaptado por FNaF LATAM
// - Basado en OfcKing >> https://github.com/OfcKing

import axios from 'axios';

const handler = async (m, { conn, args }) => {
    if (!args[0]) {
        await conn.reply(m.chat, `👁 Error de entrada. Debes proporcionar una descripción para iniciar la simulación visual.`, m);
        return;
    }

    const prompt = args.join(' ');
    const apiUrl = `https://eliasar-yt-api.vercel.app/api/ai/text2img?prompt=${prompt}`;

    try {
        conn.reply(m.chat, `⚙️ *Procesando señal neural...*\n🧠 Simulación visual en curso para: *"${prompt}"*\n\nEspere mientras se generan los patrones de imagen.`, m);

        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });

        await conn.sendMessage(m.chat, {
            image: Buffer.from(response.data),
            caption: `📡 *VISUALIZACIÓN COMPLETADA*\n\n> 🐻 *Descripción solicitada:* "${prompt}"\n> 🎥 *Protocolo de imagen activado con éxito*\n\n— Sistema respaldado por FNaF LATAM™`
        }, { quoted: m });

    } catch (error) {
        console.error('Error al generar la imagen:', error);
        await conn.reply(m.chat, `⚠️ *Error en el módulo gráfico.*\n⛓️ La simulación no pudo completarse.\nIntenta nuevamente más tarde.\n\n— Sistema respaldado por FNaF LATAM™`, m);
    }
};

handler.command = ['dalle'];
handler.help = ['dalle'];
handler.tags = ['tools'];

export default handler;
