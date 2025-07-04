import FormData from "form-data"
import Jimp from "jimp"

const handler = async (m, { conn, usedPrefix, command }) => {
  const sistema = "Freddy Fazbear Security Protocol v1.3.7 activado ⛓️"
  try {
    await m.react('🕓')
    conn.sendPresenceUpdate('composing', m.chat)

    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ""

    if (!mime) {
      return conn.reply(
        m.chat,
        `⚠️ [ERROR DE SISTEMA]\n` +
        `Unidad de observación conectada 🎥\n` +
        `> No se detectó imagen para mejorar calidad.\n` +
        `> Por favor, envía o responde a una imagen con este comando.\n\n` +
        `— Sistema respaldado por FNaF LATAM™`,
        m
      )
    }

    if (!/image\/(jpe?g|png)/.test(mime)) {
      return conn.reply(
        m.chat,
        `##--::SEQUENCE_BREAK::--##\n` +
        `⚠️ Formato incompatible detectado: ${mime}\n` +
        `>> Solo se aceptan imágenes JPG o PNG para la mejora.\n` +
        `— Sistema respaldado por FNaF LATAM™`,
        m
      )
    }

    await conn.reply(m.chat, `${sistema}\n\n✧ Procesando mejora de calidad de imagen... Espere...`, m)

    let img = await q.download?.()
    let mejorada = await remini(img, "enhance")

    await conn.sendFile(m.chat, mejorada, 'freddy_hd.jpg',
      `✔️ Mejora completada.\nUnidad de observación confirma calidad aumentada.\n\n— Sistema respaldado por FNaF LATAM™`,
      m, null)

    await m.react('✅')
  } catch (e) {
    await m.react('✖️')
    await conn.reply(m.chat,
      `##ERROR##\n` +
      `❗ Ha ocurrido un fallo durante el procesamiento.\n` +
      `Mensaje de error:\n${e.message}\n\n` +
      `— Sistema respaldado por FNaF LATAM™`,
      m)
  }
}

handler.help = ["hd"]
handler.tags = ["tools"]
handler.command = ["remini", "hd", "enhance"]

export default handler

async function remini(imageData, operation) {
  return new Promise(async (resolve, reject) => {
    const operacionesDisponibles = ["enhance", "recolor", "dehaze"]
    if (!operacionesDisponibles.includes(operation)) operation = operacionesDisponibles[0]

    const baseUrl = "https://inferenceengine.vyro.ai/" + operation + ".vyro"
    const formData = new FormData()
    formData.append("image", Buffer.from(imageData), { filename: "enhance_image_body.jpg", contentType: "image/jpeg" })
    formData.append("model_version", 1, { "Content-Transfer-Encoding": "binary", contentType: "multipart/form-data; charset=utf-8" })

    formData.submit({
      url: baseUrl,
      host: "inferenceengine.vyro.ai",
      path: "/" + operation,
      protocol: "https:",
      headers: {
        "User-Agent": "okhttp/4.9.3",
        Connection: "Keep-Alive",
        "Accept-Encoding": "gzip"
      }
    },
      function (err, res) {
        if (err) return reject(err)
        const chunks = []
        res.on("data", function (chunk) { chunks.push(chunk) })
        res.on("end", function () { resolve(Buffer.concat(chunks)) })
        res.on("error", function (err) { reject(err) })
      },
    )
  })
}
