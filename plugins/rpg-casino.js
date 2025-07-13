import db from '../lib/database.js'

let buatall = 1
let cooldowns = {}

let handler = async (m, { conn, args, usedPrefix, command, DevMode }) => {
  let user = global.db.data.users[m.sender]
  let randomaku = `${Math.floor(Math.random() * 101)}`.trim()
  let randomkamu = `${Math.floor(Math.random() * 55)}`.trim()
  let Aku = (randomaku * 1)
  let Kamu = (randomkamu * 1)
  let count = args[0]
  let who = m.fromMe ? conn.user.jid : m.sender
  let username = conn.getName(who)
  let tiempoEspera = 15
  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
    let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000))
    conn.reply(m.chat, `⏳ *¡Cazador animatrónico!* Has apostado hace poco.\nEspera *${tiempoRestante}* antes de intentarlo de nuevo.`, m)
    return
  }
  cooldowns[m.sender] = Date.now()
  count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].limit / buatall) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
  count = Math.max(1, count)
  if (args.length < 1) return conn.reply(m.chat, `🦾 Ingresa la cantidad de *💸 ${moneda}* que deseas arriesgar contra *${botname}*.\n\nEjemplo:\n> *${usedPrefix + command}* 100`, m)
  if (user.coin >= count * 1) {
    user.coin -= count * 1
    if (Aku > Kamu) {
      conn.reply(m.chat, `🤖 \`¡Hora del juego! Veamos los números... 🕹️\`\n\n` +
        `➠ *${botname}*: ${Aku}\n➠ *${username}*: ${Kamu}\n\n` +
        `⚠️ ${username}, *has PERDIDO* ${formatNumber(count)} 💸 ${moneda}. Sigue intentando, cazador.`, m)
    } else if (Aku < Kamu) {
      user.coin += count * 2
      conn.reply(m.chat, `🎉 \`¡Suerte de animatrónico!\` 🦾\n\n` +
        `➠ *${botname}*: ${Aku}\n➠ *${username}*: ${Kamu}\n\n` +
        `✨ ${username}, *has GANADO* ${formatNumber(count * 2)} 💸 ${moneda}. ¡Sigue así!`, m)
    } else {
      user.coin += count * 1
      conn.reply(m.chat, `🔄 \`Empate en la partida...\`\n\n` +
        `➠ *${botname}*: ${Aku}\n➠ *${username}*: ${Kamu}\n\n` +
        `⚖️ ${username}, recuperas tu apuesta de ${formatNumber(count)} 💸 ${moneda}.`, m)
    }
  } else conn.reply(m.chat, `❌ No tienes suficiente *${formatNumber(count)} 💸 ${moneda}* para apostar. ¡Sigue cazando recompensas!`, m)
}

handler.help = ['apostar *<cantidad>*']
handler.tags = ['economia']
handler.command = ['apostar','casino']
handler.group = true;
handler.register = true
handler.fail = null
export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
function segundosAHMS(segundos) {
  let segundosRestantes = segundos % 60
  return `${segundosRestantes} segundos`
}
function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
