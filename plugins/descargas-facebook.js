import { igdl } from 'ruhend-scraper'

const handler = async (m, { text, conn, args }) => {
  if (!args[0]) {
    return conn.reply(m.chat, `${emoji} Por favor, ingresa un enlace de Facebook para descargar el video.`, m)
  }

  let res;
  try {
    await m.react('🕒')
    res = await igdl(args[0])
  } catch (e) {
    await m.react('❌')
    return conn.reply(m.chat, `${msm} Error al obtener los datos. Por favor verifica que el enlace sea válido.`, m)
  }

  let result = res.data
  if (!result || result.length === 0) {
    await m.react('❌')
    return conn.reply(m.chat, `${emoji2} No se encontraron resultados para el enlace proporcionado.`, m)
  }

  let data
  try {
    data = result.find(i => i.resolution === "720p (HD)") || result.find(i => i.resolution === "360p (SD)")
  } catch (e) {
    await m.react('❌')
    return conn.reply(m.chat, `${msm} Error al procesar los datos de video.`, m)
  }

  if (!data) {
    await m.react('❌')
    return conn.reply(m.chat, `${emoji2} No se encontró una resolución adecuada para el video.`, m)
  }

  let video = data.url
  try {
    await conn.sendMessage(m.chat, { video: { url: video }, caption: `${emoji} Aquí tienes tu video descargado ฅ^•ﻌ•^ฅ`, fileName: 'fb-video.mp4', mimetype: 'video/mp4' }, { quoted: m })
    await m.react('✅')
  } catch (e) {
    await m.react('❌')
    return conn.reply(m.chat, `${msm} Error al enviar el video.`, m)
  }
}

handler.help = ['facebook', 'fb']
handler.tags = ['descargas']
handler.command = ['facebook', 'fb']
handler.group = true
handler.register = true
handler.coin = 2

export default handler
