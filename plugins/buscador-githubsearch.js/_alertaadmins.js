let handler = async (m, { conn, text, participants, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`👁 *Protocolo incompleto.*\n📎 Usa el formato correcto:\n\n${usedPrefix}${command} [motivo de alerta]\n\n📌 Ejemplo:\n${usedPrefix}${command} actividad sospechosa en el grupo`);
  }

  const admins = participants.filter(p => p.admin).map(p => '@' + p.id.split('@')[0]).join(' ')
  const reportante = '@' + m.sender.split('@')[0]

  let mensaje = `
🚨 *LLAMADO DE EMERGENCIA — NIVEL 2 ACTIVADO* 🚨

📡 *Unidad Administrativa requerida con urgencia.*

⚠️ *Motivo de la alerta:* ${text}
🧍‍♂️ *Solicitante:* ${reportante}

⛓️ *Administradores del canal:*
${admins}

📌 *Este comando debe utilizarse con total responsabilidad.*
📛 El mal uso puede derivar en medidas como:
— Advertencia inicial.
— Sanción o *warn* según la gravedad.

— Sistema respaldado por FNaF LATAM™
`.trim()

  // Mensaje principal al grupo
  await conn.sendMessage(m.chat, {
    text: mensaje,
    mentions: participants.map(p => p.id)
  }, { quoted: m })

  // Mensaje privado de seguimiento al que reportó
  await conn.reply(m.chat, `👁 *Unidad Administrativa ha sido notificada.*\nGracias por su reporte. Su identificación ha quedado registrada.\n\n— Sistema FNaF LATAM™`, m)
}

handler.help = ['fazadmins <motivo>']
handler.tags = ['tools', 'alerta']
handler.command = ['fazadmins']
handler.group = true

export default handler
