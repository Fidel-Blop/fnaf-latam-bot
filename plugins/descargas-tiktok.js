import fetch from 'node-fetch';

var handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) {
        return conn.reply(m.chat, `🎥 *Unidad de Vigilancia FNaF LATAM*\n\n⚠️ Por favor, ingresa un enlace de TikTok para proceder con la extracción del video.`, m);
    }

    try {
        await conn.reply(m.chat, `📡 *Procesando solicitud...*\n\n⏳ Descargando desde TikTok... Espere unos segundos mientras se accede al servidor.`, m);

        const tiktokData = await tiktokdl(args[0]);

        if (!tiktokData || !tiktokData.data || !tiktokData.data.play) {
            return conn.reply(m.chat, "❌ Error: No se pudo obtener el video desde el servidor de TikTok.", m);
        }

        const videoURL = tiktokData.data.play;

        if (videoURL) {
            await conn.sendFile(
                m.chat,
                videoURL,
                "tiktok.mp4",
                `✅ *Transmisión recibida*\n\n🎬 Aquí tienes tu video extraído directamente desde los sistemas de TikTok LATAM 📥`,
                m
            );
        } else {
            return conn.reply(m.chat, "⛔ Error: El video no se pudo descargar correctamente.", m);
        }
    } catch (error1) {
        return conn.reply(m.chat, `🚨 *Error crítico:*\n\n${error1.message}`, m);
    }
};

handler.help = ['tiktok'].map((v) => v + ' *<link>*');
handler.tags = ['descargas'];
handler.command = ['tiktok', 'tt'];
handler.group = true;
handler.register = true;
handler.coin = 2;
handler.limit = true;

export default handler;

async function tiktokdl(url) {
    let tikwm = `https://www.tikwm.com/api/?url=${url}?hd=1`;
    let response = await (await fetch(tikwm)).json();
    return response;
}
