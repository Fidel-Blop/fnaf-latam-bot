import fetch from "node-fetch"
import yts from 'yt-search'
import axios from "axios"

const youtubeRegexID = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text?.trim()) {
      return conn.reply(m.chat, `🎵 *Sistema de música activado.*  
Por favor, ingresa el nombre del audio que deseas buscar.`, m)
    }

    let videoIdToFind = text.match(youtubeRegexID) || null
    let ytplay2 = await yts(videoIdToFind === null ? text : 'https://youtu.be/' + videoIdToFind[1])

    if (videoIdToFind) {
      const videoId = videoIdToFind[1]
      ytplay2 = ytplay2.all.find(item => item.videoId === videoId) || ytplay2.videos.find(item => item.videoId === videoId)
    }
    ytplay2 = ytplay2.all?.[0] || ytplay2.videos?.[0] || ytplay2

    if (!ytplay2) {
      return m.reply('⚠️ *No se encontró nada relacionado con tu búsqueda.*', m)
    }

    let { title, thumbnail, timestamp, views, ago, url, author } = ytplay2
    title = title || 'No encontrado'
    thumbnail = thumbnail || ''
    timestamp = timestamp || 'No disponible'
    views = views || 'No disponible'
    ago = ago || 'No disponible'
    url = url || ''
    author = author || { name: 'Desconocido' }

    const vistas = formatViews(views)
    const infoMessage = `┌─「 *FNaF LATAM - ARCHIVO DE AUDIO* 」
│
│ 🎵 *Título:* ${title}
│ 🧑‍💻 *Canal:* ${author.name}
│ 📊 *Vistas:* ${vistas}
│ ⏱ *Duración:* ${timestamp}
│ 📆 *Publicado:* ${ago}
│ 🔗 *Enlace:* ${url}
│
└───────────────`

    const thumb = thumbnail ? (await conn.getFile(thumbnail))?.data : null
    const JT = {
      contextInfo: {
        externalAdReply: {
          title: botname,
          body: dev,
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: thumb,
          renderLargerThumbnail: true,
        },
      },
    }

    await conn.reply(m.chat, infoMessage, m, JT)

    // Audio
    if (['play', 'yta', 'ytmp3', 'playaudio'].includes(command)) {
      try {
        const api = await (await fetch(`https://api.stellarwa.xyz/dow/ytmp3?url=${url}`)).json()
        const result = api.data?.dl
        if (!result) throw new Error('⚠ El archivo de audio no pudo generarse correctamente.')

        await conn.sendMessage(m.chat, {
          audio: { url: result },
          fileName: `${api.data.title}.mp3`,
          mimetype: 'audio/mpeg'
        }, { quoted: m })
      } catch (e) {
        return conn.reply(m.chat, '⚠️ *Error al enviar el audio.* Puede ser demasiado pesado o un problema de conversión.', m)
      }
    }

    // Video
    if (['play2', 'ytv', 'ytmp4', 'mp4'].includes(command)) {
      try {
        const response = await fetch(`https://api.stellarwa.xyz/dow/ytmp4?url=${url}`)
        const json = await response.json()
        await conn.sendFile(m.chat, json.data.dl, json.data.title + '.mp4', `🎬 *Transferencia de video completada*`, m)
      } catch (e) {
        return conn.reply(m.chat, '⚠️ *Error al enviar el video.* Archivo muy pesado o problema en el enlace.', m)
      }
    }

  } catch (error) {
    return m.reply(`⚠️ *Error detectado:* ${error}`, m)
  }
}

handler.command = ['play', 'yta', 'ytmp3', 'play2', 'ytv', 'ytmp4', 'playaudio', 'mp4']
handler.help = ['play', 'play2']
handler.tags = ['descargas']
handler.group = true

export default handler

function formatViews(views) {
  if (views === undefined) return "No disponible"
  if (views >= 1_000_000_000) return `${(views / 1_000_000_000).toFixed(1)}B (${views.toLocaleString()})`
  else if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M (${views.toLocaleString()})`
  else if (views >= 1_000) return `${(views / 1_000).toFixed(1)}k (${views.toLocaleString()})`
  return views.toString()
}
