var handler = async (m, { conn, usedPrefix, command, text }) => {

  if (isNaN(text) && !text.match(/@/g)) {
  } else if (isNaN(text)) {
    var number = text.split`@`[1]
  } else if (!isNaN(text)) {
    var number = text
  }

  if (!text && !m.quoted) {
    return conn.reply(m.chat, `🔧 *Sistema de Seguridad | FNaF LATAM*\n\n⚠️ Debes mencionar o responder a un usuario para promoverlo como administrador.`, m)
  }

  if (number.length > 13 || (number.length < 11 && number.length > 0)) {
    return conn.reply(m.chat, `🎭 *Acción Denegada*\n\nDebes etiquetar o responder a una persona válida para ejecutar esta función.`, m)
  }

  try {
    if (text) {
      var user = number + '@s.whatsapp.net'
    } else if (m.quoted.sender) {
      var user = m.quoted.sender
    } else if (m.mentionedJid) {
      var user = number + '@s.whatsapp.net'
    }
  } catch (e) {
  } finally {
    conn.groupParticipantsUpdate(m.chat, [user], 'promote')
    conn.reply(m.chat, `🎉 *Nuevo Rango Asignado*\n\n👤 El usuario ha sido promovido como *Administrador del Grupo* con éxito.\n\n✨ Bienvenido al backstage de *FNaF LATAM*.`, m)
  }

}

handler.help = ['promote']
handler.tags = ['grupo']
handler.command = ['promote', 'darpija', 'promover']
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.fail = null

export default handler
