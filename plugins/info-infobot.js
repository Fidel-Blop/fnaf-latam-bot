import db from '../lib/database.js'
import { platform, hostname, totalmem, freemem } from 'os'
import { sizeFormatter } from 'human-readable'

const format = sizeFormatter({
  std: 'JEDEC',
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
})

let handler = async (m, { conn, usedPrefix }) => {
  const bot = global.db.data.settings[conn.user.jid]
  const totalStats = Object.values(global.db.data.stats).reduce((total, stat) => total + stat.total, 0)
  const totalPlugins = Object.values(global.plugins).filter(v => v.help && v.tags).length
  const ownerJid = global.owner[0][0] + '@s.whatsapp.net'

  const info = 
    `🎮 *Información del Bot - ${global.botname}*\n\n` +
    `⚙️ *Prefijo:* ${usedPrefix}\n` +
    `🔌 *Plugins cargados:* ${totalPlugins}\n` +
    `📊 *Comandos ejecutados:* ${formatNumber(totalStats)} (Total: ${totalStats})\n\n` +
    `💻 *Sistema operativo:* ${platform()}\n` +
    `🖥️ *Servidor:* ${hostname()}\n` +
    `🧠 *RAM usada:* ${format(totalmem() - freemem())} / ${format(totalmem())}\n` +
    `📉 *RAM libre:* ${format(freemem())}\n\n` +
    `📌 *Uso memoria NodeJS:*\n` +
    '```' +
    Object.entries(process.memoryUsage())
      .map(([key, val]) => `${key}: ${format(val)}`)
      .join('\n') +
    '```'

  await conn.reply(m.chat, info, null, { contextInfo: { mentionedJid: [ownerJid] } })
}

handler.help = ['botinfo']
handler.tags = ['info']
handler.command = ['info', 'botinfo', 'infobot']

export default handler

function formatNumber(number) {
  if (number >= 1_000_000) return (number / 1_000_000).toFixed(1) + 'M'
  if (number >= 1_000) return (number / 1_000).toFixed(1) + 'k'
  if (number <= -1_000_000) return (number / 1_000_000).toFixed(1) + 'M'
  if (number <= -1_000) return (number / 1_000).toFixed(1) + 'k'
  return number.toString()
}
