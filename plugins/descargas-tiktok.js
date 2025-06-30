import fetch from 'node-fetch';

var handler = async (m, { conn, args, usedPrefix, command }) => {
    const emoji = '🦴'; // Icono temático para la comunicación FNaF LATAM™

    if (!args[0]) {
        return conn.reply(m.chat, `${emoji} Sistema de vigilancia activado.\n\n👁️ Para iniciar el monitoreo, por favor, proporciona un enlace válido de TikTok.\n\n— Sistema respaldado por FNaF LATAM™`, m);
    }

    try {
        await conn.reply(m.chat, `${emoji} Monitoreo audiovisual en proceso... Descargando señal desde la cámara de seguridad. 📡`, m);

        const tiktokData = await tiktokdl(args[0]);

        if (!tiktokData || !tiktokData.data || !tiktokData.data.play) {
            return conn.reply(m.chat, `${emoji} Falla en la recepción de señal. No se pudo obtener el flujo audiovisual.\n\n— Sistema respaldado por FNaF LATAM™`, m);
        }

        const videoURL = tiktokData.data.play;

        if (videoURL) {
            await conn.sendFile(m.chat, videoURL, "fnaf_latam_tiktok.mp4", `${emoji} Señal capturada. Reproduciendo archivo multimedia... 🐻\n\n— Sistema respaldado por FNaF LATAM™`, m);
        } else {
            return conn.reply(m.chat, `${emoji} La transmisión audiovisual está inaccesible. Reintente en breve.\n\n— Sistema respaldado por FNaF LATAM™`, m);
        }
    } catch (error1) {
        return conn.reply(m.chat, `${emoji} Error en sistema de monitoreo FNaF LATAM™:\n\n${error1.message}\n\n— Sistema respaldado por FNaF LATAM™`, m);
    }
};

handler.help = ['tiktok *<enlace>*'];
handler.tags = ['descargas', 'monitoreo'];
handler.command = ['tiktok', 'tt'];
handler.group = true;
handler.register = true;
handler.coin = 2;
handler.limit = true;

export default handler;

async function tiktokdl(url) {
    const tikwm = `https://www.tikwm.com/api/?url=${url}?hd=1`;
    const response = await (await fetch(tikwm)).json();
    return response;
}
