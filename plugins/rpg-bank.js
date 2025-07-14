import db from '../lib/database.js'

let handler = async (m, { conn, usedPrefix }) => {
    const who = m.mentionedJid?.[0] || m.quoted?.sender || m.sender

    if (who === conn.user.jid) {
        await m.react('✖️')
        return
    }

    if (!(who in global.db.data.users)) {
        return m.reply(`⚠️ El animatrónico no está registrado en la base de datos.`)
    }

    const user = global.db.data.users[who]
    const name = await conn.getName(who)

    // Asegurar que las propiedades estén definidas
    user.coin = user.coin || 0
    user.bank = user.bank || 0

    const total = user.coin + user.bank
    const moneda = 'FazCoins' // Asegúrate de definir esto si lo tenés como variable global

    const texto = `
╭───〔🎭  ECONOMÍA - FNaF LATAM 〕───⬣
│
│ 🎮 Usuario » *${name}*
│ ⛁ Cartera » ¥*${user.coin.toLocaleString()}* ${moneda}
│ 🏦 Banco » ¥*${user.bank.toLocaleString()}* ${moneda}
│ 📊 Total » ¥*${total.toLocaleString()}* ${moneda}
│
╰─🔒 Consejo del buen Rockstar Freddy: Usa *#deposit* para proteger tus ¥Monedas en el banco.
`.trim()

    await conn.reply(m.chat, texto, m)
}

handler.help = ['bal']
handler.tags = ['rpg']
handler.command = ['bal', 'balance', 'bank'] 
handler.register = true 
handler.group = true

export default handler
