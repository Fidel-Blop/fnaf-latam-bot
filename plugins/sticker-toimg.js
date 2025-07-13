import { webp2png } from '../lib/webp2mp4.js'

let handler = async (m, { conn, usedPrefix, command }) => {
    const notStickerMessage = `⚠️ *Error de procedimiento animatrónico:*\n> Debes *responder* a un *sticker* para extraer la imagen del sistema.`
    const q = m.quoted || m
    const mime = q.mediaType || ''

    if (!/sticker/.test(mime)) return m.reply(notStickerMessage)

    const media = await q.download()
    let out = await webp2png(media).catch(_ => null) || Buffer.alloc(0)

    await conn.sendFile(m.chat, out, 'output.png', null, m)
}

handler.help = ['toimg (responde a sticker)']
handler.tags = ['sticker']
handler.command = ['toimg', 'img', 'jpg']

export default handler
