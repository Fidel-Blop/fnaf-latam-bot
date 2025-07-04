import db from '../lib/database.js';
import moment from 'moment-timezone';

let handler = async (m, { conn, usedPrefix }) => {
    let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;

    if (!(who in global.db.data.users)) {
        return conn.reply(m.chat, `🚫 [ACCESO DENEGADO]

📁 Sujeto no identificado en la base de datos del sistema de vigilancia Fazbear™.

— Sistema respaldado por FNaF LATAM™`, m);
    }

    let user = global.db.data.users[who];
    let name = await conn.getName(who);
    let premium = user.premium ? '✅ ACTIVO' : '❌ INACTIVO';
    let img = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745557972839.jpeg';

    let texto = `
📦 [INVENTARIO DIGITAL DEL OPERADOR]
🟫 Unidad: ${name}
🟨 ID de acceso: ${who.split('@')[0]}
🕹️ Revisión general iniciada...

💳 *Saldo de Cartera:* ${user.coin || 0} ${global.moneda || 'monedas'}
🏦 *Depósito Bancario:* ${user.bank || 0} ${global.moneda || 'monedas'}

📦 *Materiales Recolectados:*
♦️ Esmeraldas: ${user.emerald || 0}
🔩 Hierro: ${user.iron || 0}
🏅 Oro: ${user.gold || 0}
🕋 Carbón: ${user.coal || 0}
🪨 Piedra: ${user.stone || 0}
💎 Diamantes: ${user.diamond || 0}

📡 *Estadísticas del Operador:*
✨ Experiencia acumulada: ${user.exp || 0}
❤️ Estado de salud: ${user.health || 100}%
🍬 Dulces: ${user.candies || 0}
🎁 Regalos obtenidos: ${user.gifts || 0}
🎟️ Tokens de actividad: ${user.joincount || 0}
⚜️ Estado Premium: ${premium}

📅 Última actividad en terreno:
⏳ ${user.lastAdventure ? moment(user.lastAdventure).fromNow() : 'Nunca registrado'}

🕓 Registro generado: ${new Date().toLocaleString('es-AR')}

— Freddy Fazbear Monitoring System v3.7.1
— Sistema respaldado por FNaF LATAM™
`.trim();

    await conn.sendFile(m.chat, img, 'inventario.jpg', texto, fkontak);
};

handler.help = ['inventario', 'inv'];
handler.tags = ['rpg'];
handler.command = ['inventario', 'inv']; 
handler.group = true;
handler.register = true;

export default handler;
