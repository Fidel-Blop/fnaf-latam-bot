let handler = async (m, { usedPrefix, command, text, conn }) => {
  const emoji = '👁️'

  if (!text) {
    return conn.reply(m.chat, 
`${emoji} *Error de entrada detectado.*

🎥 _Sistema de Registro Biográfico FNaF LATAM™_  
Por favor ingresa tu fecha de nacimiento con el siguiente formato:

🧩 *Ejemplo:* ${usedPrefix + command} 2007 06 01

🔧 _Formato requerido: Año Mes Día (AAAA MM DD)_`, m)
  }

  const date = new Date(text)
  if (isNaN(date)) {
    return conn.reply(m.chat, `⚠️ *Fecha no válida.*\n\n🧠 Asegúrate de usar el formato correcto: *AAAA MM DD*\nEjemplo: ${usedPrefix + command} 2003 02 07`, m)
  }

  const now = new Date()
  const [currentYear, currentMonth, currentDay] = [now.getFullYear(), now.getMonth() + 1, now.getDate()]
  const [birthYear, birthMonth, birthDay] = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
  const zodiac = getZodiac(birthMonth, birthDay)

  const ageInMilliseconds = now - date
  const ageDate = new Date(ageInMilliseconds)
  const age = ageDate.getUTCFullYear() - 1970

  const nextBirthday = [currentYear + (birthMonth < currentMonth || (birthMonth === currentMonth && birthDay < currentDay)), birthMonth, birthDay]
  const isBirthday = (currentMonth === birthMonth && currentDay === birthDay)
  const ageInfo = isBirthday ? `🎂 ${age} años — *¡Feliz cumpleaños, sujeto!* 🎉` : `${age} años`

  const result = `
🎥 *MÓDULO DE IDENTIFICACIÓN PERSONAL — ACTIVO*
⛓️ Registro completo bajo protocolo 1987-B

📅 *Fecha de nacimiento:* ${birthYear}-${birthMonth}-${birthDay}
🎯 *Edad actual:* ${ageInfo}
📅 *Próximo cumpleaños:* ${nextBirthday.join('-')}
🧠 *Clasificación Zodiacal:* ${zodiac}

📡 *Archivo sincronizado con base de datos FNaF LATAM™*
— Sistema de Monitoreo Freddy Fazbear Entertainment™
`.trim()

  conn.reply(m.chat, result, m)
}

handler.help = ['zodiac *2002 02 25*']
handler.tags = ['fun']
handler.group = true
handler.register = true
handler.command = ['zodiac', 'zodia']

export default handler

// Zodiaco configurado en orden invertido
const zodiak = [
  ['Capricornio', new Date(1970, 11, 22)],
  ['Sagitario', new Date(1970, 10, 22)],
  ['Escorpio', new Date(1970, 9, 23)],
  ['Libra', new Date(1970, 8, 23)],
  ['Virgo', new Date(1970, 7, 23)],
  ['Leo', new Date(1970, 6, 23)],
  ['Cáncer', new Date(1970, 5, 22)],
  ['Géminis', new Date(1970, 4, 21)],
  ['Tauro', new Date(1970, 3, 21)],
  ['Aries', new Date(1970, 2, 21)],
  ['Piscis', new Date(1970, 1, 19)],
  ['Acuario', new Date(1970, 0, 20)],
  ['Capricornio', new Date(1970, 0, 1)]
].reverse()

function getZodiac(month, day) {
  const d = new Date(1970, month - 1, day)
  return zodiak.find(([_, start]) => d >= start)[0]
}
