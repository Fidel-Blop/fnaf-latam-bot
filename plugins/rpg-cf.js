let users = {};

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let [eleccion, cantidad] = text.split(' ');
    if (!eleccion || !cantidad) {
        return m.reply(`${emoji} 🕹️ *¡Bienvenido a la apuesta de Cara o Cruz de FNaF LATAM!* 🕹️\n\n` +
                       `Usa el comando así:\n` +
                       `*${usedPrefix + command} cara 50*\n\n` +
                       `Apuesta tus *${moneda}* y desafía a la suerte, animatrónico.`);
    }

    eleccion = eleccion.toLowerCase();
    cantidad = parseInt(cantidad);
    if (eleccion !== 'cara' && eleccion !== 'cruz') {
        return m.reply(`${emoji2} ⚠️ Elección inválida, cazador.\n` +
                       `Por favor, elige *cara* o *cruz*.\n` +
                       `Ejemplo: *${usedPrefix + command} cara 50*`);
    }

    if (isNaN(cantidad) || cantidad <= 0) {
        return m.reply(`${emoji2} ❌ Cantidad inválida.\n` +
                       `Ingresa una cantidad válida de *${moneda}* para apostar.\n` +
                       `Ejemplo: *${usedPrefix + command} cruz 50*`);
    }

    let userId = m.sender;
    if (!users[userId]) users[userId] = { coin: 100 };
    let user = global.db.data.users[m.sender];
    if (user.coin < cantidad) {
        return m.reply(`${emoji2} 💀 No tienes suficientes *${moneda}* para apostar.\n` +
                       `Saldo actual: *${user.coin}* ${moneda}.\n` +
                       `¡Sigue cazando para conseguir más!`);
    }

    let resultado = Math.random() < 0.5 ? 'cara' : 'cruz';
    let mensaje = `${emoji} 🎲 La moneda ha caído en *${resultado}*.\n\n`;

    if (resultado === eleccion) {
        user.coin += cantidad;
        mensaje += `🎉 ¡Felicidades, has ganado *${cantidad} ${moneda}*! El animatrónico sonríe para ti.`;
    } else {
        user.coin -= cantidad;
        mensaje += `☠️ Has perdido *${cantidad} ${moneda}*. Los animatrónicos no son tan amables hoy.`;
    }

    await conn.reply(m.chat, mensaje, m);
};

handler.help = ['cf'];
handler.tags = ['economy'];
handler.command = ['cf', 'suerte', 'caracruz'];
handler.group = true;
handler.register = true;

export default handler;
