import { sticker } from '../lib/sticker.js'
import axios from 'axios'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const fetchSticker = async (text, attempt = 1) => {
    try {
        const response = await axios.get(`https://api.ownblox.biz.id/api/brat`, {
            params: { text },
            responseType: 'arraybuffer',
        })
        return response.data
    } catch (error) {
        if (error.response?.status === 429 && attempt <= 3) {
            const retryAfter = error.response.headers['retry-after'] || 5
            await delay(retryAfter * 1000)
            return fetchSticker(text, attempt + 1)
        }
        throw error
    }
}

let handler = async (m, { conn, text }) => {
    if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else if (!text) {
        return conn.sendMessage(m.chat, {
            text: `🔧 *Sistema de Stickers de Freddy Fazbear*\n\n🎭 Escribe un mensaje o responde a uno para generar un sticker al estilo *Brat*.`,
        }, { quoted: m })
    }

    try {
        const buffer = await fetchSticker(text)
        let userId = m.sender
        let packstickers = global.db.data.users[userId] || {}
        let texto1 = packstickers.text1 || global.packsticker
        let texto2 = packstickers.text2 || global.packsticker2

        let stiker = await sticker(buffer, false, texto1, texto2)

        if (stiker) {
            return conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
        } else {
            throw new Error("⚠️ El sistema falló en crear el sticker. Reintenta bajo tu propio riesgo...")
        }
    } catch (error) {
        return conn.sendMessage(m.chat, {
            text: `🛑 *ERROR EN EL SISTEMA DE STICKERS*\n\n💬 Detalles: ${error.message}`,
        }, { quoted: m })
    }
}

handler.command = ['brat']
handler.tags = ['sticker']
handler.help = ['brat *<texto>*']

export default handler
