import util from 'util'
import path from 'path'

let user = a => '@' + a.split('@')[0]

function handler(m, { groupMetadata, command, conn, text, usedPrefix }) {
  if (!text) return conn.reply(m.chat, '🎮 *[FNaF LATAM]*\n\n📌 Ingresá un tema para hacer el Top 10. Ejemplo: *.top animatrónicos más sospechosos*', m)

  let participantes = groupMetadata.participants.map(v => v.id)
  let a = participantes.getRandom()
  let b = participantes.getRandom()
  let c = participantes.getRandom()
  let d = participantes.getRandom()
  let e = participantes.getRandom()
  let f = participantes.getRandom()
  let g = participantes.getRandom()
  let h = participantes.getRandom()
  let i = participantes.getRandom()
  let j = participantes.getRandom()

  let k = Math.floor(Math.random() * 70)
  let emoji = pickRandom(['🦊', '🐻', '🎤', '🔧', '⚙️', '💀', '🔦', '👀', '📸', '📟', '🩸', '📍'])
  let vn = `https://hansxd.nasihosting.com/sound/sound${k}.mp3`

  let resultado = `🎟️ *[TOP 10 – ${text.toUpperCase()}]* 🎟️\n_Animatrónicos en acción..._\n\n${emoji} *1.* ${user(a)}\n${emoji} *2.* ${user(b)}\n${emoji} *3.* ${user(c)}\n${emoji} *4.* ${user(d)}\n${emoji} *5.* ${user(e)}\n${emoji} *6.* ${user(f)}\n${emoji} *7.* ${user(g)}\n${emoji} *8.* ${user(h)}\n${emoji} *9.* ${user(i)}\n${emoji} *10.* ${user(j)}\n\n⚙️ *Sistema FNaF LATAM – Clasificación completa*`

  m.reply(resultado, null, { mentions: [a, b, c, d, e, f, g, h, i, j] })
}

handler.help = ['top *<tema>*']
handler.command = ['top']
handler.tags = ['fun']
handler.group = true
handler.register = true

export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
