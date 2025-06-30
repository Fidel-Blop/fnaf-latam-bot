import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    throw m.reply(
      `👁 *PROTOCOLO DE TRANSFERENCIA NO INICIADO*\n\n⚠️ Ingrese un enlace válido de *MediaFire* para continuar con la extracción.`
    )
  }

  await conn.sendMessage(m.chat, { react: { text: '📡', key: m.key } })

  try {
    let response = await fetch(`https://api.agatz.xyz/api/mediafire?url=${text}`)
    let data = await response.json()

    if (!data.status || !data.data || !data.data[0]) {
      throw '❌ *ARCHIVO NO DETECTADO*\nNo se pudo obtener respuesta del servidor.'
    }

    const archivo = data.data[0]
    const mensaje = `🎞️ *PROTOCOLO DE TRANSFERENCIA REMOTA ACTIVADO — MEDIAFIRE SYSTEM*\n\n` +
      `⛓️ *Nombre de archivo:* ${archivo.nama}\n` +
      `📦 *Tamaño estimado:* ${archivo.size}\n` +
      `📁 *Tipo MIME:* ${archivo.mime}\n\n` +
      `📥 *Transferencia completada con éxito.*\n\n— Sistema respaldado por *FNaF LATAM™*`

    await conn.sendFile(m.chat, archivo.link, archivo.nama, mensaje, m)
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  } catch (error) {
    console.error('Error al procesar Mediafire:', error)
    await conn.reply(
      m.chat,
      `⚠️ *FALLO EN LA TRANSFERENCIA*\n\nNo fue posible obtener el archivo. El enlace puede estar corrupto o fuera de alcance.`,
      m
    )
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
  }
}

handler.help = ['mediafire']
handler.tags = ['descargas']
handler.command = ['mf', 'mediafire']
handler.coin = 10
handler.register = true
handler.group = true

export default handler
