import MessageType from '@whiskeysockets/baileys'
import fetch from 'node-fetch'
import { sticker } from '../lib/sticker.js'
import fs from "fs"

const fetchJson = (url, options) => new Promise(async (resolve, reject) => {
    fetch(url, options)
    .then(response => response.json())
    .then(json => resolve(json))
    .catch((err) => reject(err))
})

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
    if (!args[0]) {
        return m.reply(`🛠️ *Protocolo incompleto...*

📡 Formato detectado inválido.

🔧 Ejemplo correcto: *${usedPrefix + command}* 😎+🤑

...esperando parámetros válidos...

— Sistema respaldado por FNaF LATAM™`)
    }

    let [emoji, emoji2] = text.split`+`
    if (!emoji || !emoji2) {
        return m.reply(`⚠️ Unidad de combinación falló.

⛓️ Debes ingresar dos emojis unidos por un *+*

Ejemplo: *${usedPrefix + command}* 😈+😇

— Sistema respaldado por FNaF LATAM™`)
    }

    let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji)}_${encodeURIComponent(emoji2)}`)

    if (!anu?.results?.length) {
        return m.reply(`❌ *No se encontró combinación válida*

🔍 Parámetros recibidos: *${emoji}* + *${emoji2}*

Intente con otros emojis.

— Sistema respaldado por FNaF LATAM™`)
    }

    for (let res of anu.results) {
        let userId = m.sender
        let packstickers = global.db.data.users[userId] || {}
        let texto1 = packstickers.text1 || global.packsticker
        let texto2 = packstickers.text2 || global.packsticker2

        let stiker = await sticker(false, res.url, texto1, texto2)

        await conn.sendFile(m.chat, stiker, null, {
            asSticker: true
        }, m)
    }
}

handler.help = ['emojimix *<emoji+emoji>*']
handler.tags = ['sticker']
handler.command = ['emojimix'] 
handler.register = true 

export default handler
