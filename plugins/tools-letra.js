let handler = async (m, { conn, text }) => {
  const sistema = "Freddy AI Response 🧠\nMonitoreo FNaF LATAM: ejecución autorizada 📡"
  if (!text && !(m.quoted && m.quoted.text)) {
    return conn.reply(m.chat, `${emoji} --::SEQUENCE_BREAK::--\n⚠️ Ingrese el texto para transformar, operador.\n— Sistema respaldado por FNaF LATAM™`, m)
  }

  let input = text || (m.quoted && m.quoted.text) || ''
  let transformado = input.replace(/[a-z]/gi, letra => {
    return {
      'a': 'ᥲ',
      'b': 'ᑲ',
      'c': 'ᥴ',
      'd': 'ძ',
      'e': 'ᥱ',
      'f': '𝖿',
      'g': 'g',
      'h': 'һ',
      'i': 'і',
      'j': 'ȷ',
      'k': 'k',
      'l': 'ᥣ',
      'm': 'm',
      'n': 'ᥒ',
      'o': '᥆',
      'p': '⍴',
      'q': '𝗊',
      'r': 'r',
      's': 's',
      't': '𝗍',
      'u': 'ᥙ',
      'v': '᥎',
      'w': 'ᥕ',
      'x': '᥊',
      'y': 'ᥡ',
      'z': 'z'
    }[letra.toLowerCase()] || letra
  })

  // Simulando escritura en sistema antiguo...
  let salida = ''
  for (let i = 0; i < transformado.length; i++) {
    salida += transformado[i]
    if (i % 8 === 0) await new Promise(r => setTimeout(r, 15))
  }

  await conn.sendMessage(m.chat, { text: `${sistema}\n\n${salida}\n\n— Sistema respaldado por FNaF LATAM™` }, { quoted: m })
}

handler.help = ['letra *<texto>*']
handler.tags = ['fun']
handler.command = ['letra']
handler.register = true

export default handler
