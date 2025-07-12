var handler = async (m, { conn, command, text }) => {

  if (!text) return conn.reply(m.chat, '💔 *[FNaF LATAM]*\n\n📎 Por favor, escribí tu nombre y el de otra persona para analizar la compatibilidad.', m)

  let [text1, ...text2] = text.split(' ')
  text2 = (text2 || []).join(' ')

  if (!text2) return conn.reply(m.chat, '📌 *[FNaF LATAM]*\n\n💬 Ingresá también el nombre de la segunda persona para completar el escaneo.', m)

  let porcentaje = Math.floor(Math.random() * 100)
  let love = `🫀 *[FNaF LATAM - Scanner de Compatibilidad]*\n\n🔍 Analizando nombres...\n\n🧸 *${text1}* y *${text2}* tienen una compatibilidad del *${porcentaje}%*.\n\n📊 Resultado calculado por el sistema de IA animatrónica.`

  m.reply(love, null, { mentions: conn.parseMention(love) })
}

handler.help = ['ship', 'love']
handler.tags = ['fun']
handler.command = ['ship','pareja']
handler.group = true
handler.register = true

export default handler
