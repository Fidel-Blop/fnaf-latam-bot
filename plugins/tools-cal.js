let handler = async (m, { conn, text }) => {
  let id = m.chat
  conn.math = conn.math ? conn.math : {}
  if (id in conn.math) {
    clearTimeout(conn.math[id][3])
    delete conn.math[id]
    m.reply('📎 Reiniciando módulo de cálculo del sistema...')
  }

  let val = text
    .replace(/[^0-9\-\/+*×÷πEe()piPI/]/g, '')
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/π|pi/gi, 'Math.PI')
    .replace(/e/gi, 'Math.E')
    .replace(/\/+/g, '/')
    .replace(/\++/g, '+')
    .replace(/-+/g, '-')

  let format = val
    .replace(/Math\.PI/g, 'π')
    .replace(/Math\.E/g, 'e')
    .replace(/\//g, '÷')
    .replace(/\*/g, '×')

  try {
    let result = (new Function('return ' + val))()
    if (!result) throw result

    m.reply(`🎮 *Cálculo activado desde la oficina de vigilancia...*\n\n🧮 *${format}* = _${result}_\n\n✅ Ecuación resuelta con éxito. ¡Mantente alerta, guardia!`)
  } catch (e) {
    if (e == undefined) {
      return m.reply(`⚠️ *Error de entrada* \n\nIngresa una ecuación válida.\n\n📘 Símbolos permitidos:\n➤ \`+\`, \`-\`, \`×\`, \`÷\`, \`π\`, \`e\`, \`(\`, \`)\``)
    }
    return m.reply(`⛔ *Sistema no pudo procesar tu fórmula*\n\nSolo puedes usar:\n➤ \`0-9\` y los símbolos \`+\`, \`-\`, \`×\`, \`÷\`, \`π\`, \`e\`, \`(\`, \`)\``)
  }
}

handler.help = ['cal *<ecuación>*']
handler.tags = ['tools']
handler.command = ['cal', 'calc', 'calcular', 'calculadora']
handler.exp = 5
handler.register = true

export default handler
