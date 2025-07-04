// Código adaptado por Freddy AI Response 🧠 — FazWatch Sticker Subsystem v3.0.4

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
            text: `🟡 Fazbear Command Interface

⚠️ Entrada no válida detectada...

📌 Por favor, *responde a un mensaje* o *ingresa un texto* para iniciar el protocolo de generación de stickers.

...Esperando parámetro de entrada...

— Sistema respaldado por FNaF LATAM™`,
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
            return conn.sendFile(
                m.chat,
                stiker,
                'sticker.webp',
                `🧩 FazWatch Sticker Subsystem

✅ *Sticker generado exitosamente*

📤 Proceso completado: Transferencia visual ejecutada.

— Sistema respaldado por FNaF LATAM™`,
                m
            )
        } else {
            throw new Error("El subsistema de sticker no respondió.")
        }
    } catch (error) {
        return conn.sendMessage(m.chat, {
            text: `🟥 FazWatch Critical Error

❌ *No se pudo completar la operación.*

📡 Código de error: *${error.message || 'Desconocido'}*

⚠️ Reinicia el comando o espera unos segundos.

— Sistema respaldado por FNaF LATAM™`,
        }, { quoted: m })
    }
}

handler.command = ['brat']
handler.tags = ['sticker']
handler.help = ['brat *<texto>*']

export default handler
