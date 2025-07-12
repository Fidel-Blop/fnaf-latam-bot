import translate from '@vitalets/google-translate-api';
import axios from 'axios';
import fetch from 'node-fetch';

const emoji = '🎤🤖'
const msm = '⚠️'

const handler = async (m, { conn, text, command, args, usedPrefix }) => {
  if (!text) {
    conn.reply(m.chat, `${emoji} *¡Oye, no te quedes callado!*\nDime algo para que *The Mimic Bot* pueda responderte con dulzura... o con susto. 👀`, m)
    return
  }

  try {
    const resSimi = await simitalk(text)
    const respuesta = resSimi.resultado.simsimi

    await conn.sendMessage(m.chat, { 
      text: `🔊 *Mimic responde:*\n\n${respuesta}\n\n🌙 *Respaldado por FNAF LATAM* 🌙` 
    }, { quoted: m })

  } catch {
    throw `${msm} ¡Ups! Algo salió mal hablando con Mimic... intenta más tarde. 💥`
  }
};

handler.help = ['simi', 'bot']
handler.tags = ['fun']
handler.group = true
handler.register = true
handler.command = ['yuki', 'Yuki']

export default handler

async function simitalk(ask, apikeyyy = "iJ6FxuA9vxlvz5cKQCt3", language = "es") {
  if (!ask) return { status: false, resultado: { msg: "Debes ingresar un texto para hablar con Yuki." } }

  try {
    const response1 = await axios.get(`https://delirius-apiofc.vercel.app/tools/simi?text=${encodeURIComponent(ask)}`)
    const trad1 = await translate(`${response1.data.data.message}`, { to: language, autoCorrect: true })

    if (trad1.text == 'indefinida' || response1 == '' || !response1.data) trad1 = XD // Provoca error y activa el fallback

    return { status: true, resultado: { simsimi: trad1.text } }        
  } catch {
    try {
      const response2 = await axios.get(`https://anbusec.xyz/api/v1/simitalk?apikey=${apikeyyy}&ask=${ask}&lc=${language}`)
      return { status: true, resultado: { simsimi: response2.data.message }}       
    } catch (error2) {
      return { status: false, resultado: { msg: "Todas las IA fallaron. Intenta más tarde.", error: error2.message } }
    }
  }
}
