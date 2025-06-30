import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {

    if (!text) 
      return conn.reply(m.chat, `👁️ Sistema de monitoreo FNaF LATAM™ activo.\n\n🦴 Entrada auditiva no detectada. Por favor, ingrese el nombre de una pista o artista para activar la sincronización.`, m)

    try {
        // Consulta base de datos auditiva Spotify - FNaF LATAM Monitor
        let songInfo = await spotifyxv(text)
        if (!songInfo.length) throw `⚙️ Archivo auditivo no localizado en la base de datos.`

        let song = songInfo[0]

        // Sincronizando enlace de descarga
        const res = await fetch(`https://api.sylphy.xyz/download/spotify?url=${song.url}&apikey=sylph-96ccb836bc`)
        if (!res.ok) throw `⛓️ Error en conexión con servidor de descargas. Código: ${res.status}`

        const data = await res.json().catch((e) => { 
            console.error('❌ Error en análisis de datos JSON:', e)
            throw "🧠 Fallo en procesamiento de datos."
        })

        if (!data.data.dl_url) throw "⛓️ Enlace de descarga no disponible."

        const info = `📡 FNaF LATAM™ - Protocolo de descarga audiovisual iniciado.\n
🎥 TÍTULO: *<${data.data.title}>*
🐻 ARTISTA: *${data.data.artist}*
🕰️ ÁLBUM: *${data.data.album}*
⏱️ DURACIÓN: *${data.data.duration}*
🔗 ORIGEN: ${song.url}

— Sistema respaldado por FNaF LATAM™`

        await conn.sendMessage(m.chat, { 
          text: info, 
          contextInfo: { 
            forwardingScore: 9999999, 
            isForwarded: false,
            externalAdReply: {
              showAdAttribution: true,
              containsAutoReply: true,
              renderLargerThumbnail: true,
              title: 'FNaF LATAM™ Monitoreo',
              body: 'Monitoreo Freddy Fazbear Entertainment™',
              mediaType: 1,
              thumbnailUrl: data.data.img,
              mediaUrl: song.url,
              sourceUrl: song.url
            }
          }}, { quoted: m })

        // Envío del audio con etiqueta de nota de voz
        await conn.sendMessage(m.chat, { 
          audio: { url: data.data.dl_url }, 
          fileName: `${data.data.title}.mp3`, 
          mimetype: 'audio/mp4', 
          ptt: true 
        }, { quoted: m })

    } catch (e1) {
        return m.reply(`🦴 Error en sistema FNaF LATAM™: ${e1.message || e1}`)
    }
}

handler.help = ['spotify', 'music']
handler.tags = ['descargas', 'monitoreo']
handler.command = ['spotify', 'splay']
handler.group = true

export default handler


async function spotifyxv(query) {
    let token = await tokens()
    let response = await axios({
        method: 'get',
        url: 'https://api.spotify.com/v1/search?q=' + encodeURIComponent(query) + '&type=track',
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    const tracks = response.data.tracks.items
    const results = tracks.map((track) => ({
        name: track.name,
        artista: track.artists.map((artist) => artist.name),
        album: track.album.name,
        duracion: timestamp(track.duration_ms),
        url: track.external_urls.spotify,
        imagen: track.album.images.length ? track.album.images[0].url : ''
    }))
    return results
}

async function tokens() {
    const response = await axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + Buffer.from('acc6302297e040aeb6e4ac1fbdfd62c3:0e8439a1280a43aba9a5bc0a16f3f009').toString('base64')
        },
        data: 'grant_type=client_credentials'
    })
    return response.data.access_token
}

function timestamp(time) {
    const minutes = Math.floor(time / 60000)
    const seconds = Math.floor((time % 60000) / 1000)
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
}

async function getBuffer(url, options) {
    try {
        options = options || {}
        const res = await axios({
            method: 'get',
            url,
            headers: {
                DNT: 1,
                'Upgrade-Insecure-Request': 1
            },
            ...options,
            responseType: 'arraybuffer'
        })
        return res.data
    } catch (err) {
        return err
    }
}

async function getTinyURL(text) {
    try {
        let response = await axios.get(`https://tinyurl.com/api-create.php?url=${text}`)
        return response.data
    } catch (error) {
        return text
    }
}
