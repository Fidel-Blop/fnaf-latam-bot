const { generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default

var handler = async (m, { conn, text }) => {

  const openingMsg = `🎥🟣 *[ FNaF LATAM - Módulo de Humor Activado ]*\n⛓️ Iniciando búsqueda en base de datos de entretenimiento...\n📡 Un momento, estableciendo conexión con la unidad de chistes...`

  const joke = `🔊🧠 *Monitoreo FNaF LATAM: ejecución autorizada*\n\n📍 *Chiste encontrado en los registros obsoletos:*\n\n» 「 ${pickRandom(global.chiste)} 」\n\n⚙️— Sistema respaldado por FNaF LATAM™`

  await conn.reply(m.chat, openingMsg, m)
  await conn.reply(m.chat, joke, m)
}

handler.help = ['chiste']
handler.tags = ['fun']
handler.command = ['chiste']
handler.fail = null
handler.exp = 0
handler.group = true
handler.register = true

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

global.chiste = [
  "¿Cuál es el último animal que subió al arca de Noé? El del-fin.",
  "¿Cómo se dice pañuelo en japonés? Saka-moko.",
  "¿Cómo se dice disparo en árabe? Ahí-va-la-bala.",
  "¿Qué le dice un gusano a otro gusano? Voy a dar una vuelta a la manzana.",
  "Un gato empieza a ladrar en el tejado. Otro le dice: ¿por qué ladras? El otro responde: ¿Acaso no puedo aprender otro idioma?",
  "El doctor le dice al paciente: respire profundo que lo voy a auscultar. El paciente responde: ¿a quién va a ocultar?",
  "Sale el doctor después del parto. El padre pregunta: ¿cómo salió todo? El doctor responde: bien, pero le colocamos oxígeno. El padre: ¡Queríamos ponerle Gabriel!",
  "Un pez le pregunta a otro: ¿qué hace tu mamá? Nada. ¿Y la tuya? También nada.",
  "¿Cuál es el colmo de Aladdín? Tener mal genio.",
  "El profesor le dice al alumno: tu trabajo me ha conmovido. El alumno: ¿por qué? El profesor: porque me dio mucha pena.",
  "Niño: Mamá, no quiero jugar más con Pedrito. Mamá: ¿Por qué? Niño: Porque cuando jugamos a los tacos de madera y le pego en la cabeza, se pone a llorar.",
  "Juanito, ¿qué harías si te ahogaras en la piscina? Me pondría a llorar para desahogarme.",
  "Hijo, me veo gorda, fea y vieja. ¿Qué tengo? Tienes toda la razón.",
  "¿Cómo se dice pelo sucio en chino? Chin cham pu.",
  "Había un niño tan despistado que... ¡me olvidé del chiste!",
  "¿Qué tal va la vida de casada? No me puedo quejar... porque mi marido está al lado.",
  "¿Por qué las focas miran hacia arriba? ¡Porque ahí están los focos!",
  "Camarero, este filete tiene muchos nervios. Normal, es la primera vez que lo comen.",
  "¿Cómo se llama el primo de Bruce Lee? Broco Lee.",
  "Mamá: Jaimito, me dijo un pajarito que te drogas. Jaimito: La que se droga sos vos, que hablás con pajaritos."
]
