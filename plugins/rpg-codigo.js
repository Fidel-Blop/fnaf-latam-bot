let handler = async (m, { conn, text }) => {
    let amount = parseInt(text.trim());

    if (isNaN(amount) || amount <= 0) {
        return conn.reply(m.chat, `${emoji} ⚠️ Ingresa una cantidad válida de ${moneda} para generar el código.`, m);
    }

    let code = Math.random().toString(36).substring(2, 10).toUpperCase();

    if (!global.db.data.codes) global.db.data.codes = {};
    global.db.data.codes[code] = { coin: amount, claimedBy: [] };

    conn.reply(m.chat, `${emoji} 🔐 *Código FNaF LATAM generado*\n\n` +
        `Código: *${code}*\n` +
        `Valor: *${amount} ${moneda}*\n` +
        `*Este código puede ser canjeado por hasta 50 cazadores valientes.*\n\n` +
        `⚠️ Recuerda: úsalo sabiamente, ¡los animatrónicos están observando!`, m);
}

handler.help = ['codigo <cantidad de coins>'];
handler.tags = ['owner'];
handler.command = ['codigo'];
handler.rowner = true;

export default handler;
