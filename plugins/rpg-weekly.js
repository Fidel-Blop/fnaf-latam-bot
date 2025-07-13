const we = 5000;
let handler = async (m, { conn }) => {

    let user = global.db.data.users[m.sender] || {};
    user.weekly = user.weekly || 0;

    const cooldown = 604800000; // 1 semana

    if (new Date - user.weekly < cooldown) {
        return m.reply(`${emoji3} 🕰️ Ya has recolectado tu recompensa semanal de la oscuridad.\nVuelve en:\n *${msToTime((user.weekly + cooldown) - new Date())}* para la próxima ronda en Freddy's...`);
    }

    let coinReward = pickRandom([1, 2, 3]);
    let expReward = pickRandom([100, 200, 300]);

    user.coin = (user.coin || 0) + coinReward;
    user.exp = (user.exp || 0) + expReward;

    m.reply(`
🎁 *Regalo Semanal de Freddy's*

Ha llegado la noche y con ella tu recompensa...  

💸 *${moneda}* : +${coinReward}
✨ *Experiencia* : +${expReward}

⚠️ No bajes la guardia, la noche acecha...  
`);

    user.weekly = new Date * 1;
}

handler.help = ['weekly'];
handler.tags = ['rpg'];
handler.command = ['semanal', 'weekly'];
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
