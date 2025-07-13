let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    user.diamond = user.diamond || 0;
    user.coin = user.coin || 0;
    user.exp = user.exp || 0;
    user.lastclaim = user.lastclaim || 0;

    let cooldown = 24 * 60 * 60 * 1000; // 24 horas
    let tiempoRestante = cooldown - (Date.now() - user.lastclaim);

    if (tiempoRestante > 0) {
        return conn.reply(m.chat, `🧃 *Panel de Recompensas de Freddy Fazbear's*\n\n📅 Ya reclamaste tu turno hoy.\n⏱️ Próxima ronda disponible en: *${msToTime(tiempoRestante)}*\n\n_El sistema se reinicia a medianoche. No olvides regresar..._`, m);
    }

    // Recompensas aleatorias
    let coin = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
    let exp = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
    let d = Math.floor(Math.random() * (500 - 100 + 1)) + 100;

    // Sumar recompensas
    user.coin += coin;
    user.diamond += d;
    user.exp += exp;
    user.lastclaim = Date.now();

    // Mensaje de recompensa adaptado al estilo FNaF
    conn.reply(m.chat, `
╭─🎁 〔 *RECOMPENSA NOCTURNA FNaF LATAM* 〕
│📦 *Has abierto tu caja diaria...*
│🎮 Seguridad: Sistema activado ✅
│
│✨ *EXP GANADA:* +${exp}
│💎 *DIAMANTES:* +${d}
│💸 *${moneda.toUpperCase()}:* +${coin}
╰───────────────────────

_🎉 ¡No olvides volver mañana antes de que te atrape Freddy!_
`, m);
};

handler.help = ['daily', 'claim'];
handler.tags = ['rpg'];
handler.command = ['daily', 'diario'];
handler.group = true;
handler.register = true;

export default handler;

function msToTime(duration) {
    let seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    return `${hours} Horas ${minutes} Minutos ${seconds} Segundos`;
}
