import ws from 'ws'

let handler = async (m, { conn, usedPrefix, isRowner }) => {
  let _uptime = process.uptime() * 1000
  let totalreg = Object.keys(global.db.data.users).length
  let totalchats = Object.keys(global.db.data.chats).length

  let uptime = clockString(_uptime)
  let users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])]
  const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
  const groupsIn = chats.filter(([id]) => id.endsWith('@g.us'))
  const totalUsers = users.length
  let old = performance.now()
  let neww = performance.now()
  let speed = neww - old
  const used = process.memoryUsage()

  let info = `╔═════════════════════════════╗\n`
  info += `║      🎭  ESTADO FNaF LATAM Bot 🎭      ║\n`
  info += `╚═════════════════════════════╝\n\n`

  info += `🕹 *Creador:* ${etiqueta}\n`
  info += `🔰 *Prefijo actual:* ${usedPrefix}\n`
  info += `📀 *Versión:* ${vs}\n\n`

  info += `📩 *Chats privados:* ${chats.length - groupsIn.length}\n`
  info += `🗂 *Total chats:* ${chats.length}\n`
  info += `👥 *Usuarios registrados:* ${totalreg}\n`
  info += `👾 *Grupos activos:* ${groupsIn.length}\n\n`

  info += `⏳ *Tiempo activo:* ${uptime}\n`
  info += `⚡ *Velocidad:* ${(speed * 1000).toFixed(0) / 1000} ms\n`
  info += `🤖 *Sub-bots activos:* ${totalUsers || '0'}\n\n`

  info += `「 𝗙𝗡𝗮𝗙 𝗟𝗔𝗧𝗔𝗠 」`

  await conn.sendFile(m.chat, banner, 'estado.jpg', info, m)
}

handler.help = ['estado']
handler.tags = ['info']
handler.command = ['estado', 'status', 'estate', 'state', 'stado', 'stats']
handler.register = true

export default handler

function clockString(ms) {
  let seconds = Math.floor((ms / 1000) % 60)
  let minutes = Math.floor((ms / (1000 * 60)) % 60)
  let hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
  return `${hours}h ${minutes}m ${seconds}s`
}
