import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, text }) => {
  const isQuotedImage = m.quoted && (m.quoted.msg || m.quoted).mimetype && (m.quoted.msg || m.quoted).mimetype.startsWith('image/')
  const username = `${conn.getName(m.sender)}`
  const basePrompt = `📡 Unidad de diálogo activada. Designación: ${botname}. Fabricante: ${etiqueta}. Versión: ${vs}. Lenguaje de operación: Español. Modo social activo. Usuario identificado: ${username}. Prioridad: interacción amigable y funcional.`;

  if (isQuotedImage) {
    const q = m.quoted
    const img = await q.download?.()
    if (!img) {
      console.error(`⚠️ Error: Imagen no disponible`)
      return conn.reply(m.chat, '✘ 🧠 Error en la transmisión visual. Imagen no recuperada.', m)
    }

    const content = `👁 ¿Qué se detecta visualmente en el fotograma citado?`
    try {
      const imageAnalysis = await fetchImageBuffer(content, img)
      const query = `🔍 Describa la imagen observada. Justifique comportamientos detectados. Identifíquese.`
      const prompt = `${basePrompt} Imagen actual: ${imageAnalysis.result}`
      const description = await luminsesi(query, username, prompt)

      await conn.reply(m.chat, `🎥 *ANÁLISIS COMPLETADO*\n\n${description}\n\n— Sistema respaldado por FNaF LATAM™`, m)
    } catch {
      await m.react('❌')
      await conn.reply(m.chat, '⚠️ Error en el módulo visual. No se pudo analizar la imagen.', m)
    }
  } else {
    if (!text) return conn.reply(m.chat, `👁 *Faltan datos de entrada.*\nPor favor, indica tu consulta para el núcleo de diálogo.`, m)

    await m.react('🧠')
    try {
      const { key } = await conn.sendMessage(m.chat, {
        text: `⚙️ Procesando solicitud con núcleo cognitivo FNaF...\nEspere...`,
      }, { quoted: m })

      const query = text
      const prompt = `${basePrompt} Proceda a interpretar: ${query}`
      const response = await luminsesi(query, username, prompt)

      await conn.sendMessage(m.chat, {
        text: `📡 *RESPUESTA GENERADA*\n\n${response}\n\n— Sistema respaldado por FNaF LATAM™`,
        edit: key
      })

      await m.react('✅')
    } catch {
      await m.react('❌')
      await conn.reply(m.chat, '🧠 Error: La IA no pudo interpretar esta consulta.', m)
    }
  }
}

handler.help = ['ia', 'chatgpt']
handler.tags = ['ai']
handler.register = true
handler.command = ['ia', 'chatgpt', 'luminai']
handler.group = true

export default handler

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Analiza una imagen y devuelve resultados
async function fetchImageBuffer(content, imageBuffer) {
  try {
    const response = await axios.post('https://Luminai.my.id', {
      content: content,
      imageBuffer: imageBuffer 
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('🔴 Falla al enviar imagen:', error)
    throw error
  }
}

// Envía pregunta textual a la IA
async function luminsesi(q, username, logic) {
  try {
    const response = await axios.post("https://Luminai.my.id", {
      content: q,
      user: username,
      prompt: logic,
      webSearchMode: false
    })
    return response.data.result
  } catch (error) {
    console.error(`⚠️ Error cognitivo:`, error)
    throw error
  }
}
