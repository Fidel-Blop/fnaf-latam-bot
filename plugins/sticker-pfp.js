/* Código hecho por Destroy
 - https://github.com/The-King-Destroy
*/

let handler = async (m, { conn }) => {
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let name = conn.getName(who);
    let pp = await conn.profilePictureUrl(who, 'image').catch(() => 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg');
    await conn.sendFile(m.chat, pp, 'profile.jpg', `🖼️ *Retrato de Identificación*\n\n📸 Foto de perfil actual de *${name}*\n\n🎮 Solicitud procesada por el sistema visual de FNaF LATAM.`, m);
}

handler.help = ['pfp @user']
handler.tags = ['sticker']
handler.command = ['pfp', 'getpic']

export default handler;
