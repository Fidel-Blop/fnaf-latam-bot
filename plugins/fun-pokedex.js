import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `⚙️ *Error de sistema:* Ingresa el nombre del Pokémon que deseas rastrear en los registros del *Archivo Animatrónico*.`, m)

  await m.react('📡')
  conn.reply(m.chat, `🦾 *Rastreando al sujeto identificado como* "<${text}>"...\n💀 *Accediendo a la base de datos Poké-Fazbear™...*`, m)

  const url = `https://some-random-api.com/pokemon/pokedex?pokemon=${encodeURIComponent(text)}`
  const response = await fetch(url)
  const json = await response.json()

  if (!response.ok) {
    await m.react('❌')
    return conn.reply(m.chat, '⚠️ *Falla en la conexión con el servidor animatrónico.* No se pudo recuperar la información del Pokémon.', m)
  }

  const aipokedex = 
`*📁 POKEDEX - FNAF LATAM 🔍*\n\n` +
`🧬 *Nombre:* ${json.name}\n` +
`🆔 *ID:* ${json.id}\n` +
`💠 *Tipo:* ${json.type}\n` +
`🛠️ *Habilidades:* ${json.abilities}\n` +
`📏 *Altura:* ${json.height}\n` +
`⚖️ *Peso:* ${json.weight}\n\n` +
`📜 *Descripción de archivo:*\n${json.description}\n\n` +
`🔗 *Más detalles confidenciales en:* \nhttps://www.pokemon.com/es/pokedex/${json.name.toLowerCase()}`

  conn.reply(m.chat, aipokedex, m)
  await m.react('✅')
}

handler.help = ['pokedex *<pokemon>*']
handler.tags = ['fun']
handler.group = true
handler.register = true
handler.command = ['pokedex']

export default handler
