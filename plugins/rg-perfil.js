import moment from 'moment-timezone';
import PhoneNumber from 'awesome-phonenumber';
import fetch from 'node-fetch';

let handler = async (m, { conn, args }) => {
    let userId;
    if (m.quoted && m.quoted.sender) {
        userId = m.quoted.sender;
    } else {
        userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
    }

    let user = global.db.data.users[userId];

    let name = conn.getName(userId);
    let cumpleanos = user.birth || '🔪 No registrado';
    let genero = user.genre || '❓ Indefinido';
    let pareja = user.marry || '👻 Solitario';
    let description = user.description || '⚙️ Sin descripción del animatrónico';
    let exp = user.exp || 0;
    let nivel = user.level || 0;
    let role = user.role || '🦾 Sin rango asignado';
    let coins = user.coin || 0;
    let bankCoins = user.bank || 0;

    let perfil = await conn.profilePictureUrl(userId, 'image').catch(_ => 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg');

    let profileText = `
╔════════════════════╗
    🎭 𝐅𝐍𝐀𝐅 𝐋𝐀𝐓𝐀𝐌 🎭
╚════════════════════╝

👤 *Perfil del Animatrónico:* ◢ @${userId.split('@')[0]} ◤

💬 _${description}_

───────────────────────────────
🎂 Cumpleaños: *${cumpleanos}*
⚥ Género: *${genero}*
❤️ Estado: *${pareja}*

───────────────────────────────
⭐ Experiencia: *${exp.toLocaleString()}*
⚔ Nivel: *${nivel}*
🏷 Rango: *${role}*

───────────────────────────────
💰 Monedas (Cartera): *${coins.toLocaleString()} ${moneda}*
🏦 Monedas (Banco): *${bankCoins.toLocaleString()} ${moneda}*

───────────────────────────────
✨ Premium: ${user.premium ? '✅ Activado' : '❌ Inactivo'}

*Interactúa para subir de nivel y descubrir más secretos...* 👻
`.trim();

    await conn.sendMessage(m.chat, { 
        text: profileText,
        contextInfo: {
            mentionedJid: [userId],
            externalAdReply: {
                title: '🎮 Perfil FNaF LATAM',
                body: dev,
                thumbnailUrl: perfil,
                mediaType: 1,
                showAdAttribution: true,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
};

handler.help = ['profile'];
handler.tags = ['rg'];
handler.command = ['profile', 'perfil'];

export default handler;
