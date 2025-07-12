import axios from 'axios'
import fetch from 'node-fetch'

const emoji = '🤖🕹️'
const emoji2 = '🔮✨'
const msm = '⚠️👻'
const rwait = '⏳👀'
const done = '✅🎉'
const error = '❌💀'
const botname = 'FNaFBot'
const etiqueta = 'FNAF LATAM Team'
const vs = 'v2.5'

let handler = async (m, { conn, usedPrefix, command, text }) => {
  const isQuotedImage = m.quoted && (m.quoted.msg || m.quoted).mimetype && (m.quoted.msg || m.quoted).mimetype.startsWith('image/')
  const username = `${conn.getName(m.sender)}`
  
  const basePrompt = `Tu nombre es ${botname} y fuiste creado por ${etiqueta}. Estás en la versión ${vs}. Hablas español, llamas a las personas por su nombre, en este caso ${username}, te gusta ser divertida y te encanta aprender. Siempre debes ser amigable con quien hablas.`
  
  if (isQuotedImage) {
    const q = m.quoted
    const img = await q.download?.()
    if (!img) {
      console.error(`${msm} Error: No se pudo descargar la imagen`)
      return conn.reply(m.chat, `${error} Ups... No pude descargar la imagen. Intenta de nuevo.`, m)
    }
    
    const content = `${emoji} ¿Qué ves en esta imagen?`
    try {
      const imageAnalysis = await fetchImageBuffer(content, img)
      const query = `${emoji} Descríbeme la imagen, explica qué está pasando y dime quién eres.`
      const prompt = `${basePrompt} La imagen analizada es: ${imageAnalysis.result}`
      const description = await luminsesi(query, username, prompt)
      
      await conn.reply(m.chat, `👁️ *Análisis de imagen por Gemini:* \n\n${description}\n\n🌙 *Respaldado por FNAF LATAM* 🌙`, m)
    } catch {
      await m.react(error)
      await conn.reply(m.chat, `${error} Lo siento, no pude analizar la imagen. Intenta de nuevo más tarde...`, m)
    }
    
  } else {
    if (!text) {
      return conn.reply(m.chat, `${emoji} Por favor ingresa una petición para que Gemini responda tus inquietudes... 👻`, m)
    }
    
    await m.react(rwait)
    
    try {
      const { key } = await conn.sendMessage(m.chat, { text: `${emoji2} Gemini está procesando tu petición, aguarda unos segundos... 🔮` }, { quoted: m })
      
      const query = text
      const prompt = `${basePrompt} Responde a esta pregunta: ${query}`
      const response = await luminsesi(query, username, prompt)
      
      await conn.sendMessage(m.chat, { text: `💬 *Gemini responde:* \n\n${response}\n\n🌙 *Respaldado por FNAF LATAM* 🌙`, edit: key })
      
      await m.react(done)
    } catch {
      await m.react(error)
      await conn.reply(m.chat, `${error} Gemini no puede responder a esa pregunta en este momento. Intenta nuevamente más tarde.`, m)
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

// Función para enviar una imagen y obtener análisis
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
    console.error('Error en fetchImageBuffer:', error)
    throw error
  }
}

// Función para interactuar con la IA usando prompts
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
    console.error(`${msm} Error al obtener respuesta:`, error)
    throw error
  }
}
