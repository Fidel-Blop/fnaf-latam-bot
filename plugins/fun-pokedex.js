import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `👁 *Sistema de escaneo inactivo...* \n\n⛔ Ingrese el nombre de una criatura biológica para proceder con el análisis Pokédex.`, m)

  await m.react('📡')
  conn.reply(m.chat, `🎥 *Monitoreo FNaF LATAM™ activado.*\n\n🧠 Buscando en bases de datos de especies anómalas: *<${text}>*...`, m)

  try {
    const url = `https://some-random-api.com/pokemon/pokedex?pokemon=${encodeURIComponent(text)}`
    const response = await fetch(url)
    if (!response.ok) throw new Error('No encontrado')
    const json = await response.json()

    const pokedata = `
👁 *Módulo Pokédex FNaF LATAM - Archivo: ${json.name.toUpperCase()}*

🔖 *ID Biológico:* ${json.id}
💬 *Clasificación Elemental:* ${json.type}
⚙️ *Habilidades Primarias:* ${json.abilities}
🎴 *Altura:* ${json.height}
⚖️ *Masa Corporal:* ${json.weight}

📄 *Informe de Campo:*
${json.description}

📂 Acceso complementario:
🔗 https://www.pokemon.com/es/pokedex/${json.name.toLowerCase()}

— Sistema respaldado por FNaF LATAM™
`

    conn.reply(m.chat, pokedata.trim(), m)
    await m.react('✅')
  } catch (e) {
    await m.react('⛔')
    conn.reply(m.chat, `⚠️ *Error de lectura en la Pokédex.*\n\n📉 Especie no registrada o conexión interrumpida.\n\n— FNaF LATAM™ Monitoring Protocol`, m)
  }
}

handler.help = ['pokedex *<pokemon>*']
handler.tags = ['fun']
handler.command = ['pokedex']
handler.group = true
handler.register = true

export default handler
