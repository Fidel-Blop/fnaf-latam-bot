var handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `👁 *Sistema de consulta inactivo.*\n\n⚙️ Ingrese una pregunta para iniciar el protocolo de predicción.`, m)

  await m.react('❔')
  await delay(1000)
  await m.react('❓')
  await delay(1000)
  await m.react('❔')
  await delay(1000)

  const respuesta = pickRandom([
    '✅ Sí.',
    '🔄 Tal vez sí.',
    '⚙️ Posiblemente.',
    '⛔ Probablemente no.',
    '❌ No.',
    '🧠 Imposible.',
    '💬 ¿Por qué haces estas preguntas?',
    '📴 Por eso te dejo...',
    '📡 ¿Para qué quieres saber eso?',
    '🔒 No te diré la respuesta.',
    '⚠️ Monitoreo comprometido. Reiniciando lógica...'
  ])

  const sistema = `🎥 *Monitoreo FNaF LATAM™ - Unidad de Respuesta Predictiva*\n\n📍 *Pregunta:* ${text}\n📤 *Respuesta:* ${respuesta}\n\n— Sistema respaldado por FNaF LATAM™`

  await conn.reply(m.chat, sistema, m)
}

handler.help = ['pregunta']
handler.tags = ['fun']
handler.command = ['pregunta','preguntas']
handler.group = true
handler.register = true

export default handler

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
