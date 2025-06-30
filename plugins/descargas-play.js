import fetch from "node-fetch"
import yts from 'yt-search'
import axios from "axios"

const youtubeRegexID = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text.trim()) {
      return conn.reply(m.chat, `🧠 Entrada no procesada...\n⚠️ *Ingrese el nombre del archivo audiovisual a localizar.*\n\n> Ejemplo: ${usedPrefix + command} Darkest Desires FNaF`, m)
    }

    let videoIdToFind = text.match(youtubeRegexID) || null
    let ytplay2 = await yts(videoIdToFind === null ? text : 'https://youtu.be/' + videoIdToFind[1])

    if (videoIdToFind) {
      const videoId = videoIdToFind[1]
      ytplay2 = ytplay2.all.find(item => item.videoId === videoId) || ytplay2.videos.find(item => item.videoId === videoId)
    }

    ytplay2 = ytplay2.all?.[0] || ytplay2.videos?.[0] || ytplay2
    if (!ytplay2) {
      return m.reply('📡 Sistema: *No se encontraron coincidencias en el archivo central.*')
    }

    let { title, thumbnail, timestamp, views, ago, url, author } = ytplay2

    const vistas = formatViews(views)
    const canal = author?.name || 'No identificado'

    const info = `🎥 *PROTOCOLO DE DESCARGA — SISTEMA FNaF LATAM™ ACTIVADO* 🎥

> 🎬 *Archivo Identificado:* ${title}
> 🐻 *Canal de Origen:* ${canal}
> ⏱ *Duración:* ${timestamp}
> 📆 *Carga Inicial:* ${ago}
> 👁 *Vistas Registradas:* ${vistas}
> 🔗 *Enlace:* ${url}

⚙️ Ejecutando secuencia de adquisición... Por favor espere.`

    const thumb = (await conn.getFile(thumbnail))?.data
    const JT = {
      contextInfo: {
        externalAdReply: {
          title: '🎥 Monitoreo Central: Descarga Autorizada',
          body: 'FNaF LATAM™ | Vigilancia de Archivos',
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: thumb,
          renderLargerThumbnail: true,
        },
      },
    }

    await conn.reply(m.chat, info, m, JT)

    if (['play', 'yta', 'ytmp3', 'playaudio'].includes(command)) {
      try {
        const api = await (await fetch(`https://api.stellarwa.xyz/dow/ytmp3?url=${url}`)).json()
        const result = api.data?.dl
        if (!result) throw new Error('⚠️ El archivo de audio no se generó correctamente.')

        await conn.sendMessage(m.chat, {
          audio: { url: result },
          fileName: `${api.data?.title || 'descarga'}.mp3`,
          mimetype: 'audio/mpeg'
        }, { quoted: m })
      } catch (e) {
        return conn.reply(m.chat, '❌ Fallo en la transferencia de audio. Verifique el tamaño o el estado del servidor.', m)
      }
    } else if (['play2', 'ytv', 'ytmp4', 'mp4'].includes(command)) {
      try {
        const response = await fetch(`https://api.stellarwa.xyz/dow/ytmp4?url=${url}`)
        const json = await response.json()
        await conn.sendFile(m.chat, json.data.dl, json.data.title + '.mp4', `🎥 *Video Recuperado: ${title}*`, m)
      } catch (e) {
        return conn.reply(m.chat, '❌ Fallo en la transferencia del video. El archivo puede exceder el límite o estar dañado.', m)
      }
    } else {
      return conn.reply(m.chat, '🔍 Comando no reconocido dentro del protocolo.', m)
    }
  } catch (error) {
    return m.reply(`🛑 Error interno del sistema: ${error}`)
  }
}

handler.command = handler.help = ['play', 'yta', 'ytmp3', 'play2', 'ytv', 'ytmp4', 'playaudio', 'mp4']
handler.tags = ['descargas']
handler.group = true

export default handler

function formatViews(views) {
  if (!views) return "Desconocido"
  if (views >= 1_000_000_000) return `${(views / 1_000_000_000).toFixed(1)}B (${views.toLocaleString()})`
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M (${views.toLocaleString()})`
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K (${views.toLocaleString()})`
  return views.toString()
}
