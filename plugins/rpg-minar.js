let cooldowns = {}

let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]
  if (!user) return

  // Inicializar campos si no existen
  user.coin = user.coin || 0
  user.emerald = user.emerald || 0
  user.iron = user.iron || 0
  user.gold = user.gold || 0
  user.coal = user.coal || 0
  user.stone = user.stone || 0
  user.exp = user.exp || 0
  user.health = user.health ?? 100
  user.pickaxedurability = user.pickaxedurability || 100
  user.diamond = user.diamond || 0

  let coin = pickRandom([20, 5, 7, 8, 88, 40, 50, 70, 90, 999, 300])
  let emerald = pickRandom([1, 5, 7, 8])
  let iron = pickRandom([5, 6, 7, 9, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80])
  let gold = pickRandom([20, 5, 7, 8, 88, 40, 50])
  let coal = pickRandom([20, 5, 7, 8, 88, 40, 50, 80, 70, 60, 100, 120, 600, 700, 64])
  let stone = pickRandom([200, 500, 700, 800, 900, 4000, 300])
  let diamond = pickRandom([1, 2, 3, 4])
  let hasil = Math.floor(Math.random() * 1000)

  let img = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745557957843.jpeg'
  let time = user.lastmiming + 600000

  if (new Date() - user.lastmiming < 600000) {
    return conn.reply(m.chat, `⏳ *¡Cuidado!* Debes esperar *${msToTime(time - new Date())}* para volver a minar en las profundidades de Freddy Fazbear's.`, m)
  }

  let info = `╭─⛏️ 〔 *MINERÍA NOCTURNA FNaF LATAM* 〕
│👹 *Te has adentrado en las cuevas tenebrosas...*
│
│🍬 *Recursos Obtenidos:*
│✨ *Experiencia:* +${hasil}
│💸 *FazCoins:* +${coin}
│♦️ *Esmeraldas:* +${emerald}
│🔩 *Hierro:* +${iron}
│🏅 *Oro:* +${gold}
│🕋 *Carbón:* +${coal}
│🪨 *Piedra:* +${stone}
│💎 *Diamantes:* +${diamond}
╰─────────────────────────────
_💀 ¡Cuidado con Freddy! Tu salud disminuyó en 50 y tu pico perdió durabilidad._`

  await conn.sendFile(m.chat, img, 'fnaf_mining.jpg', info, fkontak)
  await m.react('⛏️')

  // Sumar los recursos
  user.health -= 50
  user.pickaxedurability -= 30
  user.exp += hasil
  user.coin += coin
  user.iron += iron
  user.gold += gold
  user.emerald += emerald
  user.coal += coal
  user.stone += stone
  user.diamond += diamond
  user.lastmiming = new Date() * 1
}

handler.help = ['minar']
handler.tags = ['economy']
handler.command = ['minar', 'miming', 'mine']
handler.register = true
handler.group = true

export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60)

  minutes = (minutes < 10) ? '0' + minutes : minutes
  seconds = (seconds < 10) ? '0' + seconds : seconds

  return minutes + ' m y ' + seconds + ' s'
}
