// By Jtxs 🐢
// Adaptado con estética FNaF LATAM 🎭
// Canal: https://whatsapp.com/channel/0029Vanjyqb2f3ERifCpGT0W

import axios from 'axios'
const { proto, generateWAMessageFromContent, generateWAMessageContent } = (await import('@whiskeysockets/baileys')).default;

let handler = async (m, { conn, text }) => {
  const firma = '🎭 Respaldado por FNAF LATAM 🎭'

  if (!text) {
    return conn.reply(m.chat, `🔍 *Ingresa un término para buscar tweets.*\n\n📌 _Ejemplo:_ /tweetposts fnaf movie\n\n${firma}`, m)
  }

  await m.react('🔎')
  conn.reply(m.chat, '🕒 *Buscando publicaciones en Twitter...*', m)

  async function createImage(url) {
    const { imageMessage } = await generateWAMessageContent({ image: { url } }, { upload: conn.waUploadToServer });
    return imageMessage;
  }

  try {
    let api = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/Twitter-Posts`, {
      params: { text: encodeURIComponent(text) },
      headers: { 'Content-Type': 'application/json' }
    })

    let json = api.data.result
    let resultsToDisplay = json.slice(0, 7)

    let mini = []
    for (let res of resultsToDisplay) {
      let txt = `👤 *Usuario:* ${res.user}\n`
      txt += `📝 *Publicación:* ${res.post}\n`
      txt += `🌐 *Perfil:* ${res.profile}\n`
      txt += `🔗 *Enlace:* ${res.user_link}\n`

      mini.push({
        body: proto.Message.InteractiveMessage.Body.create({ text: null }),
        footer: proto.Message.InteractiveMessage.Footer.create({ text: firma }),
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
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 4
          },
          interactiveMessage: proto.Message.InteractiveMessage.create({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `✨ *Resultados de Twitter para:* "${text}"\n\n🕊️ Tweetposts • Búsqueda dinámica\n\n${firma}`
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({ text: null }),
            header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.create({ cards: mini })
          })
        }
      }
    }, {})

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })

  } catch (error) {
    console.error(error)
    conn.reply(m.chat, `❌ *Ocurrió un error al buscar los tweets.*\n\n${firma}`, m)
  }
}

handler.help = ['tweetposts']
handler.tags = ['buscador']
handler.command = ['tweetposts']
handler.register = true
handler.coin = 1

export default handler
