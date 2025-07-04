let handler = async (m, { conn, text }) => {
  let id = m.chat
  conn.math = conn.math || {}

  if (id in conn.math) {
    clearTimeout(conn.math[id][3])
    delete conn.math[id]
    return m.reply('⏹️ Se canceló la operación anterior.')
  }

  if (!text) return m.reply(`✏️ Ingresa una ecuación para calcular.\n\nEjemplo: *3 × (2 + π) ÷ 4*`)

  let val = text
    .replace(/[^0-9πpieE()+\-*/×÷.^]/gi, '')
    .replace(/π|pi/gi, 'Math.PI')
    .replace(/e/gi, 'Math.E')
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/\^/g, '**') // potencia
    .replace(/--/g, '+') // doble negativo simplificado

  let format = text
    .replace(/\*/g, '×')
    .replace(/\//g, '÷')
    .replace(/Math\.PI/g, 'π')
    .replace(/Math\.E/g, 'e')

  try {
    const result = (new Function('return ' + val))()
    if (result === undefined || isNaN(result)) throw new Error("Resultado no válido")

    return m.reply(`🧮 *${format}* = _${result}_`)
  } catch (e) {
    return m.reply(`⚠️ Ecuación inválida.\n\nSolo se aceptan:\n- Números\n- Paréntesis ( )\n- Operadores: + - × ÷ * /\n- Constantes: π, e`)
  }
}

handler.help = ['cal <ecuación>']
handler.tags = ['tools']
handler.command = ['cal', 'calc', 'calcular', 'calculadora']
handler.exp = 5
handler.register = true

export default handler
