let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];

    if (!user) {
        return conn.reply(m.chat, `🚫 [ACCESO DENEGADO]

📁 El sujeto no figura en el registro biológico de este centro.

— Sistema respaldado por FNaF LATAM™`, m);
    }

    if (user.coin < 50) {
        return conn.reply(m.chat, `⚠️ [FALLO EN TRANSACCIÓN MÉDICA]

💸 Fondos insuficientes para ejecutar la rutina de restauración.

🔧 Se requieren *50 ${global.moneda || 'monedas'}* como mínimo para acceder al *Protocolo de Curación Automatizada*.

— Sistema respaldado por FNaF LATAM™`, m);
    }

    let healAmount = 50; 
    user.health += healAmount;
    user.coin -= 50; 
    if (user.health > 100) {
        user.health = 100; 
    }

    user.lastHeal = new Date();

    let info = `
🩺 Freddy Fazbear Medical Unit™ activada...

🔓 Registro biométrico validado...
🔧 Ejecutando restauración celular...

❤️ *Curación aplicada:* +${healAmount} puntos de salud
💰 *Saldo restante:* ${user.coin} ${global.moneda || 'monedas'}
📈 *Nivel de salud actual:* ${user.health}%

📡 Procedimiento finalizado con éxito.

— Sistema respaldado por FNaF LATAM™`;

    await conn.sendMessage(m.chat, { text: info.trim() }, { quoted: m });
};

handler.help = ['heal'];
handler.tags = ['rpg'];
handler.command = ['heal', 'curar'];
handler.group = true;
handler.register = true;

export default handler;
