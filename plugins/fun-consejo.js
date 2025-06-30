const { generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default

let handler = async (m, { conn }) => {

  conn.reply(m.chat, `📡 *Módulo Humorístico Activado...*\n🧠 Localizando datos en el archivo de risas.\n⛓️ Espere mientras se procesa la petición...`, m)

  await conn.reply(m.chat, `┏━━━━━━━━━━━━━━━━┓\n🎤 *Fazbear Comedy System*\n┗━━━━━━━━━━━━━━━━┛\n\n❝ ${pickRandom(global.chiste)} ❞\n\n🎥 *— Log de humor procesado por FNaF LATAM™*`, m)
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
  return list[Math.floor(Math.random() * list.length)]
}

global.chiste = [
  "¿Cuál es el último animal que subió al arca de Noé? El del-fin.",
  "¿Cómo se dice pañuelo en japonés? Saka-moko.",
  "¿Cómo se dice disparo en árabe? Ahí-va-la-bala.",
  "¿Qué le dice un gusano a otro gusano? Voy a dar una vuelta a la manzana.",
  "Un gato empieza a ladrar. Otro gato le dice: ¿Estás loco? El primero responde: ¿No puedo aprender otro idioma?",
  "Doctor, ¿cómo salió el parto? Todo bien, pero tuvimos que ponerle oxígeno. ¡Pero doctor, queríamos ponerle Gabriel!",
  "¿Qué hace tu mamá? Nada. ¿Y la tuya? También nada.",
  "¿Cuál es el colmo de Aladdín? Tener mal genio.",
  "Tu trabajo me ha conmovido —dijo el profesor—. Porque me dio mucha pena.",
  "Mamá, no quiero jugar con Pedrito. ¿Por qué? Porque cuando le pego con un taco de madera, llora.",
  "Juanito, ¿qué harías si te ahogas en la piscina? Llorar para desahogarme.",
  "Hijo, ¿qué tengo? ¿Gorda, fea y vieja? —Mamá, tenés toda la razón.",
  "¿Cómo se dice pelo sucio en chino? Chin cham pu.",
  "Había un niño tan despistado que... da igual, olvidé el chiste.",
  "¿Qué tal la vida de casada? No me puedo quejar... porque está mi esposo al lado.",
  "¿Por qué las focas miran siempre hacia arriba? Porque ahí están los focos.",
  "Camarero, ese filete tiene nervios. —Normal, es su primera vez.",
  "¿Cómo se llama el primo de Bruce Lee? Broco Lee.",
  "Una madre le dice a su hijo: Jaimito, me dijo un pajarito que te drogas. —La que te drogas sos vos, que hablás con pajaritos."
]
