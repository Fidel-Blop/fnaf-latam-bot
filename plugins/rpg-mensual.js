const baseCoinReward = 20000;

var handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender] || {};
    user.monthly = user.monthly || 0;

    const cooldown = 604800000 * 4; // 4 semanas
    let ahora = Date.now();
    let tiempoRestante = user.monthly + cooldown - ahora;

    if (tiempoRestante > 0) {
        return m.reply(`🕐 *ACCESO DENEGADO*

📡 Registro detectado: ya reclamaste la recompensa mensual.
⏳ Tiempo restante: *${msToTime(tiempoRestante)}*

— Sistema respaldado por FNaF LATAM™`);
    }

    let coinReward = pickRandom([1, 2, 3, 4, 5]);
    let expReward = pickRandom([500, 1000, 1500, 2000, 2500]);
    let diamondReward = pickRandom([1, 2, 3]);

    user.coin = (user.coin || 0) + coinReward;
    user.exp = (user.exp || 0) + expReward;
    user.diamonds = (user.diamonds || 0) + diamondReward;

    let mensaje = `
🎁 *PROTOCOLO DE RECOMPENSA MENSUAL ACTIVADO*

📦 Recompensa asignada:
💸 +${coinReward} ${global.moneda || '¥enes'}
✨ +${expReward} XP
💎 +${diamondReward} Diamantes

🎥 Cámara de control ha registrado tu ingreso mensual...
⛓️ Revisión Fazbear completada.

— Sistema respaldado por FNaF LATAM™`;

    await conn.reply(m.chat, mensaje, m);
    user.monthly = ahora;
};

handler.help = ['mensual', 'monthly'];
handler.tags = ['rpg'];
handler.command = ['mensual', 'monthly'];
handler.group = true;
handler.register = true;

export default handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function msToTime(duration) {
    var days = Math.floor(duration / (1000 * 60 * 60 * 24));
    var hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    return `${days}d ${hours}h ${minutes}m`;
}
