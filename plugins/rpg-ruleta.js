let cooldowns = {}

let handler = async (m, { conn, text, command, usedPrefix }) => {
  let users = global.db.data.users[m.sender]

  let tiempoEspera = 10

  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
    let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000))
    conn.reply(m.chat, `${emoji3} ⏳ Has lanzado la ruleta recientemente. Espera *⏱ ${tiempoRestante}* antes de intentar de nuevo en este oscuro juego.`, m)
    return
  }

  cooldowns[m.sender] = Date.now()

  if (!text) return conn.reply(m.chat, `${emoji} Para jugar, ingresa la cantidad de *💸 ${moneda}* que arriesgarás y elige tu color de la suerte: *${usedPrefix + command} 20 black*`, m)

  let args = text.trim().split(" ")
  if (args.length !== 2) return conn.reply(m.chat, `${emoji2} Formato incorrecto. Debes ingresar una cantidad y un color: *${usedPrefix + command} 20 black*`, m)

  let coin = parseInt(args[0])
  let color = args[1].toLowerCase()

  if (isNaN(coin) || coin <= 0) return conn.reply(m.chat, `${emoji} Cantidad inválida. Solo números positivos para jugar con el destino.`, m)

  if (coin > 10000) return conn.reply(m.chat, `${emoji} La apuesta máxima permitida es de 50 ${moneda}. No te arriesgues más allá del umbral.`, m)

  if (!(color === 'black' || color === 'red')) return conn.reply(m.chat, `${emoji2} Solo puedes apostar a *black* o *red*. Escoge sabiamente bajo la tenue luz.`, m)

  if (coin > users.coin) return conn.reply(m.chat, `${emoji2} No posees suficientes *${moneda}* para esa apuesta. Tus recursos son limitados, vigilante.`, m)

  await conn.reply(m.chat, `${emoji} Has apostado *${coin} 💸 ${moneda}* al color *${color}*. La ruleta gira en la oscuridad... Espera *⏱ 10 segundos* para conocer tu destino.`, m)

  setTimeout(() => {
    let result = Math.random()
    let win = false

    if (result < 0.5) {
      win = color === 'black'
    } else {
      win = color === 'red'
    }

    if (win) {
      users.coin += coin
      conn.reply(m.chat, `${emoji} 🎉 ¡La fortuna te sonríe! Ganaste *${coin} 💸 ${moneda}*. Ahora tienes *${users.coin} 💸 ${moneda}*. Que la noche siga a tu favor.`, m)
    } else {
      users.coin -= coin
      conn.reply(m.chat, `${emoji2} 💀 La suerte te ha abandonado. Perdiste *${coin} 💸 ${moneda}*. Te quedan *${users.coin} 💸 ${moneda}*. Vuelve a intentar, pero cuidado con las sombras.`, m)
    }

  }, 10000)
}
handler.tags = ['economy']
handler.help = ['ruleta *<cantidad> <color>*']
handler.command = ['ruleta', 'roulette', 'rt']
handler.register = true
handler.group = true 

export default handler

function segundosAHMS(segundos) {
  let segundosRestantes = segundos % 60
  return `${segundosRestantes} segundos`
}
