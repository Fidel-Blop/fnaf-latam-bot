import db from '../lib/database.js'

let cooldowns = {}

let handler = async (m, { conn, args, usedPrefix, command }) => {
    const user = global.db.data.users[m.sender]
    const username = await conn.getName(m.sender)
    const tiempoEspera = 15 // segundos

    // Cooldown
    if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
        const restante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000))
        return conn.reply(m.chat, `⏳ Ya jugaste recientemente. Esperá *${restante}* antes de volver a apostar.`, m)
    }
    cooldowns[m.sender] = Date.now()

    // Validar apuesta
    if (!args[0]) {
        return conn.reply(m.chat, `🎰 Usa el comando correctamente:\n> *${usedPrefix + command}* 100`, m)
    }

    let count = /all/i.test(args[0]) ? user.coin : parseInt(args[0])
    if (isNaN(count) || count <= 0) {
        return conn.reply(m.chat, `❗ Ingresa una cantidad válida para apostar.`, m)
    }

    if (user.coin < count) {
        return conn.reply(m.chat, `💸 No tienes suficientes ${moneda}. Te faltan *${formatNumber(count - user.coin)} ${moneda}*`, m)
    }

    // Generar valores aleatorios
    let botValue = Math.floor(Math.random() * 101)
    let playerValue = Math.floor(Math.random() * 101)

    user.coin -= count

    let resultado = ''
    if (botValue > playerValue) {
        resultado = `😔 *Perdiste* ${formatNumber(count)} ${moneda}.`
    } else if (botValue < playerValue) {
        user.coin += count * 2
        resultado = `🎉 *Ganaste* ${formatNumber(count * 2)} ${moneda}!`
    } else {
        user.coin += count
        resultado = `🤝 Empate. Recuperaste tus ${formatNumber(count)} ${moneda}.`
    }

    let texto = `
🎲 *¡Apuesta Realizada!* 🎲

👤 *${username}* vs *${botname}*
➠ Tú: *${playerValue}*
➠ ${botname}: *${botValue}*

${resultado}
`.trim()

    conn.reply(m.chat, texto, m)
}

handler.help = ['apostar <cantidad>']
handler.tags = ['economy']
handler.command = ['apostar', 'casino']
handler.group = true
handler.register = true

export default handler

// Utilidades
function segundosAHMS(segundos) {
    let m = Math.floor(segundos / 60)
    let s = segundos % 60
    return `${m > 0 ? m + 'm ' : ''}${s}s`
}

function formatNumber(number) {
    return number.toLocaleString('es')
}
