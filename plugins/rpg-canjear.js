let handler = async (m, { conn, text }) => {
    let code = text.trim().toUpperCase();

    if (!code) {
        return conn.reply(m.chat, `🤖 *¡Alerta animatrónica!* Por favor, ingresa un código para canjear y activar tu recompensa.`, m);
    }

    let codesDB = global.db.data.codes || {};
    let user = global.db.data.users[m.sender];

    if (!codesDB[code]) {
        return conn.reply(m.chat, `⚠️ Código *${code}* inválido o inexistente. ¡Revisa y vuelve a intentarlo!`, m);
    }

    if (codesDB[code].claimedBy.includes(m.sender)) {
        return conn.reply(m.chat, `🔒 Ya has activado este código, no puedes canjearlo dos veces. ¡Sigue cazando recompensas!`, m);
    }

    if (codesDB[code].claimedBy.length >= 5) {
        return conn.reply(m.chat, `❌ Este código ya ha sido agotado por otros cazadores. Espera a que el creador libere uno nuevo.`, m);
    }

    user.coin += codesDB[code].coin;
    codesDB[code].claimedBy.push(m.sender);

    let remaining = 5 - codesDB[code].claimedBy.length;

    return conn.reply(m.chat, `🎉 *¡Código aceptado!* Has recibido *${codesDB[code].coin} ${moneda}* para tus aventuras.\n` +
        `🕹️ Quedan *${remaining}* usos disponibles para este código.\n\n` +
        `⚙️ Sigue explorando y desbloqueando más secretos en FNaF LATAM.`, m);
}

handler.help = ['canjear <código>'];
handler.tags = ['economia'];
handler.command = ['canjear'];
handler.group = true;
handler.register = true;

export default handler;
