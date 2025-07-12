import hispamemes from 'hispamemes'

let handler = async (m, { conn, usedPrefix, command }) => {
  const meme = hispamemes.meme()
  await conn.sendFile(m.chat, meme, '', `🎥 *¡Meme aterrador de FNaF LATAM para ti!* 👻`, m)
  m.react('🎃')  // Emoji temático FNaF
}

handler.help = ['meme']
handler.tags = ['fun', 'fnaflatam']
handler.command = ['meme', 'memes']
handler.coin = 1
handler.group = true
handler.register = true

export default handler
