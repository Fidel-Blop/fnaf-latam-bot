import { igdl } from 'ruhend-scraper'

const handler = async (m, { text, conn, args }) => {
  if (!args[0]) {
    return conn.reply(
      m.chat,
      `👁 *PROTOCOLO DE EXTRACCIÓN NO INICIADO*\n\n⚠️ Debes ingresar un *enlace válido de Facebook* para proceder con la recuperación audiovisual.`,
      m
    )
  }

  let res
  try {
    await m.react('📡')
    res = await igdl(args[0])
  } catch (e) {
    return conn.reply(
      m.chat,
      `⚠️ *ERROR EN LA SOLICITUD*\n\n🧠 No se pudo establecer conexión con la base de datos.\nVerifica el enlace ingresado.`,
      m
    )
  }

  let result = res.data
  if (!result || result.length === 0) {
    return conn.reply(
      m.chat,
      `❌ *ARCHIVO NO DETECTADO*\n\n⛓️ No se encontraron resultados compatibles con el sistema.`,
      m
    )
  }

  let data
  try {
    data =
      result.find((i) => i.resolution === '720p (HD)') ||
      result.find((i) => i.resolution === '360p (SD)')
  } catch (e) {
    return conn.reply(
      m.chat,
      `❌ *ERROR AL PROCESAR LA RESOLUCIÓN DEL ARCHIVO.*`,
      m
    )
  }

  if (!data) {
    return conn.reply(
      m.chat,
      `🧠 *RESOLUCIÓN INCOMPATIBLE*\n\nNo se encontró un archivo apto para transferencia.`,
      m
    )
  }

  let video = data.url
  try {
    await conn.sendMessage(
      m.chat,
      {
        video: { url: video },
        caption:
          `🎥 *EXTRACCIÓN COMPLETA — FB MODULE v1.2*\n\n🧩 Video procesado desde enlace proporcionado.\n\n— Sistema respaldado por *FNaF LATAM™*`,
        fileName: 'fb.mp4',
        mimetype: 'video/mp4'
      },
      { quoted: m }
    )
    await m.react('✅')
  } catch (e) {
    await m.react('❌')
    return conn.reply(
      m.chat,
      `⚠️ *ERROR AL TRANSMITIR EL ARCHIVO*\n\nEs posible que el archivo sea demasiado grande o que el formato sea inestable.`,
      m
    )
  }
}

handler.help = ['facebook', 'fb']
handler.tags = ['descargas']
handler.command = ['facebook', 'fb']
handler.group = true
handler.register = true
handler.coin = 2

export default handler
