let cooldowns = {}

let handler = async (m, { conn, text, command, usedPrefix }) => {
  let user = global.db.data.users[m.sender]

  const tiempoEspera = 10 // segundos

  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
    let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000))
    return conn.reply(m.chat, `${emoji3} Ya iniciaste una apuesta recientemente, espera *⏱ ${tiempoRestante}* para apostar de nuevo.`, m)
  }

  if (!text) return conn.reply(m.chat, `${emoji} Debes ingresar una cantidad de *💸 ${moneda}* y apostar a un color, por ejemplo: *${usedPrefix + command} 20 black*`, m)

  let args = text.trim().split(" ")
  if (args.length !== 2) return conn.reply(m.chat, `${emoji2} Formato incorrecto. Usa: *${usedPrefix + command} <cantidad> <color>*\nEjemplo: *${usedPrefix + command} 20 black*`, m)

  let coin = parseInt(args[0])
  let color = args[1].toLowerCase()

  if (isNaN(coin) || coin <= 0) return conn.reply(m.chat, `${emoji} Ingresa una cantidad válida para apostar.`, m)

  if (coin > 50) return conn.reply(m.chat, `${emoji} La apuesta máxima es de 50 ${moneda}.`, m)

  if (color !== 'black' && color !== 'red') return conn.reply(m.chat, `${emoji2} Elige un color válido: *black* o *red*.`, m)

  if (coin > user.coin) return conn.reply(m.chat, `${emoji2} No tienes suficientes ${moneda} para apostar esa cantidad.`, m)

  cooldowns[m.sender] = Date.now()

  await conn.reply(m.chat, `${emoji} Apostaste ${coin} *💸 ${moneda}* al color *${color}*. Espera *⏱ 10 segundos* para conocer el resultado.`, m)

  setTimeout(() => {
    let resultado = Math.random()
    let gano = (resultado < 0.5 && color === 'black') || (resultado >= 0.5 && color === 'red')

    if (gano) {
      user.coin += coin
      conn.reply(m.chat, `${emoji} ¡Ganaste! Obtuviste ${coin} *💸 ${moneda}*. Ahora tienes ${user.coin} *💸 ${moneda}*.`, m)
    } else {
      user.coin -= coin
      conn.reply(m.chat, `${emoji2} Perdiste. Se te descontaron ${coin} *💸 ${moneda}*. Ahora tienes ${user.coin} *💸 ${moneda}*.`, m)
    }
  }, 10000)
}

handler.tags = ['economy']
handler.help = ['ruleta <cantidad> <color>']
handler.command = ['ruleta', 'roulette', 'rt']
handler.register = true
handler.group = true 

export default handler

function segundosAHMS(segundos) {
  let s = segundos % 60
  return `${s} segundos`
}
