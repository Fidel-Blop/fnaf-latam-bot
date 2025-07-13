import { canLevelUp, xpRange } from '../lib/levelling.js';
import db from '../lib/database.js';

let handler = async (m, { conn }) => {
    let mentionedUser = m.mentionedJid ? m.mentionedJid[0] : null;
    let citedMessage = m.quoted ? m.quoted.sender : null;
    let who = mentionedUser || citedMessage || m.sender; 
    let name = conn.getName(who) || 'Animatrónico';
    let user = global.db.data.users[who];

    if (!user) {
        await conn.sendMessage(m.chat, "⚠️ *Error*: No se encontraron datos del animatrónico solicitado.", { quoted: m });
        return;
    }

    let { min, xp } = xpRange(user.level, global.multiplier);
    
    let before = user.level * 1;
    while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++;

    if (before !== user.level) {
        let txt = `👾 *¡Alerta de subida de nivel!* 👾\n\n`; 
        txt += `🎉 *¡Felicidades!* Has ascendido en la jerarquía FNaF LATAM.\n\n`;
        txt += `⬆️ Nivel: *${before}* ➔ *${user.level}*  |  🦾 Rango: *${user.role}*\n\n`;
        txt += `───────────────────────────────\n`;
        txt += `• 🔰 Nivel anterior: *${before}*\n`;
        txt += `• ✨ Nuevo nivel: *${user.level}*\n`;
        txt += `• 📅 Fecha y hora: *${new Date().toLocaleString('es-ES')}*\n`;
        txt += `───────────────────────────────\n\n`;
        txt += `💡 _Sigue interactuando para dominar el universo FNaF LATAM._`;
        await conn.sendMessage(m.chat, { text: txt }, { quoted: m });
    } else {
        let users = Object.entries(global.db.data.users).map(([key, value]) => {
            return { ...value, jid: key };
        });

        let sortedLevel = users.sort((a, b) => (b.level || 0) - (a.level || 0));
        let rank = sortedLevel.findIndex(u => u.jid === who) + 1;

        let txt = `🎭 *Perfil Animatrónico* ◢ ${name} ◤\n\n`;
        txt += `🔹 Nivel actual: *${user.level}*\n`;
        txt += `🔹 Experiencia acumulada: *${user.exp}*\n`;
        txt += `🔹 Rango dentro de FNaF LATAM: *${user.role}*\n`;
        txt += `🔹 Progreso hacia próximo nivel: *${user.exp - min} / ${xp}*  _(${Math.floor(((user.exp - min) / xp) * 100)}%)_\n`;
        txt += `🔹 Puesto en el escalafón: *#${rank}* de *${sortedLevel.length}*\n`;
        txt += `🔹 Comandos utilizados: *${user.commands || 0}*\n\n`;
        txt += `👻 ¡Sigue interactuando para convertirte en leyenda!`;

        await conn.sendMessage(m.chat, { text: txt }, { quoted: m });
    }
}

handler.help = ['levelup', 'lvl @user'];
handler.tags = ['rpg'];
handler.command = ['nivel', 'lvl', 'level', 'levelup'];
handler.register = true;
handler.group = true;

export default handler;
