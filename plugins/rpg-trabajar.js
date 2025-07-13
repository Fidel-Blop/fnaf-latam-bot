let cooldowns = {}

let handler = async (m, { conn, isPrems }) => {
  let user = global.db.data.users[m.sender]
  let tiempo = 5 * 60 // 5 minutos
  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempo * 1000) {
    const tiempo2 = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempo * 1000 - Date.now()) / 1000))
    conn.reply(m.chat, `${emoji3} ⏳ Debes esperar *${tiempo2}* antes de volver a entrar a la noche oscura con *#w*.`, m)
    return
  }
  let recompensa = Math.floor(Math.random() * 500)
  cooldowns[m.sender] = Date.now()
  await conn.reply(m.chat, `
🕹️ *Noche Laboral en Freddy's*

${pickRandom(trabajo)}  
🔦 Ganaste *${toNum(recompensa)}* ( *${recompensa}* ) ${moneda} 💸  

⚠️ Cuidado, la oscuridad siempre acecha...  
`, m)
  user.coin += recompensa
}

handler.help = ['trabajar']
handler.tags = ['economy']
handler.command = ['w','work','chambear','chamba','trabajar']
handler.group = true;
handler.register = true;

export default handler

function toNum(number) {
  if (number >= 1000 && number < 1000000) {
    return (number / 1000).toFixed(1) + 'k'
  } else if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M'
  } else if (number <= -1000 && number > -1000000) {
    return (number / 1000).toFixed(1) + 'k'
  } else if (number <= -1000000) {
    return (number / 1000000).toFixed(1) + 'M'
  } else {
    return number.toString()
  }
}

function segundosAHMS(segundos) {
  let minutos = Math.floor((segundos % 3600) / 60)
  let segundosRestantes = segundos % 60
  return `${minutos} minutos y ${segundosRestantes} segundos`
}

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

// Thanks to FG98
const trabajo = [
  "Trabajas en la pizzería embrujada y consigues",
  "Eres un guardia nocturno en Freddy's y ganas",
  "Revisas las cámaras y cobras",
  "Limpias los animatrónicos y recibes",
  "Preparas pizzas y obtienes",
  "Gestionas el sistema eléctrico y cobras",
  "Revisas la oficina oscura y ganas",
  "Manejas el sistema de seguridad por una noche y consigues",
  "Controlas las sombras del escenario y recibes",
  "Ayudas con el mantenimiento de Freddy y obtienes",
  "Eres parte del show nocturno y ganas",
  "Cuidas el sistema de alarmas y cobras",
  "Revisas el sótano abandonado y obtienes",
  "Ayudas a reparar las luces parpadeantes y recibes",
  "Supervisas la zona de los animatrónicos y ganas",
  "Eres el técnico de las grabaciones y cobras",
  "Te encargas del sonido ambiente y consigues",
  "Ajustas los sistemas de cámaras y obtienes",
  "Realizas trabajos extra durante la noche y ganas",
  "Te infiltraste en la sala de control y robas",
  "Mantienes las puertas cerradas y recibes",
  "Controlas el sistema de ventilación y ganas",
  "Arreglas las trampas y recibes",
  "Vigila la entrada y ganas",
  "Supervisas la pizzería antes del amanecer y cobras",
  "Eres parte del equipo técnico y recibes",
  "Te encargas de las luces de emergencia y ganas",
  "Revisas los pasillos oscuros y obtienes",
  "Trabajas en el sistema de refrigeración y cobras",
  "Controlas el reloj del espectáculo y ganas",
  "Escaneas las cámaras y evitas que Freddy te sorprenda, ganando",
  "Manipulas los animatrónicos para que no te encuentren y recibes",
  "Resistes la noche en la oficina y cobras",
  "Encuentras una pieza olvidada de Bonnie y obtienes",
  "Reprogramas el sistema de luz para evitar sustos, ganando",
  "Sobrevives al ataque de Chica y recibes",
  "Desactivas la alarma justo a tiempo y ganas",
  "Realizas la ronda en el tercer piso y cobras",
  "Recoges pistas en el pasillo oscuro y obtienes",
  "Revisas el sistema eléctrico para que no falle y ganas",
  "Encuentras baterías para la linterna y recibes",
  "Reprogramas a Foxy para un show exitoso y cobras",
  "Apagas las luces y evitas que los animatrónicos te vean, ganando",
  "Logras calmar a Freddy con música y recibes",
  "Mantienes el sistema de ventilación estable y ganas",
  "Revisas la grabadora para detectar ruidos extraños y cobras",
  "Encuentras un mensaje oculto en la oficina y obtienes",
  "Limpias los circuitos de los animatrónicos y ganas",
  "Encuentras el diario secreto de la pizzería y recibes",
  "Sobrevives a la última hora de la noche y cobras"
]
