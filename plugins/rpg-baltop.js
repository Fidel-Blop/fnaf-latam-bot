let handler = async (m, { conn, args, participants }) => {
    // Filtrar solo los usuarios que estén en el grupo actual
    let users = Object.entries(global.db.data.users)
        .filter(([jid, _]) => participants.some(p => p.jid === jid)) // Solo miembros del grupo
        .map(([jid, data]) => ({ ...data, jid }))

    // Ordenar por total de monedas (coin + bank)
    let sorted = users.sort((a, b) => (b.coin + b.bank) - (a.coin + a.bank))

    let len = args[0] && args[0].length > 0 ? Math.min(10, Math.max(parseInt(args[0]), 10)) : Math.min(10, sorted.length)

    let text = `╭───〔👑 *TOP DEL GRUPO* - ¥Monedas〕───⬣\n│\n│ 🎮 *Ranking económico de miembros:*\n│`

    text += sorted.slice(0, len).map(({ jid, coin, bank }, i) => {
        let total = (coin || 0) + (bank || 0)
        let tag = participants.some(p => p.jid === jid) ? conn.getName(jid) : `@${jid.split('@')[0]}`
        return `│ ${i + 1}. *${tag}*\n│ 💰 Total: ¥${total.toLocaleString()} ${moneda}\n│`
    }).join('\n')

    text += `\n╰─────────────⬣\n🎭 ¿Estás listo para superar a los demás jugadores en la economía del grupo?`

    await conn.reply(m.chat, text.trim(), m, { mentions: conn.parseMention(text) })
}

handler.help = ['baltop']
handler.tags = ['rpg']
handler.command = ['baltop', 'eboard']
handler.group = true
handler.register = true
handler.fail = null
handler.exp = 0

export default handler
