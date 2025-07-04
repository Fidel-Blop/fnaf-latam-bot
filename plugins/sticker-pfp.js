/* Código hecho por Destroy
 - https://github.com/The-King-Destroy
 - Adaptado por Freddy AI Security Node v3.1.1
*/

let handler = async (m, { conn }) => {
    let who = m.quoted
        ? m.quoted.sender
        : m.mentionedJid && m.mentionedJid[0]
        ? m.mentionedJid[0]
        : m.fromMe
        ? conn.user.jid
        : m.sender;

    let name = await conn.getName(who);

    let pp = await conn.profilePictureUrl(who, 'image').catch(() =>
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg'
    );

    await conn.sendFile(
        m.chat,
        pp,
        'profile.jpg',
        `🎥 *Unidad de Observación activada...*

📌 Extrayendo datos del usuario: @${who.split('@')[0]}

📸 Foto de perfil de: *${name}*  
Estado: Imagen obtenida con éxito ✅

— Sistema respaldado por FNaF LATAM™`,
        m,
        false,
        { mentions: [who] }
    );
};

handler.help = ['pfp @usuario'];
handler.tags = ['tools', 'security', 'fazwatch'];
handler.command = ['pfp', 'getpic'];
handler.group = true;
handler.register = false;

export default handler;
