const baseCoinReward = 10000;

var handler = async (m, { conn }) => {

    let user = global.db.data.users[m.sender] || {};
    user.christmas = user.christmas || 0;

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const isDecember = currentDate.getMonth() === 11; 

    const cooldown = 365 * 24 * 60 * 60 * 1000; // 1 año en milisegundos
    let timeRemaining = user.christmas + cooldown - currentDate.getTime();

    if (!isDecember) {
        return m.reply(`🎄 ¡Solo puedes reclamar tu regalo navideño en diciembre! Vuelve en diciembre de ${currentYear}.`);
    }

    if (timeRemaining > 0) {
        return m.reply(`${emoji3} ¡Ya reclamaste tu regalo navideño este año! Vuelve en:\n *${msToTime(timeRemaining)}*`);
    }

    // Recompensas fijas y exclusivas, +1000 cada una
    let coinReward = 1000;
    let expReward = 1000;
    let giftReward = 1000;

    user.coin = (user.coin || 0) + coinReward;
    user.exp = (user.exp || 0) + expReward;
    user.gifts = (user.gifts || 0) + giftReward;

    m.reply(`
\`\`\`🎄✨ ¡Feliz Navidad de parte de FNaF LATAM! 🎁✨\`\`\`

🎅 *Regalo Exclusivo:*

💸 *${moneda}*: +${coinReward}
✨ *Experiencia*: +${expReward}
🎁 *Regalos Navideños*: +${giftReward}

_Disfruta esta recompensa única y que Freddy te cuide esta temporada navideña._`);

    user.christmas = new Date().getTime();
}

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
