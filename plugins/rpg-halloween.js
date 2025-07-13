const baseCoinReward = 10000;

var handler = async (m, { conn }) => {

    let user = global.db.data.users[m.sender] || {};
    user.halloween = user.halloween || 0;

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const isOctober = currentDate.getMonth() === 9;

    const cooldown = 365 * 24 * 60 * 60 * 1000; // 1 año
    let timeRemaining = user.halloween + cooldown - currentDate.getTime();

    if (!isOctober) {
        return m.reply(`🎃 *Acceso Denegado al Evento de Halloween Fazbear*\n\n🔒 Solo está disponible en el mes de octubre.\n📅 Vuelve en: *Octubre de ${currentYear}* para obtener tu recompensa.`);
    }

    if (timeRemaining > 0) {
        return m.reply(`🔐 *Ya reclamaste tu 🎃 REGALO ANUAL DE HALLOWEEN*\n\n⏱️ Podrás volver a activarlo en:\n*${msToTime(timeRemaining)}*`);
    }

    // Cambié las recompensas para que sean todas +500 fijas
    let coinReward = 500;
    let candyReward = 500;
    let expReward = 500;
    let giftReward = 500;

    user.coin = (user.coin || 0) + coinReward;
    user.candies = (user.candies || 0) + candyReward;
    user.exp = (user.exp || 0) + expReward;
    user.gifts = (user.gifts || 0) + giftReward;

    m.reply(`
╭─🎃 〔 *HALLOWEEN EN FREDDY FAZBEAR’S* 〕
│👻 El sistema de seguridad te otorgó tu recompensa anual...
│🎁 ¡Recompensa de Halloween Activada!
│
│💸 *${moneda.toUpperCase()}* : +${coinReward}
│🍬 *Dulces* : +${candyReward}
│✨ *Experiencia* : +${expReward}
│🎃 *Regalos Especiales* : +${giftReward}
╰───────────────────────

🕯️ *"¡Disfruta mientras las cámaras están apagadas... y Freddy aún duerme!"*`);

    user.halloween = new Date().getTime();
}

handler.help = ['halloween'];
handler.tags = ['rpg'];
handler.command = ['halloween'];
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
