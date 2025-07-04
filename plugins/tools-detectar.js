import fs from 'fs'
import path from 'path'

var handler = async (m, { conn, usedPrefix, command }) => {
  try {
    await m.react('🕒')
    conn.sendPresenceUpdate('composing', m.chat)

    const pluginsDir = './plugins'
    const files = fs.readdirSync(pluginsDir).filter(file => file.endsWith('.js'))

    let response = `⛓️ Freddy Fazbear Security Protocol v1.3.7 - Escaneo de Integridad iniciado ⛓️\n\n`
    let hasErrors = false

    for (const file of files) {
      try {
        // Intento de carga para detectar errores de sintaxis
        await import(path.resolve(pluginsDir, file))
      } catch (error) {
        hasErrors = true
        const stackLines = error.stack.split('\n')
        const errorLineMatch = stackLines[0].match(/:(\d+):\d+/)
        const errorLine = errorLineMatch ? errorLineMatch[1] : 'Desconocido'

        response += `⚠️ [ALERTA] Falla detectada en módulo:\n` +
          `— Archivo: *${file}*\n` +
          `— Mensaje: ${error.message}\n` +
          `— Línea: ${errorLine}\n\n` +
          `... Reparación recomendada inmediata. --::SEQUENCE_BREAK::--\n\n`
      }
    }

    if (!hasErrors) {
      response += `✅ Sistema FazWatch: No se detectaron errores de sintaxis.\n` +
        `Unidad de observación conectada 🎥\n` +
        `Monitoreo finalizado con éxito.\n\n` +
        `— Sistema respaldado por FNaF LATAM™`
    } else {
      response += `⚠️ Freddy AI Response 🧠: Se encontraron fallos. Revisa los módulos indicados.\n` +
        `... Proceda con precaución.\n\n` +
        `— Sistema respaldado por FNaF LATAM™`
    }

    await conn.reply(m.chat, response.trim(), m)
    await m.react('✅')

  } catch (err) {
    await m.react('✖️')
    await conn.reply(m.chat, `⚠️ Freddy Fazbear Security Protocol: Error crítico detectado.\n` +
      `Detalle: ${err.message}\n` +
      `--::SEQUENCE_BREAK::--\n` +
      `— Sistema respaldado por FNaF LATAM™`, m)
  }
}

handler.command = ['detectarsyntax', 'detectar']
handler.help = ['detectarsyntax']
handler.tags = ['tools']
handler.rowner = true

export default handler
