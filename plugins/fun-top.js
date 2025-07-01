import util from 'util'
import path from 'path'

const user = a => '@' + a.split('@')[0]

const handler = async (m, { groupMetadata, command, conn, text, usedPrefix }) => {
  if (!text) {
    return conn.reply(m.chat, `📊 *Debes escribir el tema del Top 10.*\n\nEjemplo:\n${usedPrefix + command} jugadores más activos`, m)
  }

  const participantes = groupMetadata.participants.map(v => v.id)
  if (participantes.length < 10) return conn.reply(m.chat, '👥 El grupo no tiene suficientes participantes para hacer un Top 10.', m)

  // Evitamos repeticiones
  const seleccionados = []
  while (seleccionados.length < 10) {
    const elegido = participantes[Math.floor(Math.random() * participantes.length)]
    if (!seleccionados.includes(elegido)) seleccionados.push(elegido)
  }

  const emoji = pickRandom(['🤓','😅','😂','😳','😎','🥵','😱','🤑','🙄','💩','🍑','🤨','🥴','🔥','👇🏻','😔','👀','🌚'])
  const audio = `https://hansxd.nasihosting.com/sound/sound${Math.floor(Math.random() * 70)}.mp3`

  const topText = `✨ *『 TOP 10 ${text.toUpperCase()} 』* ✨\n\n` +
    seleccionados.map((u, i) => `*${i + 1}.* ${user(u)}`).join('\n')

  await conn.sendMessage(m.chat, {
    text: topText,
    mentions: seleccionados
  }, { quoted: m })

  await conn.sendMessage(m.chat, {
    audio: { url: audio },
    mimetype: 'audio/mp4',
    ptt: true
  }, { quoted: m })
}

handler.help = ['top <tema>']
handler.command = ['top']
handler.tags = ['fun']
handler.group = true
handler.register = true

export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
