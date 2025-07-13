var handler = async (m, { conn, args }) => {
  let group = m.chat
  let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group)

  conn.reply(
    m.chat,
    `┏━━━━━━◥◣✪◢◤━━━━━━┓
┃        🎟 *FNaF LATAM* 🎟       
┃
┃   🔗 *ENLACE DEL GRUPO* 🔗
┃
┃   ${link}
┃
┃   ⚠️ No compartas con desconocidos el enlace, podrías pagarlo muy caro. . . Freddy te observa. 👀
┗━━━━━━◢◤✪◥◣━━━━━━┛`,
    m,
    { detectLink: true }
  )
}

handler.help = ['link']
handler.tags = ['grupo']
handler.command = ['link', 'enlace']
handler.group = true
handler.botAdmin = true

export default handler
