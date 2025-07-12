import { toAudio, toPTT } from '../lib/converter.js'

const handler = async (m, { conn, usedPrefix, command }) => {
  const firma = '🎭 Respaldado por FNAF LATAM 🎭'
  const q = m.quoted ? m.quoted : m
  const mime = (q || q.msg).mimetype || q.mediaType || ''

  if (!/video|audio/.test(mime)) {
    return conn.reply(m.chat, `🎙️ *Convierte audios o videos a formato MP3*\n\n📌 Responde a un *video* o una *nota de voz* para convertirlo a audio.\n\n${firma}`, m)
  }

  const media = await q.download()
  if (!media) {
    return conn.reply(m.chat, `❌ *Error:* No se pudo descargar el archivo multimedia.\n\n${firma}`, m)
  }

  const audio = await toPTT(media, 'mp4')
  if (!audio.data) {
    return conn.reply(m.chat, `❌ *Error:* Falló la conversión del archivo.\n\n${firma}`, m)
  }

  conn.sendMessage(m.chat, {
    audio: media || audio.data,
    mimetype: 'audio/mpeg'
  }, {
    quoted: m
  })
}

handler.help = ['tomp3', 'toaudio']
handler.command = ['tomp3', 'toaudio']
handler.group = true
handler.register = true

export default handler
