import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;
  const fkontak = { 
    "key": { 
      "participants":"0@s.whatsapp.net", 
      "remoteJid": "status@broadcast", 
      "fromMe": false, 
      "id": "Halo" 
    }, 
    "message": { 
      "contactMessage": { 
        "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:FNaF LATAM Bot\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:WhatsApp\nEND:VCARD` 
      }
    }, 
    "participant": "0@s.whatsapp.net"
  }  
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://i.imgur.com/jG5JHQ9.png')
  let img = await (await fetch(`${pp}`)).buffer()
  let chat = global.db.data.chats[m.chat]
  
  // Títulos con estilo FNaF (colores en consola no afectan WA, pero aquí solo texto)
  let txt = '👻 👾 ¡NUEVO MIEMBRO EN FNaF LATAM! 👾 👻'
  let txt1 = '💀 👋 MIEMBRO HA SALIDO 👋 💀'

  let groupSize = participants.length
  if (m.messageStubType == 27) {
    groupSize++;
  } else if (m.messageStubType == 28 || m.messageStubType == 32) {
    groupSize--;
  }

  if (chat.welcome && m.messageStubType == 27) {
    let bienvenida = `🎉 *Bienvenido a FNaF LATAM* 🎉\n\n@${m.messageStubParameters[0].split`@`[0]} ¡Nos alegra que estés aquí!\n\n👥 Ahora somos *${groupSize}* miembros en el grupo.\n\n🦇 Explora, comparte y disfruta de la comunidad más terrorífica y divertida.\n\n💡 Usa *#help* para conocer todos los comandos disponibles.`
    await conn.sendMini(m.chat, txt, dev, bienvenida, img, img, redes, fkontak)
  }
  
  if (chat.welcome && (m.messageStubType == 28 || m.messageStubType == 32)) {
    let bye = `⚰️ *Un miembro ha abandonado FNaF LATAM* ⚰️\n\n@${m.messageStubParameters[0].split`@`[0]} te extrañaremos.\n\n👥 Quedan *${groupSize}* miembros activos.\n\n🕯️ Esperamos verte pronto de nuevo en esta comunidad de miedo y diversión.\n\n💡 Recuerda usar *#help* para consultar comandos disponibles.`
    await conn.sendMini(m.chat, txt1, dev, bye, img, img, redes, fkontak)
  }
}
