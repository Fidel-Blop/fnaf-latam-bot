let cooldowns = {}

let handler = async (m, { conn, usedPrefix, command }) => {
  let users = global.db.data.users
  let senderId = m.sender

  const tiempoEspera = 8 * 60 * 1000 // 8 minutos en milisegundos
  const now = Date.now()

  if (cooldowns[senderId] && now - cooldowns[senderId] < tiempoEspera) {
    let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[senderId] + tiempoEspera - now) / 1000))
    return conn.reply(m.chat, `🔒 ACCESO TEMPORAL BLOQUEADO

⏱️ Espera *${tiempoRestante}* antes de volver a ingresar al subsuelo.

📡 Protocolo de enfriamiento: activo
— Sistema respaldado por FNaF LATAM™`, m)
  }

  cooldowns[senderId] = now

  if (!users[senderId]) {
    users[senderId] = { health: 100, coin: 0, exp: 0 }
  }

  const eventos = [
    {
      nombre: 'Cámara de Circuitos Muertos',
      tipo: 'victoria',
      coin: randomNumber(150, 300),
      exp: randomNumber(50, 100),
      health: 0,
      mensaje: `⚡ Restos de animatrónicos inutilizados... Dentro, hallaste componentes valiosos.`
    },
    {
      nombre: 'Conducto Obstruido',
      tipo: 'derrota',
      coin: randomNumber(-70, -40),
      exp: randomNumber(10, 20),
      health: randomNumber(-15, -5),
      mensaje: `🧱 Quedaste atrapado entre engranajes oxidados. Lograste salir, pero no sin daño.`
    },
    {
      nombre: 'Archivo Censurado',
      tipo: 'victoria',
      coin: randomNumber(250, 400),
      exp: randomNumber(100, 150),
      health: 0,
      mensaje: `🗃️ Un archivo de seguridad oculto te premia con secretos... y recompensas.`
    },
    {
      nombre: 'Zona de Carga Inestable',
      tipo: 'trampa',
      coin: 0,
      exp: randomNumber(5, 10),
      health: 0,
      mensaje: `💥 Interferencia electromagnética detectada. Sin daño... pero tampoco ganancia.`
    },
    {
      nombre: 'Depósito Abandonado',
      tipo: 'derrota',
      coin: randomNumber(-150, -80),
      exp: randomNumber(20, 40),
      health: randomNumber(-30, -20),
      mensaje: `👁️ Una figura se movió en la oscuridad. Lo que sea... no quería compañía.`
    },
    {
      nombre: 'Sala de Mantenimiento',
      tipo: 'victoria',
      coin: randomNumber(100, 200),
      exp: randomNumber(30, 60),
      health: 0,
      mensaje: `🛠️ Encuentras repuestos sellados. Todo parece... demasiado nuevo.`
    },
    {
      nombre: 'Zona sin Señal',
      tipo: 'trampa',
      coin: 0,
      exp: randomNumber(5, 15),
      health: 0,
      mensaje: `📡 Las cámaras se apagan un instante. Nadie sabe lo que pasó ahí abajo.`
    },
    {
      nombre: 'Archivo de Seguridad 1987',
      tipo: 'victoria',
      coin: randomNumber(150, 300),
      exp: randomNumber(70, 120),
      health: 0,
      mensaje: `🗂️ Registros antiguos, marcados como *CLASSIFIED*, emergen junto a una suma de ${global.moneda}.`
    },
    {
      nombre: 'Subnivel C – Bloqueado',
      tipo: 'derrota',
      coin: randomNumber(-200, -100),
      exp: randomNumber(20, 40),
      health: randomNumber(-30, -20),
      mensaje: `🔐 Te atreviste a ingresar. Algo te expulsó. Lo que viste... no lo contarás.`
    },
    {
      nombre: 'Unidad de Reparación',
      tipo: 'victoria',
      coin: randomNumber(50, 100),
      exp: randomNumber(30, 50),
      health: 0,
      mensaje: `👤 Un técnico dejó una terminal encendida. Te llevaste algo más que experiencia.`
    }
  ]

  let evento = eventos[Math.floor(Math.random() * eventos.length)]

  // Aplicar efectos
  if (evento.tipo === 'victoria' || evento.tipo === 'derrota') {
    users[senderId].coin += evento.coin
    users[senderId].exp += evento.exp
    users[senderId].health += evento.health
  } else if (evento.tipo === 'trampa') {
    users[senderId].exp += evento.exp
  }

  if (users[senderId].health > 100) users[senderId].health = 100
  if (users[senderId].health < 0) users[senderId].health = 0

  let img = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745558209798.jpeg'
  let info = `
🕳️ *EXPLORACIÓN SUBTERRÁNEA ACTIVADA*

📍 Ubicación: *${evento.nombre}*
📡 Estado: ${evento.mensaje}
📥 Ganancia:
— ${evento.coin >= 0 ? '+' : '-'}${Math.abs(evento.coin)} ${global.moneda || 'monedas'}
— +${evento.exp} XP
❤️ Salud: ${evento.health < 0 ? '−' + Math.abs(evento.health) : 'Sin daño'}

🧠 Análisis completo.
⛓️ Seguridad Fazbear en curso...

— Sistema respaldado por FNaF LATAM™`.trim()

  await conn.sendFile(m.chat, img, 'mazmorra.jpg', info, fkontak)
  global.db.write()
}

handler.tags = ['rpg']
handler.help = ['mazmorra', 'dungeon', 'cueva']
handler.command = ['mazmorra', 'dungeon', 'cueva']
handler.register = true
handler.group = true

export default handler

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function segundosAHMS(segundos) {
  let minutos = Math.floor(segundos / 60)
  let segundosRestantes = segundos % 60
  return `${minutos}m ${segundosRestantes}s`
}
