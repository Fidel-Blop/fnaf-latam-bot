let handler = async (m, { conn, text }) => {
    let code = text.trim().toUpperCase();
    if (!code) {
        return conn.reply(m.chat, `🎟️ *Sistema de Redención Fazbear*\n\n⚠️ Código ausente. Usa:\n.canJear ABC123`, m);
    }

    let codesDB = global.db.data.codes || {};
    let user = global.db.data.users[m.sender];
    let entry = codesDB[code];

    if (!entry) {
        return conn.reply(m.chat, `❌ *[ERROR]* Código *inválido* o no existe en el sistema.\n\nVerificá que esté bien escrito o pedí uno válido.`, m);
    }

    if (entry.claimedBy.includes(m.sender)) {
        return conn.reply(m.chat, `🚫 Ya has canjeado este código anteriormente.\nCada usuario puede redimirlo una sola vez.`, m);
    }

    if (entry.claimedBy.length >= 50) {
        return conn.reply(m.chat, `📛 Este código ha sido *agotado completamente*.\n🕛 Esperá a que se publique uno nuevo.`, m);
    }

    // Aplicar recompensa
    user.coin += entry.coin;
    entry.claimedBy.push(m.sender);

    const restantes = 50 - entry.claimedBy.length;
    conn.reply(m.chat, `✅ *Código Redimido con Éxito*\n\n🎉 Has recibido: *${entry.coin} ${moneda}*\n📦 Código: *${code}*\n🧍‍♂️ Redimido por ti: *Sí*\n🔢 Redenciones restantes: *${restantes}/50*\n\n— Sistema FNaF LATAM™`, m);
};

handler.help = ['canjear <código>'];
handler.tags = ['economia'];
handler.command = ['canjear'];
handler.group = true;
handler.register = true;

export default handler;
