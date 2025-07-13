import axios from 'axios'
import { sticker } from '../lib/sticker.js'

const fetchStickerVideo = async (text) => {
    const response = await axios.get(`https://api.nekorinn.my.id/maker/bratvid`, {
        params: { text },
        responseType: 'arraybuffer'
    })
    if (!response.data) throw new Error('❌ No se pudo obtener el video desde la base de datos de Fazbear Entertainment.')
    return response.data
}

let handler = async (m, { conn, text }) => {
    if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else if (!text) {
        return conn.sendMessage(m.chat, {
            text: `🎬 *Generador de Stickers Animados - Sistema de Freddy Fazbear*\n\n🔧 Por favor, responde a un mensaje o escribe el texto para crear tu sticker animado estilo *Brat*.`,
        }, { quoted: m })
    }

    let userId = m.sender
    let packstickers = global.db.data.users[userId] || {}
    let texto1 = packstickers.text1 || global.packsticker
    let texto2 = packstickers.text2 || global.packsticker2

    try {
        const videoBuffer = await fetchStickerVideo(text)
        const stickerBuffer = await sticker(videoBuffer, null, texto1, texto2)
        await conn.sendMessage(m.chat, {
            sticker: stickerBuffer
        }, { quoted: m })
    } catch (e) {
        await conn.sendMessage(m.chat, {
            text: `🛑 *Error del Subsistema Animatrónico*\n\n🔌 Código de error: ${e.message}`,
        }, { quoted: m })
    }
}

handler.help = ['bratvid <texto>']
handler.tags = ['sticker']
handler.command = ['bratvid', 'bratv']

export default handler
