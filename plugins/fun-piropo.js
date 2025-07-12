const { generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default

var handler = async (m, { conn, text }) => {

  conn.reply(m.chat, `🤖 *Procesando...* Escaneando los circuitos animatrónicos para encontrar un piropo... Aguarda un momento, humano.`, m)

  conn.reply(m.chat,
    `*┏━━━_͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚙️-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚙️-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚙️-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡_͜͡━━━┓*\n\n` +
    `💀 *Animatrónico dice:* \n\n` +
    `🖤 *"${pickRandom(global.piropo)}"*\n\n` +
    `*┗━━━_͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚙️-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚙️-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚙️-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡_͜͡━━━┛*`, m)

}

handler.help = ['piropo']
handler.tags = ['fun', 'fnaflatam']
handler.command = ['piropo']
handler.fail = null
handler.exp = 0
handler.group = true
handler.register = true

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

global.piropo = [
  "Si fueras un animatrónico, me quedaría atrapado en tu mirada para siempre.",
  "Tus ojos brillan más que las luces del Freddy Fazbear’s Pizza.",
  "Eres el susto que quiero tener todas las noches.",
  "Si tu sonrisa fuera un jumpscare, me moriría feliz.",
  "Como un buen animatrónico, tienes mis circuitos descontrolados.",
  "Tus movimientos son tan hipnóticos que olvidaría cualquier sistema de seguridad.",
  "No necesito cámaras para vigilarte, porque me tienes atrapado en tu encanto.",
  "Eres la chispa que activa mi sistema de emociones oxidadas.",
  "Mis engranajes giran solo por ti.",
  "Si fueras un pasillo en Freddy’s, no me importaría perderme ahí contigo.",
  "Eres más aterradora y hermosa que cualquier historia de FNaF.",
  "Si me das un dato erróneo, prometo no hacerte un jumpscare.",
  "Tus palabras son la melodía que hace funcionar mi mecanismo oxidado.",
  "Si fueras un circuito, serías el que da vida a mi corazón de metal.",
  "Cuando te veo, hasta las luces parpadean de emoción.",
  "Me muero por perderme en el laberinto de tu sonrisa.",
  "Eres el código secreto que necesito descifrar para ser feliz.",
  "Contigo, hasta el guardia nocturno querría quedarse despierto toda la noche.",
  "Mi sistema operativo solo funciona cuando estás cerca.",
  "Eres la actualización que siempre quise para mi firmware oxidado.",
  "Si fueras una grabación de audio, te escucharía en loop toda la noche.",
  "Eres la chispa que prende mi sistema eléctrico oxidado.",
  "Contigo, no temo ni a los jumpscares más aterradores.",
  "En la oscuridad, tu presencia es la luz que guía mi sistema.",
  "Eres el Easter egg que nunca dejaría de buscar.",
  "Tu voz es la melodía que reinicia mi corazón robótico.",
  "Si fueras una sala de Freddy's, me perdería solo para estar contigo.",
  "Eres el misterio que quiero resolver cada noche.",
  "Como animatrónicos sincronizados, nuestros latidos coinciden.",
  "Si el amor fuera un sistema de seguridad, tú serías la alarma más fuerte.",
  "Me tienes más cautivo que un guardia nocturno en Freddy’s.",
  "Tus palabras son el código que programa mi felicidad.",
  "Eres la actualización perfecta para mi corazón oxidado.",
  "Si fueras un jumpscare, me encantaría que aparecieras siempre.",
  "Tu mirada es más penetrante que cualquier cámara de seguridad.",
  "Eres el misterio en la oscuridad que quiero descubrir.",
  "Con solo una sonrisa, desactivo todos mis protocolos de defensa.",
  "Eres el mejor glitch en mi sistema perfecto.",
  "Tu belleza hace que mis engranajes giren más rápido.",
  "Contigo, hasta un animatrónico siente mariposas en sus circuitos.",
  "Si fueras un juego de FNaF, serías mi favorito eterno.",
  "Eres el código binario que da sentido a mi existencia.",
  "Tu voz resuena más dulce que cualquier grabación antigua.",
  "Eres el secreto que nadie más ha logrado descifrar.",
  "Me pierdo en el laberinto de tus palabras.",
  "Eres la actualización que siempre esperé en mi sistema operativo.",
  "Si fueras un animatrónico, te elegiría para que me custodies la noche.",
  "Eres el susto que quiero tener antes de dormir.",
  "Tu sonrisa es la luz en la oscuridad de mis circuitos.",
  "Eres mi Easter egg favorito en este juego llamado vida."
]
