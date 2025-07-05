let cooldowns = {}

let handler = async (m, { conn, text, command, usedPrefix }) => {
  let users = global.db.data.users
  let senderId = m.sender
  let senderName = conn.getName(senderId)

  let tiempo = 2 * 60 // 2 minutos
  if (cooldowns[senderId] && Date.now() - cooldowns[senderId] < tiempo * 1000) {
    let tiempo2 = segundosAHMS(Math.ceil((cooldowns[senderId] + tiempo * 1000 - Date.now()) / 1000))
    return m.reply(`⚠️ Sistema de Seguridad Fazbear™\n\n❗Has sido marcado como sospechoso.\n⏱️ Espera *${tiempo2}* antes de intentar otro movimiento.\n\n— Vigilancia activa en tu canal.\n— Sistema respaldado por FNaF LATAM™`)
  }

  cooldowns[senderId] = Date.now()
  let senderCoin = users[senderId].coin || 0
  let randomUserId = Object.keys(users)[Math.floor(Math.random() * Object.keys(users).length)]

  while (randomUserId === senderId) {
    randomUserId = Object.keys(users)[Math.floor(Math.random() * Object.keys(users).length)]
  }

  let randomUserCoin = users[randomUserId].coin || 0
  let minAmount = 15
  let maxAmount = 50
  let amountTaken = Math.floor(Math.random() * (maxAmount - minAmount + 1)) + minAmount

  const randomOption = Math.floor(Math.random() * 6) // Ahora 6 opciones posibles

  switch (randomOption) {
    case 0: {
      users[senderId].coin += amountTaken
      users[randomUserId].coin -= amountTaken
      conn.sendMessage(m.chat, {
        text: `✅ Monitoreo Fazbear: Infiltración Exitosa 🛰️\n\n🎯 Lograste robar *${amountTaken} ${moneda} 💸* a @${randomUserId.split('@')[0]} sin ser detectado.\n🗃️ Archivos de vigilancia actualizados.\n\n+${amountTaken} ${moneda} añadidos a tu cuenta.\n\n— Sistema respaldado por FNaF LATAM™`,
        contextInfo: { mentionedJid: [randomUserId] },
      }, { quoted: m })
      break
    }

    case 1: {
      let amountSubtracted = Math.min(Math.floor(Math.random() * (senderCoin - minAmount + 1)) + minAmount, maxAmount)
      users[senderId].coin -= amountSubtracted
      conn.reply(m.chat, `🚨 ALARMA TRIPLICADA — Sector West Hallway\n\n🔴 Fuiste atrapado intentando sabotear la bóveda.\n📉 Penalización: *-${amountSubtracted} ${moneda} 💸*\n📍 Tu movimiento fue rastreado por Chica AI.\n\n— Protocolo FazWatch activado.\n— Sistema respaldado por FNaF LATAM™`, m)
      break
    }

    case 2: {
      let smallAmountTaken = Math.min(Math.floor(Math.random() * (randomUserCoin / 2 - minAmount + 1)) + minAmount, maxAmount)
      users[senderId].coin += smallAmountTaken
      users[randomUserId].coin -= smallAmountTaken
      conn.sendMessage(m.chat, {
        text: `🟡 Intrusión Parcial Detectada\n\n🔧 Lograste acceder a la caja fuerte de @${randomUserId.split('@')[0]}, pero el ruido alertó a Bonnie AI.\n\n📦 Solo pudiste robar *${smallAmountTaken} ${moneda} 💸* antes de escapar.\n\n— Registro parcial guardado.\n— Sistema respaldado por FNaF LATAM™`,
        contextInfo: { mentionedJid: [randomUserId] },
      }, { quoted: m })
      break
    }

    case 3: {
      conn.reply(m.chat, `🟥 Freddy Fazbear Security Protocol v1.3.7\n\n🛑 Intento de crimen detectado por escáneres térmicos.\n📡 Transferencia bloqueada automáticamente.\n🔒 Tu actividad ha sido marcada para auditoría.\n\n— Registro: ##SEQUENCE_BREAK##\n— Sistema respaldado por FNaF LATAM™`, m)
      break
    }

    case 4: {
      let take = Math.floor(amountTaken / 2)
      users[senderId].coin += take
      users[randomUserId].coin -= take
      conn.sendMessage(m.chat, {
        text: `🕷️ Entrada Forzada — Sector Parts & Service\n\n🔧 Has tomado *${take} ${moneda} 💸* de @${randomUserId.split('@')[0]}...\n⚠️ Pero dejaste rastro y perdiste parte del botín al escapar.\n\n— Datos corruptos sincronizados.\n— Sistema respaldado por FNaF LATAM™`,
        contextInfo: { mentionedJid: [randomUserId] },
      }, { quoted: m })
      break
    }

    case 5: {
      let bonus = 20
      users[senderId].coin += amountTaken + bonus
      users[randomUserId].coin -= amountTaken
      conn.sendMessage(m.chat, {
        text: `🔓 Brecha en Seguridad - Sala de Circuitos\n\n📀 Robo exitoso: *${amountTaken} ${moneda} 💸* obtenidos de @${randomUserId.split('@')[0]}.\n✨ Encontraste un chip antiguo oculto: BONUS +${bonus} ${moneda} añadidos.\n\n🧠 Freddy AI ha registrado tu maniobra.\n— Sistema respaldado por FNaF LATAM™`,
        contextInfo: { mentionedJid: [randomUserId] },
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



function segundosAHMS(segundos) {
  let minutos = Math.floor(segundos / 60)
  let segundosRestantes = segundos % 60
  return `${minutos}m ${segundosRestantes}s`
}

export default handler
