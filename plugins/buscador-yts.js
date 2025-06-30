import yts from 'yt-search'

var handler = async (m, { text, conn, args, command, usedPrefix }) => {

if (!text) return conn.reply(m.chat, `👁 Entrada de búsqueda no registrada. Por favor, especifica una consulta válida para activar el escaneo audiovisual.`, m)

conn.reply(m.chat, '🎥 Sincronizando con la base de datos audiovisual... Espere unos instantes. 🧠', m)

let results = await yts(text)
let tes = results.all

let teks = tes.map(v => {
  if (v.type === 'video') {
    return `📡 *PROTOCOLO DE ESCANEO COMPLETADO — SISTEMA FNaF LATAM™* 📡

> 🎥 *TÍTULO DETECTADO:* ${v.title}
> 🐻 *CANAL AUTORIZADO:* ${v.author.name}
> ⏱️ *DURACIÓN DEL MATERIAL:* ${v.timestamp}
> 📆 *FECHA DE PUBLICACIÓN:* ${v.ago}
> 👁️ *RECUENTO VISUAL:* ${v.views} vistas
> 🔗 *VÍNCULO DE ACCESO:* ${v.url}

⛓️ Archivo indexado en servidores secundarios.`;
  }
}).filter(Boolean).join('\n\n⚙️••••••••••••••••••••••••••••••••••••••⚙️\n\n')

conn.sendFile(m.chat, tes[0].thumbnail, 'fnaf_latam_yts.jpeg', teks + `\n\n— Sistema respaldado por FNaF LATAM™`, fkontak, m)

}

handler.help = ['ytsearch']
handler.tags = ['buscador']
handler.command = ['ytbuscar', 'ytsearch', 'yts']
handler.register = true
handler.coin = 1

export default handler
