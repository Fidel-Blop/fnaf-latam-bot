import db from '../lib/database.js'

let handler = async (m, { args }) => {
    let user = global.db.data.users[m.sender];

    if (!args[0]) return m.reply(`⚠️ Entrada no reconocida.\n\n📥 *Indique la cantidad de ${moneda} que desea transferir al banco.*\n\n🧪 Formato válido:\n> *#depositar 25000*\n> *#depositar all*\n\n— Unidad de Monitoreo Fazbear™`);

    if ((args[0]) < 1) return m.reply(`🚨 Cantidad inválida detectada.\n\n🧠 Recuerde: No se aceptan montos negativos, corrompidos ni fantasmas...\n— Sistema respaldado por FNaF LATAM™`);

    if (args[0] == 'all') {
        let count = parseInt(user.coin);
        user.coin -= count;
        user.bank += count;
        await m.reply(`✅ Transferencia completada con éxito.\n\n📦 Se han depositado *${count} ${moneda}* en su banco seguro.\n🛡️ Protección activa: fondos fuera del alcance de robos.\n\n— Zona Segura Bancaria Operativa 🧳`);
        return !0;
    }

    if (!Number(args[0])) return m.reply(`⛔ Entrada corrupta.\n\n💼 *Ingrese una cantidad válida de ${moneda}.*\n\n📋 Ejemplos:\n> *#depositar 1500*\n> *#depositar all*\n\n— Subsistema bancario automatizado Fazbear™`);

    let count = parseInt(args[0]);
    if (!user.coin || user.coin < 1) return m.reply(`❌ Tu cartera está vacía.\n\n🔐 No se puede completar la operación.\n— Reintenta cuando tengas ${moneda} disponibles.`);

    if (user.coin < count) return m.reply(`🔒 Fondos insuficientes detectados.\n\n💼 Actualmente posees *${user.coin} ${moneda}* en tu cartera.\n\n— Transacción abortada.`);

    user.coin -= count;
    user.bank += count;

    await m.reply(`✅ Operación bancaria exitosa.\n\n📥 Transferido: *${count} ${moneda}* a cuenta segura.\n🛡️ Ahora están protegidos bajo Protocolo de Seguridad Fazbear.\n\n— Sistema respaldado por FNaF LATAM™`);
};

handler.help = ['depositar'];
handler.tags = ['rpg'];
handler.command = ['deposit', 'depositar', 'd', 'aguardar'];
handler.group = true;
handler.register = true;

export default handler;
