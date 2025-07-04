import { webp2png } from '../lib/webp2mp4.js'

let handler = async (m, { conn, usedPrefix, command }) => {
  const q = m.quoted || m
  const mime = q.mediaType || ''

  if (!/sticker/.test(mime)) {
    return conn.reply(m.chat, `📌 Debes *responder a un sticker* para convertirlo en imagen.`, m)
  }

  try {
    await m.react('🕓') // Indicador de procesamiento

    const media = await q.download()
    const out = await webp2png(media).catch(() => null) || Buffer.alloc(0)

    if (!out || out.length === 0) {
      throw new Error('No se pudo convertir el sticker a imagen.')
    }

    await conn.sendFile(m.chat, out, 'imagen.png', `✅ Aquí tienes tu imagen convertida.`, m)
    await m.react('✅')
  } catch (e) {
    await conn.reply(m.chat, `⚠️ Error: ${e.message}`, m)
    await m.react('❌')
  }
}

handler.help = ['toimg (responder)']
handler.tags = ['sticker']
handler.command = ['toimg', 'img', 'jpg']
handler.register = true
handler.group = false // cámbialo a true si solo querés habilitarlo en grupos

export default handler
