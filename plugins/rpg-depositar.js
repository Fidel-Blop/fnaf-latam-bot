import db from '../lib/database.js'

let handler = async (m, { args }) => {
    let user = global.db.data.users[m.sender]

    if (!args[0]) return m.reply(`🎮 *Terminal de Seguridad Fazbear*\n\n📥 Ingresa la cantidad de *${moneda}* que deseas transferir a la bóveda del sistema.\n\n_Ejemplo: #depositar 5000_`)

    if ((args[0]) < 1) return m.reply(`⚠️ *Cantidad no válida.*\n📌 Asegúrate de ingresar un monto positivo de *${moneda}* para depositar.`)

    if (args[0] == 'all') {
        let count = parseInt(user.coin)
        user.coin -= count * 1
        user.bank += count * 1
        await m.reply(`🔐 *Depósito Completado*\n\n📁 Has transferido *${count} ${moneda}* al sistema de resguardo.\n🦾 Tus fondos ahora están protegidos en la bóveda de Freddy.`)
        return !0
    }

    if (!Number(args[0])) return m.reply(`🧾 *Formato incorrecto*\n\nUsa el comando de esta manera:\n> 📌 *#d 2500*\n> 📌 *#d all*\n\nEvita usar letras o símbolos.`)

    let count = parseInt(args[0])

    if (!user.coin) return m.reply(`💸 No tienes *${moneda}* en tu Cartera.\n⛔ Debes tener fondos para realizar un depósito.`)

    if (user.coin < count) return m.reply(`🚫 Fondos insuficientes.\nSolo tienes *${user.coin} ${moneda}* en tu Cartera.`)

    user.coin -= count * 1
    user.bank += count * 1

    await m.reply(`🗃️ *Proceso exitoso*\n\n🔐 Has depositado *${count} ${moneda}* en la bóveda de Fazbear.\n🔒 Seguridad activada. Nadie podrá robarlos mientras estén aquí.`)
}

handler.help = ['depositar']
handler.tags = ['rpg']
handler.command = ['deposit', 'depositar', 'd', 'aguardar']
handler.group = true
handler.register = true

export default handler
