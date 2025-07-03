let handler = async (m, { conn }) => {
    let coin = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
    let exp = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
    let d = Math.floor(Math.random() * (500 - 100 + 1)) + 100;

    let user = global.db.data.users[m.sender];
    let time = user.lastclaim + 86400000;

    if (new Date() - user.lastclaim < 7200000) {
        return conn.reply(m.chat, `⚠️ Protocolo de Espera Activado\n\n📡 Aún no puedes reclamar tu recompensa diaria.\n⏱️ Tiempo estimado: *${msToTime(time - new Date())}*\n\n— Monitoreo programado por Fazbear Entertainment™\n— Sistema respaldado por FNaF LATAM™`, m);
    }

    user.diamond += d;
    user.coin += coin;
    user.exp += exp;
    user.lastclaim = Date.now();

    conn.reply(m.chat, `📦 Subrutina de Recompensa Diaria — Activada\n\n🔁 Procesando entrega automatizada de recursos...\n\n✨ *Exp:* +${exp}\n💎 *Diamantes:* +${d}\n💸 *${moneda}:* +${coin}\n\n🎮 Turno registrado en el sistema de vigilancia central.\n— Sistema respaldado por FNaF LATAM™`, m);
}

handler.help = ['daily', 'claim'];
handler.tags = ['rpg'];
handler.command = ['daily', 'diario'];
handler.group = true;
handler.register = true;

export default handler;

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    return `${hours} Horas ${minutes} Minutos`;
}
