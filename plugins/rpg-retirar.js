import db from '../lib/database.js'

let handler = async (m, { args }) => {
  let user = global.db.data.users[m.sender]
  if (!args[0]) return m.reply(`${emoji} ⚠️ Ingresa la cantidad de *${moneda}* que deseas retirar, sobreviviente.`)
  
  if (args[0] === 'all') {
    let count = parseInt(user.bank)
    user.bank -= count * 1
    user.coin += count * 1
    await m.reply(`🎭 Has sacado *${count} ${moneda}* de tu escondite en el banco.\nTen cuidado, ahora están en tus manos pero Freddy podría acechar... 👀`)
    return !0
  }
  
  if (!Number(args[0])) 
    return m.reply(`${emoji2} ❌ Cantidad inválida para retirar.\nEjemplos:\n> *#retirar 25000*\n> *#retirar all*`)
  
  let count = parseInt(args[0])
  
  if (!user.bank) 
    return m.reply(`🔒 No tienes suficiente ${moneda} en tu cuenta bancaria para retirar.`)
  
  if (user.bank < count) 
    return m.reply(`💀 Solo tienes *${user.bank} ${moneda}* en tu banco, no más.`)
  
  user.bank -= count * 1
  user.coin += count * 1
  
  await m.reply(`🎭 Has retirado *${count} ${moneda}* de tu banco.\nTen cuidado, ahora podrías ser vulnerable a los ataques de Freddy y sus secuaces.`)
}

handler.help = ['retirar']
handler.tags = ['rpg']
handler.command = ['withdraw', 'retirar', 'with']
handler.group = true
handler.register = true

export default handler
