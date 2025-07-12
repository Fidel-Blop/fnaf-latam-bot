import fetch from 'node-fetch'

const emoji = '🤖🕹️';          // robot + joystick para llamar la atención
const msm = '⚠️👻';             // advertencia + fantasma para errores
const rwait = '⏳👀';           // reloj de arena + ojo para reacción de espera

var handler = async (m, { text, usedPrefix, command, conn }) => {
  if (!text) 
    return conn.reply(m.chat, `${emoji} *¡Atención!* Debes ingresar una petición para que Gemini revele sus secretos... 🕯️✨`, m)
  
  try {
    await m.react(rwait)
    conn.sendPresenceUpdate('composing', m.chat)
    
    var apii = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${encodeURIComponent(text)}`)
    var res = await apii.json()
    
    await m.reply(`👁️ *Gemini dice:* \n\n${res.result}\n\n🌙 *Respaldado por FNAF LATAM* 🌙`)
  } catch {
    await m.react('❌')
    await conn.reply(m.chat, `${msm} Gemini no pudo responder a tu consulta. Intenta de nuevo más tarde, cuando las sombras sean menos densas... 🌫️`, m)
  }
}

handler.command = ['gemini']
handler.help = ['gemini']
handler.tags = ['ai']
handler.group = true

export default handler
