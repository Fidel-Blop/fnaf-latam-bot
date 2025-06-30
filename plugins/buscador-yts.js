import yts from 'yt-search'

var handler = async (m, { text, conn, args, command, usedPrefix }) => {

  if (!text) {
    return conn.reply(
      m.chat,
      `👁 *Entrada de búsqueda no registrada.*\n📎 Por favor, especifica una consulta válida para activar el escaneo audiovisual del sistema central.`,
      m
    )
  }

  await conn.reply(
    m.chat,
    `📡 *SINCRONIZANDO CON BASE DE DATOS AUDIOVISUAL EXTERNA*\n⏳ Consulta: "${text}"\n\nEspere unos instantes mientras el sistema ejecuta el rastreo. 🧠`,
    m
  )

  let results = await yts(text)
  let tes = results.all

  let teks = tes
    .map(v => {
      if (v.type === 'video') {
        return `🎥 *TÍTULO DETECTADO:* ${v.title}
🐻 *CANAL AUTORIZADO:* ${v.author.name}
⏱️ *DURACIÓN DEL MATERIAL:* ${v.timestamp}
📆 *FECHA DE PUBLICACIÓN:* ${v.ago}
👁️ *RECUENTO VISUAL:* ${v.views} vistas
🔗 *VÍNCULO DE ACCESO:* ${v.url}

⛓️ Archivo indexado con éxito.`
      }
    })
    .filter(Boolean)
    .join('\n\n⚙️••••••••••••••••••••••••••••••••••••⚙️\n\n')

  await conn.sendFile(
    m.chat,
    tes[0].thumbnail,
    'fnaf_latam_yts.jpeg',
    `📡 *PROTOCOLO DE ESCANEO COMPLETADO — SISTEMA FNaF LATAM™* 📡\n\n${teks}\n\n🚨 *Este módulo está monitoreado.* No se permite la búsqueda de material perturbador o inapropiado (+18, gore, etc.).\n\n⚠️ El uso indebido será reportado al sistema de seguridad automatizado.\n\n— Sistema respaldado por *FNaF LATAM™*`,
    fkontak,
    m
  )
}

handler.help = ['ytsearch']
handler.tags = ['buscador']
handler.command = ['ytbuscar', 'ytsearch', 'yts']
handler.register = true
handler.coin = 1

export default handler
