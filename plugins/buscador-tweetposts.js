// Adaptado por FNaF LATAM™ 🐻
// Basado en el código original de Jtxs 🐢
// https://whatsapp.com/channel/0029Vanjyqb2f3ERifCpGT0W

import axios from 'axios'
const { proto, generateWAMessageFromContent, generateWAMessageContent } = (await import('@whiskeysockets/baileys')).default

let handler = async (m, { conn, text }) => {
  if (!text) {
    return conn.reply(m.chat, `👁 *Parámetro faltante.*\n📎 Ingresa una consulta para iniciar el rastreo en la red de Twitter/X.\n\n📌 Ejemplo: /tweetposts Freddy Fazbear`, m)
  }

  await m.react('📡')
  conn.reply(m.chat, `⏳ *Inicializando rastreo externo...*\n🎯 Consulta: *"${text}"*\n\nEspere mientras se sincroniza con el sistema...`, m)

  async function createImage(url) {
    const { imageMessage } = await generateWAMessageContent({ image: { url } }, { upload: conn.waUploadToServer })
    return imageMessage
  }

  try {
    const api = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/Twitter-Posts`, {
      params: { text: encodeURIComponent(text) },
      headers: { 'Content-Type': 'application/json' }
    })

    const json = api.data.result
    const resultsToDisplay = json.slice(0, 7)

    const mini = []

    for (let res of resultsToDisplay) {
      let txt = `👤 *Usuario:* ${res.user}\n`
      txt += `📅 *Publicado:* ${res.post}\n`
      txt += `🖼️ *Avatar:* ${res.profile}\n`
      txt += `🔗 *Perfil:* ${res.user_link}\n`

      mini.push({
        body: proto.Message.InteractiveMessage.Body.create({ text: null }),
        footer: proto.Message.InteractiveMessage.Footer.create({ text: null }),
        header: proto.Message.InteractiveMessage.Header.create({
          title: `${txt}`,
          hasMediaAttachment: true,
          imageMessage: await createImage(res.profile)
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
          buttons: []
        })
      })
    }

    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 4 },
          interactiveMessage: proto.Message.InteractiveMessage.create({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `🎥 *UNIDAD DE RASTREO ACTIVA*\n📡 Resultado para: *"${text}"*\n⛓️ Módulo: *TweetScan X*`
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: `⛔ Se prohíbe el uso del comando con fines ofensivos, sexuales o ilegales.\nToda acción queda registrada.\n\n— Sistema respaldado por FNaF LATAM™`
            }),
            header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.create({ cards: mini })
          })
        }
      }
    }, {})

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })

  } catch (error) {
    console.error('🧠 Error crítico durante la ejecución de TweetScan:', error)
    conn.reply(m.chat, `⚠️ *Falla en el rastreo remoto.*\nDetalles técnicos: ${error.message}`, m)
  }
}

handler.help = ['tweetposts']
handler.tags = ['buscador']
handler.command = ['tweetposts']
handler.register = true
handler.coin = 1

export default handler
