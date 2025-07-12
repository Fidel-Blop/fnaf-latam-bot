// Adaptado para FNaF LATAM por ChatGPT
import axios from 'axios';
import cheerio from 'cheerio';

let handler = async (m, { conn, text }) => {
    if (!text) throw m.reply(`📷 *Unidad de Monitoreo Visual*\n\n⚠️ Por favor, proporciona un enlace válido de TikTok para continuar con la descarga de imágenes.`);

    let mainUrl = `https://dlpanda.com/id?url=${text}&token=G7eRpMaa`;
    let backupUrl = `https://dlpanda.com/id?url=${text}&token51=G32254GLM09MN89Maa`;
    let creator = 'FNaF LATAM Subsystem';

    try {
        let response = await axios.get(mainUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Accept': 'text/html',
            }
        });

        const $ = cheerio.load(response.data);
        let imgSrc = [];

        $('div.col-md-12 > img').each((_, el) => {
            imgSrc.push($(el).attr('src'));
        });

        if (imgSrc.length === 0) {
            response = await axios.get(backupUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0',
                    'Accept': 'text/html',
                }
            });

            const $2 = cheerio.load(response.data);
            $2('div.col-md-12 > img').each((_, el) => {
                imgSrc.push($2(el).attr('src'));
            });
        }

        if (imgSrc.length === 0) {
            throw "⚠️ No se detectaron imágenes disponibles en el enlace proporcionado.";
        }

        await m.react('📥');

        for (let i of imgSrc) {
            try {
                await conn.sendFile(m.chat, i, '', `🖼️ *Imagen procesada desde TikTok*\n\n🗂️ Fuente: ${text}\n📡 Origen: Sistema Visual LATAM\n\n🎬 Estado: Imagen descargada correctamente.`, m);
                await m.react('✅');
            } catch (e) {
                console.error(e);
                await m.react('❌');
            }
        }

    } catch (error) {
        await m.react('❌');
        console.error(error);
        await conn.reply(m.chat, `❗ Error al procesar la solicitud.\n\n🔧 Detalles: ${error.message}`, m);
    }
};

handler.help = ['tiktokimg <url>'];
handler.tags = ['descargas'];
handler.command = ['tiktokimg', 'ttimg'];
handler.group = true;
handler.register = true;
handler.coin = 2;

export default handler;
