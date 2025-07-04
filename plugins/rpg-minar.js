let cooldowns = {}

let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    if (!user) return;

    const cooldownTime = 600000; // 10 minutos
    let nextAvailable = user.lastmiming + cooldownTime;

    if (new Date() - user.lastmiming < cooldownTime) {
        return conn.reply(m.chat, `⚠️ *PROTOCOLO DE MINERÍA BLOQUEADO*\n\n📡 Sistema Fazbear detectó sobrecarga en el pico de energía minera.\n⏳ Espera: *${msToTime(nextAvailable - new Date())}*\n\n— Sistema respaldado por FNaF LATAM™`, m);
    }

    let coin = pickRandom([20, 5, 7, 8, 88, 40, 50, 70, 90, 999, 300]);
    let emerald = pickRandom([1, 5, 7, 8]);
    let iron = pickRandom([5, 6, 7, 9, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80]);
    let gold = pickRandom([20, 5, 7, 8, 88, 40, 50]);
    let coal = pickRandom([20, 5, 7, 8, 88, 40, 50, 80, 70, 60, 100, 120, 600, 700, 64]);
    let stone = pickRandom([200, 500, 700, 800, 900, 4000, 300]);
    let exp = Math.floor(Math.random() * 1000);

    let img = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745557957843.jpeg';

    let mensaje = `
⛏️ *SISTEMA DE MINERÍA FAZWATCH ACTIVADO*
🎥 Subterráneo detectado — seguridad mínima

📦 *Extracción completada con éxito*:

✨ *Experiencia*: +${exp}
💸 *${global.moneda || '¥enes'}*: +${coin}
♦️ *Esmeraldas*: +${emerald}
🔩 *Hierro*: +${iron}
🏅 *Oro*: +${gold}
🕋 *Carbón*: +${coal}
🪨 *Piedra*: +${stone}

⚠️ Nivel de salud disminuido por fatiga: *-50*
⚙️ Durabilidad del pico reducida: *-30*

— Sistema respaldado por FNaF LATAM™`;

    await conn.sendFile(m.chat, img, 'mine.jpg', mensaje, fkontak);
    await m.react('⛏️');

    user.health -= 50;
    user.pickaxedurability -= 30;
    user.coin += coin;
    user.iron += iron;
    user.gold += gold;
    user.emerald += emerald;
    user.coal += coal;
    user.stone += stone;
    user.exp = (user.exp || 0) + exp;
    user.lastmiming = new Date() * 1;
};

handler.help = ['minar'];
handler.tags = ['economy'];
handler.command = ['minar', 'miming', 'mine'];
handler.register = true;
handler.group = true;

export default handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function msToTime(duration) {
    var seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60);
    return `${minutes} m y ${seconds} s`;
}
