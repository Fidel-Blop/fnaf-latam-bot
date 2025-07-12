var handler = async (m, { conn, command, text }) => {

  if (!text) return conn.reply(m.chat, `⚠️ *Atención animatrónica* ⚠️\n\nPor favor, introduce el nombre de una persona para analizar su "personalidad espectral".`, m)

  let personalidad = `🦴 *Perfil del Animatrónico:*\n\n` +
    `👤 *Nombre:* ${text}\n\n` +
    `💚 *Buena Moral:* ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98.3%','99.7%','99.9%','1%','2.9%','0%','0.4%'])}\n` +
    `💀 *Mala Moral:* ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98.3%','99.7%','99.9%','1%','2.9%','0%','0.4%'])}\n` +
    `🧟 *Tipo de Animatrónico:* ${pickRandom(['De buen corazón', 'Arrogante', 'Tacaño', 'Generoso', 'Humilde', 'Tímido', 'Cobarde', 'Entrometido', 'Cristal', 'No binarie XD', 'Pendejo'])}\n` +
    `🎭 *Estado habitual:* ${pickRandom(['Pesado', 'De malas', 'Distraído', 'Molestoso', 'Chismoso', 'Jalándose la cadena', 'De compras', 'Viendo animaciones', 'Soltero en WhatsApp', 'Acostado sin batería', 'Mujeriego de la noche', 'En el celular'])}\n` +
    `🧠 *Inteligencia:* ${pickRandom(['9%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98.3%','99.7%','99.9%','1%','2.9%','0%','0.4%'])}\n` +
    `🤡 *Nivel de Pendejismo:* ${pickRandom(['9%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98.3%','99.7%','99.9%','1%','2.9%','0%','0.4%'])}\n` +
    `🐢 *Morosidad:* ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98.3%','99.7%','99.9%','1%','2.9%','0%','0.4%'])}\n` +
    `🔥 *Coraje:* ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98.3%','99.7%','99.9%','1%','2.9%','0%','0.4%'])}\n` +
    `😱 *Miedo:* ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98.3%','99.7%','99.9%','1%','2.9%','0%','0.4%'])}\n` +
    `🌟 *Fama:* ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98.3%','99.7%','99.9%','1%','2.9%','0%','0.4%'])}\n` +
    `⚧ *Género:* ${pickRandom(['Hombre', 'Mujer', 'Homosexual', 'Bisexual', 'Pansexual', 'Feminista', 'Heterosexual', 'Macho alfa', 'Mujerzona', 'Marimacha', 'Palosexual', 'PlayStationSexual', 'Sr. Manuela', 'Pollosexual'])}`

  conn.reply(m.chat, personalidad, m)

}

handler.help = ['personalidad']
handler.tags = ['fun', 'fnaflatam']
handler.command = ['personalidad']
handler.group = true
handler.register = true

export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
