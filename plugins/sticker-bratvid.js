import axios from 'axios'
import { sticker } from '../lib/sticker.js'

const fetchStickerVideo = async (text) => {
  const response = await axios.get(`https://api.nekorinn.my.id/maker/bratvid`, {
    params: { text },
    responseType: 'arraybuffer'
  })
  if (!response.data) throw new Error('##ERROR## Sistema de medios: respuesta vacía.')
  return response.data
}

let handler = async (m, { conn, text }) => {
  if (m.quoted && m.quoted.text) {
    text = m.quoted.text
  } else if (!text) {
    return conn.sendMessage(m.chat, {
      text: `📡 *Unidad de vigilancia textual inactiva...*

🚧 No se detectó texto.

🔧 Protocolo requerido: responde a un mensaje o escribe algo para generar un sticker animado.

— Sistema respaldado por FNaF LATAM™`
    }, { quoted: m })
  }

  let userId = m.sender
  let packstickers = global.db.data.users[userId] || {}
  let texto1 = packstickers.text1 || global.packsticker
  let texto2 = packstickers.text2 || global.packsticker2

  try {
    const videoBuffer = await fetchStickerVideo(text)
    const stickerBuffer = await sticker(videoBuffer, null, texto1, texto2)

    await conn.sendMessage(m.chat, {
      sticker: stickerBuffer
    }, { quoted: m })

  } catch (e) {
    await conn.sendMessage(m.chat, {
      text: `🛑 *Falla crítica en módulo multimedia*

⚠️ Detalles del fallo: ${e.message}

⛓️ Reinicie el protocolo o intente nuevamente...

— Sistema respaldado por FNaF LATAM™`
    }, { quoted: m })
  }
}

handler.help = ['bratvid <texto>']
handler.tags = ['sticker']
handler.command = ['bratvid', 'bratv']

export default handler
