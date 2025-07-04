import axios from 'axios'
import cheerio from 'cheerio'

let handler = async (m, { conn, text }) => {
  const sistema = "Unidad de observación conectada 🎥\nFreddy Fazbear Security Protocol v1.3.7 activado ⛓️"
  if (!text) {
    return conn.reply(m.chat, `${emoji} Alerta: Se requiere término de búsqueda para iniciar consulta en base de datos.\n— Sistema respaldado por FNaF LATAM™`, m)
  }
  
  try {
    const response = await axios.get(`https://es.wikipedia.org/wiki/${encodeURIComponent(text)}`)
    const $ = cheerio.load(response.data)
    const titulo = $('#firstHeading').text().trim() || "Desconocido"
    let resumen = ''
    $('#mw-content-text > div.mw-parser-output > p').each((i, el) => {
      const texto = $(el).text().trim()
      if (texto.length > 30 && !texto.includes('referencias')) {
        resumen = texto
        return false // rompe el each
      }
    })

    if (!resumen) resumen = "##ERROR## Resumen no disponible."

    // Simular entrega progresiva del mensaje
    let mensaje = `「 📡 MONITOREO WIKI FNAF LATAM ™ 」\n\n▢ *Consulta aprobada* — ${titulo}\n\n${resumen}\n\n— Sistema respaldado por FNaF LATAM™`
    let salida = ''
    for (let i = 0; i < mensaje.length; i++) {
      salida += mensaje[i]
      if (i % 12 === 0) await new Promise(r => setTimeout(r, 12))
    }

    await conn.sendMessage(m.chat, { text: salida.trim() }, { quoted: m })

  } catch (e) {
    await conn.reply(m.chat, `${emoji2} --::SEQUENCE_BREAK::--\nError: No se encontraron resultados para su consulta.\n— Sistema respaldado por FNaF LATAM™`, m)
  }
}

handler.help = ['wikipedia']
handler.tags = ['tools']
handler.command = ['wiki', 'wikipedia']

export default handler
