const pHora = 30
const pDia = 700
const cHora = 1  
const cDia = 20  

let handler = async (m, { conn, usedPrefix, command, args }) => {

  let texto = `
╔════════════════════╗
   🎭 𝐅𝐍𝐀𝐅 𝐋𝐀𝐓𝐀𝐌 🎭
╚════════════════════╝

⚡ Opciones para activar PREMIUM:

⌛ *h :* Horas = ${pHora} ${moneda}
📅 *d :* Días = ${pDia} ${moneda}

🔥 Ejemplo de compra:
${usedPrefix + command} 1 h  →  1 hora de acceso PREMIUM
${usedPrefix + command} 1 d  →  1 día de acceso PREMIUM
`

  let name = await conn.getName(m.sender)
  if (!args[0]) return conn.reply(m.chat, texto, fkontak)

  let user = global.db.data.users[m.sender]
  let users = global.db.data.chats[m.chat].users[m.sender]

  if (isNaN(args[0])) 
    return conn.reply(m.chat, `⚠️ Solo números válidos.\nEjemplo: ${usedPrefix + command} 1 h`, m)

  let unidad = args[1] || "h"
  let precio = unidad === "h" ? pHora : pDia
  let comision = unidad === "h" ? cHora : cDia 

  if (!args[1] || (unidad !== "h" && unidad !== "d")) 
    return conn.reply(m.chat, `❌ Formato inválido. Usa 'h' para horas o 'd' para días.`, m)

  if (users.coin < (precio + comision) * args[0]) 
    return conn.reply(m.chat, `💸 ¡No tienes suficientes ${moneda} para esta compra PREMIUM!`, m)

  let tiempo
  if (unidad === "h") {
    tiempo = 3600000 * args[0]
    let now = Date.now()
    if (now < user.premiumTime) user.premiumTime += tiempo
    else user.premiumTime = now + tiempo
    user.premium = true
    users.coin -= (pHora + cHora) * args[0]
  } else if (unidad === "d") {
    tiempo = 86400000 * args[0]
    let now = Date.now()
    if (now < user.premiumTime) user.premiumTime += tiempo
    else user.premiumTime = now + tiempo
    user.premium = true
    users.coin -= (pDia + cDia) * args[0]
  }

  let tipoTiempo = unidad === "h" ? "Hora(s)" : "Día(s)"
  let totalPago = (precio + comision) * args[0]

  let cap = `\`\`\`乂 𝐅𝐍𝐀𝐅  - 𝐏𝐑𝐄𝐌𝐈𝐔𝐌 乂\`\`\`

👤 Usuario  » @${m.sender.split`@`[0]}
⏳ Tiempo  » ${args[0]} ${tipoTiempo}
💰 Total a pagar » ${totalPago} ${moneda}

⛁ Saldo actual » ${users.coin} ${moneda}
✰ Saldo antes » ${users.coin + totalPago} ${moneda}
⚠️ Comisión aplicada » ${comision * args[0]} ${moneda} (Incluida)
  
✨ Gracias por apoyar a FNaF LATAM, disfruta tu acceso PREMIUM 👻`

  conn.sendMessage(m.chat, { text: cap, mentions: [m.sender] }, { quoted: fkontak })
}

handler.tags = ['rg']
handler.help = ['premium']
handler.command = ['vip', 'premium', 'prem']

export default handler
