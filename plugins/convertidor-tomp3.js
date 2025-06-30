import { toAudio, toPTT } from '../lib/converter.js'

const handler = async (m, { conn, usedPrefix, command }) => {
  const q = m.quoted ? m.quoted : m
  const mime = (q || q.msg).mimetype || q.mediaType || ''

  if (!/video|audio/.test(mime)) {
    return conn.reply(
      m.chat,
      `🔊 *MÓDULO DE ANÁLISIS DE AUDIO — FNaF LATAM™*\n\n⚠️ No se detectó ningún archivo válido.\n📎 Por favor, responde a un *video* o *nota de voz* que desees convertir a formato *MP3 auditivo*.`,
      m
    )
  }

  const media = await q.download()
  if (!media) {
    return conn.reply(
      m.chat,
      `⚠️ *FALLA CRÍTICA: No se pudo recuperar el archivo fuente.*\n⛓️ Intenta nuevamente o verifica que el mensaje no esté dañado.`,
      m
    )
  }

  const audio = await toPTT(media, 'mp4')
  if (!audio.data) {
    return conn.reply(
      m.chat,
      `❌ *ERROR DURANTE LA CONVERSIÓN DE FRECUENCIA SONORA.*\n\n🧠 El sistema no logró generar el archivo de audio.`,
      m
    )
  }

  await conn.sendMessage(
    m.chat,
    {
      audio: media || audio.data,
      mimetype: 'audio/mpeg',
      ptt: false
    },
    { quoted: m }
  )

  await conn.reply(
    m.chat,
    `✅ *EXTRACCIÓN COMPLETA*\n🎧 El audio ha sido aislado correctamente del archivo multimedia.\n\n— Sistema respaldado por *FNaF LATAM™*`,
    m
  )
}

handler.help = ['tomp3', 'toaudio']
handler.command = ['tomp3', 'toaudio']
handler.group = true
handler.register = true

export default handler
