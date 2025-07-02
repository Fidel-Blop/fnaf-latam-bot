let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `${emoji} Por favor, ingresa el error que deseas reportar.`, m);
    if (text.length < 10) return conn.reply(m.chat, `${emoji} Detalla bien el error, mínimo 10 caracteres.`, m);
    if (text.length > 1000) return conn.reply(m.chat, `${emoji2} *Máximo 1000 caracteres para reportar.*`, m);

    const teks = `
╔═══════════════╗
║    ⚠️  REPORT ERROR ⚠️    ║
╚═══════════════╝

☁️ *NÚMERO:*
• Wa.me/${m.sender.split`@`[0]}

👤 *USUARIO:*
• ${m.pushName || 'Anónimo'}

💬 *MENSAJE:*
• ${text}
`.trim();

    await conn.reply(`5492604097541@s.whatsapp.net`, m.quoted ? teks + '\n\n» Mensaje citado:\n' + m.quoted.text : teks, m, { mentions: conn.parseMention(teks) });

    m.reply(`${emoji} Tu reporte fue enviado correctamente. ¡Gracias por ayudarnos a mejorar FNaF LATAM Bot!`);
}

handler.help = ['reportar'];
handler.tags = ['info'];
handler.command = ['reporte', 'report', 'reportar', 'bug', 'error'];

export default handler;
