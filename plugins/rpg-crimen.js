let cooldowns = {}

function segundosAHMS(segundos) {
  let minutos = Math.floor(segundos / 60)
  let segundosRestantes = segundos % 60
  return `${minutos}m ${segundosRestantes}s`
}

let handler = async (m, { conn, participants }) => {
  try {
    let users = global.db.data.users
    let senderId = m.sender
    let senderName = await conn.getName(senderId)
    let cooldownTime = 2 * 60 * 1000 // 2 minutos en ms

    // Verificar cooldown
    if (cooldowns[senderId] && Date.now() - cooldowns[senderId] < cooldownTime) {
      let timeLeft = segundosAHMS(Math.ceil((cooldowns[senderId] + cooldownTime - Date.now()) / 1000))
      return m.reply(`⚠️ Sistema de Seguridad Fazbear™\n\n❗Has sido marcado como sospechoso.\n⏱️ Espera *${timeLeft}* antes de intentar otro movimiento.\n\n— Vigilancia activa en tu canal.\n— Sistema respaldado por FNaF LATAM™`)
    }

    cooldowns[senderId] = Date.now()

    // Verificar participantes válidos
    if (!participants || participants.length === 0) {
      return m.reply("⚠️ No se pudo obtener la lista de participantes del grupo.")
    }

    const moneda = global.moneda || "💰"
    let senderCoin = users[senderId]?.coin || 0

    // Filtrar posibles víctimas con coin definido y distinto al que roba
    const posiblesVictimas = participants
      .filter(p => p.id !== senderId && users[p.id]?.coin !== undefined)
      .map(p => p.id)

    if (posiblesVictimas.length === 0) {
      return m.reply("⚠️ No hay usuarios disponibles en este grupo para realizar un crimen.")
    }

    let randomUserId = posiblesVictimas[Math.floor(Math.random() * posiblesVictimas.length)]
    let randomUserCoin = users[randomUserId]?.coin || 0

    let minAmount = 15
    let maxAmount = 50
    let amountTaken = Math.floor(Math.random() * (maxAmount - minAmount + 1)) + minAmount

    const randomOption = Math.floor(Math.random() * 11) // 0 a 10

    switch (randomOption) {
      case 0: {
        // Verificar que la víctima tenga suficiente coin
        if (randomUserCoin < amountTaken) {
          amountTaken = randomUserCoin
        }
        users[senderId].coin = (users[senderId].coin || 0) + amountTaken
        users[randomUserId].coin = Math.max(0, (users[randomUserId].coin || 0) - amountTaken)
        await conn.sendMessage(m.chat, {
          text: `✅ Monitoreo Fazbear: Infiltración Exitosa 🛰️\n\n🎯 Robaste *${amountTaken} ${moneda}* a @${randomUserId.split('@')[0]} sin ser detectado.\n🗃️ Archivos de vigilancia actualizados.\n\n+${amountTaken} ${moneda} añadidos a tu cuenta.\n\n— Sistema respaldado por FNaf LATAM™`,
          contextInfo: { mentionedJid: [randomUserId] },
        }, { quoted: m })
        break
      }

      case 1: {
        // Penalización: asegurar no quitar más de lo que tiene el ladrón
        let maxPenalizacion = Math.min(senderCoin - minAmount, maxAmount)
        if (maxPenalizacion < minAmount) {
          return m.reply("⚠️ No tienes suficiente saldo para que te penalicen.")
        }
        let amountSubtracted = Math.floor(Math.random() * (maxPenalizacion - minAmount + 1)) + minAmount
        users[senderId].coin = Math.max(0, senderCoin - amountSubtracted)
        await conn.reply(m.chat, `🚨 ALARMA TRIPLICADA — Sector West Hallway\n\n🔴 Fuiste atrapado intentando sabotear la bóveda.\n📉 Penalización: *-${amountSubtracted} ${moneda}*\n📍 Tu movimiento fue rastreado por Chica AI.\n\n— Protocolo FazWatch activado.\n— Sistema respaldado por FNaf LATAM™`, m)
        break
      }

      case 2: {
        let maxRobable = Math.floor(randomUserCoin / 2)
        if (maxRobable < minAmount) {
          return m.reply(`⚠️ La víctima no tiene suficiente dinero para ser robada.`)
        }
        let smallAmountTaken = Math.min(Math.floor(Math.random() * (maxRobable - minAmount + 1)) + minAmount, maxAmount)
        users[senderId].coin = (users[senderId].coin || 0) + smallAmountTaken
        users[randomUserId].coin = Math.max(0, (users[randomUserId].coin || 0) - smallAmountTaken)
        await conn.sendMessage(m.chat, {
          text: `🟡 Intrusión Parcial Detectada\n\n🔧 Accediste a la caja fuerte de @${randomUserId.split('@')[0]}, pero Bonnie AI te escuchó.\n📦 Robaste *${smallAmountTaken} ${moneda}* antes de huir.\n\n— Registro parcial guardado.\n— Sistema respaldado por FNaf LATAM™`,
          contextInfo: { mentionedJid: [randomUserId] },
        }, { quoted: m })
        break
      }

      // Los demás casos igual con validaciones similares si modifican monedas...

      case 3: {
        await conn.reply(m.chat, `🟥 Freddy Fazbear Security Protocol v1.3.7\n\n🛑 Intento de crimen detectado por escáneres térmicos.\n📡 Transferencia bloqueada automáticamente.\n🔒 Tu actividad ha sido marcada para auditoría.\n\n— Registro: ##SEQUENCE_BREAK##\n— Sistema respaldado por FNaf LATAM™`, m)
        break
      }

      // ... Otros casos implementarlos con controles similares ...

      default: {
        await m.reply('⚠️ Opción inválida. Intenta nuevamente.')
      }
    }

    // Confirmar escritura asincrónica (si es async)
    if (typeof global.db.write === 'function') {
      await global.db.write()
    }

  } catch (error) {
    console.error('Error en comando crimen:', error)
    await m.reply('❌ Ocurrió un error al ejecutar el comando crimen. Intentá nuevamente más tarde.', m)
  }
}

handler.tags = ['economy']
handler.help = ['crimen']
handler.command = ['crimen', 'crime']
handler.register = true
handler.group = true

export default handler
