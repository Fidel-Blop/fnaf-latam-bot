import db from '../lib/database.js';
import moment from 'moment-timezone';

let handler = async (m, { conn, usedPrefix }) => {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;

    if (!(who in global.db.data.users)) {
        return conn.reply(m.chat, `⚠️ *Error de seguridad* ⚠️\n\n👤 El animatrónico no encontró al usuario en la base de datos.`, m);
    }
    
    let img = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745557972839.jpeg';
    let user = global.db.data.users[who];
    let name = conn.getName(who);

    let premium = user.premium ? '✅ Activado' : '❌ Desactivado';

    let text = `
╭─🦾 〔 Inventario del animatrónico: ${name} 〕
│
│ 💸 *${moneda} en Cartera:* ${user.coin || 0}
│ 🏦 *${moneda} en Banco:* ${user.bank || 0}
│
│ ♦️ *Esmeraldas:* ${user.emerald || 0}
│ 🔩 *Hierro:* ${user.iron || 0}
│ 🏅 *Oro:* ${user.gold || 0}
│ 🕋 *Carbón:* ${user.coal || 0}
│ 🪨 *Piedra:* ${user.stone || 0}
│
│ ✨ *Experiencia:* ${user.exp || 0}
│ ❤️ *Salud:* ${user.health || 100} / 100
│ 💎 *Diamantes:* ${user.diamond || 0}
│ 🍬 *Dulces:* ${user.candies || 0}
│ 🎁 *Regalos:* ${user.gifts || 0}
│ 🎟️ *Tokens:* ${user.joincount || 0}
│
│ ⚜️ *Premium:* ${premium}
│ ⏳ *Última Aventura:* ${user.lastAdventure ? moment(user.lastAdventure).fromNow() : 'Nunca'}
│ 📅 *Fecha actual:* ${new Date().toLocaleString('es-ES')}
╰━━━━━━━━━━━━⬣

🛠️ _"Recuerda: cada pieza cuenta en este juego macabro..."_
`;

    await conn.sendFile(m.chat, img, 'inventario-fnaf.jpg', text, fkontak);
}

handler.help = ['inventario', 'inv'];
handler.tags = ['rpg'];
handler.command = ['inventario', 'inv']; 
handler.group = true;
handler.register = true;

export default handler; 
