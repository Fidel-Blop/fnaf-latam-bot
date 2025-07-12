let handler  = async (m, { conn }) => {
  conn.reply(m.chat, 
`🧠 *Resultado de tu prueba de IQ* 🧠

${pickRandom(global.iq)}`, m)
}
handler.help = ['iqtest']
handler.tags = ['fun']
handler.command = ['iqtest', 'iq']
handler.group = true
handler.register = true
handler.fail = null

export default handler 

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

global.iq = [
  "🎭 Tu IQ es de: 1 - ¿Eres un animatrónico despistado?",
  "🦴 Tu IQ es de: 14 - Apenas sobrevives a la noche...",
  "👻 Tu IQ es de: 23 - Fantasma de las pruebas pasadas.",
  "🎃 Tu IQ es de: 35 - Algo de astucia entre las sombras.",
  "🕷️ Tu IQ es de: 41 - Casi listo para la próxima ronda.",
  "⚙️ Tu IQ es de: 50 - Media máquina, media humano.",
  "🔦 Tu IQ es de: 67 - Brillando en la oscuridad.",
  "🦾 Tu IQ es de: 72 - Inteligencia mecánica en alza.",
  "🕯️ Tu IQ es de: 86 - Luz tenue en el pasillo oscuro.",
  "🎟️ Tu IQ es de: 99 - Casi un experto Fazbear.",
  "🔮 Tu IQ es de: 150 - Clarividente en las sombras.",
  "🦉 Tu IQ es de: 340 - Sabio como el guardián nocturno.",
  "☠️ Tu IQ es de: 423 - Maestro del misterio.",
  "👁️‍🗨️ Tu IQ es de: 500 - Observador implacable.",
  "🔥 Tu IQ es de: 676 - Incendiando la lógica.",
  "🕸️ Tu IQ es de: 780 - Tejiendo ideas complejas.",
  "🔌 Tu IQ es de: 812 - Conectado a la red Fazbear.",
  "🧟‍♂️ Tu IQ es de: 945 - Casi un animatrónico perfecto.",
  "🕹️ Tu IQ es de: 1000 - Dominando el juego de la mente.",
  "💀 Tu IQ es de: Ilimitado!! - Eres leyenda en la oscuridad.",
  "🎮 Tu IQ es de: 5000 - Gamer supremo de la noche.",
  "🧛‍♂️ Tu IQ es de: 7500 - Inteligencia vampírica.",
  "👹 Tu IQ es de: 10000 - La mente más aterradora de todas.",
]
