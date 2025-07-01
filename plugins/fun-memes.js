import hispamemes from 'hispamemes'

let handler = async (m, { conn }) => {
  const meme = hispamemes.meme()

  await conn.sendMessage(m.chat, {
    image: { url: meme },
    caption: `🎥 *Sistema de entretenimiento activado...* ⚙️\n\n📡 Recuperando archivo de humor visual desde la base de datos de *FazbearNet*...\n\n✅ *Transferencia completada.*\n\n🧠 *Unidad: MEME-CORE*\n🔐 Clasificación: Humor inestable\n\n— Sistema de Proyección FNaF LATAM™`,
  }, { quoted: m })

  m.react('📡') // Emoji de escaneo o sincronización
}

handler.help = ['meme']
handler.tags = ['fun']
handler.command = ['meme', 'memes']
handler.coin = 1
handler.group = true
handler.register = true

export default handler
