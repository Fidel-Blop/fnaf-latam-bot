let cooldowns = {}

let handler = async (m, { conn, text, command, usedPrefix }) => {
  let users = global.db.data.users
  let senderId = m.sender
  let senderName = conn.getName(senderId)

  let tiempo = 5 * 60
  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempo * 1000) {
    let tiempo2 = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempo * 1000 - Date.now()) / 1000))
    m.reply(`${emoji3} ⚠️ Ya ejecutaste un crimen en esta zona. Las cámaras aún están revisando la grabación...\n\n⏱️ Esperá *${tiempo2}* antes de intentar otro movimiento.`);
    return
  }
  cooldowns[m.sender] = Date.now()

  let senderCoin = users[senderId].coin || 0
  let randomUserId = Object.keys(users)[Math.floor(Math.random() * Object.keys(users).length)]
  while (randomUserId === senderId) {
    randomUserId = Object.keys(users)[Math.floor(Math.random() * Object.keys(users).length)]
  }

  let randomUserCoin = users[randomUserId].coin || 0
  let minAmount = 15
  let maxAmount = 50
  let amountTaken = Math.floor(Math.random() * (maxAmount - minAmount + 1)) + minAmount
  let randomOption = Math.floor(Math.random() * 3)

  switch (randomOption) {
    case 0: {
      users[senderId].coin += amountTaken
      users[randomUserId].coin -= amountTaken

      let escenariosExito = [
        `🔪 *Entraste al despacho de seguridad mientras todos dormían.* Robaste *${amountTaken} ${moneda}* sin dejar rastro.`,
        `🛠️ *Hackeaste el sistema desde el cuarto de mantenimiento.* Botín conseguido: *${amountTaken} ${moneda}*.`,
        `🎭 *Usaste un disfraz de guardia y robaste del mostrador.* Ganás *${amountTaken} ${moneda}*.`,
        `🚪 *Entraste por la puerta trasera justo antes del cierre.* Te llevás *${amountTaken} ${moneda}*.`,
        `🦊 *Foxy te ayudó desde las sombras...* Te escapaste con *${amountTaken} ${moneda}* en las manos.`
      ]

      conn.sendMessage(m.chat, {
        text: `🔪 ${emoji} *Crimen exitoso en Freddy Fazbear’s*\n\n${pickRandom(escenariosExito)}\n\n📦 El crimen fue perfecto.`,
        contextInfo: {
          mentionedJid: [randomUserId],
        },
      }, { quoted: m })
      break
    }

    case 1: {
      let amountSubtracted = Math.min(Math.floor(Math.random() * (senderCoin - minAmount + 1)) + minAmount, maxAmount)

      users[senderId].coin -= amountSubtracted

      let escenariosFracaso = [
        `🚨 *Una cámara rota aún funcionaba... te grabó en alta definición.* Te quitaron *${amountSubtracted} ${moneda}*.`,
        `🔒 *El animatrónico Golden Freddy te interceptó.* Perdiste *${amountSubtracted} ${moneda}*.`,
        `📡 *Una alarma se activó al abrir la caja fuerte falsa.* Te confiscaron *${amountSubtracted} ${moneda}*.`,
        `🧩 *Pisaste una baldosa trampa en la sala de juegos.* Te detuvieron y perdiste *${amountSubtracted} ${moneda}*.`,
        `🕵️ *Un guardia disfrazado te atrapó in fraganti.* Multa: *${amountSubtracted} ${moneda}*.`
      ]

      conn.reply(m.chat, `🚨 ${emoji2} *Has sido capturado...*\n\n${pickRandom(escenariosFracaso)}`, m)
      break
    }

    case 2: {
      let smallAmountTaken = Math.min(Math.floor(Math.random() * (randomUserCoin / 2 - minAmount + 1)) + minAmount, maxAmount)

      users[senderId].coin += smallAmountTaken
      users[randomUserId].coin -= smallAmountTaken

      let escenariosParcial = [
        `👤 *Robaste del vestuario de los técnicos, pero alguien te vio correr.* Lograste *${smallAmountTaken} ${moneda}*.`,
        `🔎 *Bonnie casi te alcanza, pero lograste huir con parte del botín.* Te llevaste *${smallAmountTaken} ${moneda}*.`,
        `🧤 *Te ocultaste en un traje viejo y escapaste con *${smallAmountTaken} ${moneda}*, aunque dejaste huellas.`,
        `💼 *Hallaste una bolsa con *${smallAmountTaken} ${moneda}* en la sala de empleados, pero tu escape fue ruidoso.`,
        `🧸 *Toy Chica te ayudó por accidente... sacaste *${smallAmountTaken} ${moneda}*, pero el sistema te detectó.`
      ]

      conn.sendMessage(m.chat, {
        text: `👤 ${emoji} *Crimen parcialmente exitoso*\n\n${pickRandom(escenariosParcial)}`,
        contextInfo: {
          mentionedJid: [randomUserId],
        },
      }, { quoted: m })
      break
    }
  }

  global.db.write()
}

handler.tags = ['economy']
handler.help = ['crimen']
handler.command = ['crimen', 'crime']
handler.register = true
handler.group = true

export default handler

function segundosAHMS(segundos) {
  let horas = Math.floor(segundos / 3600)
  let minutos = Math.floor((segundos % 3600) / 60)
  let segundosRestantes = segundos % 60
  return `${minutos} minutos y ${segundosRestantes} segundos`
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
