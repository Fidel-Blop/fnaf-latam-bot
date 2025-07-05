let cooldowns = {}

let handler = async (m, { conn, participants }) => {
  let users = global.db.data.users
  let senderId = m.sender
  let senderName = await conn.getName(senderId)

  let tiempo = 2 * 60 // 2 minutos
  if (cooldowns[senderId] && Date.now() - cooldowns[senderId] < tiempo * 1000) {
    let tiempo2 = segundosAHMS(Math.ceil((cooldowns[senderId] + tiempo * 1000 - Date.now()) / 1000))
    return m.reply(`⚠️ Sistema de Seguridad Fazbear™\n\n❗Has sido marcado como sospechoso.\n⏱️ Espera *${tiempo2}* antes de intentar otro movimiento.\n\n— Vigilancia activa en tu canal.\n— Sistema respaldado por FNaF LATAM™`)
  }

  cooldowns[senderId] = Date.now()

  let senderCoin = users[senderId].coin || 0

  // 🔒 Filtramos solo usuarios que están en el grupo actual y que tengan cuenta registrada
  const posiblesVictimas = participants
    .map(u => u.id)
    .filter(id => id !== senderId && users[id]) // que no sea él mismo y exista en db

  if (posiblesVictimas.length === 0) {
    return m.reply("⚠️ No hay usuarios disponibles en este grupo para realizar un crimen.")
  }

  let randomUserId = posiblesVictimas[Math.floor(Math.random() * posiblesVictimas.length)]
  let randomUserCoin = users[randomUserId].coin || 0

  let minAmount = 15
  let maxAmount = 50
  let amountTaken = Math.floor(Math.random() * (maxAmount - minAmount + 1)) + minAmount
  const moneda = global.moneda || "💰"

  const randomOption = Math.floor(Math.random() * 6)

  switch (randomOption) {
    case 0: {
      users[senderId].coin += amountTaken
      users[randomUserId].coin -= amountTaken
      conn.sendMessage(m.chat, {
        text: `✅ Monitoreo Fazbear: Infiltración Exitosa 🛰️\n\n🎯 Robaste *${amountTaken} ${moneda}* a @${randomUserId.split('@')[0]} sin ser detectado.\n🗃️ Archivos de vigilancia actualizados.\n\n+${amountTaken} ${moneda} añadidos a tu cuenta.\n\n— Sistema respaldado por FNaF LATAM™`,
        contextInfo: { mentionedJid: [randomUserId] },
      }, { quoted: m })
      break
    }

    case 1: {
      let amountSubtracted = Math.min(Math.floor(Math.random() * (senderCoin - minAmount + 1)) + minAmount, maxAmount)
      users[senderId].coin -= amountSubtracted
      conn.reply(m.chat, `🚨 ALARMA TRIPLICADA — Sector West Hallway\n\n🔴 Fuiste atrapado intentando sabotear la bóveda.\n📉 Penalización: *-${amountSubtracted} ${moneda}*\n📍 Tu movimiento fue rastreado por Chica AI.\n\n— Protocolo FazWatch activado.\n— Sistema respaldado por FNaF LATAM™`, m)
      break
    }

    case 2: {
      let smallAmountTaken = Math.min(Math.floor(Math.random() * (randomUserCoin / 2 - minAmount + 1)) + minAmount, maxAmount)
      users[senderId].coin += smallAmountTaken
      users[randomUserId].coin -= smallAmountTaken
      conn.sendMessage(m.chat, {
        text: `🟡 Intrusión Parcial Detectada\n\n🔧 Accediste a la caja fuerte de @${randomUserId.split('@')[0]}, pero Bonnie AI te escuchó.\n📦 Robaste *${smallAmountTaken} ${moneda}* antes de huir.\n\n— Registro parcial guardado.\n— Sistema respaldado por FNaF LATAM™`,
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
        text: `🕷️ Entrada Forzada — Sector Parts & Service\n\n🔧 Tomaste *${take} ${moneda}* de @${randomUserId.split('@')[0]}...\n⚠️ Pero dejaste rastro.\n\n— Datos corruptos sincronizados.\n— Sistema respaldado por FNaF LATAM™`,
        contextInfo: { mentionedJid: [randomUserId] },
      }, { quoted: m })
      break
    }

    case 5: {
      let bonus = 20
      users[senderId].coin += amountTaken + bonus
      users[randomUserId].coin -= amountTaken
      conn.sendMessage(m.chat, {
        text: `🔓 Brecha en Seguridad - Sala de Circuitos\n\n📀 Robo exitoso: *${amountTaken} ${moneda}* de @${randomUserId.split('@')[0]}.\n✨ Encontraste un chip oculto: BONUS +${bonus} ${moneda} añadidos.\n\n🧠 Freddy AI ha registrado tu maniobra.\n— Sistema respaldado por FNaF LATAM™`,
        contextInfo: { mentionedJid: [randomUserId] },
      }, { quoted: m })
      break
    }
  
  case 6: {
      let lost = Math.floor(amountTaken / 1.5)
      users[senderId].coin -= lost
      conn.reply(m.chat, `🔴 ERROR EN EL SISTEMA DE OCULTACIÓN\n\n💣 El gas de ventilación no funcionó a tiempo.\n📉 Perdiste *-${lost} ${moneda}* al ser expulsado del área.\n\n— Registro bloqueado por Foxy AI.`, m)
      break
    }

    case 7: {
      let gain = amountTaken + 10
      users[senderId].coin += gain
      users[randomUserId].coin -= amountTaken
      conn.sendMessage(m.chat, {
        text: `🧩 Hackeo exitoso: Cámara 3A\n\n📶 Desactivaste el sistema durante 17 segundos.\n💰 Robaste *${amountTaken} ${moneda}* y obtuviste *+10 ${moneda} extra* del backup automático.\n\n— FazCloud comprometido.\n— Sistema respaldado por FNaF LATAM™`,
        contextInfo: { mentionedJid: [randomUserId] },
      }, { quoted: m })
      break
    }

    case 8: {
      conn.reply(m.chat, `📛 Estás bajo monitoreo permanente\n\n👁️‍🗨️ Freddy AI detectó actividad sospechosa incluso antes de que actuaras.\n🚫 Tu intento de crimen fue abortado.\n\n— Registro automático activado.`, m)
      break
    }

    case 9: {
      let loss = 30
      users[senderId].coin -= loss
      conn.reply(m.chat, `⚠️ Fallo en la desconexión de red\n\n🪫 Quedaste atrapado entre dos cámaras activas.\n🧾 Penalización: *-${loss} ${moneda}* por intento fallido.\n\n— Sistema respaldado por FNaF LATAM™`, m)
      break
    }

    case 10: {
      let gain = amountTaken
      users[senderId].coin += gain
      users[randomUserId].coin -= gain
      conn.sendMessage(m.chat, {
        text: `🎭 Maniobra Sigilosa — Teatro Abandonado\n\n🎩 Robaste *${gain} ${moneda}* usando una máscara de Freddy falsa.\n😶‍🌫️ Nadie notó tu presencia.\n\n— Entrada archivada bajo protocolo silencioso.`,
        contextInfo: { mentionedJid: [randomUserId] },
      }, { quoted: m })
      break
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
