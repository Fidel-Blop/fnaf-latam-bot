import db from '../lib/database.js';

let handler = async (m, { args }) => {
    let user = global.db.data.users[m.sender];

    if (!args[0]) {
        return m.reply(`💳 *Sistema de extracción bancaria FNaF LATAM™*

⚠️ Error: No se ingresó cantidad a retirar.
🪙 Ingresa la cantidad de *${global.moneda || '¥enes'}* que deseas extraer del banco.

📌 Ejemplo: *#retirar 15000*
📌 Todo el saldo: *#retirar all*

— Sistema respaldado por FNaF LATAM™`);
    }

    if (args[0] == 'all') {
        let count = parseInt(user.bank);
        if (!count || count <= 0)
            return m.reply(`🚫 No tienes *${global.moneda || '¥enes'}* en tu cuenta bancaria para retirar.`);

        user.bank -= count;
        user.coin += count;

        return m.reply(`🏧 *Extracción completada*

💰 Has retirado *${count} ${global.moneda || '¥enes'}* de tu cuenta bancaria.
⚠️ Ahora puedes usarlos... pero recuerda: *otros jugadores pueden robártelos.*

— Sistema respaldado por FNaF LATAM™`);
    }

    if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
        return m.reply(`⚠️ *Entrada inválida*

Debes ingresar una cantidad válida para retirar.

📌 Ejemplo: *#retirar 25000*
📌 Todo el saldo: *#retirar all*

— Sistema respaldado por FNaF LATAM™`);
    }

    let count = parseInt(args[0]);

    if (!user.bank || user.bank < 1)
        return m.reply(`💼 Tu cuenta bancaria está vacía. No puedes realizar retiros.`);

    if (user.bank < count)
        return m.reply(`💼 Fondos insuficientes.

🔐 Saldo disponible: *${user.bank} ${global.moneda || '¥enes'}*`);

    user.bank -= count;
    user.coin += count;

    return m.reply(`📤 *Extracción autorizada*

🪙 Retiraste *${count} ${global.moneda || '¥enes'}* del banco.
⚠️ Fondos ahora en tu cartera: más útiles, pero más vulnerables...

— Sistema respaldado por FNaF LATAM™`);
};

handler.help = ['retirar'];
handler.tags = ['rpg'];
handler.command = ['withdraw', 'retirar', 'with'];
handler.group = true;
handler.register = true;

export default handler;
