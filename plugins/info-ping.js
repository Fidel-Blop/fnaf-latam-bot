import speed from 'performance-now'
import { exec } from 'child_process'

let handler = async (m, { conn }) => {
  const timestamp = speed()
  const sentMsg = await conn.reply(m.chat, '⌛ Calculando velocidad de respuesta...', m)
  const latency = (speed() - timestamp) * 1000 // ms con decimales

  exec('neofetch --stdout', (error, stdout, stderr) => {
    if (error) {
      return conn.reply(m.chat, `⚠️ Ups, algo salió mal al obtener info del sistema:\n${error.message}`, m)
    }
    let sysInfo = stdout.toString('utf-8').replace(/Memory:/g, 'RAM:')

    const result = `⚡ *Ping completo:*\n⏱ Tiempo de respuesta: ${latency.toFixed(2)} ms\n\n💻 *Detalles del sistema:*\n${sysInfo}`

    conn.sendMessage(m.chat, { text: result }, { quoted: m })

    // Opcional: eliminar mensaje previo después de mostrar resultado
    // conn.deleteMessage(m.chat, sentMsg.key).catch(() => {})
  })
}

handler.help = ['ping']
handler.tags = ['info']
handler.command = ['ping', 'p']

export default handler
