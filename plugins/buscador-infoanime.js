import fetch from 'node-fetch'

var handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) {
    return conn.reply(m.chat, `👁 *Petición incompleta.*\n📎 Ingrese el nombre de un anime.\n\n📌 Ejemplo: ${usedPrefix + command} Roshidere`, m)
  }

  let res = await fetch('https://api.jikan.moe/v4/manga?q=' + text)
  if (!res.ok) return conn.reply(m.chat, `⚠️ Error en el sistema de escaneo. Intente más tarde.`, m)

  let json = await res.json()
  let data = json.data[0]

  let {
    chapters,
    title_japanese,
    url,
    type,
    score,
    members,
    background,
    status,
    volumes,
    synopsis,
    favorites
  } = data

  let author = data.authors[0]?.name || 'Desconocido'

  let animeInfo = `🎴 *ARCHIVO DE MANGA/ANIME DETECTADO* 🎴

📌 *Título Japonés:* ${title_japanese}
📚 *Capítulos:* ${chapters}
🎞️ *Formato:* ${type}
📡 *Estado:* ${status}
📦 *Volúmenes:* ${volumes}
❤️ *Favoritos:* ${favorites}
⭐ *Puntaje:* ${score}
👥 *Miembros:* ${members}
👨‍🔬 *Autor:* ${author}
🌐 *URL:* ${url}

🧠 *Sinopsis:*\n${synopsis || 'No disponible'}

📂 *Contexto de Fondo:*\n${background || 'No especificado'}

━━━━━━━━━━━━━━━━━━━━━
⛔ *RESTRICCIÓN DE CONTENIDO CORPORATIVA*

🚫 No se permite la búsqueda ni difusión de animes que contengan:
— Temática +18
— Hentai
— Gore explícito
— Material perturbador

⚠️ Si se detecta el uso de este comando con dichos fines, el sistema de vigilancia notificará al *administrador de turno*, quien procederá con la eliminación inmediata del *mensaje y usuario* a nivel de toda la comunidad.

— Sistema respaldado por FNaF LATAM™
`

  conn.sendFile(m.chat, data.images.jpg.image_url, 'animeinfo.jpg', animeInfo, fkontak, m)
}

handler.help = ['infoanime']
handler.tags = ['anime']
handler.group = true
handler.register = true
handler.command = ['infoanime', 'animeinfo']

export default handler
