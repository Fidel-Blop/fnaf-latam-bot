import { igdl } from 'ruhend-scraper'

const handler = async (m, { args, conn }) => {
  if (!args[0]) {
    return conn.reply(
      m.chat,
      `👁 *PROTOCOLO NO INICIADO*\n\n⚠️ Debes proporcionar un *enlace válido de Instagram* para extraer la transmisión visual.`,
      m
    )
  }

  try {
    await m.react('📡')

    const res = await igdl(args[0])
    const data = res.data

    if (!data || !data.length) {
      return conn.reply(
        m.chat,
        `⛓️ *SEÑAL NO CAPTURADA*\n\nNo se pudieron obtener contenidos desde el enlace proporcionado.`,
        m
      )
    }

    for (let media of data) {
      await conn.sendFile(
        m.chat,
        media.url,
        'fnaf_ig_capture.mp4',
        `🎥 *MÓDULO DE CAPTURA VISUAL IG — ACTIVADO*\n\n🧠 Archivo interceptado desde el servidor de Instagram.\n\n⚙️ Transferencia completada correctamente.\n\n— Unidad respaldada por *FNaF LATAM™*`,
        m
      )
      await m.react('✅')
    }
  } catch (e) {
    await m.react('❌')
    return conn.reply(
      m.chat,
      `🚫 *ERROR DE TRANSMISIÓN*\n\nLa unidad no pudo recuperar el contenido. Asegúrate de que el enlace sea válido o que el contenido sea público.`,
      m
    )
  }
}

handler.command = ['instagram', 'ig']
handler.tags = ['descargas']
handler.help = ['instagram', 'ig']
handler.group = true
handler.register = true
handler.coin = 2

export default handler
