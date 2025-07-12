var handler = async (m, { conn, text, usedPrefix, command }) => {

  if (!text) return conn.reply(m.chat, `📡 *[FNaF LATAM – ERROR]*\n\n⛔ El sistema no puede procesar una entrada vacía.\n💬 Por favor, ingresa una pregunta válida.`, m)

  await m.react('🤖')
  await delay(1000)
  await m.react('🔄')
  await delay(1000)
  await m.react('💀')
  await delay(1000)

  await conn.reply(m.chat, 
`╔═══『 📍 *FNaF LATAM – RESPUESTA* 』═══╗
║ 
║ 🤔 *Pregunta:* ${text}
║ 🎯 *Respuesta:* ${res}
║ 
╚═════════════════════════════════╝`, m)
}

handler.help = ['pregunta']
handler.tags = ['fun', 'fnaflatam']
handler.command = ['pregunta', 'preguntas']
handler.group = true
handler.register = true

export default handler

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

let res = [
  'Sí',
  'Tal vez sí',
  'Posiblemente',
  'Probablemente no',
  'No',
  'Imposible',
  '¿Por qué haces estas preguntas?',
  'Por eso te dejo...',
  '¿Para qué querés saber eso?',
  'No te diré la respuesta',
  '⚠️ Sistema colapsando... intenta más tarde',
  '🔐 Archivo bloqueado por seguridad animatrónica',
  '📁 Respuesta oculta por protocolo Fazbear',
  '🛑 Consulta denegada. Rastro anómalo detectado',
  '🦾 El animatrónico se niega a responder',
  '🔧 Sistema inestable... respuesta incierta',
  '⛓️ Acceso restringido. Pregunta no autorizada'
].getRandom()
