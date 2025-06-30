import axios from 'axios'
import baileys from '@whiskeysockets/baileys'

let handler = async (m, { conn, text }) => {
  if (!text) {
    return m.reply(`👁 *Consulta incompleta.*\n📎 Ingrese un término para analizar en los registros visuales.\n\n📌 Ejemplo: /pinterest chica animatrónica`)
  }

  try {
    await m.react('📡')

    let results = await pins(text)
    if (!results.length) {
      return conn.reply(m.chat, `⚠️ *No se hallaron imágenes asociadas a "${text}".*\nReintente con otros parámetros.`, m)
    }

    const medias = results.slice(0, 10).map(img => ({ type: 'image', data: { url: img.hd } }))

    await conn.sendSylphy(m.chat, medias, {
      caption: `🎥 *UNIDAD DE ESCANEO VISUAL – ARCHIVO PINTEREST*

📌 *Término escaneado:* "${text}"
🧠 *Muestras recuperadas:* ${medias.length}
📂 *Fuente de consulta:* red compartida externa

━━━━━━━━━━━━━━━━━━━━━━
⛔ *RESTRICCIÓN CORPORATIVA*

🚫 Se prohíbe el uso de este comando para buscar imágenes relacionadas con:
— Contenido +18
— Hentai o pornografía
— Gore explícito
— Material perturbador

⚠️ Cualquier intento de utilizar este módulo para fines indebidos será detectado por el sistema de vigilancia, y el usuario será notificado al equipo de administración.

📛 *Sanciones posibles:*
— Eliminación del mensaje
— Advertencia oficial
— Expulsión de la comunidad

— Sistema respaldado por FNaF LATAM™`,
      quoted: m
    })

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  } catch (error) {
    conn.reply(m.chat, `❌ *Falla en el sistema de escaneo.*\n\n⚙️ Detalles técnicos: ${error.message}`, m)
  }
}

handler.help = ['pinterest']
handler.command = ['pinterest', 'pin']
handler.tags = ['dl']
handler.group = true

export default handler

const pins = async (query) => {
  try {
    const { data } = await axios.get(`https://api.stellarwa.xyz/search/pinterest?query=${query}`)

    if (data?.status && data?.data?.length) {
      return data.data.map(item => ({
        hd: item.hd,
        mini: item.mini
      }))
    }

    return []
  } catch (error) {
    console.error("🧠 Error al obtener imágenes de Pinterest:", error)
    return []
  }
}
