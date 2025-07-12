import util from 'util'
import path from 'path'

async function handler(m, { groupMetadata, command, conn, text, usedPrefix }) {

  let user = a => '@' + a.split('@')[0]
  if (!text) return conn.reply(m.chat, '🔧 *[FNaF LATAM]*\n\n📌 Ingresá el nombre del objeto, premio o motivo del sorteo.', m)

  let participantes = groupMetadata.participants.map(v => v.id)
  let ganador = participantes.getRandom()
  let sonido = Math.floor(Math.random() * 70)
  let vn = `https://hansxd.nasihosting.com/sound/sound${sonido}.mp3`

  let mensajeFinal = `🕹️ *[FNaF LATAM – Sorteo Aleatorio]* 🕹️\n\n🎯 *Premio:* ${text}\n🎉 *Ganador/a:* ${user(ganador)}\n\n⚙️ El sistema animatrónico ha tomado su decisión...\n¡Felicitaciones! 🎊`

  let txt = ''
  let count = 0
  for (const c of mensajeFinal) {
    await new Promise(resolve => setTimeout(resolve, 15))
    txt += c
    count++

    if (count % 10 === 0) {
      conn.sendPresenceUpdate('composing', m.chat)
    }
  }

  await conn.sendMessage(
    m.chat,
    {
      text: txt.trim(),
      mentions: conn.parseMention(txt)
    },
    {
      quoted: m,
      ephemeralExpiration: 24 * 60 * 100,
      disappearingMessagesInChat: 24 * 60 * 100
    }
  )
}

handler.help = ['sorteo']
handler.command = ['sorteo']
handler.tags = ['fun']
handler.group = true
handler.register = true

export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
