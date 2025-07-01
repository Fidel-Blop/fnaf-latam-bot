import util from 'util'
import path from 'path'

const handler = async (m, { groupMetadata, command, conn, text, usedPrefix }) => {
  const user = a => '@' + a.split('@')[0]
  if (!text) return conn.reply(m.chat, `🔖 *Debes escribir lo que deseas sortear.*\n\nEjemplo:\n${usedPrefix + command} Pizza con Coca`, m)

  const participantes = groupMetadata.participants.map(v => v.id)
  const ganador = participantes[Math.floor(Math.random() * participantes.length)]
  const sonidoRandom = Math.floor(Math.random() * 70)
  const audioURL = `https://hansxd.nasihosting.com/sound/sound${sonidoRandom}.mp3`

  const mensaje = `🎉 *『 𝗦𝗢𝗥𝗧𝗘𝗢 𝗟𝗔𝗧𝗔𝗠 』* 🎉\n\n🎁 *Premio:* ${text.trim()}\n🧩 *Ganador:* ${user(ganador)}\n\n¡Felicidades, has sido seleccionado al azar! 🎊`

  // Animación de escritura simulada
  let textoAnimado = ''
  let progreso = 0
  for (const letra of mensaje) {
    await new Promise(resolve => setTimeout(resolve, 15))
    textoAnimado += letra
    progreso++
    if (progreso % 10 === 0) conn.sendPresenceUpdate('composing', m.chat)
  }

  await conn.sendMessage(m.chat, {
    text: textoAnimado.trim(),
    mentions: conn.parseMention(textoAnimado)
  }, { quoted: m })

  await conn.sendMessage(m.chat, {
    audio: { url: audioURL },
    mimetype: 'audio/mp4',
    ptt: true
  }, { quoted: m })
}

handler.help = ['sorteo']
handler.tags = ['fun']
handler.command = ['sorteo']
handler.group = true
handler.register = true

export default handler
