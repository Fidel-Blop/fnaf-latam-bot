import db from '../lib/database.js'

let handler = async (m, { conn, usedPrefix }) => {
    let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender
    if (who == conn.user.jid) return m.react('✖️')
    if (!(who in global.db.data.users)) return m.reply(`${emoji} ⚠️ El animatrónico no está registrado en la base de datos.`)
  
    let user = global.db.data.users[who]
    let total = (user.coin || 0) + (user.bank || 0)

    const texto = `
╭───〔🎭  ECONOMÍA - FNaF LATAM 〕───⬣
│
│ 🎮 Usuario » *${conn.getName(who)}*
│ ⛁ Cartera » ¥*${user.coin.toLocaleString()}* ${moneda}
│ 🏦 Banco » ¥*${user.bank.toLocaleString()}* ${moneda}
│ 📊 Total » ¥*${total.toLocaleString()}* ${moneda}
│
╰─🔒 Consejo: Usa *#deposit* para proteger tus ¥Monedas en el banco.
`.trim()

    await conn.reply(m.chat, texto, m)
}

handler.help = ['bal']
handler.tags = ['rpg']
handler.command = ['bal', 'balance', 'bank'] 
handler.register = true 
handler.group = true 

export default handler
