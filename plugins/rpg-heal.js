let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    if (!user) {
        return conn.reply(m.chat, `⚠️ *Error de Seguridad* ⚠️\n\n👤 Usuario no registrado en la base de datos de Fazbear.`, m);
    }
    if (user.coin < 50) {
        return conn.reply(m.chat, `💀 *Fondos insuficientes para el tratamiento*\n\nNecesitas al menos *50 ${moneda}* para activar la estación médica.`, m);
    }
    let healAmount = 50; 
    user.health += healAmount;
    user.coin -= 50; 
    if (user.health > 100) {
        user.health = 100; 
    }
    user.lastHeal = new Date();

    let info = `
╭─❤️‍🩹 〔 *ESTACIÓN MÉDICA FAZBEAR* 〕
│ *Has sido tratado con éxito y recuperaste ${healAmount} puntos de salud.*
│
│ 💸 *Créditos restantes:* ${user.coin} ${moneda}
│ ❤️ *Salud actual:* ${user.health}/100
╰───────────────────────

🩺 *"Cuídate, la noche es larga y Freddy vigila..."*
`;

    await conn.sendMessage(m.chat, { text: info }, { quoted: m });
};

handler.help = ['heal'];
handler.tags = ['rpg'];
handler.command = ['heal', 'curar'];
handler.group = true;
handler.register = true;

export default handler;
