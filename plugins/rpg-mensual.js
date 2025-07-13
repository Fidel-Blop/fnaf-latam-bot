const baseCoinReward = 20000;

var handler = async (m, { conn }) => {

    let user = global.db.data.users[m.sender] || {};
    user.monthly = user.monthly || 0;

    const cooldown = 604800000 * 4; // 4 semanas

    let timeRemaining = user.monthly + cooldown - new Date();

    if (timeRemaining > 0) {
        return m.reply(`${emoji3} 🎃 ¡Ya reclamaste tu regalo mensual de FNaF LATAM! 🎁\n` +
                       `⏳ Regresa en: *${msToTime(timeRemaining)}* para más sorpresas...`);
    }

    let coinReward = pickRandom([1, 2, 3, 4, 5]);
    let expReward = pickRandom([500, 1000, 1500, 2000, 2500]);
    let diamondReward = pickRandom([1, 2, 3]);

    user.coin = (user.coin || 0) + coinReward;
    user.exp = (user.exp || 0) + expReward;
    user.diamonds = (user.diamonds || 0) + diamondReward;

    m.reply(`
╭─🎃 〔 *RECOMPENSA MENSUAL FNaF LATAM* 〕
│👻 ¡Ha pasado un mes desde tu última visita!
│🎉 Aquí está tu regalo exclusivo para sobrevivientes:
│
│💸 *${moneda}*: +${coinReward}
│✨ *Experiencia*: +${expReward}
│💎 *Diamantes*: +${diamondReward}
╰───────────────────────

_🕹️ ¡No olvides volver por más sustos y premios!_
    `);

    user.monthly = Date.now();
}

handler.help = ['monthly'];
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
    
    return `${days} días ${hours} horas ${minutes} minutos`;
}
