import { delay } from '@whiskeysockets/baileys'

const salasRuleta = {}

const handler = async (m, { conn }) => {
    const chatId = m.chat
    const senderId = m.sender

    if (salasRuleta[chatId])
        return conn.reply(m.chat, '⚠️ *[FNaF LATAM]*\n\n🛑 Ya hay una sala activa en este canal de seguridad.\n⏳ Esperá a que finalice el juego en curso.', m)

    salasRuleta[chatId] = { jugadores: [senderId], estado: 'esperando' }

    await conn.sendMessage(m.chat, {
        text: `🎮 *[FNaF LATAM – Ruleta de la Muerte]*\n\n👤 @${senderId.split('@')[0]} ha iniciado una sala de juego.\n\n🎲 Para participar, responde con *acepto*.\n\n⌛ *Tiempo límite: 60 segundos*`,
        mentions: [senderId]
    }, { quoted: m })

    await delay(60000)
    if (salasRuleta[chatId] && salasRuleta[chatId].estado === 'esperando') {
        delete salasRuleta[chatId]
        await conn.sendMessage(m.chat, { text: '🔒 *[FNaF LATAM]*\n\n⛔ Sala cerrada. No se registraron jugadores.' })
    }
}

handler.command = ['ruletamuerte']
handler.botAdmin = true

export default handler

handler.before = async (m, { conn }) => {
    const chatId = m.chat
    const senderId = m.sender
    const texto = m.text?.toLowerCase()

    if (!salasRuleta[chatId]) return

    if (texto === 'acepto' || texto === 'aceptar') {
        if (salasRuleta[chatId].jugadores.length >= 2)
            return conn.reply(m.chat, '⚠️ *[FNaF LATAM]*\n\n🎮 Ya hay dos jugadores en esta sala.', m)

        if (senderId === salasRuleta[chatId].jugadores[0])
            return conn.reply(m.chat, '📌 *[FNaF LATAM]*\n\n👤 No podés aceptar tu propio desafío.', m)

        salasRuleta[chatId].jugadores.push(senderId)
        salasRuleta[chatId].estado = 'completa'

        await conn.sendMessage(m.chat, {
            audio: { url: "https://qu.ax/iwAmy.mp3" },
            mimetype: "audio/mp4",
            ptt: true
        })

        await conn.sendMessage(m.chat, {
            text: '🔁 *[FNaF LATAM – Ruleta de la Muerte]*\n\n🎯 Sala completa.\n🌀 Iniciando selección del perdedor...'
        })

        const loadingMessages = [
            "《 █▒▒▒▒▒▒▒▒▒▒▒》10%\n🧠 Calculando patrones animatrónicos...",
            "《 ████▒▒▒▒▒▒▒▒》30%\n⚙️ Analizando comportamiento de jugadores...",
            "《 ███████▒▒▒▒▒》50%\n🔍 Revisión final de riesgo...",
            "《 ██████████▒▒》80%\n💀 Últimos ajustes del sistema...",
            "《 ████████████》100%\n📢 *Veredicto final activado!*"
        ]

        let { key } = await conn.sendMessage(m.chat, { text: "⌛ *Procesando resultado..." }, { quoted: m })

        for (let msg of loadingMessages) {
            await delay(3000)
            await conn.sendMessage(m.chat, { text: msg, edit: key }, { quoted: m })
        }

        const [jugador1, jugador2] = salasRuleta[chatId].jugadores
        const perdedor = Math.random() < 0.5 ? jugador1 : jugador2

        await conn.sendMessage(m.chat, {
            text: `⚠️ *[FNaF LATAM – Veredicto Final]*\n\n💥 @${perdedor.split('@')[0]} ha sido designado como el *perdedor* por el sistema.\n\n🕒 Tiene 60 segundos para despedirse...`,
            mentions: [perdedor]
        })

        await delay(60000)
        await conn.groupParticipantsUpdate(m.chat, [perdedor], 'remove')
        await conn.sendMessage(m.chat, {
            text: `🪦 *[FNaF LATAM]*\n\n@${perdedor.split('@')[0]} ha sido eliminado del sistema.\n\n🎮 Fin del juego.`,
            mentions: [perdedor]
        })
        delete salasRuleta[chatId]
    }

    if (texto === 'rechazar' && senderId === salasRuleta[chatId].jugadores[0]) {
        delete salasRuleta[chatId]
        await conn.sendMessage(m.chat, { text: '❌ *[FNaF LATAM]*\n\n🧾 El juego fue cancelado por el retador principal.' })
    }
}
