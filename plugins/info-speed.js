import { totalmem, freemem } from 'os'
import speed from 'performance-now'
import { sizeFormatter } from 'human-readable'

const format = sizeFormatter({ 
  std: 'JEDEC', 
  decimalPlaces: 2, 
  keepTrailingZeroes: false, 
  render: (literal, symbol) => `${literal} ${symbol}B` 
})

var handler = async (m, { conn }) => {
  // Tiempo inicial para medir latencia
  let timestamp = speed()
  let latensi = speed() - timestamp

  // Tiempo activo del proceso en milisegundos
  let _muptime = process.uptime() * 1000
  let muptime = clockString(_muptime)

  // Filtrado de chats activos y grupos no restringidos
  let chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
  let groups = Object.entries(conn.chats)
    .filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce)
    .map(v => v[0])

  // Construcción del mensaje con estilo FNaF LATAM™
  let texto = `
🛑 Freddy Fazbear Security Protocol v1.3.7 activado ⛓️
👁️ Sistema de vigilancia activo: monitoreo en curso...

🚀 Latencia detectada: 
→ *${latensi.toFixed(4)} ms*

🕒 Tiempo operativo del sistema:
→ *${muptime}*

💬 Chats bajo observación:
→ *${chats.length}* privados
→ *${groups.length}* grupos seguros

🏆 Recursos en uso del servidor central:
→ RAM utilizada: ${format(totalmem() - freemem())} / ${format(totalmem())}

... ##ERROR## Latencia fuera de parámetros normales --::SEQUENCE_BREAK::--

— Sistema respaldado por FNaF LATAM™
`.trim()

  // Reacción como firma de interacción
  m.react('👁️')

  // Respuesta con mensaje al chat que activó el comando
  await conn.reply(m.chat, texto, m)
}

handler.help = ['speed']
handler.tags = ['info']
handler.command = ['speed']
handler.register = true

export default handler

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}
