import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]
  let img = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745557963353.jpeg'

  if (!user) {
    return conn.reply(m.chat, `📂 El perfil del guardia no fue encontrado en la base de datos.`, m)
  }

  if (user.health < 80) {
    return conn.reply(m.chat, '💉 No tienes suficiente energía vital para enfrentar la noche...\nUsa *.heal* para recuperarte.', m)
  }

  if (user.lastAdventure && new Date() - user.lastAdventure <= 1500000) {
    let timeLeft = 1500000 - (new Date() - user.lastAdventure)
    return conn.reply(m.chat, `⏱️ Aún no estás listo para salir nuevamente.\n⌛ Espera ${msToTime(timeLeft)} antes de la próxima expedición.`, m)
  }

  let kingdoms = [
    'Fazbear Hills',
    'Territorio Fredbear',
    'Mazmorras de Bonnie',
    'Dominio de Chica',
    'Refugio de Foxy',
    'Sótano de Golden Freddy',
    'Cueva de Springtrap',
    'Sector Puppet',
    'Ángulo de Mangle',
    'Zona Glitchtrap'
  ]

  let randomKingdom = pickRandom(kingdoms)
  let coin = pickRandom([20, 5, 7, 8, 88, 40, 50, 70, 90, 999, 300])
  let emerald = pickRandom([1, 5, 7, 8])
  let iron = pickRandom([5, 6, 7, 9, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80])
  let gold = pickRandom([20, 5, 7, 8, 88, 40, 50])
  let coal = pickRandom([20, 5, 7, 8, 88, 40, 50, 80, 70, 60, 100, 120, 600, 700, 64])
  let stone = pickRandom([200, 500, 700, 800, 900, 4000, 300])
  let diamonds = pickRandom([1, 2, 3, 4, 5])
  let exp = pickRandom([10, 20, 30, 40, 50])

  user.coin += coin
  user.emerald += emerald
  user.iron += iron
  user.gold += gold
  user.coal += coal
  user.stone += stone
  user.diamonds += diamonds
  user.exp += exp
  user.health -= 50
  user.lastAdventure = new Date()
  if (user.health < 0) user.health = 0

  let info = `
🌌 *Expedición Nocturna Finalizada*
━━━━━━━━━━━━━━━━━━━━━━━
🕯️ Zona Ingresada: *${randomKingdom}*

🎁 Recompensas Obtenidas:
> 💸 ${moneda} » *${coin}*
> ♦️ Esmeraldas » *${emerald}*
> 🔩 Hierro » *${iron}*
> 🏅 Oro » *${gold}*
> 🕋 Carbón » *${coal}*
> 🪨 Piedra » *${stone}*
> 💎 Diamantes » *${diamonds}*
> ✨ Exp » *${exp}*

❤️ Salud Restante » *${user.health}*
━━━━━━━━━━━━━━━━━━━━━━━
⚠️ Recuerda que la noche siempre está al acecho...
`.trim()

  await conn.sendFile(m.chat, img, 'aventura.jpg', info, fkontak)
}

handler.help = ['aventura', 'adventure']
handler.tags = ['rpg']
handler.command = ['adventure', 'aventura']
handler.group = true
handler.register = true
handler.cooldown = 1500000

export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

function msToTime(duration) {
  let minutes = Math.floor((duration / (1000 * 60)) % 60)
  let seconds = Math.floor((duration / 1000) % 60)
  return `${minutes} m y ${seconds} s`
}
