import { sticker } from '../lib/sticker.js'
import { isUrl } from '../lib/func.utils.js'

let handler = async (m, { conn, args }) => {
  let userId = m.sender
  let packstickers = global.db.data.users[userId] || {}
  let texto1 = packstickers.text1 || global.packsticker
  let texto2 = packstickers.text2 || global.packsticker2

  let stiker = false

  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    let txt = args.join(' ')
    let marca = txt ? txt.split(/[\u2022|]/).map(part => part.trim()) : [texto1, texto2]

    if (/webp|image|video/g.test(mime) && q.download) {
      if (/video/.test(mime) && (q.msg || q).seconds > 16) {
        return conn.reply(m.chat, '⚠️ El video no puede durar más de *15 segundos*.', m)
      }
      const buffer = await q.download()
      await m.react('🕓')
      stiker = await sticker(buffer, false, marca[0], marca[1])
    } else if (args[0] && isUrl(args[0])) {
      stiker = await sticker(false, args[0], texto1, texto2)
    } else {
      return conn.reply(m.chat, `❀ Por favor, responde a una *imagen* o *video* (≤15s), o envía un link directo a una imagen para generar el sticker.`, m)
    }
  } catch (e) {
    await conn.reply(m.chat, `⚠︎ Error al generar el sticker: ${e.message}`, m)
    await m.react('✖️')
  } finally {
    if (stiker) {
      await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
      await m.react('✅')
    }
  }
}

handler.help = ['s', 'sticker']
handler.tags = ['sticker']
handler.command = ['s', 'sticker']
handler.register = true
handler.group = false // Cambiar a true si querés solo en grupos

export default handler
