const baseCoinReward = 10000;

var handler = async (m, { conn }) => {

    let user = global.db.data.users[m.sender] || {};
    user.christmas = user.christmas || 0;

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const isDecember = currentDate.getMonth() === 11; // Diciembre = 11

    const cooldown = 365 * 24 * 60 * 60 * 1000; // 1 año
    let timeRemaining = user.christmas + cooldown - currentDate.getTime();

    if (!isDecember) {
        return m.reply(
`🎄 *PROTOCOLO DE NAVIDAD BLOQUEADO*

📆 Acceso denegado: no es diciembre.
🎁 Próxima activación autorizada: *Diciembre de ${currentYear}*

— Sistema respaldado por FNaF LATAM™`, m);
    }

    if (timeRemaining > 0) {
        return m.reply(
`🔐 *RECOMPENSA YA RECLAMADA*

📦 Ya obtuviste tu paquete navideño este año.
⏳ Reintenta en: *${msToTime(timeRemaining)}*

— Sistema respaldado por FNaF LATAM™`, m);
    }

    let coinReward = pickRandom([5, 10, 15, 20]);
    let expReward = pickRandom([2000, 3000, 4000, 5000]);
    let giftReward = pickRandom([2, 3, 4, 5]);

    user.coin = (user.coin || 0) + coinReward;
    user.exp = (user.exp || 0) + expReward;
    user.gifts = (user.gifts || 0) + giftReward;

    m.reply(`
🎄 *PROTOCOLO FESTIVO FNaF ACTIVADO*
🎁 *Unidad de recompensas estacionales abierta*

🎉 *¡Feliz Navidad, Operador!*

💸 *${global.moneda || '¥enes'}*: +${coinReward}
✨ *Experiencia*: +${expReward}
🎁 *Regalos de FNaFmas*: +${giftReward}

📡 Registro de entrega completado...

— Sistema respaldado por FNaF LATAM™`);

    user.christmas = new Date().getTime();
};

handler.help = ['navidad', 'christmas'];
handler.tags = ['rpg'];
handler.command = ['navidad', 'christmas'];
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
