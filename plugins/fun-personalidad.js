let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, '🔎 Por favor, ingrese el nombre de alguien para analizar.', m)

  let personalidad = `🎭 *Análisis de Personalidad Freddy Fazbear AI Scanner™*

🔠 Nombre: ${text}
🔹 Buena Moral: ${pickRandom(porcentajes)}
🔸 Mala Moral: ${pickRandom(porcentajes)}
📦 Tipo de persona: ${pickRandom(tipos)}
🌀 Siempre está: ${pickRandom(siempre)}
🧠 Inteligencia: ${pickRandom(porcentajes)}
😵 Nivel de Pendejismo: ${pickRandom(porcentajes)}
⌛ Morosidad: ${pickRandom(porcentajes)}
🔥 Coraje: ${pickRandom(porcentajes)}
😱 Miedo: ${pickRandom(porcentajes)}
⭐ Fama: ${pickRandom(porcentajes)}
🧬 Género: ${pickRandom(generos)}

📡 *Base de datos escaneada.* Resultado no verificable.`

  conn.reply(m.chat, personalidad, m)
}

handler.help = ['personalidad <nombre>']
handler.tags = ['fun']
handler.command = ['personalidad']
handler.group = true
handler.register = true

export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

const porcentajes = ['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98.3%','99.7%','99.9%','1%','2.9%','0%','0.4%']

const tipos = [
  'De buen corazón','Arrogante','Tacaño','Generoso','Humilde','Tímido','Cobarde',
  'Entrometido','Curioso sin límites','Paciente como una tortuga','Explosivo','Digno de terapia'
]

const siempre = [
  'Pesado','De malas','Molestando a todos','Desconectado de la realidad',
  'Viendo anime','Scroll infinito en TikTok','Soltero y chateando',
  'Acostado sin ganas','Mujeriego serial','Con el celular pegado al rostro'
]

const generos = [
  'Hombre','Mujer','Bisexual','Pansexual','Heterosexual',
  'Macho alfa','Feminista','Gamersexual','Indefinido','Fan de Freddy'
]
