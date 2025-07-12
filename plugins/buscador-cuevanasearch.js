import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
const emoji = '🎬👁️‍🗨️'
const msm = '⚠️'

if (!text) return m.reply(`${emoji} *¡Se te olvidó escribir el nombre de la película!*\n\n🔍 *Ejemplo:* */cuevana Deadpool*\n\n🌙 *Respaldado por FNAF LATAM* 🌙`)

try {
  let api = await fetch(`https://delirius-apiofc.vercel.app/search/cuevana?q=${encodeURIComponent(text)}`)
  let json = await api.json()

  let JT = `🎞️ *BÚSQUEDA DE PELÍCULA EN CUEVANA* 🎞️\n📼 _Resultados para:_ *"${text}"*\n───────────────────────`

  json.data.forEach((app, index) => {
    JT += `\n\n🔸 *${index + 1}.* 🎬 *${app.title}*`
    JT += `\n🖼️ *Imagen:* ${app.image}`
    JT += `\n📝 *Descripción:* ${app.description}`
    JT += `\n🔗 *Ver ahora:* ${app.link}`
    JT += `\n━━━━━━━━━━━━━━━━━━━━━`
  }) 

  JT += `\n\n🌙 *Respaldado por FNAF LATAM* 🌙`
  m.reply(JT)

} catch (error) {
  console.error(error)
  m.reply(`${msm} Algo salió mal mientras se buscaba tu película. Intenta más tarde.`)
}}

handler.command = ['cuevanasearch', 'cuevana']

export default handler
