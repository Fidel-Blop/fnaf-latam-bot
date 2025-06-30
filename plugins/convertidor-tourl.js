import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import fetch from 'node-fetch'

let handler = async (m) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''

  if (!mime) {
    return conn.reply(
      m.chat,
      `🖼️ *PROTOCOLO DE TRANSFERENCIA NO INICIALIZADO*\n\n⚠️ Por favor, responde a una *imagen* o *video* registrado por el sistema de vigilancia.`,
      m
    )
  }

  await m.react('📡')

  try {
    let media = await q.download()
    let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
    let link = await (isTele ? uploadImage : uploadFile)(media)
    let img = await (await fetch(`${link}`)).buffer()

    let txt = `📡 *MÓDULO DE TRANSMISIÓN ACTIVA — FNaF LATAM™*\n\n`
    txt += `🧠 *Archivo registrado por el sistema.*\n\n`
    txt += `🔗 *Enlace permanente:* ${link}\n`
    txt += `⛓️ *Versión acortada:* ${await shortUrl(link)}\n`
    txt += `🧮 *Tamaño del archivo:* ${formatBytes(media.length)}\n`
    txt += `📆 *Expiración del enlace:* ${isTele ? 'No expira (modo seguro)' : 'Desconocido'}\n\n`
    txt += `⚠️ *Advertencia:* No se permite subir material perturbador, +18, ni con contenido ilegal. El uso indebido será reportado automáticamente al sistema central.\n\n— Respaldo por *FNaF LATAM™*`

    await conn.sendFile(m.chat, img, 'fnaf_link.jpg', txt, m, fkontak)
    await m.react('✅')
  } catch {
    await m.react('❌')
    conn.reply(
      m.chat,
      `🚫 *ERROR EN EL PROCESO DE TRANSFERENCIA*\n\nEl módulo no pudo subir el archivo al servidor externo.`,
      m
    )
  }
}

handler.help = ['tourl']
handler.tags = ['transformador']
handler.register = true
handler.command = ['tourl', 'upload']

export default handler

function formatBytes(bytes) {
  if (bytes === 0) return '0 B'
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`
}

async function shortUrl(url) {
  let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`)
  return await res.text()
}
